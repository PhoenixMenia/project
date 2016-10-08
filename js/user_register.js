$(function(){
	/*--------------切换选项卡--------------------------*/
	$('.qiehuan span').on('click',function(){
		var index = $(this).index();
		$(this).addClass('clicked').siblings('span').removeClass('clicked');
		$('#userreg div').eq(index).show().siblings('div').hide();
	});

	/*--------------表单验证--------------------------*/
	$('.user_name').on('blur',function(){
		
	});






});

