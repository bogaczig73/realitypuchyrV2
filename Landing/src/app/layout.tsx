import './assets/css/tailwind.css'
import './assets/css/materialdesignicons.min.css'

import {League_Spartan } from 'next/font/google'

const league_Spartan = League_Spartan({ 
  subsets: ['latin'] ,
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-league_Spartan",
})

export const metadata = {
  title: 'Pavel Puchýř - Real Estate',
  description: 'Pavel Puchýř - Real estate for everyone',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light scroll-smooth" dir="ltr">
      <body className={`${league_Spartan.className} dark:bg-slate-900`}>{children}</body>
    </html>
  );
}
