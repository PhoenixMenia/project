$(function(){
	/*----------------------------------------*/
	$('.qiehuan span').on('click',function(){
		var index = $(this).index();
		$(this).addClass('clicked').siblings('span').removeClass('clicked');
		$('#userreg div').eq(index).show().siblings('div').hide();
	});
});