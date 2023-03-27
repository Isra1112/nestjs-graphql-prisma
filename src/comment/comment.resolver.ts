import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CommentService } from './comment.service';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';

@Resolver('Comment')
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @Mutation('createComment')
  async create(@Args('createCommentInput') createCommentInput: CreateCommentInput) {
    return this.commentService.create(createCommentInput);
  }

  @Query('comments')
  async findAll() {
    console.log('findAll Resolver');
    
    return this.commentService.findAll();
  }

  @Query('comment')
  async findOne(@Args('id') id: string) {
    return this.commentService.findOne(id);
  }

  @Mutation('updateComment')
  async update(@Args('updateCommentInput') updateCommentInput: UpdateCommentInput) {
    return this.commentService.update(updateCommentInput);
  }

  @Mutation('removeComment')
  async remove(@Args('id') id: string) {
    return this.commentService.remove(id);
  }
}
