	
	//MVP 1.0
	class Node
	{
		//MVP 1.0
		constructor(pElement)
		{
			this.element = pElement;
			this.rightNode = undefined;
			this.leftNode = undefined;

			//MVP 2.0
			this.isSearch = false;
		}

		//MVP 1.0
		getElement()
		{
			return this.element;
		}
		
		//MVP 1.0
		getRightNode()
		{
			return this.rightNode;
		}

		//MVP 1.0
		getLeftNode()
		{
			return this.leftNode;
		}

	}

	//MVP 1.0
	class Tree
	{
		//MVP 1.0
		constructor()
		{
			this.root = undefined;
			this.count = 0;

			//MVP 2.0
			this.deleted = false;
		}

		//MVP 1.0
		getCount()
		{
			return this.count;
		}

		//MVP 1.0
		getRoot()
		{
			return this.root;
		}

		//MVP 1.0
		insertElement(pElement)
		{

			if(this.root == undefined)
			{
				this.root = new Node(pElement);
				this.count++;

				//MVP 2.0 - Commented for second MVP.
				// nodes.update({id: this.root.getElement(), label: this.root.getElement().toString(), size: 200 });
				// edges.update({});
			}
			else
			{
				//MVP 2.0
				var rta = this.insertHelper(pElement, this.root);

				//MVP 1.0
				if(rta != undefined)
				{
					this.count++;
					//alert("The element was inserted successfully");
				}

				return rta
			}

			return undefined;
		}

		//MVP 2.0
		searchElement(pElement)
		{
			if(this.root != undefined){
				return this.searchHelper(pElement, this.root);
			}
		}

		//MVP 2.0
		deleteElement(pElement)
		{
			this.root = this.deleteHelper(pElement, this.root);
			if(this.deleted){
				this.deleted = false;
				this.count--;
			}
		}

		//MVP 2.0
		buildVis()
		{
			if (this.root != undefined)
			{
				if(this.root.isSearched)
				{
					nodes.update({id: this.root.getElement(), label: this.root.getElement().toString(), size: 200 , color:"#f44242"});
					edges.update({});
				}else
				{
					nodes.update({id: this.root.getElement(), label: this.root.getElement().toString(), size: 200});
					edges.update({});
				}
				this.upDownUpdate(this.root);
				
			}
		}

		//MVP 1.0
		inorderListing()
		{
			var inorderList = [];
			
			if(this.root != undefined)
			{
				this.inorderListingHelp(inorderList, this.root);
			}
			
			return inorderList;
		}

		//MVP 1.0 -- Recursive (Titled Modified for MVP 2.0)
		insertHelper(pElement, node)
		{

			if(pElement > node.element)
			{
				if(node.rightNode == undefined)
				{
					node.rightNode = new Node(pElement);
					return node.rightNode;
				}
				else
				{
					return this.insertHelper(pElement, node.rightNode);
				}
			}

			else if(pElement < node.element)
			{
				if(node.leftNode == undefined)
				{
					node.leftNode = new Node(pElement);
					return node.leftNode;
				}
				else
				{
					return this.insertHelper(pElement, node.leftNode);
				}
			}
			return undefined;
		}

		//MVP 2.0
		searchHelper(pElement, node)
		{
			
			if(pElement == node.element)
			{
				node.isSearched = true;
				return node;
			}
			else if(pElement < node.element)
			{
				if(node.leftNode != undefined)
				{
					return this.searchHelper(pElement, node.leftNode);
				}
			}
			else
			{
				if(node.rightNode != undefined)
				{
					return this.searchHelper(pElement, node.rightNode);
				}
			}
			return undefined;
		}

		//MVP 2.0
		deleteHelper(pElement, node)
		{
			if (node == null)  return node; 
	  
	        /* Otherwise, recur down the tree */
	        if (pElement < node.element) 
	            node.leftNode = this.deleteHelper(pElement,node.leftNode); 
	        else if (pElement > node.element) 
	            node.rightNode = this.deleteHelper(pElement, node.rightNode); 
	  
	        // if key is same as root's key, then This is the node 
	        // to be deleted 
	        else
	        { 
	        	this.deleted = true;
	            // node with only one child or no child 
	            if (node.leftNode == null) 
	                return node.rightNode; 
	            else if (node.rightNode == null) 
	                return node.leftNode; 
	  
	            // node with two children: Get the inorder successor (smallest 
	            // in the right subtree) 
	            node.element = minValue(node.rightNode); 
	  
	            // Delete the inorder successor 
	            node.rightNode = deleteHelper(node.element, node.rightNode); 
	        } 
	  
	        return node; 
		}

		//MVP 2.0
		minValue(node)
		{
			var minv = node.element; 
	        while (node.leftNode != null) 
	        { 
	            minv = node.leftNode.element; 
	            node = node.leftNode; 
	        } 
	        return minv; 
		}	

		//MVP 2.0
		upDownUpdate(node)
		{
			// alert(node.getElement());
			if(node.leftNode != undefined || node.rightNode != undefined)
			{
				if(node.leftNode == undefined)
				{
					nodes.update({id: -node.getElement(), label: "", size: 200, color:"white"});
					edges.update({from: node.getElement(), to: -node.getElement(), color:{color:"white"}});
					// nodes.update({})
				}else
				{
					if(node.leftNode.isSearched)
					{
						nodes.update({id: node.leftNode.getElement(), label: node.leftNode.getElement().toString(), size: 200, color:"#f44242"});
						edges.update({from: node.getElement(), to: node.leftNode.getElement(), color:{color:"#97c2fc"}});
					}else
					{
						nodes.update({id: node.leftNode.getElement(), label: node.leftNode.getElement().toString(), size: 200});
						edges.update({from: node.getElement(), to: node.leftNode.getElement(), color:{color:"#97c2fc"}});
					}
					
					this.upDownUpdate(node.leftNode);
				}

				if(node.rightNode == undefined)
				{
					nodes.update({id: -node.getElement(), label: "", size: 200, color:"white"});
					edges.update({from: node.getElement(), to: -node.getElement(), color:{color:"white"}});
				}else
				{
					if(node.rightNode.isSearched)
					{
						nodes.update({id: node.rightNode.getElement(), label: node.rightNode.getElement().toString(), size: 200 , color:"#f44242"});
						edges.update({from: node.getElement(), to: node.rightNode.getElement(), color:{color:"#97c2fc"}});
					}else
					{
						nodes.update({id: node.rightNode.getElement(), label: node.rightNode.getElement().toString(), size: 200 });
						edges.update({from: node.getElement(), to: node.rightNode.getElement(), color:{color:"#97c2fc"}});
					}
					this.upDownUpdate(node.rightNode);
				}
			}
		}

		//MVP 1.0 - Title updated for MVP 2.0.
		inorderListingHelp(pList, node)
		{
			if(node.leftNode != undefined)
			{
				this.inorderListingHelp(pList, node.leftNode);
			}

			pList.push(node.element);
			
			if(node.rightNode != undefined)
			{
				this.inorderListingHelp(pList, node.rightNode);
			}
		}
	}

	//MVP 1.0
	var BST = new Tree();

	//MVP 1.0
	var nodes = new vis.DataSet([]);
	var edges = new vis.DataSet([]);

	//MVP 1.0 - Create Network
	var container = document.getElementById('mynetwork');

	//MVP 1.0 - provide data to network
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

	//MVP 1.0 - Initialize Network
	var network = new vis.Network(container, data, options);

	//MVP 1.0 - Removed in MVP 2.0
	// function insert()
	// {
	//    	var numText = prompt("Please enter a number: ", "0");
	//    	var pElement = parseInt(numText);
	//    	BST.insertElement(pElement);
	// }

	// function search()
	// {
	//    	var numText = prompt("Please enter a number: ", "0");
	//    	var pElement = parseInt(numText);
	//    	BST.searchElement(pElement);
	// }

	//MVP 1.0 - Updated for MVP 2.0.
	function execute()
	{
		BST.buildVis();
		BST = new Tree();
		nodes = new vis.DataSet([]);
		edges = new vis.DataSet([]);
		data = {
		    nodes: nodes,
		    edges: edges
		};
	}

	//MVP 1.0
	function reset()
	{
		BST = new Tree();
		nodes = new vis.DataSet([]);
		edges = new vis.DataSet([]);
		data = {
		    nodes: nodes,
		    edges: edges
		};

		network = new vis.Network(container, data, options);
	}

	//----------------------------------------------------------------------------------------------------
	//General Blocks
	//----------------------------------------------------------------------------------------------------
		
		/*---------------Yes-------------------------------*/
		Blockly.Blocks['yes_block'] = {
		  init: function() {
		    this.appendDummyInput()
		        .appendField("Yes");
		    this.setInputsInline(false);
		    this.setOutput(true, "Boolean");
		    this.setColour(15);
		    this.setTooltip('');
		  }
		};

		Blockly.JavaScript['yes_block'] = function(block) {
		  // TODO: Assemble JavaScript into code variable.
		  var code = 'true';
		  // TODO: Change ORDER_NONE to the correct strength.
		  return [code, Blockly.JavaScript.ORDER_NONE];
		};

		/*---------------No-------------------------------*/
		Blockly.Blocks['no_block'] = {
		  init: function() {
		    this.appendDummyInput()
		        .appendField("No");
		    this.setInputsInline(false);
		    this.setOutput(true, "Boolean");
		    this.setColour(15);
		    this.setTooltip('');
		  }
		};

		Blockly.JavaScript['no_block'] = function(block) {
		  // TODO: Assemble JavaScript into code variable.
		  var code = 'false';
		  // TODO: Change ORDER_NONE to the correct strength.
		  return [code, Blockly.JavaScript.ORDER_NONE];
		};

		//----------------------------------------------------------------------------------------------------
		//Tree Class: Blocks Defined
		//----------------------------------------------------------------------------------------------------

		/*---------------Root Exists-------------------------------*/
		Blockly.Blocks['root_exists'] = {
		  init: function() {
		    this.appendDummyInput()
		        .appendField("Root exists?");
		    this.setInputsInline(false);
		    this.setOutput(true, "Boolean");
		    this.setColour(15);
		    this.setTooltip('');
		  }
		};

		Blockly.JavaScript['root_exists'] = function(block) {
		  // TODO: Assemble JavaScript into code variable.
		  var code = 'BST.root != undefined';
		  // TODO: Change ORDER_NONE to the correct strength.
		  return [code, Blockly.JavaScript.ORDER_NONE];
		};
	/*---------------Root Exists-------------------------------*/
	Blockly.Blocks['root_not_exists'] = {
		init: function() {
			this.appendDummyInput()
				.appendField("Root does not exist?");
			this.setInputsInline(false);
			this.setOutput(true, "Boolean");
			this.setColour(15);
			this.setTooltip('');
		}
	};

	Blockly.JavaScript['root_not_exists'] = function(block) {
		// TODO: Assemble JavaScript into code variable.
		var code = 'BST.root == undefined';
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.JavaScript.ORDER_NONE];
	};

		/*---------------Insert Integration------------------------*/
		Blockly.Blocks['insertIntegration'] = {
		  init: function() {
		    this.appendValueInput("pElement")
		        .setCheck("Number")
		        .appendField("Insert Element");
		    this.setInputsInline(false);
		    this.setPreviousStatement(true, null);
		    this.setNextStatement(true, null);
		    this.setColour(345);
		    this.setTooltip('');
		  }
		};

		Blockly.JavaScript['insertIntegration'] = function(block) {
			var pElement = Blockly.JavaScript.valueToCode(block, 'pElement', Blockly.JavaScript.ORDER_ATOMIC);
		 	var code = 'BST.insertElement(' + pElement +');\n';
			return code;
		};

		/*---------------Search Integration------------------------*/
		Blockly.Blocks['searchIntegration'] = {
		  init: function() {
		    this.appendValueInput("pElement")
		        .setCheck("Number")
		        .appendField("Search Element");
		    this.setInputsInline(false);
		    this.setPreviousStatement(true, null);
		    this.setNextStatement(true, null);
		    this.setColour(345);
		    this.setTooltip('');
		  }
		};

		Blockly.JavaScript['searchIntegration'] = function(block) {
			var pElement = Blockly.JavaScript.valueToCode(block, 'pElement', Blockly.JavaScript.ORDER_ATOMIC);
		 	var code = 'BST.searchElement(' + pElement +');\n';
			return code;
		};

		/*---------------Delete Integration------------------------*/
		Blockly.Blocks['deleteIntegration'] = {
		  init: function() {
		    this.appendValueInput("pElement")
		        .setCheck("Number")
		        .appendField("Remove Element");
		    this.setInputsInline(false);
		    this.setPreviousStatement(true, null);
		    this.setNextStatement(true, null);
		    this.setColour(345);
		    this.setTooltip('');
		  }
		};

		Blockly.JavaScript['deleteIntegration'] = function(block) {
		  var pElement = Blockly.JavaScript.valueToCode(block, 'pElement', Blockly.JavaScript.ORDER_ATOMIC);
		 	var code = 'BST.deleteElement(' + pElement +');\n';
			return code;
		};

		/*---------------Minimum Value Integration------------------------*/
		Blockly.Blocks['minValueIntegration'] = {
		  init: function() {
		    this.appendValueInput("pNode")
		        .setCheck("Node")
		        .appendField("Get Minimum Element");
		    this.setOutput(true, "Number");
		    this.setInputsInline(false);
		    this.setColour(345);
		    this.setTooltip('');
		  }
		};

		Blockly.JavaScript['minValueIntegration'] = function(block) {
		    var pNode = Blockly.JavaScript.valueToCode(block, 'pNode', Blockly.JavaScript.ORDER_ATOMIC);
		 	var code = 'BST.minValue(' + pNode +')';
		 	// alert(code);
			return [code, Blockly.JavaScript.ORDER_NONE];
		};


		/*---------------Create Root-------------------------------*/
		Blockly.Blocks['new_root'] = {
		  init: function() {
		    this.appendValueInput("pElement")
		        .setCheck("Number")
		        .appendField("Create Root");
		    this.setInputsInline(false);
		    this.setPreviousStatement(true, null);
		    this.setNextStatement(true, null);
		    this.setColour(15);
		    this.setTooltip('');
		  }
		};

		Blockly.JavaScript['new_root'] = function(block) {
		  var pElement = Blockly.JavaScript.valueToCode(block, 'pElement', Blockly.JavaScript.ORDER_ATOMIC);
		  // TODO: Assemble JavaScript into code variable.
		  var code = 'BST.root = new Node('+pElement+');\n'+ 
		  'nodes.update({id: BST.root.element, label: BST.root.element.toString(), size: 200 });\n'+
		  'edges.update({});\n';
		  return code;
		};

		/*---------------Set Root-------------------------------*/
		Blockly.Blocks['set_root'] = {
		  init: function() {
		    this.appendValueInput("node")
		        .setCheck("Node")
		        .appendField("Set Root");
		    this.setInputsInline(false);
		    this.setPreviousStatement(true, null);
		    this.setNextStatement(true, null);
		    this.setColour(15);
		    this.setTooltip('');
		  }
		};

		Blockly.JavaScript['set_root'] = function(block) {
		  var node = Blockly.JavaScript.valueToCode(block, 'node', Blockly.JavaScript.ORDER_ATOMIC);
		  // TODO: Assemble JavaScript into code variable.
		  var code = 'BST.root = ' + node + ";";
		  return code;
		};


		/*---------------Increase Count-------------------------------*/
		Blockly.Blocks['increase_count'] = {
		  init: function() {
		    this.appendDummyInput()
		        .appendField("Increase Count");
		    this.setInputsInline(false);
		    this.setPreviousStatement(true, null);
		    this.setNextStatement(true, null);
		    this.setColour(285);
		    this.setTooltip('');
		  }
		};

		Blockly.JavaScript['increase_count'] = function(block) {
		  // TODO: Assemble JavaScript into code variable.
		  var code = 'BST.count++;\n';
		  return code;
		};

		/*---------------Decrease Count-------------------------------*/
		Blockly.Blocks['decrease_count'] = {
		  init: function() {
		    this.appendDummyInput()
		        .appendField("Decrease Count");
		    this.setInputsInline(false);
		    this.setPreviousStatement(true, null);
		    this.setNextStatement(true, null);
		    this.setColour(285);
		    this.setTooltip('');
		  }
		};

		Blockly.JavaScript['decrease_count'] = function(block) {
		  // TODO: Assemble JavaScript into code variable.
		  var code = 'BST.count--;\n';
		  return code;
		};

		/*---------------Get Root-------------------------------*/
		Blockly.Blocks['get_root'] = {
		  init: function() {
		    this.appendDummyInput()
		        .appendField("Root Node");
		    this.setInputsInline(false);
		    this.setOutput(true, "Node");
		    this.setColour(15);
		    this.setTooltip('');
		  }
		};

		Blockly.JavaScript['get_root'] = function(block) {
		  // TODO: Assemble JavaScript into code variable.
		  var code = 'BST.root';
		  // TODO: Change ORDER_NONE to the correct strength.
		  return [code, Blockly.JavaScript.ORDER_NONE];
		};

		/*---------------Get Node-------------------------------*/
		Blockly.Blocks['get_node'] = {
		  init: function() {
		    this.appendValueInput("pNode")
		        .setCheck("Node")
		        .appendField("Get Node");
		    this.setOutput(true, "Number");
		    this.setColour(200);
		 this.setTooltip("");
		 this.setHelpUrl("");
		  }
		};

		Blockly.JavaScript['get_node'] = function(block) {
		  // var pElement = Blockly.JavaScript.valueToCode(block, 'pElement', Blockly.JavaScript.ORDER_ATOMIC);
		  // // TODO: Assemble JavaScript into code variable.
		  // var code = 'BST.root = new Node('+pElement+');\n'+ 
		  // 'nodes.update({id: BST.root.element, label: BST.root.element.toString(), size: 200 });\n'+
		  // 'edges.update({});\n';
		  return 1;
		};


		/*---------------Get Node's Element-------------------------------*/
		Blockly.Blocks['get_node_element'] = {
		  init: function() {
		    this.appendValueInput("node")
		        .setCheck(null)
		        .appendField("Get Node's Element");
		    this.setOutput(true, "Number");
		    this.setColour(200);
		 this.setTooltip("");
		 this.setHelpUrl("");
		  }
		};

		Blockly.JavaScript['get_node_element'] = function(block) {
		  var value_node = Blockly.JavaScript.valueToCode(block, 'node', Blockly.JavaScript.ORDER_ATOMIC);
		  // TODO: Assemble JavaScript into code variable.

		  var code = value_node + '.getElement()';
		  // TODO: Change ORDER_NONE to the correct strength.
		  return [code, Blockly.JavaScript.ORDER_NONE];
		};

		/*---------------Get Node's Right Node-------------------------------*/
		Blockly.Blocks['get_node_right'] = {
		  init: function() {
		    this.appendValueInput("node")
		        .setCheck(null)
		        .appendField("Get Node's Right Node");
		    this.setOutput(true, "Node");
		    this.setColour(200);
		 this.setTooltip("");
		 this.setHelpUrl("");
		  }
		};

		Blockly.JavaScript['get_node_right'] = function(block) {
		  var value_node = Blockly.JavaScript.valueToCode(block, 'node', Blockly.JavaScript.ORDER_ATOMIC);
		  // TODO: Assemble JavaScript into code variable.
		  value_node = value_node.replace(')','');
		  value_node = value_node.replace('(','');
		  var code = value_node + '.getRightNode()';
		  // TODO: Change ORDER_NONE to the correct strength.
		  //alert(code);
		  return [code, Blockly.JavaScript.ORDER_NONE];
		};

		/*---------------Get Node's Left Node-------------------------------*/
		Blockly.Blocks['get_node_left'] = {
		  init: function() {
		    this.appendValueInput("node")
		        .setCheck(null)
		        .appendField("Get Node's Left Node");
		    this.setOutput(true, "Node");
		    this.setColour(200);
		 this.setTooltip("");
		 this.setHelpUrl("");
		  }
		};

		Blockly.JavaScript['get_node_left'] = function(block) {
		  var value_node = Blockly.JavaScript.valueToCode(block, 'node', Blockly.JavaScript.ORDER_ATOMIC);
		  // TODO: Assemble JavaScript into code variable.
		  value_node = value_node.replace(')','');
		  value_node = value_node.replace('(','');
		  var code = value_node + '.getLeftNode()';
		  // TODO: Change ORDER_NONE to the correct strength.
		  //alert(code);
		  return [code, Blockly.JavaScript.ORDER_NONE];
		};

		/*---------------Get Node's Left Node-------------------------------*/
		Blockly.Blocks['assign_element_to_node'] = {
		  init: function() {
		  	this.setPreviousStatement(true, null);
	    	this.setNextStatement(true, null);
		    this.appendValueInput('pNode')
		        .setCheck(null)
		        .setAlign(Blockly.ALIGN_RIGHT)
		        .appendField("Assign to");
		    this.appendValueInput('pElement')
		        .setCheck("Number")
		        .appendField("with Value:");
		    this.setColour(230);
		 this.setTooltip("");
		 this.setHelpUrl("");
		  }
		};

		Blockly.JavaScript['assign_element_to_node'] = function(block) {
		  var node = Blockly.JavaScript.valueToCode(block, 'pNode', Blockly.JavaScript.ORDER_NONE);
		  var value = Blockly.JavaScript.valueToCode(block, 'pElement', Blockly.JavaScript.ORDER_ATOMIC);
		  var code = node + ".element = " + value + ";"

		  return code;
		};


		/*---------------Assign Right Node to Node-------------------------------*/
		Blockly.Blocks['assign_right_node'] = {
		  init: function() {
		  	this.setPreviousStatement(true, null);
	    	this.setNextStatement(true, null);
		    this.appendValueInput('pNode')
		        .setCheck(null)
		        .setAlign(Blockly.ALIGN_RIGHT)
		        .appendField("Assign to");
		    this.appendValueInput('pElement')
		        .setCheck("Number")
		        .appendField("New Right Node with Value:");
		    this.setColour(230);
		 this.setTooltip("");
		 this.setHelpUrl("");
		  }
		};

		Blockly.JavaScript['assign_right_node'] = function(block) {
		  var value_node = Blockly.JavaScript.valueToCode(block, 'pNode', Blockly.JavaScript.ORDER_NONE);
		  var elem = Blockly.JavaScript.valueToCode(block, 'pElement', Blockly.JavaScript.ORDER_ATOMIC);
		  var code = undefined;

		  if(elem == 'element')
		  {
		  	code = value_node+'.rightNode = new Node(' + elem + ');' 
					// 'nodes.update({id: '+elem+', label: '+elem+'.toString(), size: 200 });\n' +
					// 'edges.update({from: '+value_node +'.element, to: '+elem+'});\n';
		  }
		  
		  else
		  {
		  	code = value_node+'.rightNode = new Node(' + elem + ');' 
					// 'nodes.update({id: '+elem+', label: \''+elem+'\', size: 200 });\n' +
					// 'edges.update({from: '+value_node +'.element, to: '+elem+'});\n';
		  }

		  return code;
		};

		/*---------------Assign Right Node to Node-------------------------------*/
		Blockly.Blocks['assign_right_node_node'] = {
		  init: function() {
		  	this.setPreviousStatement(true, null);
	    	this.setNextStatement(true, null);
		    this.appendValueInput('pNode')
		        .setCheck("Node")
		        .setAlign(Blockly.ALIGN_RIGHT)
		        .appendField("Assign to");
		    this.appendValueInput('nNode')
		        .setCheck("Node")
		        .appendField("New Right Node :");
		    this.setColour(230);
		 this.setTooltip("");
		 this.setHelpUrl("");
		  }
		};

		Blockly.JavaScript['assign_right_node_node'] = function(block) {
		  var oldNode = Blockly.JavaScript.valueToCode(block, 'pNode', Blockly.JavaScript.ORDER_NONE);
		  var newNode = Blockly.JavaScript.valueToCode(block, 'nNode', Blockly.JavaScript.ORDER_ATOMIC);
		  var code = oldNode + ".rightNode = " + newNode + ";"

		  return code;
		};

		/*---------------Assign Left Node to Node-------------------------------*/
		Blockly.Blocks['assign_left_node'] = {
		  init: function() {
		  	this.setPreviousStatement(true, null);
	    	this.setNextStatement(true, null);
		    this.appendValueInput("pNode")
		        .setCheck(null)
		        .setAlign(Blockly.ALIGN_RIGHT)
		        .appendField("Assign to");
		    this.appendValueInput("pElement")
		        .setCheck("Number")
		        .appendField("New Left Node with Value:");
		    this.setColour(230);
		 this.setTooltip("");
		 this.setHelpUrl("");
		  }
		};

		Blockly.JavaScript['assign_left_node'] = function(block) {
		  var value_node = Blockly.JavaScript.valueToCode(block, 'pNode', Blockly.JavaScript.ORDER_NONE);
		  var elem = Blockly.JavaScript.valueToCode(block, 'pElement', Blockly.JavaScript.ORDER_NONE);
		  // TODO: Assemble JavaScript into code variable.

		  var code = undefined;

		  if(elem == 'element')
		  {
		  	code = value_node+'.leftNode = new Node(' + elem + ');\n' +
					'nodes.update({id: '+elem+', label: '+elem+'.toString(), size: 200 });\n' +
					'edges.update({from: '+value_node +'.element, to: '+elem+'});\n';
		  }
		  
		  else
		  {
		  	code = value_node+'.leftNode = new Node(' + elem + ');\n' +
					'nodes.update({id: '+elem+', label: \''+elem+'\', size: 200 });\n' +
					'edges.update({from: '+value_node +'.element, to: '+elem+'});\n';
		  }

		  return code;
		};

				/*---------------Assign Right Node to Node-------------------------------*/
		Blockly.Blocks['assign_left_node_node'] = {
		  init: function() {
		  	this.setPreviousStatement(true, null);
	    	this.setNextStatement(true, null);
		    this.appendValueInput('pNode')
		        .setCheck("Node")
		        .setAlign(Blockly.ALIGN_RIGHT)
		        .appendField("Assign to");
		    this.appendValueInput('nNode')
		        .setCheck("Node")
		        .appendField("New Left Node :");
		    this.setColour(230);
		 this.setTooltip("");
		 this.setHelpUrl("");
		  }
		};

		Blockly.JavaScript['assign_left_node_node'] = function(block) {
		  var oldNode = Blockly.JavaScript.valueToCode(block, 'pNode', Blockly.JavaScript.ORDER_NONE);
		  var newNode = Blockly.JavaScript.valueToCode(block, 'nNode', Blockly.JavaScript.ORDER_ATOMIC);
		  var code = oldNode + ".leftNode = " + newNode + ";"
		  
		  return code;
		};

		/*---------------Has Node a Right Node?-------------------------------*/
		Blockly.Blocks['node_has_right'] = {
		  init: function() {
		    this.appendValueInput("node")
		        .setCheck(null)
		        .appendField("Has this Node a Right Node?");
		    this.setOutput(true, "Boolean");
		    this.setColour(260);
		 this.setTooltip("");
		 this.setHelpUrl("");
		  }
		};

		Blockly.JavaScript['node_has_right'] = function(block) {
		  var value_node = Blockly.JavaScript.valueToCode(block, 'node', Blockly.JavaScript.ORDER_ATOMIC);
		  // TODO: Assemble JavaScript into code variable.
		  var code = value_node + '.rightNode != undefined';
		  // TODO: Change ORDER_NONE to the correct strength.
		  return [code, Blockly.JavaScript.ORDER_NONE];
		};

		/*---------------Has Node a Left Node?-------------------------------*/
		Blockly.Blocks['node_has_left'] = {
		  init: function() {
		    this.appendValueInput("node")
		        .setCheck(null)
		        .appendField("Has this Node a Left Node?");
		    this.setOutput(true, "Boolean");
		    this.setColour(260);
		 this.setTooltip("");
		 this.setHelpUrl("");
		  }
		};

		Blockly.JavaScript['node_has_left'] = function(block) {
		  var value_node = Blockly.JavaScript.valueToCode(block, 'node', Blockly.JavaScript.ORDER_ATOMIC);
		  // TODO: Assemble JavaScript into code variable.
		  var code = value_node + '.leftNode != undefined';
		  // TODO: Change ORDER_NONE to the correct strength.
		  return [code, Blockly.JavaScript.ORDER_NONE];
		};

		/*---------------Create New Node-------------------------------*/
		Blockly.Blocks['create_node'] = {
		  init: function() {
		    this.appendValueInput("element")
		        .setCheck("Number")
		        .appendField("New Node with element:");
		    this.setOutput(true, "Node");
		    this.setColour(230);
		    this.setTooltip('');
		    this.setHelpUrl('http://www.example.com/');
		  }
		};

		Blockly.JavaScript['create_node'] = function(block) {
		  var value_element = Blockly.JavaScript.valueToCode(block, 'element', Blockly.JavaScript.ORDER_ATOMIC);
		  // TODO: Assemble JavaScript into code variable.
		  var element = parseInt(value_element, 10);

		  var code = 'new Node('+element+')' 
		  // TODO: Change ORDER_NONE to the correct strength.
		  return [code, Blockly.JavaScript.ORDER_NONE];
		};

		/*---------------Create New Node-------------------------------*/
		Blockly.Blocks['node_exist'] = {
		  init: function() {
		    this.appendValueInput("node")
		        .setCheck("Node")
		        .appendField("Node exists?");
		    // this.setPreviousStatement(true, null);
		    // this.setNextStatement(true, null);
		    this.setOutput(true, "Boolean");
		    this.setColour(260);
		    this.setTooltip('');
		    this.setHelpUrl('http://www.example.com/');
		  }
		};

		Blockly.JavaScript['node_exist'] = function(block) {
		  var node = Blockly.JavaScript.valueToCode(block, 'node', Blockly.JavaScript.ORDER_ATOMIC);

		  var code = node + "!= undefined"
		  // TODO: Change ORDER_NONE to the correct strength.
		  return [code, Blockly.JavaScript.ORDER_NONE];
		};

		/*---------------Create New Node-------------------------------*/
		Blockly.Blocks['node_not_exist'] = {
		  init: function() {
		    this.appendValueInput("node")
		        .setCheck("Node")
		        .appendField("Node not exists?");
		    // this.setPreviousStatement(true, null);
		    // this.setNextStatement(true, null);
		    this.setOutput(true, "Boolean");
		    this.setColour(260);
		    this.setTooltip('');
		    this.setHelpUrl('http://www.example.com/');
		  }
		};

		Blockly.JavaScript['node_not_exist'] = function(block) {
		  var node = Blockly.JavaScript.valueToCode(block, 'node', Blockly.JavaScript.ORDER_ATOMIC);

		  var code = node + "== undefined"
		  // TODO: Change ORDER_NONE to the correct strength.
		  return [code, Blockly.JavaScript.ORDER_NONE];
		};


		/*---------------find_target_node-------------------------------*/

		Blockly.Blocks['find_target_node'] = {
		  init: function() {
		    this.appendValueInput("node")
		        .setCheck("Node")
		        .appendField("Found and Mark");
		    this.setInputsInline(false);
		    this.setPreviousStatement(true, null);
		    this.setNextStatement(true, null);
		    this.setColour(200);
		    this.setTooltip('');
		  }
		};

		Blockly.JavaScript['find_target_node'] = function(block) {
		  var node = Blockly.JavaScript.valueToCode(block, 'node', Blockly.JavaScript.ORDER_ATOMIC);

		  var code = node + ".isSearched = true;";
		  console.log(node.isSearched);

		  return code
		};
	/*---------------Change Color Of Node-------------------------------*/
	Blockly.Blocks['change_color_of_node'] = {
		init: function() {
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.appendValueInput("node")
				.setCheck(null)
				.setAlign(Blockly.ALIGN_RIGHT)
				.appendField("Change the color of this node:");
			this.setColour(120);
			this.setTooltip("");
			this.setHelpUrl("");
		}
	};

	
	Blockly.JavaScript['change_color_of_node'] = function(block) {

		/*
		var value_element = Blockly.JavaScript.valueToCode(block, 'node', Blockly.JavaScript.ORDER_ATOMIC);
		// TODO: Assemble JavaScript into code variable.
		var element = parseInt(value_element, 10);
		var newNode = new Node(element);
		var code = 'return ' + newNode;
		// TODO: Change ORDER_NONE to the correct strength.
		return [code, Blockly.JavaScript.ORDER_NONE];
		*/

	};
	
