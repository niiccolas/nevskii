import {
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Subcategories from './Subcategories';
import Videos from './Videos';

@Index('pk_video_subcategories', ['idVideoSubcategories'], { unique: true })
@Entity('video_subcategories', { schema: 'public' })
export default class VideoSubcategories {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id_video_subcategories' })
  idVideoSubcategories!: number;

  @ManyToOne(
    () => Subcategories,
    subcategories => subcategories.videoSubcategories,
  )
  @JoinColumn([
    { name: 'id_vsc_subcategory', referencedColumnName: 'idSubcategory' },
  ])
  idVscSubcategory!: Subcategories;

  @ManyToOne(() => Videos, videos => videos.videoSubcategories)
  @JoinColumn([{ name: 'id_vsc_video', referencedColumnName: 'idVideo' }])
  idVscVideo!: Videos;
}
