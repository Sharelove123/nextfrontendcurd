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
      <body className="min-h-screen bg-[var(--background)] text-[var(--foreground)] antialiased font-sans">
        <div className="flex">
          <Sidebar />
          <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 pt-20 lg:pt-8 min-h-screen">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
