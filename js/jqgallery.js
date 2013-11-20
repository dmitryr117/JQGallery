/*
 * Author: Dmitry Rodetsky
 * Business E-mail: info@colirs.ca
 * E-mail: dmitry.r117@gmail.com
 * Date: 19 November 2013
 * 
 * Version: 0.9.2
 * 
 * This is a slideshow. It zooms images in and out as it pans them.
 * This solution is built on top of JQuery library 1.10.2
 * 
 */

$(document).ready(function() {
	jqGallerySlide.main();
});

jqGallerySlide = {};
// Set these values based on how many images are present
jqGallerySlide.imgNum    = 5;
jqGallerySlide.selection ='';
jqGallerySlide.current   = 0;
jqGallerySlide.next      = 0;
jqGallerySlide.maxWidth  = 940;
jqGallerySlide.widthRat  = 1;
jqGallerySlide.whRatio   = 0.33;

jqGallerySlide.images = {};

// set image properties - can be done on server side
jqGallerySlide.images.img0 = {
		'startTop'  : 0, 
		'startLeft' : 0, 
		'startWidth': 940, 
		'endTop'    : -250, 
		'endLeft'   : -400,
		'endWidth'  : 1500 };

jqGallerySlide.images.img1 = {
		'startTop'  : 0, 
		'startLeft' : 0, 
		'startWidth': 940, 
		'endTop'    : -350, 
		'endLeft'   : -400,
		'endWidth'  : 1500 };

jqGallerySlide.images.img2 = {
		'startTop'  : -30, 
		'startLeft' : 0, 
		'startWidth': 940, 
		'endTop'    : -450, 
		'endLeft'   : -350,
		'endWidth'  : 1500 };

jqGallerySlide.images.img3 = {
		'startTop'  : 0, 
		'startLeft' : 0, 
		'startWidth': 940, 
		'endTop'    : -250, 
		'endLeft'   : -400,
		'endWidth'  : 1500 };

jqGallerySlide.images.img4 = {
		'startTop'  : 0, 
		'startLeft' : 0, 
		'startWidth': 940, 
		'endTop'    : -350, 
		'endLeft'   : -400,
		'endWidth'  : 1500 };

// function initializes the scene and plays first image right away
// then activates transition and plays second image through transition as well
// once first image faded - it resets its position
jqGallerySlide.main = function() {
	jqGallerySlide.selection = $('#jqgallery-slideshow');
	jqGallerySlide.selection.hide();
	jqGallerySlide.slideShowInit();
	$(window).resize(function() {
		jqGallerySlide.widthRat = jqGallerySlide.widthRatio();
		$('#jqgallery-slideshow img').stop(true,true);
		jqGallerySlide.setup();
	});
	$(window).load(function() {
		setTimeout(function() {
				jqGallerySlide.selection.fadeIn(2000);
			}, 3000);
	});
};

jqGallerySlide.slideShowInit = function(initial) {
	// set up required constants
	// set up the scene
	jqGallerySlide.current = jqGallerySlide.getCurrent(1);
	jqGallerySlide.next    = jqGallerySlide.getCurrent(2);
	jqGallerySlide.widthRat = jqGallerySlide.widthRatio();
	jqGallerySlide.setup();
	// play initial animation
	jqGallerySlide.moveZoom(jqGallerySlide.next);
	jqGallerySlide.rotateZoom(1);
};

jqGallerySlide.rotateZoom = function(initial) {
	jqGallerySlide.current = jqGallerySlide.getCurrent(initial);
	jqGallerySlide.next = jqGallerySlide.getCurrent(initial + 1);
	
	jqGallerySlide.moveZoom(jqGallerySlide.next);
	
	$('#jqgallery-slideshow .jqslide').eq(jqGallerySlide.current).fadeOut(2000, function() {
		$('#jqgallery-slideshow .jqslide').each(function(i) {
			$(this).css('zIndex', 
				((jqGallerySlide.imgNum - i) + jqGallerySlide.current) % jqGallerySlide.imgNum);
		});
		$(this).show();
		// reset sizes back
		$('#jqgallery-slideshow img').eq(jqGallerySlide.current).css({
			'top'  : Math.ceil(jqGallerySlide.images['img' + jqGallerySlide.current]['startTop']*jqGallerySlide.widthRat) + 'px',
			'left' : Math.ceil(jqGallerySlide.images['img' + jqGallerySlide.current]['startLeft']*jqGallerySlide.widthRat) + 'px',
			'width': Math.ceil(jqGallerySlide.images['img' + jqGallerySlide.current]['startWidth']*jqGallerySlide.widthRat) + 'px',
		});
		setTimeout(function() {jqGallerySlide.rotateZoom(++jqGallerySlide.current);}, 4000);
	});
};

jqGallerySlide.getCurrent = function(initial) {
	return initial % jqGallerySlide.imgNum;
};

jqGallerySlide.moveZoom = function(current) {
	//alert(Math.ceil(jqGallerySlide.images['img' + current]['endTop']*jqGallerySlide.widthRat) + 'px');
	$('#jqgallery-slideshow img').eq(current).animate({
		top   : Math.ceil(jqGallerySlide.images['img' + current]['endTop']*jqGallerySlide.widthRat) + 'px',
		left  : Math.ceil(jqGallerySlide.images['img' + current]['endLeft']*jqGallerySlide.widthRat) + 'px',
		width : Math.ceil(jqGallerySlide.images['img' + current]['endWidth']*jqGallerySlide.widthRat) + 'px',
	},{duration: 7500, queue: false});
}; 

jqGallerySlide.setup = function() {
	// setup css positions based on the jquery input
	jqGallerySlide.selection.css({
		'height': Math.ceil(jqGallerySlide.selection.width()*jqGallerySlide.whRatio) + 'px'
	});
	for (var i = 0; i < jqGallerySlide.imgNum; i++) {
		jqGallerySlide.selection.find('img:eq('+ i +')').css({
				'top' : Math.ceil(jqGallerySlide.images['img' + i]['startTop']*jqGallerySlide.widthRat) + 'px',
				'left': Math.ceil(jqGallerySlide.images['img' + i]['startLeft']*jqGallerySlide.widthRat) + 'px',
				'width': Math.ceil(jqGallerySlide.images['img' + i]['startWidth']*jqGallerySlide.widthRat) + 'px',
			});
	}
};

jqGallerySlide.widthRatio = function() {
	var width = $('#jqgallery-slideshow').width();
	var ratio = width / jqGallerySlide.maxWidth;
	
	if (ratio >= 1) {
		ratio = 1;
	}
	//alert('width: ' + width + ' ratio: ' + ratio);
	return ratio;
};
