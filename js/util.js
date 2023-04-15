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