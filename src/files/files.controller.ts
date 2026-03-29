import { BadRequestException, Controller, Get, Param, Post, UploadedFile, UseInterceptors, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { fileFilter, fileNamer } from './helpers';
import { diskStorage } from 'multer';
import express from 'express';
import { ConfigService } from '@nestjs/config';

@ApiTags('Files - Get and Upload files')
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService,
    private readonly configService: ConfigService
  ) { }


  @Get('product/:imageName')
  findProductImage(
    @Param('imageName') imageName: string,
    @Res() res: express.Response
  ) {

    const path = this.filesService.getStaticProductImage(imageName);

    return res.sendFile(path);
  }


  @Post('product')
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: fileFilter,
    //limits: {
    //  fileSize: 1000
    //}
    storage: diskStorage({
      destination: './static/products',
      filename: fileNamer
    })
  }))
  uploadProductImage(
    @UploadedFile() file: Express.Multer.File,
  ) {

    if (!file) {
      throw new BadRequestException('make sure that the file is an image');
    }

    const secureUrl = `${this.configService.get('hostApi')}/files/product/${file.filename}`;

    return {
      secureUrl
    };
  }
}
