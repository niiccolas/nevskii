import {
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Actors from './Actors';
import Videos from './Videos';

@Index('pk_video_actors', ['idVideoActors'], { unique: true })
@Entity('video_actors', { schema: 'public' })
export default class VideoActors {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id_video_actors' })
  idVideoActors!: number;

  @ManyToOne(() => Actors, actors => actors.videoActors)
  @JoinColumn([{ name: 'id_vac_actor', referencedColumnName: 'idActor' }])
  idVacActor!: Actors;

  @ManyToOne(() => Videos, videos => videos.videoActors)
  @JoinColumn([{ name: 'id_vac_video', referencedColumnName: 'idVideo' }])
  idVacVideo!: Videos;
}
