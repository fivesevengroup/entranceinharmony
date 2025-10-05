import { createReadStream, createWriteStream, mkdirSync } from 'fs';
import { pipeline } from 'stream/promises';
import { Parse } from 'unzipper';

const zipPath = 'attached_assets/Leitungen & Preise_1759695032171.zip';
const outputDir = 'attached_assets/extracted';

try {
  mkdirSync(outputDir, { recursive: true });
  
  const stream = createReadStream(zipPath)
    .pipe(Parse());

  for await (const entry of stream) {
    const fileName = entry.path;
    const type = entry.type;
    const fullPath = `${outputDir}/${fileName}`;
    
    if (type === 'File') {
      console.log('Extracting:', fileName);
      await pipeline(entry, createWriteStream(fullPath));
    } else {
      entry.autodrain();
    }
  }
  
  console.log('Extraction complete!');
} catch (err) {
  console.error('Error:', err);
}
