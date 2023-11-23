import { useState } from 'react'

// const initialItems = [
//   { id: 1, description: 'Passports', quantity: 2, packed: false },
//   { id: 2, description: 'Socks', quantity: 12, packed: false },
//   { id: 3, description: 'Charger', quantity: 2, packed: true },
// ]
export default function App() {
  const [items, setItems] = useState([])

  function handleAddItems(item) {
    setItems((items) => [...items, item])
  }
  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id))
  }
  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) => (item.id === id ? { ...item, packed: !item.packed } : item)),
    )
  }
  function clearList() {
    const confirmed = window.confirm('Are you sure you want to delete all items ? 😥')
    if (confirmed) setItems([])
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onClearList={clearList}
        onToggleItems={handleToggleItem}
      />
      <Stats items={items} onClearList={clearList} />
    </div>
  )
}
function Logo() {
  return <h1>Packing List</h1>
}
function Form({ onAddItems }) {
  const [description, setDescription] = useState('')
  const [quantity, setQuantity] = useState(1)

  function handleSubmit(e) {
    e.preventDefault()
    if (!description) return
    const newItem = { description, quantity, packed: false, id: Date.now() }
    onAddItems(newItem)

    setQuantity(1)
    setDescription('')
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip? 🤔</h3>
      <select value={quantity} onChange={(e) => setQuantity(+e.target.value)}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  )
}

function PackingList({ items, onDeleteItem, onToggleItems, onClearList }) {
  const [sortBy, setSortBy] = useState('input')
  let sortedItems
  if (sortBy === 'input') sortedItems = items
  if (sortBy === 'description')
    sortedItems = items.slice().sort((a, b) => a.description.localeCompare(b.description))
  if (sortBy === 'packed')
    sortedItems = items.slice().sort((a, b) => Number(a.packed) - Number(b.packed))
  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            onDeleteItem={onDeleteItem}
            onToggleItems={onToggleItems}
            key={item.id}
          />
        ))}
      </ul>

      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input oreder</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        {sortedItems.length > 0 ? <button onClick={onClearList}>Clear list</button> : null}
      </div>
    </div>
  )
}

function Item({ item, onDeleteItem, onToggleItems }) {
  return (
    <li>
      <input type="checkbox" value={item.packed} onChange={() => onToggleItems(item.id)} />
      <span style={item.packed ? { textDecoration: 'line-through' } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  )
}
function Stats({ items }) {
  if (!items.length)
    return (
      <footer className="stats">
        <p>Start adding items to your packing list 😊</p>
      </footer>
    )

  const numItems = items.length
  const numPacked = items.filter((item) => item.packed).length
  const percentage = numItems === 0 ? 0 : Math.round((numPacked / numItems) * 100)
  return (
    <footer className="stats">
      <p>
        {percentage === 100
          ? 'You have got everything. Ready to go!🏃‍♀️'
          : `💼 You have ${numItems} items on your list, and you've already packed ${numPacked} (
        ${percentage} %)`}
      </p>
    </footer>
  )
}
