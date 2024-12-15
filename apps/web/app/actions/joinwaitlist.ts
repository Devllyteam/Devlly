/* eslint-disable turbo/no-undeclared-env-vars */
"use server";

import { Resend } from "resend";
import { userSchema } from "@/lib/schema";
import prisma from "@repo/database";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

const resend = new Resend(process.env.RESEND_API_KEY);

if (!process.env.RESEND_API_KEY) {
  console.warn("RESEND_API_KEY is not set. Email functionality will not work.");
}

// In-memory store for rate limiting
const rateLimitStore = new Map<string, { count: number; timestamp: number }>();

// Rate limit configuration
const RATE_LIMIT = 5;
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds

function getRateLimitRemaining(ip: string): number {
  const now = Date.now();
  const userRateLimit = rateLimitStore.get(ip);

  if (!userRateLimit || (now - userRateLimit.timestamp) > RATE_LIMIT_WINDOW) {
    rateLimitStore.set(ip, { count: 1, timestamp: now });
    return RATE_LIMIT - 1;
  }

  if (userRateLimit.count >= RATE_LIMIT) {
    return 0;
  }

  userRateLimit.count += 1;
  rateLimitStore.set(ip, userRateLimit);
  return RATE_LIMIT - userRateLimit.count;
}

export async function joinWaitlist(formData: FormData) {
  const headersList = await headers();
  const ip = headersList.get('x-forwarded-for') || 'unknown';
  
  const rateLimitRemaining = getRateLimitRemaining(ip);
  if (rateLimitRemaining <= 0) {
    return {
      success: false,
      error: "Rate limit exceeded. Please try again later.",
    };
  }

  const username = formData.get("username") as string;
  const email = formData.get("email") as string;

  const result = userSchema.safeParse({ username, email });

  if (!result.success) {
    return {
      success: false,
      error: result.error.issues[0]?.message || "Invalid input",
    };
  }

  try {
    // Check if user already exists
    const existingUser = await prisma.waitlistUser.findFirst({
      where: {
        OR: [
          { username: username },
          { email: email }
        ]
      }
    });

    if (existingUser) {
      return {
        success: false,
        error: existingUser.username === username
          ? "This username is already registered."
          : "This email is already registered.",
      };
    }

    // Add the user to the database
    await prisma.waitlistUser.create({
      data: {
        username,
        email,
      },
    });

    const toEmail =
      process.env.NODE_ENV === "production" ? email : process.env.EMAIL;

    if (!toEmail) {
      throw new Error("Recipient email is not set");
    }

    // Prepare email payload
    const emailPayload = {
      from: "Devlly <onboarding@resend.dev>",
      to: toEmail,
      subject: "Welcome to the Devlly Waitlist!",
      html: `
        <h1>Welcome to Devlly, ${username}!</h1>
        <p>Thank you for joining our waitlist. We'll keep you updated on our launch and any exciting news you will recive mail on ${email} !</p>
        <p>Your reserved username: ${username}</p>
      `,
    };

    // Send confirmation email
    const emailResult = await resend.emails.send(emailPayload);

    if (emailResult.error) {
      console.error("Email sending error:", emailResult.error);
      throw new Error("Failed to send email");
    }

    // Revalidate the waitlist page
    revalidatePath("/waitlist");

    return {
      success: true,
      message:
        "You've been added to the waitlist! Check your email for confirmation.",
      rateLimitRemaining,
    };
  } catch (error) {
    console.error("Error in joinWaitlist:", error);
    return {
      success: false,
      error: "An error occurred. Please try again later.",
      rateLimitRemaining,
    };
  }
}

