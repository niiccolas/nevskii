import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Videos from './Videos';

@Index('pk_film_formats', ['idFilmFormat'], { unique: true })
@Entity('film_formats', { schema: 'public' })
export default class FilmFormats {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id_film_format' })
  idFilmFormat!: number;

  @Column('character varying', { name: 'name', length: 100 })
  name!: string;

  @OneToMany(() => Videos, videos => videos.idFilmFormat)
  videos!: Videos[];
}
