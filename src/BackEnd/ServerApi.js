const express = require('express');
const app=express()
const cors = require('cors')
const mongoose=require('mongoose');
const bodyParser = require('body-parser');
app.use(express.json())
app.use(cors())

const PORT = 3002;
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())

const connectDB = require('./Connection')
connectDB()

const BlogPostSchema=require('./BlogPostSchema')

const User = require('./UserSchema')

app.post('/add', async (req, res) => {
    const { title, content, author } = req.body;
    // Find the maximum postid in the collection
    BlogPostSchema.findOne({}, {}, { sort: { postid: -1 } })
      .then((latestPost) => {
        let newPostid = 1;
        if (latestPost) {
          newPostid = latestPost.postid + 1;
        }
    
    const post = new BlogPostSchema({
      postid: newPostid,
      title: title,
      content: content,
      author: author
    });
  
    post.save()
          .then((savedPost) => {
            res.status(201).json(savedPost);
          })
          .catch((error) => {
            res.status(500).json({ error: 'Error saving post' });
          });
      })
      .catch((error) => {
        res.status(500).json({ error: 'Error retrieving latest post' });
      });
  
    });

    app.get('/posts',async (req,res)=>{
      try{
        const posts = await BlogPostSchema.find();
        res.json(posts);
      }
      catch(error){
        console.error('error retrieving posts:',error);
        res.status(500).json({error: 'An error occurred'});
      }
    });

    app.get('/getbyid/:postid', async (req, res)=> {
      const postid =req.params.postid;
      try{
        BlogPostSchema.find({"postid": postid})
        .then((postbyid)=>{
          if (postbyid.length ===0){
            return res.status(404).json({message: 'Post not found'});
          }
          return res.json(postbyid);
        })
        .catch((error)=>{
          return res.status(500).json({message:'Failed to retrieve post'});
        });
      }catch(error){
        return res.status(500).json({message:'Failed to retrieve post'});
      }
        });
      
        app.delete("/deletepost/:postid", async(req,res)=>{
          console.log("working");
        try{
          const {postid}=req.params;
          const blogpost =await BlogPostSchema.findOne({postid});
          if(!blogpost){
            return res.status(401).json({message:'Post not found'});
          }
        else{
          BlogPostSchema.findOneAndDelete({postid})
            .then ((deletepost)=>{
              if(!deletepost){
                return res.status(404).json({error:'Find to Delete'});
              }
              return res.status(200).json({message:'Deleted'});
            })
        }
        } catch(error){
        console.log(error)
        res.send(error)
      }
      })

      app.put('/updatepost/:postid', async (req, res) => {
        const {postid}= req.params;
        const {title, content, author}= req.body;
        
        const blogpost= await BlogPostSchema.findOne({postid}); 
        if (!blogpost) {
        return res.status(401).json({ message: 'Post Not Found' });
        }
        else {
           BlogPostSchema.findOneAndUpdate({ postid}, {title, content, author}, { new: true })
            .then((updatedpost) => {
        if (!updatedpost){       
        return res.status(404).json({error: 'Post not found'});
        }
        return res.status(200).json({ message: "Updated" });
         res.json(updatedpost);
      })
        .catch((error) =>
          {
            console.error("Error updating user:", error); 
            res.status(500).json({error: "An error occurred"});
          })
        }
      });
      

app.post('/register', async (req, res)=>{
  const { uname, email, password} =req.body;
  try {
  const newUser = new User({
  uname,
  email,
  password
  });
  await newUser.save();
  res.status(201).json({message: 'User registered successfully'});
  } catch (error) {
  console.error('Error registering user:', error);
  res.status(500).json({ error: 'An error occurred during registration' });
  }
})

app.post('/login',async(req,res)=>{
  const{email,password}=req.body;
  try{
      const user=await User.findOne({email});
      if(!user){
          return res.status(401).json({message: 'Invalid credentails'});
      }
      if(user.password===password){
          console.log("credentails are true.");
      }
  }catch(error){
      console.error('Database error:',error);
      res.status(500).json({message:'An error occurred'});
  }
});

app.listen(PORT, ()=> console.log('Server running on port $ {PORT}'));