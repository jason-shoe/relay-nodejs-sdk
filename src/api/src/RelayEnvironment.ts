import { ValuesUnion } from './util/ValuesUnion';

export const RelayEnvironment = {
  DEV: 'DEV',
  PROD: 'PROD',
} as const;

export type RelayEnvironment = ValuesUnion<typeof RelayEnvironment>;
