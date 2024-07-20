const multer = require('multer');
const path = require('path'); //bawaan default dari nodejs


const storate = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'public/images')
    },
    filename: (req, file, callback) => {
        const timestamp = new Date().getTime();
        const originalname = file.originalname;
        callback(null, `${timestamp}-${originalname}`);
    }
});


const upload = multer({
    storage: storate, // lokasi file 
    limits: {
        fileSize: 3 * 1000 * 1000 // limit 3 mb
    }
});

module.exports = upload;