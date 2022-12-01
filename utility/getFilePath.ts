import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

export const getFilePath = (file, metaUrl) => {
    const __filename = fileURLToPath(metaUrl);
    const __dirname = dirname(__filename);
    return join(__dirname, file);
};
