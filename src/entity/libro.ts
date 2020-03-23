import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm' 

@Entity()
export class libro{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    titulo: string

    @Column()
    autor: string
}