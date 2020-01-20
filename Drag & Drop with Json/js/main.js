$(document).ready(function(){
	var submitBtn = $('#submit');

	var initObjs = {
		submitBtn : submitBtn,
		resetBtn : $('#reset'),
		inputField1 : $('#inputBox1'),
		inputField2 : $('#inputBox2'),
		frontPg : $('.front'),
		mainPage : $('.dragPage'),
		dragCont : $('.dragContainer'),
		dropCont : $('.dropContainer'),
		
		data : dataArr
	}

	var obj = new mainScript(initObjs);
	obj.init();
})