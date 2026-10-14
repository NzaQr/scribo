import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function ProfileLoading() {
  return (
    <div className="page-shell">
      <Header />
      <main className="flex-1 py-12">
        <div className="container-editorial space-y-4">
          <div className="h-10 w-56 animate-pulse rounded-lg bg-muted" />
          <div className="h-4 w-40 animate-pulse rounded-lg bg-muted" />
          <div className="mt-10 h-48 w-full animate-pulse rounded-lg bg-muted" />
        </div>
      </main>
      <Footer />
    </div>
  );
}
