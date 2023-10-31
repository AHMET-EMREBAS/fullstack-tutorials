import { Category, Department } from '@techbir/database';
import { Repository } from 'typeorm';
import { commonDepartmentsAndCategoreis } from './categories';

export async function seedCategory(
  departmentRepo: Repository<Department>,
  categoryRepo: Repository<Category>
) {
  for (const [key, value] of Object.entries(commonDepartmentsAndCategoreis)) {
    try {
      await departmentRepo.save({ name: key });
    } catch (err) {
      console.error(err);
    }

    for (const cat of value) {
      try {
        await categoryRepo.save({ name: cat });
      } catch (err) {
        console.error(err);
      }
    }
  }
}
