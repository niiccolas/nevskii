import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Products from './Products';
import VideoActors from './VideoActors';
import VideoAudio from './VideoAudio';
import VideoCollections from './VideoCollections';
import VideoGenres from './VideoGenres';
import VideoSubcategories from './VideoSubcategories';
import VideoSubtitles from './VideoSubtitles';
import VideoCategories from './VideoCategories';
import FilmFormats from './FilmFormats';
import TvFormats from './TvFormats';
import VideoZones from './VideoZones';

@Index('pk_videos', ['idVideo'], { unique: true })
@Entity('videos', { schema: 'public' })
export default class Videos {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id_video' })
  idVideo!: number;

  @Column('text', { name: 'bonus_content', nullable: true })
  bonusContent: string | null = '';

  @Column('integer', { name: 'minutes', nullable: true })
  minutes: number | null = 0;

  @OneToMany(() => Products, products => products.idVideo)
  products!: Products[];

  @OneToMany(() => VideoActors, videoActors => videoActors.idVacVideo)
  videoActors!: VideoActors[];

  @OneToMany(() => VideoAudio, videoAudio => videoAudio.idVauVideo)
  videoAudios!: VideoAudio[];

  @OneToMany(
    () => VideoCollections,
    videoCollections => videoCollections.idVcoVideo,
  )
  videoCollections!: VideoCollections[];

  @OneToMany(() => VideoGenres, videoGenres => videoGenres.idVgeVideo)
  videoGenres!: VideoGenres[];

  @OneToMany(
    () => VideoSubcategories,
    videoSubcategories => videoSubcategories.idVscVideo,
  )
  videoSubcategories!: VideoSubcategories[];

  @OneToMany(() => VideoSubtitles, videoSubtitles => videoSubtitles.idVstVideo)
  videoSubtitles!: VideoSubtitles[];

  @ManyToOne(() => VideoCategories, videoCategories => videoCategories.videos)
  @JoinColumn([
    { name: 'id_category', referencedColumnName: 'idVideoCategory' },
  ])
  idCategory!: VideoCategories;

  @ManyToOne(() => FilmFormats, filmFormats => filmFormats.videos)
  @JoinColumn([
    { name: 'id_film_format', referencedColumnName: 'idFilmFormat' },
  ])
  idFilmFormat!: FilmFormats;

  @ManyToOne(() => TvFormats, tvFormats => tvFormats.videos)
  @JoinColumn([{ name: 'id_tv_format', referencedColumnName: 'idTvFormat' }])
  idTvFormat!: TvFormats;

  @ManyToOne(() => VideoZones, videoZones => videoZones.videos)
  @JoinColumn([{ name: 'id_zone', referencedColumnName: 'idVideoZone' }])
  idZone!: VideoZones;
}
