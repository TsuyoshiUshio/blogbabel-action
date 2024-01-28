const fs = require('fs');
const AdmZip = require('adm-zip');
const { pipeline } = require('stream');
const { promisify } = require('util');

const url = 'https://github.com/TsuyoshiUshio/BlogBabel/releases/download/v1.0.0-preview.5/BlogBabel-win-x64.zip';
const outputPath = 'downloaded.zip';
const extractPath = 'extracted/';

const download = async (url, outputPath) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`unexpected response ${response.statusText}`);
  await promisify(pipeline)(response.body, fs.createWriteStream(outputPath));
  console.log('Download completed, extracting...');
};

download(url, outputPath)
  .then(() => {
    const zip = new AdmZip(outputPath);
    zip.extractAllTo(extractPath, true);
    console.log(`Extraction completed to "${extractPath}"`);
    fs.unlinkSync(outputPath);
    console.log('Downloaded ZIP file removed.');
  })
  .catch((err) => console.error(`Error: ${err.message}`));