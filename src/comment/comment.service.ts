import { Injectable } from '@nestjs/common';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) { }
  async create(createCommentInput: CreateCommentInput) {
    return this.prisma.comment.create({
      data: createCommentInput,
      include: {
        post: true,
        author: true,
        comment: true,
        subcomments: { include: { author: true, subcomments:{include:{author:true}} },where:{parentId: null }},
      },
    });
  }

  async findAll() {
    return this.prisma.comment.findMany({
      include: {
        post: true,
        author: true,
        comment: true,
        // comments: true,
        subcomments: { include: { author: true, subcomments:{include:{author:true}} }},
      },
      where:{parentId: null }
    });
  }

  async findOne(id: string) {
    return this.prisma.comment.findUnique({
      where: {
        id: id,
      },
      include: {
        post: true,
        author: true,
        comment: true,
        subcomments: true,
      },
    })
      ;
  }

  async update(updateCommentInput: UpdateCommentInput) {
    const { id, ...updateCommentInputWithoutId } = updateCommentInput;

    return this.prisma.comment.update({
      where: {
        id: id,
      },
      data: updateCommentInputWithoutId,
      include: {
        post: true,
        author: true,
        comment: true,
        subcomments: true,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.comment.delete({
      where: {
        id: id,
      },
      include: {
        post: true,
        author: true,
        comment: true,
        subcomments: true,
      },
    });
  }
}