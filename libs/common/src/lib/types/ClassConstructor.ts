export type ClassConstructor<T> = {
  new (...args: any[]): T;
};

export type ClassConstructorWithProperties<T, Args> = {
  new (args: Args): T;
};
