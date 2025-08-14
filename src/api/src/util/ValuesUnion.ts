export type ValuesUnion<T> = T extends { [key: string]: infer U }
  ? U
  : T extends (infer U)[]
    ? U
    : never;
