require('dotenv').config()
require('express-async-errors');

const express = require('express')
const app = express()

const errorHandler = require('./middleware/error-handler')
const notFound = require('./middleware/not-found')
const router = require('./routes/product')

app.use(express.json())
app.use('/api/v1/', router)
app.use(notFound)
app.use(errorHandler)

const port = process.env.PORT

const start = async () => {
    try {
        app.listen(port, () =>
            console.log(`Server is listening on port ${port}...`)
        );
    } catch (error) {
        console.log(error);
    }
};

start();