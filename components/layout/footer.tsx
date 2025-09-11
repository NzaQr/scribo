"use client"

export function Footer() {
  return (
    <footer className="border-t bg-muted/50 animate-fade-in-delay-2">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Scribo</h3>
            <p className="text-sm text-muted-foreground">A minimalist blog to share ideas and experiences.</p>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="/" className="hover:text-primary transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/blog" className="hover:text-primary transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-primary transition-colors">
                  About
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Contact</h4>
            <p className="text-sm text-muted-foreground">hello@scribo.com</p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          © 2025 Scribo. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
