export default function MasonryModule() {
  (function ($) {
    "use strict";

    $(window).load(function () {
      $(".masonry").masonry({
        columnWidth: ".grid-sizer",
        gutter: ".gutter-sizer",
        itemSelector: ".item-masonry",
      });
    });
  })(jQuery);
}
