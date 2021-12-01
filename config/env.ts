import * as fs from 'fs';
import * as path from 'path';

const isProd = process.env.NODE_ENV === 'production';

function parseEnv() {
  const localEnv = path.resolve('.env');
  const prodEnv = path.resolve('.env.prod');

  if (!fs.existsSync(localEnv) && !fs.existsSync(prodEnv)) {
    throw new Error('Config file is missing!');
  }

  const filePath = isProd && fs.existsSync(prodEnv) ? prodEnv : localEnv;

  return { path: filePath };
}

export default parseEnv();
