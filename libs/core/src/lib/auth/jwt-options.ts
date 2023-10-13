import { JwtModuleOptions } from '@nestjs/jwt';
import { v4 } from 'uuid';

export const JWT_OPTIONS: JwtModuleOptions = {
  secret: v4(),
  signOptions: {
    /**
     *  60 -> one minute
     * "60000" -> one minute
     * "3d" -> 3 days
     */
    expiresIn: 60,
  },
};
