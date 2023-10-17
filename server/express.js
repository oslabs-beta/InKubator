const express = require('express');
const app = express();
const path = require('path');
const router = require('./router.js');
const googleRouter = require('./googleRouter.js');
const PORT = 3001;

const { exec } = require('child_process');
const yaml = require('js-yaml');
const fs = require('fs');

app.use(express.json());

app.use('/', express.static(path.resolve(__dirname, '../')));

app.use('/api', router);
app.use('/google', googleRouter);

app.use('*', (req,res) => {
    res.status(404).send('Page not found.');
});

app.use((err, req, res, next) => {
    const defaultErr = {
        log: 'Express default error handler',
        status: 500,
        message: {error: `An error occurred: ${err}`}
    };

    const errorObj = Object.assign({}, defaultErr, err);

    return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
    console.log(`App is listening on`, PORT);
});

module.exports = app;