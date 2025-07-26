export default function SuccessPage({ searchParams }) {
  const username = searchParams?.user || "the creator";
  return (
    <div className="text-center py-10 px-4 sm:py-20 sm:px-0">
      <h1 className="text-2xl sm:text-3xl font-bold text-green-600">
        Payment Successful!
      </h1>
      <p className="mt-4 text-base sm:text-lg">
        Thank you for supporting {username}!
      </p>
      <a
        href={`/${username}`}
        className="mt-8 inline-block px-4 py-2 sm:px-6 sm:py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition text-sm sm:text-base"
      >
        Go Back to your page
      </a>
    </div>
      );
}