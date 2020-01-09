require('dotenv').config();

const express = require('express');

const bodyparser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyparser.urlencoded({
    extended: true,
}));

app.use(bodyparser.json());

if (process.env.ENVIRONMENT === 'dev') app.use(cors());

app.use('/auth', authRouter);
app.use('/', homeRouter);

app.listen(port, () => {
    console.log(`Express server started at port: ${port}`);
});

