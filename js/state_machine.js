class DFSM {
	
	alphabet;
	masks;
	one_error_state;

    constructor (alphabet, masks, one_error_state) {
		this.alphabet = alphabet;
		this.masks = masks;
		this.one_error_state = one_error_state;
		console.log(masks);
	}
	
	calculateStates() {

		var start = new State("");
		var states = [];
		var errors = [];

		var type_param = this.masks[0].parametrs[0].type == 0 || this.masks[0].parametrs[0].type == 2;
		var current_param = this.masks[0].parametrs[0];
		var curent_param_iter = current_param.str.length;

		// -1 т.к. нужно проверить переходы состояния которое было до маски
		for (var mask_pos = -1; mask_pos < curent_param_iter; mask_pos++) {
			var sp = current_param.str.at(mask_pos + 1);

			for (var i = 0; i < this.alphabet.length; i++) {
				if (type_param) {
	
					if (mask_pos == curent_param_iter - 1) {
						if (current_param.type == 2) {
							states[mask_pos].addTransition(new Transition(states[mask_pos].name, this.alphabet[i], states[mask_pos].name));
						} else {
							calculateErrorState(this.one_error_state, errors, states[mask_pos], this.alphabet[i], this.alphabet);
						}
						continue;
					}
	
					if (this.alphabet[i] == sp) {
						createStateTransition(states, getStateOfMaskPos(states, mask_pos, start), sp);
					} else {
						calculateErrorState(this.one_error_state, errors, getStateOfMaskPos(states, mask_pos, start), this.alphabet[i], this.alphabet);
					}
	
				} else {
	
					if (mask_pos == 0) {
						if (this.alphabet[i] == sp) {
							createStateTransition(states, getStateOfMaskPos(states, mask_pos, start), sp);
						} else {
							if (curent_param_iter != 1) {
								states[mask_pos].addTransition(new Transition(states[mask_pos].name, this.alphabet[i], start.name));
							} else {
								states[mask_pos].addTransition(new Transition(states[mask_pos].name, this.alphabet[i], states[mask_pos].name));
							}
						}
						continue;
					}
	
					if (mask_pos == curent_param_iter - 1) {
						if (current_param.type == 3) {
							states[mask_pos].addTransition(new Transition(states[mask_pos].name, this.alphabet[i], states[mask_pos].name));
						} else {
							calculateErrorState(this.one_error_state, errors, states[mask_pos], this.alphabet[i], this.alphabet);
						}
						continue;
					}
	
					if (this.alphabet[i] == sp) {
						createStateTransition(states, getStateOfMaskPos(states, mask_pos, start), sp);
					} else {
						getStateOfMaskPos(states, mask_pos, start).addTransition(new Transition(getStateOfMaskPos(states, mask_pos, start).name, this.alphabet[i], start.name));
					}
	
				}
			}

		}
		
		console.log(errors);
		console.log(states);
	}
	
};