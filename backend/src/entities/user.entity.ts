import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export class Users {
  @PrimaryGeneratedColumn('uuid')
  guid: string;
  @Column(null, { nullable: false })
  login: string;
  @Column(null, { nullable: false })
  nickname: string;
  @Column(null, { nullable: false })
  email: string;
  @Column(null, { nullable: false, select: false })
  password: string;
  @Column(null, { nullable: false, default: false })
  verifed: boolean;
  @Column({
    name: 'updated_at',
    default: () => 'now()',
    onUpdate: 'now()',
  })
  updated_at?: Date;
  @Column({ name: 'created_at', default: () => `now()` })
  created_at?: Date;

}
