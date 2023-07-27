import {
  UserCreatedDTO,
  UserToPrisma,
  UsernameAndEmail,
} from '../dto/user.dto';

export abstract class IUserRepository {
  abstract save(data: UserToPrisma): Promise<UserCreatedDTO>;
  abstract findByUsername(username: string): Promise<UserCreatedDTO>;
  abstract findByUsernameOrEmail(
    data: UsernameAndEmail,
  ): Promise<UserCreatedDTO | null>;
}
