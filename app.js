const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const data = {
    username: 'asd@asd.com',
    password: 'asdasd',
    users: [{
            name: 'Frank',
            email: 'frank@asd.com',
            password: 'frank',
            age: 21
        },
        {
            name: 'Jack',
            email: 'jack@asd.com',
            password: 'jack',
            age: 40
        },
        {
            name: 'Tomas',
            email: 'tomas@asd.com',
            password: 'tomas',
            age: 32
        }
    ],
    location: {
        country: 'Romania',
        zone: 'Cluj',
        adress: 'timis',
        nr: 17
    },
    access: true
};

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/api', (req, res) => {
    res.json({
        data
    });
});
app.get('/apii', (req, res) => {
    res.json(
        data.location
    );
});
app.get('/apiii', (req, res) => {
    res.json(
        data.access
    );
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
        // localStorage.setItem('testObject', JSON.stringify(req));
    console.log('HERE:', req.body.password);
    // console.log('HERE:', res);
    // const userReq = JSON.parse(req);
    // if (userReq.username === user.username && userReq.password === user.password) {
    jwt.sign({ user }, 'secretkey', (err, token) => {
        res.json({
            token
        });
    });
    // } else res.sendStatus(403);
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