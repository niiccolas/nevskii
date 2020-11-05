import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import VideoGenres from './VideoGenres';

@Index('pk_genres', ['idGenre'], { unique: true })
@Entity('genres', { schema: 'public' })
export default class Genres {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id_genre' })
  idGenre!: number;

  @Column('character varying', { name: 'name', length: 100 })
  name!: string;

  @OneToMany(() => VideoGenres, videoGenres => videoGenres.idVgeGenre)
  videoGenres!: VideoGenres[];
}
