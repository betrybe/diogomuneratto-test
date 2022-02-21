const multer = require('multer');

const storage = multer.memoryStorage();
const maxSize = 1 * 1024 * 1024; // for 1MB

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        req.file = file;
        if (
            file.mimetype === 'image/png'
            || file.mimetype === 'image/jpg'
            || file.mimetype === 'image/jpeg'
        ) {
            req.isImageValid = true;
            cb(null, true);
        } else {
            req.isImageValid = false;
            cb(null, false);
        }
    },
    limits: { fileSize: maxSize },
});

module.exports = upload;