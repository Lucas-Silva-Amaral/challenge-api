import { IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateAddressDto {
  @IsString()
  city: string

  @IsString()
  state: string

  @IsString()
  country: string

  @IsString()
  zipcode: string

  @IsNumber()
  number: number

  @IsString()
  @IsOptional()
  complement: string

  @IsString()
  neighborhood: string

  @IsString()
  street: string
}
