export default function SuccessPage({ searchParams }) {
  const username = searchParams?.user || "the creator";
  return (
    <div className="text-center py-20">
      <h1 className="text-3xl font-bold text-green-600">Payment Successful!</h1>
      <p className="mt-4">Thank you for supporting {username}!</p>
      <a
        href={`/${username}`}
        className="mt-8 inline-block px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
      >
        Go Back to your page
      </a>
    </div>
  );
}

