import React from "react";
import { useState,useEffect } from "react";
import Node from "./Node";
import BFSAlgorithm from "./bfsAlgoritm";
import DFSAlgorithm from "./dfsAlgorithm";
import './pathFinder.css'


const cols=30,rows=18;




const PathFinder=()=>{
const [grid,setGrid]=useState([]);
const  [path,setPath]=useState([]);
const [visitedNode,setVisitedNode]=useState([]);
const [dfsVisited,setdfsVisited]=useState([]);
const [dfsPath,setdfsPath]=useState([]);
const [possible ,setPossible] =useState(true)
useEffect(()=>{
initializeGrid();
},[]);


// INITIALIZE THE GRID 
const  initializeGrid= ()=>{
    const grid = new Array(rows);
    for(let i=0;i<rows;i++) {grid[i]=new Array(cols);}
    CreateSpot(grid);
    addNeighbours(grid);
    setGrid(grid); 
    const bfsdata = BFSAlgorithm(grid,rows,cols);
    const dfsdata = DFSAlgorithm(grid,rows,cols);
    console.log(dfsdata);

    setdfsPath(dfsdata.path);
    setdfsVisited(dfsdata.visited);
    setPath(bfsdata.path);
    setPossible(bfsdata.status)
    setVisitedNode(bfsdata.visited);
}

// INITIALIZE  EACH INDEX TO A SPOT 
const CreateSpot=(grid)=>{
    for(let i=0;i<rows;i++){
        for(let j=0;j<cols;j++){
            grid[i][j]= new Spot(i,j);
        }
    }
}
// adding neighbour to all spot
const addNeighbours=(grid)=>{
    for(let i=0;i<rows;i++){
        for(let j=0;j<cols;j++){
            grid[i][j].addneighbour(grid);
        }
    }
 }
//  LIKE AN OBLECT OF TYPE Spot WHOSE  CONSTRUCTOR IS THIS
function Spot(i,j){
    this.x=i;
    this.y=j;
    this.g=0;
    this.f=0;
    this.h=0;
    let w = Math.random();
    this.wall= w<0.22? true:false;
    if(i===0&&j===0)this.wall=false;
    if(i===rows-1 &&j ===cols-1) this.wall=false;
    this.neighbours=[];
    this.addneighbour=function(grid){
    if(i<rows-1){ 
          if(!grid[i+1][j].wall) {this.neighbours.push(grid[i+1][j])}
     }
    if(i>0){
          if(!grid[i-1][j].wall){this.neighbours.push(grid[i-1][j])}
     }
    if(j<cols-1){
          if(!grid[i][j+1].wall)this.neighbours.push(grid[i][j+1]);
    }  
    if(j>0){
          if(!grid[i][j-1].wall)this.neighbours.push(grid[i][j-1]);
    } 
    };
}






// Grid with NODE
const gridWithNode = <div className="grid-box">
    {
        grid.map((row,rowIndex)=>{
            return <div className="grid-row" key={rowIndex}> 
                {row.map((col,colIndex)=>{
                    return <Node key={colIndex} wall={col.wall} background={col.bg} row={col.x} col={col.y} />
                })}
            </div>
        })
    }
</div>


const visualizeVisited=(visited,time)=>{
    visited.forEach((element,i) => {
        setTimeout(()=>{
         document.getElementById(`node-${element.x}-${element.y}`).className="node visitedPath";   
        },i*time);
        
    });
}
const visualizePath=(path)=>{

    for(let i=0;i<path.length;i++){  
        setTimeout(()=>{
        let node= path[path.length-1-i];
         document.getElementById(`node-${node.x}-${node.y}`).className="node shortestPath";   
        },i*50);
    }
   
};


return <>
   <div className="btn-group actionBtn" role="group" aria-label="Basic mixed styles example">
    <button type="button" className="btn btn-danger"disabled={false} id="visualizebutton" onClick={ ()  =>{
        visualizeVisited(visitedNode,10);
        setTimeout(()=>{
        if(possible){visualizePath(path)}
        else alert('No path Possible')
          }
        ,5000)
    document.getElementById('visualizebutton').disabled=true;   
    document.getElementById('dfsbutton').disabled=true;   
    } }>BFS Path </button>
    
    <button type="button"  onClick={()=>{
         window.location.reload();
       }} className="btn btn-warning">Change Graph</button>

    <button type="button" className="btn btn-success" id="dfsbutton"
    onClick={ ()  =>{
        visualizeVisited(dfsVisited,20);
    document.getElementById('visualizebutton').disabled=true;   
    document.getElementById('dfsbutton').disabled=true;    
    } }
    
    
    >DFS Search</button>
</div>
       
   {gridWithNode}
  
</>
}
export default PathFinder;