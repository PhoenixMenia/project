$(function(){
	
	$.cookie.json = true;
	/*---------显示当前用户----------*/
	var user_curr = $.cookie('userInfo');
	if(user_curr){
		$('#user').text(user_curr.username);
		$('#mask').hide();
	}else{
		$('#mask').show();
	}
	
	/*------------------读取cookie中的购物车信息并显示------------------*/	
	var products = $.cookie('products');
	$.each(products,function(index,element){
		var price = element.price.replace(/￥|\/|[\u2E80-\u9FFF]/g,''),
			sub_ttl = '￥' + (price * element.num).toFixed(2) + '元',
			unit = element.price.substring(element.price.length-1);
		$('.cart_infos .template').clone(true).removeClass('template')
		.addClass('prod_item').insertBefore('.total_info').find('img')
		.prop('src',element.imgSrc).next('p').children('a').text(element.name)
		.next('span').text('颜色：'+element.color).parents('td').siblings('.prod_price').
		text(element.price).next('.prod_unit').text(unit).next('.prod_num').children('.num')
		.val(element.num).end().next('.total').text(sub_ttl).parents('.prod_item')
		.data('product',element);
	});
	get_ttl_amount();  //计算总金额
	
	//修改小计的函数
	function cacl_sub_ttl(num,$ele){
		var _prod = $ele.data('product'),
			_subttl = _prod.price.replace(/￥|\/|[\u2E80-\u9FFF]/g,'') * num;
		_prod.num = num;
		$.cookie('products',products,{'expires':7,'path':'/'});
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
		$.cookie('products',products,{'expires':7,'path':'/'});
		$(this).parents('.prod_item').remove();
		
		get_ttl_amount();
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
