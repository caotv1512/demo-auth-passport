// import { Role } from 'src/modules/roles/database/role.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from 'src/helper/config/enum';
export const TableName = 'users';

@Entity(TableName)
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  username: string;

  @Column('')
  email: string;

  @Column('')
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    array: true,
    default: [Role.USER]
  })
  public roleId: Role[]
}
