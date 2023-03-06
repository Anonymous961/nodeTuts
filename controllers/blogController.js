const Blog=require('../models/blogs');
// blog_index , blog_details, blog_create_get ,blog_create_post , blog_delete

const blog_index = (req,res)=>{
    Blog.find().sort({createdAt:-1})
    .then((result)=>{
        res.render('blogs/index',{title:'All blogs',blogs:result})
    })
    .catch((err)=>{
        console.log(err);
    })
}

const blog_details=(req,res)=>{
    const id=req.params.id;
    Blog.findById(id)
    .then((result)=>{
        res.render('blogs/details',{title:'Blog Details',blog:result})
    })
    .catch((err)=>{
        console.log(err);
        res.status(404).render('404',{title:"Blog Not Found"});
    });
}

const blog_create_get=(req,res)=>{
    // res.send('<p>About Page</p>');
    // res.sendFile('./views/about.html',{root:__dirname});
    res.render('blogs/create',{title:"Create New BLog"});
}
const blog_create_post=(req,res)=>{
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
}

const blog_delete=(req,res)=>{
    const id=req.params.id;

    Blog.findByIdAndDelete(id)
    .then(result=>{
        res.json({redirect:'/blogs'});
    })
    .catch(err=>{
        console.log(err);
    })
}

module.exports={
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete
}