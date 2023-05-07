import { ICreateUser, ILoginUser } from './interface/res/user.interface';
import { CreateUserCommand } from './commands/create-user.command';
import { LoginUserCommand } from './commands/login-user.command';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { LoginUserDto } from './dto/login-user.dto';
import { Injectable } from '@nestjs/common';
import 'dotenv/config';


@Injectable()
export class UsersService {

  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    // @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
    // @InjectRepository(UserEntity, process.env.CONNECTION_NAME_2)
    // private userRepositorySlave: Repository<UserEntity>,
  ) { }


  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async createUserServiceHandler(createUserDto: CreateUserDto): Promise<ICreateUser> {
    return await this.commandBus.execute(
      new CreateUserCommand(createUserDto)
    )
  }

  async LoginUserServiceHandler(loginUserDto: LoginUserDto): Promise<ILoginUser> {
    return await this.commandBus.execute(
      new LoginUserCommand(loginUserDto)
    )
  }

  async findAll() {
    // let resp = await this.userRepository.save({
    //   userName: 'tahakhwan2282', email: "t2hakhwan282@gmail.com",
    //   password: "sjdflswjdfk", role: UserRole.BUYER, signUpType: UserSignUpType.CUSTOM
    // })
    // let resp1 = await this.userRepositorySlave.find({ where: { userName: "tahakhan2282" } });
    // console.log('============resp1===========', resp1);

    // console.log(resp, '=========resp================');

    return 'resp1';
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
