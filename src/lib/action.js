// src/lib/action.js

"use server";

import { revalidatePath } from "next/cache";
import { Post, User } from "./models";
import { connectToDb } from "./utlis";
import { signIn, signOut } from "./auth";
import bcrypt from "bcrypt";

// ------------------ ADD POST ------------------
export const addPost = async (formData) => {
  const { title, desc, slug, userId, img } = Object.fromEntries(formData);

  try {
    await connectToDb();

    const user = await User.findById(userId);
    if (!user) {
      console.log("User not found");
      return;
    }

    const newPost = new Post({
      title,
      desc,
      slug,
      userId,
      img,
      author: user.username,
    });

    await newPost.save();
    console.log("Saved to DB");

    revalidatePath("/blog");
    revalidatePath("/admin");
  } catch (err) {
    console.log("Error saving post:", err);
  }
};

// ------------------ DELETE POST ------------------
export const deletePost = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    await connectToDb();

    await Post.findByIdAndDelete(id);
    console.log("Deleted from DB");

    revalidatePath("/blog");
    revalidatePath("/admin");
  } catch (err) {
    console.log("Error deleting post:", err);
  }
};

// ------------------ LOGIN / LOGOUT ------------------
export const handleLogin = async () => {
  "use server";
  await signIn("github");
};

export const handleLogout = async () => {
  "use server";
  await signOut();
};

// ------------------ REGISTER ------------------
export const register = async (formData) => {
  const { username, email, password, img, repassword } = formData; // ✅ Already plain object

  if (!username || !email || !password || !repassword) {
    return "All fields are required";
  }

  if (password !== repassword) {
    return "Passwords do not match";
  }

  try {
    await connectToDb();

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return "Username already exists";
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      img,
    });

    await newUser.save();
    console.log("User saved to DB ✅");

    return "success";
  } catch (err) {
    console.error("Register error:", err);
    return "Something went wrong during registration.";
  }
};

// ------------------ LOGIN WITH CREDENTIALS ------------------
export const login = async (formData) => {
  const { username, password } = formData;

  try {
    await signIn("credentials", { username, password });
  } catch (err) {
    console.error("Login error:", err);
    return "Invalid credentials or something went wrong.";
  }
};

// ------------------ ADD USER (ADMIN SIDE) ------------------
export const addUser = async (prevState, formData) => {
  try {
    const { username, email, password, img, isAdmin } = Object.fromEntries(formData);

    await connectToDb();

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return { error: "Username already exists" };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const adminFlag = isAdmin === "true";

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      img,
      isAdmin: adminFlag,
    });

    await newUser.save();
    console.log("Admin user saved ✅");

    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Add user error:", error);
    return { error: "Something went wrong" };
  }
};

// ------------------ DELETE USER ------------------
export const deleteUser = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    await connectToDb();

    await Post.deleteMany({ userId: id });
    await User.findByIdAndDelete(id);

    console.log("User and their posts deleted ✅");
    revalidatePath("/admin");
  } catch (err) {
    console.log("Delete user error:", err);
  }
};
