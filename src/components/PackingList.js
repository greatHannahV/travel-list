// import { useState } from 'react'
// import Item from './Item'

// export default function PackingList({ items, onDeleteItem, onToggleItems, onClearList }) {
//   const [sortBy, setSortBy] = useState('input')
//   let sortedItems
//   if (sortBy === 'input') sortedItems = items
//   if (sortBy === 'description')
//     sortedItems = items.slice().sort((a, b) => a.description.localeCompare(b.description))
//   if (sortBy === 'packed')
//     sortedItems = items.slice().sort((a, b) => Number(a.packed) - Number(b.packed))
//   return (
//     <div className="list">
//       <ul>
//         {sortedItems.map((item) => (
//           <Item
//             item={item}
//             onDeleteItem={onDeleteItem}
//             onToggleItems={onToggleItems}
//             key={item.id}
//           />
//         ))}
//       </ul>

//       <div className="actions">
//         <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
//           <option value="input">Sort by input oreder</option>
//           <option value="description">Sort by description</option>
//           <option value="packed">Sort by packed status</option>
//         </select>
//         {sortedItems.length > 0 ? <button onClick={onClearList}>Clear list</button> : null}
//       </div>
//     </div>
//   )
// }
/////////////
import React, { useState, useEffect } from 'react'
import Item from './Item'

export default function PackingList({ items, onDeleteItem, onToggleItems, onClearList }) {
  const [sortBy, setSortBy] = useState('input')
  const [sortedItems, setSortedItems] = useState(items)

  // Update sortedItems whenever items prop changes
  useEffect(() => {
    if (sortBy === 'input') {
      setSortedItems(items)
    } else if (sortBy === 'description') {
      setSortedItems([...items].sort((a, b) => a.description.localeCompare(b.description)))
    } else if (sortBy === 'packed') {
      setSortedItems([...items].sort((a, b) => Number(a.packed) - Number(b.packed)))
    }
  }, [items, sortBy])

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
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        {sortedItems.length > 0 ? <button onClick={onClearList}>Clear list</button> : null}
      </div>
    </div>
  )
}
