// JavaScript Document

$(function(){
	
	
	//左右滚动
	
	 	
	
	
		$(".infoIndexCon .zoom .list li").eq(0).show();
		$(".infoIndexCon .zoom .btn .wrap ul li").each(function(index){
			$(this).click(function(){
				$(".infoIndexCon .zoom .list li").eq(index).fadeIn(600).siblings("li").fadeOut(600);
				$(this).addClass("hover").siblings("li").removeClass("hover");
			});
		});
		
//数量选择按钮
		$(".conList li .duihuan .jiajian .jian").click(function(){
				var num = $(this).parent().prev('.txt').val();
				if(num>1){num--}else{return false;}
				$(this).parent().prev('.txt').val(num);
			});
		$(".conList li .duihuan .jiajian .jia").click(function(){
				var num = $(this).parent().prev('.txt').val();
				num++;
				$(this).parent().prev('.txt').val(num);
			});
//end 数量选择按钮 
		$(".integration .integrationSortList dl").hover(function(){
				$(this).addClass("hover");
			},function(){
				$(this).removeClass("hover");
				});

		$(".sortIndexNews .tabTit li").each(function(index){
			$(this).hover(function(){
				$(this).addClass("hover").siblings("li").removeClass("hover");
				$(".sortIndexNews .con").eq(index).show().siblings('.con').hide();
				});
			});


		$(".service .btn").toggle(function(){
				$(".service").animate({"right":"0px"},200);
			},function(){
				$(".service").animate({"right":"-150px"},200);
				});
				
		function banner(){
			var index = 0;
			var len = $(".banner .list li").length;
			var time;
			
			$(".banner .list li").eq(0).show();
			$(".banner .btn li").mouseover(function(){
					index = $(".banner .btn li").index(this);
					show(index);							
				})
			
			$('.banner .l').click(function(){
					if(index==0){
						index= len;
						}
					index--;
					show(index);
				});
			$('.banner .r').click(function(){
					index++;
					if(index==len){index = 0}
					show(index);
				});
			$(".banner").hover(function(){
				 clearInterval(time);
				},function(){
				time = setInterval(function(){
						index++;
						if(index==len){index = 0}
						show(index);
					},3000);
				}).trigger("mouseleave");
			
			function show(index){
				$(".banner .list li").eq(index).fadeIn(600).siblings("li").fadeOut(600);
				$(".banner .btn li").eq(index).addClass("hover").siblings("li").removeClass("hover");
			}
		}
		banner();
		
		
		function scroll_index(){
			var play;
			var $con = $("header .topScroll .con .wrap");
			function top(){
				$con.css({"top":-35});
				$con.stop(false,false).animate({"top":0},500);
				$con.children("a:last").prependTo($con);
			}
			function bom(){
				$con.stop(true,true).animate({"top":-35},500,function(){
					$con.css({"top":0});
					$con.children("a:first").appendTo($con);
				});
			}
			function auto(){		
				play = setInterval(function(){
					bom();
				}, 3000); 
			}
			auto();
			$("header .topScroll").hover(function(){
				clearInterval(play);						  
			},function(){
				auto();
			});
			
			$("header .topScroll .top").click(function(){
				top();
			})
			$("header .topScroll .bom").click(function(){
				bom();
			});
		}
		scroll_index();

		function index_List(){
			var $wrap = $(".indexListBanner .indexListWrapP");
			var time,timeLi;
			$wrap.find(".indexList li").each(function(index){
				$(this).hover(function(){
						clearTimeout(time);
						clearTimeout(timeLi);
						time = setTimeout(function(){
								$wrap.children(".con").eq(index).show().siblings(".con").hide();
							},120);
					},function(){
						
						timeLi = setTimeout(function(){
								$wrap.children(".con").eq(index).hide();
							},120);
						});
			});
			$wrap.children(".con").each(function(index){
				$(this).hover(function(){
					clearTimeout(timeLi);
					clearTimeout(time);
					$wrap.find(".indexList li a").eq(index).addClass("hover").parent("li").siblings("li").children("a").removeClass("hover");
				},function(){
					var $_this=$(this);
					timeLi = setTimeout(function(){
						$_this.hide();
					},120);
					setTimeout(function(){$wrap.find(".indexList li a").removeClass("hover")},120);
				});
			});
		}
		index_List();
		
		
		function tab(li,con,cls){
				$(con).eq(0).show();
				$(li).each(function(index) {
					$(this).mouseover(function(){
							$(con).eq(index).show().siblings(con).hide();
							if(cls){
									$(this).addClass(cls).siblings().removeClass(cls);
								}
						});
				});
			}
		tab(".featuredProducts .tab .tit li",".featuredProducts .tab .textList","hover");
		tab("#indexShopBox1 .titList dd","#indexShopBox1 .conList","hover");
		tab("#indexShopBox2 .titList dd","#indexShopBox2 .conList","hover");
		tab("#indexShopBox3 .titList dd","#indexShopBox3 .conList","hover");
		tab("#indexShopBox4 .titList dd","#indexShopBox4 .conList","hover");
		tab("#indexShopBox5 .titList dd","#indexShopBox5 .conList","hover");
		tab("#indexShopBox6 .titList dd","#indexShopBox6 .conList","hover");
		
		
		
		$("header.sub .nav.subMember dt").hover(function(){
				$(this).stop(false,false).children(".indexListWrapP").slideDown(10);
			},function(){
				$(this).stop(false,false).children(".indexListWrapP").slideUp(10);
				});
		
		
		
		function index_List2(){
			var $wrap = $("header.sub .nav.subMember .indexListWrapP");
			var time,timeLi;
			$wrap.find(".indexList li").each(function(index){
				$(this).hover(function(){
						clearTimeout(time);
						clearTimeout(timeLi);
						time = setTimeout(function(){
								$wrap.children(".con").eq(index).show().siblings(".con").hide();
							},120);
					},function(){
						
						timeLi = setTimeout(function(){
								$wrap.children(".con").eq(index).hide();
							},120);
						});
			});
			$wrap.children(".con").each(function(index){
				$(this).hover(function(){
					clearTimeout(timeLi);
					clearTimeout(time);
					$wrap.find(".indexList li a").eq(index).addClass("hover").parent("li").siblings("li").children("a").removeClass("hover");
				},function(){
					var $_this=$(this);
					timeLi = setTimeout(function(){
						$_this.hide();
					},120);
					setTimeout(function(){$wrap.find(".indexList li a").removeClass("hover")},120);
				});
			});
		}
		index_List2();		
		
		
		
		
		
	
		$("#_list li").mouseover(function(){
			var $m=$(this).index();
			var $mSrc=$("#_list li").eq($m).find("img").attr("src");
			//alert($mSrc)
			$(".big_pic img").attr("src",$mSrc)	
		})	

		
	})



