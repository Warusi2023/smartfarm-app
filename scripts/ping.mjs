import https from 'https';
const urls = [
  'https://web-production-86d39.up.railway.app/api/health',
  'https://web-production-86d39.up.railway.app/api',
  'https://web-production-86d39.up.railway.app/'
];
for (const url of urls) {
  await new Promise((resolve) => {
    const r = https.get(url, (res) => {
      let data=''; res.on('data', c => data+=c);
      res.on('end', () => { console.log('\nURL', url, '\nStatus', res.statusCode, '\nBody', data.slice(0,200)); resolve(); });
    });
    r.on('error', e => { console.log('\nURL', url, '\nERR', e.message); resolve(); });
  });
}
