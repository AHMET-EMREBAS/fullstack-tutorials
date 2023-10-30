export function CombineMethodDecorators(
  ...decorators: MethodDecorator[]
): MethodDecorator {
  return (target: any, property: any, descriptor: any) => {
    for (const d of decorators) {
      d(target, property, descriptor);
    }
  };
}
