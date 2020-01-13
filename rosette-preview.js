// H&Z ROSETTE DESIGNER JS
// by Hans
// init 2019.8.12
// last update 2019.8.16
// version beta 3.0

// $( function () {

var HZRosette = {};

/*
var curCell = {
	part : 0,//模块号
	tdn : 0//td总序号
};*/

// var defaultColor = "color1";
// var selectedColor = "color1";
var shellacMode = false, // 虫胶漆效果
	showfb = false; // 指板预览


var canvasDimention = 135, // 画布宽高（mm）正方形；init会自动设置
	previewScale = 4; // 比例尺 px:mm

var inlayAccuracy = .07;


var currentR;
var rcX, rcY;




var SVGFingerboard = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/" x="0px" y="0px" width="185.33px" height="429px" viewBox="0 0 185.33 429" style="enable-background:new 0 0 185.33 429;" xml:space="preserve"><style type="text/css">.st0{opacity:0;fill:#D500E7;}.st1{fill:#1A1717;}.st2{fill:#383232;}.st3{fill:url(#SVGID_1_);}.st4{fill:url(#SVGID_2_);}.st5{fill:url(#SVGID_3_);}.st6{fill:url(#SVGID_4_);}.st7{fill:url(#SVGID_5_);}.st8{fill:url(#SVGID_6_);}.st9{fill:url(#SVGID_7_);}.st10{fill:url(#SVGID_8_);}.st11{fill:none;stroke:#FFFFFF;stroke-linecap:round;stroke-miterlimit:10;}.st12{fill:#F0E7D2;}.st13{fill:#302B2A;}.st14{fill:#262323;}.st15{fill:#5C5140;}.st16{fill:#696050;}.st17{opacity:0.1;fill:#FFFFFF;}.st18{opacity:0.3;fill:#FFFFFF;}.st19{opacity:0.5;fill:#FFFFFF;}.st20{opacity:0.7;fill:#FFFFFF;}.st21{opacity:0.9;fill:#FFFFFF;}.st22{fill:#FFFFFF;}.st23{fill:url(#SVGID_9_);}.st24{fill:url(#SVGID_10_);}.st25{fill:url(#SVGID_11_);}.st26{fill:url(#SVGID_12_);}.st27{fill:url(#SVGID_13_);}.st28{fill:url(#SVGID_14_);}.st29{fill:url(#SVGID_15_);}.st30{fill:url(#SVGID_16_);}</style><defs></defs><g><rect y="6.95" class="st0" width="185.33" height="399.72"/><polygon class="st1" points="13.02,354.84 172.32,354.84 171.74,322.42 13.59,322.42 "/><polygon class="st1" points="14.24,285.81 171.1,285.81 170.59,257.11 14.75,257.11 "/><polygon class="st1" points="166.16,6.95 19.17,6.95 18.37,51.97 166.96,51.97 "/><polygon class="st1" points="15.46,216.66 169.87,216.66 169.29,183.83 16.04,183.83 "/><polygon class="st1" points="16.13,178.91 169.2,178.91 168.59,144.02 16.75,144.02 "/><polygon class="st1" points="14.83,252.19 170.5,252.19 169.96,221.57 15.37,221.57 "/><polygon class="st1" points="13.68,317.51 171.66,317.51 171.18,290.72 14.15,290.72 "/><polygon class="st1" points="17.49,101.7 16.83,139.1 168.5,139.1 167.84,101.7 "/><polygon class="st1" points="167.05,56.88 18.29,56.88 17.58,96.79 167.75,96.79 "/><g><image style="overflow:visible;opacity:0.15;" width="175" height="429" xlink:href="data:image/png;base64,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" transform="matrix(1 0 0 1 8.9263 0)"></image><g><polygon class="st1" points="12.32,422.28 19.66,7.45 165.67,7.45 173.01,422.28 "/><path class="st2" d="M165.18,7.95l7.32,413.84H12.83L20.15,7.95H165.18 M166.16,6.95H19.17l-7.36,415.84h161.71L166.16,6.95L166.16,6.95z"/></g></g><linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="92.6668" y1="56.8814" x2="92.6668" y2="51.9657"><stop  offset="0.38" style="stop-color:#9D8D71"/><stop  offset="0.68" style="stop-color:#E3D0A6"/></linearGradient><polygon class="st3" points="166.96,51.97 18.37,51.97 18.29,56.88 167.05,56.88 "/><linearGradient id="SVGID_2_" gradientUnits="userSpaceOnUse" x1="92.6667" y1="101.7036" x2="92.6667" y2="96.7879"><stop  offset="0.38" style="stop-color:#9D8D71"/><stop  offset="0.68" style="stop-color:#E3D0A6"/></linearGradient><polygon class="st4" points="167.75,96.79 17.58,96.79 17.49,101.7 167.84,101.7 "/><linearGradient id="SVGID_3_" gradientUnits="userSpaceOnUse" x1="92.6667" y1="144.0188" x2="92.6667" y2="139.1031"><stop  offset="0.38" style="stop-color:#9D8D71"/><stop  offset="0.68" style="stop-color:#E3D0A6"/></linearGradient><polygon class="st5" points="16.75,144.02 168.59,144.02 168.5,139.1 16.83,139.1 "/><linearGradient id="SVGID_4_" gradientUnits="userSpaceOnUse" x1="92.6667" y1="183.8279" x2="92.6667" y2="178.9122"><stop  offset="0.38" style="stop-color:#9D8D71"/><stop  offset="0.68" style="stop-color:#E3D0A6"/></linearGradient><polygon class="st6" points="16.04,183.83 169.29,183.83 169.2,178.91 16.13,178.91 "/><linearGradient id="SVGID_5_" gradientUnits="userSpaceOnUse" x1="92.6667" y1="221.5729" x2="92.6667" y2="216.6572"><stop  offset="0.38" style="stop-color:#9D8D71"/><stop  offset="0.68" style="stop-color:#E3D0A6"/></linearGradient><polygon class="st7" points="15.37,221.57 169.96,221.57 169.87,216.66 15.46,216.66 "/><g><linearGradient id="SVGID_6_" gradientUnits="userSpaceOnUse" x1="92.6667" y1="322.422" x2="92.6667" y2="317.5063"><stop  offset="0.38" style="stop-color:#9D8D71"/><stop  offset="0.68" style="stop-color:#E3D0A6"/></linearGradient><polygon class="st8" points="13.59,322.42 171.74,322.42 171.66,317.51 13.68,317.51 "/></g><linearGradient id="SVGID_7_" gradientUnits="userSpaceOnUse" x1="92.6667" y1="257.1064" x2="92.6667" y2="252.1907"><stop  offset="0.38" style="stop-color:#9D8D71"/><stop  offset="0.68" style="stop-color:#E3D0A6"/></linearGradient><polygon class="st9" points="14.75,257.11 170.59,257.11 170.5,252.19 14.83,252.19 "/><linearGradient id="SVGID_8_" gradientUnits="userSpaceOnUse" x1="92.6667" y1="290.723" x2="92.6667" y2="285.8073"><stop  offset="0.38" style="stop-color:#9D8D71"/><stop  offset="0.68" style="stop-color:#E3D0A6"/></linearGradient><polygon class="st10" points="14.15,290.72 171.18,290.72 171.1,285.81 14.24,285.81 "/><line class="st11" x1="21.3" y1="53.29" x2="163.2" y2="53.29"/><line class="st11" x1="19.28" y1="97.94" x2="163.92" y2="97.94"/><line class="st11" x1="18.85" y1="140.28" x2="164.79" y2="140.28"/><line class="st11" x1="18.27" y1="179.87" x2="166.09" y2="179.87"/><line class="st11" x1="17.11" y1="218.02" x2="166.96" y2="218.02"/><line class="st11" x1="16.68" y1="253.27" x2="167.68" y2="253.27"/><line class="st11" x1="15.67" y1="287.01" x2="168.69" y2="287.01"/><line class="st11" x1="15.09" y1="318.8" x2="169.41" y2="318.8"/><path class="st12" d="M18.37,51.97l-0.09,4.92c0,0,2.04-1.03,2.08-2.54C20.4,52.82,18.37,51.97,18.37,51.97z"/><path class="st12" d="M17.58,96.79l-0.09,4.92c0,0,2.04-1.03,2.08-2.54C19.61,97.64,17.58,96.79,17.58,96.79z"/><path class="st12" d="M16.83,139.1l-0.09,4.92c0,0,2.04-1.03,2.08-2.54C18.86,139.96,16.83,139.1,16.83,139.1z"/><path class="st12" d="M16.13,178.91l-0.09,4.92c0,0,2.04-1.03,2.08-2.54C18.15,179.77,16.13,178.91,16.13,178.91z"/><path class="st12" d="M15.46,216.66l-0.09,4.92c0,0,2.04-1.03,2.08-2.54C17.49,217.51,15.46,216.66,15.46,216.66z"/><path class="st12" d="M14.83,252.19l-0.09,4.92c0,0,2.04-1.03,2.08-2.54C16.86,253.05,14.83,252.19,14.83,252.19z"/><path class="st12" d="M14.24,285.81l-0.09,4.92c0,0,2.04-1.03,2.08-2.54C16.26,286.66,14.24,285.81,14.24,285.81z"/><path class="st12" d="M13.68,317.51l-0.09,4.92c0,0,2.04-1.03,2.08-2.54C15.7,318.36,13.68,317.51,13.68,317.51z"/><path class="st12" d="M166.96,51.97l0.09,4.92c0,0-2.04-1.03-2.08-2.54C164.93,52.82,166.96,51.97,166.96,51.97z"/><path class="st12" d="M167.75,96.79l0.09,4.92c0,0-2.04-1.03-2.08-2.54C165.73,97.64,167.75,96.79,167.75,96.79z"/><path class="st12" d="M168.5,139.1l0.09,4.92c0,0-2.04-1.03-2.08-2.54C166.48,139.96,168.5,139.1,168.5,139.1z"/><path class="st12" d="M169.2,178.91l0.09,4.92c0,0-2.04-1.03-2.08-2.54C167.18,179.77,169.2,178.91,169.2,178.91z"/><path class="st12" d="M169.87,216.66l0.09,4.92c0,0-2.04-1.03-2.08-2.54C167.85,217.51,169.87,216.66,169.87,216.66z"/><path class="st12" d="M170.5,252.19l0.09,4.92c0,0-2.04-1.03-2.08-2.54C168.48,253.05,170.5,252.19,170.5,252.19z"/><path class="st12" d="M171.1,285.81l0.09,4.92c0,0-2.04-1.03-2.08-2.54C169.07,286.66,171.1,285.81,171.1,285.81z"/><path class="st12" d="M171.66,317.51l0.09,4.92c0,0-2.04-1.03-2.08-2.54C169.63,318.36,171.66,317.51,171.66,317.51z"/><g><g><path class="st13" d="M12.32,422.29l1.33-74.84c18.62-20.8,45.94-31.79,79.02-31.79c33.08,0,60.4,10.99,79.02,31.79l1.32,74.84H12.32z"/><path class="st14" d="M92.67,316.16c32.86,0,60,10.89,78.52,31.48l1.31,74.14H12.83l1.31-74.14C32.67,327.04,59.81,316.16,92.67,316.16 M92.67,315.16c-31.66,0-59.98,10.19-79.52,32.09l-1.34,75.53h161.71l-1.34-75.53C152.65,325.35,124.32,315.16,92.67,315.16L92.67,315.16z"/></g></g><path class="st15" d="M49.86,322.42c0,0,4.15-3.06,9.91-4.27c3.4-0.71,5.98-0.69,7.64-0.65c0.69,0.02-3.91,0.79-6.63,1.56C54.91,320.73,49.86,322.42,49.86,322.42z"/><path class="st16" d="M135.6,322.42c0,0-2.58-2.25-9.08-3.98c-4.34-1.16-9.13-0.93-9.13-0.93s2.6,0.34,8.53,1.91C130.57,320.65,135.6,322.42,135.6,322.42z"/><path class="st15" d="M62.86,320.46l-6.44-0.17l3.2-1.14l4.39,0.02c0,0,0.6,0.48,0.57,0.71C64.55,320.11,62.86,320.46,62.86,320.46z"/><path class="st16" d="M122.51,320.46l6.44-0.17l-3.76-1.15l-3.82,0.03c0,0-0.42,0.54-0.39,0.75C121.01,320.11,122.51,320.46,122.51,320.46z"/><g><ellipse class="st17" cx="25.46" cy="318.8" rx="10.05" ry="3.08"/><ellipse class="st18" cx="25.46" cy="318.8" rx="8.91" ry="2.41"/><ellipse class="st19" cx="25.46" cy="318.8" rx="8.27" ry="1.85"/><ellipse class="st20" cx="25.46" cy="318.8" rx="7.55" ry="1.51"/><ellipse class="st21" cx="25.46" cy="318.8" rx="6.83" ry="1.16"/><ellipse class="st22" cx="25.46" cy="318.8" rx="6.47" ry="0.99"/></g></g></svg>';



// EASY SAMPLE

HZRosette = {

	soundholeR : 42,
	soundholePadding : 2,
	diameter : 129,
	palette : [
		{
			cName : "云杉",
			cOri : "#ffecb3",
			cShellac : "#ffd98d"
		},
		{
			cName : "雪松",
			cOri : "#e8a573",
			cShellac : "#b5794e"
		},
		{
			cName : "枫木",
			cOri : "#fff3e3",
			cShellac : "#ffe3bd"
		},
		{
			cName : "沙比利",
			cOri : "#a76849",
			cShellac : "#843914"
		},
		{
			cName : "印度玫瑰木",
			cOri : "#482625",
			cShellac : "#461f1c"
		},
		{
			cName : "染色绿",
			cOri : "#8ccc77",
			cShellac : "#8fb537"
		},
		{
			cName : "染色红",
			cOri : "#e2506a",
			cShellac : "#e63939"
		},
		{
			cName : "染色蓝",
			cOri : "#4982c3",
			cShellac : "#1a6292"
		},
		{
			cName : "染色黑",
			cOri : "#090909",
			cShellac : "#040301"
		}
	],

	rosetteTile : [
		{
			type : "line",
			thickness : .8,
			color : 5
		},
		{
			type : "line",
			thickness : .4,
			color : 1
		},
		{
			type : "line",
			thickness : 1.8,
			color : 5
		},
		{
			type : "line",
			thickness : .4,
			color : 1
		},
		{
			type : "line",
			thickness : .8,
			color : 6
		},
		{
			type : "line",
			thickness : .4,
			color : 1
		},
		{
			type : "mosaic",
			cellW : 1,
			cellH : 1,
			col : 7,
			row : 4,
			color : [
					2,2,2,4,2,2,2,
					2,2,4,3,4,2,2,
					2,2,4,7,4,2,2,
					2,2,2,4,2,2,2
					]
		},
		{
			type : "line",
			thickness : .4,
			color : 1
		},
		{
			type : "mosaic",
			cellW : 5,
			cellH : 1,
			col : 2,
			row : 3,
			color : [
					5,1,
					1,5,
					5,1
					]
		},
		{
			type : "line",
			thickness : .4,
			color : 1
		},
		{
			type : "mosaic",
			cellW : 1,
			cellH : 1,
			col : 7,
			row : 4,
			color : [
					2,2,2,4,2,2,2,
					2,2,4,7,4,2,2,
					2,2,4,3,4,2,2,
					2,2,2,4,2,2,2
					]
		},
		{
			type : "line",
			thickness : .4,
			color : 1
		},
		{
			type : "line",
			thickness : .8,
			color : 6
		},
		{
			type : "line",
			thickness : .4,
			color : 1
		},
		{
			type : "line",
			thickness : 1.8,
			color : 5
		},
		{
			type : "line",
			thickness : .4,
			color : 1
		},
		{
			type : "line",
			thickness : .8,
			color : 5
		}
	]

}











var rosettePreview = {

	init : function () {
		// 修正rosette直径数据
		var rD = 0;
		rD = rD + HZRosette.soundholeR + HZRosette.soundholePadding;
		for (var ii = 0; ii <= HZRosette.rosetteTile.length - 1; ii++) {
			rD += HZRosette.rosetteTile[ii].type == "line" ? HZRosette.rosetteTile[ii].thickness : HZRosette.rosetteTile[ii].cellH * HZRosette.rosetteTile[ii].row;
		}
		rD = Math.floor(rD * 2);
		// console.log(rD)
		HZRosette.diameter = rD;

		// 新建画布
		canvasDimention = rD * 1.9; // 自动调整画布大小
		var cs = canvasDimention * previewScale;
		rcX = rcY = cs / 2;
		$(".canvas_box").html("<canvas id='rosette' width='"+cs+"' height='"+cs+"'></canvas>");
rD=null;
return rosettePreview
	},


	generate : function() {
		
		// 画音孔
		$("#rosette").drawArc({
			layer: true,
			fillStyle : "#1b1514", // 写死的音孔专色
			x : rcX, y : rcY,
			radius : HZRosette.soundholeR * previewScale
		});
		currentR = (HZRosette.soundholeR + HZRosette.soundholePadding) * previewScale;


		// 根据rosette数据绘制rosette
		for (var i = 0; i <= HZRosette.rosetteTile.length - 1; i++) {
			switch (HZRosette.rosetteTile[i].type) {
				case "line" :
					var lineWidth = HZRosette.rosetteTile[i].thickness * previewScale,
						color = rosettePreview.mateColor(HZRosette.rosetteTile[i].color);
					rosettePreview.addRing(i,currentR,lineWidth,color);
					currentR += parseFloat(lineWidth);
					break;
				case "mosaic" :
					var cellW = HZRosette.rosetteTile[i].cellW * previewScale,
						cellH = HZRosette.rosetteTile[i].cellH * previewScale,
						cols = HZRosette.rosetteTile[i].col,
						rows = HZRosette.rosetteTile[i].row,
						colorArr = rosettePreview.mateColor (HZRosette.rosetteTile[i].color);
					var w = cellW * cols,
						h = cellH * rows;
					var insideDiameter = currentR - preview.findTilePosition(currentR,w,h).m,
						outsideDiameter = preview.findTilePosition(currentR,w,h).r1,
						angle = preview.findTilePosition(currentR,w,h).angle;
					rosettePreview.addMosaic(i,insideDiameter,cellW,cellH,cols,rows,colorArr,currentR,outsideDiameter,angle);
					currentR = outsideDiameter;
					break;
			}
		}
		$("#rosette").removeLayers();
		console.log("generate done");
		return rosettePreview
	},


	addRing : function (RTi,insideDiameter,lineWidth,color) {
		$("#rosette").drawArc({
			layer: true,
			strokeStyle : color,
			strokeWidth : lineWidth,
			x : rcX, y : rcY,
			radius : 0.5 * lineWidth + currentR
		});
		// console.warn("addRing");
		return rosettePreview
	},



	addMosaic : function (RTi,insideDiameter,cellW,cellH,cols,rows,colorArr,r0,r1,angle) {
		var w = cellW * cols,
			h = cellH * rows;
		var total = cols * rows;
		var amountOfTile = Math.floor( 360 / angle );

		// 先旋转画布一半角度
		var ra = (1-amountOfTile) * angle / 2;
		$("#rosette").rotateCanvas({
			layer: true,
			rotate: ra,
			x: rcX, y: rcY
		});

		// 开始画tiles
		// 提前计算优化性能
		var pStart = 180-angle/2,
			pEnd = 180+angle/2;
		var mXt = rcX - w/2,
			mYt = rcY + insideDiameter;
		for (var i = 1; i <= amountOfTile; i++) {
			// 画扇环遮罩
			$("#rosette").drawPath({
				mask: true,
				closed: true,
				layer: true,
				p1: {
					type: "arc",
					x: rcX, y: rcY,
					start: pStart , end: pEnd,
					radius: r1
				},
				p2: {
					type: "arc",
					x: rcX, y: rcY,
					start: pEnd , end: pStart,
					ccw: true,
					radius: r0
				}
			});

			// 在遮罩里画马赛克
			for (var j = 0; j < total; j++) {
				var x,y;
				x = mXt + (j%cols+0.5)*cellW;
				y = mYt + (Math.floor(j/cols)+0.5)*cellH;
				$("#rosette").drawRect({
					layer: true,
					fillStyle: colorArr[j],
					x: x, y: y,
					width: cellW, height: cellH
				});
			};

			// 完成遮罩
			$("#rosette").restoreCanvas({layer: true})

			// 旋转画布，然后画下一个tile
			.rotateCanvas({
				layer: true,
				rotate: angle,
				x: rcX, y: rcY
			});
			
		}

		// 还原画布旋转
		for (var k = 1; k <= amountOfTile + 1; k++) {
			$("#rosette").restoreCanvas({layer: true});
		}
		/*
		$("#rosette").restoreCanvas({layer:true}).rotateCanvas({
			layer: true,
			rotate: ra,
			x: rcX, y: rcY
		});*/

		return rosettePreview
	},




	mateColor : function (colorID) {
		if (typeof(colorID) == "number") {
			if (shellacMode) {return HZRosette.palette[colorID-1].cOri;}
			else {return HZRosette.palette[colorID-1].cShellac;}
		} else {
			var colorArr = [];
			if (shellacMode) {
				for (var i = colorID.length - 1; i >= 0; i--) {
					colorArr[i] = HZRosette.palette[colorID[i]-1].cOri;
				}
				return colorArr;
			}
			else {
				for (var i = colorID.length - 1; i >= 0; i--) {
					colorArr[i] = HZRosette.palette[colorID[i]-1].cShellac;
				}
				return colorArr;
			}
		}
	},


	resize : function () {
		var winW = $(window).width();
			winH = $(window).height();
		var ch = winH - $(".pad_tool").outerHeight();
		var ml;
		if (winW < ch) {
			ml = (winW - ch) / 2;
		} else {
			ml = "auto";
		}
		$("#rosette").css({height:ch,marginLeft:ml}).drawLayers().restoreCanvas();
		
		// console.warn("resize");
		return rosettePreview
	},

	clear : function () {
		$("#rosette").clearCanvas();
		return rosettePreview
	}

}



// find M
var ya,yb;
var y0,y,yi=0,fn=0;
var variance,variance0;

var preview = {
	findM : function(cr,w,h) {
		y0 = y;
		variance0 = variance;
		yi += inlayAccuracy;
		fn++;
		y = cr + h - yi;
		// console.log(r,h,i)
		var r1 = Math.pow ( ( w * w / 4 + y * y ) , .5 );
		ya = r1 - cr;
		yb = cr * y / r1 + h - cr;
		var m = h - yb;
		// console.warn("y0:"+y0,"y:"+y,"i:"+i,"n:"+n,"cr:"+cr,"h:"+h,"w:"+w,"r1:"+r1,"a:"+a,"b:"+b,"m:"+m);
		variance = ( ya - yb ) * ( ya - yb );
		/*console.warn(fn+">");
		console.log("h:"+h,"w:"+w,"cr:"+cr);
		console.log("y0:"+y0,"y:"+y);
		console.log(y > Math.pow ( cr * cr - w * w / 4 , .5 ));
		console.log(variance < variance0 );
		console.log("vari:"+variance0+"-->"+variance);*/
	},

	findTilePosition : function(cr,w,h) {
		ya=yb=y0=y=null;
		yi=fn=0;
		variance=variance0=null;

		preview.findM(cr,w,h);
		do {
			preview.findM(cr,w,h);
		}
		while ( y > Math.pow ( cr * cr - w * w / 4 , .5 ) && variance < variance0 );
		// fallback
		var r1 = Math.pow ( ( w * w / 4 + y0 * y0 ) , .5 ),
			yb = cr * y0 / r1 + h - cr; // because b is accurater than a.
			m = h - yb;
		var angle = Math.asin( w / 2 / r1 ) * 2 / Math.PI * 180; // deg
		// console.log("m",m,"r1",r1,"angle",angle);
		return {"m":m,"r1":r1,"angle":angle};
	}
}




// $(window).resize(rosettePreview.resize);


/*$("#rosette").bind("click",function(){
	var cl = Math.floor(Math.random() * 8 +1);
	for (var gi = 22; gi >= 0; gi--) {
		var wt = Math.floor(Math.random() * 28);
		// console.log(wt,cl);
		HZRosette.rosetteTile[6].color[wt]=cl;
	}
	var revc = HZRosette.rosetteTile[6].color;
	//alert(revc)
	revc.reverse();
	//alert(revc)
	HZRosette.rosetteTile[10].color=revc;
	// $(document).unbind("click");
	rosettePreview.clear().generate();

	// rosettePreview.clear();
	
})*/




;