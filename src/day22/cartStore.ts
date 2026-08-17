import { create } from 'zustand'

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
}

interface CartStore {
  items: CartItem[] //array of cart items, starts empty
  addItem: (item: CartItem) => void  //function that takes a CartItem, returns nothing
  decrementItem: (id: number) => void //function that takes an id, returns nothing
  removeItem: (id: number) => void   //function that takes an id, returns nothing
  total: () => number //function that takes nothing and returns a number (the total price)
}

const useCartStore = create<CartStore>((set, get) => ({  //set — updates the store state, get — reads the store state. Needed for total since it needs to read items
  items: [], //Initial state — empty cart when app first loads.

  addItem: (item: CartItem) => {
    set((state) => {
      const existing = state.items.find((i) => i.id === item.id)

      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i //...i copies ALL properties of the item (id, name, price, quantity). Then quantity: i.quantity + 1 OVERWRITES just the quantity.
          ),
        }
      }

      return { items: [...state.items, { ...item, quantity: 1 }] }
    })
  },

  decrementItem: (id: number) => {
  set((state) => ({
    items: state.items
      .map((i) => i.id === id ? { ...i, quantity: i.quantity - 1 } : i) //map() loops through every item and decrements the matching one.
      .filter((i) => i.quantity > 0) //.filter() removes any item that reached 0.
  }))
},

  removeItem: (id: number) => {
    set((state) => ({
      items: state.items.filter((i) => i.id !== id), //filter does the removal. It keeps only items that DON'T match the id.
    }))
  },

  total: () => {
    return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0) //reduce accumulates a running total — for each item it adds price × quantity to the sum. Starts at 0.
  },
}))

export default useCartStore