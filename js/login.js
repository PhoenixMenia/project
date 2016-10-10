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
			$('#password').val(user.pwd);
		}
	});
	$('.verification a').on('click',verification);
	
	
	/*-----------------判断验证码是否正确--------------*/
	var isTrue;
	$('#veristring').on('blur',function(){
		if($(this).val().toUpperCase() == $('#confr').text().toUpperCase()){
			isTrue = true;
		}else{
			$(this).siblings('i').text('验证码错误!');
			isTrue = false;
		}
	}).on('focus',function(){
		$(this).siblings('i').text('');
	});
	
	

	/*--------------------记住用户名和密码-------------------*/
	$('.login_btn').on('click',function(){
		$.cookie.json = true;
		var status = $('#remenber').prop('checked'),
			username = $('#username').val(),
			pwd = $('#password').val(),
			userInfo = {
				'username':username,
				'pwd':pwd
			};
		if(status){	
			$.cookie('userInfo',userInfo,{'expires':7,'path':'/'});
		}else{
			$.cookie('userInfo',userInfo,{'expires':-1,'path':'/'});
		}

		/*-------判断验证码是否正确------*/
		if(!isTrue){
			return;
		}
		//登录
		$.ajax({
			'type':'post',
			'url':'../mock/user.php',
			'data':{'type':'login','username':username,'pwd':pwd},
			'dataType':'json',
			'complete':function(data){ //为什么这里不能用success？ 密码错误不算是success？
				data = data.responseText;
				console.log(data,typeof data);
				if(data){
					console.log('登录成功');
					window.location.href = '../index.html';
				}else{
					alert('用户名不存在或密码不正确');
				}
			}
		});
	
	});

	

		
});