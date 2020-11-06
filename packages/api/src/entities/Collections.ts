import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import VideoCollections from './VideoCollections';

@Index('pk_collections', ['idCollection'], { unique: true })
@Entity('collections', { schema: 'public' })
export default class Collections {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id_collection' })
  idCollection!: number;

  @Column('character varying', { name: 'name', length: 255 })
  name!: string;

  @OneToMany(
    () => VideoCollections,
    videoCollections => videoCollections.idVcoCollection,
  )
  videoCollections!: VideoCollections[];
}
