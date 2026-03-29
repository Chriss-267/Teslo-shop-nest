
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductImage } from "./product-image.entity";
import { User } from "../../auth/entities/user.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: 'products' })
export class Product {
    @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'Product ID', uniqueItems: true })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({ example: 'T-Shirt Teslo', description: 'Product Title', uniqueItems: true })
    @Column('text', {
        unique: true
    })
    title: string;

    @ApiProperty({ example: 0, description: 'Product Price' })
    @Column('float', {
        default: 0
    })
    price: number;

    @ApiProperty({ example: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.', description: 'Product Description' })
    @Column({
        type: 'text',
        nullable: true
    })
    description: string;

    @ApiProperty({ example: 't_shirt_teslo', description: 'Product Slug', uniqueItems: true })
    @Column('text', {
        unique: true
    })
    slug: string;

    @ApiProperty({ example: 10, description: 'Product Stock', default: 0 })
    @Column('int', {
        default: 0
    })
    stock: number;

    @ApiProperty({ example: ['S', 'M', 'L'], description: 'Product Sizes' })
    @Column('text', {
        array: true,
        default: '{}'
    })
    sizes: string[];

    @ApiProperty({ example: 'men', description: 'Product Gender' })
    @Column('text')
    gender: string;

    @ApiProperty({ example: ['new', 'sale'], description: 'Product Tags' })
    @Column('text', {
        array: true,
        default: '[]'
    })
    tags: string[];

    @ApiProperty({ type: [ProductImage], description: 'Product Images' })
    @OneToMany(() => ProductImage, (productImage) => productImage.product, { cascade: true, eager: true })
    images?: ProductImage[];


    @ManyToOne(() => User, (user) => user.product, { eager: true })
    user: User;

    @BeforeInsert()
    checkSlugInsert() {
        if (!this.slug) {
            this.slug = this.title.toLowerCase()
                .replaceAll(' ', '_')
                .replaceAll("'", '');
        } else {
            this.slug = this.slug.toLowerCase()
                .replaceAll(' ', '_')
                .replaceAll("'", '');
        }
    }

    @BeforeUpdate()
    checkSlugUpdate() {
        this.slug = this.slug.toLowerCase()
            .replaceAll(' ', '_')
            .replaceAll("'", '');
    }
}
