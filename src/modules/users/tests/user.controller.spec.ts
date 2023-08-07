import { Test } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { CreateUserUseCase } from '../use-cases/create-user.usecase';
import { CreateUserSchemaDTO } from '../schemas/create-user.schema';
import { IUserRepository } from '../repositories/user.repository';
import { UserInMemoryRepository } from '../repositories/in-memory/user.in-memory.repository';
import { ProfileUserUseCase } from '../use-cases/profile-user.usecase';
import { UserAvatarUseCase } from '../use-cases/user-avatar.usecase';
import { IStorageRepository } from '../../../infra/providers/storage/storage.repository';
import { StorageSupabaseRepository } from '../../../infra/providers/storage/supabase/storage.supabase.repository';

describe('User Controller', () => {
  let userController: UserController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        CreateUserUseCase,
        ProfileUserUseCase,
        UserAvatarUseCase,
        {
          provide: IUserRepository,
          useClass: UserInMemoryRepository,
        },
        {
          provide: IStorageRepository,
          useValue: {
            upload: jest.fn(),
          },
        },
      ],
    }).compile();

    userController = moduleRef.get<UserController>(UserController);
  });

  it('should be able to create a new user', async () => {
    const body: CreateUserSchemaDTO = {
      name: 'Victor Controller',
      username: 'victorController',
      email: 'victorController@gmail.com',
      password: '123456',
    };

    const result = await userController.create(body);

    console.log(result);

    expect(result).toBeDefined();
  });
});
