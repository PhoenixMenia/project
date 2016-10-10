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


	/*------------从cookie中获取用户名和密码自动登录-----------*/
	$.cookie.json = true;
	var currUser = $.cookie('userInfo');
	if(currUser){
		var userName = currUser.username;
		$('.user1').text(userName);
		$('<a class="exit" href="####">退出</a>').insertAfter('#zhuceTo').end().on('click',function(){
			$('.user1').empty();
			$('#logInto').show();
			$('#zhuceTo').show();
			$(this).hide();
		});
		$('#logInto').hide();
		$('#zhuceTo').hide();	
	}else{
		$('#logInto').show();
		$('#zhuceTo').show();
		$('.user1').empty();
		$('.exit').hide();
	}
	
	/*-----------从cookie中获取购物车中商品的数量并显示在购物车-----------*/
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
	
	
	
	
	/*===========side_img切换=============================*/
	var $box = $('.img_box');
	var $side_imgs = $('.img_box img'),
		imgHeight = $side_imgs.eq(0).height();
		_len = $side_imgs.length,
		first = $side_imgs.eq(0).clone(true),
		last = $side_imgs.eq(_len-1).clone(true),
		nextIndex = 2,
		timer2 = null,
		isMoving = false;
	$box.append(first);
	$box.prepend(last);
	_len += 2;
	var boxHeight = imgHeight * _len;
	$box.height(boxHeight);
	$box.css('top',-imgHeight);

	function upDownMove(){
		if(!isMoving){
			isMoving = true;
			var _top = -nextIndex * imgHeight;
			nextIndex++;
			$box.animate({'top':_top},500,function(){
				if(Math.abs(_top) >= (_len - 1) * imgHeight){
					$box.css('top',-imgHeight);
					nextIndex = 2;
				}else if(Math.abs(_top) === 0){
					$box.css('top',-imgHeight * (_len - 2));
					nextIndex = _len - 1;
				}
				isMoving = false;
			});
		}
	}
	
	$('.side_img').hover(function(){
		clearInterval(timer2);
	},function(){
		timer2 = setInterval(upDownMove,2000);
	}).trigger('mouseleave');
	
	$('#prev').on('click',function(){
		nextIndex -= 2;
		upDownMove();
	});
	$('#next').on('click',upDownMove);
	





});

