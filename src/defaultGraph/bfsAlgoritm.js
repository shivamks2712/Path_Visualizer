

export default   function   BFSAlgorithm(array,rows,cols,start,endNode)  {
    let parent =new Array(rows);
    for(let i=0;i<rows;i++){
           parent[i]=new Array(cols);  
    }
    parent [start.x][start.y]={x:-1,y:-1};
    
    let end   = {x:endNode.x,y:endNode.y};
    let visited=[{x:start.x,y:start.y}];
    let queue =[]
    let curr;
    queue.push({x:start.x,y:start.y});


  //  CHECK CONTAINS OBJECT OR NOT
  function containsObject(obj, list) {
        var i;
        for (i = 0; i < list.length; i++) {
            if (list[i].x === obj.x && list[i].y === obj.y) {
                return true;
            }
        }
    
        return false;
    }


 //   main algorithm starts........
 while(queue.length!==0){
    curr=queue.shift();
    if(curr.x===end.x&&curr.y===end.y) break;
    let {x,y}=curr; 
    array[x][y].neighbours.forEach( (spot) => {
        let a=spot.x,b=spot.y;
        let pre={x:a,y:b};
        if( !containsObject(pre,visited)&&!array[a][b].isWall){
         visited.push(pre);
         queue.push(pre); 
         parent[a][b]=curr;
        }
    });
    
}
    let status = true;
    if(curr.x!==end.x||curr.y!==end.y) status=false;
  
     let path=[];
    
     let a =curr.x,b=curr.y;
     while(a!==-1&&b!==-1){
         path.push({x:a,y:b});
         curr=parent[a][b];
        
         a=curr.x;
         b=curr.y;

     }
     
    
      return {visited:visited,path:path,status:status}
   
  
}