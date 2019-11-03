import React, { useState, useEffect } from 'react';
import './App.css';

  var lift = 0
  var maxJump = 20
  var x=9
  var y=54
  var floor = 54
  var playerClass = "player stand-right"
  var moving = null
  var modifier = 0
  var fall = 0
  var maxFall = 5

function App() {


  useEffect(()=>{

    // console.log(lift)
    // console.log(action)
    // console.log(moving)

  if(lift>0&&lift<=maxJump) {
    y = y-5/lift
    modifier = x===20&&moving==='left'? modifier+1 : x===70&&moving==='right'? modifier-1 : modifier
    lift++
    lift=lift%15
  }
  if(lift===0||lift>maxJump) {
    if(y<54){
      modifier = x===20&&moving==='left'? modifier+1 : x===70&&moving==='right'? modifier-1 : modifier
      y+=(.04*fall)<maxFall?.04*fall: maxFall

      if(y>54){y=54}
      fall++
    }
  }
    console.log(y)
  if(moving==="right") {
    if(x<70){x++}
  } 
  if(moving==="left") {
    if(x>20){x--}
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

const handleResize = () => {
    if( window.innerHeight>window.innerWidth&&!overlay) {
      setOverlay(
        <section className="overlay">
        <h2>Please rotate your screen</h2>
        </section>
        )
    } 
    if( window.innerHeight<window.innerWidth&&overlay) {
      setOverlay(null)
    }

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
    if(lift===maxJump){ lift = 0} else {lift++}
    if(!moving) {
      moving="jump"
    }  
    if(!action){setAction(true)}
  }


  const scroll = () => {
    setProgress(moving==="left"? progress+1 : moving==="right"?progress-1: progress)
  }

  window.addEventListener('resize', handleResize);

  return (
    <div className="App" onLoad={handleResize()} >
    <button className="button-left" onMouseDown={left} onMouseUp={stop} onTouchStart={left} onTouchEnd={stop}>
    </button>
    <div className="field" onTouchStart={jump} onMouseDown={jump} style={{backgroundPosition: progress+modifier+"vw"}}>
      <figure className={playerClass} style={{left: pos[0]+'vw', top: pos[1]+"vh"}}> 
      </figure>
    </div>
    <button className="button-right" onMouseDown={right} onMouseUp={stop} onTouchStart={right} onTouchEnd={stop}>
    </button>
    {overlay}
    </div>
  );
}

export default App;
