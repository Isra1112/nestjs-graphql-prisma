import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async create(createUserInput: CreateUserInput): Promise<User> {
    return this.prisma.user.create({
      data: createUserInput,
    });
  }

  findAll() {
    return this.prisma.user.findMany({ include: { posts: true } });
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id: id, 
      },
    });
  }

  update(updateUserInput: UpdateUserInput) {
    const { id, ...updateUserInputWithoutId } = updateUserInput;
    return this.prisma.user.update({
      where: {
        id: id,
      },
      data: updateUserInputWithoutId,
    });
  }

  remove(id: string) {
    return this.prisma.user.delete({
      where: {
        id: id,
      },
    });
  }
}
