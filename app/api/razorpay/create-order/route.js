import Razorpay from "razorpay";
import { NextResponse } from "next/server";
import Payment from "@/models/Payment";
import connectDb from "@/db/connectDb";

export const POST = async (req) => {
  await connectDb();
  // Only use await req.json() for JSON requests
  const { amount, username, paymentform } = await req.json();

  if (!process.env.NEXT_PUBLIC_KEY_ID || !process.env.KEY_SECRET) {
    return NextResponse.json({ error: "Missing Razorpay credentials" }, { status: 400 });
  }

  const instance = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_KEY_ID,
    key_secret: process.env.KEY_SECRET,
  });

  try {
    const order = await instance.orders.create({
      amount: Number.parseInt(amount),
      currency: "INR",
    });

    await Payment.create({
      oid: order.id,
      amount: amount / 100,
      to_user: username,
      name: paymentform.name,
      message: paymentform.message,
    });

    return NextResponse.json({ id: order.id, key: process.env.NEXT_PUBLIC_KEY_ID });
  } catch (err) {
    console.error("Razorpay initiation error:", err);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
};

export const GET = async () => {
  return NextResponse.json({ message: "This endpoint is for Razorpay order creation via POST only." });
}; 