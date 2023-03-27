import { Injectable } from '@nestjs/common';
import { Post } from '@prisma/client';
import { NewPost, UpdatePost } from 'src/graphql.schema';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) { }

  async findOne(id: string): Promise<Post | null> {
    return this.prisma.post.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
        comments: { include: { author: true } },
      },
    });
  }

  async findAll(): Promise<Post[]> {
    const result = this.prisma.post.findMany({
      include: {
        user: true,
        comments: { include: { author: true, subcomments:{include:{author:true}} },where:{parentId: null }}, 
      }
    }).then((result) => {
      // console.log('result', result);
      return result;
    }).catch((error) => {
      // console.log('error', error);
      return error;
    });
    // console.log('findAll',result);
    
    return result;
  }

  async create(input: NewPost): Promise<Post> {
    return this.prisma.post.create({
      data: input
    });
  }

  async update(params: UpdatePost): Promise<Post> {
    const { id, ...params_without_id } = params;

    return this.prisma.post.update({
      where: {
        id,
      },
      data: {
        ...params_without_id,
      },
      include: {
        user: true,
        comments: { include: { author: true } },
      }
    });
  }

  async delete(id: string): Promise<Post> {
    return this.prisma.post.delete({
      where: {
        id,
      }, include: {
        user: true,
        comments: { include: { author: true } },
      }
    });
  }
}
