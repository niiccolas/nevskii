import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Videos from './Videos';

@Index('pk_tv_formats', ['idTvFormat'], { unique: true })
@Entity('tv_formats', { schema: 'public' })
export default class TvFormats {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id_tv_format' })
  idTvFormat!: number;

  @Column('character varying', { name: 'name', length: 100 })
  name!: string;

  @OneToMany(() => Videos, videos => videos.idTvFormat)
  videos!: Videos[];
}
