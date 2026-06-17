import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0F172A] text-white">
      <Sidebar />

      <div className="min-h-screen lg:ml-[280px]">
        <Topbar />
        <main className="p-5 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}