import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Videos from './Videos';

@Index('pk_video_zones', ['idVideoZone'], { unique: true })
@Entity('video_zones', { schema: 'public' })
export default class VideoZones {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id_video_zone' })
  idVideoZone!: number;

  @Column('character varying', { name: 'name', length: 100 })
  name!: string;

  @OneToMany(() => Videos, videos => videos.idZone)
  videos!: Videos[];
}
