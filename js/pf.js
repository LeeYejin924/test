$(document).ready(function () {
  // header는 4초 후에 보여진다
  $('#header').addClass('active');

  // 0.5초 뒤에 #wrap.load 를 추가해서 이미지와 흰육각형 회전
  setTimeout(function () {
    $('#wrap').addClass('load');
  }, 500);

  // 텍스트 bounce 되어 내려오기
  $('#cnt1 h2 .tit span').each(function (idx) {
    $(this).css('animationDelay', 2.5 + idx * 0.1 + 's').addClass('ani')
  });

  //본문2
  $('#cnt2 .view').on('click', function () {
    $(this).parent().fadeOut().siblings().fadeIn()
  });

  //본문3
  var mySwiper = new Swiper('#mainVisual', {
    // Optional parameters
    direction: 'horizontal', //vertical
    // loop: true, //처음과 마지막에서 반복 롤링, 기본값 false

    // 하단에 위치한 페이지네이션: 동그라미, 숫자
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets', //기본값 bullets, fraction
      clickable: true,
    },

    // 이전과 다음버튼
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    // 접근성 추가 : accessibility
    a11y: {
      prevSlideMessage: '이전 슬라이드 보기',
      nextSlideMessage: '다음 슬라이드 보기',
      firstSlideMessage: '첫번째 슬라이드', //첫번째 슬라이드에 있을때 이전 버튼에 대한 보조기기에 대한 메시지
      lastSlideMessage: '마지막 슬라이드',
    },

    // 자동실행
    // autoplay: {
    //   delay: 5000, //1초 1000
    // },
  });

  //★ 자동실행, 일시정지 컨트롤 버튼 추가
  $('#mainVisual .play_pause').on('click', function () {
    if ($(this).hasClass('swiper-button-play')) {
      mySwiper.autoplay.start();
    } else {
      mySwiper.autoplay.stop();
    }
    $(this).hide().siblings('button').show();
  });
});