import React from "react";
import Header from "@/components/marketing/Header";
import Footer from "@/components/marketing/Footer";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-[#0D1117] text-white selection:bg-[#D4AF37] selection:text-[#0B2B1F]">
      <Header />
      <main className="flex-1 w-full max-w-none p-0 m-0">{children}</main>
      <Footer />
    </div>
  );
}
