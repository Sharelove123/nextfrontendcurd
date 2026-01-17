import "./globals.css";
import Sidebar from "@/components/Sidebar";

export const metadata = {
  title: "Social Media Campaign Manager",
  description: "Manage your campaigns effectively",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen bg-background text-foreground antialiased font-sans">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </body>
    </html>
  );
}
