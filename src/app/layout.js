import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./providers";

export const metadata = {
  title: "quiz game",
  description: "Generated by create next app",
};
const vazirFont = localFont({
  src: [
    {
      path: "../../public/fonts/vazir.woff2",
      weight: "400",
      style: "normal",
    },
  ],
});

export default function RootLayout({ children }) {
  return (
    <html lang="fa">
      <body className={vazirFont.className} dir="rtl">
        <Providers>
          <div className="flex items-center justify-center bg-indigo-400 h-screen">
            <div className="w-96">
              <div className="w-full">{children}</div>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
