"use client";

import { Aeroplane } from "./components/Aeroplane";
import Overlay from "./components/Overlay";

export default function Home() {
  return (
    <main>
      <div className="relative flex justify-end bg-yellow-500/10">
        <Aeroplane />
        <Overlay />
      </div>
    </main>
  );
}
