jQuery(document).ready(function($) {
  var $window = $(window);

  var diag3 = TweenMax.staggerTo($('.diagram-3 .part'), 2, {
    delay: 1,
    opacity: 1
  }, .25);
  var diag3glow = TweenMax.staggerTo($('.diagram-3 .part-glow'), 1.4, {
    delay: 3,
    repeat: -1,
    repeatDelay: 4,
    yoyo: true,
    opacity: 1
  }, .5);

  var randTheme = 'theme' + Math.floor((Math.random() * 3)).toString();
  var $body = $('body');
  var $promoBg = $('.promo-background-color');
  var $promoImg = $('.promo-background-img');
  $promoBg.removeClass('theme0');
  $promoBg.addClass(randTheme);
  $promoImg.removeClass('theme0');
  $promoImg.addClass(randTheme);
  var curX;
  var curY;
  $body.mousemove(function(evt) {
    var x = Math.round(20 * evt.clientX / $window.width() - 10);
    var y = Math.round(20 * evt.clientY / $window.height() - 10);

    if (curX == x && curY == y) {
      return;
    }
    curX = x;
    curY = y;

    $promoImg.css('transform',
      'matrix(1.05, 0, 0, 1.05, ' + x + ', ' + y + ')');
  });

  $('a.scrollto').on('click', function(evt){
    var target = this.hash;
    if (!$(target).length) {
      return;
    }

    evt.preventDefault();
    $body.stop(true);
    $body.scrollTo(target, 800, {}, {easing: 'easeOutQuad'});

    var $navbarCollapse = $('.navbar-collapse');

    if ($navbarCollapse.hasClass('in')) {
      $navbarCollapse.removeClass('in').addClass('collapse');
    }
	});

  $('.navbar-toggle').on('click', function(evt) {
    var scrollTop = $(window).scrollTop();
    if ($('.navbar-collapse').hasClass('in') &&
        scrollTop <= 0 && $('.promo').length) {
      $('.header').addClass('header-top');
    }
    else {
      $('.header').removeClass('header-top');
    }
  });

  $('a[href^="#"]').on('click', function(evt) {
      evt.preventDefault();
      $('html, body').stop().animate({
          'scrollTop': $(this.hash).offset().top - 10
      }, 750, 'swing', function() {
          window.location.hash = this.hash;
      }.bind(this));
  });

  $(document).on('dblclick mousedown', '.no-select', false);

  $('.editor').show();
  $('.editor.python').each(function(index, element) {
    var editor = ace.edit(element);
    editor.setTheme('ace/theme/tomorrow_night');
    editor.setReadOnly(true);
    editor.setShowPrintMargin(false);
    editor.setHighlightActiveLine(false);
    editor.setHighlightGutterLine(false);
    editor.setShowFoldWidgets(false);
    editor.getSession().setMode('ace/mode/python');
    $(element).css('height', editor.getSession().getScreenLength() *
      editor.renderer.lineHeight + 2);
  });
  $('.editor.bash').each(function(index, element) {
    var editor = ace.edit(element);
    editor.setTheme('ace/theme/tomorrow_night');
    editor.setFontSize(16);
    editor.setReadOnly(true);
    editor.setShowPrintMargin(false);
    editor.setHighlightActiveLine(false);
    editor.setShowFoldWidgets(false);
    editor.renderer.setShowGutter(false);
    editor.getSession().setMode('ace/mode/sh');
    $(element).css('height', editor.getSession().getScreenLength() *
      editor.renderer.lineHeight + 24);
    $(editor.renderer.scroller).css('margin-top', '10px');
    $(editor.renderer.scroller).css('margin-left', '10px');
  });

  (function() {
    var element;
    var $element;
    var elements = {
      '.header': null,
      '.header h1.logo .logo-title': null,
      '.header .main-nav button': null,
      '.header.header-top .main-nav button .icon-bar': null,
      '.header .main-nav .nav .nav-item a': null,
      '.header.header-top .navbar-collapse': null,
      '.header .twitter-logo': null,
      '.header .github-logo': null
    };
    for (element in elements) {
      $element = $(element);

      elements[element] = $element.css('transition');
      $element.css('transition', 'none');
    }
    setTimeout(function() {
      for (element in elements) {
        $element = $(element);
        $element.css('transition', elements[element]);
        elements[element] = null;
      }
    }, 500);
  })();

  var $header = $('.header');
  var $navbarCollaspe = $('.navbar-collapse');
  if ($('.promo').length) {
    var onScroll = function() {
      if ($(this).scrollTop() <= 0) {
        $header.addClass('header-top');
      } else if ($header.css('position') !== 'absolute') {
        $header.removeClass('header-top');
      }
    };
    $(window).scroll(onScroll);
    onScroll();
  }

  $('.label').tooltip();
});
