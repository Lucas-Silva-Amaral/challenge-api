import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  // Patch,
  Post
} from '@nestjs/common'
import { UserService } from './user.service'
import { User } from './entities/users.entity'
import { CreateUserDto } from './dto/createUser.dto'
import { UpdateUserDto } from './dto/updateUser.dto'

@Controller('users')
export class PersonController {
  constructor(private readonly personService: UserService) {}

  @Get()
  @HttpCode(200)
  async getAllUsers() {
    return await this.personService.getUsers()
  }

  @Get(':id')
  @HttpCode(200)
  async getOneUser(@Param('id') id: string): Promise<User> {
    return await this.personService.getUser(id)
  }

  @Post()
  @HttpCode(201)
  async createOneUser(@Body() input: CreateUserDto): Promise<User> {
    return await this.personService.createUser(input)
  }

  @Patch(':id')
  @HttpCode(201)
  async updateOneUser(
    @Param('id') id: string,
    @Body() updateDto: UpdateUserDto
  ) {
    return await this.personService.updateUser(id, updateDto)
  }

  @Delete(':userId')
  @HttpCode(204)
  async deleteOneUser(@Param('userId') userId: string) {
    return await this.personService.deleteUser(userId)
  }
}
