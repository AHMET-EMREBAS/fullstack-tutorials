export function CombineClassDecorators(
  ...propertyDecorators: ClassDecorator[]
): ClassDecorator {
  return (target: any) => {
    for (const decorator of propertyDecorators) {
      decorator(target);
    }
  };
}


