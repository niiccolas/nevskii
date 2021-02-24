import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import {
  Length,
  IsEmail,
  IsPostalCode,
  IsString,
  IsDateString,
  IsOptional,
  IsUrl,
  MinLength,
  MaxLength,
  Validate,
} from 'class-validator';
import {
  PasswordValidation,
  PasswordValidationRequirement,
} from 'class-validator-password-check';
import bcrypt from 'bcrypt';
import jwt, { SignOptions } from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import moment from 'moment';

import client from '../database/client.redis';
import Orders from './Orders';
import Countries from './Countries';

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;
const ACCESS_TOKEN_TTL = '30s';
const REFRESH_TOKEN_TTL = moment.duration().add(30, 'days').asSeconds();

interface UserInterface {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
  address: string;
  city: string;
  zipCode: string;
  displayName?: string; // pseudonym
  gender?: string | '?';
  dateOfBirth?: string;
  idCountry: Countries;
}

@Index('uc_users_email', ['email'], { unique: true })
@Index('pk_users', ['idUser'], { unique: true })
@Entity('users', { schema: 'public' })
export default class Users {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id_user' })
  idUser!: number;

  @IsString()
  @Column('character varying', { name: 'first_name' })
  firstName!: string;

  @IsString()
  @Column('character varying', { name: 'last_name' })
  lastName!: string;

  @Length(2, 20)
  @IsString()
  @IsOptional()
  @Column('text', { name: 'display_name', unique: true })
  displayName?: string;

  @Column('boolean', {
    name: 'is_admin',
  })
  isAdmin!: boolean;

  @IsUrl()
  @IsOptional()
  @Column('text', { name: 'avatar_url' })
  avatarUrl?: string;

  @IsEmail()
  @Column('character varying', {
    name: 'email',
    unique: true,
    transformer: {
      from: (value: string) => value,
      to: (value: string) => value.toLowerCase(),
    },
  })
  email!: string;

  @IsString()
  @MinLength(8)
  @MaxLength(64)
  @Validate(PasswordValidation, [
    {
      mustContainLowerLetter: true,
      mustContainNumber: true,
      // mustContainSpecialCharacter: true,
      mustContainUpperLetter: true,
    } as PasswordValidationRequirement,
  ])
  @Column('character varying', { name: 'password', length: 64 })
  password!: string;

  @IsString()
  @Column('character varying', { name: 'address' })
  address!: string;

  @IsString()
  @Column('character varying', { name: 'city' })
  city!: string;

  @IsPostalCode('any') // postal code for france
  @Column('character varying', { name: 'zip_code' })
  zipCode!: string;

  // @MaxLength(1)
  // @IsString()
  @Column('character', { name: 'gender', nullable: true, length: 1 })
  gender?: string;

  @IsOptional()
  @IsString()
  @Column('character varying', { name: 'state', nullable: true })
  state?: string;

  @IsOptional()
  @IsDateString()
  @Column('date', { name: 'date_of_birth', nullable: true })
  dateOfBirth?: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createdAt!: Date;

  @OneToMany(() => Orders, orders => orders.idUser, { cascade: true })
  orders!: Orders[];

  @ManyToOne(() => Countries, countries => countries.idCountry)
  @JoinColumn([{ name: 'id_country', referencedColumnName: 'idCountry' }])
  idCountry?: Countries;

  @BeforeInsert()
  async hash(): Promise<void> {
    this.password = await bcrypt.hash(this.password, 10);
  }

  constructor(userData: UserInterface) {
    Object.assign(this, userData);
  }

  async isPasswordValid(unencryptedPassword: string): Promise<boolean> {
    return await bcrypt.compare(unencryptedPassword, this.password);
  }

  // INFORMATION EXPERT PRINCIPLE
  async generateAuthTokens(): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const payload = {
      userId: this.idUser,
      isAdmin: this.isAdmin,
    };
    const options: SignOptions = {
      issuer: 'nevskii',
      audience: this.email,
    };

    try {
      const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET!, {
        ...options,
        expiresIn: ACCESS_TOKEN_TTL,
      });

      const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET!, {
        ...options,
        expiresIn: REFRESH_TOKEN_TTL,
      });

      // Persit Refresh Token to REDIS cache
      client.SET(
        this.email,
        await bcrypt.hash(refreshToken, 10),
        'EX',
        REFRESH_TOKEN_TTL,
        redisError => {
          if (redisError) {
            console.log(redisError);
            throw new Error('redis error');
          }
        },
      );

      return { accessToken, refreshToken };
    } catch (error) {
      return error;
    }
  }
}
