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

// app.use('/deploy', (req, res, next) => {
//     exec('kubectl apply -f ./to-do-list-deployment.yaml', (err, stdout, stderr) => {
//         if (err) {
//             next(err);
//         } else {
//             console.log(`THE OUTPUT ${stdout}`);
//             res.send(stdout);
//             return;
//         };
//     });
// });

// app.use('/yaml', async (req, res, next) => {
//     const { name } = req.body
    
//     const doc = await yaml.load(fs.readFileSync('./to-do-list-deployment.yaml', 'utf8'))
//     console.log('DOC', doc)

//     doc.metadata.name = 'Tarik > Cristina'
//     doc.spec.replicas = 10

//     console.log('DOC AFTER', doc)
    
//     const newDoc = yaml.dump(doc);
//     console.log('NEW DOC', newDoc);
//     fs.writeFile('./to-do-list-deployment.yaml', newDoc, err => {
//         if (err) {
//             next(err);
//         };
//     });
// });

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
    console.log(`App is listening on ${PORT}`);
});

module.exports = app;