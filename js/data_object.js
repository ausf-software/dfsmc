class MaskParametr {
	
	// 0 без *
	// 1 в начеле есть *
	// 2 в конце есть *
	// 3 в начале и конце есть *
	constructor (str, type) {
		this.type = type;
		this.str = str;
	}
	
}

class Mask {

	// t_logic
	// 0 - или
	// 1 - и
	// t_content
	// 0 - содержит
	// 1 - не содержит
    constructor (parametrs, type_logic, type_content) {
		this.parametrs = parametrs;
		this.type_logic = type_logic;
		this.type_content = type_content;
	}
	
};

class Transition {

    constructor (start, _char, end) {
		this.start = start;
		this._char = _char;
		this.end = end;
	}
	
};

class State {

    constructor (name) {
		this.name = name;
		this.transitions = [];
	}
	
	addTransition (trans) {
		this.transitions.push(trans);
	}
	
};

class Table {
	
	constructor (states) {
		this.states = states;
	}
	
}