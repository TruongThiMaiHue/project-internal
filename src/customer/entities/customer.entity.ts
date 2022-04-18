import { Entity, BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Customer extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    address: string;
    @Column()
    age: number;
    @Column({ type: 'date',  default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;
}
