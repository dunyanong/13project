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
          <h3>{product.title}</h3>
          <div className={`pill ${product.brand}`}>
            {product.category}
          </div>
        </div>
      ))}
    </>
  )
}