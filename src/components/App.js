// import { useState, useEffect } from 'react'
// import Logo from './Logo'
// import Form from './Form'
// import PackingList from './PackingList'
// import Stats from './Stats'

// export default function App() {
//   const [items, setItems] = useState([])
//   ////////
//   // Load data from localStorage on component mount
//   useEffect(() => {
//     const storedDataString = localStorage.getItem('items')
//     if (storedDataString) {
//       const storedData = JSON.parse(storedDataString)
//       setItems(storedData)
//     }
//   }, []) // Empty dependency array ensures this effect runs only once on mount

//   /////////
//   function handleAddItems(item) {
//     setItems((items) => [...items, item])
//   }
//   function handleDeleteItem(id) {
//     setItems((items) => items.filter((item) => item.id !== id))
//   }
//   function handleToggleItem(id) {
//     setItems((items) =>
//       items.map((item) => (item.id === id ? { ...item, packed: !item.packed } : item)),
//     )
//   }
//   function clearList() {
//     const confirmed = window.confirm('Are you sure you want to delete all items ? 😥')
//     if (confirmed) setItems([])
//     // Clear localStorage on list clear
//     localStorage.removeItem('items')
//   }
//   ///////////////
//   // Save data to localStorage whenever items change
//   useEffect(() => {
//     const jsonString = JSON.stringify(items)
//     localStorage.setItem('items', jsonString)
//   }, [items])
//   /////////////////
//   return (
//     <div className="app">
//       <Logo />
//       <Form onAddItems={handleAddItems} />
//       <PackingList
//         items={items}
//         onDeleteItem={handleDeleteItem}
//         onClearList={clearList}
//         onToggleItems={handleToggleItem}
//       />
//       <Stats items={items} onClearList={clearList} />
//     </div>
//   )
// }
////////////
import React, { useState, useEffect } from 'react'
import Logo from './Logo'
import Form from './Form'
import PackingList from './PackingList'
import Stats from './Stats'

export default function App() {
  // Load data from localStorage on component mount
  const storedDataString = localStorage.getItem('items')
  const initialItems = storedDataString ? JSON.parse(storedDataString) : []
  const [items, setItems] = useState(initialItems)

  function handleAddItems(item) {
    setItems((prevItems) => [...prevItems, item])
  }

  function handleDeleteItem(id) {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  function handleToggleItem(id) {
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, packed: !item.packed } : item)),
    )
  }

  function clearList() {
    const confirmed = window.confirm('Are you sure you want to delete all items? 😥')
    if (confirmed) {
      setItems([])
      // Clear localStorage on list clear
      localStorage.removeItem('items')
    }
  }

  // Save data to localStorage whenever items change
  useEffect(() => {
    const jsonString = JSON.stringify(items)
    localStorage.setItem('items', jsonString)
  }, [items])

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
