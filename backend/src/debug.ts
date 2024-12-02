import fs from 'fs';
import path from 'path';

const envPath = path.resolve(__dirname, '../.env');
console.log('Trying to read .env file from:', envPath);

try {
  const envContents = fs.readFileSync(envPath, 'utf8');
  console.log('Contents of .env file:', envContents);
} catch (error) {
  console.error('Error reading .env file:', error);
}
