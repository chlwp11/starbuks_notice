;(function($){

  //var board = new Object(); //생성자 방식

    var board = {      //리터럴 방식
        init: function(){
          
          this.boardFn();

        },
        boardFn: function(){
          // 웹 사이트 로딩시 AJAX 실행
          // JSON 데이터 파일을 읽어들여서 
          // 테이블 TBODY에 출력 글 번호 또는 날짜 내림차순

            var $tbody = $('.board tbody');      
            var $prevBtn = $('.prev-btn');           
            var $nextBtn = $('.next-btn');    
            var $pageBtn = $('.page-btn');  
            var $pageNumberBox = $('.page-number-box ul');  //페이지 버튼이 들어갈 요소 선택자     
       

            var a = [];
            var txt = '';
            var list = 8; //한 화면의 목록 갯수

            var total = null; //313 전체 레코드 갯수
            var totalPageNum = null; //63 전체 페이지 수
            var pageNumList = 5; //페이지그룹 10개씩
            var pageGroupNum = Math.ceil(totalPageNum / pageNumList ); //7 페이지 
            
            var startNum = 0;
            var endNum = list;
            
            var groupCnt = 0; //그룹페이지 다음화살 클릭 시 1씩 증가 카운트 변수
            var groupStartNum = groupCnt * pageNumList;  //그룹 시작번호 0
            var groupEndNum = groupStartNum + pageNumList; //그룹 끝번호 10
                




              function ajaxRunFn(){
                $.ajax({
                  url:'./data/board.json',
                  dataType:'json',
                  success:function(result){

                    $.each(result.notice, function(idx,obj){

                        a[idx] = [];
                    
                        a[idx][0] = obj.NO;    
                        a[idx][1] = obj.제목;    
                        a[idx][2] = obj.날짜;    
                        a[idx][3] = obj.조회수;    
                      
                      }); 

                      total = a.length; //총 레코드 수

                      function listOutputFn(){
                        txt = '';
                        $tbody.empty(); //테이블 내용 상제
                        /* $tbody.html(''); //테이블 내용 상제 */
                      
                        //페이지 버튼클릭할때는 그 버튼의 텍스트가 시작번호
                        for(var i=startNum; i<endNum; i++){ 
                          txt += "<tr>"; 
                          for(var j=0; j<=3; j++){
                            txt += "<td>" + a[i][j] + "</td>";
                          }
                          txt += "</tr>";
                        }

                        $tbody.html( txt );
                        
                        txt = '';
                        totalPageNum = Math.ceil( total / list );
                      
                      }


                      listOutputFn();
                      
                      
                      groupEndNum = groupStartNum + pageNumList; 
                      pageGroupNum = Math.ceil(totalPageNum / pageNumList ); 
                      
                      


                      function pageNation(){
                        
                        $pageNumberBox.html('');
                        txt = '';

                        console.log('페이지네이션 카운트', groupCnt );

                        groupStartNum = groupCnt * pageNumList; 
                        groupEndNum   = groupStartNum + pageNumList;
                        
                        if( groupEndNum >  totalPageNum ){ 
                          groupEndNum = totalPageNum;     
                        }
  
                        
                        for(var i=groupStartNum; i<groupEndNum; i++){ 
                      
                          if(i % pageNumList  == 0){
                            txt += '<li><a href="javascript:" class="page-btn addPage">' + (i+1) + '</a></li>'
                          }
                          else{
                            txt += '<li><a href="javascript:" class="page-btn">' + (i+1) + '</a></li>'
                          }
                        }
  
                        
                        //웹페이지에 로드
                        $pageNumberBox.html( txt );
                        //$pageNumberBox.append( txt );
                        $pageBtn = $('.page-btn');

                        //다음화살버튼 , 이전화살버튼 클릭 시
                        startNum = (parseInt($pageBtn.eq(0).text())-1) * list; 
                        endNum   = startNum + list;

                        if(endNum > total){
                          endNum = total; 
                          }

                          listOutputFn();
                        
                      }

                      
                      setTimeout( pageNation,100);

                      //좌우 화살 그룹 버튼 클릭 이벤트

                      $prevBtn.on({
                        click:function(){
                          groupCnt--;
                          if(groupCnt<0){
                            groupCnt=0
                            }
                            pageNation(); //그룹 페이지 호출
                          }
                      });

                      $nextBtn.on({
                        click:function(){
                          groupCnt++;
                            if(groupCnt>pageGroupNum-1){
                              groupCnt=pageGroupNum-1;  
                              return false; //우측 끝에서 버튼 클릭 취소
                            }
                            
                            pageNation(); 
                          }
                      });

                      
                     
                      $(document).on('mouseenter', '.page-btn', function(){
                        $pageBtn.each(function(idx){
                          $(this).on({
                            click:function(e){
                              e.preventDefault();                       

                              $pageBtn.removeClass('addPage');
                              $(this).addClass('addPage');

                              startNum = (parseInt($(this).text())-1) * list; 
                              endNum   = startNum + list;

                              if(endNum > total){
                                endNum = total; 
                                }

                                listOutputFn();
                            }
                          });
                        });
                      }); 


            
                },
                  error:function(){
                    alert('ERROR');
                  }
                }
                )}

                
            ajaxRunFn();

        }
    
    } // 객체 끝 

    board.init();

    

})(jQuery);