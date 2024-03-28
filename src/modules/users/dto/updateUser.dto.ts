import { IsString } from 'class-validator'
import { CreateUserDto } from './createUser.dto'

export class UpdateUserDto extends CreateUserDto {
  @IsString()
  id: string
}
