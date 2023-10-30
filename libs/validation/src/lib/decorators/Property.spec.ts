import { validateSync } from 'class-validator';
import { Property } from './Property';
describe('Property', () => {
  it('should validate minLength', () => {
    class Sample {
      @Property({ type: 'string', minLength: 3 })
      text!: string;
      constructor(obj: Sample) {
        Object.assign(this, obj);
      }
    }

    const errors = validateSync(new Sample({ text: 'a' }));

    expect(errors.length).toBe(1);
    expect(errors[0].constraints).toBeTruthy();

    if (errors) {
      const constraints = errors[0].constraints;
      if (constraints) {
        expect(constraints['minLength']).toBeTruthy();
      }
    }
  });
});
