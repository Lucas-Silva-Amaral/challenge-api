import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Address } from '../address/entities/address.entity'
import { randomUUID } from 'crypto'
import { DeleteResult, Repository } from 'typeorm'
import { User } from './entities/users.entity'
import { CreateUserDto } from './dto/createUser.dto'
import {
  FAILURE_IN_DELETE_USER,
  FAILURE_UPDATE_USER,
  USER_NOT_FOUND
} from 'src/common/constants/error.constants'
import { UpdateUserDto } from './dto/updateUser.dto'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Address)
    private readonly addressRepo: Repository<Address>
  ) {}

  async getUsers(): Promise<User[]> {
    return await this.userRepo.find({
      relations: ['addresses'],
      order: {
        createdAt: 'DESC'
      }
    })
  }

  async getUser(id: string): Promise<User> {
    return await this.userRepo.findOne({ where: { id } })
  }

  async createUser(input: CreateUserDto): Promise<User> {
    const userCreated: User = this.userRepo.create({
      ...input,
      id: randomUUID()
    })

    const listAddress = userCreated.addresses.map(item => ({
      ...item,
      userId: userCreated.id,
      id: randomUUID()
    }))
    console.log('🚀 ~ UserService ~ listAddress ~ listAddress:', listAddress)

    userCreated.addresses = listAddress
    const userSaved = await this.userRepo.save(userCreated)

    await Promise.all(
      listAddress.map(address => this.addressRepo.save(address))
    )

    return userSaved
  }

  async deleteUser(id: string): Promise<DeleteResult> {
    try {
      return this.userRepo.delete(id)
    } catch (error) {
      throw new NotFoundException(FAILURE_IN_DELETE_USER)
    }
  }

  async updateUser(id: string, updateData: UpdateUserDto): Promise<User> {
    const user = await this.userRepo.findOneOrFail({ where: { id } })

    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND)
    }

    try {
      Object.assign(user, updateData)
      const userUpdated = await this.userRepo.save(user)

      return userUpdated
    } catch (error) {
      throw new NotFoundException(FAILURE_UPDATE_USER)
    }
  }
}
