import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function EditPostLoading() {
  return (
    <div className="page-shell">
      <Header />
      <main className="flex-1 py-16">
        <div className="container-editorial space-y-4">
          <div className="h-8 w-48 animate-pulse rounded-lg bg-muted" />
          <div className="h-64 w-full animate-pulse rounded-lg bg-muted" />
        </div>
      </main>
      <Footer />
    </div>
  );
}
