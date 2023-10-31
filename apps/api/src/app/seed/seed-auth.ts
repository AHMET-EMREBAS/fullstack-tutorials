import { Repository } from 'typeorm';
import { UserConfig } from '../config';
import { Permission, Role, User } from '@techbir/core';

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
      try {
        await permissionRepo.save({ name: `${action}.${resource}` });
      } catch (err) {
        console.error(err);
      }
    }
  }

  for (const role of roles) {
    try {
      await roleRepo.save({ name: role });
    } catch (err) {
      console.error(err);
    }
  }

  // Getting permissions
  const savedPermissions = await permissionRepo.find();

  // Creating admin role
  const adminRole = await roleRepo.findOne({ where: { name: 'admin' } });

  // Adding admin permissions to admin role
  for (const permission of savedPermissions) {
    try {
      await roleRepo
        .createQueryBuilder()
        .relation('permissions')
        .of(adminRole.id)
        .add(permission.id);
    } catch (err) {
      console.error(err);
    }
  }

  try {
    // Create root user
    await userRepo.save({
      firstName: 'root',
      lastName: 'root',

      username: UserConfig.ROOT_USERNAME,
      password: UserConfig.ROOT_PASSWORD,
      isAdmin: true,
    });
  } catch (err) {
    console.error(err);
  }
}
