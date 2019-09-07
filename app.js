const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api', (req,res) =>{
    res.json({
        message: "Welcome to the API"
    });
});

app.post('/api/post', verifyToken,  (req ,res) =>{
    jwt.verify(req.token,'secretkey',(err, authData) =>{
        if(err){
            res.sendStatus(403);
        }else res.json({
            message:" Post created",
            authData
        });
    });
});

app.post('/api/login', (req,res) =>{
    const mockUser ={
        id: "100",
        username: "Arya",
        email: "amit@gmail.com"
    }
    jwt.sign({mockUser}, 'secretkey', (err,token) =>{
        res.json({
            token
        });
    });
});

// verifyToken 

function verifyToken (req,res,next) {
    //get auth header value
    const bearedHeader = req.headers['authorization'];
    if(typeof bearedHeader !== 'undefined'){
        const bearer = bearedHeader.split(' '); 
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    }else{
        res.sendStatus(403);
    }

}

app.listen(5000,() => console.log("server listening at port 5000"));