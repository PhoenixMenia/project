$(function(){

	/*===========================sideBar ==============================*/
	var $side_bar = $('#side_bar_li').children().not('.li_tit');
	$side_bar.each(function(index,element){
		$(element).hover(function(){
			$('.details').eq(index).show();
		},function(){
			$('.details').eq(index).hide();
		});
	});
	$('.details').hover(function(){
		$(this).show();
	},function(){
		$(this).hide();
	});

	/*========================轮播图========================*/

	var $banner_img = $('#banner img');
	var len=$banner_img.length;
	var timer = null;
	var currIndex = 0;
	var nextIndex = 1;
	var $spans = $('#banner span');
	
	function fadeInOut(){
		$banner_img.eq(currIndex).fadeOut(500);
		$banner_img.eq(nextIndex).fadeIn(500);	
		$spans.eq(nextIndex).addClass('curr').siblings('span').removeClass('curr');
		currIndex = nextIndex;
		nextIndex++;
		if(nextIndex>=len){
			nextIndex = 0;
		}
	}
	
	// timer = setInterval(fadeInOut,3000);
	$spans.each(function(index,element){
		$(this).on('click',function(){
			nextIndex = index;
			fadeInOut();
		});
	});

	$('#banner').hover(function(){
		clearInterval(timer);
	},function(){
		timer = setInterval(fadeInOut,3000);
	}).trigger('mouseleave');

	/*========================轮播图END========================*/

	//随机显示图片
	var pics_arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],
		discp = ['世纪中一 铁网笔筒（圆形）','易尔高(EAGLE)938力士型订书机 订2-100张机身长度28','施德楼(Staedtler) 荧光笔 (#364-1)','紫光鸿运 OP-598 无线鼠标','豪桦利 DF02A 票据夹 48开 240*103*20mm','TP-LINK TL-WR742N 150M无线路由器','高品乐 A4/70g复印纸5包/箱','佳能 FX-9 黑色硒鼓(适用L100 MF4120 4010)','联想 LD2441硒鼓(适用LJ2400 7400 7450F)','蓝巨强 A4/70g 复印纸 10包/箱','得力（deli）7401 莱茵河70克A4复印纸 打印纸 5包/箱','三星 SCX-4521D3 黑色硒鼓(适用SCX-4321','得力(Deli)6230 30cm有机塑料直尺','联想 LD2441硒鼓(适用LJ2400 7400 7450F)','佳能（Canon）PG-815黑色墨盒(适用IP2780 2788','佳能（Canon）PG-815黑色墨盒(适用IP2780 2788'],
		price = ['¥8.30/个','¥3.60/个','¥110.00/个','¥110.00/个','¥5.00/把','¥19.90/盒','¥560.00/张','¥98.00/箱','¥425.00/支','¥4.00/条','¥4.00/条','¥5.00/打','¥495.00/支','¥92.00/箱','¥1.60/把','¥790.00/台'],
		str1 = 'imgs/index/promotion/prod',
		str2 = '.jpg',
		$pics = $('.prod_imgs img');

	$(window).on('load',function(){
		timer = setInterval(function(){
			$pics.each(function(index,element){
				var len = pics_arr.length,
					random_num = parseInt(Math.random()*len);
				this.src = str1 + pics_arr[random_num] + str2;
				$(this).parents('.prod_imgs').find('a').text(discp[random_num]);
				$(this).parents('.prod_imgs').find('span').text(price[random_num]);
				pics_arr.splice(random_num,1);
				discp.splice(random_num,1);
				price.splice(random_num,1);
				if(len<=4){
					pics_arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
					discp = ['世纪中一 铁网笔筒（圆形）','易尔高(EAGLE)938力士型订书机 订2-100张机身长度28','施德楼(Staedtler) 荧光笔 (#364-1)','紫光鸿运 OP-598 无线鼠标','豪桦利 DF02A 票据夹 48开 240*103*20mm','TP-LINK TL-WR742N 150M无线路由器','高品乐 A4/70g复印纸5包/箱','佳能 FX-9 黑色硒鼓(适用L100 MF4120 4010)','联想 LD2441硒鼓(适用LJ2400 7400 7450F)','蓝巨强 A4/70g 复印纸 10包/箱','得力（deli）7401 莱茵河70克A4复印纸 打印纸 5包/箱','三星 SCX-4521D3 黑色硒鼓(适用SCX-4321','得力(Deli)6230 30cm有机塑料直尺','联想 LD2441硒鼓(适用LJ2400 7400 7450F)','佳能（Canon）PG-815黑色墨盒(适用IP2780 2788','佳能（Canon）PG-815黑色墨盒(适用IP2780 2788'];
					price = ['¥8.30/个','¥3.60/个','¥110.00/个','¥110.00/个','¥5.00/把','¥19.90/盒','¥560.00/张','¥98.00/箱','¥425.00/支','¥4.00/条','¥4.00/条','¥5.00/打','¥495.00/支','¥92.00/箱','¥1.60/把','¥790.00/台'];
				}
			});
		},5000);
	});

	/*在线交流======点击事件*/
	var $chat_img = $('#chat_online img');

	$chat_img.on('click',function(){
		$('#chat_online').hide(200);
	});
	$('#open').on('click',function(){
		$('#chat_online').show(200);
	});

	/*===========在线客服滑动效果=========*/
	var wrapWidth = $('#service_wrap').outerWidth();
	var onOff = true;	
	$('#service').on('click',function(){
		if(onOff){
			$('#service_wrap').animate({'right':0},200);
		}else{
			$('#service_wrap').animate({'right':-wrapWidth},200);
		}
		onOff = !onOff;
	});
	
});