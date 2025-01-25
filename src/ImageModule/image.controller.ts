import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Param,
  Get,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import * as fs from 'fs';
import { Response } from 'express';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@Controller('images')
@ApiTags('Images')
export class ImageController {
  constructor() {}

  @Post('upload-option-image/:taskId/:optionLabel')
  @ApiOperation({ summary: 'Upload an image for a task option' })
  @ApiParam({
    name: 'taskId',
    description: 'ID of the task',
    type: String,
  })
  @ApiParam({
    name: 'optionLabel',
    description: 'Label of the task option',
    type: String,
  })
  @ApiBody({
    description: 'Image file to upload',
    type: 'multipart/form-data',
  })
  @ApiResponse({
    status: 200,
    description: 'Image uploaded successfully.',
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const taskId = req.params.taskId;
          const dest = path.join(__dirname, '../../images', taskId);

          if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest, { recursive: true });
          }
          cb(null, dest);
        },
        filename: (req, file, cb) => {
          const optionLabel = req.params.optionLabel;
          const extension = path.extname(file.originalname);
          const filename = `${optionLabel}${extension}`;
          cb(null, filename);
        },
      }),
    }),
  )
  async uploadOptionImage(@UploadedFile() file: Express.Multer.File) {
    const taskId = file.destination.split(path.sep).pop();
    const filename = file.filename;

    const imagePath = `/images/${taskId}/${filename}`;

    return { message: 'Image uploaded successfully', imagePath };
  }

  @Get('option-image/:taskId/:optionLabel')
  @ApiOperation({ summary: 'Get an image for a task option' })
  @ApiParam({
    name: 'taskId',
    description: 'ID of the task',
    type: String,
  })
  @ApiParam({
    name: 'optionLabel',
    description: 'Label of the task option',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Image retrieved successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Image not found.',
  })
  async getOptionImage(
    @Param('taskId') taskId: string,
    @Param('optionLabel') optionLabel: string,
    @Res() res: Response,
  ) {
    const taskFolderPath = path.join(__dirname, '../../images', taskId);

    if (!fs.existsSync(taskFolderPath)) {
      return res.status(404).send({ message: 'Task folder not found' });
    }

    const files = fs.readdirSync(taskFolderPath);

    const file = files.find((file) => file.startsWith(optionLabel));

    if (file) {
      return res.sendFile(path.join(taskFolderPath, file));
    } else {
      return res.status(404).send({ message: 'Image not found' });
    }
  }
}
