import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import VideoActors from './VideoActors';

@Index('pk_actors', ['idActor'], { unique: true })
@Entity('actors', { schema: 'public' })
export default class Actors {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id_actor' })
  idActor!: number;

  @Column('character varying', { name: 'name', length: 255 })
  name!: string;

  @Column('character varying', { name: 'image_url', nullable: true })
  imageUrl: string | null = '';

  @OneToMany(() => VideoActors, videoActors => videoActors.idVacActor)
  videoActors!: VideoActors[];
}
