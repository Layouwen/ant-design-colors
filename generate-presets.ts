import type { PalettesProps } from './src/types';
import generate from './src/generate';
import { writeFileSync } from 'fs'

const presetPrimaryColors: Record<string, string> = {
  red: '#F5222D',
  volcano: '#FA541C',
  orange: '#FA8C16',
  gold: '#FAAD14',
  yellow: '#FADB14',
  lime: '#A0D911',
  green: '#52C41A',
  cyan: '#13C2C2',
  blue: '#1677FF',
  geekblue: '#2F54EB',
  purple: '#722ED1',
  magenta: '#EB2F96',
  grey: '#666666',
};

const presetPalettes: PalettesProps = {};
const presetDarkPalettes: PalettesProps = {};

Object.keys(presetPrimaryColors).forEach((key): void => {
  presetPalettes[key] = generate(presetPrimaryColors[key]);
  presetPalettes[key].primary = presetPalettes[key][5];

  // dark presetPalettes
  presetDarkPalettes[key] = generate(presetPrimaryColors[key], {
    theme: 'dark',
    backgroundColor: '#141414',
  });
  presetDarkPalettes[key].primary = presetDarkPalettes[key][5];
});

writeFileSync('./src/presets.ts', `// Generated by script. Do NOT modify!
import type { Palette, PalettesProps } from './types';

export const presetPrimaryColors: Record<string, string> = ${JSON.stringify(presetPrimaryColors, null, 2)};

${Object.keys(presetPrimaryColors).map(key => `export const ${key}: Palette = ${JSON.stringify(presetPalettes[key], null, 2)};\n${key}.primary = ${key}[5];`).join('\n\n')}

export const gray = grey;

export const presetPalettes: PalettesProps = {
  ${Object.keys(presetPrimaryColors).join(',\n  ')},
};

${Object.keys(presetPrimaryColors).map(key => `export const ${key}Dark: Palette = ${JSON.stringify(presetDarkPalettes[key], null, 2)};\n${key}Dark.primary = ${key}Dark[5];`).join('\n\n')}

export const presetDarkPalettes: PalettesProps = {
  ${Object.keys(presetPrimaryColors).map(key => `${key}: ${key}Dark`).join(',\n  ')},
};
`);