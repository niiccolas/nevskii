import {
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Subtitles from './Subtitles';
import Videos from './Videos';

@Index('pk_video_subtitles', ['idVideoSubtitles'], { unique: true })
@Entity('video_subtitles', { schema: 'public' })
export default class VideoSubtitles {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id_video_subtitles' })
  idVideoSubtitles!: number;

  @ManyToOne(() => Subtitles, subtitles => subtitles.videoSubtitles)
  @JoinColumn([{ name: 'id_vst_subtitle', referencedColumnName: 'idSubtitle' }])
  idVstSubtitle!: Subtitles;

  @ManyToOne(() => Videos, videos => videos.videoSubtitles)
  @JoinColumn([{ name: 'id_vst_video', referencedColumnName: 'idVideo' }])
  idVstVideo!: Videos;
}
