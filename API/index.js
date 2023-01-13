var express = require('express');
var cors = require('cors')
var app = express();
var PORT = 3001;

app.use(cors());

app.use(express.json());

app.use(express.static('uploads'));

app.get("/api",(req, res)=>{
    res.send('Api-Rest Maxi Filme');
});

app.listen(PORT,()=>{
    console.log(`
    API Server
        http://localhost:${PORT}/api/
    `);
});