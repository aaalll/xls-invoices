import multer from 'multer';

const upload = multer({ dest: 'uploads/' });

export const fileUploadMiddleware = upload.single('file');