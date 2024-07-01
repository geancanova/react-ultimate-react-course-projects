import Link from "next/link";
import ErrorPage from "@/app/_components/ErrorPage";

function NotFound() {
  return <ErrorPage message='This page could not be found :(' backLink='/' btnMessage='Go back home' />;
}

export default NotFound;
