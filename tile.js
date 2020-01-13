// H&Z ROSETTE DESIGNER JS
// by Hans
// init 2018.8.7
// last update 2018.8.20




var RosetteTile = new Array();


var curCell = {
	part : 0,//模块序号
	tdn : 0//总序号
};

// var defaultColor = "color1";
var selectedColor = "color1";
var shellac = false; // 虫胶漆效果


var mm2px = 10; // 比例尺





RosetteTile = [
	{
		type : "line",
		thickness : .8,
		color : "color5"
	},
	{
		type : "line",
		thickness : .3,
		color : "color1"
	},
	{
		type : "line",
		thickness : .8,
		color : "color5"
	},
	{
		type : "line",
		thickness : .3,
		color : "color1"
	},
	{
		type : "mosaic",
		cellW : .8,
		cellH : .8,
		col : 8,
		row : 6,
		color : ["color1","color1","color1","color1","color1","color1","color1","color1","color1","color1","color1","color1","color1","color1","color1","color1","color1","color1","color1","color1","color1","color1","color1","color1","color1","color1","color1","color1","color1","color1","color1","color1","color1","color1","color1","color1","color1","color1","color1","color1","color1","color1","color1","color1","color1","color1","color1","color1"]
	},
	{
		type : "line",
		thickness : .3,
		color : "color1"
	},
	{
		type : "mosaic",
		cellW : .8,
		cellH : .8,
		col : 8,
		row : 6,
		color : ["color1","color1","color1","color1","color1","color1","color1","color1","color1","color1","color1","color1","color1","color1","color1","color1","color1","color1","color1","color1","color1","color1","color1","color1","color1","color1","color1","color1","color1","color1","color1","color1","color1","color1","color1","color1","color1","color1","color1","color1","color1","color1","color1","color1","color1","color1","color1","color1"]
	},
	{
		type : "line",
		thickness : .3,
		color : "color1"
	},
	{
		type : "line",
		thickness : .8,
		color : "color5"
	},
	{
		type : "line",
		thickness : .3,
		color : "color1"
	},
	{
		type : "line",
		thickness : .8,
		color : "color5"
	}
]


/*var initTile = function() {
	for (i=0; i<Tcol*Trow; i++) {
		Tcell[i]=defaultColor;
	}
	// writeRT(0,"mosaic");
};*/


var refreshCanvas = function() {
	var tileH = 0,
		soundholeD = parseFloat($("#soundholeD input").val()),
		soundholePadding = parseFloat($("#soundholePadding input").val());

	for (var i = 0; i <= RosetteTile.length - 1; i++) {
		switch (RosetteTile[i].type) {
			case "mosaic" :
				tileH += parseFloat(RosetteTile[i].cellH * RosetteTile[i].row);
				break;
			case "line" :
				tileH += parseFloat(RosetteTile[i].thickness);
				break;
		}
	}
	$(".pad_preview").html("<canvas id='rosette' width='1600' height='1600'></canvas>");
	var c=document.getElementById("rosette");
	var ctx=c.getContext("2d");
	
	// 圈底色-外
	ctx.globalCompositeOperation="source-over";
	ctx.fillStyle="#fff";
	ctx.arc(800,800,(soundholeD+soundholePadding+tileH*2)*5,0,2*Math.PI);
	ctx.fill();
	// 圈底色-内-布尔减
	ctx.globalCompositeOperation="destination-out";
	ctx.fillStyle="";
	ctx.beginPath();
	ctx.arc(800,800,(soundholeD+soundholePadding)*5,0,2*Math.PI);
	ctx.fill();
	// 音孔
	ctx.globalCompositeOperation="source-over";
	ctx.fillStyle="#170608";
	ctx.beginPath();
	ctx.arc(800,800,soundholeD*5,0,2*Math.PI);
	ctx.fill();
}

var resizeCanvas = function () {
	var winW = $(window).width();
		winH = $(window).height();
	var ch = winH - $(".pad_tool").outerHeight();
	// console.log($(".pad_tool").outerHeight())
	var ml;
	if (winW < ch) {
		ml = (winW - ch) / 2;
	} else {
		ml = "auto";
	}
	$("#rosette").css({height:ch,marginLeft:ml});
}




var RT = {

	count : function() {return $("#RT td").size()},

	partStartIndex : function(partn) {
		var startn = 0;
		for (var i = 0; i < partn; i++) {
			switch (RosetteTile[i].type) {
			case "mosaic":
				startn += RosetteTile[i].col * RosetteTile[i].row;
				break;
			case "line":
				startn ++;
				break;
			}
		}
		return startn;
	},

	clear : function() {
		$("#RT").html("");
		return RT;
	},

	creatMosaic : function(place,n,obj) {
		var html = "<table id='tilePart"+n+"'>";
		for (r=0;r<=obj.row-1;r++) {
			html += "<tr>";
			for (c=0;c<=obj.col-1;c++) {
				var n=r*obj.col+c;
				html += "<td class='"+obj.color[n];
				html += "' style='";
				html += "width:"+obj.cellW*mm2px+"px;";
				html += "height:"+obj.cellH*mm2px+"px;";
				html += "'></td>";
			};
			html += "</tr>";
		};
		html += "</table>";

		switch (place) {
			case "begin":
				$("#RT").prepend(html);
				break;
			case "end":
				$("#RT").append(html);
				break;
		}
	},

	creatLine : function(place,n,obj) {
		var html = "<table id='tilePart"+n;
		html += "' width='100%'>";
		html += "<tr><td class='"+obj.color;
		html += "' style='";
		html += "height:"+obj.thickness*mm2px+"px;";
		html += "'></td></tr></table>";

		switch (place) {
			case "begin":
				$("#RT").prepend(html);
				break;
			case "end":
				$("#RT").append(html);
				break;
		}
	},
	
	insert : function(place,obj) {
		switch (place) {
			case "begin":
				RosetteTile.splice(0,0,obj);
				break;
			case "end":
				RosetteTile.push(obj);
				break;
		}
	},

	replace : function(n,obj) {
		RosetteTile[n] = obj;
	}
}




var tdClick = function() {
	// 切换tab
	if ( $(".tool_tab_current").attr("id").match(/\d+/) != 2 ) {
		$(".tool_tab").removeClass("tool_tab_current");
		$("#tool_tab_2").addClass("tool_tab_current");
		$(".tool_content").removeClass("tool_content_current");
		$(".tool_content_2").addClass("tool_content_current");
		$(".cell_handle").show();
		$(document).bind("keydown",keyboardOperation);
	}
	// 选择td
	clearSelectCell();
	curCell.tdn = $("#RT td").index($(this));
	curCell.part = parseInt($(this).parents("table").attr("id").match(/\d+/));
	selectCell();
	return false;
}



var setTile = function() {
	RT.clear();
	for (var i = 0; i <= RosetteTile.length - 1; i++) {
		switch (RosetteTile[i].type) {
			case "mosaic" :
				RT.creatMosaic("end",i,RosetteTile[i]);
				break;
			case "line" :
				RT.creatLine("end",i,RosetteTile[i]);
				break;
		}
	}
	// 绑定cell点击
	$("#RT td").bind("click",tdClick);
};





//////////// cell 样式 ////////////

// 填色
var fillColor = function() {
	var RTcp = RosetteTile[curCell.part],
		startn = RT.partStartIndex(curCell.part);
	// 应用
	switch (RTcp.type) {
		case "line":
			RTcp.color = selectedColor;
			break;
		case "mosaic":
			RTcp.color[curCell.tdn-startn] = selectedColor;
			break;
	}
	setTile();
	selectCell();
};


// 选择颜色
var selectColor = function(colorId) {
	selectedColor = colorId;
	$(".color_sheet .color").removeClass("current_color");
	$("#"+colorId).addClass("current_color");
	$(".tool_content_2 .color_preview").removeClass().addClass("color_preview "+colorId);
}

// 滚动到颜色
var scrolltoCurColor = function(t) {
	var csn = $(".current_color").attr("id").match(/\d+/);
	if (t) {
		$(".color_sheet").stop().animate({
			scrollTop: ($(".color_sheet .color").height()+25)*(csn-1)-$(".color_sheet").height()*.5+25
		}, t);
	} else {
		$(".color_sheet").scrollTop(($(".color_sheet .color").height()+25)*(csn-1)-$(".color_sheet").height()*.5+25);
	}
}

// 取色
var pickColor = function() {
	var startn = RT.partStartIndex(curCell.part),
		n = curCell.tdn-startn;
	switch (RosetteTile[curCell.part].type) {
		// 获取颜色id
		case "mosaic":
			var colorid = RosetteTile[curCell.part].color[n];
			break;
		case "line":
			var colorid = RosetteTile[curCell.part].color;
			break;
	}
	selectColor(colorid);
}






/////////// cell 选择 ///////////

var selectCell = function() {
	var startn = RT.partStartIndex(curCell.part),
		n = curCell.tdn-startn;
	$("#RT td").eq(curCell.tdn).addClass("current_cell");
	// 显示信息
	$("#part_type").html(RosetteTile[curCell.part].type);
	$("#part_num").html(curCell.part+1);
	switch (RosetteTile[curCell.part].type) {
		case "mosaic":
			// 计算坐标
			var row = RosetteTile[curCell.part].row,
				col = RosetteTile[curCell.part].col,
				x,y;
			x = n%col+1;
			y = Math.floor(n/col)+1;
			$("#cell_coordinate").show().html("(<span>"+x+"</span>,<span>"+y+"</span>)");
			// 获取颜色id
			var colorid = RosetteTile[curCell.part].color[n];
			// 填充尺寸到input
			$("#mosaicW input").val(RosetteTile[curCell.part].cellW)
			$("#mosaicH input").val(RosetteTile[curCell.part].cellH)
			// 切换style表单
			$("#lineT").parent(".line").hide();
			$("#mosaicW").parent(".line").show();
			$("#mosaicH").parent(".line").show();
			break;
		case "line":
			// 计算坐标
			$("#cell_coordinate").hide();
			// 获取颜色id
			var colorid = RosetteTile[curCell.part].color;
			// 填充尺寸到input
			$("#lineT input").val(RosetteTile[curCell.part].thickness)
			// 切换style表单
			$("#mosaicW").parent(".line").hide();
			$("#mosaicH").parent(".line").hide();
			$("#lineT").parent(".line").show();
			break;
	}
	// 显示颜色名
	$("#part_color").html($("#"+colorid).children(".color_name").html());
};

var clearSelectCell = function() {
	$("#RT td").removeClass("current_cell");
}




var cMoveR = function() {
	if (curCell.tdn < RT.count()-1) {
		curCell.tdn ++;
		clearSelectCell();
		selectCell(curCell);
		curCell.part = parseInt($(".current_cell").parents("table").attr("id").match(/\d+/));
	};
	return false;
};

var cMoveL = function() {
	if (curCell.tdn > 0) {
		curCell.tdn --;
		clearSelectCell();
		selectCell(curCell);
		curCell.part = parseInt($(".current_cell").parents("table").attr("id").match(/\d+/));
	};
	return false;
};

var cMoveU = function() {
	var col = RosetteTile[curCell.part].col,
		startn = RT.partStartIndex(curCell.part);
	switch (RosetteTile[curCell.part].type) {
		case "mosaic":
			if (curCell.tdn-startn > col-1) {
				curCell.tdn -= col;
			} else {
				curCell.part --;
				curCell.tdn = startn - 1;
			};
			break;
		case "line":
			if (curCell.tdn > 0) {
				curCell.part --;
				curCell.tdn --;
			}
			break;
	}
	clearSelectCell();
	selectCell(curCell);
	return false;
};

var cMoveD = function() {
	var col = RosetteTile[curCell.part].col,
		startn = RT.partStartIndex(curCell.part),
		pCount = $(".current_cell").parents("table").find("td").length;
	switch (RosetteTile[curCell.part].type) {
		case "mosaic":
			if (curCell.tdn-startn <= pCount-col-1) {
				curCell.tdn += col;
			} else {
				curCell.part ++;
				curCell.tdn = pCount + startn;
			};
			break;
		case "line":
			if (curCell.tdn < RT.count()-1) {
				curCell.part ++;
				curCell.tdn ++;
			}
			break;
	}
	clearSelectCell();
	selectCell(curCell);
	return false;
};









/////////////// 行列增删 ///////////////

var addRow = function(place,type) {
	console.log("➕ addRow");
	if (type=="mosaic") {
		if (place=="begin") {
			Trow ++;
			for (i=Tcol;i>0;i--) {
				Tcell.splice(0,0,defaultColor);
			};
			setTile();
			curCell += Tcol;
			selectCell(curCell);
		} else if (place=="end") {
			Trow ++;
			for (i=Tcol;i>0;i--) {
				Tcell.splice(Trow*Tcol-1,0,defaultColor);
			};
			setTile();
			selectCell(curCell);
		}
	};
	refreshCanvas();
};
var addCol = function(place) {
	console.log("➕ addCol");
	if (place=="begin") {
		curCell+=Math.floor(curCell/Tcol)+1;
		Tcol ++;
		for (var i=0; i <= Trow - 1; i++) {
			Tcell.splice(i*Tcol,0,defaultColor);
		}
		setTile();
		selectCell(curCell);
	} else if (place=="end") {
		curCell+=Math.floor(curCell/Tcol);
		Tcol ++;
		for (var i=1; i <= Trow; i++) {
			Tcell.splice(i*Tcol-1,0,defaultColor);
		}
		setTile();
		selectCell(curCell);
	};
};
var delRow = function(place) {
	console.log("➖ delRow");
	if (Trow > 1) {
	if (place=="begin") {
		if (curCell+1>=Tcol) {
			curCell -= Tcol;
		}
		Trow --;
		Tcell.splice(0,Tcol);
		setTile();
		selectCell(curCell);
	} else if (place=="end") {
		if (curCell+1>=Tcol*(Trow-1)) {
			curCell -= Tcol;
		}
		Trow --;
		Tcell.splice(-Tcol,Tcol);
		setTile();
		selectCell(curCell);
	};
	};
	refreshCanvas();
};
var delCol = function(place) {
	console.log("➖ delCol");
	if (Tcol > 1) {
	if (place=="begin") {
		curCell-=Math.ceil(curCell/Tcol);
		Tcol --;
		for (var i=0; i <= Trow - 1; i++) {
			Tcell.splice(i*Tcol,1);
		}
		setTile();
		selectCell(curCell);
	} else if (place=="end") {
		curCell-=Math.floor((curCell+1)/Tcol);
		Tcol --;
		for (var i=1; i <= Trow; i++) {
			Tcell.splice(i*Tcol,1);
		}
		setTile();
		selectCell(curCell);
	};
	};
};





// 数字input加减
var inputStepAdd = function(curVal,step,max) {
	if (!curVal || !step) {
		console.error("inputStepAdd: 入参错误")
	}
	else if (curVal < max) {
		curVal = parseFloat(curVal);
		curVal += step;
		var d = String(step).indexOf(".") + 1;//获取小数点的位置
		var count = d ? String(step).length - d : 0;//获取小数点后的个数
		curVal = curVal.toFixed(count);
	}
	return curVal;
}
var inputStepMinus = function(curVal,step,min) {
	if (!curVal || !step) {
		console.error("inputStepAdd: 入参错误")
	}
	else if (curVal > min) {
		curVal = parseFloat(curVal);
		curVal -= step;
		var d = String(step).indexOf(".") + 1;//获取小数点的位置
		var count = d ? String(step).length - d : 0;//获取小数点后的个数
		curVal = curVal.toFixed(count);
	}
	return curVal;
}




// 键盘操作
var keyboardOperation = function (event) {
	switch (event.keyCode) {
	case 37:
		cMoveL();
		break;
	case 38:
		cMoveU();
		break;
	case 39:
		cMoveR();
		break;
	case 40:
		cMoveD();
		break;
	case 13:
		fillColor();
		break;
	case 32:
		fillColor();
		break;
	case 8:// backspace
		pickColor();
		break;
	case 9:// tab
		event.preventDefault();
		var csn = parseInt(selectedColor.match(/\d+/));
		csn = csn >= 8 ? 1 : csn + 1;
		selectedColor = "color"+csn;
		selectColor(selectedColor);
		scrolltoCurColor(240);
		break;
	};
}



