const http=require('http');
const fs =require('fs');
const _=require('lodash');

const server=http.createServer((req,res)=>{
    // console.log("request made");
    // console.log(req);
    console.log(req.url,req.method);
    res.setHeader('Content-type','text/html');
    let num=_.random(0,20);
    console.log(num);
    
    let path='./views/';
    switch(req.url){
        case '/':
            path+='index.html';
            res.statusCode=200;
            break;
        case '/about':
            path+='about.html';
            res.statusCode=200;
            break;
        case '/about-us':
            // path+='about.html';
            res.statusCode=301;
            res.setHeader('Location','/about');
            res.end();
            break;
        default:
            path+='404.html';
            res.statusCode=404;
            break;
    }
    fs.readFile(path,(err,data)=>{
        if(err){
            console.log(err);
            res.end();
        }else{
            res.write(data);
            res.end();
        }
    })
    // res.write('<head><link rel="stylesheet" href="#"></head>');
    // res.write('<p>Hello ninjas</p>');
    // res.write('<p>Hello check check</p>');
    // res.end();
})

server.listen(3000,'localhost',()=>{
    console.log("listening for requests on port 3000");
})