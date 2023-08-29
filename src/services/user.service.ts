import { User } from "../types/user.types";

class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserById(id: string): Promise<User> {
    return this.userRepository.getUserById(id);
  }
}