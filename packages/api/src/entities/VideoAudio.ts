import {
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import AudioTracks from './AudioTracks';
import Videos from './Videos';

@Index('pk_video_audio', ['idVideoAudio'], { unique: true })
@Entity('video_audio', { schema: 'public' })
export default class VideoAudio {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id_video_audio' })
  idVideoAudio!: number;

  @ManyToOne(() => AudioTracks, audioTracks => audioTracks.videoAudios)
  @JoinColumn([
    { name: 'id_vau_audio_track', referencedColumnName: 'idAudioTrack' },
  ])
  idVauAudioTrack!: AudioTracks;

  @ManyToOne(() => Videos, videos => videos.videoAudios)
  @JoinColumn([{ name: 'id_vau_video', referencedColumnName: 'idVideo' }])
  idVauVideo!: Videos;
}
