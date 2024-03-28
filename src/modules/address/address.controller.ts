import { Address } from './entities/address.entity'
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'
import { AddressService } from './address.service'
import { CreateAddressDto } from './dto/createAddress.dto'
import { DeleteResult } from 'typeorm'

@Controller('address')
export class AddressController {
  constructor(private addressService: AddressService) {}

  @Post(':userId')
  @UsePipes(ValidationPipe)
  @HttpCode(201)
  async createAddress(
    @Body() address: CreateAddressDto,
    @Param('userId') userId: string
  ): Promise<Address> {
    return this.addressService.createAddress(address, userId)
  }

  @Delete(':id')
  @UsePipes(ValidationPipe)
  @HttpCode(204)
  async deleteAddress(@Param('id') id: string): Promise<DeleteResult> {
    return await this.addressService.deleteOneAddress(id)
  }

  @Get()
  @HttpCode(200)
  async getAll(): Promise<CreateAddressDto[]> {
    return this.addressService.getAll()
  }
}
