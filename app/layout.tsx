import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WokiMovies",
  description:
    "Discover and explore an extensive collection of movies with WokiMovies. Our platform allows you to easily search for films by title, genre, and release year. Whether you're looking for the latest blockbusters, hidden gems, or classic favorites, WokiMovies provides comprehensive movie details and recommendations. Enjoy a user-friendly interface and stay updated with the latest in film entertainment. Find your next favorite movie today with WokiMovies!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="/logo.svg" sizes="any" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="WokiMovies" />
      <meta property="og:url" content="https://wokimovies.vercel.app/" />
      <meta
        property="og:image"
        content="https://firebasestorage.googleapis.com/v0/b/reserva-turnos-online.appspot.com/o/Captura%20de%20pantalla%202024-09-06%20220548.png?alt=media&token=622cc5d5-e0e2-445c-8266-d94a83fc7183"
      />
      <meta
        property="og:description"
        content="Discover and explore an extensive collection of movies with WokiMovies. Our platform allows you to easily search for films by title, genre, and release year. Whether you're looking for the latest blockbusters, hidden gems, or classic favorites, WokiMovies provides comprehensive movie details and recommendations. Enjoy a user-friendly interface and stay updated with the latest in film entertainment. Find your next favorite movie today with WokiMovies!"
      ></meta>

      <body
        className={`${inter.className} bg-white dark:bg-gray-900 min-h-screen`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
