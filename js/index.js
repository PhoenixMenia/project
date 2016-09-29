$(function(){

	/*===========================sideBar ==============================*/
	var $side_bar = $('#side_bar_li').children().not('.li_tit');
	$side_bar.each(function(index,element){
		$(element).hover(function(){
			$('.details').eq(index).show();
		},function(){
			$('.details').eq(index).hide();
		});
	});
	$('.details').hover(function(){
		$(this).show();
	},function(){
		$(this).hide();
	});

	/*========================轮播图========================*/

	var $banner_img = $('#banner img');
	var len=$banner_img.length;
	var timer = null;
	var currIndex = 0;
	var nextIndex = 1;
	var $spans = $('#banner span');
	
	function fadeInOut(){
		$banner_img.eq(currIndex).fadeOut(500);
		$banner_img.eq(nextIndex).fadeIn(500);	
		$spans.eq(nextIndex).addClass('curr').siblings('span').removeClass('curr');
		currIndex = nextIndex;
		nextIndex++;
		if(nextIndex>=len){
			nextIndex = 0;
		}
	}
	
	// timer = setInterval(fadeInOut,3000);
	$spans.each(function(index,element){
		$(this).on('click',function(){
			nextIndex = index;
			fadeInOut();
		});
	});

	$('#banner').hover(function(){
		clearInterval(timer);
	},function(){
		timer = setInterval(fadeInOut,3000);
	}).trigger('mouseleave');

	/*========================轮播图END========================*/


});