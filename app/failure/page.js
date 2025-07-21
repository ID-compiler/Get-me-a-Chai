import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/models/Payment";
import User from "@/models/User";
import connectDb from "@/db/connectDb";

export const POST = async (req) => {
    await connectDb();
    const form = Object.fromEntries(await req.formData());

    const payment = await Payment.findOne({ oid: form.razorpay_order_id });
    if (!payment) return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/failure`);

    const user = await User.findOne({ username: payment.to_user });
    const isValid = validatePaymentVerification(
        { order_id: form.razorpay_order_id, payment_id: form.razorpay_payment_id },
        form.razorpay_signature,
        process.env.KEY_SECRET // Use your global secret here
    );

    if (isValid) {
        await Payment.findOneAndUpdate(
            { oid: form.razorpay_order_id },
            { done: true },
            { new: true }
        );
        // Redirect to a custom success page
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/success?user=${payment.to_user}`);
    } else {
        // Redirect to a custom failure page
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/failure`);
    }
};