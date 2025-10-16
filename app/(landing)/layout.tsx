// app/(landing)/layout.tsx
import Footer from "@/components/Footer";
import Header from "@/components/Header";
export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
