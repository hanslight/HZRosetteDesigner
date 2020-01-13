// H&Z ROSETTE DESIGNER JS
// by Hans
// init 2018.8.7
// last update 2018.10.9
// version beta 2.7.1




var RosetteTile = new Array();


var curCell = {
	part : 0,//模块号
	tdn : 0//td总序号
};

// var defaultColor = "color1";
var selectedColor = "color1";
var shellac = false, // 虫胶漆效果
	showfb = false; // 指板预览


var tileScale = 10,
	previewScale = 2.7; // 比例尺 px:mm 2.7

var inlayAccuracy = .07;


var drawRosette,
	drawSoundhole,
	drawFingerboard;

var SVGRosetteR = new Array(),
	SVGSize = 420;
var SVGSoundhole;

var copies = new Array();

var mosaicTileH,
	mosaicTileW,
	lineT,
	r,
	soundholePadding;

var a,b;
var y0,y,i,n;
var variance,variance0;



var SVGFingerboard = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/" x="0px" y="0px" width="185.33px" height="429px" viewBox="0 0 185.33 429" style="enable-background:new 0 0 185.33 429;" xml:space="preserve"><style type="text/css">.st0{opacity:0;fill:#D500E7;}.st1{fill:#1A1717;}.st2{fill:#383232;}.st3{fill:url(#SVGID_1_);}.st4{fill:url(#SVGID_2_);}.st5{fill:url(#SVGID_3_);}.st6{fill:url(#SVGID_4_);}.st7{fill:url(#SVGID_5_);}.st8{fill:url(#SVGID_6_);}.st9{fill:url(#SVGID_7_);}.st10{fill:url(#SVGID_8_);}.st11{fill:none;stroke:#FFFFFF;stroke-linecap:round;stroke-miterlimit:10;}.st12{fill:#F0E7D2;}.st13{fill:#302B2A;}.st14{fill:#262323;}.st15{fill:#5C5140;}.st16{fill:#696050;}.st17{opacity:0.1;fill:#FFFFFF;}.st18{opacity:0.3;fill:#FFFFFF;}.st19{opacity:0.5;fill:#FFFFFF;}.st20{opacity:0.7;fill:#FFFFFF;}.st21{opacity:0.9;fill:#FFFFFF;}.st22{fill:#FFFFFF;}.st23{fill:url(#SVGID_9_);}.st24{fill:url(#SVGID_10_);}.st25{fill:url(#SVGID_11_);}.st26{fill:url(#SVGID_12_);}.st27{fill:url(#SVGID_13_);}.st28{fill:url(#SVGID_14_);}.st29{fill:url(#SVGID_15_);}.st30{fill:url(#SVGID_16_);}</style><defs></defs><g><rect y="6.95" class="st0" width="185.33" height="399.72"/><polygon class="st1" points="13.02,354.84 172.32,354.84 171.74,322.42 13.59,322.42 "/><polygon class="st1" points="14.24,285.81 171.1,285.81 170.59,257.11 14.75,257.11 "/><polygon class="st1" points="166.16,6.95 19.17,6.95 18.37,51.97 166.96,51.97 "/><polygon class="st1" points="15.46,216.66 169.87,216.66 169.29,183.83 16.04,183.83 "/><polygon class="st1" points="16.13,178.91 169.2,178.91 168.59,144.02 16.75,144.02 "/><polygon class="st1" points="14.83,252.19 170.5,252.19 169.96,221.57 15.37,221.57 "/><polygon class="st1" points="13.68,317.51 171.66,317.51 171.18,290.72 14.15,290.72 "/><polygon class="st1" points="17.49,101.7 16.83,139.1 168.5,139.1 167.84,101.7 "/><polygon class="st1" points="167.05,56.88 18.29,56.88 17.58,96.79 167.75,96.79 "/><g><image style="overflow:visible;opacity:0.15;" width="175" height="429" xlink:href="data:image/png;base64,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" transform="matrix(1 0 0 1 8.9263 0)"></image><g><polygon class="st1" points="12.32,422.28 19.66,7.45 165.67,7.45 173.01,422.28 "/><path class="st2" d="M165.18,7.95l7.32,413.84H12.83L20.15,7.95H165.18 M166.16,6.95H19.17l-7.36,415.84h161.71L166.16,6.95L166.16,6.95z"/></g></g><linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="92.6668" y1="56.8814" x2="92.6668" y2="51.9657"><stop  offset="0.38" style="stop-color:#9D8D71"/><stop  offset="0.68" style="stop-color:#E3D0A6"/></linearGradient><polygon class="st3" points="166.96,51.97 18.37,51.97 18.29,56.88 167.05,56.88 "/><linearGradient id="SVGID_2_" gradientUnits="userSpaceOnUse" x1="92.6667" y1="101.7036" x2="92.6667" y2="96.7879"><stop  offset="0.38" style="stop-color:#9D8D71"/><stop  offset="0.68" style="stop-color:#E3D0A6"/></linearGradient><polygon class="st4" points="167.75,96.79 17.58,96.79 17.49,101.7 167.84,101.7 "/><linearGradient id="SVGID_3_" gradientUnits="userSpaceOnUse" x1="92.6667" y1="144.0188" x2="92.6667" y2="139.1031"><stop  offset="0.38" style="stop-color:#9D8D71"/><stop  offset="0.68" style="stop-color:#E3D0A6"/></linearGradient><polygon class="st5" points="16.75,144.02 168.59,144.02 168.5,139.1 16.83,139.1 "/><linearGradient id="SVGID_4_" gradientUnits="userSpaceOnUse" x1="92.6667" y1="183.8279" x2="92.6667" y2="178.9122"><stop  offset="0.38" style="stop-color:#9D8D71"/><stop  offset="0.68" style="stop-color:#E3D0A6"/></linearGradient><polygon class="st6" points="16.04,183.83 169.29,183.83 169.2,178.91 16.13,178.91 "/><linearGradient id="SVGID_5_" gradientUnits="userSpaceOnUse" x1="92.6667" y1="221.5729" x2="92.6667" y2="216.6572"><stop  offset="0.38" style="stop-color:#9D8D71"/><stop  offset="0.68" style="stop-color:#E3D0A6"/></linearGradient><polygon class="st7" points="15.37,221.57 169.96,221.57 169.87,216.66 15.46,216.66 "/><g><linearGradient id="SVGID_6_" gradientUnits="userSpaceOnUse" x1="92.6667" y1="322.422" x2="92.6667" y2="317.5063"><stop  offset="0.38" style="stop-color:#9D8D71"/><stop  offset="0.68" style="stop-color:#E3D0A6"/></linearGradient><polygon class="st8" points="13.59,322.42 171.74,322.42 171.66,317.51 13.68,317.51 "/></g><linearGradient id="SVGID_7_" gradientUnits="userSpaceOnUse" x1="92.6667" y1="257.1064" x2="92.6667" y2="252.1907"><stop  offset="0.38" style="stop-color:#9D8D71"/><stop  offset="0.68" style="stop-color:#E3D0A6"/></linearGradient><polygon class="st9" points="14.75,257.11 170.59,257.11 170.5,252.19 14.83,252.19 "/><linearGradient id="SVGID_8_" gradientUnits="userSpaceOnUse" x1="92.6667" y1="290.723" x2="92.6667" y2="285.8073"><stop  offset="0.38" style="stop-color:#9D8D71"/><stop  offset="0.68" style="stop-color:#E3D0A6"/></linearGradient><polygon class="st10" points="14.15,290.72 171.18,290.72 171.1,285.81 14.24,285.81 "/><line class="st11" x1="21.3" y1="53.29" x2="163.2" y2="53.29"/><line class="st11" x1="19.28" y1="97.94" x2="163.92" y2="97.94"/><line class="st11" x1="18.85" y1="140.28" x2="164.79" y2="140.28"/><line class="st11" x1="18.27" y1="179.87" x2="166.09" y2="179.87"/><line class="st11" x1="17.11" y1="218.02" x2="166.96" y2="218.02"/><line class="st11" x1="16.68" y1="253.27" x2="167.68" y2="253.27"/><line class="st11" x1="15.67" y1="287.01" x2="168.69" y2="287.01"/><line class="st11" x1="15.09" y1="318.8" x2="169.41" y2="318.8"/><path class="st12" d="M18.37,51.97l-0.09,4.92c0,0,2.04-1.03,2.08-2.54C20.4,52.82,18.37,51.97,18.37,51.97z"/><path class="st12" d="M17.58,96.79l-0.09,4.92c0,0,2.04-1.03,2.08-2.54C19.61,97.64,17.58,96.79,17.58,96.79z"/><path class="st12" d="M16.83,139.1l-0.09,4.92c0,0,2.04-1.03,2.08-2.54C18.86,139.96,16.83,139.1,16.83,139.1z"/><path class="st12" d="M16.13,178.91l-0.09,4.92c0,0,2.04-1.03,2.08-2.54C18.15,179.77,16.13,178.91,16.13,178.91z"/><path class="st12" d="M15.46,216.66l-0.09,4.92c0,0,2.04-1.03,2.08-2.54C17.49,217.51,15.46,216.66,15.46,216.66z"/><path class="st12" d="M14.83,252.19l-0.09,4.92c0,0,2.04-1.03,2.08-2.54C16.86,253.05,14.83,252.19,14.83,252.19z"/><path class="st12" d="M14.24,285.81l-0.09,4.92c0,0,2.04-1.03,2.08-2.54C16.26,286.66,14.24,285.81,14.24,285.81z"/><path class="st12" d="M13.68,317.51l-0.09,4.92c0,0,2.04-1.03,2.08-2.54C15.7,318.36,13.68,317.51,13.68,317.51z"/><path class="st12" d="M166.96,51.97l0.09,4.92c0,0-2.04-1.03-2.08-2.54C164.93,52.82,166.96,51.97,166.96,51.97z"/><path class="st12" d="M167.75,96.79l0.09,4.92c0,0-2.04-1.03-2.08-2.54C165.73,97.64,167.75,96.79,167.75,96.79z"/><path class="st12" d="M168.5,139.1l0.09,4.92c0,0-2.04-1.03-2.08-2.54C166.48,139.96,168.5,139.1,168.5,139.1z"/><path class="st12" d="M169.2,178.91l0.09,4.92c0,0-2.04-1.03-2.08-2.54C167.18,179.77,169.2,178.91,169.2,178.91z"/><path class="st12" d="M169.87,216.66l0.09,4.92c0,0-2.04-1.03-2.08-2.54C167.85,217.51,169.87,216.66,169.87,216.66z"/><path class="st12" d="M170.5,252.19l0.09,4.92c0,0-2.04-1.03-2.08-2.54C168.48,253.05,170.5,252.19,170.5,252.19z"/><path class="st12" d="M171.1,285.81l0.09,4.92c0,0-2.04-1.03-2.08-2.54C169.07,286.66,171.1,285.81,171.1,285.81z"/><path class="st12" d="M171.66,317.51l0.09,4.92c0,0-2.04-1.03-2.08-2.54C169.63,318.36,171.66,317.51,171.66,317.51z"/><g><g><path class="st13" d="M12.32,422.29l1.33-74.84c18.62-20.8,45.94-31.79,79.02-31.79c33.08,0,60.4,10.99,79.02,31.79l1.32,74.84H12.32z"/><path class="st14" d="M92.67,316.16c32.86,0,60,10.89,78.52,31.48l1.31,74.14H12.83l1.31-74.14C32.67,327.04,59.81,316.16,92.67,316.16 M92.67,315.16c-31.66,0-59.98,10.19-79.52,32.09l-1.34,75.53h161.71l-1.34-75.53C152.65,325.35,124.32,315.16,92.67,315.16L92.67,315.16z"/></g></g><path class="st15" d="M49.86,322.42c0,0,4.15-3.06,9.91-4.27c3.4-0.71,5.98-0.69,7.64-0.65c0.69,0.02-3.91,0.79-6.63,1.56C54.91,320.73,49.86,322.42,49.86,322.42z"/><path class="st16" d="M135.6,322.42c0,0-2.58-2.25-9.08-3.98c-4.34-1.16-9.13-0.93-9.13-0.93s2.6,0.34,8.53,1.91C130.57,320.65,135.6,322.42,135.6,322.42z"/><path class="st15" d="M62.86,320.46l-6.44-0.17l3.2-1.14l4.39,0.02c0,0,0.6,0.48,0.57,0.71C64.55,320.11,62.86,320.46,62.86,320.46z"/><path class="st16" d="M122.51,320.46l6.44-0.17l-3.76-1.15l-3.82,0.03c0,0-0.42,0.54-0.39,0.75C121.01,320.11,122.51,320.46,122.51,320.46z"/><g><ellipse class="st17" cx="25.46" cy="318.8" rx="10.05" ry="3.08"/><ellipse class="st18" cx="25.46" cy="318.8" rx="8.91" ry="2.41"/><ellipse class="st19" cx="25.46" cy="318.8" rx="8.27" ry="1.85"/><ellipse class="st20" cx="25.46" cy="318.8" rx="7.55" ry="1.51"/><ellipse class="st21" cx="25.46" cy="318.8" rx="6.83" ry="1.16"/><ellipse class="st22" cx="25.46" cy="318.8" rx="6.47" ry="0.99"/></g></g></svg>';



/*
RosetteTile = [ //小蒋
	{
		type : "line",
		thickness : .6,
		color : "color9"
	},
	{
		type : "line",
		thickness : .3,
		color : "color3"
	},
	{
		type : "line",
		thickness : .3,
		color : "color9"
	},
	{
		type : "line",
		thickness : .8,
		color : "color4"
	},
	{
		type : "line",
		thickness : .3,
		color : "color9"
	},
	{
		type : "line",
		thickness : .3,
		color : "color3"
	},
	{
		type : "line",
		thickness : .6,
		color : "color9"
	},
	{
		type : "line",
		thickness : .5,
		color : "color6"
	},
	{
		type : "line",
		thickness : 1.8,
		color : "color9"
	},
	{
		type : "line",
		thickness : .5,
		color : "color3"
	},
	{
		type : "mosaic",
		cellW : .5,
		cellH : .5,
		col : 11,
		row : 12,
		color : ["color7","color8","color1","color1","color1","color9","color1","color1","color1","color8","color7","color7","color8","color1","color1","color9","color9","color9","color1","color1","color8","color7","color8","color7","color1","color9","color1","color1","color1","color9","color1","color7","color8","color1","color1","color9","color9","color1","color1","color1","color9","color9","color1","color1","color1","color9","color1","color7","color1","color9","color1","color7","color1","color9","color1","color9","color1","color1","color1","color7","color9","color7","color1","color1","color1","color9","color1","color1","color1","color1","color9","color8","color9","color1","color1","color1","color1","color1","color1","color1","color9","color9","color8","color9","color9","color1","color1","color1","color1","color1","color9","color1","color9","color7","color9","color1","color9","color1","color1","color9","color9","color1","color1","color9","color7","color9","color1","color1","color9","color9","color9","color1","color1","color1","color1","color9","color1","color1","color1","color1","color9","color1","color1","color1","color1","color1","color9","color1","color1","color1","color1","color1"]
	},
	{
		type : "line",
		thickness : .5,
		color : "color3"
	},
	{
		type : "line",
		thickness : 1.8,
		color : "color9"
	},
	{
		type : "line",
		thickness : .5,
		color : "color6"
	},
	{
		type : "line",
		thickness : .6,
		color : "color9"
	},
	{
		type : "line",
		thickness : .3,
		color : "color3"
	},
	{
		type : "line",
		thickness : .3,
		color : "color9"
	},
	{
		type : "line",
		thickness : .8,
		color : "color4"
	},
	{
		type : "line",
		thickness : .3,
		color : "color9"
	},
	{
		type : "line",
		thickness : .3,
		color : "color3"
	},
	{
		type : "line",
		thickness : .6,
		color : "color9"
	}
]

*/

/*
RosetteTile = [ // 小蒋 翻转
	{
		type : "line",
		thickness : .6,
		color : "color9"
	},
	{
		type : "line",
		thickness : .3,
		color : "color3"
	},
	{
		type : "line",
		thickness : .3,
		color : "color9"
	},
	{
		type : "line",
		thickness : .8,
		color : "color4"
	},
	{
		type : "line",
		thickness : .3,
		color : "color9"
	},
	{
		type : "line",
		thickness : .3,
		color : "color3"
	},
	{
		type : "line",
		thickness : .6,
		color : "color9"
	},
	{
		type : "line",
		thickness : .5,
		color : "color6"
	},
	{
		type : "line",
		thickness : 1.8,
		color : "color9"
	},
	{
		type : "line",
		thickness : .5,
		color : "color3"
	},
	{
		type : "mosaic",
		cellW : .5,
		cellH : .5,
		col : 11,
		row : 12,
		color : [
				"color1","color1","color1","color1","color1","color9","color1","color1","color1","color1","color1",
				"color9","color1","color1","color1","color1","color9","color1","color1","color1","color1","color9",
				"color9","color9","color1","color1","color9","color7","color9","color1","color1","color9","color9",
				"color1","color1","color9","color1","color9","color7","color9","color1","color9","color1","color1",
				"color1","color1","color1","color9","color9","color8","color9","color9","color1","color1","color1",
				"color1","color1","color1","color1","color9","color8","color9","color1","color1","color1","color1",
				"color9","color1","color1","color1","color7","color9","color7","color1","color1","color1","color9",
				"color1","color9","color1","color7","color1","color9","color1","color7","color1","color9","color1",
				"color1","color1","color9","color9","color1","color1","color1","color9","color9","color1","color1",
				"color8","color7","color1","color9","color1","color1","color1","color9","color1","color7","color8",
				"color7","color8","color1","color1","color9","color9","color9","color1","color1","color8","color7",
				"color7","color8","color1","color1","color1","color9","color1","color1","color1","color8","color7",
				]
	},
	{
		type : "line",
		thickness : .5,
		color : "color3"
	},
	{
		type : "line",
		thickness : 1.8,
		color : "color9"
	},
	{
		type : "line",
		thickness : .5,
		color : "color6"
	},
	{
		type : "line",
		thickness : .6,
		color : "color9"
	},
	{
		type : "line",
		thickness : .3,
		color : "color3"
	},
	{
		type : "line",
		thickness : .3,
		color : "color9"
	},
	{
		type : "line",
		thickness : .8,
		color : "color4"
	},
	{
		type : "line",
		thickness : .3,
		color : "color9"
	},
	{
		type : "line",
		thickness : .3,
		color : "color3"
	},
	{
		type : "line",
		thickness : .6,
		color : "color9"
	}
]
*/



RosetteTile = [ // EASY SAMPLE
	{
		type : "line",
		thickness : .8,
		color : "color5"
	},
	{
		type : "line",
		thickness : .4,
		color : "color1"
	},
	{
		type : "line",
		thickness : 1.8,
		color : "color5"
	},
	{
		type : "line",
		thickness : .4,
		color : "color1"
	},
	{
		type : "line",
		thickness : .8,
		color : "color6"
	},
	{
		type : "line",
		thickness : .4,
		color : "color1"
	},
	{
		type : "mosaic",
		cellW : 1,
		cellH : 1,
		col : 7,
		row : 4,
		color : [
				"color1","color1","color1","color1","color1","color1","color1",
				"color1","color1","color1","color1","color1","color1","color1",
				"color1","color1","color1","color1","color1","color1","color1",
				"color1","color1","color1","color1","color1","color1","color1"
				]
	},
	{
		type : "mosaic",
		cellW : 4,
		cellH : 1,
		col : 2,
		row : 3,
		color : [
				"color1","color5",
				"color5","color1",
				"color1","color5",
				]
	},
	{
		type : "mosaic",
		cellW : 1,
		cellH : 1,
		col : 7,
		row : 4,
		color : [
				"color1","color1","color1","color1","color1","color1","color1",
				"color1","color1","color1","color1","color1","color1","color1",
				"color1","color1","color1","color1","color1","color1","color1",
				"color1","color1","color1","color1","color1","color1","color1"
				]
	},
	{
		type : "line",
		thickness : .4,
		color : "color1"
	},
	{
		type : "line",
		thickness : .8,
		color : "color6"
	},
	{
		type : "line",
		thickness : .4,
		color : "color1"
	},
	{
		type : "line",
		thickness : 1.8,
		color : "color5"
	},
	{
		type : "line",
		thickness : .4,
		color : "color1"
	},
	{
		type : "line",
		thickness : .8,
		color : "color5"
	}
]






var preview = {

	findMCore : function(w,h) {
		y0 = y;
		variance0 = variance;

		i += inlayAccuracy;
		n++;
		y = r + h - i;
		// console.log(r,h,i)
		var r1 = Math.pow ( ( w * w / 4 + y * y ) , .5 );
		a = r1 - r;
		b = r * y / r1 + h - r;

		var m = h - b;
		
		// console.warn("y0:"+y0,"y:"+y,"i:"+i,"n:"+n,"r:"+r,"h:"+h,"w:"+w,"r1:"+r1,"a:"+a,"b:"+b,"m:"+m);
		
		variance = ( a - b ) * ( a - b );
		
		/*console.warn(n+">");
		console.log("h:"+h,"w:"+w,"r:"+r);
		console.lo`g("y0:"+y0,"y:"+y);
		console.log(y > Math.pow ( r * r - w * w / 4 , .5 ));
		console.log(variance < variance0 );
		console.log("vari:"+variance0+"-->"+variance);*/
	},

	findM : function(w,h) {
		preview.findMCore(w,h);
		do {
			preview.findMCore(w,h);
		}
		while ( y > Math.pow ( r * r - w * w / 4 , .5 ) && variance < variance0 );
		
		// fallback
		var r1 = Math.pow ( ( w * w / 4 + y0 * y0 ) , .5 ),
			b = r * y0 / r1 + h - r; // because b is accurater than a.
			m = h - b;
		var angle = Math.asin( w / 2 / r1 ) * 2 / Math.PI * 180; // deg
		return {"m":m,"r1":r1,"angle":angle};
	},

	drawRing : function(rout,rin,ids,color) {
		
		var hd = .5523;
		var p = "M "+rout+",0 c "+(-hd*rout)+",0, "+(-rout)+","+(rout-hd*rout)+", "+(-rout)+","+rout+" c 0,"+(hd*rout)+", "+(rout-hd*rout)+","+rout+", "+rout+","+rout+" c "+(hd*rout)+",0, "+rout+","+(-rout+hd*rout)+", "+rout+","+(-rout)+" c 0,"+(-hd*rout)+", "+(-rout+hd*rout)+","+(-rout)+", "+(-rout)+","+-rout+" z M "+rout+","+(rout-rin)+" c "+(hd*rin)+",0, "+rin+","+(rin-hd*rin)+", "+rin+","+rin+" c 0,"+(hd*rin)+", "+(-rin+hd*rin)+","+rin+", "+(-rin)+","+rin+" c "+(-hd*rin)+",0, "+(-rin)+","+(-rin+hd*rin)+", "+(-rin)+","+(-rin)+" c 0,"+(-hd*rin)+", "+(rin-hd*rin)+","+(-rin)+", "+rin+","+(-rin)+" z";
		
		var svgC = SVGSize/2;
		SVGRosetteR[ids] = drawRosette.path(p).fill("rgba(0,0,0,.15)").addClass(color).center(svgC,svgC).back();
		/*
		M rout,0
		c -hd*rout,0,		-rout,rout-hd*rout, 		-rout,rout
		c 0,hd*rout, 		rout-hd*rout,rout,  		rout,rout
		c hd*rout,0, 		rout,-rout+hd*rout, 		rout,-rout
		c 0,-hd*rout,		-rout+hd*rout,-rout,		-rout,-rout
		z
		// 内圈要反向
		M rout,rout-rin
		c hd*rin,0, 		rin,rin-hd*rin,  			rin,rin
		c 0,hd*rin, 		-rin+hd*rin,rin, 			-rin,rin
		c -hd*rin,0,		-rin,-rin+hd*rin,			-rin,-rin
		c 0,-hd*rin,		rin-hd*rin,-rin, 			rin,-rin
		z
		*/
	
	},

	drawMosaic : function(rout,ids) {
		var RT = RosetteTile[ids],
		w = RT.cellW*previewScale,
		h = RT.cellH*previewScale;
		var total = RT.col * RT.row;
		SVGRosetteR[ids] = drawRosette.group();
		
		for (i = 1; i <= total; i++) {
			var x,y;
			var color = RT.color[i-1];
			x = SVGSize / 2 - RT.col*w/2 + ((i-1)%RT.col)*w;
			y = SVGSize / 2 + rout - RT.row*h + Math.floor((i-1)/RT.col)*h;
			var cell = drawRosette.rect(w,h).move(x,y).addClass(color);
			SVGRosetteR[ids].add(cell);
		};

		return preview
	},

	patternMosaic : function (rout,angle,ids) {

		var startX1,startY1,endX1,endY1,startX2,startY2,endX2,endY2;
		var RT = RosetteTile[ids],
			W = RT.cellW*RT.col*previewScale,
			H = RT.cellH*RT.row*previewScale;
		var a = angle/180 * Math.PI, // rad
			rin = (rout - H) / Math.cos(a/2);

		var laf = angle < 180 ? 0 : 1;
		startX1 = SVGSize/2 + W/2;
		startY1 = SVGSize/2 + Math.cos(a/2) * rout;
		endX1 = -W;
		endY1 = 0;
		startX2 = SVGSize/2 - Math.tan(a/2) * (rout-H);
		startY2 = SVGSize/2 + rout - H;
		endX2 = 2 * Math.tan(a/2) * (rout-H);
		endY2 = 0;

		var d = "M "+startX1+" "+startY1+" a "+rout+" "+rout+" 0 "+laf+" 1 "+endX1+" "+endY1+" L "+startX2+" "+startY2+" a "+rin+" "+rin+" 0 "+laf+" 0 "+endX2+" "+endY2+" Z";

		var fan = drawRosette.path(d);
		var fanClipper = drawRosette.clip().add(fan);
		var cut = SVGRosetteR[ids].clipWith(fanClipper);

		copies[ids] = drawRosette.group();
		var count = (Math.floor(360/angle)-1)/2;
		for (i=1;i<=count;i++) {
			copies[ids].add(cut.clone().rotate(angle*i,SVGSize/2, SVGSize/2));
			copies[ids].add(cut.clone().rotate(-angle*i,SVGSize/2, SVGSize/2));
		}
		
		return preview
	},

	initRosette : function() {
		for (var j = 0; j <= RosetteTile.length - 1; j++) {
			switch (RosetteTile[j].type) {
				case "mosaic" :
					mosaicTileH = parseFloat(RosetteTile[j].cellH * RosetteTile[j].row);
					mosaicTileW = parseFloat(RosetteTile[j].cellW * RosetteTile[j].col);
					var h = mosaicTileH,
						w = mosaicTileW;
					i=0;n=0;
					var r1 = preview.findM(w,h).r1,
						a = preview.findM(w,h).angle;
					// preview.drawRing(r1*previewScale,r*previewScale,j);
					preview.drawMosaic(r1*previewScale,j).patternMosaic(r1*previewScale,a,j);
					r = r1;
					break;
				case "line" :
					lineT = parseFloat(RosetteTile[j].thickness);
					var color = RosetteTile[j].color;
					var r1 = r + lineT;
					preview.drawRing(r1*previewScale,r*previewScale,j,color);
					r = r1;
					break;
			}
		}
	},


	create : function() {

		r = parseFloat($("#soundholeD input").val())/2;
		soundholePadding = parseFloat($("#soundholePadding input").val());
		
		a=b=0;
		y0=y=i=n=0;
		variance=variance0=0;
		

		////////////// 生成SVG //////////////
		
		$("#rosette").html("");
		drawSoundhole = SVG("soundhole").size(SVGSize,SVGSize);
		drawFingerboard = SVG("fingerboard").size(SVGSize,SVGSize);
		drawRosette = SVG("rosette").size(SVGSize,SVGSize);

		SVGSoundhole = drawSoundhole.circle(r*2*previewScale).fill("#1b1514").center("50%","50%");
		r += soundholePadding;
		
		
		preview.initRosette();

		$("#fingerboard").html(SVGFingerboard);

		return preview;
	},


	place : function () {
		var winW = $(window).width();
			winH = $(window).height();
		var pH = winH - $(".pad_tool").outerHeight();
		var ml,mt;
		var sH = SVGSize,
			zs = pH/sH;
		
		ml = (winW - sH) / 2;
		mt = (pH - sH) / 2;

		var fbH = 415.837,
			fbW = 185.333;
		r = parseFloat($("#soundholeD input").val())/2;
		var fbml = (winW - fbW) / 2,
			fbmt = pH/2 -fbH - r*previewScale*zs + 0.143*fbH*zs + 0.08*pH*zs;

		$(".SVG_box").css({height:pH,width:winW});
		$("#rosette svg").css({marginLeft:ml,marginTop:mt});
		$("#soundhole svg").css({marginLeft:ml,marginTop:mt});
		$("#fingerboard svg").css({marginLeft:fbml,marginTop:fbmt});
		$(".SVG_box svg").css({transform:"scale("+zs+")"});
	},

	editRing : function(rout,rin,ids,color) {
			
		var hd = .5523;
		var d = "M "+rout+",0 c "+(-hd*rout)+",0, "+(-rout)+","+(rout-hd*rout)+", "+(-rout)+","+rout+" c 0,"+(hd*rout)+", "+(rout-hd*rout)+","+rout+", "+rout+","+rout+" c "+(hd*rout)+",0, "+rout+","+(-rout+hd*rout)+", "+rout+","+(-rout)+" c 0,"+(-hd*rout)+", "+(-rout+hd*rout)+","+(-rout)+", "+(-rout)+","+-rout+" z M "+rout+","+(rout-rin)+" c "+(hd*rin)+",0, "+rin+","+(rin-hd*rin)+", "+rin+","+rin+" c 0,"+(hd*rin)+", "+(-rin+hd*rin)+","+rin+", "+(-rin)+","+rin+" c "+(-hd*rin)+",0, "+(-rin)+","+(-rin+hd*rin)+", "+(-rin)+","+(-rin)+" c 0,"+(-hd*rin)+", "+(rin-hd*rin)+","+(-rin)+", "+rin+","+(-rin)+" z";
		
		var svgC = SVGSize/2;
		SVGRosetteR[ids].plot(d).attr("class","").addClass(color).center(svgC,svgC);
		
		return preview;
	},
	
	editMosaic : function(rout,angle,ids,item) {
		var RT = RosetteTile[ids];

		/*if (item == "color") {
			for (i = 1; i <= total; i++) {
				var color = RT.color[i-1];
		} else if (item == "dimens") {

		}
*/
		var w = RT.cellW*previewScale,
			h = RT.cellH*previewScale;
		var total = RT.col * RT.row;
		SVGRosetteR[ids].remove();
		SVGRosetteR[ids] = drawRosette.group();
		
		for (i = 1; i <= total; i++) {
			var x,y;
			var color = RT.color[i-1];
			x = SVGSize / 2 - RT.col*w/2 + ((i-1)%RT.col)*w;
			y = SVGSize / 2 + rout - RT.row*h + Math.floor((i-1)/RT.col)*h;
			var cell = drawRosette.rect(w,h).move(x,y).addClass(color);
			// alert(w+","+h+","+x+","+y+","+color)
			SVGRosetteR[ids].add(cell);
		};
		SVGRosetteR[ids].back();

		copies[ids].remove();

		var W = w*RT.col;
			H = h*RT.row;
		
		var startX1,startY1,endX1,endY1,startX2,startY2,endX2,endY2;
		var a = angle/180 * Math.PI, // rad
			rin = (rout - H) / Math.cos(a/2);

		var laf = angle < 180 ? 0 : 1;
		startX1 = SVGSize/2 + W/2;
		startY1 = SVGSize/2 + Math.cos(a/2) * rout;
		endX1 = -W;
		endY1 = 0;
		startX2 = SVGSize/2 - Math.tan(a/2) * (rout-H);
		startY2 = SVGSize/2 + rout - H;
		endX2 = 2 * Math.tan(a/2) * (rout-H);
		endY2 = 0;

		var d = "M "+startX1+" "+startY1+" a "+rout+" "+rout+" 0 "+laf+" 1 "+endX1+" "+endY1+" L "+startX2+" "+startY2+" a "+rin+" "+rin+" 0 "+laf+" 0 "+endX2+" "+endY2+" Z";

		var fan = drawRosette.path(d);
		var fanClipper = drawRosette.clip().add(fan);
		var cut = SVGRosetteR[ids].clipWith(fanClipper);

		copies[ids] = drawRosette.group();
		var count = (Math.floor(360/angle)-1)/2;
		for (j=1;j<=count;j++) {
			copies[ids].add(cut.clone().rotate(angle*j,SVGSize/2, SVGSize/2));
			copies[ids].add(cut.clone().rotate(-angle*j,SVGSize/2, SVGSize/2));
		}
	},


	update : function(item) {
		r = parseFloat($("#soundholeD input").val())/2,
		SVGSoundhole.radius(r*previewScale);
		soundholePadding = parseFloat($("#soundholePadding input").val());
		r += soundholePadding;

		for (var j = 0; j <= RosetteTile.length - 1; j++) {
			switch (RosetteTile[j].type) {
				case "mosaic" :
					mosaicTileH = parseFloat(RosetteTile[j].cellH * RosetteTile[j].row);
					mosaicTileW = parseFloat(RosetteTile[j].cellW * RosetteTile[j].col);
					var h = mosaicTileH,
						w = mosaicTileW;
					i=0;n=0;
					var r1 = preview.findM(w,h).r1,
						angle = preview.findM(w,h).angle;
					//preview.editRing(r1*previewScale,r*previewScale,j);
					preview.editMosaic(r1*previewScale,angle,j,item);
					r = r1;
					break;
				case "line" :
					lineT = parseFloat(RosetteTile[j].thickness);
					var color = RosetteTile[j].color;
					var r1 = r + lineT;
					preview.editRing(r1*previewScale,r*previewScale,j,color);
					r = r1;
					break;
			}
		}
		preview.place();
		return preview;
	}
	
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
				html += "width:"+obj.cellW*tileScale+"px;";
				html += "height:"+obj.cellH*tileScale+"px;";
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
		html += "height:"+obj.thickness*tileScale+"px;";
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
	preview.update("color");
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
	preview.create();
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
	preview.create();
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