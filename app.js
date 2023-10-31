const express = require('express')
const multer = require('multer')
const app = express()
// const ejs = require('ejs')

app.use(express.json())
app.use(express.static(`${__dirname}/public`))
app.set('view engine', 'ejs')
app.set('views', `${__dirname}/views`)

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `${__dirname}/public/images`)
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage })


app.get('/', (req, res) => {
    res.render('index')
})

app.post('/upload', upload.single('image'), (req, res) => {
    console.log(req.file)
    res.json({ status: 2002 })
})

const port = 3000
app.listen(port, () => {
    console.log(`App is running on port ${port}`)
})