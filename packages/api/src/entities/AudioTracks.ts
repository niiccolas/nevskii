import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import VideoAudio from './VideoAudio';

@Index('pk_audio_tracks', ['idAudioTrack'], { unique: true })
@Entity('audio_tracks', { schema: 'public' })
export default class AudioTracks {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id_audio_track' })
  idAudioTrack!: number;

  @Column('character varying', { name: 'name', length: 100 })
  name!: string;

  @OneToMany(() => VideoAudio, videoAudio => videoAudio.idVauAudioTrack)
  videoAudios!: VideoAudio[];
}
