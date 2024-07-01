import Link from "next/link";

function ErrorPage({ message, backLink, btnMessage }) {
  return (
    <main className='text-center space-y-6 mt-4'>
      <h1 className='text-3xl font-semibold'>
        {message}
      </h1>
      <Link
        href={backLink}
        className='inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg'
      >
        {btnMessage}
      </Link>
    </main>
  );
}

export default ErrorPage;
