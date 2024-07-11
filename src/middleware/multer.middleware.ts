import multer, { StorageEngine } from 'multer';

const storage: StorageEngine = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/temp');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, `${file.fieldname}-${uniqueSuffix}`);
    }
});

export const upload = multer({ storage });

