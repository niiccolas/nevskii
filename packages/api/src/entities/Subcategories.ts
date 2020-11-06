import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import VideoSubcategories from './VideoSubcategories';

@Index('pk_subcategories', ['idSubcategory'], { unique: true })
@Entity('subcategories', { schema: 'public' })
export default class Subcategories {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id_subcategory' })
  idSubcategory!: number;

  @Column('character varying', { name: 'name', length: 100 })
  name!: string;

  @OneToMany(
    () => VideoSubcategories,
    videoSubcategories => videoSubcategories.idVscSubcategory,
  )
  videoSubcategories!: VideoSubcategories[];
}
