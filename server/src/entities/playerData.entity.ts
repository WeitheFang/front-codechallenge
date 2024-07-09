import {Column, Entity, PrimaryGeneratedColumn, BaseEntity} from 'typeorm'

@Entity()
export class PlayerDataEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'varchar', length: 255})
    Name: string

    @Column({type: 'varchar', length: 100})
    Team: string

    @Column({type: 'int'})
    GP: number

    @Column({type: 'float'})
    MIN: number

    @Column({type: 'float'})
    PTS: number

    @Column({type: 'float'})
    FGM: number

    @Column({type: 'float'})
    FGA: number

    @Column({type: 'float', precision: 5, scale: 2})
    FGP: number

    @Column({type: 'float'})
    TPM: number

    @Column({type: 'float'})
    TPA: number

    @Column({type: 'float', precision: 5, scale: 2})
    TPP: number

    @Column({type: 'float'})
    FTM: number

    @Column({type: 'float'})
    FTA: number

    @Column({type: 'float', precision: 5, scale: 2})
    FTP: number
}
