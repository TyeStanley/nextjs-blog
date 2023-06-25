"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import classes from "./register.module.css";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (username === "" || email === "" || password === "") {
      toast.error("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    try {
      const res = await fetch("https://nextjs-blog-henna-zeta-83.vercel.app/api/register", {
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
          username,
          email,
          password
        })
      });

      if (res.ok) {
        toast.success("Successfully registered.");
        setTimeout(() => {
          signIn();
        }, 1500);
        return;
      } else {
        toast.error("Error occured while registering.");
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username..."
            onChange={e => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email..."
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password..."
            onChange={e => setPassword(e.target.value)}
          />
          <button className={classes.submitButton}>Register</button>
          <button
            className={classes.registerNow}
            onClick={() => signIn()}
          >
            Don&apos;t have an account? <br /> Register now.
          </button>
        </form>
      </div>
    </div>
  );
}
