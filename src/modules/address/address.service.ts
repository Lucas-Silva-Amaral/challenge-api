import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult, Repository } from 'typeorm'
import { CreateAddressDto } from './dto/createAddress.dto'
import { Address } from './entities/address.entity'
import {
  ADDRESS_NOT_FOUND,
  FAILURE_IN_DELETE_ADDRESS,
  FAILURE_IN_GET_USERS
} from 'src/common/constants/error.constants'

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepo: Repository<Address>
  ) {}

  async createAddress(
    addressData: CreateAddressDto,
    userId: string
  ): Promise<Address> {
    return this.addressRepo.save({ ...addressData, personId: userId })
  }

  async deleteOneAddress(id: string): Promise<DeleteResult> {
    const findAddress = await this.addressRepo.findOne({ where: { id } })
    if (!findAddress) {
      throw new NotFoundException(ADDRESS_NOT_FOUND)
    }

    try {
      return await this.addressRepo.delete(id)
    } catch (error) {
      throw new NotFoundException(FAILURE_IN_DELETE_ADDRESS)
    }
  }

  async getAll(): Promise<CreateAddressDto[]> {
    try {
      return await this.addressRepo.find()
    } catch (error) {
      throw new NotFoundException(FAILURE_IN_GET_USERS)
    }
  }
}
