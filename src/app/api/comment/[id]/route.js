import db from "@/lib/db";
import { verifyJwtToken } from "@/lib/jwt";
import Comment from "@/models/Comment";

export async function GET(req, ctx) {
  await db.connect();

  const id = ctx.params.id;

  try {
    const comments = await Comment.find({ blogId: id }).populate("authorId");

    return new Response(JSON.stringify(comments), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(null), { status: 500 });
  }
}

export async function DELETE(req) {}
