import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export class Songs {
  @PrimaryGeneratedColumn('uuid')
  guid: number;
  @Column(null, { nullable: false })
  title: string;
  @Column(null, { nullable: true })
  duration: number;
  @Column({
    name: 'updated_at',
    default: () => 'now()',
    onUpdate: 'now()',
  })
  updated_at?: Date;
  @Column({ name: 'created_at', default: () => `now()` })
  created_at?: Date;
}
