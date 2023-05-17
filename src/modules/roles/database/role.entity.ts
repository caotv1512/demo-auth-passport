import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export const TableName = 'roles';

@Entity(TableName)
export class Role {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;
}
