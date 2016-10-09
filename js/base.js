$(function(){
	/*在线交流======点击事件*/
	var $chat_img = $('#chat_online img');

	$chat_img.on('click',function(){
		$('#chat_online').hide(200);
	});
	$('#open').on('click',function(){
		$('#chat_online').show(200);
	});

	/*===========在线客服滑动效果=========*/
	var wrapWidth = $('#service_wrap').outerWidth();
	var onOff = true;	
	$('#service').on('click',function(){
		if(onOff){
			$('#service_wrap').animate({'right':0},200);
		}else{
			$('#service_wrap').animate({'right':-wrapWidth},200);
		}
		onOff = !onOff;
	});

	/*===========zbout us切换=========*/
	$('#infos').on('click',function(){
		$('#aboutus').show(300);
	});
	$('#hide').on('click',function(){
		$('#aboutus').hide(300);
	});


	/*=================回到顶部===================*/
	$('#back_to_top').on('click',function(){
		$(window).scrollTop(0);
	});


	/*-------------------从cookie中获取用户名和密码自动登录-----------------*/
	$.cookie.json = true;
	var currUser = $.cookie('userInfo');
	if(currUser){
		var userName = currUser.username;
		$('#logInto').text(currUser.username);
		$('#zhuceTo').text('退出');	
	}
	
	/*-------------------从cookie中获取购物车中商品的数量并显示在购物车-----------------*/
	
	
	getProductsNum();
	
	
	/*=================工具函数=================*/
	function getProductsNum(){
		var products = $.cookie('products'),
			tolNum = 0;	
		$.each(products,function(index,element){
			tolNum += element.num;
		});
		$('.cart_link span').text(tolNum);
}



});

