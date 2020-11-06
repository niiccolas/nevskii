import {
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Collections from './Collections';
import Videos from './Videos';

@Index('pk_video_collections', ['idVideoCollections'], { unique: true })
@Entity('video_collections', { schema: 'public' })
export default class VideoCollections {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id_video_collections' })
  idVideoCollections!: number;

  @ManyToOne(() => Collections, collections => collections.videoCollections)
  @JoinColumn([
    { name: 'id_vco_collection', referencedColumnName: 'idCollection' },
  ])
  idVcoCollection!: Collections;

  @ManyToOne(() => Videos, videos => videos.videoCollections)
  @JoinColumn([{ name: 'id_vco_video', referencedColumnName: 'idVideo' }])
  idVcoVideo!: Videos;
}
