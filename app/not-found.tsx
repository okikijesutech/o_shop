import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center container mx-auto px-4 text-center">
      <h1 className="text-6xl font-extrabold mb-4 tracking-tight">404</h1>
      <h2 className="text-2xl font-semibold mb-6">Page Not Found</h2>
      <p className="text-muted-foreground max-w-md mb-8">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link href="/">
        <Button size="lg" className="rounded-full px-8">Return Home</Button>
      </Link>
    </div>
  );
}
