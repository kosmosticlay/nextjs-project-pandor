import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  return Response.json({
    ok: true,
    message: "Hello World",
  });
}

export async function POST(request: NextRequest) {
  const { body } = request;
  return Response.json({
    ok: true,
    message: body,
  });
}
