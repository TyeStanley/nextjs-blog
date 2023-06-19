import db from "@/lib/db";
import { verifyJwtToken } from "@/lib/jwt";
import Blog from "@/models/Blog";
import User from "@/models/User";

export async function GET(req, ctx) {
  await db.connect();

  const id = ctx.params.id;

  try {
    const blog = await Blog.findById(id)
      .populate("authorId")
      .select("-password");

    return new Response(JSON.stringify(blog), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(null), { status: 500 });
  }
}

export async function PUT(req) {}

export async function DELETE(req) {}
