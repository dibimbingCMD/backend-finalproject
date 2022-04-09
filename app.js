const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}));

const db = require('./app/models/');
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
        meassage: "welcome brow"
    })
})

require('./app/routes')(app)

const PORT = 8000
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});