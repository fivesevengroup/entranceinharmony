import { createReadStream } from 'fs';
import { Parse } from 'unzipper';

const zipPath = 'attached_assets/Leitungen & Preise_1759695032171.zip';

const stream = createReadStream(zipPath).pipe(Parse());

for await (const entry of stream) {
  console.log('File:', entry.path, 'Type:', entry.type, 'Size:', entry.vars.uncompressedSize);
  entry.autodrain();
}
