export default function ComponentModule() {
  const checkPaym = document.querySelectorAll(
    '.paymItemJs input[type="radio"]'
  );
  if (checkPaym) {
    checkPaym.forEach(function (radio) {
      radio.addEventListener("change", function () {
        document.querySelectorAll(".paymItemJs").forEach(function (item) {
          item.classList.remove("active");
        });

        if (this.checked) {
          this.closest(".paymItemJs").classList.add("active");
        }
      });
    });
  }
  //   Copy
  var temp = $("<input>");
  temp.addClass("inputURL");
  var $url = $(location).attr("href");
  $(".getlink").on("click", function () {
    $("body").append(temp);
    temp.val($url).select();
    document.execCommand("copy");

    $(".getlink-note").css("display", "block");
    setTimeout(() => {
      $(".getlink-note").css("display", "none");
    }, 500);
  });
  //   Massonry
  //   (function ($) {
  //     "use strict";

  //     $(window).load(function () {
  //       $(".masonry").masonry({
  //         columnWidth: ".grid-sizer",
  //         gutter: ".gutter-sizer",
  //         itemSelector: ".item-masonry",
  //       });
  //     });
  //   })(jQuery);
  //   Scroll to section
  window.addEventListener("load", function () {
    const speed = 0;

    const hash = window.location.hash;
    if ($(hash).length) scrollToID(hash, speed);

    const href = $(this).find("> a").attr("href") || $(this).attr("href");
    if (href) {
      const id = href.slice(href.lastIndexOf("#"));
      if ($(id).length) {
        scrollToID(id, speed);
      } else {
        window.location.href = href;
      }
    }

    function scrollToID(id, speed) {
      const offSet = $(".hd").outerHeight();
      const section = $(id).offset();
      const targetOffset = section.top - offSet - 0;
      $("html,body").animate({ scrollTop: targetOffset }, speed);
    }
  });
  //   Show-Hide Pass
  $(document).ready(function () {
    $(".show-password").on("click", function () {
      const pwd = $(this).siblings("input");
      if (pwd.attr("type") == "password") {
        pwd.attr("type", "text");
        // $(this).parent().addClass("show");
        $(this).removeClass("fa-eye-slash");
        $(this).addClass("fa-eye");
      } else {
        pwd.attr("type", "password");
        $(this).addClass("fa-eye-slash");
        $(this).removeClass("fa-eye");
      }
    });
  });
  //   Readmore
  const readJS = document.querySelector(".readJS");
  if (!readJS) return;

  const btnSeeMore = document.querySelector(".seeMore");
  const btnExitMore = document.querySelector(".seeLess");
  if (!btnSeeMore || !btnExitMore) return;

  // Check content height
  const contentHeight = readJS.scrollHeight;
  if (contentHeight <= 500) {
    btnSeeMore.style.display = "none";
    btnExitMore.style.display = "none";
    readJS.style.height = "auto";
    return;
  }

  let isExpanded = false;
  const updateHeight = () => {
    readJS.style.height = isExpanded ? "auto" : "500px";
  };

  updateHeight();
  btnExitMore.style.display = "none";

  const toggleContent = () => {
    isExpanded = !isExpanded;
    btnSeeMore.style.display = isExpanded ? "none" : "flex";
    btnExitMore.style.display = isExpanded ? "flex" : "none";
    readJS.classList.toggle("hidden", isExpanded);
    updateHeight();
  };

  btnSeeMore.addEventListener("click", toggleContent);
  btnExitMore.addEventListener("click", toggleContent);
  //   Range Price
  const rangeInputs = document.querySelectorAll(".range-input input");
  const progress = document.querySelector(".range-slider .progress");
  const priceMin = document.querySelector(".range-item.min");
  const priceMax = document.querySelector(".range-item.max");

  let priceGap = 1000;
  if (rangeInputs && progress) {
    let minVal = parseInt(rangeInputs[0].value);
    let minValueOrigin = parseInt(rangeInputs[0].min);
    let maxVal = parseInt(rangeInputs[1].value);

    priceMin.innerHTML = minVal.toLocaleString("it-IT", {
      style: "currency",
      currency: "VND",
    });
    priceMax.innerHTML = maxVal.toLocaleString("it-IT", {
      style: "currency",
      currency: "VND",
    });

    progress.style.left =
      ((minVal - minValueOrigin) / (rangeInputs[0].max - minValueOrigin)) *
        100 +
      "%";
    progress.style.right =
      100 -
      ((maxVal - minValueOrigin) / (rangeInputs[1].max - minValueOrigin)) *
        100 +
      "%";
    rangeInputs.forEach((item) => {
      item.addEventListener("input", (e) => {
        let minVal = parseInt(rangeInputs[0].value);
        let maxVal = parseInt(rangeInputs[1].value);
        if (maxVal - minVal < priceGap) {
          if (e.target.className === "range-min") {
            rangeInputs[0].value = maxVal - priceGap;
          } else {
            rangeInputs[1].value = minVal + priceGap;
          }
        } else {
          progress.style.left =
            ((minVal - minValueOrigin) /
              (rangeInputs[0].max - minValueOrigin)) *
              100 +
            "%";
          progress.style.right =
            100 -
            ((maxVal - minValueOrigin) /
              (rangeInputs[1].max - minValueOrigin)) *
              100 +
            "%";
        }
      });
    });
    rangeInputs[0].addEventListener("input", () => {
      let minVal = parseInt(rangeInputs[0].value).toLocaleString("it-IT", {
        style: "currency",
        currency: "VND",
      });
      priceMin.innerHTML = minVal;
    });
    rangeInputs[1].addEventListener("input", () => {
      let maxVal = parseInt(rangeInputs[1].value).toLocaleString("it-IT", {
        style: "currency",
        currency: "VND",
      });
      priceMax.innerHTML = maxVal;
    });
  }
}
