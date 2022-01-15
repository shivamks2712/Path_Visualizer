import React from "react";

let CNode;
export default  CNode =({isStart,weight,weighted,isEnd,row,col,onMouseDown,onMouseEnter,onMouseUp,isWall})=>{
    const extendedClass = isStart?'nodeStart':isEnd? 'nodeEnd': isWall?'wall':'path';
    let wt;
    if(weighted) wt= weight;
   
    return <div id={`node-${row}-${col}`} className={`node  ${extendedClass}` } 
     onMouseDown={()=>{onMouseDown(row,col)} }
     onMouseEnter={()=>{ onMouseEnter(row,col)} }       
     onMouseUp={()=>{onMouseUp(row,col) }}> {wt}
     </div> 
    }