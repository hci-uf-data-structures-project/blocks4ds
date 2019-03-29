	class Node
	{
		constructor(pElement)
		{
			this.element = pElement;
			this.rightNode = undefined;
			this.leftNode = undefined;
		}

		getElement()
		{
			return this.element;
		}
		
		getRightNode()
		{
			return this.rightNode;
		}

		getLeftNode()
		{
			return this.leftNode;
		}

		insertElement(pElement)
		{
			var rta = false;
			if(pElement > this.element)
			{
				if(this.rightNode == undefined)
				{
					this.rightNode = new Node(pElement);
					nodes.update({id: pElement, label: pElement.toString(), size: 200 });
					edges.update({from: this.element, to: pElement});
					rta = true;
				}
				else
				{
					rta = this.rightNode.insertElement(pElement);
				}
			}

			else if(pElement < this.element)
			{
				if(this.leftNode == undefined)
				{
					this.leftNode = new Node(pElement);
					nodes.update({id: pElement, label: pElement.toString(), size: 200 });
					edges.update({from: this.element, to: pElement});
					rta = true;


				}
				else
				{
					rta = this.leftNode.insertElement(pElement);
				}
			}
			return rta;
		}

		searchElement(pElement)
		{
			var rta = false;
			if(pElement == this.element)
			{
				rta = true;
			}
			else if(pElement < this.element)
			{
				if(this.leftNode != undefined)
				{
					rta = this.leftNode.searchElement(pElement);
				}
			}
			else
			{
				if(this.rightNode != undefined)
				{
					rta = this.rightNode.searchElement(pElement);
				}
			}
			return rta;
		}

		inorderListing(pList)
		{
			if(this.leftNode != undefined)
			{
				this.leftNode.inorderListing(pList);
			}

			pList.push(this.element);
			
			if(this.rightNode != undefined)
			{
				parentNode = this;
				this.rightNode.inorderListing(pList);
			}
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

		insertElement(pElement)
		{
			if(this.root == undefined)
			{
				this.root = new Node(pElement);
				this.count++;
				nodes.update({id: this.root.getElement(), label: this.root.getElement().toString(), size: 200 });
				edges.update({});
			}
			else
			{
				var rta = this.root.insertElement(pElement);
				if(rta == true)
				{
					this.count++;
					//alert("The element was inserted successfully");
				}
				else
				{
					//alert("The element to insert already xeists in the Binary Search Tree!");
				}
			}
		}

		searchElement(pElement)
		{
			if(this.root == pElement)
			{
				nodes.update({size: 200, color: {background: '#0BB31C'} });
				edges.update({});
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
	}

	function search()
	{
	   	var numText = prompt("Please enter a number: ", "0");
	   	var pElement = parseInt(numText);
	   	BST.searchElement(pElement);
	}

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

		/*---------------Create Root-------------------------------*/
		Blockly.Blocks['new_root'] = {
		  init: function() {
		    this.appendValueInput("pElement")
		        .setCheck("Number")
		        .appendField("Create Root");
		    this.setInputsInline(false);
		    this.setPreviousStatement(true, null);
		    this.setNextStatement(true, null);
		    this.setColour(345);
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
		    this.setColour(0);
		    this.setTooltip('');
		  }
		};

		Blockly.JavaScript['get_root'] = function(block) {
		  // TODO: Assemble JavaScript into code variable.
		  var code = 'BST.root';
		  // TODO: Change ORDER_NONE to the correct strength.
		  return [code, Blockly.JavaScript.ORDER_NONE];
		};


		/*---------------Get Node's Element-------------------------------*/
		Blockly.Blocks['get_node_element'] = {
		  init: function() {
		    this.appendValueInput("node")
		        .setCheck(null)
		        .appendField("Get Node's Element");
		    this.setOutput(true, "Number");
		    this.setColour(230);
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
		    this.setOutput(true, "Number");
		    this.setColour(230);
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
		    this.setOutput(true, "Number");
		    this.setColour(230);
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
		  	code = value_node+'.rightNode = new Node(' + elem + ');\n' +
					'nodes.update({id: '+elem+', label: '+elem+'.toString(), size: 200 });\n' +
					'edges.update({from: '+value_node +'.element, to: '+elem+'});\n';
		  }
		  
		  else
		  {
		  	code = value_node+'.rightNode = new Node(' + elem + ');\n' +
					'nodes.update({id: '+elem+', label: \''+elem+'\', size: 200 });\n' +
					'edges.update({from: '+value_node +'.element, to: '+elem+'});\n';
		  }

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

		/*---------------Has Node a Right Node?-------------------------------*/
		Blockly.Blocks['node_has_right'] = {
		  init: function() {
		    this.appendValueInput("node")
		        .setCheck(null)
		        .appendField("Has this Node a Right Node?");
		    this.setOutput(true, "Boolean");
		    this.setColour(230);
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
		    this.setColour(230);
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
		    this.setOutput(true, null);
		    this.setColour(260);
		    this.setTooltip('');
		    this.setHelpUrl('http://www.example.com/');
		  }
		};

		Blockly.JavaScript['create_node'] = function(block) {
		  var value_element = Blockly.JavaScript.valueToCode(block, 'element', Blockly.JavaScript.ORDER_ATOMIC);
		  // TODO: Assemble JavaScript into code variable.
		  var element = parseInt(value_element, 10);
		  var newNode = new Node(element);
		  var code = 'return ' + newNode;
		  // TODO: Change ORDER_NONE to the correct strength.
		  return [code, Blockly.JavaScript.ORDER_NONE];
		};