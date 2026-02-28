export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-background py-8 mt-12">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col items-center md:items-start">
          <span className="text-xl font-bold tracking-tighter">O-SHOP</span>
          <p className="text-sm text-muted-foreground mt-1">Premium portfolio e-commerce experience.</p>
        </div>
        
        <div className="flex items-center space-x-6 text-sm text-muted-foreground">
          <a href="#" className="hover:text-foreground transition-colors">Terms</a>
          <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
          <a href="#" className="hover:text-foreground transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
}
