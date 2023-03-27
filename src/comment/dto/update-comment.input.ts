import { CreateCommentInput } from './create-comment.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateCommentInput extends PartialType(CreateCommentInput) {
  id: string;
  text: string;
  postId: string;
  authorId: string;
}