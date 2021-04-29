
		var checkUnload=true;
	$(window).on("beforeunload",function(){
		if(checkUnload) return "이 페이지를 벗어나면 작성된 내용이 저장되지 않습니다.\n 정말 나가시겠습니까?";
	});
	
	
		var fileNum=1;
		var upload = document.querySelector('#upload');
		var reader = new FileReader();
		upload.addEventListener('change',function (e) {
	        var get_file = e.target.files;
	 
	        var image = document.createElement('img');
	 
	        /* FileReader 객체 생성 */
	        var reader = new FileReader();
	 
	        /* reader 시작시 함수 구현 */
	        reader.onload = (function (aImg) {
	 
	            return function (e) {
	                /* base64 인코딩 된 스트링 데이터 */
	                aImg.src = e.target.result
	            }
	        })(image)
	 
	        if(get_file){
	            /* 
	                get_file[0] 을 읽어서 read 행위가 종료되면 loadend 이벤트가 트리거 되고 
	                onload 에 설정했던 return 으로 넘어간다.
	                이와 함게 base64 인코딩 된 스트링 데이터가 result 속성에 담겨진다.
	            */
	            reader.readAsDataURL(get_file[0]);
	        }
	 
	        addImage(image);
	    })

		
		
		function getIndex() {
			var totalItems = $(".carousel-item").length;
			var currentIndex = $("div.active").index() + 1;
			console.log(currentIndex);
			return currentIndex;
		}
		function newPage() {
			var base = $("#albumOnMaking");
			var target = $("div.active");
			var result = '<div class="carousel-item"></div>';
			target.after(result);
						
			base.trigger("refresh.carousel");
			$(".carousel-control-next").click();
		}

		function addImage(fileName) {
			var target = $("div.active");
			var result = fileName;
			target.append(result);
			target.trigger("refresh.carousel");
		}
		function addWriting() {
			var target = $("div.active");
			//원래 class="form-control"이 있었는데 지금은 삭제함.  뭐가 달라질지 잘 모르겠음
			var result = '<textarea class="writing" placeholder="글을 입력해주세요"onkeydown="resize(this)" onkeyup="resize(this)" style="width:40%; height:35px; border-style:none"></textarea>';
			target.append(result);
		}
		function addBlankWriting() {
			var target = $("div.active");
			var result = '<textarea class="blankWriting"  placeholder=""onkeydown="resize(this)" onkeyup="resize(this)" style="width:20%; height:35px; background-color:#CBFFF0; border:none"></textarea>';
			target.append(result);
		}
		function resize(obj) {
			obj.style.height = "1px";
			obj.style.height = (20 + obj.scrollHeight) + "px";
			
		}
		function saveAlbum() {
			var cnt = $("textarea.form-control").length;
			$("textarea").each(function() {
				var text = $(this).val();
				$(this).html(text);
			})

			var newAlbum = $("#albumOnMaking").html();

		}
		function addBlankImage(){
		
			var target = $("div.active");
			var result = '<img src="Images/emptyImage.png" class="tempImage" id="emptyImage" onclick="selectCover()">';
			target.append(result);
			
			target.trigger("refresh.carousel");
		}
		
		
	var upload2 = document.querySelector('#changedImage');
	var reader = new FileReader();
	upload2.addEventListener('change',function (e) {
        var get_file = e.target.files;
        var image = document.createElement('img');
        var reader = new FileReader();
		reader.onload = (function (aImg) {
            return function (e) {
                aImg.src = e.target.result;
            }
        })(image)

        if(get_file){
            reader.readAsDataURL(get_file[0]);
        }
 		
		var temp=$("div.active img[class='tempImage']");
		temp.css("display","none");
		temp.after(image);
		temp.removeClass("tempImage");
		temp.remove();
        /*$("div.active img[class='tempImage']").remove();
        $("div.active").prepend(image);*/
    })
    
		function changeImage(){
			$("#changedImage").click();
		}
		function selectCover(){
			$("#changedImage").click();
		}
		function saveContents(){
			checkUnload=false;
			var length=$(".carousel-item").length;
			 	for(i=1; i<=length; i++){
				$('.carousel-item:nth-child('+i+')').attr('id', "item"+i);
				//console.log(i);
			} 
			var cnt = $("textarea").length;//textarea.form-control 이었음...
			$("textarea").each(function() {
				var text = $(this).val();

				if(text==""){
					text="빈칸을 채워주세요";
				}
				
				
				var w=$(this).width();
				var h=$(this).height();
				var winWid=$("#demo").width();
				$(this).width(w/winWid*100+"%");
				$(this).html(text);
				if($(this).hasClass("writing")){
					$(this).prop('readonly',true);
				}
			})
			$("#title").width("100%");
			$("#intro").width("100%");
			$("#submitThumbnail").val($("#item1").html().split("src=", 2)[1].split('>')[0]);
			$("#submitTitle").val($("#title").val().replace(/(\n|\r\n)/g, '<br>'));
			$("#submitIntro").val($("#intro").val().replace(/(\n|\r\n)/g, '<br>'));
			$("div.active").removeClass("active");
			$(".carousel-item:first-child").addClass("active");
			
			$("#contentSubmit").val($("#albumOnMaking").html().replace(/(\n|\r\n)/g, '&#10;'));
		}
		
		