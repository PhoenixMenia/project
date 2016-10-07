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

	$(window).on('load',function(){
		verification();
		$.cookie.json = true;
		var user = $.cookie('userInfo');
		if(user){
			$('#username').val(user.username);
			$('#password').val(user.password);
		}
	});
	$('.verification a').on('click',verification);

	/*--------------------记住用户名和密码-------------------*/
	$('.login_btn').on('click',function(){
		$.cookie.json = true;
		var status = $('#remenber').prop('checked'),
			username = $('#username').val(),
			password = $('#password').val();
			userInfo = {
				'username':username,
				'password':password
			};
		if(status){	
			$.cookie('userInfo',userInfo,{'expires':7});
		}else{
			$.cookie('userInfo',userInfo,{'expires':-1});
		}

		/*-------判断验证码是否正确------*/
		if(!isTrue){
			return;
		}else{
			console.log('验证码正确');
			//待完善。。。。。提交登录
		}
	
	});

	/*-----------------判断验证码是否正确--------------*/
	
	$('#veristring').on('blur',isVerificationTrue);
	var isTrue;
	function isVerificationTrue(){
		if($(this).val().toUpperCase() == $('#confr').text().toUpperCase()){
			$(this).siblings('i').text('验证码正确!');
			isTrue = true;
		}else{
			$(this).siblings('i').text('验证码错误!');
			isTrue = false;
		}
	}



		
});