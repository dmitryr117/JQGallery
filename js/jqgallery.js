/*
 * Author: Dmitry Rodetsky
 * Business E-mail: info@colirs.ca
 * E-mail: dmitry.r117@gmail.com
 * Date: 19 November 2013
 * 
 * Version: 0.2
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
jqGallerySlide.numImg  = 3;
jqGallerySlide.current = 1;
jqGallerySlide.next    = 0;

jqGallerySlide.images = {};

// set image properties - can be done on server side
jqGallerySlide.images.img0 = {
		'startTop'  : 0, 
		'startLeft' : 0, 
		'startWidth': 940, 
		'endTop'    : -50, 
		'endLeft'   : -10,
		'endWidth'  : 1200 };

jqGallerySlide.images.img1 = {
		'startTop'  : 10, 
		'startLeft' : 10, 
		'startWidth': 940, 
		'endTop'    : -20, 
		'endLeft'   : -150,
		'endWidth'  : 1200 };

jqGallerySlide.images.img2 = {
		'startTop'  : 15, 
		'startLeft' : 15, 
		'startWidth': 940, 
		'endTop'    : -100, 
		'endLeft'   : -80,
		'endWidth'  : 1200 };

// function initializes the scene and plays first image right away
// then activates transition and plays second image through transition as well
// once first image faded - it resets its position
jqGallerySlide.main = function(initial) {
	// set up required constants
	jqGallerySlide.current = jqGallerySlide.getCurrent(1);
	jqGallerySlide.next    = jqGallerySlide.getCurrent(2);
	jqGallerySlide.selection = $('#jqgallery-slideshow');
	// set up the scene
	jqGallerySlide.setup();
	// play initial animation
	jqGallerySlide.moveZoom(jqGallerySlide.next);
	
	jqGallerySlide.rotate(1);
};

jqGallerySlide.rotate = function(initial) {
	var imgNum = $('#jqgallery-slideshow img').length;
	current = initial % imgNum;
	
	//jqGallerySlide.moveZoom(current);
	
	$('#jqgallery-slideshow img').eq(current).fadeOut(5000, function() {
		$('#jqgallery-slideshow img').each(function(i) {
			$(this).css('zIndex', ((imgNum - i) + current) % imgNum);
		});
		$(this).show();
		// reset sizes back
		$('#jqgallery-slideshow img').eq(current).css({
			'top'  : jqGallerySlide.images['img' + current]['startTop'] + 'px',
			'left' : jqGallerySlide.images['img' + current]['startLeft'] + 'px',
			'width': jqGallerySlide.images['img' + current]['startWidth'] + 'px'	
		});
		setTimeout(function() {jqGallerySlide.rotate(++current);}, 4000);
	});
};

jqGallerySlide.getCurrent = function(initial) {
	return initial % jqGallerySlide.numImg;
};

jqGallerySlide.moveZoom = function(current) {
	$('#jqgallery-slideshow img').eq(current).animate({
		width : jqGallerySlide.images['img' + current]['endWidth'],
		top   : jqGallerySlide.images['img' + current]['endTop'],
		left  : jqGallerySlide.images['img' + current]['endLeft'],
	},{duration: 3000, queue: false});
}; 

jqGallerySlide.setup = function() {
	// setup css positions based on the jquery input
	var imgNum = jqGallerySlide.selection.find('img').length;
	for (var i = 0; i < imgNum; i++) {
		jqGallerySlide.selection.find('img:eq('+ i +')').css({
				'top' : jqGallerySlide.images['img' + i]['startTop'] + 'px',
				'left': jqGallerySlide.images['img' + i]['startLeft'] + 'px',
				'width': jqGallerySlide.images['img' + i]['startWidth'] + 'px'
			});
	}
};



