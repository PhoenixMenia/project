$(function(){
	/*----------------------验证码---------------------*/

	//定义产生验证码主函数
	function verification(){
		var veri = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
			len = veri.length,
			veri_str = '';
		for(var i=0; i<4; i++){
			rand = parseInt(Math.random()*len);  //0~25
			veri_str += veri[rand];
		}
		$('.verification span').text(veri_str);
	}

	$(window).on('load',verification);
	$('.verification a').on('click',verification);
		
});