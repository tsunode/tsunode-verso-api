import { Project } from '@modules/projects/infra/typeorm/entities/Project';

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import { Exclude, Expose } from 'class-transformer';
import { uploadConfig } from '@config/upload';


@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  @Exclude({ toPlainOnly: true })
  id: string;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  title: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  avatar: string;

  @OneToMany(() => Project, project => project.user)
  projects: Project[];


  @CreateDateColumn({ name: 'created_at' })
  @Exclude({ toPlainOnly: true })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @Exclude({ toPlainOnly: true })
  updatedAt: Date;

  @Expose({ name: 'avatarUrl' })
  getAvatarUrl(): string | null {
    if (!this.avatar) return null;

    switch (uploadConfig.driver) {
      case 'disk':
        return this.avatar && `${process.env.APP_API_URL}/files/${this.avatar}`;
      case 's3':
        return `https://${uploadConfig.config.aws.bucket}.s3.us-east-2.amazonaws.com/${this.avatar}`;
      default:
        return null;
    }
  }
}

export { User };
