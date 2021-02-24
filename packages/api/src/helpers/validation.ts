import { Length, IsEmail, IsString } from 'class-validator';
interface AuthSchemaInterface {
  email: string;
  password: string;
}
export class AuthSchema {
  @IsEmail()
  email!: string;

  @IsString()
  @Length(4, 64)
  password!: string;

  constructor(authData: AuthSchemaInterface) {
    Object.assign(this, authData);
  }
}
