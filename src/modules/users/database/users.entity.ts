import { Role } from 'src/modules/roles/database/role.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column()
  roleId: number;
}
