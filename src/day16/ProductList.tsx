import React, { useState } from 'react'
import './ProductList.css'

interface Product {  // defines the schema for the product object
  id: number
  name: string
  category: string
}

const products: Product[] = [                                //We create an array of products to showcase
  { id: 1, name: 'Laptop', category: 'Electronics' },
  { id: 2, name: 'Phone', category: 'Electronics' },
  { id: 3, name: 'Shirt', category: 'Clothing' },
  { id: 4, name: 'Pants', category: 'Clothing' },
  { id: 5, name: 'Headphones', category: 'Electronics' },
]

function ProductList(): React.ReactNode {               
  const [search, setSearch] = useState<string>('')

  const filtered = products.filter((product) =>
  product.name.toLowerCase().includes(search.toLowerCase()) ||
  product.category.toLowerCase().includes(search.toLowerCase())
)

  return (
    <div>
      <input
        type="text"
        placeholder="Search products..."
        onChange={(e) => setSearch(e.target.value)}
        className="search-product-input"
      />

      {filtered.length === 0 ? (
        <p>No products found.</p>
      ) : (
        filtered.map((product) => (
          <div key={product.id}>
            <h2>{product.name}</h2>
            <p>{product.category}</p>
          </div>
        ))
      )}
    </div>
  )
}

export default ProductList