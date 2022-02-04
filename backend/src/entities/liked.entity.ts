import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class User_Liked_Songs {
  @PrimaryGeneratedColumn('uuid')
  guid: string;
  @Column(null, { nullable: false })
  userGuid: string;
  @Column(null, { nullable: false })
  songGuid: string;
  @Column({
    name: 'updated_at',
    default: () => 'now()',
    onUpdate: 'now()',
  })
  updated_at?: Date;
  @Column({ name: 'created_at', default: () => `now()` })
  created_at?: Date;
}
