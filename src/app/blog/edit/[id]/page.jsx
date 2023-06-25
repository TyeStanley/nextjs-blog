"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import classes from "./edit.module.css";
import { AiOutlineFileImage } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Edit(ctx) {
  const CLOUD_NAME = "djallaxyw";
  const UPLOAD_PRESET = "my_blog_project_nextjs";

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState("");
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    async function fetchBlog() {
      const res = await fetch(`https://nextjs-blog-tyestanley.vercel.app/api/blog/${ctx.params.id}`);

      const blog = await res.json();

      setTitle(blog.title);
      setDesc(blog.desc);
      setCategory(blog.category);
    }
    fetchBlog();
  }, []);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return <p className={classes.accessDenied}>Access Denied</p>;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (title === "" || desc === "" || category === "") {
      toast.error("Please fill all fields");
      return;
    }

    try {
      let imageUrl = null;
      if (photo) {
        imageUrl = await uploadImage();
      }

      const body = {
        title,
        desc,
        category
      };

      if (imageUrl != null) {
        body.imageUrl = imageUrl;
      }

      const res = await fetch(`https://nextjs-blog-tyestanley.vercel.app/api/blog/${ctx.params.id}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session?.user?.accessToken}`
        },
        method: "PUT",
        body: JSON.stringify(body)
      });

      if (!res.ok) throw new Error(res.status);

      const blog = await res.json();

      router.push(`/blog/${blog._id}`);
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
      const res = await fetch(`https:/api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
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
        <h2>Edit Post</h2>
        <form onSubmit={handleSubmit}>
          <input
            value={title}
            type="text"
            placeholder="Title"
            onChange={e => setTitle(e.target.value)}
          />
          <textarea
            value={desc}
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
          <button className={classes.createBlog}>Edit</button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
