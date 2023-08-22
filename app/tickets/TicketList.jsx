import Link from "next/link"

async function getTickets() {
  const res = await fetch('https://dummyjson.com/products', {
    next: {
      revalidate: 30
    }
  })

  return res.json()
}

export default async function TicketList() {
  const products = await getTickets()

  return (
    <>
      {products.products.map((product) => (
        <div key={product.id} className="card my-5">
          <Link href={`/tickets/${product.id}`}>
            <h3>{product.title}</h3>
            <div>{product.description}</div>
            <div className={`pill ${product.brand}`}>
              {product.category}
            </div>
          </Link>
        </div>
      ))}
    </>
  )
}