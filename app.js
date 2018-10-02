const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/api', (req, res) => {
    res.json({
        message: 'Works!'
    });
});

app.post('/api/post', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', { expiresIn: '10s' }, (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({
                message: 'Post created...',
                authData
            });
        }
    });
});

app.post('/api/login', (req, res) => {

    const user = {
        id: 123,
        username: 'asdasd',
        password: 'asdasd'
    }

    jwt.sign({ user }, 'secretkey', (err, token) => {
        res.json({
            token
        });
    });
});

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }

}

app.listen(5000, () => console.log('Server started on port 5000'));