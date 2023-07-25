import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { randomUUID } from 'crypto';

type BodyUser = {
  name: string;
  username: string;
  password: string;
  email: string;
};

@Controller('users')
export class UserController {
  @Get(':id')
  findById(@Param('id') id: string) {
    console.log(id);

    return 'Usuário do ID: ' + id;
  }

  @Get('findByPages')
  findByPages(@Query('p') p: string) {
    return 'Queries p: ' + p;
  }

  @Post('/create')
  create(@Body() body: BodyUser) {
    return { ...body, id: randomUUID() };
  }
}
