const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({
    extended: true
}));

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename : (req, file, cb) =>{
        cb(null, new Date().getTime() + '-' + file.originalname)
    }
})

const fileFilter = (req, file, cb) =>{
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true);
    }else{
        cb(null, false);
    }
}

app.use('/images', express.static(path.join(__dirname,'images')))
app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('image'));

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

const db = require('./app/models/');
const { mongoose } = require('./app/models/');
const { userInfo } = require('os');
db.mongoose
    .connect(db.url)
    .then(() => {
        console.log('database connected');
    }).catch((err) => {
        console.log('cannot connected', err);
        process.exit()
    })

    


app.get('/',(req, res) => {
    res.json({
        meassage: "welcome"
    })
})

require('./app/routes')(app)

const PORT = process.env.PORT || 8000; 
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});