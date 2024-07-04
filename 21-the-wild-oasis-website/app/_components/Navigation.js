import { auth } from "app/_lib/auth";
import Link from "next/link";

export default async function Navigation() {
  const session = await auth();

  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        <li>
          <Link href="/cabins" className="hover:text-accent-400 transition-colors">
            Cabins
          </Link>
        </li>
        <li>
          <Link href="/about" className="hover:text-accent-400 transition-colors">
            About
          </Link>
        </li>
        <li>
          <Link
            href="/account"
            className="hover:text-accent-400 transition-colors flex gap-3 items-center"
          >
            {session?.user?.image &&
              <img
                src={session.user.image}
                alt={session.user.name}
                className="h-8 w-8 rounded-full"
                referrerPolicy="no-referrer"
              />
            }
            <span>Guest area</span>
          </Link>

        </li>
      </ul>
    </nav>
  );
}
