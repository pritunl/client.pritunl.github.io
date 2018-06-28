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

  var $window = $(window);
  var randTheme = 'theme' + Math.floor((Math.random() * 3)).toString();
  randTheme = 'theme0';
  var $body = $('body');
  var $promoBg = $('.promo-background-color');
  var $promoImg = $('.promo-background-img');
  if ($promoBg.length) {
    $promoBg.removeClass('theme0');
    $promoBg.addClass(randTheme);
    $promoImg.removeClass('theme0');
    $promoImg.addClass(randTheme);
    var promoBg = $promoBg[0];

    var bgObj;
    var bgProps;
    var repeatDelay = .5;
    if (randTheme === 'theme0') {
      bgObj = {
        left: '#3076d5',
        right: '#1026a1'
      };
      bgProps = {
        left: '#582cc3',
        right: '#36107f'
      };
    } else if (randTheme === 'theme1') {
      bgObj = {
        left: '#18212d',
        right: '#030618'
      };
      bgProps = {
        left: '#2d181b',
        right: '#180303'
      };
    } else if (randTheme === 'theme2') {
      repeatDelay = 2;
      bgObj = {
        left: '#1f0b35',
        right: '#501d0c'
      };
      bgProps = {
        left: '#501d0c',
        right: '#1f0b35'
      };
    } else if (randTheme === 'theme3') {
      bgObj = {
        left: '#900b0b',
        right: '#1b711c'
      };
      bgProps = {
        left: '#1b711c',
        right: '#900b0b'
      };
    }

    TweenMax.to(bgObj, 6, {
      delay: 2,
      repeat: -1,
      repeatDelay: repeatDelay,
      yoyo: true,
      colorProps: bgProps,
      onUpdate: function() {
        promoBg.style.background = 'linear-gradient(to right, ' +
          bgObj.left + ' 0%, ' + bgObj.right + '100%)'
      }
    }, .25);
  }



  var curX;
  var curY;
  $body.mousemove(function(evt) {
    var x = Math.round(50 * evt.clientX / $window.width() - 10);
    var y = Math.round(50 * evt.clientY / $window.height() - 10);

    if (curX == x && curY == y) {
      return;
    }
    curX = x;
    curY = y;

    $promoImg.css('transform',
      'matrix(1.05, 0, 0, 1.05, ' + x + ', ' + y + ')');
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

  var loaded = ['archlinux'];
  $('.editor.python').each(function(index, element) {
    CodeMirror.fromTextArea(element, {
      mode: 'python',
      theme: 'material',
      lineNumbers: true,
      lineWrapping: true,
      readOnly: true
    });
  });
  $('.install-archlinux .editor.bash').each(function(index, element) {
    CodeMirror.fromTextArea(element, {
      mode: 'shell',
      theme: 'material',
      lineNumbers: true,
      lineWrapping: true,
      readOnly: true
    });
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
      if ($(this).scrollTop() <= 0 && !$navbarCollaspe.hasClass('in')) {
        $header.addClass('header-top');
      } else if ($header.css('position') !== 'absolute') {
        $header.removeClass('header-top');
      }
    };
    $(window).scroll(onScroll);
    onScroll();
  }

  $('.label').tooltip();

  if ($('#google-cache-hdr').length) {
    $('.header').css('position', 'absolute')
  }
  setTimeout(function() {
    if ($('#google-cache-hdr').length) {
      $('.header').css('position', 'absolute')
    }
    setTimeout(function() {
      if ($('#google-cache-hdr').length) {
        $('.header').css('position', 'absolute')
      }
    }, 500);
  }, 500);


  $('.client .client-distro').click(function(evt) {
    var type;
    var $target = $(evt.target);

    $('.client-distro').removeClass('btn-primary').addClass('btn-default');
    $target.removeClass('btn-default').addClass('btn-primary');

    $('.install-archlinux').hide();
    $('.install-centos-7').hide();
    $('.install-debian-stretch').hide();
    $('.install-fedora').hide();
    $('.install-ubuntu-two').hide();
    $('.install-ubuntu-three').hide();
    $('.install-ubuntu-four').hide();
    $('.install-other').hide();

    if ($target.hasClass('client-archlinux')) {
      type = 'archlinux';
      $('.install-archlinux').show();
    } else if ($target.hasClass('client-centos-7')) {
      type = 'centos-7';
      $('.install-centos-7').show();
    } else if ($target.hasClass('client-debian-stretch')) {
      type = 'debian-stretch';
      $('.install-debian-stretch').show();
    } else if ($target.hasClass('client-fedora')) {
      type = 'fedora';
      $('.install-fedora').show();
    } else if ($target.hasClass('client-ubuntu-two')) {
      type = 'ubuntu-two';
      $('.install-ubuntu-two').show();
    } else if ($target.hasClass('client-ubuntu-three')) {
      type = 'ubuntu-three';
      $('.install-ubuntu-three').show();
    } else if ($target.hasClass('client-ubuntu-four')) {
      type = 'ubuntu-four';
      $('.install-ubuntu-four').show();
    } else if ($target.hasClass('client-other')) {
      type = 'other';
      $('.install-other').show();
    }

    if (loaded.indexOf(type) === -1) {
      loaded.push(type);
      $('.client .install-' + type + ' .editor.bash').each(function(index, element) {
        CodeMirror.fromTextArea(element, {
          mode: 'shell',
          theme: 'material',
          lineNumbers: true,
          lineWrapping: true,
          readOnly: true
        });
      });
    }
  });
});
