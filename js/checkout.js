
$(function(){
	$.cookie.json = true;
	/*---------显示当前用户----------*/
	var user_curr = $.cookie('userInfo');
	if(user_curr){
		$('#user').text(user_curr.username);
	}else{
		window.location.href = 'login.html';
	}
	
	/*------------获取购物车信息显示到网页--------------*/
	var products = $.cookie('products');
	$.each(products,function(index,element){
		var price = element.price.replace(/￥|\/|[\u2E80-\u9FFF]/g,''),
			sub_ttl = '￥' + (price * element.num).toFixed(2) + '元',
			unit = element.price.substring(element.price.length-1);
		$('.cart_infos .template').clone(true).removeClass('template')
		.addClass('prod_item').insertBefore('.total_info').find('img')
		.prop('src',element.imgSrc).next('p').children('a').text(element.name)
		.next('span').text('颜色：'+element.color).parents('td').siblings('.prod_price')
		.text(element.price).next('.prod_unit').text(unit).next('.prod_num').children('.num')
		.val(element.num).end().next('.total').text(sub_ttl).parents('.prod_item')
		.data('product',element);
	});
	get_ttl_amount();  //计算总金额
	
	//修改小计的函数
	function cacl_sub_ttl(num,$ele){
		var _prod = $ele.data('product'),
			_subttl = _prod.price.replace(/￥|\/|[\u2E80-\u9FFF]/g,'') * num;
		_prod.num = num;
		$.cookie('products',products,{'expires':7});
		$ele.find('.total').text('￥' + _subttl.toFixed(2) + '元');	
	}
	
	//计算修改总金额的函数
	function get_ttl_amount(){
		var ttlAmt = 0,
			ttlUnt = 0;
		$.each(products,function(index,$ele){
			ttlAmt += $ele.price.replace(/￥|\/|[\u2E80-\u9FFF]/g,'') * $ele.num;
			ttlUnt += $ele.num;
		});
		$('#ttl_amt').text('￥' + ttlAmt.toFixed(2) + '元');
		$('#ttl_units').text(ttlUnt + '件');
		$('#ttl_amt_1').text('￥' + ttlAmt.toFixed(2) + '元');
		$('.jifen_info strong').eq(0).text(ttlAmt.toFixed(0));
		$('.jifen_info strong').eq(1).text('￥' + ttlAmt.toFixed(2));
		$('.jifen_info span').text(ttlUnt);
	}
	
	//减数量
	$('.prod_item .minusNum').on('click',function(){
		var newNum = parseInt($(this).next('.num').val());
		if(newNum <= 1){
			return;
		}
		newNum--;
		$(this).next('.num').val(newNum);
		cacl_sub_ttl(newNum,$(this).parents('.prod_item'));
		//更新总金额
		get_ttl_amount();
	});
	
	//加数量
	$('.prod_item .addNum').on('click',function(){
		var newNum = parseInt($(this).prev('.num').val());
		newNum++;
		$(this).prev('.num').val(newNum);
		cacl_sub_ttl(newNum,$(this).parents('.prod_item'));
		//更新总金额
		get_ttl_amount();
	});
	
	//删除商品
	$('.remove_item').on('click',function(){
		var _prod = $(this).parents('.prod_item').data('product'),
			_index = getProductIndex(_prod.id,products);
		products.splice(_index,1);
		$.cookie('products',products,{'expires':7});
		$(this).parents('.prod_item').remove();
		
		get_ttl_amount();
	});
	
	
	
	/*--------------------表单操作---------------------------*/
	//修改地址
	$('.first_show').find('a').on('click',function(){
		$(this).parents('.first_show').fadeOut(200).next('.second_show').fadeIn(200);
		var _height = $('.second_show').outerHeight();
		$('.receiver_info').height(_height);
	});
	
	var onOff = true;
	var scroll = true;
	if(!scroll){
		document.documentElement.style.overflow = 'hidden';
		document.body.style.overflow = 'hidden';
	}else{
		document.documentElement.style.overflow = 'auto';
		document.body.style.overflow = 'auto';
	}	
	
	$('.save').on('click',function(){
		if(onOff){
			var receiver_name = $('#receiver').val().replace(/^\s+|\s+$/,''),
				province = $('#province').val(),
				city = $('#city').val(),
				county = $('#county').val(),
				street = $('#street').val(),
				zip_code = $('#zip').val(),
				phone = $('#phone').val(),
				emial = $('#email').val().replace(/^\s+|\s+$/,''),
				html = '',
				addr_valid = (province == -1 || city == -1 || county == -1 || street == '') ? false : true,
				email_valid = emial.match(/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/),
				phone_valid = phone.match(/^\d{8,11}$/);
			
			if(!receiver_name){
				alert('请填写收货人');
				return;
			}
			if(!addr_valid){
				alert('请填写正确的收货地址！');
				return;
			}
			if(!phone_valid){
				alert('请填写正确的手机或固定电话！');
				return;
			}
			if(!email_valid){
				alert('请填写正确的邮箱地址！');
				return;
			}
			html = '<p class="new_address"><input type="radio" name="address" checked="checked"/><span class="marginL0">'
			+receiver_name+'</span><span>'+province+'</span><span>'
			+city+'</span><span>'+county+'</span><span>'+street
			+'</span><a class="marginL">[删除]</a><a>[编辑]</a></p>';
			
			var $tar_ele = $('#address').parent('p')
			$(html).insertBefore($tar_ele).children(':radio')
			.on('click',fillInAddress).end().find('a').eq(0).on('click',function(){
				var _this = this;
				$(_this).parent('p').remove();
			}).next().on('click',function(){
				var $ind = $(this).parent('.new_address');
				$('#change_inner input').eq(0).val(receiver_name)
				.parent('p').next('p').children('input').val(phone)
				.parent('p').next('p').children('input').val(zip_code)
				.parent('p').next('p').next('p').children('input').val(street)
				.parent('p').next('p').children('input').val(emial);
				scroll = false;				
				$('#change_address').show().find('#save_change').on('click',function(){
					$ind.children().eq(1).text($('#change_inner :text').eq(0).val());
					$ind.children().eq(5).text($('#change_inner :text').eq(3).val());
					$('#change_address').hide();
					scroll = true;
				}).end().find('#close').on('click',function(){
					$('#change_address').hide();
					scroll = true;
				});
			});
		}	
		$('.last_show').hide();
		onOff = false;
		var _height = $('.second_show').outerHeight();
		$('.receiver_info').height(_height);
	});
	
	$('#address').on('click',fillInAddress);
	
	/*=========地址切换、添加新地址的函数========*/
	function fillInAddress(){
		if($(this).is('#address')){
			onOff = true;
			$('.last_show').show();			
			$('.save').show();
			//清空表单的内容
			$('.last_show :text').val('');
			$('.last_show input[type=radio] option:first').prop('selected',true);
		}else{
			$('.last_show').hide();
		}
		var _height = $('.second_show').outerHeight();
		$('.receiver_info').height(_height);
	}
	
	/*=========付款方式========*/
	$('#monthly').on('click',function(){
		var check_status = $(this).prop('checked');
		if(check_status){
			alert('您好，您还不是合约用户，如需申请月结，请联系客服');
		}
	});
	
	/*=========选择发票========*/
	var on_record = 0;  //记录当前选中的单选按钮的索引值
	$('.invoice>p').eq(1).on('click',':radio',function(){
		var index = $(this).index();
		var $div = $('.invoice>div');
		if(index === 1){
			$div.hide();
		}else{
			if(index === 3){
				var ttl = parseFloat($('#ttl_amt_1').text().replace(/￥|[\u2E80-\u9FFF]/g,''));
				if(ttl <= 200){
					alert('产品总金额大于200才能开增值税发票');
					$('.invoice>p').eq(1).children(':radio').eq(on_record-1).prop('checked',true);
					return;
				}
			}
			$div.eq(index-2).show().siblings('div').hide();
		}
		on_record = index;  //每点击一次更新一次选中按钮的索引值
	});
	
	/*跨域获取省份及市区信息*/
	var address = {};
	$.getJSON('../js/json/address.json',function(data){
		var provinces = data.regions;
		$.each(provinces,function(index,province){
			address[province.name] = {};
			var cities = province.regions;
			$.each(cities,function(index,city){
				address[province.name][city.name] = city.regions;
			});			
		});
		initProvince();
	});
	
	function initProvince(){
		$('#province').empty().append('<option value="-1">请选择</option>');
		for(var provinceName in address){
			$('<option value="'+ provinceName+'">'+provinceName+'</option>')
			.appendTo('#province');
		}
	}
	
	function initCity(){
		var provinceName = $('#province').val(),
			cities = address[provinceName];
		$('#city').empty().append('<option value="-1">请选择</option>');
		for(var cityName in cities){
			$('<option value="' + cityName+ '">' + cityName + '</option>')
			.appendTo('#city');
		}		
	}
	
	function initCounty(){
		var ProvinceName = $('#province').val(),
			cityName = $('#city').val(),
			counties = address[ProvinceName][cityName];
		$('#county').empty().append('<option value="-1">请选择</option>');
		for(var i in counties){
			$('<option>' + counties[i].name + '</option>').appendTo('#county');
		}
	}
	
	$("#province").on("change", initCity);
	$("#province").on("change", initCounty);
	$('#city').on('change',initCounty);
	
	
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
