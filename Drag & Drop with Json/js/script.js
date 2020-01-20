var mainScript = function(initObjs){
	var _this = this;
	
	_this.submitButton = initObjs.submitBtn;
	_this.resetBtn = initObjs.resetBtn;
	_this.inputField1 = initObjs.inputField1;
	_this.inputField2 = initObjs.inputField2;
	_this.frontPg = initObjs.frontPg;
	_this.mainPg = initObjs.mainPage;
	
	_this.data = initObjs.data;
	
	_this.dragContainer = initObjs.dragCont;
	_this.dropContainer = initObjs.dropCont;
	_this.dropCount = 0;
	_this.countArr = [];
	_this.dragArr = [];
	_this.getPosition = [];
	_this.nameArray = [];
	_this.checkAnsArr = [];
	_this.wrongAnswersArr = [];
	_this.isCorrectlyDropped = false;
	_this.draggedCount = 0;
	_this.isAllhaveChild = false;
	var d1 = _this.data.dragData.length ,d2 =_this.data.dropData.length;
	
	this.init = function(){
		_this.submitButton.attr("disabled", true);
		_this.addEvents();
		console.log("Data : ",_this.data);
	} 

	this.addEvents = function(){
		_this.submitButton.off("click").on("click",_this.OnStartClick);
		_this.resetBtn.off("click").on("click",_this.OnReStartClick);
		_this.createBox(d1,d2);
	}
	this.OnStartClick = function(){
		console.log("Submit Clicked");
		_this.checkChild();
		
		console.log("Answers Array is : " ,_this.checkAnsArr);
		console.log("Wrong Anser Array : ",_this.wrongAnswersArr);
		$.each(_this.checkAnsArr,function(i,val){
			val.css('background','Green');
		})
		
		$.each(_this.wrongAnswersArr,function(i,val){
			val.css('background','red');
		})
		
		_this.disableDrag();
		_this.draggedCount = 0;
	}
	this.disableDrag = function(){
		for(let i=0; i<d2; i++){
			$('#P_'+[i+1]).draggable({ disabled: true });
		}
	}
	this.OnReStartClick = function(){
		_this.submitButton.attr("disabled", true);
		for(let i=0; i<d1; i++){
			$('#P_'+[i+1]).appendTo($('#BOX_'+[i+1]));
			$('#P_'+[i+1]).css('background','#47739a');
			$('#P_'+[i+1]).draggable({ disabled: false });
		}
		_this.checkAnsArr = [];
		_this.wrongAnswersArr = [];

	}
	
	this.checkChild = function(){
		console.log("chekc")
		for(let i=0;i<d2; i++){
			let x1 = $('#con_'+[i+1]).attr('key');
			let child = $('#con_'+[i+1]).children();
			let y1 = child.attr('bay');
			console.log('||||||',x1,y1);
			
			if(x1 == y1){
				_this.checkAnsArr.push(child);
			}
			else{
				_this.wrongAnswersArr.push(child);
			}
			
		}
	}
	
	this.createBox = function(d1,d2){
		console.log(d1,d2);
		for(let i=0; i<d2; i++){
			_this.dropContainer.append("<div id=con_"+[i+1]+" key="+_this.data.dropData[i].id+" class='dragDestination'>"+_this.data.dropData[i].text+"</div>");
			
		}
		for(let i=0; i<d1; i++){
			_this.dragContainer.append("<div id=BOX_"+[i+1]+" class='dragSource'><p  bay="+_this.data.dragData[i].answer+" name=BOX_"+[i+1]+" class='dragElements' id=P_"+[i+1]+">"+_this.data.dragData[i].text+"</p></div>");
			let temp = $('#BOX_'+[i+1]+'').attr('id');
			_this.getPosition.push(temp);
		}
		
		$(".dragElements").draggable({
			appendTo: "body",
			containment : $('.ad_div'),
			start: function(){
				$(this).css({"opacity":"0.5","z-index":"999"});
				_this.draggedCount = 0;
				_this.isAllhaveChild = false;
				_this.submitButton.attr("disabled", true);
				console.log(_this.draggedCount);
			},
			drag : function(){
				_this.isCorrectlyDropped = false;
				console.log(_this.draggedCount);
			},
			stop : function(event, ui){
				$(this).css({"opacity": "1","position":"relative","top" : "0px","left" : "0px","z-index":"1"});
				if(_this.isCorrectlyDropped){
					console.log('CORRECT DROP');				
				}else{
					console.log('INCORRECT DROP');
					let dragingElem = this;
					_this.revertElement(dragingElem);
				}
				_this.checkAns();
			}
		});
		
		$('.dragDestination').droppable({
			drop : function(event,ui){
				_this.isCorrectlyDropped = true;
				$(ui.draggable).appendTo(this);
				$(ui.draggable).css({"left": "0px","top":"0px"});
				
				let draggingElem = ui.draggable;
				let temp = $(this);
				_this.testfun(draggingElem,temp);
			}
		})
	}
	
		this.testfun = function(draggingElem,targetPlace){
			var len = targetPlace.children().length;
			console.log(len);

			if(len == 2){
				var children = targetPlace.children();
				console.log("too many element not allowed");
				let target = children[0];
				_this.revertElement(target);
			}else{
				console.log("Go on");
			}
			
		}
		
		this.revertElement = function(curElem){
			console.log(curElem);
			var curElemName = curElem.id;
			var x = $('#'+curElemName).attr('name');
			let	arrLen = _this.getPosition.length;
			$.each(_this.getPosition,function(i,val){
				if(x == val){
					console.log(x,val,curElem,"ok then");
					$('#'+curElemName+'').appendTo($('#'+val+''));
				}
			});
		}
		
		this.checkAns = function(){
			for(let i=0; i<d2; i++){
				let temp = $('#con_'+[i+1]).children().length;
				if(temp == 1){
					_this.draggedCount +=1;
				}
			}
			console.log("No of draggable element in container",_this.draggedCount);
			if(_this.draggedCount == d2){
				_this.submitButton.attr("disabled", false);
			}
			/* if(_this.isAllhaveChild){
				
			} */
			/* let x1 = dragP.attr('bay');
			let y1 = dropP.attr('key');
			console.log(x1,y1);
			
	
			if(x1 == y1){
				_this.checkAnsArr.push(dragP);
			} */
			
		}
}
