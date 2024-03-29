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
  var health = 20
  var pos = [0,54]
  var position = [0,54]
  var skeleton = 0
  var twentyone = 0
  var progress = 0

function App() {

  useEffect(()=>{
    if(health===0){window.location.reload()}

    // console.log(lift)
     //console.log(action)
    // console.log(moving)
      obstacles.forEach((obstacle)=>{
    if( obstacle.position[0] <= position[0] +2 && obstacle.position[0] >= position[0] -1 && obstacle.position[1] >= position[1] && obstacle.position[1] <= position[1] +6 ) {
      health-=1

    }
  })

  if(lift>0&&lift<=maxJump) {
    y = y-5/lift
    modifier = x===20&&moving==='left'? modifier+1 : x===70&&moving==='right'? modifier-1 : modifier
    lift++
    lift=lift%15
  }
  if(lift===0) {
    if(y<54){
      modifier = x===20&&moving==='left'? modifier+1 : x===70&&moving==='right'? modifier-1 : modifier
      y+=(.04*fall)<maxFall?.04*fall: maxFall

      if(y>=54){
        y=54
        if(moving==='jump'){stop()}
      }
      fall++
    }
  }
  if(moving==="right") {
    if(x<70){x++}
  } 
  if(moving==="left") {
    if(x>20){x--}
  } 
})


  setTimeout(()=>{
    if(twentyone<=80) {
      skeleton++
    } else {
      skeleton--
    }
    twentyone++
    twentyone%=162
    if(pos[0]!==x||pos[1]!==y) {
      pos=[x,y]
    } else {
      if((x===70 || x===20)&&moving) {scroll()}
    }
    setAction(!action)
  },50)

  const [action, setAction] = useState(false)
  const [overlay, setOverlay] = useState(null)
  var obstacles = [{component:<figure className={twentyone>=80?'skeleton':'skeleton alt'} style={{left: 100+(skeleton/4)+progress+modifier+"vw", top: "54vh"}}></figure>,position:[100+skeleton/4,54]},{component:<figure className={twentyone>=80?'skeleton':'skeleton alt'} style={{left: 175+(skeleton/4)+progress+modifier+"vw", top: "54vh"}}></figure>,position:[175+skeleton/4,54]},{component:<figure className={twentyone>=80?'skeleton':'skeleton alt'} style={{left: 250+(skeleton/4)+progress+modifier+"vw", top: "54vh"}}></figure>,position:[250+skeleton/4,54]},{component:<figure className={twentyone>=80?'skeleton':'skeleton alt'} style={{left: 475+(skeleton/4)+progress+modifier+"vw", top: "54vh"}}></figure>,position:[475+skeleton/4,54]},]
  position=[x-progress-modifier,y]

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
  }

  const right = () => {
    moving="right" 
    playerClass="player run-right"
  }

  const stop = () => {
    playerClass = moving==='left'? 'player stand-left' : 'player stand-right'
    moving=null
  }

  const jump = () => {
    if(lift===maxJump){ lift = 0} else {lift++}
    if(!moving) {
      moving="jump"
    }  
  }

  const scroll = () => {
    progress = moving==="left"? progress+1 : moving==="right"?progress-1: progress
  }

  window.addEventListener('resize', handleResize);

  return (
    <div className="App" onLoad={handleResize()} >
    <button className="button-left" onMouseDown={left} onMouseUp={stop} onTouchStart={left} onTouchEnd={stop}>
    </button>
    <div className="field" onTouchStart={jump} onMouseDown={jump} style={{backgroundPosition: progress+modifier+"vw"}}>
      <section className='health-bar' style={{width: health+'vw'}}></section>
      <figure className={playerClass} style={{left: pos[0]+'vw', top: pos[1]+"vh"}}> 
      </figure>
      {obstacles.map((obj)=>{return obj.component})}
    </div>
    <button className="button-right" onMouseDown={right} onMouseUp={stop} onTouchStart={right} onTouchEnd={stop}>
    </button>
    {overlay}
    </div>
  );
}

export default App;
