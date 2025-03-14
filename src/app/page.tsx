import Image from 'next/image';
import Link from 'next/link';
import { SearchIcon } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen p-24 -mt-24 relative flex items-center justify-center">
      <Image src="/hero.webp" alt="" fill priority className="object-cover" />

      <div className="backdrop-blur-sm w-full h-full absolute top-0 left-0 bg-black/50"></div>

      <div className="relative z-10 text-white flex flex-col gap-10">
        <h1 className="uppercase tracking-widest font-semibold text-5xl max-w-screen-md text-center">
          Find your new home with Prism Property
        </h1>

        <Link
          href="/property-search"
          className="inline-flex uppercase tracking-widest items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 mx-auto py-8 px-8 sm:px-10 text-lg sm:text-xl gap-5"
        >
          <SearchIcon /> Search Properties
        </Link>
      </div>
    </main>
  );
}
