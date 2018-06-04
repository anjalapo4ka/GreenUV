$(document).ready(function () {
          var masonryMain = $('.featured-products-section .featured-products__list').masonry({
              itemSelector: '.featured-products__item',
              gutter: 20
         });


         $('.header-btn').click(function(e){
             e.preventDefault();
             if($(this).parent().hasClass('mobile-header-btns')){
                 $('body').toggleClass('nooverflow');
                 $('.main-menu').slideToggle();
                 $('.mobile-menu__icon').toggleClass('active');
             }
             var target = $(this).attr('href');
             $(target).show();
         });

        $('.close-form').click(function(){
            $(this).parents().find('.header-form-wrapper').hide();
        })

        $('.header-form-wrapper').click(function(e){
             var target = $(e.target);

            if (target.hasClass('header-form-holder')){
                $('.header-form-wrapper').hide();

            }
        });

    $('.mobile-menu__icon').click(function(){
        $(this).toggleClass('active');
        $('body').toggleClass('nooverflow');
        $('.main-menu').slideToggle();

    })

        window.onkeyup = pressed;
        function pressed(e){
           var key = e.keyCode || e.which;

            if(key == 27){
                 $('.header-form-wrapper').hide();

             }

        }

    $('.header-form-forgot').click(function(e){
        e.preventDefault();
        var target = $(this).attr('href');
        $('.header-form-wrapper').hide();
        $(target).show();
    });


   var isBannerInViewport = true;

    var mouseDown = false;

    if($(".slider-container").length>0 && $(window).width()>560){
        $(".slider-container").twentytwenty();
        $('.twentytwenty-handle-img').attr('src',siteurl.homeurl+'/img/Lamp.png');
        var sectionWidth = $(".slider-container").width();
        var sectionHeight = $(".slider-container").height();
        var getTopBannerSize = function(){
            sectionWidth = $(".slider-container").width();
            sectionHeight = $(".slider-container").height();
        }

        var bacteriaImg ;
        var maxBacteria = 30;
        var timeToRecreate = 310;
        var parentElement;
        var bacteriaCounter = 0;

        var createBacteria = function(){
            bacteriaImg =siteurl.homeurl+'/img/bacteria/Bacteria-';
            if (bacteriaCounter<maxBacteria && isBannerInViewport){
                var layer;
                var newBacteria = document.createElement('div');
                var newBacteriaX = sectionWidth/2 ;
                var newBacteriaY = sectionHeight/2 ;
                var randomXcoord = -200 + Math.random()*400;
                var randomYcoord = -100 + Math.random()*200;
                var randomEndY = -100 + Math.random() * 1.1 * sectionHeight;
                var randomLayer = Math.random();

                var randomType = 1 - 0.5 + Math.random() * 40;
                randomType = Math.round(randomType);

                if(randomLayer<0.33){
                    layer = $('.img.back-main');
                     newBacteria.className = 'bacteria bacteria1';
                }else if(randomLayer>0.32 && randomLayer< 0.66){
                    layer = $('.layer1');
                     newBacteria.className = 'bacteria bacteria2';
                }else{
                    layer = $('.layer2');
                    newBacteria.className = 'bacteria bacteria3';
                }

                bacteriaImg = bacteriaImg + randomType + '.png';

                newBacteria.style.backgroundImage = "url("+bacteriaImg+")";

                newBacteria.style.left = newBacteriaX + randomXcoord +'px';
                newBacteria.style.top = newBacteriaY + randomYcoord +'px';

                $(layer).append(newBacteria);
                bacteriaCounter++;
                var bacteriaTimeLine = new TimelineMax();
                    bacteriaTimeLine.to(newBacteria, 5,
                       {
                        left: -300,
                        top: randomEndY,
                        rotation: "+=480",
                        width: '+=170',
                        height: '+=170',
                        ease: Power0.easeNone,
                        onComplete: function () {
                             parentElement = newBacteria.parentElement;
                             parentElement.removeChild(newBacteria);
                             bacteriaCounter--;

                       }
                     })

            }



        }

       createBacteria();
      var recreateBacteriaTimer = setInterval( createBacteria, timeToRecreate);
        window.addEventListener('resize', getTopBannerSize);


        $('.twentytwenty-handle').mousedown(function(){
            mouseDown = true;
        });
         $('.twentytwenty-handle').mouseup(function(){
            mouseDown = false;
        })
        $('.top-banner-section').mousemove(function(e){

            if (!mouseDown){
                var x=e.clientX;
                var y=e.clientY;
                var layerOne = document.querySelector('.layer1');
                var layerTwo = document.querySelector('.layer2');

                layerOne.style.webkitTransform = 'translateX(' + x/150 + '%) translateY(' + y/150 + '%)';
                layerOne.style.transform = 'translateX(' + x/150 + '%) translateY(' + y/150 + '%)';
                layerTwo.style.webkitTransform = 'translateX(' + x/100 + '%) translateY(' + y/100 + '%)';
                layerTwo.style.transform = 'translateX(' + x/100 + '%) translateY(' + y/100 + '%)';

            }

        })
         var body = $('#sparkles'),
          template = $('.template.shine'),
          stars =  100,
          sparkle = 10;


      var size = 'small';
      var createStar = function() {

        template.clone().removeAttr('id').css({

          top: (Math.random() * 100) + '%',
          left: (Math.random() * 100) + '%',
          webkitAnimationDelay: (Math.random() * sparkle) + 's',
          mozAnimationDelay: (Math.random() * sparkle) + 's',
          oAnimationDelay: (Math.random() * sparkle) + 's',
          animationDelay: (Math.random() * sparkle) + 's'
        }).addClass(size).appendTo(body);
      };

      for(var i = 0; i < stars; i++) {
        if(i % 2 === 0) {
          size = 'small';
        } else if(i % 3 === 0) {
          size = 'medium';
        } else {
          size = 'large';
        }

        createStar();
      }


         $(window).scroll(function(){
            if($(window).scrollTop()>$(".welcome-main-block").offset().top){
                    isBannerInViewport = false;
                }else{
                    isBannerInViewport = true;
                }
         })


    }

   if ( $('.product__slider-main').length ) {
       $('.product__slider-main').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                fade: true,
                asNavFor: '.product__slider-thmb'
            });

     $('.product__slider-thmb').slick({
                slidesToShow: 3,
                slidesToScroll: 1,
                asNavFor: '.product__slider-main',
                dots: false,
                centerMode: true,
                centerPadding: '0',
                vertical: false,
                focusOnSelect: true,
                infinite: true,
                responsive: [
                    {
                      breakpoint: 981,
                      settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        vertical: true

                      }
                    },
                    {
                      breakpoint: 561,
                      settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        vertical: false
                      }
                    }

                  ]
            });

/*
 $('.product__slider-thmb .slick-slide').removeClass('slick-active');


 $('.product__slider-thmb .slick-slide').eq(0).addClass('slick-active');


 $('.product__slider-main').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
 	var mySlideNumber = nextSlide;
 	$('.product__slider-thmb .slick-slide').removeClass('slick-active');
 	$('.product__slider-thmb .slick-slide').eq(mySlideNumber).addClass('slick-active');
});*/



}

   if( $('.open-product__item .product__slider-main .slide').length >0 ){
         $(".open-product__item .product__slider-main .slide").fancybox({
             toolbar: false,
             infobar: false
         });
    }

  const itemCoun = $('.steps[data-target]');
  if(itemCoun.length>0){

    const timeLine = new TimelineMax();

    var count = 0;

    var animIsFinished = true;
     $('.steps').scrollsteps({
            up :  scroll_item_back,
            down : scroll_item_next,
            quietPeriodBetweenTwoScrollEvents: 50
     })



    var controller = new ScrollMagic.Controller();
    var scene = new ScrollMagic.Scene({
                    triggerElement: "#some-scroll-section",
                    triggerHook: "onLeave"
                })
                .setPin("#some-scroll-section")

                .on('enter', function(){
                    top = true;
                })
                .on('leave', function(){
                    scene.removePin('#some-scroll-section');
                })
                .on('end', function(){console.log('scene end callback')})
                .addTo(controller);

    var sectionToTop = false;
    var end = false;
    var top = false;
    var scrolled = false;
    var scrolledTop = false;

    var animOnStart = function(){
        animIsFinished = false;

    }
    var animOnComplete = function(){
        animIsFinished = true;
    }
    var endFunction = function(){
         animIsFinished = true;
         end = true;
    }

    var reverseEnd = function(){
         animIsFinished = true;
         top = true;
    }

    function scroll_item_next(e){

          if (animIsFinished){
            e.preventDefault();
            if (!sectionToTop ){

                sectionToTop = true;

                $('html, body').animate({
                       scrollTop: $("#some-scroll-section").offset().top
               }, 500, function(){
                   sectionToTop = true;

                });


            }
            else{
                top = false;
                if(count < itemCoun.length - 1){
                    if(count == 0){
                        timeLine.addLabel(count)

                            .to('.steps[data-target=2] .img_anim', .22, {
                                opacity:1,ease: Expo.easeInOut, onStart: animOnStart
                            }).add('step1')
                            .to('.steps[data-target=1]', 0.5,{
                                opacity:0,
                            },'step1')
                            .to('.steps[data-target=1]', 0.5,{
                                backgroundPosition: '-2500px 50%',
                            },'step1')
                            .to('.steps[data-target=2]', 0.5,{
                                opacity:1,
                                backgroundPosition: '50%' + ' 50%',
                            },'step1')
                            .to('.steps[data-target=2] .steps-3-img-lamg', .5, {
                                width: "+=250",
                                left:"10%",
                                top: "75%",
                                onComplete: animOnComplete
                            },'step1')
                    }
                    else if(count == 1)
                    {
                        timeLine.addLabel(count)
                            .to('.steps[data-target=1]', 0,{
                                opacity:0, onStart: animOnStart
                            })
                            .to('.steps[data-target=2] .steps-3-img-lamg', .5, {
                                width: "205",
                                left: "27.5%",
                                top: "25.5%",
                                ease: Power2.easeIn
                            }).add('step2')

                            .to('.steps[data-target=3]', 0.5,{
                                opacity:1,
                                backgroundPosition: '50%' + ' 50%',
                                ease: Linear.easeNone

                            }, 'step2')
                            .to('.steps[data-target=2]', 0.5,{

                                backgroundPosition: '50%' + ' 1000px',
                                ease: Linear.easeNone
                            }, 'step2')
                            .to('.steps[data-target=2]', .5,{
                                opacity:0,

                            })
                            .to('.steps[data-target=3] .img_anim', 0,{
                                opacity:1,

                            },'step2')
                            .to('.steps[data-target=3] .img_anim-1', 0,{
                                opacity:0,

                            }, 'step2')
                            .to('.steps[data-target=3] .steps-5-img-lamg', .5,{
                                width: "+=200",
                                left:"79%",
                                top: "79%",
                                ease: Power2.easeInOut,
                                onComplete: animOnComplete
                            },'step2')
                    }
                    else if(count == 2){
                        timeLine.addLabel(count)
                            .to('.steps[data-target=3] .steps-5-img-lamg', .5,{
                                left: "42.8%",
                                width: "136px",
                                top: "66%",
                                ease: Power2.easeInOut,
                                onStart: animOnStart
                            }).add('step3')
                            .to('.steps[data-target=4]', .5,{
                                 opacity:1,
                                 backgroundPosition: '50%' + ' 50%',
                                 ease: Linear.easeNone

                            },'step3')

                            .to('.steps[data-target=3]', .5,{
                                  backgroundPosition: '2500px 50%',
                                  ease: Linear.easeNone
                             },'step3')
                            .to('.steps[data-target=3]', 0,{
                                opacity:0,

                            })
                            .to('.steps[data-target=4] .steps-6-img-lamg', .5, {
                                width: "430px",
                                left:"-70px",
                                top: "86%",
                                ease: Power2.easeInOut,
                                onComplete: animOnComplete
                            },'step3')
                    }
                    else if(count == 3){
                        timeLine.addLabel(count)
                            .to('.steps[data-target=4] .steps-6-img-lamg', .5, {
                                width: "204px",
                                left: "25.5%",
                                top: "81.1%",
                                ease: Power2.easeInOut,
                                onStart: animOnStart
                            }).add('step4')
                            .to('.steps[data-target=5]', .5,{
                                opacity:1,
                                onComplete: endFunction
                            })
                            .to('.steps[data-target=5]', .5,{
                                 backgroundPosition: '50%' + ' 50%'

                            }, 'step4')
                            .to('.steps[data-target=4]', .5,{

                                backgroundPosition: '50%' + ' 1000px',
                                opacity:0,

                            },'step4')
                    }
                    count++;

                }
                else{

                    if(end){
                        scene.removePin('#some-scroll-section');
                        if(!scrolled){
                            scrolled = true;
                              $('html, body').animate({
                                   scrollTop: $(".benefits-section").offset().top
                              }, 800, function(){
                                   scrolled = false;
                                   sectionToTop = false;
                                  console.log('end');
                               });

                            }
                          end = false;

                        }


                    }
            }


        }
    }


    function scroll_item_back(e){
       console.log('animIsFinished = ', animIsFinished);
      if (animIsFinished){
        console.log("next " + count);
        e.preventDefault();
        if(!sectionToTop){
            $('html, body').animate({
               scrollTop: $("#some-scroll-section").offset().top
            }, 800);
            sectionToTop = true;
            end = true;
        }else{


        end = false;
        if(count > itemCoun.length || count != 0){
            if(count == 1){
                timeLine.addLabel(count)
                    .to('.steps[data-target=2] .steps-3-img-lamg', .5, {
                        width: "205",
                        left: "27.5%",
                        top: "25.5%",
                        ease: Power2.easeIn,
                        onStart: animOnStart
                    }).add('reverseStep1')
                    .to('.steps[data-target=1]', .5, {
                        opacity:1,
                        backgroundPosition: '50%' + ' 50%'
                    }, 'reverseStep1')
                    .to('.steps[data-target=2]', .5,{
                        opacity:0,
                        backgroundPosition: '2500px 50%'
                    },'reverseStep1')
                    .to('.steps[data-target=2] .img_anim', .22, {
                        opacity:0, onComplete: reverseEnd
                    })
            }
            else if(count == 2){
                timeLine.addLabel(count)
                    .to('.steps[data-target=3] .steps-5-img-lamg', .5,{
                        left: "42.8%",
                        width: "136px",
                        top: "66%",
                        ease: Power2.easeInOut,
                        onStart: animOnStart
                    }).add('reverseStep2')
                    .to('.steps[data-target=2]', .5,{
                        opacity:1,
                    },'reverseStep2')
                    .to('.steps[data-target=3]', .5,{
                        opacity:0,
                    },'reverseStep2')
                    .to('.steps[data-target=2]', .5,{
                         backgroundPosition: '50%' + ' 50%'

                    }, 'reverseStep2')
                    .fromTo('.steps[data-target=3]', .5,{backgroundPosition: '50%' +' 50%'},{backgroundPosition: '50%' + ' 1000px'},'reverseStep2')
                    .to('.steps[data-target=2] .steps-3-img-lamg', .5, {
                        width: "+=250",
                        left:"10%",
                        top: "75%",
                        ease: Power2.easeInOut,
                        onComplete: animOnComplete
                    },'reverseStep2')
            }
            else if(count == 3){
                timeLine.addLabel(count)
                    .to('.steps[data-target=4] .steps-6-img-lamg', .5, {
                        width: "204px",
                        left: "25.5%",
                        top: "81.1%",
                        ease: Power2.easeInOut,
                        onStart: animOnStart
                    }).add('reverseStep3')
                    .to('.steps[data-target=3]', .22,{
                        opacity:1,
                    },'reverseStep3')
                    .to('.steps[data-target=4]', .22,{
                        opacity:0,
                    }, 'reverseStep3')
                    .to('.steps[data-target=3]', .5,{
                         backgroundPosition: '50%' + ' 50%'

                    }, 'reverseStep3')
                    .fromTo('.steps[data-target=4]', .5,{backgroundPosition: '50%'+' 50%'},{backgroundPosition: '-2500px 50%'},'reverseStep3')

                    .to('.steps[data-target=3] .steps-5-img-lamg', .5,{
                        width: "+=250",
                        left:"79%",
                        top: "79%",
                        ease: Power2.easeInOut,
                        onComplete: animOnComplete
                    },'reverseStep3')
            }
            else if(count == 4 ){
                 timeLine.addLabel(count)
                    .to('.steps[data-target=4]', .3,{
                        opacity:1,
                        onStart: animOnStart
                    }).add('reverseStep4')
                    .to('.steps[data-target=5]', .3,{
                        opacity:0,
                    },'reverseStep4')
                    .to('.steps[data-target=4]', .5,{
                         backgroundPosition: '50%' + ' 50%'

                    }, 'reverseStep4')
                    .fromTo('.steps[data-target=5]', .5,{backgroundPosition: '50%'+' 50%'},{backgroundPosition: '50%' + ' -1000px'},'reverseStep4')
                    .to('.steps[data-target=4] .steps-6-img-lamg', .5, {
                        width: "430px",
                        left:"-70px",
                        top: "86%",
                        ease: Power2.easeInOut,
                        onComplete: animOnComplete

                    },'reverseStep4')
            }

            count--;
        }
        else{
            console.log("else next");
            if(top){
                 if(!scrolledTop){
                    scrolledTop = true;
                      $('html, body').animate({
                           scrollTop: $(".featured-products-section").offset().top
                       }, 800, function(){
                           scrolledTop = false;
                           sectionToTop = false;
                       });
                }

                top=false;

                console.log('scroll to top section');

            }


        }

         }

      }
    }


      if($(window).scrollTop()>$(".benefits-section").offset().top){
                scene.removePin('#some-scroll-section');
                sectionToTop = false;
      }

      $(window).scroll(function(){
            if($(window).scrollTop()==$("#some-scroll-section").offset().top){
                scene.removePin('#some-scroll-section');
                sectionToTop = false;
            }
     })
}
$('.scroll-skip').click(function(){
     scene.removePin('#some-scroll-section');
     $('html, body').animate({
            scrollTop: $(".benefits-section").offset().top
     }, 800);
    sectionToTop=false;
})  ;



if($('#video').length>0){
    var video = document.getElementById('video');
    var videoPaused=true;
   // video.setAttribute('poster', siteurl.homeurl+'/img/poster.jpg');
    $('.playbtn').click(function(){
        video.play();
        $('.video-overlay').hide();
        video.setAttribute('controls', true);
    });
    $('#video').click(function(){
        if(video.paused || video.ended){
            video.play();
            video.setAttribute('controls', true);

        }
        else{
            video.pause();
            $('.video-overlay').show();
            video.setAttribute('controls', false);

        }


    })

}

if ( $('.js_review-slider').length ) {
  $('.js_review-slider').slick({
          nextArrow: '',
          prevArrow: '',
          dots: true,
          vertical: false,
          infinite: true,
          speed: 300,
          slidesToShow: 3,
          slidesToScroll: 3,
         adaptiveHeight: true,
          responsive: [
            {
              breakpoint: 981,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                vertical: false,
                  adaptiveHeight: true
              }
            },
            {
              breakpoint: 561,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                vertical: false
              }
            }

          ]
            });}
       if ( $('.js_review-slider-tablet').length ) {
          $('.js_review-slider-tablet').slick({
                  nextArrow: '',
                  prevArrow: '',
                  dots: true,
                  vertical: false,
                  infinite: true,
                  speed: 300,
                  slidesToShow: 1,
                  slidesToScroll: 1,
                adaptiveHeight: true,
                    });}



    $('.tab-link').click(function(e){
        e.preventDefault();
       /* var target=e.target.getAttribute('href');
        $('.products-tabs__item').removeClass('opened')
        $(target).addClass('opened');*/
       // masonry.masonry('destroy');
    })




    if($('.mobile-scroll-section-slider').length>0){
       $('.mobile-scroll-section-slider').slick({
          nextArrow: '',
          prevArrow: '',
          dots: true,
          vertical: false,
          infinite: true,
          speed: 300,
          slidesToShow: 1,
          slidesToScroll: 1

       })
    }

});
