/**
 * Automated Database Backup Script
 * Creates encrypted backups with 30-day retention
 */

const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { exec } = require('child_process');
const util = require('util');

const execPromise = util.promisify(exec);

class BackupAutomation {
    constructor() {
        this.backupDir = process.env.BACKUP_DIR || './backups';
        this.retentionDays = parseInt(process.env.BACKUP_RETENTION_DAYS || '30', 10);
        this.encryptionKey = process.env.BACKUP_ENCRYPTION_KEY || this.generateEncryptionKey();
        this.dbPool = new Pool({
            connectionString: process.env.DATABASE_URL
        });
    }

    /**
     * Generate encryption key for backups
     */
    generateEncryptionKey() {
        return crypto.randomBytes(32).toString('hex');
    }

    /**
     * Create backup directory if it doesn't exist
     */
    ensureBackupDir() {
        if (!fs.existsSync(this.backupDir)) {
            fs.mkdirSync(this.backupDir, { recursive: true });
        }
    }

    /**
     * Create database backup
     */
    async createBackup() {
        try {
            this.ensureBackupDir();

            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const backupFileName = `smartfarm-backup-${timestamp}.sql`;
            const backupPath = path.join(this.backupDir, backupFileName);
            const encryptedPath = `${backupPath}.encrypted`;

            console.log(`📦 Creating backup: ${backupFileName}`);

            // Extract database connection details
            const dbUrl = new URL(process.env.DATABASE_URL);
            const dbName = dbUrl.pathname.slice(1);
            const dbHost = dbUrl.hostname;
            const dbPort = dbUrl.port || 5432;
            const dbUser = dbUrl.username;
            const dbPassword = dbUrl.password;

            // Create pg_dump command
            const pgDumpCmd = `PGPASSWORD="${dbPassword}" pg_dump -h ${dbHost} -p ${dbPort} -U ${dbUser} -d ${dbName} -F c -f ${backupPath}`;

            // Execute backup
            await execPromise(pgDumpCmd);

            console.log(`✅ Backup created: ${backupPath}`);

            // Encrypt backup
            await this.encryptBackup(backupPath, encryptedPath);

            // Delete unencrypted backup
            fs.unlinkSync(backupPath);

            // Create backup manifest
            const manifest = {
                fileName: `${backupFileName}.encrypted`,
                createdAt: new Date().toISOString(),
                database: dbName,
                size: fs.statSync(encryptedPath).size,
                checksum: this.calculateChecksum(encryptedPath)
            };

            const manifestPath = path.join(this.backupDir, `manifest-${timestamp}.json`);
            fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

            console.log(`✅ Encrypted backup created: ${encryptedPath}`);
            console.log(`📋 Manifest created: ${manifestPath}`);

            // Clean up old backups
            await this.cleanupOldBackups();

            return {
                success: true,
                backupPath: encryptedPath,
                manifestPath: manifestPath,
                manifest: manifest
            };
        } catch (error) {
            console.error('❌ Backup failed:', error);
            throw error;
        }
    }

    /**
     * Encrypt backup file
     */
    async encryptBackup(inputPath, outputPath) {
        return new Promise((resolve, reject) => {
            const key = Buffer.from(this.encryptionKey, 'hex');
            const iv = crypto.randomBytes(16);
            const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);

            const input = fs.createReadStream(inputPath);
            const output = fs.createWriteStream(outputPath);

            // Write IV at the beginning
            output.write(iv);

            input.pipe(cipher).pipe(output);

            output.on('finish', resolve);
            output.on('error', reject);
            input.on('error', reject);
        });
    }

    /**
     * Decrypt backup file
     */
    async decryptBackup(inputPath, outputPath) {
        return new Promise((resolve, reject) => {
            const key = Buffer.from(this.encryptionKey, 'hex');
            const input = fs.createReadStream(inputPath, { start: 0, end: 15 });
            
            let iv;
            input.on('data', (chunk) => {
                iv = chunk;
            });

            input.on('end', () => {
                const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
                const fullInput = fs.createReadStream(inputPath, { start: 16 });
                const output = fs.createWriteStream(outputPath);

                fullInput.pipe(decipher).pipe(output);

                output.on('finish', resolve);
                output.on('error', reject);
                fullInput.on('error', reject);
            });

            input.on('error', reject);
        });
    }

    /**
     * Calculate file checksum
     */
    calculateChecksum(filePath) {
        const fileBuffer = fs.readFileSync(filePath);
        return crypto.createHash('sha256').update(fileBuffer).digest('hex');
    }

    /**
     * Verify backup integrity
     */
    async verifyBackup(backupPath, manifestPath) {
        const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
        const currentChecksum = this.calculateChecksum(backupPath);

        if (currentChecksum !== manifest.checksum) {
            throw new Error('Backup checksum mismatch - backup may be corrupted');
        }

        return true;
    }

    /**
     * Restore backup
     */
    async restoreBackup(backupPath, manifestPath) {
        try {
            // Verify backup integrity
            await this.verifyBackup(backupPath, manifestPath);

            // Decrypt backup
            const decryptedPath = backupPath.replace('.encrypted', '');
            await this.decryptBackup(backupPath, decryptedPath);

            console.log(`📥 Restoring backup: ${decryptedPath}`);

            // Extract database connection details
            const dbUrl = new URL(process.env.DATABASE_URL);
            const dbName = dbUrl.pathname.slice(1);
            const dbHost = dbUrl.hostname;
            const dbPort = dbUrl.port || 5432;
            const dbUser = dbUrl.username;
            const dbPassword = dbUrl.password;

            // Restore using pg_restore
            const pgRestoreCmd = `PGPASSWORD="${dbPassword}" pg_restore -h ${dbHost} -p ${dbPort} -U ${dbUser} -d ${dbName} -c ${decryptedPath}`;

            await execPromise(pgRestoreCmd);

            // Delete decrypted backup
            fs.unlinkSync(decryptedPath);

            console.log(`✅ Backup restored successfully`);

            return { success: true };
        } catch (error) {
            console.error('❌ Restore failed:', error);
            throw error;
        }
    }

    /**
     * Clean up old backups (older than retention period)
     */
    async cleanupOldBackups() {
        try {
            const files = fs.readdirSync(this.backupDir);
            const now = Date.now();
            const retentionMs = this.retentionDays * 24 * 60 * 60 * 1000;

            let deletedCount = 0;

            for (const file of files) {
                const filePath = path.join(this.backupDir, file);
                const stats = fs.statSync(filePath);
                const age = now - stats.mtimeMs;

                if (age > retentionMs) {
                    fs.unlinkSync(filePath);
                    deletedCount++;
                    console.log(`🗑️ Deleted old backup: ${file}`);
                }
            }

            if (deletedCount > 0) {
                console.log(`✅ Cleaned up ${deletedCount} old backup(s)`);
            }

            return deletedCount;
        } catch (error) {
            console.warn('⚠️ Cleanup failed:', error.message);
            return 0;
        }
    }

    /**
     * List all backups
     */
    listBackups() {
        try {
            const files = fs.readdirSync(this.backupDir);
            const backups = [];

            for (const file of files) {
                if (file.endsWith('.encrypted')) {
                    const filePath = path.join(this.backupDir, file);
                    const stats = fs.statSync(filePath);
                    const manifestFile = file.replace('.sql.encrypted', '').replace('smartfarm-backup-', 'manifest-') + '.json';
                    const manifestPath = path.join(this.backupDir, manifestFile);

                    let manifest = null;
                    if (fs.existsSync(manifestPath)) {
                        manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
                    }

                    backups.push({
                        fileName: file,
                        path: filePath,
                        size: stats.size,
                        createdAt: stats.mtime,
                        manifest: manifest
                    });
                }
            }

            return backups.sort((a, b) => b.createdAt - a.createdAt);
        } catch (error) {
            console.error('Failed to list backups:', error);
            return [];
        }
    }
}

// CLI usage
if (require.main === module) {
    const backup = new BackupAutomation();
    const command = process.argv[2];

    (async () => {
        try {
            switch (command) {
                case 'create':
                    await backup.createBackup();
                    break;
                case 'list':
                    const backups = backup.listBackups();
                    console.log('Available backups:');
                    backups.forEach(b => {
                        console.log(`  - ${b.fileName} (${(b.size / 1024 / 1024).toFixed(2)} MB) - ${b.createdAt}`);
                    });
                    break;
                case 'cleanup':
                    await backup.cleanupOldBackups();
                    break;
                default:
                    console.log('Usage: node backup-automation.js [create|list|cleanup]');
            }
        } catch (error) {
            console.error('Error:', error);
            process.exit(1);
        }
    })();
}

module.exports = BackupAutomation;

