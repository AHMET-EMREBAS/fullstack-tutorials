export function CombinePropertyDecorators(
  ...propertyDecorators: PropertyDecorator[]
): PropertyDecorator {
  return (target: any, propertyKey: any) => {
    for (const decorator of propertyDecorators) {
      decorator(target, propertyKey);
    }
  };
}
