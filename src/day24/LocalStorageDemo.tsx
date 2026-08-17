import useLocalStorage from './useLocalStorage'

function LocalStorageDemo() {
  const [name, setName] = useLocalStorage<string>('name', '')
  const [count, setCount] = useLocalStorage<number>('count', 0)

  return (
    <div>
      <h1>LocalStorage Demo</h1>

      <div>
        <h2>Saved Name</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Type your name..."
        />
        <p>Hello, {name || 'stranger'}!</p>
      </div>

      <div>
        <h2>Saved Count</h2>
        <button onClick={() => setCount(count - 1)}>-</button>
        <span> {count} </span>
        <button onClick={() => setCount(count + 1)}>+</button>
      </div>

      <p>Refresh the page — your data will still be here!</p>
    </div>
  )
}

export default LocalStorageDemo