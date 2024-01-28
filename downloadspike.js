const https = require('https');
const fs = require('fs');
const AdmZip = require('adm-zip');

const url = 'https://github.com/TsuyoshiUshio/BlogBabel/releases/download/v1.0.0-preview.5/BlogBabel-win-x64.zip'; // 'https://github.com/TsuyoshiUshio/BlogBabel/releases/download/v1.0.0-preview.5/BlogBabel-win-x64.zip'; // Replace with your ZIP file's URL
const outputPath = 'downloaded.zip'; // Temporary output path for the downloaded ZIP file
const extractPath = 'extracted/'; // Directory where the contents will be extracted

https.get(url, (response) => {
  if (response.statusCode !== 200 && response.statusCode !== 302) {
    console.error(`Failed to download file: ${response.statusCode}`);
    response.resume();
    return;
  }

  if (response.statusCode == 302) {
    const newUrl = response.headers.location;
    https.get(newUrl, (response) => {
      if (response.statusCode !== 200 && response.statusCode !== 302) {
        console.error(`Failed to download file: ${response.statusCode}`);
        response.resume();
        return;
      }
    
      const fileStream = fs.createWriteStream(outputPath);
      response.pipe(fileStream);
    
      fileStream.on('finish', () => {
        fileStream.close();
        console.log('Download completed, extracting...');
    
        // Unzip the file
        const zip = new AdmZip(outputPath);
        zip.extractAllTo(extractPath, true);
        console.log(`Extraction completed to "${extractPath}"`);
    
        // Optionally, delete the downloaded ZIP file after extraction
        fs.unlinkSync(outputPath);
        console.log('Downloaded ZIP file removed.');
      });
    })
  };

}).on('error', (err) => {
  console.error(`Error: ${err.message}`);
});
