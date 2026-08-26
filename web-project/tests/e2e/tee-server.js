/**
 * Run a child process and tee stdout/stderr to a log file under test-results/e2e-server-logs/.
 * Usage: node tests/e2e/tee-server.js <logfile> <command> [args...]
 */
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const logName = process.argv[2];
const command = process.argv[3];
const args = process.argv.slice(4);

if (!logName || !command) {
  console.error('Usage: node tests/e2e/tee-server.js <logfile> <command> [args...]');
  process.exit(1);
}

const logDir = path.join(__dirname, '..', '..', 'test-results', 'e2e-server-logs');
fs.mkdirSync(logDir, { recursive: true });
const logPath = path.join(logDir, logName);
const logStream = fs.createWriteStream(logPath, { flags: 'w' });

function tee(chunk, stream) {
  stream.write(chunk);
  logStream.write(chunk);
}

const child = spawn(command, args, {
  env: process.env,
  shell: true,
  stdio: ['ignore', 'pipe', 'pipe']
});

child.stdout.on('data', (chunk) => tee(chunk, process.stdout));
child.stderr.on('data', (chunk) => tee(chunk, process.stderr));
child.on('error', (err) => {
  const msg = `[tee-server] failed to start ${command}: ${err.message}\n`;
  process.stderr.write(msg);
  logStream.write(msg);
  process.exit(1);
});
child.on('exit', (code, signal) => {
  logStream.end();
  if (signal) {
    process.exit(1);
  }
  process.exit(code == null ? 1 : code);
});
