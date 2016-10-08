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
	$.cookie.json = true;
	var oDiv = '',
		i = 0,
		ran =  100000,
		user_login = $.cookie('userInfo'),
		comment_id;
	if(user_login){
		comment_id = user_login.username;
	}else{
		comment_id = 'youke'+ ran;
	}
	$('#launch').on('click',function(){
		var comTxt = $('#comm_content').val().replace(/^\s+|\s+$/,''),	
			oTime = new Date(),
			oTime1 = oTime.getFullYear() + '-' + (oTime.getMonth()+1) + '-' + oTime.getDate() + ' ' + oTime.getHours() + ':' + oTime.getMinutes() + ':' + oTime.getSeconds(),
			oDiv = '<div class="pinglun"><strong>'+comment_id+'</strong><p>'+comTxt+'</p><p class="shijian">' + oTime1 + '</p></div>';
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
	var coffe_price = ['￥9.90/盒','￥9.90/盒','￥36.00/盒','￥72.00/罐','￥78.00/瓶','￥34.80/瓶','￥98.00/罐',],
		prod_huohao = ['15501000','15501001','15501002','15501003','15501004','15501005','15501006'],
		prod_name = ['雀巢/Nestle 1+2原味即溶咖啡饮品 速溶咖啡42+6原味 48条装 720g/盒','太古 优级 方糖 餐饮装 454g','雀巢（Nestle）咖啡1+2特浓30条390g','雀巢咖啡 1+2 原味 1200g 罐装 速溶咖啡','雀巢（Nestle）咖啡醇品速溶咖啡 200g','Nestle雀巢咖啡伴侣（植脂末）400g','Nestle雀巢咖啡醇品黑咖啡罐装 500g 可冲277杯'];

	$('.version').on('click','span',function(){
		var _index = $(this).index();
		$(this).addClass('want').siblings('span').removeClass('want');
		//切换商品价格
		$('.price').find('span').text(coffe_price[_index]);
		$('.prod_id').text(prod_huohao[_index]);
		$('.prodname').text(prod_name[_index]);
		$('#num').val('1');
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
		num++;
		$('#num').val(num);
	});

	/*=========================添加到购物车====================*/
	$.cookie.json = true;
	$('#putIntoCart').on('click',function(){
		var prod_id = $('.prod_id').text(),
			prod_name = $('.prodname').text(),
			prod_imgSrc = $('.pages .xuanzhong').get(0).src.replace('file:///E:/project/','../'),
			prod_color = "默认",
			prod_price = $('.price span').text();
			prod_num = parseInt($('#num').val());
		var product = {
			'id' : prod_id,
			'name' : prod_name,
			'imgSrc' : prod_imgSrc,
			'color' : prod_color,
			'price' : prod_price,
			'num' : prod_num
		};
		var products = $.cookie('products');
		if(!products){
			products = [];
		}
		
		var $index = getProductIndex(product.id,products);
		if($index !== -1){
			products[$index].num += product.num;
		}else{
			products.push(product);
		}					
		$.cookie('products',products,{'expires':7});
		console.log(products);
		
		//动态更新购物车的数量,并显示在页面上
		getProductsNum();
	});



});



/*------------------辅助函数-----------------------*/
function getProductIndex(id,products){
	var prodIndex = -1;
	for(var i=0, len=products.length; i<len; i++){
		if(id === products[i].id){
			prodIndex = i;
			break;
		}
	}
	return prodIndex;
}
