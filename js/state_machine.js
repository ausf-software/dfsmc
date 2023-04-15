class DFSM {
	
	alphabet;
	masks;
	

    constructor (alphabet, masks) {
		this.alphabet = alphabet;
		this.masks = masks;
		console.log(masks);
	}
	
	calculateStates() {
		var states = [];
		var errors = [];
		states.push(new State(""));
		
		if (this.masks[0].parametrs[0].type == 0 || this.masks[0].parametrs[0].type == 2) {

			for (var mask_pos = 0; mask_pos < this.masks[0].parametrs[0].str.length; mask_pos++) {

				var sp = this.masks[0].parametrs[0].str.at(mask_pos);
				for (var i = 0; i < this.alphabet.length; i++) {

					if (mask_pos == this.masks[0].parametrs[0].str.length - 1) {
						if (this.masks[0].parametrs[0].type == 2) {
							states[mask_pos].addTransition(new Transition(states[mask_pos].name, this.alphabet[i], states[mask_pos].name));
						} else {
							errors.push(new State(states[mask_pos].name + " Error"));
							states[mask_pos].addTransition(new Transition(states[mask_pos].name, this.alphabet[i], states[mask_pos].name + " Error"));
						}
						continue;
					}

					if (this.alphabet[i] == sp) {
						states.push(new State(states[mask_pos].name + sp));
						states[mask_pos].addTransition(new Transition(states[mask_pos].name, sp, states[mask_pos].name + sp));
					} else {
						errors.push(new State(states[mask_pos].name + " Error"));
						states[mask_pos].addTransition(new Transition(states[mask_pos].name, this.alphabet[i], states[mask_pos].name + " Error"));
					}

				}
			}
		} else {
			for (var mask_pos = 0; mask_pos < this.masks[0].parametrs[0].str.length; mask_pos++) {
				var sp = this.masks[0].parametrs[0].str.at(mask_pos);
				for (var i = 0; i < this.alphabet.length; i++) {

					if (mask_pos == 0) {
						if (this.alphabet[i] == sp) {
							states.push(new State(states[mask_pos].name + sp));
							states[mask_pos].addTransition(new Transition(states[mask_pos].name, sp, states[mask_pos].name + sp));
						} else {
							states[mask_pos].addTransition(new Transition(states[mask_pos].name, this.alphabet[i], states[mask_pos].name));
						}
						continue;
					}

					if (mask_pos == this.masks[0].parametrs[0].str.length - 1) {
						if (this.masks[0].parametrs[0].type == 3) {
							states[mask_pos].addTransition(new Transition(states[mask_pos].name, this.alphabet[i], states[mask_pos].name));
						} else {
							errors.push(new State(states[mask_pos].name + " Error"));
							states[mask_pos].addTransition(new Transition(states[mask_pos].name, this.alphabet[i], states[mask_pos].name + " Error"));
						}
						continue;
					}

					if (this.alphabet[i] == sp) {
						states.push(new State(states[mask_pos].name + sp));
						states[mask_pos].addTransition(new Transition(states[mask_pos].name, sp, states[mask_pos].name + sp));
					} else {
						states[mask_pos].addTransition(new Transition(states[mask_pos].name, this.alphabet[i], states[0].name));
					}

				}
			}
		}
		
		console.log(states);
	}
	
};