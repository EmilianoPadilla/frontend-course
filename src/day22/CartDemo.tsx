import useCartStore from './cartStore'

const sampleProducts = [ //Hardcoded products — in a real app these would come from my backend API via useQuery
  { id: 1, name: 'Laptop', price: 999 },
  { id: 2, name: 'Phone', price: 699 },
  { id: 3, name: 'Headphones', price: 199 },
]

function CartDemo() {
  const items = useCartStore((state) => state.items)
  const addItem = useCartStore((state) => state.addItem)
  const removeItem = useCartStore((state) => state.removeItem)
  const decrementItem = useCartStore((state) => state.decrementItem)
  const total = useCartStore((state) => state.total)

  return (
    <div>
      <h1>Shop</h1>

      <h2>Products</h2>
      {sampleProducts.map((product) => (
        <div key={product.id}>
          <p>{product.name} — ${product.price}</p>
          <button onClick={() => addItem({ ...product, quantity: 1 })}>
            Add to cart
          </button>
        </div>
      ))}
    
      <br />

      <h1>Cart</h1>
      {items.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        //This <> symbols are a React Fragment — a wrapper that groups multiple elements without adding an extra div to the DOM. It's used when you need to return multiple elements but don't want an extra div.
        <> 
          {items.map((item) => (
            <div key={item.id}>
              <p>{item.name} — ${item.price} x {item.quantity}</p>
              <button onClick={() => decrementItem(item.id)}>-</button>
              <button onClick={() => addItem({ ...item, quantity: 1 })}>+</button>
              <button onClick={() => removeItem(item.id)}>Remove</button>
            </div>
          ))}
          <h3>Total: ${total()}</h3>
        </>
      )}
    </div>
  )
}

export default CartDemo