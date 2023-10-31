import { Permission, Role, User } from '@techbir/database';
import { Repository } from 'typeorm';
import { Config } from '../config/config';

/**
 * Create permissions and roles
 * @param userRepo
 * @param roleRepo
 * @param permissionRepo
 */
export async function seedAuth(
  userRepo: Repository<User>,
  roleRepo: Repository<Role>,
  permissionRepo: Repository<Permission>
) {
  const roles = ['admin'];
  const resources = ['user', 'role', 'permission', 'category', 'department'];
  const actions = ['read', 'write'];

  for (const action of actions) {
    for (const resource of resources) {
      await permissionRepo.save({ name: `${action}.${resource}` });
    }
  }

  for (const role of roles) {
    await roleRepo.save({ name: role });
  }

  setTimeout(async () => {
    // Getting permissions
    const savedPermissions = await permissionRepo.find();

    // Creating admin role
    const adminRole = await roleRepo.findOne({ where: { name: 'admin' } });

    // Adding admin permissions to admin role
    for (const permission of savedPermissions) {
      await roleRepo
        .createQueryBuilder()
        .relation('permissions')
        .of(adminRole.id)
        .add(permission.id);
    }

    // Create root user
    const saved = await userRepo.save({
      username: Config.ROOT_USERNAME,
      password: Config.ROOT_PASSWORD,
    });
  }, 3000);
}
