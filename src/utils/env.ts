import dotenv from 'dotenv';

dotenv.config();

export interface envProps {
  name: string;
  defaultValue?: string;
}

export function env(params: envProps) {
  const { name, defaultValue } = params;

  const value = process.env[name];

  if (value) return value;

  if (defaultValue) return defaultValue;

  throw new Error(`Missing: process.env['${name}'].`);
}
