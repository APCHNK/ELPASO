$(document).ready(function(){
  var slider__category = new Swiper('.slider__category', {
    autoHeight: true,
    init: true,
    slidesPerView: "auto",
    spaceBetween: 10
  });

  var slider__reviews = new Swiper('.slider__reviews', {
    autoHeight: true,
    init: true,
    slidesPerView: 1,
    navigation: {
        nextEl: '#reviews .swiper-button-next',
        prevEl: '#reviews .swiper-button-prev',
    },
  });


  $(".before-after").twentytwenty();

    new WOW().init();


  $('.open__modal').fancybox({touch: false});


  $("header .pull").on('click', function(e) {
    if ($(this).hasClass('open')){
      $(this).removeClass('open');
      $("header").removeClass('open');
    }else{
      $(this).addClass('open');
      $("header").addClass('open');
    }
    $('header nav ul.main__nav').slideToggle();
  });


  $(".list__faq .title").on('click', function(e) {
    if ($(this).hasClass('open')){
      $(this).removeClass('open');
    }else{
      $(this).addClass('open');
    }
    $(this).next().slideToggle();
  });

  $("#category__page .sidebar li.has-children > a").on('click', function(e) {
    var $parentLi = $(this).parent('li.has-children');
    if (!$parentLi.hasClass('open')) {
        e.preventDefault();
        $parentLi.addClass('open');
        $parentLi.find('ul').slideDown();
    } else {
        $parentLi.removeClass('open');
        $parentLi.find('ul').slideUp();
    }
});


  $("#category__page .sidebar li li a").on('click', function(e) {
    location.href = $(this).attr('href');
  });


  var nav = $('header');

  if ($(this).scrollTop() > 1) {
    nav.addClass("f-nav");
  } else {
    nav.removeClass("f-nav");
  }

  $(window).scroll(function () {
    if ($(this).scrollTop() > 1) {
      nav.addClass("f-nav");
    } else {
      nav.removeClass("f-nav");
    }
  });
});