$(document).ready(function () {
  /* 모달 열기 버튼 클릭시 동작
    1) 변수 선언
    2) 모달 스크롤 제어
    3) 열려진 모달을 제외하면 스크린리더가 접근하지 못하도록 제어
    4) #dim 동적 생성
    5) resize 이벤트로 모달창의 위치 제어
    6) 위치 제어가 끝나면 #dim,  상세 모달을 보여지게 처리 -> .first에 포커스 강제 이동
    7) 포커스 접근성 추가 => keydown 이벤트
    .first에서 shift+tab을 누르면 .last 되돌리기 => e.shiftKey
    .last에서 shift(X)+tab을 누르면 .first 되돌리기 => !e.shiftKey

    모달 닫기 클릭이벤트 : #dim, esc 키보드를 누른 경우도 닫기
    초기상태로 되돌리기
    1) 모달 스크롤 제어 삭제하기 => html, body 태그의 style 속성 제거
    2) #dim 숨기기(fadeOut()) -> 완료함수 제거 remove()
    3) 상세 모달을 숨기기(visibility: hidden), 열려진 모달을 제외하면 스크린리더가 접근할수 있도록 2가지 속성 제거(aria-hidden, inert)
  */
  $('.mdopen_btn').on('click', function () {
    // 1) 변수 선언
    var _openBtn = $(this); //닫기버튼을 클릭하면 열기버튼으로 강제 포커스 이동
    var _mdCnt = $($(this).data('href')); //열려질 상세 모달
    var _closeBtn = _mdCnt.find('.mdclose_btn'); //열려진 모달의 닫기 버튼
    var _first = _mdCnt.find('.first'); //포커스 제어
    var _last = _mdCnt.find('.last');   //포커스 제어
    var timerResize = 0;  //resize 이벤트가 누적되어 성능이 느려지는 것을 제어
    // console.log(_mdCnt, typeof _mdCnt); //#modal1 string, #modal2 string

    // 2) 모달 스크롤 제어
    var wrapHei = $('#wrap').height();    // 현재 문서의 높이
    var scrollY = $(window).scrollTop();  // 현재 스크롤바가 움직인 거리를 저장
    //console.log(wrapHei, scrollY);

    // html, body의 높이를 강제로 변경해서 고정 -> 스크롤을 현재 위치로 추가 제어
    $('html, body').css({height: wrapHei, overflow: 'hidden'});
    $(window).scrollTop(scrollY); //변수에 담긴 스크롤위치로 강제 지정

    // 3) 열려진 모달을 제외하면 스크린리더가 접근하지 못하도록 제어
    // inert 현재 지원브라우저는 제한적이다, 비활성, 불활성 상태를 의미
    _mdCnt.siblings().attr({'aria-hidden': true, inert: ''});

    // 4) #dim 동적 생성 : 열려진 상세모달창 바로 앞에 검정불투명마스크(dim) 생성
    _mdCnt.before('<div id="dim"></div>');
    var _dim = $('#dim');

    // 6) 위치 제어가 끝나면 #dim,  상세 모달을 보여지게 처리 -> .first에 포커스 강제 이동
    _dim.stop().fadeIn().next().css('visibility', 'visible');
    _first.focus();

    // 7-1) 포커스 접근성 추가 => keydown 이벤트
    // .first에서 shift+tab을 누르면 .last 되돌리기 => e.shiftKey
    _first.on('keydown', function (e) {
      console.log(e.keyCode); //9
      if (e.shiftKey && e.keyCode === 9) {
        e.preventDefault(); //다음 포커스로 이동하지 못하도록 기본기능 제한
        _last.focus();
      }
    });

    // 7-2) 포커스 접근성 추가 => keydown 이벤트
    // .last에서 shift(X)+tab을 누르면 .first 되돌리기 => !e.shiftKey
    _last.on('keydown', function (e) {
      if (!e.shiftKey && e.keyCode === 9) {
        e.preventDefault();
        _first.focus();
      }
    });

    // 모달 닫기 클릭이벤트 : #dim, esc 키보드를 누른 경우도 닫기
    _closeBtn.on('click', function () {
      // 1) 모달 스크롤 제어 삭제하기 => html, body 태그의 style 속성 제거
      $('html, body').removeAttr('style');

      // 2) #dim 숨기기(fadeOut()) -> 완료함수 제거 remove()
      _dim.stop().fadeOut(function () {
        $(this).remove();
      });

      // 3) 상세 모달을 숨기기(visibility: hidden), 열려진 모달을 제외하면(나머지 형제들은) 스크린리더가 접근할수 있도록 2가지 속성 제거(aria-hidden, inert)
      _mdCnt.css('visibility', 'hidden').siblings().removeAttr('aria-hidden inert');

      // 4) 열기버튼으로 포커스 강제 이동
      _openBtn.focus();
    });

    // #dim을 클릭하면 모달 닫기기
    _dim.on('click', function () {
      _closeBtn.click();
    });

    // esc 키보드를 누른 경우도 닫기
    $(window).on('keydown', function (e) {
      //console.log(e.keyCode); //27
      if (e.keyCode === 27) _closeBtn.click();
    });

  });
});