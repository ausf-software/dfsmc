var count_mask = 1;

setHide("info_div", "info_selector", "Readme");
setHide("table_div", "answer_table_selector", "Table");

document.getElementById("add-mask").onclick = function(){
	document.getElementById("masks").innerHTML += "<p><label class = 'mask-input'>Mask " + count_mask + ": <input type='text' id='mask-input" + count_mask + "' placeholder='*?a(b)*' onkeydown='if(event.keyCode==13){return false;}'></label>";
	count_mask++;
}

document.getElementById("clear-masks").onclick = function(){
	count_mask = 1;
	document.getElementById("masks").innerHTML = "<p><label class = 'mask-input'>Mask 1: <input type='text' id='mask-input0' placeholder='*?a(b)*' onkeydown='if(event.keyCode==13){return false;}'></label>";
}

document.getElementById("mask-submit").onclick = function(){
	var inputs = [];
	
	for (var i = 0; i < count_mask; i++) {
		inputs.push(document.getElementById("mask-input" + i));
	}
	
	if (isValid(inputs)) {
		document.getElementById("table_div").innerHTML = "<br>";
		
		var masks = [];
		var alphabet = document.getElementById("alphabet-input").value.replaceAll(" ", "").split(",");
		
		for (var i = 0; i < inputs.length; i++) {
			masks.push(getMaskObject(inputs[i].value, 0, 0));
		}
		
		var sm = new DFSM(alphabet, masks);
		
	} else {
		alert("Invalid text");
	}
}

document.getElementById("info_selector").onclick = function(){
	setHide("info_div", "info_selector", "Readme");
}

document.getElementById("answer_table_selector").onclick = function(){
	setHide("table_div", "answer_table_selector", "Table");
}

function setHide(id, name, text) {
	var element = document.getElementById(id);
	if (element.style.display == 'none') {
		element.style.display = '';
		document.getElementById(name).innerHTML = "▼ " + text;
	} else {
		element.style.display = 'none';
		document.getElementById(name).innerHTML = "➤ " + text;
	}
}

function isValid(input) {
	return true || input.value != "" && /^[a-z0-9-+]+$/.test(input.value);
}

function setTypeWork() {
	if (document.getElementById("type_work_selector").checked) {
		document.getElementById("type_work").innerHTML = "The mode of checking for the content of the substring";
	} else {
		document.getElementById("type_work").innerHTML = "The mode of checking for the mandatory absence of a substring";
	}
}
