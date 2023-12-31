"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { AiOutlineFileImage } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import { useSession } from "next-auth/react";
import "react-toastify/dist/ReactToastify.css";
import classes from "./createBlog.module.css";

export default function CreateBlog() {
  const CLOUD_NAME = "djallaxyw";
  const UPLOAD_PRESET = "my_blog_project_nextjs";

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("Nature");
  const [photo, setPhoto] = useState("");

  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return <p className={classes.accessDenied}>Access Denied</p>;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!photo || !title || !desc) {
      toast.error("Please fill all the fields!");
      return;
    }

    try {
      const imageUrl = await uploadImage();

      const res = await fetch(`https://nextjs-blog-henna-zeta-83.vercel.app/api/blog`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session?.user?.accessToken}`
        },
        method: "POST",
        body: JSON.stringify({
          title,
          desc,
          category,
          imageUrl,
          authorId: session?.user?._id
        })
      });

      if (!res.ok) throw new Error("Something went wrong!");

      const blog = await res.json();

      router.push(`/blog/${blog?._id}`);
    } catch (error) {
      console.log(error);
    }
  }

  async function uploadImage() {
    if (!photo) return;

    const formData = new FormData();

    formData.append("file", photo);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
        method: "POST",
        body: formData
      });

      const data = await res.json();

      const imageUrl = data["secure_url"];

      return imageUrl;
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h2>Create Post</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title..."
            onChange={e => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Description..."
            onChange={e => setDesc(e.target.value)}
          />
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            <option value="Nature">Nature</option>
            <option value="Mountain">Mountain</option>
            <option value="Ocean">Ocean</option>
            <option value="Wildlife">Wildlife</option>
            <option value="Forest">Forest</option>
          </select>
          <label htmlFor="image">
            Upload Image <AiOutlineFileImage />
          </label>
          <input
            id="image"
            type="file"
            style={{ display: "none" }}
            onChange={e => setPhoto(e.target.files[0])}
          />
          <button className={classes.createBlog}>Create</button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
