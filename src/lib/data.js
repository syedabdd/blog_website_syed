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
  try {
    await connectToDb();
    const user = await User.findById(id); // ✅ Correct usage
    return user;
  } catch (err) {
    console.error("Error fetching user:", err);
    return null;
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

