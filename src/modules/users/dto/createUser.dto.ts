import { IsString } from 'class-validator'
import { Address } from 'src/modules/address/entities/address.entity'

export class CreateUserDto {
  @IsString()
  name: string

  @IsString()
  gender: string

  @IsString()
  birthdate: string

  @IsString()
  maritalStatus: string

  address: Address
}
