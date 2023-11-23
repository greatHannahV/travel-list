export default function Stats({ items }) {
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
