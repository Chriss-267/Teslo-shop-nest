import { IsString, IsNumber, IsPositive, IsOptional, MinLength, IsInt, IsArray, IsIn } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDto {
    @ApiProperty({ example: 'T-Shirt Teslo', description: 'Product Title', uniqueItems: true })
    @IsString()
    @MinLength(1)
    title: string;

    @ApiProperty({ example: 10, description: 'Product Price', default: 0 })
    @IsNumber()
    @IsPositive()
    @IsOptional()
    price?: number;

    @ApiProperty({ example: 'Product Description', description: 'Product Description', default: null })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({ example: 't_shirt_teslo', description: 'Product Slug', default: null })
    @IsString()
    @IsOptional()
    slug?: string;

    @ApiProperty({ example: 10, description: 'Product Stock', default: 0 })
    @IsInt()
    @IsPositive()
    @IsOptional()
    stock?: number;

    @ApiProperty({ example: ['S', 'M', 'L'], description: 'Product Sizes' })
    @IsString({ each: true })
    @IsArray()
    sizes: string[];

    @ApiProperty({ example: 'men', description: 'Product Gender' })
    @IsIn(['men', 'women', 'kid', 'unisex'])
    gender: string;

    @ApiProperty({ example: ['new', 'sale'], description: 'Product Tags' })
    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    tags: string[];

    @ApiProperty({ example: ['https://example.com/image.jpg'], description: 'Product Images', default: [] })
    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    images?: string[];
}
