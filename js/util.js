function getMaskObject(str, type_logic, type_content) {
	var params = [];
	var strs;
	var flagS = false;
	var flagE = false;
	
	if (str.at(0) == '*') {
		str = str.replace("*", "");
		flagS = true;
	}
	
	if (str.at(str.length - 1) == '*') {
		str = str.slice(0, -1);
		flagE = true;
	}
	
	strs = str.split("*");
	
	for (var i = 0; i < strs.length; i ++) {
		if (i == 0) {
			if (strs.length == 1) {
				if (!flagE && !flagS) 	params.push(new MaskParametr(strs[i], 0));
				if (flagS && !flagE) 	params.push(new MaskParametr(strs[i], 1));
				if (!flagS && flagE) 	params.push(new MaskParametr(strs[i], 2));
				if (flagE && flagS) 	params.push(new MaskParametr(strs[i], 3));
			} else {
				if (!flagS)		params.push(new MaskParametr(strs[i], 2));
				if (flagS) 		params.push(new MaskParametr(strs[i], 3));
			}
			continue;
		}
		
		if (i == strs.length - 1) {
			if (!flagE) 	params.push(new MaskParametr(strs[i], 1));
			if (flagE) 		params.push(new MaskParametr(strs[i], 3));
			continue;
		}
		
		params.push(new MaskParametr(strs[i], 3));
	}

	return new Mask(params, type_logic, type_content);
}

function getStateError(name, alphabet) {
	var st = new State(name);
	for (var i = 0; i < alphabet.length; i++) {
		st.addTransition(new Transition(st.name, alphabet[i], st.name));
	}
	return st;
}

function calculateErrorState(one_error_state, errors, state, _char, alphabet) {
	if (!one_error_state) {
		console.log(state);
		errors.push(getStateError(state.name + " Error", alphabet));
		state.addTransition(new Transition(state.name, _char, state.name + _char + " Error"));
	} else {
		if (errors.length == 0) {
			errors.push(getStateError("Error", alphabet));
		}
		state.addTransition(new Transition(state.name, _char, "Error"));
	}
}

function createStateTransition(states, state, _char) {
	states.push(new State(state.name + _char));
	state.addTransition(new Transition(state.name, _char, state.name + _char));
}

function getStateOfMaskPos(states, mask_pos, start) {
	return mask_pos == -1 ? start : states[mask_pos];
}