import Link from "next/link";
import ErrorPage from "@/app/_components/ErrorPage";

function NotFound() {
  return <ErrorPage message='This cabin could not be found :(' backLink='/cabins' btnMessage='Back to all cabins' />;
}

export default NotFound;
