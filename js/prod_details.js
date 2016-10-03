$(function(){
	/*侧边栏鼠标滑过显示*/
	$('#subnav h2').hover(function(){
		$('.item_list').show();
	},function(){
		$('.item_list').hide();
	}).next('.item_list').hover(function(){
		$(this).show();
	},function(){
		$(this).hide();
	}).children('li').hover(function(){
		var index = $(this).index();
		$('.details').eq(index).show();
	},function(){
		var index = $(this).index();
		$('.details').eq(index).hide();
	});


	$('.details').hover(function(){
		$(this).show();
		$('.item_list').show();
	},function(){
		$(this).hide();
		$('.item_list').hide();
	});

	/*banner大图淡入淡出切换*/
	var curr = 0,
		next = 1,
		len = $('#fading_pic img').length;
		timer = null;

	//动态生成图片下面的数字
	$('#fading_pic img').each(function(index,element){
		var $span = $('<span>'+(index+1)+'</span>');
		$span.appendTo('#fading_pic p');
		if(index === 0){
			$span.addClass('curr');
		}
	});

	//定义淡入淡出的主函数
	function fadeInOut(){
		$('#fading_pic img').eq(curr).fadeOut(200);
		$('#fading_pic img').eq(next).fadeIn(200);
		$('#fading_pic span').eq(next).addClass('curr').siblings('span').removeClass('curr');
		curr = next;
		next++;
		if(next >= len){
			next = 0;
		}
	}

	$('#fading_pic').hover(function(){
		clearInterval(timer);
	},function(){
		timer = setInterval(fadeInOut,2000);
	}).trigger('mouseleave');


	/*点击按钮跳转*/
	$('#fading_pic span').each(function(index,element){
		$(this).on('mouseover',function(){
			next = index;
			fadeInOut();
		});
	});


	/*选项卡切换*/
	$('.ads_choice strong').on('mouseover',function(){
		var index = $(this).index();
		$(this).addClass('selected').siblings('strong').removeClass('selected');
		$('.ads_items').eq(index).show().siblings('.ads_items').hide();
	});

});