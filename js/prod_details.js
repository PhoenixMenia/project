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
});