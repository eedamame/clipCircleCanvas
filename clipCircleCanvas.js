/*! clipCircleCanvas ()
 * lastupdate: 2014-04-27
 * version: 0.1
 * author: "eedamame" Hiroaki Tachibana
 * License: MIT */

// clipCircleCanvas("id","image path",diameter);
	
function clipCircleCanvas(targetId,imgpath,diameter){
	if(!Modernizr.canvas) return;
	var canvasDiameter = diameter;
	var canvas = document.getElementById(targetId);

	var cx = canvas.getContext("2d");
	canvas.width = canvasDiameter;
	canvas.height = canvasDiameter;
	var image = new Image();
	image.src = imgpath;
	image.onload = function() {
		var imageAttr = checkImg(image);
		var imageset = {};
		
		if(imageAttr.imgW !== 0){
			// 横長の場合
			if(imageAttr.size === "horizontal"){
				var imgW = image.width;
				var imgH = image.height;
				imageset = {
					sx: (imgW / 2) - (imgH / 2),
					sy: 0,
					sw: imgH,
					sh: imgH,
					dx: 0,
					dy: 0,
					dw: canvasDiameter,
					dh: canvasDiameter
				}
			} else {
			// 縦長の場合
				var imgW = imageAttr.imgW;
				var imgH = imageAttr.imgH;
				imageset = {
					sx: 0,
					sy: (imgH / 2) - (imgW / 2),
					sw: imgW,
					sh: imgW,
					dx: 0,
					dy: 0,
					dw: canvasDiameter,
					dh: canvasDiameter
				}
			}
			// 描画
			cx.drawImage(image,imageset.sx,imageset.sy,imageset.sw,imageset.sh,imageset.dx,imageset.dy,imageset.dw,imageset.dh);
			cx.globalCompositeOperation = 'destination-in';
			// クリッピング
			cx.beginPath();
			cx.arc((canvasDiameter/2),(canvas.width/2),(canvasDiameter/2),0,2 * Math.PI,true);
			cx.fill();
		};
	}
}
// 画像サイズ／向き取得関数
function checkImg(image){
	$("body").append(image);
	var imageAttr = {};
	imageAttr.imgW = $(image).width();
	imageAttr.imgH = $(image).height();
	
	if(imageAttr.imgW > imageAttr.imgH){
		imageAttr.size = "horizontal";
	} else {
		imageAttr.size = "vertical";
	}
	$(image).remove();
	return imageAttr;
}
