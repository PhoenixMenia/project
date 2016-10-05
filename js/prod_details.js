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

	/*点击或者鼠标悬浮时分享的方框显示*/
	$('#shareto').hover(function(){
		$(this).parent('.share').next('.share1').show();
	},function(){
		$(this).parents('.share').next('.share1').hide();
	}).on('click',function(){
		var html = $('#share_more').html();
		$('#share_more').get(0).innerHTML += $('.share1').get(0).innerHTML;
		$('#share_more').show().find('#close').on('click',function(){		
			$(this).parents('#share_more').html(html).hide();
		});
	});

	$('.share1').hover(function(){
		$(this).show().find('#more').click(function(){
			var html =  $('#share_more').html();
			$('#share_more').get(0).innerHTML += $('.share1').get(0).innerHTML;
			$('#share_more').show().find('#close').on('click',function(){		
				$(this).parents('#share_more').html(html).hide();
			});
		});
	},function(){
		$(this).hide();
	});

	//选项卡切换；
	$('.list li').each(function(index,element){
		$(this).on('click',function(){
			$(this).addClass('current').siblings('li').removeClass('current');
			$('.list_det div').eq(index).show().siblings('div').hide();
		});
	});





});