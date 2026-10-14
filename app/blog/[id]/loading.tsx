import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function PostLoading() {
  return (
    <div className="page-shell">
      <Header />
      <main className="flex-1 py-12">
        <div className="container-editorial mx-auto flex max-w-[760px] flex-col items-center gap-4">
          <div className="h-6 w-32 animate-pulse rounded-full bg-muted" />
          <div className="h-14 w-full animate-pulse rounded-lg bg-muted" />
          <div className="h-6 w-3/4 animate-pulse rounded-lg bg-muted" />
          <div className="mt-8 h-48 w-full animate-pulse rounded-lg bg-muted" />
        </div>
      </main>
      <Footer />
    </div>
  );
}
