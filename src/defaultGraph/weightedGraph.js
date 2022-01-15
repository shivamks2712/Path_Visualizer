function markInitialDistance(array,start, h,parent){
let {x,y}=start;
array[x][y].d=0;

let neighbour = array[x][y].neighbours;
   for(let i=0;i<neighbour.length;i++){  
        let a= neighbour[i].x;
        let b= neighbour[i].y;
        if(!array[a][b].isWall){
        array[a][b].d=array[a][b].w;
        h.insert({x:a,y:b,d:array[a][b].d});
        parent[a][b]=start;
    }
      }
}


//                                  HEAP
class Heap{

    constructor(){
    this.arr=[];
    this.arr.push({x:0,y:0,d:0});
    this.length=1;
           }
//                      Inserting into heap
    contains=function(a){
        let res=-1;
        for(let i=1;i<this.arr.length;i++){
           if(this.arr[i].x==a.x&&this.arr[i].y==a.y){
               res=i;
               break;
           }
        }
        return res;
    }
    insert=function(a){
    if(this.arr.length==1){
        this.arr.push(a);
        return;
      }
      else{
          this.arr.push(a);
          let i=this.arr.length-1;
          while(i>=1){
              if(this.arr[Math.floor(i/2)].d>a.d){
                  let temp =this.arr[Math.floor(i/2)];
                  this.arr[Math.floor(i/2)]=a;
                  this.arr[i]=temp;
                  i= Math.floor(i/2);
              }
              else break;
          }
        }
   }
//      Deleting   from a heap
      remove=function(){
        if(this.arr.length<=1) return null;
        if(this.arr.length==2){
            return this.arr.pop();
        }
        else{
            let top=this.arr[1];
            this.arr[1]=this.arr.pop();
            let i=1,min=2;
            while(2*i+1<=this.arr.length-1){

              min= this.arr[2*i].d<this.arr[2*i+1].d? 2*i:2*i+1;
              if(this.arr[min].d<this.arr[i].d){
                  let temp=this.arr[min];
                  this.arr[min]=this.arr[i];
                  this.arr[i]=temp;
                  i=min;

              }
              else{
                  return top;
              }
            } 
            if(this.arr.length==2*i+1){
                if(this.arr[2*i].d<this.arr[i].d){
                    let temp=this.arr[2*i];
                    this.arr[2*i]=this.arr[i];
                    this.arr[i]=temp;
                }
            }
            return top;
        }
    }
        getMin=function(){
            return this.arr.length>1? this.arr[1]:null;
        }
        isEmpty=function(){
            return (this.arr.length==1)
        }
      
    }



function containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i].x === obj.x && list[i].y === obj.y) {
            return true;
        }
    }

    return false;
}




//                               DIJTRA'S ALGORITHM

export default function Dijtras(array,rows,cols,start,endNode){

    let h=new Heap();
    let parent =new Array(rows);
    for(let i=0;i<rows;i++){
           parent[i]=new Array(cols);  
    }
    parent[start.x][start.y]={x:-1,y:-1};
    

markInitialDistance(array,start,h,parent);
    let visited =[]; 
    visited.push(start);
    let status =false;
   
     let curr;
     
 while(!h.isEmpty()){
     curr =h.remove();

    if(curr.x==endNode.x&&curr.y==endNode.y){status=true;break;}
    let neighbour =array[curr.x][curr.y].neighbours;

    for(let i=0;i<neighbour.length;i++){
        let a=neighbour[i].x,b=neighbour[i].y;

        if(!containsObject({x:a,y:b},visited)&&!array[a][b].isWall){
            if(array[a][b].d>array[a][b].w+curr.d){

                array[a][b].d=array[a][b].w+curr.d;
                let found =h.contains({x:a,y:b})
                if(found==-1){
                    h.insert({x:a,y:b,d:array[a][b].d});
                }
                else{
                    h.arr[found]={x:a,y:b,d:array[a][b].d}
                }
                parent[a][b]={x:curr.x,y:curr.y};
            }
        }
    }

    visited.push({x:curr.x,y:curr.y});

}

 let path=[]
if(status){
    while(!(curr.x==-1&&curr.y==-1)){
        let a= curr.x,b=curr.y;
        path.push({x:a,y:b});
        curr=parent[a][b];
        
    }
}


return {visited:visited,path:path,status:status}

}