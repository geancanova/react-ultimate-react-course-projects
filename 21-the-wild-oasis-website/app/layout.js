import { Josefin_Sans } from "next/font/google";

const josefinSans = Josefin_Sans({ subsets: ["latin"], display: "swap" });

import Header from "@/app/_components/Header";
import "@/app/_styles/globals.css";
import { ReservationProvider } from "./_components/ReservationContext";

export const metadata = {
  title: {
    default: 'The Wild Oasis',
    template: '%s | The Wild Oasis',
  },
  description: 'Luxurious cabin hotel, located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests.'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${josefinSans.className} bg-primary-950 text-primary-100 min-h-screen flex flex-col relative`}>

        <Header />

        <div className="flex-1 px-8 py-12 grid">
          <main className="max-w-7xl mx-auto w-full">
            <ReservationProvider>
              {children}
            </ReservationProvider>
          </main>
        </div>
      </body>
    </html >
  )
}
