import "./globals.css";
import { Providers } from "@/shared/components/providers";

type props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: props) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
