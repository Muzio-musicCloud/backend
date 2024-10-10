import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class UsersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'email', type: 'varchar', length: 255, unique: true, nullable: false })
  email: string;

  @Column({ name: 'user_id', type: 'varchar', length: 30, unique: true, nullable: true })
  userId?: string;

  @Column({ name: 'password', type: 'char', length: 60, nullable: true })
  password?: string;

  // google, kakaotalk, local
  @Column({ name: 'provider', nullable: false })
  provider: string;

  @Column({ name: 'nickname', type: 'varchar', length: 40, nullable: false })
  nickname: string;

  @Column({ name: 'email_verified', type: 'boolean', default: false })
  emailVerified: boolean;

  @Column({ name: 'profile_picture', nullable: true })
  profilePicture?: string;

  @Column({ name: 'role', default: 'user' })
  role: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
