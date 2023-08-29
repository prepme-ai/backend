import { User } from "../types/user.types";
import UserRepository from "../models/user.model";
class UserService {
  constructor(
    private userRepository: typeof UserRepository = UserRepository
  ) {
    this.userRepository = UserRepository;
  }

    async postRegister(user: User): Promise<User> {
        const newUser = new this.userRepository(user);
        await newUser.save();
        return newUser;
    }
}
export default UserService;