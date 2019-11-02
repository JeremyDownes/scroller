import React, { useState, useEffect } from 'react';
import './App.css';

  var hangtime = 0
  var x=9
  var y=54
  var playerClass = "player stand-right"
  var moving = null
  var modifier = 0

function App() {

  useEffect(()=>{

    // console.log(hangtime)
    // console.log(action)
    // console.log(moving)
    //console.log(x)

  if(hangtime>0) {
    hangtime--
    y = hangtime>10? y-1 : y+1
    modifier = x===20&&moving==='left'? modifier+1 : x===70&&moving==='right'? modifier-1 : modifier
  }
  if(moving==="right") {
    if(x<70){x++}
  } 
  if(moving==="left") {
    if(x>20){x--}
  } 
  if(moving==="jump") {
    if(hangtime===0) {
      setAction(false)
    }
  } 

})

  setTimeout(()=>{
    if(pos[0]!==x||pos[1]!==y) {
      setPos([x,y])
    } else {
      if((x===70 || x===20)&&moving) {scroll()}
    }
  },50)


  const [pos,setPos] = useState([9,65])
  const [elevation, setElevation] = useState(65)
  const [progress, setProgress] = useState(0)
  const [action, setAction] = useState(false)
  const [overlay, setOverlay] = useState(null)

    if(document.height>document.width) {
      setOverlay(
        <section className="overlay">
        <h2>Please rotate your screen</h2>
        </section>
        )
    }
  const left = () => {
    moving="left" 
    playerClass="player run-left"
    if(!action){setAction(true)}
  }

  const right = () => {
    moving="right" 
    playerClass="player run-right"
    if(!action){setAction(true)}
  }

  const stop = () => {
    playerClass = moving==='left'? 'player stand-left' : 'player stand-right'
    moving=null
    setAction(false)
  }

  const jump = () => {
    if(hangtime===0){ hangtime = 22}
    if(!moving) {
      moving="jump"
    }  
    if(!action){setAction(true)}
  }

  const scroll = () => {
    setProgress(moving==="left"? progress+1 : moving==="right"?progress-1: progress)
  }

  return (
    <div className="App">
    {overlay}
    <button className="button-left" onMouseDown={left} onMouseUp={stop} onTouchStart={left} onTouchEnd={stop}>
    </button>
    <div className="field" onTouchStart={jump} onMouseDown={jump} style={{backgroundPosition: progress+modifier+"vw"}}>
      <figure className={playerClass} style={{left: pos[0]+'vw', top: pos[1]+"vh"}}> 
      </figure>
    </div>
    <button className="button-right" onMouseDown={right} onMouseUp={stop} onTouchStart={right} onTouchEnd={stop}>
    </button>
    </div>
  );
}

export default App;
