import YAML from 'yamljs';
import fs from 'fs';
import path from 'path';

export interface District {
  id: number;
  name: string;
}
export interface Product {
  name: string;
  attachmentId: string;
}
const districts: District[] = YAML.load(path.join(__dirname, '..','..', 'assets', 'districts.yml'));
const kfcProducts: Product[] = YAML.load(path.join(__dirname, '..','..', 'assets', 'kfc-products.yml'));

export const assets = {
  districts,
  kfcProducts,
}