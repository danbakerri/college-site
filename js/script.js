//play pause buttons for banner videos
var x = document.getElementById("background-video");

function playVid() {
  x.play();
}

function pauseVid() {
  x.pause();
}
//hide show buttons for banner videos
$(document).ready(function () {
  $(".header-vid-btn").click(function () {
    $(".header-vid-btn").toggleClass("hide-btn");
  });
});

var rafId = null;
var delay = 500;
var lTime = 0;

function scroll() {
  var scrollTop = $(window).scrollTop();
  var height = $(window).height();
  var visibleTop = scrollTop + height;
  $(".reveal").each(function () {
    var $t = $(this);
    if ($t.hasClass("reveal_visible")) {
      return;
    }
    var top = $t.offset().top;
    if (top <= visibleTop) {
      if (top + $t.height() < scrollTop) {
        $t.removeClass("reveal_pending").addClass("reveal_visible");
      } else {
        $t.addClass("reveal_pending");
        if (!rafId) requestAnimationFrame(reveal);
      }
    }
  });
}
function reveal() {
  rafId = null;
  var now = performance.now();

  if (now - lTime > delay) {
    lTime = now;
    var $ts = $(".reveal_pending");
    $($ts.get(0)).removeClass("reveal_pending").addClass("reveal_visible");
  }

  if ($(".reveal_pending").length >= 1) rafId = requestAnimationFrame(reveal);
}

$(scroll);
$(window).scroll(scroll);

// inViewport jQuery plugin
// http://stackoverflow.com/a/26831113/383904
$(
  (function ($, win) {
    $.fn.inViewport = function (cb) {
      return this.each(function (i, el) {
        function visPx() {
          var H = $(this).height(),
            r = el.getBoundingClientRect(),
            t = r.top,
            b = r.bottom;
          return cb.call(el, Math.max(0, t > 0 ? H - t : b < H ? b : H));
        }
        visPx();
        $(win).on("resize scroll", visPx);
      });
    };
  })(jQuery, window)
);

jQuery(function ($) {
  // DOM ready and $ in scope

  $(".fig-number").inViewport(function (px) {
    // Make use of the `px` argument!!!
    // if element entered V.port ( px>0 ) and
    // if prop initNumAnim flag is not yet set
    //  = Animate numbers
    if (px > 0 && !this.initNumAnim) {
      this.initNumAnim = true; // Set flag to true to prevent re-running the same animation
      $(this)
        .prop("Counter", 0)
        .animate(
          {
            Counter: $(this).text(),
          },
          {
            duration: 1800,
            step: function (now) {
              $(this).text(Math.ceil(now));
            },
          }
        );
    }
  });
});
Splitting();
