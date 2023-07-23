import { Controller, Get, Param, Query } from '@nestjs/common';

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
}
