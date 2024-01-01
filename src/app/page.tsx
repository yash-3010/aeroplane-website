"use client";

import { Aeroplane } from "./components/Aeroplane";
import Overlay from "./components/Overlay";
import ProductGrid from "./components/ProductGrid";

export default function Home() {
  return (
    <main className="h-screen snap-y snap-mandatory overflow-y-scroll overflow-x-hidden">
      <div className="relative h-screen flex justify-end bg-yellow-500/10 snap-start">
        <Aeroplane />
        <Overlay />
      </div>
      <div className="snap-start h-screen">
        <ProductGrid />
      </div>
    </main>
  );
}
