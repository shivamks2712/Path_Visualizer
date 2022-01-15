


export default   function   DFSAlgorithm(array,rows,cols,start,endNode)  {
 
    let parent =new Array(rows);
    for(let i=0;i<rows;i++){
           parent[i]=new Array(cols);  
    }
    parent [start.x][start.y]={x:-1,y:-1};
    let end   = {x:endNode.x,y:endNode.y};
    let visited=[{x:start.x,y:start.y}];
    let stack =[];
    stack.push({x:start.x,y:start.y});
    let curr;
    let status = false;
    
 //   main algorithm starts........

const dfs=(stack,visited)=>{
    curr=stack.pop();
   if(curr.x==end.x&&curr.y==end.y){
       status=true;
         return;
    }
    array[curr.x][curr.y].neighbours.forEach(element => {
        if(status) return;
        if(!containsObject({x:element.x,y:element.y},visited)&&!array[element.x][element.y].isWall){
              stack.push({x:element.x,y:element.y});
              visited.push({x:element.x,y:element.y});
              parent[element.x][element.y]=curr;
              dfs(stack,visited);
        }
        
    });

}
dfs(stack,visited);



 //  CHECK CONTAINS OBJECT OR NOT
 function containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i].x == obj.x && list[i].y == obj.y) {
            return true;
        }
    }

    return false;
}

//      RETURNING    DATA

     let path=[];
     let a =curr.x,b=curr.y;
     while(a!=-1&&b!=-1){
         path.push({x:a,y:b});
         curr=parent[a][b];
         a=curr.x;
         b=curr.y;
     }
      return {visited:visited,path:path,status:status}

  
}