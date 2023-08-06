import { Test } from '@nestjs/testing';
import { CreateUserUseCase } from '../create-user.usecase';
import { CreateUserDTO } from '../../dto/user.dto';
import { IUserRepository } from '../../repositories/user.repository';
import { UserInMemoryRepository } from '../../repositories/in-memory/user.in-memory.repository';

describe('Create user', () => {
  let createUserUseCase: CreateUserUseCase;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CreateUserUseCase,
        {
          provide: IUserRepository,
          useClass: UserInMemoryRepository,
        },
      ],
    }).compile();

    createUserUseCase = moduleRef.get<CreateUserUseCase>(CreateUserUseCase);
  });

  it('should be able to create a new user', async () => {
    const data: CreateUserDTO = {
      name: 'Regina',
      username: 'Regina100%',
      email: 'reginaSalva@gmail.com',
      password: '123456',
    };

    const result = await createUserUseCase.execute(data);

    expect(result).toHaveProperty('created_at');
  });
});
