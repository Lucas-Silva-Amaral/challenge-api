import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm'
import { User } from 'src/modules/users/entities/users.entity'
import { BaseEntity } from 'src/modules/bases/entities/base.entity'

@Entity({ name: 'address' })
export class Address extends BaseEntity {
  @Column({ nullable: false })
  country: string

  @Column({ nullable: false })
  state: string

  @Column({ nullable: false })
  city: string

  @Column({ nullable: false })
  zipcode: string

  @Column({ nullable: false })
  number: number

  @Column({ nullable: true })
  complement: string

  @Column({ nullable: false })
  neighborhood: string

  @Column({ nullable: false })
  street: string

  @ManyToOne(() => User, user => user.addresses)
  @JoinColumn()
  user: Address[]

  @Column({ nullable: false })
  userId: string
}
