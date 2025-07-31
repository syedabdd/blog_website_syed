// src/lib/action.js

"use server";

import { revalidatePath } from "next/cache";
import { Post, User } from "./models";
import { connectToDb } from "./utlis";
import { signIn, signOut } from "./auth";
import bcrypt from "bcrypt";

export const addPost = async ( formData) => {
  const { title, desc, slug, userId, img } = Object.fromEntries(formData);
  //   console.log(title,desc,slug,userId);

  try {
    connectToDb();
    const newPost = new Post({
      title,
      desc,
      slug,
      userId,
      img,
    });

    await newPost.save();
    console.log("save to db");
    revalidatePath("/blog");
    revalidatePath("/admin");
  } catch (err) {
    console.log(err);
  }
};
export const deletePost = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDb();

    await Post.findByIdAndDelete(id);
    console.log("delete to db");
    revalidatePath("/blog");
    revalidatePath("/admin");
  } catch (err) {
    console.log(err);
  }
};

export const handleLogin = async () => {
  "use server";
  await signIn("github");
};

export const handleLogout = async () => {
  "use server";
  await signOut();
};

export const register = async (formData) => {
  const { username, email, password, img, repassword } =
    Object.fromEntries(formData);

  if (password !== repassword) {
    return "Passwords do not match";
  }

  try {
    await connectToDb(); // ✅ Await DB connection

    const existingUser = await User.findOne({ username }); // ✅ Await query
    if (existingUser) {
      return "Username already exists";
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword, // ⚠️ You should hash this before saving (use bcrypt)
      img,
    });

    await newUser.save();
    console.log("Saved to DB ✅");

    return "success"; // return something so UI knows it's successful
  } catch (err) {
    console.error("Register error:", err);
    return "Something went wrong during registration.";
  }
};

export const login = async (formData) => {
  const { username, password } = Object.fromEntries(formData);

  try {
    await signIn("credentials", { username, password });
  } catch (err) {
    console.error("Register error:", err);
    return "Something went wrong during registration.";
  }
};

export const addUser = async (prevState, formData) => {
  try {
    const { username, email, password, img, isAdmin } = Object.fromEntries(formData);

    await connectToDb();

    // Check for existing user
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return { error: "Username already exists" };
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Convert isAdmin string to boolean
    const adminFlag = isAdmin === "true";

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      img,
      isAdmin: adminFlag,
    });

    await newUser.save();

    console.log("User saved to DB ✅");
    revalidatePath("/admin");

    return { success: true };
  } catch (error) {
    console.error("Add user error:", error);
    return { error: "Something went wrong" };
  }
};



export const deleteUser = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDb();
    await Post.deleteMany({userId: id})
    await User.findByIdAndDelete(id);
    console.log("delete to db");
    revalidatePath("/admin");
  } catch (err) {
    console.log(err);
  }
};
