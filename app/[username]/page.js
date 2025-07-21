import PaymentPage from '@/components/PaymentPage';
import { notFound } from "next/navigation";
import connectDb from '@/db/connectDb';
import User from '@/models/User';

export default async function Username({ params }) {
  await connectDb();
  const user = await User.findOne({ username: params.username });
  if (!user) {
    notFound();
  }
  return <PaymentPage username={params.username} />;
}

export async function generateMetadata({ params }) {
  return {
    title: `Support ${params.username} - Get Me A Chai`,
  };
}
