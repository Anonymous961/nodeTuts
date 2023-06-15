const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const blogRoutes = require("./routes/blogRoutes");

//connect to mongoDB
const dbURI =
  "mongodb+srv://ark845612:m0rO1VLxXSQ9bxpT@cluster0.pozovks.mongodb.net/";
mongoose.set("strictQuery", false);
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(3000);
    console.log("connected to DB");
  })
  .catch((err) => console.log(err));
//express app
const app = express();

//register view engine
app.set("view engine", "ejs");

//listens for requests
// app.listen(3000);

//middleware and static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
// app.use((req,res,next)=>{
//     console.log('New request made:');
//     console.log('host:',req.hostname);
//     console.log('path:',req.path);
//     console.log('method:',req.method);
//     next();
// });

app.use((req, res, next) => {
  console.log("2nd middleware");
  next();
});

//mongoose and mongo sandbox routes
app.get("/add-blog", (req, res) => {
  const blog = new Blog({
    title: "new blog 2",
    snippet: "Hello,world!",
    body: "this is just to check that the add blog is working properly",
  });
  blog
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/all-blogs", (req, res) => {
  Blog.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/single-blog", (req, res) => {
  Blog.findById("63f60bad421e1ccfcea8655d")
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});
//routes
app.get("/", (req, res) => {
  res.redirect("/blogs");
  // res.send('<p>Home Page</p>');
  // res.sendFile('./views/index.html',{root:__dirname});
  // const blogs=[
  //     {title:"hello world",snippet:"lorem ipsum dolor sit amet, consectetur adip"},
  //     {title:"hello mario",snippet:"lorem ipsum dolor sit amet, consectetur adip"},
  //     {title:"hello anil",snippet:"lorem ipsum dolor sit amet, consectetur adip"}
  // ];
  // res.render('index',{title:'Home',blogs});
});
app.get("/about", (req, res) => {
  // res.send('<p>About Page</p>');
  // res.sendFile('./views/about.html',{root:__dirname});
  res.render("about", { title: "About" });
});

//blog routes
app.use("/blogs", blogRoutes);

app.get("/about-us", (req, res) => {
  res.redirect("/about");
});

app.use((req, res) => {
  // res.status(404).sendFile("./views/404.html",{root:__dirname});
  res.status(404).render("404", { title: "404" });
});
