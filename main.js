// H&Z ROSETTE DESIGNER JS
// by Hans
// init 2018.8.1
// last update 2018.10.9

$( function () {






////////// 界面 //////////




// tile初始化
// initTile();
$("#RT").hide();
rosettePreview.init().resize().generate();
$("#RT").show(360);
// setTimeout("selectCell(0)",600);

// selectColor("color1");

// $("#fingerboard").html(SVGFingerboard);


// canvas初始化

setTimeout(function(){
	// preview.create().place();
},600);


$(window).resize(preview.place)





//////////// UI事件封装 /////////////

var callMenuSheet = function() {
	$(".mask").show();
	$(".menu_sheet").show(120);
}

var callActionSheetV = function() {
	$(".mask").show();
	$("#btn_addrow").hide();
	$("#btn_addlinerow").hide();
	$("#btn_addcol").show();
	$("#btn_delrow").hide();
	$("#btn_delcol").show();
	$(".action_sheet").show(120);
	if (Tcol <= 1) {
		$("#btn_delcol").addClass("btn_disabled");
	} else {
		$("#btn_delcol").removeClass("btn_disabled");
	}
};
var callActionSheetH = function() {
	$(".mask").show();
	$("#btn_addrow").show();
	$("#btn_addlinerow").show();
	$("#btn_addcol").hide();
	$("#btn_delrow").show();
	$("#btn_delcol").hide();
	$(".action_sheet").show(120);
	if (Trow <= 1) {
		$("#btn_delrow").addClass("btn_disabled");
	} else {
		$("#btn_delrow").removeClass("btn_disabled");
	}
};


var hideMenuSheet = function() {
	$(".mask").hide();
	$(".menu_sheet").hide();
}

var hideActionSheet = function() {
	$(".mask").hide();
	$(".action_sheet").hide();
}

var hideColorSheet = function() {
	$(".mask").hide();
	$(".color_sheet").hide();
}




////////// 绑定事件 //////////


// $(document).bind("keydown",keyboardOperation);


$(".menu_btn").bind("click",callMenuSheet);



$(".tool_content_4 input").bind("blur", function() {
	// preview.create().place();
});




// 方向键
// $("#key_right").bind("click",cMoveR);
// $("#key_left").bind("click",cMoveL);
// $("#key_up").bind("click",cMoveU);
// $("#key_down").bind("click",cMoveD);




// tile手柄
var place = "";

$("#cell_handle_1").bind("click", function() {
	placeActionSheet($(this));
	callActionSheetV();
	place = "begin";
	return false;
});
$("#cell_handle_2").bind("click", function() {
	placeActionSheet($(this));
	callActionSheetV();
	place = "end";
	return false;
});
$("#cell_handle_3").bind("click", function() {
	placeActionSheet($(this));
	callActionSheetH();
	place = "begin";
	return false;
});
$("#cell_handle_4").bind("click", function() {
	placeActionSheet($(this));
	callActionSheetH();
	place = "end";
	return false;
});



// 定位手柄弹框
var placeActionSheet = function(obj) {
	var b = $(window).height()-obj.offset().top+2,
		r = $(window).width()-obj.offset().left-21,
		m = -74;
	// console.log(b,r,m)
	$(".action_sheet").css({"bottom":b,"right":r,"margin-right":m});
}





// 颜色选择器
$("#btn_color").bind("click", function() {
	$(".mask").show();
	$(".color_sheet").show(120);
	setTimeout(scrolltoCurColor,120);
	return false;
});


// 色表选取
$(".color_sheet .color").bind("click", function() {
	// selectedColor = $(this).attr("id");
	// selectColor(selectedColor);
	setTimeout(hideColorSheet,70);
});






// 行列增删键
$("#btn_addrow").bind("click", function() {
	addRow(place,"mosaic");
	setTimeout(hideActionSheet,70);
	// preview.place();
});
$("#btn_addlinerow").bind("click", function() {
	addRow(place,"line");
	setTimeout(hideActionSheet,70);
	// preview.place();
});
$("#btn_addcol").bind("click", function() {
	addCol(place);
	setTimeout(hideActionSheet,70);
});
$("#btn_delrow").bind("click", function() {
	if (Trow > 1) {
	delRow(place);
	setTimeout(hideActionSheet,70);
	// preview.place();
	};
});
$("#btn_delcol").bind("click", function() {
	if (Tcol > 1) {
	delCol(place);
	setTimeout(hideActionSheet,70);
	};
});



// 弹框遮罩
$(".mask").bind("click", function() {
	hideActionSheet();
	hideColorSheet();
	hideMenuSheet();
});




// 取消cell选取
// $(".tile_box").bind("click", clearSelectCell);







// 取色
// $("#btn_eyedropper").bind("click", pickColor);

// 填色按钮
$("#btn_fillcolor").bind("click", function() {
	fillColor();
	return false;
});




// 材质切换
$(".tool_content_4 .line1 .btn").bind("click", function() {
	$(".tool_content_4 .line1 .btn").removeClass("btn_select");
	$(this).addClass("btn_select");
	switch ($(this).attr("id")) {
		case "top_s":
			defaultColor = "color1";
			$(".default_color").removeClass("color2").addClass(defaultColor);
			break;
		case "top_c":
			defaultColor = "color2";
			$(".default_color").removeClass("color1").addClass(defaultColor);
			break;
	}
});


// 漆色开关
$("#shellac_varnish_switch").bind("click",function() {
	switch (shellac) {
		case false:
			$("#shellac_varnish_switch").addClass("form_switch_on");
			shellac = true;
			$("body").removeClass("oric").addClass("shellac");
			break;
		case true:
			$("#shellac_varnish_switch").removeClass("form_switch_on");
			shellac = false;
			$("body").removeClass("shellac").addClass("oric");
			break;
	}
});


// 指板开关
$("#fingerboard_switch").bind("click",function() {
	switch (showfb) {
		case false:
			$("#fingerboard_switch").addClass("form_switch_on");
			showfb = true;
			$("#fingerboard").css("opacity",1);
			break;
		case true:
			$("#fingerboard_switch").removeClass("form_switch_on");
			showfb = false;
			$("#fingerboard").css("opacity",0);
			break;
	}
});


// 数字input加减
$("#mosaicW .number_m").bind("click",function() {
	var v = $(this).siblings("input").val();
	v = inputStepMinus(v,.1,.1);
	$(this).siblings("input").val(v);
	// RosetteTile[curCell.part].cellW = v;
	setTile();
	// selectCell(curCell);
	// preview.update();
});
$("#mosaicW .number_a").bind("click",function() {
	var v = $(this).siblings("input").val();
	v = inputStepAdd(v,.1,10);
	$(this).siblings("input").val(v);
	// RosetteTile[curCell.part].cellW = v;
	setTile();
	// selectCell(curCell);
	// preview.update();
});

$("#mosaicH .number_m").bind("click",function() {
	var v = $(this).siblings("input").val();
	v = inputStepMinus(v,.1,.1);
	$(this).siblings("input").val(v);
	// RosetteTile[curCell.part].cellH = v;
	setTile();
	// selectCell(curCell);
	// preview.update();
});
$("#mosaicH .number_a").bind("click",function() {
	var v = $(this).siblings("input").val();
	v = inputStepAdd(v,.1,10);
	$(this).siblings("input").val(v);
	// RosetteTile[curCell.part].cellH = v;
	setTile();
	// selectCell(curCell);
	// preview.update();
});

$("#lineT .number_m").bind("click",function() {
	var v = $(this).siblings("input").val();
	v = inputStepMinus(v,.1,.1);
	$(this).siblings("input").val(v);
	// RosetteTile[curCell.part].thickness = v;
	setTile();
	// selectCell(curCell);
	// preview.update();
});
$("#lineT .number_a").bind("click",function() {
	var v = $(this).siblings("input").val();
	v = inputStepAdd(v,.1,10);
	$(this).siblings("input").val(v);
	// RosetteTile[curCell.part].thickness = v;
	setTile();
	// selectCell(curCell);
	// preview.update();
});

//////

$("#soundholeD .number_m").bind("click",function() {
	var v = $(this).siblings("input").val();
	v = inputStepMinus(v,1,0);
	$(this).siblings("input").val(v);
	// preview.update();
});
$("#soundholeD .number_a").bind("click",function() {
	var v = $(this).siblings("input").val();
	v = inputStepAdd(v,1,150);
	$(this).siblings("input").val(v);
	// preview.update();
});

$("#soundholePadding .number_m").bind("click",function() {
	var v = $(this).siblings("input").val();
	v = inputStepMinus(v,.1,0);
	$(this).siblings("input").val(v);
	// preview.update();
});
$("#soundholePadding .number_a").bind("click",function() {
	var v = $(this).siblings("input").val();
	v = inputStepAdd(v,.1,100);
	$(this).siblings("input").val(v);
	// preview.update();
});





// 工具栏tab
$(".tool_tab").bind("click", function () {
	$(".tool_tab").removeClass("tool_tab_current");
	$(this).addClass("tool_tab_current");
	var s = $(this).attr("id").match(/\d+/);
	$(".tool_content").removeClass("tool_content_current");
	$(".tool_content_"+s).addClass("tool_content_current");
	if (s=="2") {
		// selectCell(curCell);
		$(".cell_handle").show();
		// $(document).bind("keydown",keyboardOperation);
	} else {
		// clearSelectCell();
		$(".cell_handle").hide();
		$(document).unbind("keydown");
	};
});




// 菜单
$("#menuExportData").bind("click", function() {
	hideMenuSheet();
	// var HZRObj = {HZRData : RosetteTile};
	var HZRJSON = JSON.stringify(HZRObj);
	prompt("当前设计数据如下，请复制 - HZ Rosette Designer",HZRJSON);
});
$("#menuClear").bind("click", function() {
	var confirm = window.confirm("清空了就回不来了哦");
	if (confirm) {
		window.location.reload();
	}
});





});