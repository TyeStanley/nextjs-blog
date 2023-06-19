import db from "@/lib/db";
import { verifyToken } from "@/lib/jwt";
import Blog from "@/models/Blog";

export async function GET(req) {
  await db.connect();

  try {
    const blogs = await Blog.find({}).limit(16).populate("authorId");
    return new Response(JSON.stringify(blogs), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(null), { status: 500 });
  }
}

export async function POST(req) {}
