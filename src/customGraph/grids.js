import React from "react";
import CNode from "./Node";
import { useState,useEffect } from "react";
import './Node.css'
import BFSAlgorithm from "../defaultGraph/bfsAlgoritm";
import DFSAlgorithm from "../defaultGraph/dfsAlgorithm";
import Dijtras from "../defaultGraph/weightedGraph";
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import { IconButton } from "@material-ui/core";


let  rows =24,cols=44;


 const CustomGraph=()=>{
    const [grid,setGrid]= useState([]);
    const [mouseClick,setMouseClick]=useState(false);
    const [running,setRunning]=useState(false)
    const [start,setStart]=useState({x:10,y:cols-35});
    const [end,setEnd]=useState({x:10,y:cols-6})
    const [present,setPresent]=useState('start')
    let [weighted,setWeighted] =useState(false);

 useEffect(()=>{
     initializeGrid();
 },[])





//                                NODE AND GRID STUFF.......
  const  initializeGrid= ()=>{
        const grid = new Array(rows);
        for(let i=0;i<rows;i++) {grid[i]=new Array(cols);}   
        CreateSpot(grid);
        addNeighbours(grid);
        setGrid(grid);      
   } 
 

 const CreateSpot=(grid)=>{
    for(let i=0;i<rows;i++){
        for(let j=0;j<cols;j++){
            grid[i][j]= new Spot(i,j);
        }
    }
}

class Spot {
    constructor(i,j){
     this.x=i;
     this.y=j;
     this.w=1;
     this.d=Number.MAX_SAFE_INTEGER;
     this.isStart = (i==start.x&&j==start.y);
     this.isEnd=(i==end.x&&j==end.y)
     this.isWall=false;
     this.neighbours=[];
     this.addneighbour=function(grid){
        if(i<rows-1){ 
              this.neighbours.push({x:i+1,y:j})
         }
        if(i>0){
              this.neighbours.push( {x:i-1,y:j})
         }
        if(j<cols-1){
              this.neighbours.push({x:i,y:j+1});
        }  
        if(j>0){
              this.neighbours.push({x:i,y:j-1});
        } 
        };
    }
}
//                                                     Adding neighbours
const addNeighbours=(grid)=>{
    for(let i=0;i<rows;i++){
        for(let j=0;j<cols;j++){
            grid[i][j].addneighbour(grid);
        }
    }
 }
//                                                       Adding weight 

function addWeight(){
    let unWeighted = grid.slice();
    for(let i=0;i<rows;i++){
        for(let j=0;j<cols;j++){
            unWeighted[i][j].w = Math.round((Math.random()*14))+1;
        }
    }
    setGrid(unWeighted);
    setWeighted(true);
    document.getElementById('dfsbutton').disabled=true; 
    document.getElementById('visualizebutton').disabled=true;
}
function unWeight(){
    let unWeighted = grid.slice();
    for(let i=0;i<rows;i++){
        for(let j=0;j<cols;j++){
            unWeighted[i][j].w =1;
        }
    }
    setWeighted(false);
    setGrid(unWeighted);
    document.getElementById('dfsbutton').disabled=false; 
    document.getElementById('visualizebutton').disabled=false;
}





 let setGridNode = <div className="grid-box">
    {
        grid.map((row,rowIndex)=>{
            return <div className="grid-row" key={rowIndex}> 
                {row.map((col,colIndex)=>{
                    return <CNode key={colIndex} weighted={weighted} weight={col.w} row={col.x} col={col.y} isStart={col.isStart} isEnd={col.isEnd} 
                     onMouseDown={mouseDown} onMouseEnter={mouseEnter} onMouseUp={mouseUp} isWall={col.isWall}  />
                })}
            </div>
        })
    }
</div>


//                                                       CREATING   WALLS......
function mouseDown(row,col){
     if(!running){
        if((grid[row][col].x==start.x&&grid[row][col].y==start.y)||(grid[row][col].x==end.x&&grid[row][col].y==end.y)){
            if(grid[row][col].x==start.x&&grid[row][col].y==start.y){
                setPresent('start');
            }
           else setPresent('end') 
        }
        else{
  setMouseClick(true);
  const newGrid = getNewGridWithWalls(grid,row,col);
  addNeighbours(newGrid);
  setGrid(newGrid);
        }
  }
}

function mouseEnter(row,col){
    if(!mouseClick) { return};
    const newGrid = getNewGridWithWalls(grid,row,col);
    setGrid(newGrid);
}
function mouseUp(row,col){
//                      Set Start and end functions
    if(!mouseClick){
    if(present=='start'){
        let preStart= start;
        if(!grid[row][col].isWall&&!(grid[row][col].x==end.x&&grid[row][col].y==end.y)){
        setStart({x:row,y:col});
            document.getElementById(`node-${preStart.x}-${preStart.y}`).className="node path";
            document.getElementById(`node-${row}-${col}`).className="node nodeStart";

        }
    }
    if(present=='end'){
        let preEnd= end;
        
        if(!grid[row][col].isWall&&!(grid[row][col].x==start.x&&grid[row][col].y==start.y)){
          setEnd({x:row,y:col});
          document.getElementById(`node-${preEnd.x}-${preEnd.y}`).className="node path";
          document.getElementById(`node-${row}-${col}`).className="node nodeEnd";

    }}
     
     }
//                                       Walls       Functions
    else{
    setMouseClick(false);
    }

}


function getNewGridWithWalls(grid,row,col){
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    let newNode=node;
    if(!(node.x==start.x&&node.y==start.y)&&!(node.x==end.x&&node.y==end.y)){
     newNode ={...node, isWall:!node.isWall};
     }
    newGrid [row][col]=newNode;
    return newGrid;

}


//                           REMOVING WALLS
function eraseWall(){
    const newGrid = grid.slice();
    for(let i=0;i<newGrid.length;i++){
        for(let j=0;j<newGrid[i].length;j++){
           newGrid[i][j].isWall=false;
        }
    }  
    setGrid(newGrid);  
}

//                           RANDOM WALLS
function createRandomWall(){
    eraseWall();
    const newGrid = grid.slice();
    for(let i=0;i<newGrid.length;i++){
        for(let j=0;j<newGrid[i].length;j++){
            let k = Math.random();
            if(!(newGrid[i][j].x==start.x&&newGrid[i][j].y==start.y)&&!(newGrid[i][j].x==end.x&&newGrid[i][j].y==end.y))
            if(k<0.25) newGrid[i][j].isWall=true;
        }
    }  
    setGrid(newGrid);  
}




//                                  RUN ALGORITHMS 

const BFSearch=(grid,)=>{
     setRunning(true)
     let bfsdata = BFSAlgorithm(grid,rows,cols,{x:start.x,y:start.y},{x:end.x,y:end.y});

     const myPromise = new Promise((resolve, reject) => {
         visualizeVisited(bfsdata.visited,8,resolve);
         
      });
      myPromise.then( ()=>{
          setTimeout(()=>{
            if(bfsdata.status){visualizePath(bfsdata.path)}
        else alert('No path Possible')
          },800)
        
        setTimeout(()=> {document.getElementById('clearTraversal').disabled=false;
          setRunning(false)    
         }
        ,2000)
          } )         
    
}


//                                   DFS 
const DFSearch=(grid)=>{
    setRunning(true);
    const dfsdata = DFSAlgorithm(grid,rows,cols,{x:start.x,y:start.y},{x:end.x,y:end.y});
    new Promise((resolve,reject)=>{
        visualizeVisited(dfsdata.visited,8,resolve);
    }).then(()=>{
        setTimeout(()=> {document.getElementById('clearTraversal').disabled=false;
        setRunning(false)
        if(!dfsdata.status){alert('No path Possible');}
         }
        ,1000)
    })
      
         

}

//                                         Dijtras
const DijtrasAlg=(grid)=>{
    setRunning(true);
    
    const djtdata = Dijtras(grid,rows,cols,{x:start.x,y:start.y},{x:end.x,y:end.y});
    new Promise((resolve,reject)=>{
        visualizeVisited(djtdata.visited,8,resolve);
    }).then(()=>{
        setTimeout(()=> {document.getElementById('clearTraversal').disabled=false;
        if(djtdata.status){visualizePath(djtdata.path)}
        else alert('No path Possible')
        setRunning(false);
       
         }
        ,1000)
        for(let i=0;i<rows;i++){
            for(let j=0;j<cols;j++){
                grid[i][j].d=Number.MAX_SAFE_INTEGER;
            }
        }
    })
      
         

}


const visualizeVisited=(visited,time,resolve)=>{
    
    visited.forEach((element,i) => {
        setTimeout(()=>{
            if(!(element.x==start.x&&element.y==start.y)&&!(element.x==end.x&&element.y==end.y)) { 
         document.getElementById(`node-${element.x}-${element.y}`).className="node visitedPath";} 
         if(i==visited.length-1) {resolve('foo');}
        },i*time);
        
    });
 
}
const visualizePath=(path)=>{
    for(let i=0;i<path.length;i++){  
        setTimeout(()=>{
        let node= path[path.length-1-i];
        if(!(node.x==start.x&&node.y==start.y)&&!(node.x==end.x&&node.y==end.y)) { 
        document.getElementById(`node-${node.x}-${node.y}`).className="node shortestPath"; };  
        },i*35);
    }
   
};

function clearTraversal (){
    for(let i=0;i<rows;i++){
        for(let j=0;j<cols;j++){
            let x1=start.x,y1=start.y,x2=end.x,y2=end.y;
            if(!grid[i][j].isWall&&!(grid[i][j].x==x1&&grid[i][j].y==y1)&&!(grid[i][j].x==x2&&grid[i][j].y==y2)){
          document.getElementById(`node-${i}-${j}`).className="node path";
         };
            
        }
    }
    if(!weighted){
        document.getElementById('dfsbutton').disabled=false; 
        document.getElementById('visualizebutton').disabled=false;
    }
   
    document.getElementById('randomWall').disabled=false;
    document.getElementById('eraseWall').disabled=false;
    document.getElementById('djtbutton').disabled=false;
    document.getElementById('removeWeight').disabled=false; 
    document.getElementById('addWeight').disabled=false;

}



return <>
                                            {/* NAVBARS */}
 <div className="btn-group actionBtn btnbar " role="group" aria-label="Basic mixed styles example"  >

                                     
 
<a href="https://github.com/shivamks2712" target="_blank" className="me-4 text-reset modeLink">
 <IconButton style={{ color: 'white'}}><GitHubIcon/></IconButton>  
 </a>
 <a href="http://ca.linkedin.com/in/linkedinshivam-singh-9a2a17208" target="_blank" 
 className="me-4 text-reset modeLink"> <IconButton style={{ color: 'white'}}><LinkedInIcon/></IconButton>
 </a>
 <button type="button"  onClick={()=>{window.location.reload(); }} className="btn btn-success modebtn">
      Reset</button>
 <button type="button" onClick={()=>{addWeight() }} className="btn btn-success modebtn" id="removeWeight">
      Add Weight</button>
 <button type="button"  onClick={()=>{unWeight() }} className="btn btn-success modebtn" id="addWeight">
      Remove Weight</button>

<button type="button" className="btn btn-success modebtn" id="clearTraversal"
     onClick={()=>{
        clearTraversal();
          }}
      > Clear  Traversal</button>
 <button type="button" className="btn btn-success modebtn" id="randomWall"
     onClick={()=>{
        createRandomWall();        
            }}
    >Generate Walls</button>
<button type="button" className="btn btn-success modebtn" id="eraseWall"
     onClick={()=>{
        eraseWall();         
       }}
        >Erase Walls</button>
</div>

                              {/* ALGORITHM BUTTONS */}

<div className="mainbox">
 {setGridNode}
 <div className="algorithmbar"   >
     
     <h3>ALGORITHMS</h3>
     
     {/*  */}
     <button type="button" className="btn btn-danger algbtn"disabled={false} id="djtbutton"
    onClick={()=>{
        DijtrasAlg(grid);    
        document.getElementById('dfsbutton').disabled=true; 
        document.getElementById('visualizebutton').disabled=true;
        document.getElementById('randomWall').disabled=true;
        document.getElementById('clearTraversal').disabled=true;
        document.getElementById('eraseWall').disabled=true; 
        document.getElementById('djtbutton').disabled=true;
        document.getElementById('removeWeight').disabled=true; 
        document.getElementById('addWeight').disabled=true;
     }}  >Dijkstra's Search </button>
    {/*  */}

    <button type="button" className="btn btn-danger algbtn"disabled={false} id="visualizebutton"
    onClick={()=>{
        BFSearch(grid);
        document.getElementById('dfsbutton').disabled=true; 
        document.getElementById('visualizebutton').disabled=true;
        document.getElementById('randomWall').disabled=true;
        document.getElementById('clearTraversal').disabled=true;
        document.getElementById('eraseWall').disabled=true;  
        document.getElementById('removeWeight').disabled=true; 
        document.getElementById('addWeight').disabled=true;    

     }}  >BFS Search </button>
    
   
    <button type="button" className="btn btn-danger algbtn" id="dfsbutton"
     onClick={()=>{
        DFSearch(grid);
        document.getElementById('dfsbutton').disabled=true; 
        document.getElementById('visualizebutton').disabled=true;   
        document.getElementById('randomWall').disabled=true;
        document.getElementById('clearTraversal').disabled=true;
        document.getElementById('eraseWall').disabled=true;
        document.getElementById('removeWeight').disabled=true; 
        document.getElementById('addWeight').disabled=true;

    }}
    >DFS Search</button>
</div>
</div>
 </>
}

export default CustomGraph;