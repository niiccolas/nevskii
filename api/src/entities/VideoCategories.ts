import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Videos from './Videos';

@Index('pk_video_categories', ['idVideoCategory'], { unique: true })
@Entity('video_categories', { schema: 'public' })
export default class VideoCategories {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id_video_category' })
  idVideoCategory!: number;

  @Column('character varying', { name: 'name', length: 100 })
  name!: string;

  @OneToMany(() => Videos, videos => videos.idCategory)
  videos!: Videos[];
}
