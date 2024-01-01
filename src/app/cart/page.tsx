import type { Metadata } from 'next'
import ShoppingCart from '../components/Cart'
 
export const metadata: Metadata = {
  title: 'cart',
  description: '...',
}

const page = async () => {

  return (
    <ShoppingCart/>
  )
}

export default page