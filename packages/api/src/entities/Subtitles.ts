import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import VideoSubtitles from './VideoSubtitles';

@Index('pk_subtitles', ['idSubtitle'], { unique: true })
@Entity('subtitles', { schema: 'public' })
export default class Subtitles {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id_subtitle' })
  idSubtitle!: number;

  @Column('character varying', { name: 'name', length: 100 })
  name!: string;

  @OneToMany(
    () => VideoSubtitles,
    videoSubtitles => videoSubtitles.idVstSubtitle,
  )
  videoSubtitles!: VideoSubtitles[];
}
