"use client";
import React, { useEffect, useState } from "react";
import Script from "next/script";
import { fetchuser, fetchpayments, initiate } from "@/actions/useractions";
import { useSearchParams, useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";
import { signOut, useSession } from "next-auth/react";

const PaymentPage = ({ username }) => {
  const [paymentform, setPaymentform] = useState({
    name: "",
    message: "",
    amount: "",
  });
  const [currentUser, setCurrentUser] = useState({});
  const [payments, setPayments] = useState([]);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (searchParams.get("paymentdone") === "true") {
      toast("Thanks for your donation!", {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
        transition: Bounce,
      });
    }
  }, []);

  const handleChange = (e) => {
    setPaymentform({ ...paymentform, [e.target.name]: e.target.value });
  };

  const getData = async () => {
    const user = await fetchuser(username);
    setCurrentUser(user);
    const dbpayments = await fetchpayments(username);
    setPayments(dbpayments);
  };

  const pay = async (amount) => {
    try {
      const res = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, username, paymentform }),
      });
      const order = await res.json();
      if (!order.id || !order.key) throw new Error(order.error || "Order creation failed");

      const options = {
        key: order.key,
        amount,
        currency: "INR",
        name: "Get Me A Chai",
        description: "Support Payment",
        order_id: order.id,
        callback_url: `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
        prefill: {
          name: paymentform.name,
          email: "support@example.com",
          contact: "9000090000",
        },
        theme: { color: "#3399cc" },
        redirect: true,
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      toast.error("Payment initiation failed");
      console.error("Payment error:", error);
    }
  };

  // Preset payment amounts
  const presetAmounts = [10, 20, 30];

  return (
    <>
      <ToastContainer />
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      {/* Banner/Header */}
      <div className="flex flex-col items-center justify-center relative">
        <img
          src={currentUser.coverpic || "https://c10.patreonusercontent.com/4/patreon-media/p/campaign/4842667/452146dcfeb04f38853368f554aadde1/eyJ3IjoxOTIwLCJ3ZSI6MX0%3D/18.gif?token-hash=2XoNFaHKobezslMvn4tj7xA6qgIPOBaiMNFvHpZ859g%3D&token-time=1754265600"}
          alt="Banner"
          className="w-full h-auto object-contain"
        />
        <div className="relative z-10 -mt-[75px] flex flex-col items-center">
          <img
            src={currentUser.profilepic || "https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg?wp=1&w=357&h=357"}
            alt="Profile"
            className="w-[140px] h-[140px] rounded-full border-4 border-white shadow-lg mb-2"
          />
          <h2 className="text-xl my-3 font-bold text-white">@{username}</h2>
          <p className="text-slate-400 font-normal text-center pb-3">
            {currentUser.bio || "Creating Animated art for VTT's"}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full flex flex-col md:flex-row justify-center items-start gap-8 px-4 py-8 min-h-[60vh]">
        {/* Supporters List */}
        <div className="bg-[#151e36] rounded-lg shadow-lg p-6 w-full md:w-1/2 max-w-lg">
          <h3 className="text-xl font-semibold mb-4 text-white">Supporters</h3>
          <ul>
            {payments.length === 0 && (
              <li className="text-gray-400">No supporters yet.</li>
            )}
            {payments.map((p, i) => (
              <li key={i} className="mb-4 flex items-center">
                <span className="mr-2">🧑‍💻</span>
                <span className="font-bold text-white">
                  {p.name || "Anonymous"}
                </span>
                <span className="ml-2 text-yellow-400 font-semibold">
                  ₹{p.amount}
                </span>
                {p.message && (
                  <span className="ml-2 text-gray-300">
                    with a message &quot;{p.message}&quot;
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
        {/* Payment Form */}
        <div className="bg-[#151e36] rounded-lg shadow-lg p-6 w-full md:w-1/2 max-w-lg">
          <h3 className="text-xl font-semibold mb-4 text-white">
            Make a Payment
          </h3>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              pay(paymentform.amount * 100); // Razorpay expects paise
            }}
          >
            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              value={paymentform.name}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-800 text-white"
              required
            />
            <input
              type="text"
              name="message"
              placeholder="Enter Message"
              value={paymentform.message}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-800 text-white"
            />
            <input
              type="number"
              name="amount"
              placeholder="Enter Amount"
              value={paymentform.amount}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-800 text-white"
              min="1"
              required
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-700 to-blue-600 text-white py-2 rounded font-bold hover:from-purple-800 hover:to-blue-700"
            >
              Pay
            </button>
          </form>
          <div className="flex gap-2 mt-4">
            {presetAmounts.map((amt) => (
              <button
                key={amt}
                className="px-4 bg-slate-800 text-white py-2 rounded font-bold hover:bg-slate-600"
                onClick={() => setPaymentform({ ...paymentform, amount: amt })}
              >
                Pay ₹{amt}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
