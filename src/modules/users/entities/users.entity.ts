import { Entity, Column, OneToMany, JoinColumn } from 'typeorm'
import { Address } from '../../address/entities/address.entity'
import { BaseEntity } from 'src/modules/bases/entities/base.entity'

@Entity({ name: 'user' })
export class User extends BaseEntity {
  @Column({ nullable: false })
  name: string

  @Column({ nullable: false })
  gender: string

  @Column({ nullable: false })
  birthdate: string

  @Column({ nullable: false })
  maritalStatus: string

  @OneToMany(() => Address, address => address.user, {
    eager: true,
    nullable: false
  })
  @JoinColumn()
  addresses: Address[]
}
