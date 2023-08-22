import { notFound } from "next/navigation"

export const dynamicParams = true // default val = true

export async function generateStaticParams() {
    const res = await fetch(`https://dummyjson.com/products`)

    const products = await res.json();

    return products.products.map((product) => ({
        id: product.id.toString()
      }))
    
}

async function getTicket(id) {
    const res = await fetch(`https://dummyjson.com/products/${id}`, {
      next: {
        revalidate: 60
      }
    })

    if (!res.ok) {
        notFound()
      }
  
    return res.json()
}

export default async function TicketDetails({ params }) {
    // const id = params.id
    const product = await getTicket(params.id)
  
    return (
      <main>
        <nav>
          <h2>Ticket Details</h2>
        </nav>
        <div className="card">
          <h3>{product.title}</h3>
          <small>Price: $ {product.price}</small>
          <p>{product.description}</p>
          <div className={`pill ${product.brand}`}>
            {product.brand}
          </div>
        </div>
      </main>
    )
}
