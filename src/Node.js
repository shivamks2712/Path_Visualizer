import React from "react";
import './node.css';



export default  Node=({wall,row,col})=>{
     let className= 'node path'
     if (wall===true) className='node wall';
     if(row===0&&col===0) className='node start';
     if(row===17&&col===29)className='node end'
    

    return <div id= {`node-${row}-${col}`} className={className}></div>

}