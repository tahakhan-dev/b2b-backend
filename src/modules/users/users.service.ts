import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRole } from 'src/common/enums/user-role';
import { UserSignUpType } from 'src/common/enums/signup-type';
import 'dotenv/config';


@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
    @InjectRepository(UserEntity, process.env.CONNECTION_NAME_2)
    private userRepositorySlave: Repository<UserEntity>,
  ) { }


  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll() {
    let resp = await this.userRepository.save({
      userName: 'tahakhwan2282', email: "t2hakhwan282@gmail.com",
      password: "sjdflswjdfk", role: UserRole.USER, signUpType: UserSignUpType.CUSTOM
    })
    let resp1 = await this.userRepositorySlave.find({ where: { userName: "tahakhan2282" } });
    console.log('============resp1===========', resp1);

    console.log(resp, '=========resp================');

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
