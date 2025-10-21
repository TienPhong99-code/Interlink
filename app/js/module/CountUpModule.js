import { CountUp } from "../../assets/library/countUp/countUp.min.js";
export default function CountUpModule() {
  const numElements = document.querySelectorAll(".countNum");
  let hasAnimated = new Set();

  function startCountUp(v) {
    let n = parseInt(v.textContent.replace(/\./g, "")) || 0;
    let countUp = new CountUp(v, n, {
      separator: ",",
      decimal: ".",
      duration: 3,
    });

    if (!hasAnimated.has(v)) {
      countUp.start();
      hasAnimated.add(v);
    }
  }

  function checkVisibility() {
    numElements.forEach((v) => {
      const rect = v.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.8 && !hasAnimated.has(v)) {
        startCountUp(v);
        v.classList.add("is-inview");
      }
    });
  }

  window.addEventListener("scroll", checkVisibility);
  checkVisibility();
}
