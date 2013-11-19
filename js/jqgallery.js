/*
 * Author: Dmitry Rodetsky
 * Business E-mail: info@colirs.ca
 * E-mail: dmitry.r117@gmail.com
 * Date: 18 November 2013
 * 
 * Version: 0.1
 * 
 * This is a slideshow. It zooms images in and out as it pans them.
 * This solution is built on top of JQuery library 1.10.2
 * 
 */

$(document).ready(function() {
	//jqGallerySlideRotate(1);
	jqMoveZoom();
});

function jqGallerySlideRotate(initial) {
	var imgNum = $('#jqgallery-slideshow img').length;
	current = initial % imgNum;
	
	$('#jqgallery-slideshow img').eq(current).fadeOut(5000, function() {
		$('#jqgallery-slideshow img').each(function(i) {
			$(this).css('zIndex', ((imgNum - i) + current) % imgNum);
		});
		$(this).show();
		setTimeout(function() {jqGallerySlideRotate(++current);}, 4000);
	});
}

function jqMoveZoom() {
	var item = $('#jqgallery-slideshow img:first');
	if(item.length == 0){
		alert('Error no items in slideshow');
	}
	
	var width = item.attr('width');
	if (width <= 950){
		// increase the size of the image
		
	}
}



