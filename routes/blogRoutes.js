const express=require('express');
const Blog=require('../models/blogs');
const router=express.Router();

router.get('/blogs',(req,res)=>{
    Blog.find().sort({createdAt:-1})
    .then((result)=>{
        res.render('index',{title:'All blogs',blogs:result})
    })
    .catch((err)=>{
        console.log(err);
    })
});

router.post('/blogs',(req,res)=>{
    console.log(req.body);
    // console.log(req.body.title);
    const blog=new Blog(req.body)

    blog.save()
    .then((result)=>{
        res.redirect('/blogs');
    })
    .catch((err)=>{
        console.log(err);
    })
})
router.get('/blogs/create',(req,res)=>{
    // res.send('<p>About Page</p>');
    // res.sendFile('./views/about.html',{root:__dirname});
    res.render('create',{title:"Create"});
});

router.get("/blogs/:id",(req,res)=>{
    const id=req.params.id;
    Blog.findById(id)
    .then((result)=>{
        res.render('details',{title:'Blog Details',blog:result})
    })
    .catch((err)=>{
        console.log(err);
    });
});

router.delete('/blogs/:id',(req,res)=>{
    const id=req.params.id;

    Blog.findByIdAndDelete(id)
    .then(result=>{
        res.json({redirect:'/blogs'});
    })
    .catch(err=>{
        console.log(err);
    })
})


module.exports=router;