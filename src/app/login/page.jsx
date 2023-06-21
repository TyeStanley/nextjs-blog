"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import classes from "./login.module.css";
import { signIn } from "next-auth/react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    if (password === "" || email === "") {
      toast.error("Please fill all the fields!");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long!");
      return;
    }

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false
      });

      if (res?.error == null) {
        router.push("/");
      } else {
        toast.error("Error while logging in!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h2>Log In</h2>
        <form onSubmit={handleSubmit}>
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
          <button className={classes.submitButton}>Log In</button>
          <Link
            className={classes.loginNow}
            href="/register"
          >
            Don&apos;t have an account? <br /> Register now.
          </Link>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
