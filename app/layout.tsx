import Navbar from "../components/Navbar";
import "../styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
