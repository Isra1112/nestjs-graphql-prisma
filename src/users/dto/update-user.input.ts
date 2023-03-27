import { CreateUserInput } from './create-user.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateUserInput extends PartialType(CreateUserInput) {
  public id: string;
  public email: string;
  public name: string;
  public age: number;
}
