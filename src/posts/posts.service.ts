import { Injectable, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}
  async create(createPostDto: CreatePostDto, userId: any) {
    console.log(userId);
    const post = new Post();
    post.title = createPostDto.title;
    post.description = createPostDto.description;
    post.user = userId;
    const saveItmes = await this.postRepository.save(post);
    return saveItmes;
  }

  async findAll() {
    const data = await this.postRepository.find();
    if (data.length == 0) {
      return 'No Post Found!';
    }
    return data;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
