const express=require('express');
const morgan=require('morgan');
const mongoose=require('mongoose');
const Blog=require('./models/blogs');


//connect to mongoDB
const dbURI='mongodb+srv://ark845612:wHUn9wE1nsUXeCfN@nodetuts.tz7mv4w.mongodb.net/nodetuts?retryWrites=true&w=majority';
mongoose.set("strictQuery", false);
mongoose.connect(dbURI,{useNewUrlParser:true,useUnifiedTopology:true})
    .then((result)=>{
        app.listen(3000);
        console.log("connected to DB");
    })
    .catch((err)=>console.log(err));
//express app
const app=express();

//register view engine
app.set('view engine','ejs');

//listens for requests
// app.listen(3000);

//middleware and static files
app.use(express.static('public'));
app.use(morgan('dev'));
// app.use((req,res,next)=>{
//     console.log('New request made:');
//     console.log('host:',req.hostname);
//     console.log('path:',req.path);
//     console.log('method:',req.method);
//     next();
// });

app.use((req,res,next)=>{
    console.log('2nd middleware');
    next();
});

//mongoose and mongo sandbox routes
app.get('/add-blog',(req,res)=>{
    const blog=new Blog({
        title:'new blog',
        snippet:'about my new blog',
        body:'more about my new blog'
    });
    blog.save()
        .then((result)=>{
            res.send(result);
        })
        .catch((err)=>{
            console.log(err);
        })
})

app.get("/all-blogs",(req,res)=>{
    Blog.find()
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        console.log(err);
    })
})

app.get("/single-blog",(req,res)=>{
    Blog.findById("63f60bad421e1ccfcea8655d")
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        console.log(err);
    })
})
//routes
app.get('/',(req,res)=>{
    res.redirect('/blogs');
    // res.send('<p>Home Page</p>');
    // res.sendFile('./views/index.html',{root:__dirname});
    // const blogs=[
    //     {title:"hello world",snippet:"lorem ipsum dolor sit amet, consectetur adip"},
    //     {title:"hello mario",snippet:"lorem ipsum dolor sit amet, consectetur adip"},
    //     {title:"hello anil",snippet:"lorem ipsum dolor sit amet, consectetur adip"}
    // ];
    // res.render('index',{title:'Home',blogs});
});
app.get('/about',(req,res)=>{
    // res.send('<p>About Page</p>');
    // res.sendFile('./views/about.html',{root:__dirname});
    res.render('about',{title:'About'});
});

app.get('/blogs',(req,res)=>{
    Blog.find().sort({createdAt:-1})
    .then((result)=>{
        res.render('index',{title:'All blogs',blogs:result})
    })
    .catch((err)=>{
        console.log(err);
    })
});

app.get('/blogs/create',(req,res)=>{
    // res.send('<p>About Page</p>');
    // res.sendFile('./views/about.html',{root:__dirname});
    res.render('create',{title:"Create"});
});
app.get('/about-us',(req,res)=>{
    res.redirect('/about');
})

app.use((req,res)=>{
    // res.status(404).sendFile("./views/404.html",{root:__dirname});    
    res.status(404).render('404',{title:"404"});
})