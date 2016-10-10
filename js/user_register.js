$(function(){
	/*--------------切换选项卡--------------------------*/
	$('.qiehuan span').on('click',function(){
		var index = $(this).index();
		$(this).addClass('clicked').siblings('span').removeClass('clicked');
		$('#userreg div').eq(index).show().siblings('div').hide();
	});

	/*--------------表单验证--------------------------*/
	
	//验证用户名
	var nameOk,
		regi_name;
	$('.user_name').on('blur',function(){
		regi_name = $(this).val().replace(/^\s+|\s+$/,'');
		//验证用户名的模式是否匹配(6-16位字母，数字组成)
		var _reg = /^[a-zA-Z0-9]{6,16}$/;
		if(!regi_name.match(_reg)){
			$(this).siblings('.infoss').text('用户名不能有特殊符号，长度为6-16位');
			nameOk = false;
			return;
		}
		//ajax提交验证用户名是否可以使用
		$.ajax({
			'type':'post',
			'url':'../mock/user.php',
			'async':true,
			'data':{'type':'checkusername','username':regi_name},
			'success':function(data){
				data = JSON.parse(data);
				if(data){
					$('.user_name').siblings('.infoss').text('用户名已存在');
					nameOk = false;
				}else{
					$('.user_name').siblings('.infoss').text('用户名可以使用');
					nameOk = true;
				}
			}
		});
	});


	
	//验证邮箱
	var emailOk,
		regi_emial;
	$('.user_email').on('blur',function(){
		if(!nameOk){
			$(this).siblings('.infoss').text('请先输入用户名');
			return;
		}
		regi_emial = $(this).val().replace(/^\s+|\s+$/,'');
		//验证邮箱的格式是否正确
		if(!regi_emial.match(/^[a-z\d]+(\.[a-z\d]+)*@([\da-z](-[\da-z])?)+(\.{1,2}[a-z]+)+$/)){
			$(this).siblings('.infoss').text('邮箱格式不正确，请填写正确的格式');
			emailOk = false;
			return;
		}
		//ajax提交验证邮箱是否已注册
		$.ajax({
			'type':'post',
			'url':'../mock/user.php',
			'async':true,
			'data':{'type':'checkemail','email':regi_emial},
			'success':function(data){
				data = JSON.parse(data);
				if(data){
					$('.user_email').siblings('.infoss').text('邮箱已注册，请使用新的邮箱');
					emailOk = false;
				}else{
					$('.user_email').siblings('.infoss').text('邮箱可以使用');
					emailOk = true;
				}
			}
		});
	});
	
	
	//验证密码
	var passwordOk,
		regi_pwd;
	$('.user_pwd').on('blur',function(){
		if(!nameOk || !emailOk){
			$(this).siblings('.infoss').text('请先填写用户名和邮箱');
			return;
		}
		regi_pwd = $(this).val();
		if(!regi_pwd.match(/^\w{8,16}$/)){
			$(this).siblings('.infoss').text('密码右8-18位任意字符组成');
			passwordOk = false;
			return;
		}else{
			$(this).siblings('.infoss').text('密码可以使用');
			passwordOk = true;
		}					
	});
	
	//密码确认
	var pwd_confirmOk;
	$('.pwd_confirm').on('blur',function(){
		$(this).siblings('.infoss').text('');
		if(passwordOk){
			if($(this).val() !== regi_pwd){
				$(this).siblings('.infoss').text('密码不一致，请重新输入');
				pwd_confirmOk = false;
				return;
			}
			$(this).siblings('.infoss').text('密码确认成功');
			pwd_confirmOk = true;
		}
	});
	
	//选择密保问题
	var que_value = -1;
	$('#question').on('change',function(){
		que_value = $(this).val();
		$('.anwser').siblings('.infoss').text('');
		$('.anwser').val('');
	});
	
	//验证密码问题答案
	$('.anwser').on('blur',function(){
		$(this).siblings('.infoss').text('');
		var anws_value;
		if(que_value == -1){
			anws_value = '';
			if($(this).val().replace(/^\s+|\s+$/,'')){
				$(this).siblings('.infoss').text('请先选择密保问题');
			}
		}else{
			anws_value = $(this).val();
		}
	});
	
	//勾选复选框 启用提交按钮
	$('#check :checkbox').on('click',submit_regi);
	$(window).on('load',submit_regi);
		
	function submit_regi(){
		var check_status = $('#check :checkbox').prop('checked');
		if(check_status){
			$('#regi button').removeClass('disbld').prop('disabled',false);
		}else{
			$('#regi button').addClass('disbld').prop('disabled',true);
		}
	}
	
	/*---------------提交注册-----------------*/
	$('#regi button').on('click',function(){
		console.log(nameOk,emailOk,pwd_confirmOk);
		if(nameOk && emailOk && pwd_confirmOk){			
			$.ajax({
				'type':"post",
				'url':"../mock/user.php",
				'async':true,
				'data':{"type":"insert","username":regi_name,"password":regi_pwd,'email':regi_emial},
				'success':function(data){
					alert(data);
					window.location.href = '../html/login.html';
				}
			});
		}
	});
	
	//验证用户名是否存在
	/*function checkUsername(name){
		$.ajax({
			'type':'post',
			'url':'../mock/user.php',
			'async':true,
			'data':{'type':'checkusername','username':name},
			'success':function(data){
				data = JSON.parse(data);
				if(data){
					$('.user_name').siblings('.infoss').text('用户名已存在');
				}else{
					$('.user_name').siblings('.infoss').text('用户名可以使用');
				}
			}
		});
	}*/
	
	//验证邮箱是否已被注册
	/*function checkEmail(email){
		$.ajax({
			'type':'post',
			'url':'../mock/user.php',
			'async':true,
			'data':{'type':'checkemail','email':email},
			'success':function(data){
				data = JSON.parse(data);
				if(data){
					$('.user_email').siblings('.infoss').text('邮箱已注册，请使用新的邮箱');
				}else{
					$('.user_email').siblings('.infoss').text('邮箱可以使用');
				}
			}
		});
	}*/
	
	//注册新用户
	/*function addNewUser(name,pwd,email){
		$.ajax({
			'type':"post",
			'url':"../mock/user.php",
			'async':true,
			'data':{"type":"insert","username":name,"password":pwd,'email':email},
			'success':function(data){
				alert(data);
			}
		});
	}*/
	
	
	



});

