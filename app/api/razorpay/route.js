import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/models/Payment";
import User from "@/models/User";
import connectDb from "@/db/connectDb";

export const POST = async (req) => {
    await connectDb();
    const form = Object.fromEntries(await req.formData());

    const payment = await Payment.findOne({ oid: form.razorpay_order_id });
    if (!payment) return NextResponse.redirect(`${process.env.BASE_URL}/failure`);

    // If you want to check user, you can, but not required for secret
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
        const baseUrl = process.env.BASE_URL || "http://localhost:3000";
        const redirectUrl = `${baseUrl}/success?user=${payment.to_user}`;
        console.log("Redirecting to:", redirectUrl);
        return NextResponse.redirect(redirectUrl, 303);
    } else {
        // Redirect to a custom failure page
        const baseUrl = process.env.BASE_URL || "http://localhost:3000";
        return NextResponse.redirect("/failure");
    }
};
