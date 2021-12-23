$(function () {
    var header = $('.header'),
        buttonToggle = $('.navbar-toggle'),
        navbarBrand = $('.navbar-brand'),
        buttonToggleActive = 'navbar-toggle--active',
        headerHeading = $('.header-heading'),
        headerParagraph = $('.header-paragraph'),
        buttonToggleIcon = $('.header-icon'),
        navbarNav = $('.navbar-nav'),
        navLink = $('.navbar-link'),
        navItem = $('.navbar-item'),
        navbarItemList = $('.navbar-item-list');

    // CLICK NAVBAR LINK
    navLink.on('click', function (e) {

        // DISABLED HASH WIDTH PERVENT DEFAULT
        e.preventDefault();

        // FADE TOGGLE 
        $(this).siblings(navbarItemList).fadeToggle(500);

    });

    ////////////////////////////////////////
    // START TWEENLITE
    var tl = new TimelineLite(),
        timeDu = 2;

      // LOAD SITE 
      const loading = $('.loading'),
      loadingSpinner = $('.loading-object'),
      loadingActive = 'loading--active';

    $(window).on('load', function() {

        loadingSpinner.fadeOut(0, function() {
            // ADD CLASS LOADING ACTIVE
            loading.addClass(loadingActive);
              // TIME LINE LITE
              tl
              .to(loading, timeDu, {display: 'none'})
              .add('buttonToggle')
              .fromTo(buttonToggle, timeDu, {autoAlpha: 0, x: 200}, {autoAlpha: 1, x: 0, ease:Power4.easeInOut})
              .fromTo(navbarBrand, timeDu, {autoAlpha: 0, x: -200}, {autoAlpha: 1, x: 0, ease:Power4.easeInOut}, 'buttonToggle')
              .from(headerHeading, timeDu, {autoAlpha: 0, y: 100, ease:Power1.ease})
              .from(headerParagraph, timeDu, {autoAlpha: 0, y: 100, ease:Power1.ease})
              .to(buttonToggleIcon, timeDu, {css:{className: '+=header--icon'}})
        });
       
    });

  // TOGGLE CLASS ACTIVE AND NAVBAR FADETOGGLE
  buttonToggle.on('click', function() {

    // TOGGLE CLASS ACTIVE INCLUDE BUTTON TOGGLE NAVBAR
    $(this).toggleClass(buttonToggleActive).end();

    // FADE TOGGLE NAVBAR
    navbarNav.fadeToggle(500);

    // IS NOT INCLUDE CLASS BUTTON TOGGLE ACTIVE ALSO NAVBAR ITEM LIST FADEOUT 
    $(this).not().hasClass(buttonToggleActive) ? navbarItemList.fadeOut(0) : false;

    // TWEEN LITE STAGGER NAVBAR ITEM 
    $(window).width() <= 900 &&  $(this).not().hasClass(buttonToggleActive) ? 
    tl.staggerFromTo(navItem, timeDu, {autoAlpha: 0, x: 200}, {autoAlpha: 1, x: 0, ease:Power3.ease}, .2) : false;

});

// VIDEO IFRAME
var btnPopup = $('.our-work-button'),
    popUp = $('.pop-up'),
    popUpiframe = popUp.find('iframe'),
    popUpBox = $('.pop-up-box'),
    popUpIcon = $('.pop-up-icon');


btnPopup.on('click', function(e) {

    // ANCHOR TAG PREVENTDEFAULT
    e.preventDefault();

    // POPUP FADEIN
    popUp.fadeIn(200);
    
    // COPY ATTR HREF FROM BTNPOPUP TO POPUP IFRAME
    var  btnPoupHref = $(this).attr('href') + '?autoplay=1';

    popUpiframe.attr('src', btnPoupHref);

    // CLICK WITH EXIT
    popUp.on('click', function() {

        $(this).fadeOut(200);
        popUpiframe.attr('src', '');
    });

     // EVENT KEYDOWN ESC CLOSE POPUP
    $(document).keydown(function(e) {

        // IF STATMENT
        if(e.keyCode == 27 || e.which == 27) {
            popUp.fadeOut(200);
            popUpiframe.attr('src', '');
        }

    });

    // CLICK POPUP ICON EXIT POPUP
    popUpIcon.on('click', function (e) {

        // ANCHOR TAG PREVENTDEFAULT
        e.preventDefault();
        
        popUp.fadeOut(200);

    });

});

    // PLUGIN NICESCROLL
    $('body, html').niceScroll({

        cursorwidth: '5px',
        cursorborder: '1px solid #ffffff5e',
        cursorcolor: '#cc5a35',
        cursorborderradius: 0,
        scrollspeed: 300,
        horizrailenabled: false,
        //'z-index': 999999,
        
    });
   
    // SMOTHE SCROLL TOP TO SECTION OUR WORK
    buttonToggleIcon.on('click', function() {

     // ANIMATE
      $('html, body').animate({

        scrollTop:  $('.' + $(this).data('target') ).offset().top

      }, 2000);

    });

   
// COUNTER SECTION
var ich = $('.information-content-head'),
    sectionInfo = $('.information');

    // FUNCTION WINDOW SCROLL
$(window).scroll(function() {

    // CONST SECTION INFORMATION OFFSET TOP MINUS 200 HEIGHT
    const sectionInfoOffs = (sectionInfo.offset().top - 200);
    
    
    // IF STATEMENT SCROLL TOP THIS WINDOW GT SECTION INFOEMATION OFFSET
    if( $(this).scrollTop() >= sectionInfoOffs ) {
        
        // EACH CLASS INFORMATION CONTENT HEAD
        ich.each(function() {

            // ANMIATION 
            $(this).attr('counter', 0).animate({

                counter: $(this).data('counter')

            }, {

                // OPTION ANIMATION
                duration: 4000,
                easing: 'swing',
                step: function(now) {
                    $(this).text( Math.ceil(now) + '+' );
                }

            });

        });

    }

});

// ACCORDION
const question = $('.faq-box-questions-question'),
      result = $('.faq-box-questions-result'),
      boxQuestion = $('.faq-box-questions-box'),
      iconPlus = 'fa-plus-circle',
      iconMinus = 'fa-minus-circle';

     question.on('click', function() {
         
         $(this).each(function() {

            $(this).siblings(result).slideToggle(500);

            $(this).each(function() {

                if( $(this).parent(boxQuestion).siblings().find(result).is(':visible')  ) {
                    $(this).parent(boxQuestion).siblings().find(result).slideUp(500);
                    $(this).parent(boxQuestion).siblings().find('i').removeClass(iconMinus).addClass(iconPlus);
                };

            });

            checkArrowAccordion($(this));

        });
     });


     checkArrowAccordion(question);

function checkArrowAccordion(element) {

    element.each(function() {
        $(this).siblings(result).is(':visible') ? $(this).find('i').toggleClass(`${iconMinus} ${iconPlus}`) : false;
    });

};


////////////////////////
// GALLARY
const ulcontrol = $('.featured-works-gallary-control'),
      liItemControl = $('.featured-works-item-control'),
      gallary = $('.featured-works-gallary > *');

    // BUTTON CONTROLS SHAFFIL 
    liItemControl.on('click', function() {

        // ADD CLASS ACTIVE IN THIS CLICK AND REMOVE CLASS ACTIVE FROM SIBLINGS
        $(this).addClass('active').siblings().removeClass('active');

        // GET ATTR FROM LI ITEM CONTROL
        const getAttrItGallary = $('.' + $(this).data('gallary'));

        // FILTER INTO GALLARY CHILD EQUAL CLASS FORM GET ATTR 
        gallary.filter(function() {
            
            $(this).is(getAttrItGallary) ? $(this).css('opacity', 1) : $(this).css('opacity', 0);

        });

    });

    // BUTTON POPUP
   const  gallaryBox = '.featured-works-gallary-box',
          iconViewImage = $('.featured-works-overlay-content > i'),
          popupImage = $('.popup-image'),
          popupImageBox = $('.popup-image-box');

    iconViewImage.on('click', function() {

        
        popupImage.css('transform', 'scale(1)');

        // ANIMATION OPEN POPUP
        popupImageBox.animate({

             top: 0,
             opacity: 1

        }, {

            duration: 1500,
            easing: 'swing'

        }).delay(1000);
        
        // CHECK ALL ICON I WITH SRC IMAGE INTO IMAGE BOX
        $(this).each(function() {

           const image = $(this).parents(gallaryBox).children('img').attr('src');
          
          $('<img>').attr('src', image).appendTo(popupImageBox);

        });

        $(button).fadeOut();
        
    });

    // CLICK CLOSE POPUP WITH ICON
    popupImage.on('click', 'i', animationPoup);

    // KEYDOWN CLOSE POPUP
    $(window).keydown(function(e) {

       e.keyCode === 27 || e.which === 27 ? animationPoup() : false;

    });

    // ANIMATION
    function animationPoup() {

        popupImageBox.animate({

            top: '-500%',
            opacity: 0

        }, {

            duration: 1000,
            easing: 'swing',
            complete: function() {
               
                popupImage.css('transform', 'scale(0)');
                popupImageBox.empty();
                $(button).fadeIn().css('display', 'flex');

            }
        });

    }
     
    // SLIDER
    const seSayClients = $('.say-clients'),
          itemsBox = $('#slider'),
          item = $('.say-clients-item'),
          arrow = $('.say-clients-arrow'),
          arrowPrev = $('.say-clients-arrow--prev'),
          arrowNext = $('.say-clients-arrow--next'),
          classActive = 'active-item';
    
        // ITEMBOX CHIDERN IS NOT CLASS ACTIVE HIDE
        $('.active-item').show();

        // CHECK ARROW
        function checkArrowSlider(arrowLeft, arrowRight) {

            if( $('.say-clients-item:first-child').hasClass(classActive) ) {

                $(arrowPrev).hide();
                $(arrowNext).show();

            } else if ( $('.say-clients-item:last-child').hasClass(classActive) ) {

                $(arrowNext).hide();
                $(arrowPrev).show();

            } else {

                $(arrowNext).show();
                $(arrowPrev).show();
            
            }

        }

                
    // RUNNING FUNCTION
    checkArrowSlider(arrowPrev, arrowNext);

    // CLICK ARROW PREV AND NEXT
    arrow.on('click', function() {

        // CHECK THIS CLICK ICONS ARROW NEXT OR ARROW PREV
        $(this).each(function() {

            if( $(this).is(arrowNext) ) {

                $('.' + classActive).fadeOut(0).removeClass(classActive).next().addClass(classActive).fadeIn(500);
                
            } else if ( $(this).is(arrowPrev) ) {
                
                $('.' + classActive).fadeOut(0).removeClass(classActive).prev().addClass(classActive).fadeIn(500);

            }
                        
            // RETURN FUNCTION CHECK ARROW
            checkArrowSlider(arrowPrev, arrowNext);
            
        });
    
    
    });

    // SETINTERVAL TRIGGER SLIDER
    var status = true;

    setInterval(function() {

        if(status) {

            if(  $(item).is('.active-item:last-child')   ) {
           
             $(item).fadeOut(0).removeClass(classActive);
             $(item).first().addClass(classActive).fadeIn();
     
            } else {
     
                $('.' + classActive).fadeOut(0).removeClass(classActive).next().addClass(classActive).fadeIn();
     
            }

            // RETURN FUNCTION CHECK ARROW
            checkArrowSlider(arrowPrev, arrowNext);

        }
 
    }, 4000);

    // CONTROL SETINTERVAL STOP AND RUNNING
    seSayClients.on({

        'mouseenter': function() {status = false},
        'mouseleave': function() {status = true},
        
    });

    // PRICING TABLE
    const pricingControl = $('.pricing-tables-control'),
          pricingControlItem = $('.pricing-tables-control-item'),
          btnPricingActive =  '.pricing-tables-control-active',
          pricingTableBox = $('.pricing-tables-box > *');

    // ADD SPAN ACTIVE INTO PRICING CONTROL
    pricingControl.append('<span class="pricing-tables-control-active"></span>');

    // CLICK BUTTON AND ANIMATION CLASS ACTIVE
    pricingControlItem.on('click', function() {

        $(this).each(function() {

            $(btnPricingActive).animate({

                left: $(this).position().left

            }, 500);

        });

    });

    // SHOW MONTHLY PRICING
    $('.monthly-price').show();

    // CLICK ITEM CONTROL 
    pricingControlItem.on('click', function() {
        
        // GET ATTRIBUTES ITEM CONTROL
       const getAttrCoItem = ('.' + $(this).data('toggle'));
 
       // FILTER INTO PRICING TABLES BOX
       pricingTableBox.filter(function() {

         $(this).is(getAttrCoItem) ? $(this).fadeIn(100) : $(this).fadeOut(0);
       
       });

    });


    // ARTICLES
    const btnArticles =  $('.news-articles-btn'),
          articlesItem = '.news-articles-item';

    btnArticles.on('click', function() {
  
        $(articlesItem).is(':hidden') ? $(articlesItem).show() : $(`${articlesItem}:nth-child(n5)`).hide();

    });

    // VALIDATION FORM
        const form = $('.contact-us-form'),
              input = $('.contact-us-form-group > input'),
              textArea = $('.contact-us-form-group > textarea');
           
        // VALIDATION FORM INPUT
        function validationForm() {

            input.each(function() {
    
                $(this).keyup(function() {
    
                    const getAttrInput = this.getAttribute('type');
                    
                    if( getAttrInput === 'text') {
    
                        if( $(this).val().length == '' ) {
    
                            $(this).prev('label').text('* please fill this input').css('color', 'white').removeClass('fa fa-check').toUpperCase;
                           
                        } else if( ($(this).val().length < 3) || ($(this).val().length > 20) ) {
    
                            $(this).prev('label').text('* user name length must be between 3 and 20').css('color', 'white').removeClass('fa fa-check').toUpperCase;
                          
                          
                        } else {
    
                            $(this).prev('label').text('').addClass('fa fa-check').css('color', 'white').toUpperCase;
    
                        }
                        
    
                    } else if (getAttrInput === 'email') {
                        
                        if( $(this).val().length == '' ) {
    
                            $(this).prev('label').text('* please fill this input').css('color', 'white').removeClass('fa fa-check').toUpperCase;
                          
                        } else if( $(this).val().charAt(0) == '@' ) {
    
                            $(this).prev('label').text('* @ not must be this first input').css('color', 'white').removeClass('fa fa-check').toUpperCase;
                          
                        } else if( !this.value.substr(1, this.value.length - 4).includes('@') ) {
    
                            $(this).prev('label').text('* @ must be this character').css('color', 'white').removeClass('fa fa-check').toUpperCase;
                            
                        } else if(  $(this).val().charAt($(this).val().length - 4) !== '.' && $(this).val().charAt($(this).val().length-3) !== '.') {
    
                            $(this).prev('label').text('* . must be character Ex: .com').css('color', 'white').removeClass('fa fa-check').toUpperCase;
                           
                        } else {
    
                            $(this).prev('label').text('').css('color', 'white').addClass('fa fa-check').toUpperCase;
    
                        }
                    }
    
        
                });
    
            });

        }

        // RUNNING FUNCTION VALIDATION FORM
        validationForm();

        // VALIDATION TEXTAREA
       textArea.keyup(function() {

        if( $(this).val().length == '' ) {

            $(this).prev('label').text('*please fill this input').removeClass('fa fa-check').css('color', 'white').toUpperCase;
            e.preventDefault();

        } else {

            $(this).prev('label').text('').addClass('fa fa-check').css('color', 'white');

        }

    });

  
    // CLICK SUBMIT SEND FORM CHECK ALL INTO FORM BEFORE SEND
    form.submit(function(e) {

        input.each(function() {

            const getAttrInput = this.getAttribute('type');
                
            if( getAttrInput === 'text') {

                if( $(this).val().length == '' ) {

                    $(this).prev('label').text('* please fill this input').css('color', 'white').removeClass('fa fa-check').toUpperCase;
                    e.preventDefault();
                    
                } else if( ($(this).val().length < 3) || ($(this).val().length > 20) ) {

                    $(this).prev('label').text('* user name length must be between 3 and 20').css('color', 'white').removeClass('fa fa-check').toUpperCase;
                    e.preventDefault();
                    
                } else {

                    $(this).prev('label').text('').addClass('fa fa-check').css('color', 'white').toUpperCase;

                }
                

            } else if (getAttrInput === 'email') {
                
                if( $(this).val().length == '' ) {

                    $(this).prev('label').text('* please fill this input').css('color', 'white').removeClass('fa fa-check').toUpperCase;
                    e.preventDefault();
                    
                } else if( $(this).val().charAt(0) == '@' ) {

                    $(this).prev('label').text('* @ not must be this first input').css('color', 'white').removeClass('fa fa-check').toUpperCase;
                    e.preventDefault();
                    
                } else if( !this.value.substr(1, this.value.length - 4).includes('@') ) {

                    $(this).prev('label').text('* @ must be this character').css('color', 'white').removeClass('fa fa-check').toUpperCase;
                    e.preventDefault();
                    
                } else if(  $(this).val().charAt($(this).val().length - 4) !== '.' && $(this).val().charAt($(this).val().length-3) !== '.') {

                    $(this).prev('label').text('* . must be character Ex: .com').css('color', 'white').removeClass('fa fa-check').toUpperCase;
                    e.preventDefault();
                        
                } else {

                    $(this).prev('label').text('').css('color', 'white').addClass('fa fa-check').toUpperCase;

                }
            }

        });
        
        if( $(textArea).val().length == '' ) {

            $(textArea).prev('label').text('*please fill this input').removeClass('fa fa-check').css('color', 'white').toUpperCase;
            e.preventDefault();

        } else {

            $(textArea).prev('label').text('').addClass('fa fa-check').css('color', 'white');

        }

    });

    // CLICK BUTTON SCROLL TOP
    const button = $('.button-top'),
          section = $('.our-work');

    $(window).on('scroll', function() {

        // HIDEEN AND SHOW BUTTON IN SCREEN
        if( $(window).scrollTop() > section.offset().top ) {

            if(button.is(':hidden')) {

                button.fadeIn().css('display', 'flex');

            // CLICK BUTTON ANIMATION HTML AND BODY SCROLL TOP 0
            button.on('click', function() {

                $('html, body').animate({

                    scrollTop: 0

                    }, 500);

                });

            }

        } else {

            button.fadeOut();

        }
       
    });

});

//////////////////////////////////////////////////////////
// PURY JAVASCRIPT

// VIDEO
// VARIABLES VIDEO BOX
var video = document.querySelector('.faq-video'),
    boxVideo = document.querySelector('.faq-video-box'),
    btnVideo = document.querySelector('#play-pause'),
    divControl = document.querySelector('.faq-controls'),
    btnPlay = 'faq-control--play',
    btnPause = 'faq-control--pause',
    backColorDivC = divControl.style.backgroundColor;

// FUNCTION VIDEO
function statusVideo() {

    // IF STATEMENT IS VIDEO PLAYED OR VIDEO PUSED
    if(video.paused) {

        video.play();
        divControl.style.backgroundColor = 'transparent';
        toggleClass(btnVideo, btnPlay, btnPause);

    } else {

        video.pause();
        divControl.style.backgroundColor = backColorDivC;
        toggleClass(btnVideo, btnPlay, btnPause);
        
    }

    ////// MOUSEENETER AND MOUSELEAVE
    // MOUSEENTER
    boxVideo.addEventListener('mouseenter', () => btnVideo.style.opacity = 1 );
    // MOUSELEAVE
    boxVideo.addEventListener('mouseleave', () => video.paused ? btnVideo.style.opacity = 1 : btnVideo.style.opacity = 0 );

};

// CLICK BTNVIDEO RUNNING FUNCTION
btnVideo.onclick = statusVideo;

// FUNCTION TOGGLE CLASS
var toggleClass = (Element, class0, class1) => {
    Element.classList.toggle(class0);
    Element.classList.toggle(class1);
};

// ADD YEAR INTO FOOTER
const spanYear = document.getElementById('year');

spanYear.textContent = new Date().getFullYear();











