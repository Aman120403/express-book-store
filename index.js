require("dotenv/config");
const express= require("express");


const bookRouter = require('./routes/book.routes');
const app = express();
const {loggerMiddleware} = require('./middleware/logger')
const PORT = 8000;
//Middleware(Plugins);

app.use(express.json());

app.use(loggerMiddleware)

app.use('/books', bookRouter);

app.listen(PORT, () =>console.log(`HTTP server is running on PORT ${PORT}`));
