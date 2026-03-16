const { v4: uuid } = require('uuid');


export const fileNamer = (req: Express.Request, file: Express.Multer.File, callback: Function) => {

    if (!file) return callback(new Error('No file uploaded'), false);

    const fileExtension = file.mimetype.split('/')[1];

    const fileNamer = `${uuid()}.${fileExtension}`;

    return callback(null, fileNamer);

}