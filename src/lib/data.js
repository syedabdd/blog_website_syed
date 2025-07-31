import { Post, User } from "./models"; // ✅ Import your actual Mongoose models
import { connectToDb } from "./utlis";


export const getPosts = async () => {
 try{
  connectToDb()
  const posts = await Post.find()
  return posts;
 }catch(err){
  console.log(err);
  
 }
};

export const getPost = async (slug) => {
  try {
    await connectToDb();
    const decodedSlug = decodeURIComponent(slug);
    const post = await Post.findOne({ slug: decodedSlug });
    return post;
  } catch (err) {
    console.log("Error fetching post:", err);
    return null;
  }
};


export const getUser = async (id) => {
 try{
  connectToDb()
  const user = await User.findById({id})
  return user;
 }catch(err){
  console.log(err);
  
 }
};
export const getUsers = async () => {
 try{
  connectToDb()
  const users = await User.find()
  return users;
 }catch(err){
  console.log(err);
  
 }
};

