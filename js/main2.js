class Node
{
	constructor(pElement)
	{
		this.element = pElement;
		this.rightNode = undefined;
		this.leftNode = undefined;
	}
}

class Tree
{
	constructor()
	{
		this.root = undefined;
		this.count = 0;
	}

	getCount()
	{
		return this.count;
	}

	getRoot()
	{
		return this.root;
	}

	getElementNode(pNode)
	{
		return pNode.element;
	}

	hasRightNode(pNode)
	{
		return pNode.right == undefined;
	}

	hasLeftNode(pNode)
	{
		return pNode.left == undefined;
	}

	assignRightNode(pNode, newNode)
	{
			pNode.right = newNode;
	}

	getRightNode(pNode)
	{
		return pNode.right;
	}

	insertElementToNode(pNode, pElement)
	{
		if(getElementNode(pNode) < pElement)
		{
			if(hasRightNode() == false)
			{
				var newNode = new Node(pElement);
				assignRightNode(pNode, newNode);
			}

			else
			{

			}
		}
	}



	insertElement(pElement)
	{
		if(this.root == undefined)
		{
			this.root = new Node(pElement);
			this.count++;
			this.currentNode = this.root;
			nodes.update({id: this.root.getElement(), label: this.root.getElement().toString(), size: 200 });
			edges.update({});
		}
		else
		{
			this.currentNode = this.root;

			while(currentNode != null)
			{
				if(pElement > this.currentNode.getElement())
				{
					if(this.currentNode.getRightNode() == undefined)
					{
						//create new node
						//assign it to the right of current node
					}

					else
					{
						//assign current node to current node's right!
					}
				}
			}
			

			else if()
		}
	}

	inorderListing()
	{
		var inorderList = [];
		
		if(this.root != undefined)
		{
			this.root.inorderListing(inorderList);
		}
		
		return inorderList;
	}

}

var BST = new Tree();
var nodes = new vis.DataSet([]);
var edges = new vis.DataSet([]);

// create a network
var container = document.getElementById('mynetwork');

// provide the data in the vis format
var data = {
    nodes: nodes,
    edges: edges
};
var options = {
   	layout: {
	    randomSeed: undefined,
	    improvedLayout:true,
	    hierarchical: {
		    enabled:true,
		    levelSeparation: 120,
		    nodeSpacing: 150,
		    treeSpacing: 200,
		    blockShifting: true,
		    edgeMinimization: true,
		    parentCentralization: true,
	    	direction: 'UD',        // UD, DU, LR, RL
	    	sortMethod: 'directed'   // hubsize, directed
		}
	}
};

// initialize your network!
var network = new vis.Network(container, data, options);

function insert()
{
   	var numText = prompt("Please enter a number: ", "0");
   	var pElement = parseInt(numText);
   	BST.insertElement(pElement);