
require('dotenv').config();
const express = require('express');
const app = express();
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const middlewareLogRequest = require('./middleware/logs');
const upload = require('./middleware/multer');
const port = process.env.PORT || 5000; // 3000 dipakai untuk frontend jadi menggunakan 4000 untuk backend;
const cookieParser = require('cookie-parser');



app.use(cookieParser());
app.use(middlewareLogRequest);
app.use(express.json());  // mengizinkan request body berupa json
app.use('/users', userRoutes);
app.use('/auth', authRoutes);

app.use('/assets/images',express.static('public/images')); //membuat static file

app.post('/upload', upload.single('photo'), (req, res) => {
    res.json({
        message: "Upload berhasil"
    })
}); 




app.get('/', (req, res, next) => {
    res.send('index/.....');
});


// error handling
app.use((err, req, res, next) => {
    res.json({
        message: err.message,
    });
});
// ---------------------

app.listen(port, () => {
    console.log(`Server berjalan pada http://localhost:${port}/`)
});