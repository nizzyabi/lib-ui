import bcrypt from "bcrypt";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';


const redis = new Redis({
	url: process.env.UPSTASH_REDIS_REST_URL,
	token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const ratelimit = new Ratelimit({
	redis,
	limiter: Ratelimit.fixedWindow(5, '30m'),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, name } = body;

    // Get IP address from various headers
    const forwarded = req.headers.get("x-forwarded-for");
    const realIp = req.headers.get("x-real-ip");
    const identifier = forwarded?.split(',')[0] || realIp || "unknown";
    
    const result = await ratelimit.limit(identifier);
    console.log('Rate limit status:', {
        ip: identifier,
        success: result.success,
        remaining: result.remaining,
        reset: result.reset,
        limit: result.limit
    });

    if (!result.success) {
			return NextResponse.json({
				error: 'Rate limit exceeded. Please try again later.'
			}, { status: 429 });
		}

    if (!email || !password) {
    return new NextResponse("Missing fields", { status: 400 });
    }

    const existingUser = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return new NextResponse("Email already exists", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log("[REGISTER_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
