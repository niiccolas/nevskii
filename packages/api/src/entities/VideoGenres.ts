import {
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Genres from './Genres';
import Videos from './Videos';

@Index('pk_video_genres', ['idVideoGenres'], { unique: true })
@Entity('video_genres', { schema: 'public' })
export default class VideoGenres {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id_video_genres' })
  idVideoGenres!: number;

  @ManyToOne(() => Genres, genres => genres.videoGenres)
  @JoinColumn([{ name: 'id_vge_genre', referencedColumnName: 'idGenre' }])
  idVgeGenre!: Genres;

  @ManyToOne(() => Videos, videos => videos.videoGenres)
  @JoinColumn([{ name: 'id_vge_video', referencedColumnName: 'idVideo' }])
  idVgeVideo!: Videos;
}
