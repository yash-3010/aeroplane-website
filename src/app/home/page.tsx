"use client";

import { FC } from 'react'
import { Aeroplane } from '../components/Aeroplane'
import Overlay from '../components/Overlay'

interface pageProps {
  
}

const page: FC<pageProps> = ({}) => {
  return <section>
    <div className="relative bg-yellow-500/10">
        <Aeroplane />
        <Overlay />
      </div>
  </section>
}

export default page