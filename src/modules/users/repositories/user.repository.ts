import {
  UserCreatedDTO,
  UserToPrisma,
  UsernameAndEmail,
} from '../dto/user.dto';

export abstract class IUserRepository {
  abstract save(data: UserToPrisma): Promise<UserCreatedDTO>;
  abstract findById(id: string): Promise<UserCreatedDTO | null>;
  abstract findByUsername(username: string): Promise<UserCreatedDTO | null>;
  abstract findByUsernameOrEmail(
    data: UsernameAndEmail,
  ): Promise<UserCreatedDTO | null>;
  abstract updateAvatar(id: string, avatarUrl: string): Promise<void>;
}
