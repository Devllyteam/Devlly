/* eslint-disable turbo/no-undeclared-env-vars */
"use server";

import { Resend } from "resend";
import { userSchema } from "@/lib/schema";
import { prisma } from "@repo/database";
import { revalidatePath } from "next/cache";

const resend = new Resend(process.env.RESEND_API_KEY);

if (!process.env.RESEND_API_KEY) {
  console.warn("RESEND_API_KEY is not set. Email functionality will not work.");
}

export async function joinWaitlist(formData: FormData) {
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
        <p>Thank you for joining our waitlist. We'll keep you updated on our launch and any exciting news!</p>
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
    };
  } catch (error) {
    console.error("Error in joinWaitlist:", error);
    if (
      error instanceof Error &&
      "code" in error &&
      (error ).code === "P2002"
    ) {
      return {
        success: false,
        error: "This username or email is already registered.",
      };
    }
    return {
      success: false,
      error: "An error occurred. Please try again later.",
    };
  }
}
