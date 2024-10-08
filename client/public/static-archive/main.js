 var introvideoPlayer = '',
 intromobileVideo = '',
     mainvideoPlayer = '';

 $(document).ready(function() {
     $('.map-body .left ul li').click(function(e) {
        e.preventDefault();
      
     });
     $('.map-body .left ul li').mouseenter(function() {
         $('.map-body .right ul li').removeClass('show02');
         $('.map-body .right ul li').removeClass('show');
         $('.map-body .right ul li').eq($(this).index()).addClass('show02');
         $('.landscape-img-place').hide();
     });
     $('.map-body .left ul').mouseleave(function(){
        $('.map-body .right ul li').removeClass('show02');
        $('.map-body .right ul li').removeClass('show');
        $('.landscape-img-place').show();
     });
     //
     $('.cursor-box .cursor-axe a').click(function(e) {
         e.preventDefault();
         $('body').addClass('pickaxe-activated');
         $('body').removeClass('pickaxe-unactivated');
         $('.site-header').css({ 'background-color': 'transparent', });
         mainvideoPlayer.play();
         Cookies.set('pickaxe', 'true', { expires: 1, secure: true }); // 1 / 24 / 60
     });
     if (Cookies.get('pickaxe') !== "true" || Cookies.get('pickaxe') === undefined) {
         $('body').removeClass('pickaxe-activated');
         $('body').addClass('pickaxe-unactivated');
     } else {
         $('body').addClass('pickaxe-activated');
         $('body').removeClass('pickaxe-unactivated');
     }
     $('.single-post .message-btn').click(function(e) {
         e.preventDefault();
         $('.single-post .comments-area').toggleClass('show');
         $('.single-post .message-bg').toggleClass('active');
     });
     $('.single-post .close-btn').click(function(e) {
         e.preventDefault();
         $('.single-post .comments-area').removeClass('show');
         $('.single-post .message-bg').removeClass('active');
     });
     $('.single-post .comment-form-comment #comment').attr("placeholder", "여기에 보내고 싶은 말을 적어주세요.\n(21년 9월까지, 매달 말일에 관리자가 모아 전달합니다.)");
     $('.single-post .form-submit #submit').val('보내기');

     $('.collapse-head').click(function() {

         var cThis = $(this);
         var offsetHead = $(this).offset().top;
         var body = $("html, body");
         var isMhead = $('.site-header').height();

         if ($('.site-header .gnb').is(":visible") === true) {
            //  body.stop().animate({ scrollTop: offsetHead - isMhead }, 500, 'swing').promise().then(function() {});
         } else {
            //  body.stop().animate({ scrollTop: offsetHead }, 500, 'swing').promise().then(function() {});
         }


         cThis.closest('.collapse-group').find('.collapse-body').slideToggle();
     });
 });



 $(window).on('load', function() {
     if ($('body').attr('class').indexOf('page-id-199') > -1) {
        
     } else {
         $('#loading').addClass('loaded');
         setTimeout(function() {
            $('#loading').addClass('hide');
         },100)
     }
 })



 function thankstoZZ() {
     const zigzagUl = document.querySelectorAll('.desktop-only .partners.unorder ul');
     var max = 0;
     for (let i = 0; i < zigzagUl.length; i++) {
         const zzChildren = zigzagUl[i].children;
         let childrenWidth = 0;
         for (let j = 0; j < zzChildren.length; j++) {
             childrenWidth += zzChildren[j].clientWidth;
         }
         if (childrenWidth > max) {
             max = childrenWidth;
         }

         zigzagUl[i].style.width = max + 5 + 'px';

     }
 }



 function dropAxe() {
     const droppable = new Draggable.Droppable(document.querySelectorAll('.drop-container'), {
         draggable: '.item',
         dropzone: '.dropzone'
     });

     droppable.on('droppable:stop', function() {
         $('.cursor-axe.item').addClass('dropped');
         setTimeout(function() {

             $('.cursor-axe.item').fadeOut(function() {
                 $('.cursor-box.mobile-only').addClass('active');
                 
                 mainvideoPlayer.play();

             });
         }, 300);

     });

     droppable.on('droppable:returned', function() {
         var sWidth = $('.mobile-only .spin').width();
         var gWidth = $('.cursor-box.mobile-only').width();
         var wWidth = $(window).width();
         var leftPer = sWidth / wWidth * 100;
         var leftRange = (wWidth - gWidth) / 2 / wWidth * 100 - leftPer;
         var rightRange = 100 - leftRange;
         var rightLimit = 100 - leftPer;
         var lefRandom = Math.random() * leftRange;
         var rightRandom = lefRandom + rightRange - leftPer;
         var firstRand = Math.floor(Math.random() * 2) ? lefRandom : rightRandom;


         var sHeight = $('.mobile-only .spin').height();
         var gHeight = $('.cursor-box.mobile-only').height();
         var wHeight = sHeight / gHeight * 100;
         var topStartp = Math.random() * 220 - 70;
         if (topStartp > 0 - wHeight && topStartp < 100) {
             $('.cursor-axe.item').css({
                 'top': topStartp + '%',
                 'left': firstRand + '%',
             })
         } else {
             $('.cursor-axe.item').css({
                 'top': topStartp + '%',
                 'left': Math.random() * rightLimit + '%',
             })
         }
     });
 }


 

 function axeVideo() {
    if (Cookies.get('pickaxe') !== "true" || Cookies.get('pickaxe') === undefined) {
        var options = {
            id: 478093683,
            width: 800,
            height: 360,
            muted: true,
            autoplay: false,
            controls: false,
            quality: '1080p',
            loop: true,
        };
    } else {
        var options = {
            id: 478093683,
            width: 800,
            height: 360,
            muted: true,
            autoplay: true,
            controls: false,
            quality: '1080p',
            loop: true,
        };
    }
     
     mainvideoPlayer = new Vimeo.Player('radialVideo', options);

     mainvideoPlayer.setCurrentTime(0.01).then(function(seconds) {}).catch(function(error) {
         switch (error.name) {
             case 'RangeError':
                 break;

             default:
                 break;
         }
     });
     mainvideoPlayer.on('timeupdate', function(data) {
         if (data.percent >= 0.5) {
             videoPlayer.setCurrentTime(1.71)
         }

     });
     $('.site-header').css({ 'background-color': 'transparent', });
 }
 $(document).ready(function(){
    $('a, .category-program .collapse-head.date-and-type, .img-action .retake, .page-id-2 .doclick').hover(function(){
        $('#pickaxe').toggleClass('hover');
     });
    
 });
 