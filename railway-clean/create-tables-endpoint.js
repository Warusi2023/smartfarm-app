// Add this to your server.js to create tables via API endpoint

const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

// Create tables endpoint
app.post('/api/admin/create-tables', async (req, res) => {
  try {
    const { DATABASE_URL } = process.env;
    if (!DATABASE_URL) {
      return res.status(500).json({
        status: 'error',
        message: 'DATABASE_URL not configured'
      });
    }

    const client = new Client({ connectionString: DATABASE_URL });
    await client.connect();

    // Read the schema file
    const schemaPath = path.join(__dirname, 'database', 'migrations', '001_full_schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');

    // Execute the schema
    await client.query(schema);

    await client.end();

    res.json({
      status: 'success',
      message: 'All tables created successfully!',
      tables: 46
    });

  } catch (error) {
    console.error('Table creation error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to create tables',
      error: error.message
    });
  }
});
