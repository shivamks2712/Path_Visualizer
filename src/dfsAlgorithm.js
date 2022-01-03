class Stack {
    constructor() {
        this.items = [];
    }
    
    // add element to the stack
    add(element) {
        return this.items.push(element);
    }
    
    // remove element from the stack
    remove() {
        if(this.items.length > 0) {
            return this.items.pop();
        }
    }
    
    // view the last element
    peek() {
        return this.items[this.items.length - 1];
    }
    
    // check if the stack is empty
    isEmpty(){
       return this.items.length == 0;
    }
   
    // the size of the stack
    size(){
        return this.items.length;
    }
 
    // empty the stack
    clear(){
        this.items = [];
    }
}


export default   function   DFSAlgorithm(array,rows,cols)  {
    let found =0;
    let parent =new Array(rows);
    for(let i=0;i<rows;i++){
           parent[i]=new Array(cols);  
    }
    parent [0][0]={x:-1,y:-1};
    let end   = {x:rows-1,y:cols-1};
    let visited=[{x:0,y:0}];
    let stack =[];
    stack.push({x:0,y:0});
    let curr;

 //   main algorithm starts........

const dfs=(stack,visited)=>{
    curr=stack.pop();

    array[curr.x][curr.y].neighbours.forEach(element => {
        if(!containsObject({x:element.x,y:element.y},visited)){
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
    let status = true;
    if(curr.x!=end.x||curr.y!=end.y) status=false;

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