import { uploadConfig } from '@config/upload';
import { Exclude, Expose } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { User } from '@modules/users/infra/typeorm/entities/User';
import { getElapsedTime } from '@shared/helpers/getElapsedTime';

@Entity('projects')
class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Exclude({ toPlainOnly: true })
  @Column({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => User, user => user.projects)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  link: string;

  @Column({ name: 'adtional_link' })
  adtionalLink?: string;

  @Column()
  thumb: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Expose({ name: 'elapsedTime' })
  getElapsedTime(): string {
    return getElapsedTime(this.createdAt);
  }


  @Expose({ name: 'thumbUrl' })
  getAvatarUrl(): string | null {
    if (!this.thumb) return null;

    switch (uploadConfig.driver) {
      case 'disk':
        return this.thumb && `${process.env.APP_API_URL}/files/${this.thumb}`;
      case 's3':
        return `https://${uploadConfig.config.aws.bucket}.s3.us-east-1.amazonaws.com/${this.thumb}`;
      default:
        return null;
    }
  }
}

export { Project };
