

//The adjacency list 
//is the most common way of representing graphs
// we will use a Map to do that
let directed_graph = new Map();
let undirected_graph = new Map();
    

//-------------------------------------
const addNode = (node,adjacencyList)=>
{
    adjacencyList.set(node,[]);
}



//-------------------------------------
const addPath = (from,to,adjacencyList)=>
{
    adjacencyList.get(from).push(to);
}






//-----------------------------------------------------------------------
//-----------------------------------------------------------------------
//-----------------------------------------------------------------------
// Depth first search , recursive version
const dfs_recur = (startNode, graphRef,endNode = undefined,searchMode = false,visitedNodes = new Set())=>
{
    //mark the node as visited
    visitedNodes.add(startNode);

    //get neighbors
    let neighbors = graphRef.get(startNode);

    neighbors.map((neighbor)=>
    {
        if((neighbor === endNode) && (searchMode === true))
        {
            console.log("there is a path to that value");
            return; 
        }
        else if(!visitedNodes.has(neighbor))
        {
            // if node has neighbors not visited yet
            // call dfs on each one
            if(searchMode)
            {
                dfs_recur(neighbor,graphRef,endNode,true,visitedNodes);
            }
            else
            {
                dfs_recur(neighbor,graphRef,undefined,false,visitedNodes);
            }
        }
    });
    return visitedNodes;
}




//-----------------------------------------------------------------------
//-----------------------------------------------------------------------
//-----------------------------------------------------------------------
// Depth first search , iterative version
const dfs_iter = (startNode, graphRef,endNode = undefined,searchMode = false)=>
{
    let hasFoundNode = false;
    // for the iterative version
    // we use a stack to keep track
    // of nodes to visit
    //and a set for the already visited ones
    let nodesToVisit = [];
    let visitedNodes = new Set();
    
    // push the node onto the
    // "to visit" list
    nodesToVisit.push(startNode);

    while(nodesToVisit.length > 0 || hasFoundNode)
    {
        let currNode = nodesToVisit.pop();

        if((currNode === endNode) && (searchMode === true))
        {
            hasFoundNode = true;
            // this add is for completion
            // to have {startNode,node,node,node,endNode}
            // as an answer in case you want something
            // to move from point startNode to endNode
            visitedNodes.add(endNode);
            return visitedNodes;
        }

        // if it was not visited
        if(!(visitedNodes.has(currNode)))
        {
            //mark the node as visted
            visitedNodes.add(currNode);

            //get neighbors
            let neighbors = graphRef.get(currNode);

            neighbors.map((neighbor) =>
            {
                // if the neighbor is not visited
                // we add it to the stack
                if(!(visitedNodes.has(neighbor)))
                {
                    nodesToVisit.push(neighbor);
                }
            });
        }
    }

    return visitedNodes;
}



//-----------------------------------------------------------------------
//-----------------------------------------------------------------------
//-----------------------------------------------------------------------

let directed_node_list = ["A","B","C","D","E"];

let directed_node_connections = 
[
    ['A', 'B'],
    ['A', 'C'],
    ['B', 'D'],
    ['C', 'D'],
    ['D', 'E'],
]



// creating the directed graph
//------------------------------------------------------
//------------------------------------------------------
directed_node_list.forEach((node) => addNode(node,directed_graph));


for(let i = 0, len = directed_node_connections.length; i < len ; i++)
{
    addPath(directed_node_connections[i][0],directed_node_connections[i][1],directed_graph);
}






//-----------------------------------------------------------------------
//-----------------------------------------------------------------------
//-----------------------------------------------------------------------

let undirected_node_list = ["A","B","C","D","E","F"];

let undirected_node_connections = 
[
    ['A', 'B'],
    ['B', 'A'],
    ['B', 'E'],
    ['C', 'D'],
    ['D', 'C'],
    ['D', 'E'],
    ['D', 'F'],
    ['E', 'B'],
    ['E', 'D'],
    ['F', 'D']
]



// creating the undirected graph
//------------------------------------------------------
//------------------------------------------------------
undirected_node_list.forEach((node) => addNode(node,undirected_graph));


for(let i = 0, len = undirected_node_connections.length; i < len ; i++)
{
    addPath(undirected_node_connections[i][0],undirected_node_connections[i][1],undirected_graph);
}


//------------------------------------------------------
//------------------------------------------------------
//------------------------------------------------------
//recursive test

//only traverse the graph
let path_r = dfs_recur("A",directed_graph);

//search node in graph
let path_r2 = dfs_recur("A",directed_graph,"E",true);

//only traverse the graph
let path_r3 = dfs_recur("A",undirected_graph);

//search node in graph
let path_r4 = dfs_recur("A",undirected_graph,"C",true);


console.log("------------ recursive results ------------");
console.log("path_r:");
console.log(path_r);
console.log("path_r2:");
console.log(path_r2);
console.log("path_r3:");
console.log(path_r3);
console.log("path_r4:");
console.log(path_r4);
console.log("--------------------------------------------");
console.log("  ");


//------------------------------------------------------
//------------------------------------------------------
//------------------------------------------------------
// iterative test


//only traverse the graph
let path_i = dfs_iter("A",directed_graph);

//search node in graph
let path_i2 = dfs_iter("A",directed_graph,"E",true);

//only traverse the graph
let path_i3 = dfs_iter("A",undirected_graph);

//search node in graph
let path_i4 = dfs_iter("A",undirected_graph,"D",true);

console.log("------------ iterative results ------------");
console.log("path_i:");
console.log(path_i);
console.log("path_i2:");
console.log(path_i2);
console.log("path_i3:");
console.log(path_i3);
console.log("path_i4:");
console.log(path_i4);
console.log("--------------------------------------------");


