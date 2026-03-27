import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Circuit Minds | Hands-On Electronics & Robotics Courses',
  description:
    'Circuit Minds offers hands-on electronics and robotics courses for curious students through structured 6-week programs with real projects and guided labs.',
  keywords: [
    'Circuit Minds',
    'electronics classes',
    'robotics classes',
    'STEM courses',
    'kids engineering classes',
    'hands-on learning',
    'robotics for kids',
    'electronics for students',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}