import { serialize } from "cookie"
import { sign } from "jsonwebtoken"
import { NextResponse } from "next/server"
import { COOKIE_NAME } from "../../../../../constants/constants"

const MAX_AGE = 60 * 60 * 24 * 30

export async function POST(request) {
  const body = await request.json()

  const { username, password } = body

  if (username !== 'admin' || password !== 'admin') {
    return NextResponse.json(
      {
        message: 'Unauthorized, please check the details...'
      },
      {
        status: 401
      }
    )
  }

  const secret = process.env.NEXT_PUBLIC_JWT_SECRET || "";

  const token = sign(
    {
      username,
    },
    secret,
    {
      expiresIn: MAX_AGE,
    }
  );

  const serialized = serialize(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NEXT_PUBLIC_NODE_ENV === "development",
    sameSite: "strict",
    maxAge: MAX_AGE,
    path: "/",
  });

  const response = {
    message: "Authenticated!, welcome...",
  };

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: { "Set-Cookie": serialized },
  });
}