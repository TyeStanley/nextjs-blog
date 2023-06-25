import BlogCard from "@/components/blogCard/BlogCard";
import classes from "./page.module.css";

export async function fetchBlogs() {
  try {
    const res = await fetch("https://nextjs-blog-henna-zeta-83.vercel.app/api/blog", { cache: "no-store" });

    return res.json();
  } catch (error) {
    console.log(error);
  }
}

export default async function Home() {
  const blogs = await fetchBlogs();

  return (
    <div className={classes.container}>
      {blogs?.length > 0 && <h2>My Blog Website</h2>}
      <div className={classes.wrapper}>
        {blogs?.length > 0 ? (
          blogs.map(blog => (
            <BlogCard
              key={blog._id}
              blog={blog}
            />
          ))
        ) : (
          <h3 className={classes.noBlogs}>No blogs are currently posted</h3>
        )}
      </div>
    </div>
  );
}
