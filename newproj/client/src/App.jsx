import React from 'react'
import BottomNav from './utils/BottomNav'
import Dashboard from './Dashboard'

function App() {
  return (
    <div style={{width: "100vw", height: "100vh"}}>
      <div style={{width: "100%", height: "50%"}}><Dashboard /></div>
      <div style={{width: "100%", height: "30%", display: "flex", flexDirection: "row"}}>
        <div style={{width: "50%"}}>hello</div>
        <div style={{width: "50%"}}>world</div>
      </div>
      <div style={{width: "100%", height: "20%"}}><BottomNav /></div>
    </div>
  )
}

export default App