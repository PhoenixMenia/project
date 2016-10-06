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

	/*------------点击或者鼠标悬浮时分享的方框显示--------------*/
	var html = $('#share_more').html();
	$('#shareto').hover(function(){
		$(this).parent('.share').next('.share1').show();
	},function(){
		$(this).parents('.share').next('.share1').hide();
	}).on('click',function(){
		$('#share_more').get(0).innerHTML += $('.share1').get(0).innerHTML;
		$('#share_more').show().find('#close').on('click',function(){		
			$(this).parents('#share_more').html(html).hide();
		});
	});

	$('.share1').hover(function(){
		$(this).show().find('#more').click(function(){			
			$('#share_more').get(0).innerHTML += $('.share1').get(0).innerHTML;
			$('#share_more').show().find('#close').on('click',function(){		
				$(this).parents('#share_more').html(html).hide();
			});
		});
	},function(){
		$(this).hide();
	});

	/*=====================选项卡切换===================*/
	$('.list li').each(function(index,element){
		$(this).on('click',function(){
			$(this).addClass('current').siblings('li').removeClass('current');
			$('.list_det div').eq(index).show().siblings('div').hide();
		});
	});

	/*=========================评论====================*/
	var oDiv = '',
		i = 0,
		ran =  100000;
	$('#launch').on('click',function(){
		var comTxt = $('#comm_content').val().replace(/^\s+|\s+$/,''),			
			youke_id = 'youke'+ ran,
			oTime = new Date(),
			oTime1 = oTime.getFullYear() + '-' + (oTime.getMonth()+1) + '-' + oTime.getDate() + ' ' + oTime.getHours() + ':' + oTime.getMinutes() + ':' + oTime.getSeconds(),
			oDiv = '<div class="pinglun"><strong>'+youke_id+'</strong><p>'+comTxt+'</p><p class="shijian">' + oTime1 + '</p></div>';
		if(!comTxt){
			return;
		}
		$(oDiv).prependTo('.comments');
		i++;
		$('#shu').text(i);
		ran++;
		$('#comm_content').val('');
	});

	/*=========================切换图片====================*/
	$('.pages img').on('click',function(){
		var _index = $(this).index();
		$(this).addClass('xuanzhong').siblings('img').removeClass('xuanzhong');
		$('.zuobian').eq(_index).show().siblings('.zuobian').hide();
		$('.big_wrap').children().eq(_index).show().siblings('img').hide();
	});

	/*=========================图片放大镜====================*/
	var spellWidth = $('.spell').width(),
		spellHeight = $('.spell').height(),
		boxWidth = $('.small').innerWidth(),
		boxHeight = $('.small').innerHeight();
	$('.small').hover(function(){
		var _index1 = $('.pages .xuanzhong').index();
		$('.spell').show();
		$('.big_wrap').fadeIn(500);
	},function(){
		$('.spell').hide();
		$('.big_wrap').hide();
	}).on('mousemove',function(event){
		var _left = event.pageX - spellWidth/2,
			_top = event.pageY - spellHeight/2;

		$('.spell').offset({'left':_left,'top':_top});

		_left = $('.spell').position().left;
		_top = $('.spell').position().top;
		if(_left <= 0){
			_left = 0;
		}else if(_left >= boxWidth - spellWidth){
			_left = boxWidth - spellWidth;
		}

		if(_top <= 0){
			_top = 0;
		}else if(_top >= boxHeight - spellHeight){
			_top = boxHeight - spellHeight;
		}

		$('.spell').css({'left':_left,'top':_top});
		$('.big_wrap img').css({
			'top' : -2*_top,
			'left' : -2*_left
		});
	});


	/*=========================切换选择的商品版本====================*/
	var coffe_price = ['￥9.90/盒','￥9.90/盒','￥36.00/盒','￥72.00/罐','￥78.00/瓶','￥34.80/瓶','￥98.00/罐',];

	$('.version').on('click','span',function(){
		var _index = $(this).index();
		$(this).addClass('want').siblings('span').removeClass('want');
		//切换商品价格
		$('.price').find('span').text(coffe_price[_index]);
	});

	/*=========================修改商品数量====================*/
	
	$('.minus').on('click',function(){
		var num = parseInt($('#num').val());
		console.log(typeof num);
		num--;
		if(num <= 0){
			return;
		}
		$('#num').val(num);
	});

	$('.add').on('click',function(){
		var num = parseInt($('#num').val());
		console.log(num);
		num++;
		$('#num').val(num);
	});

	//待完善 cookie



});