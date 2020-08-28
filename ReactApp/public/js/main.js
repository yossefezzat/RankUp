$(document).ready(function(){

  // To Add Scroll Class to navbar
  navbar_checker();
  $(window).on('scroll',function(){
    navbar_checker();
  });

  // Adjust Go Down Arrow
  $('.js-goDown').on('click',function(){
    let firstSection = $('.about-us').offset().top + 20;
    $('html,body').animate({
        scrollTop : firstSection,
    },400);
  })

  // Adjust Sidebar
  $(".js-activeSideBar").on('click',function(){
    $('.'+$(this).data('sidebar')).toggleClass($(this).data('class'));
  })
  sidebar_checker();
  $(window).on('scroll',function(){
    sidebar_checker();
  });
  $('.sidebar-nav li').on('click',function(){
    if($(this).hasClass('active')){
      return;
    }
    let curSection = $(this).data('section');
    let secOffset = $('.' + curSection).offset().top - 45;
    $('html,body').animate({
        scrollTop : secOffset,
    },800);
  })







  
  /* ---------------------------- Functions ----------------------------*/

  // Function To Add Scroll to navbar
  function navbar_checker(){
    var scrollTop = $(window).scrollTop();
    if(scrollTop>=120){
      $('.navbar').addClass('scroll');
    }else{
      $('.navbar').removeClass('scroll');
    }
  }

  // Function To Add Active Class to sidebar
  function sidebar_checker(){
    $('section,header').each(function(){
      let scrollTop = $(window).scrollTop() + 46;
      if( scrollTop >= $(this).offset().top){
        let curSection = $(this).data('section');
        $('#'+curSection).addClass('active').siblings().removeClass('active');
      }
    })
  }


});
