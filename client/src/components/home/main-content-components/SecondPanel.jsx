import React from 'react'

function SecondPanel({selectedItem}) {
  return (
    <div>
      <h2>Selected Item Details</h2>
      <p>Name: {selectedItem.name}</p>
      <p>Code: {selectedItem.code}</p>
    </div>
  )
}

export default SecondPanel