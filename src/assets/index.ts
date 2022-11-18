import YAML from 'yamljs';
import fs from 'fs';
import path from 'path';

export interface District {
  id: number;
  name: string;
}

const districts: District[] = YAML.load(path.join(__dirname, '..','..', 'assets', 'districts.yml'));

export const assets = {
  districts,
}