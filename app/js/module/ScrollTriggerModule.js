export default function ScrollTriggerModule() {
  gsap.registerPlugin(ScrollTrigger);

  const scrollTriggerElement = document.querySelector(".sshJS");

  if (scrollTriggerElement) {
    const sections = scrollTriggerElement.querySelectorAll(".ssh-item");
    sections.forEach((section, index) => {
      const banner = section.querySelector(".sshBaner");
      const content = section.querySelector(".sshContent");
      // const direction = index % 2 === 0 ? 100 : -100;
      const listImg = section.querySelectorAll(".ssh-imgs .b-img");
      listImg.forEach((img, imgIndex) => {
        const order = img.getAttribute("data-index");
        if (order !== null) {
          img.style.zIndex = order;
        }
      });
      function handleMobileLayout() {
        const isMobile = window.matchMedia("(max-width: 768px)").matches;
        const leftItems = section.querySelectorAll(".arch__info");
        const rightItems = section.querySelectorAll(".ssh-imgs .b-img");

        if (isMobile) {
          leftItems.forEach((item, i) => {
            item.style.order = i * 2;
          });
          rightItems.forEach((item, i) => {
            item.style.order = i * 2 + 1;
          });
        } else {
          leftItems.forEach((item) => {
            item.style.order = "";
          });
          rightItems.forEach((item) => {
            item.style.order = "";
          });
        }
      }
      let resizeTimeout;
      window.addEventListener("resize", () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(handleMobileLayout, 100);
      });
      handleMobileLayout();
      const imgs = section.querySelectorAll(".ssh-imgs .b-img img");
      const triggerElement = section.querySelector(".arch");
      const pinElement = section.querySelector(".arch__right");
      const bannerImg = section.querySelector(".sshBaner .inner-img");

      ScrollTrigger.matchMedia({
        "(min-width: 769px)": function () {
          const mainTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: triggerElement,
              start: "top 80px",
              end: "bottom bottom",
              pin: pinElement,
              scrub: true,
            },
          });
          gsap.to(banner, {
            scrollTrigger: {
              trigger: bannerImg,
              start: "top 60px",
              end: "bottom top",
              scrub: true,
              pin: true,
              pinSpacing: false,
              markers: true,
            },
            clipPath: "inset(100% 0 0 0)",
            objectPosition: "0px 60%",
            duration: 1.5,
            ease: "none",
          });
          gsap.set(imgs, {
            clipPath: "inset(0)",
            objectPosition: "0px 0%",
          });

          imgs.forEach((_, index) => {
            const currentImage = imgs[index];
            const nextImage = imgs[index + 1] ? imgs[index + 1] : null;
            const sectionTimeline = gsap.timeline();
            if (nextImage) {
              sectionTimeline
                .to(
                  currentImage,
                  {
                    clipPath: "inset(0px 0px 100%)",
                    objectPosition: "0px 60%",
                    duration: 1.5,
                    ease: "none",
                  },
                  0
                )
                .to(
                  nextImage,
                  {
                    objectPosition: "0px 40%",
                    duration: 1.5,
                    ease: "none",
                  },
                  0
                );
            }
            mainTimeline.add(sectionTimeline);
          });
        },
        "(max-width: 768px)": function () {
          const mbTimeline = gsap.timeline();
          gsap.set(imgs, {
            objectPosition: "0px 60%",
          });

          imgs.forEach((image, index) => {
            const innerTimeline = gsap.timeline({
              scrollTrigger: {
                trigger: image,
                start: "top-=70% top+=50%",
                end: "bottom+=200% bottom",
                scrub: true,
              },
            });
            innerTimeline.to(image, {
              objectPosition: "0px 30%",
              duration: 5,
              ease: "none",
            });
            mbTimeline.add(innerTimeline);
          });
        },
      });
    });
  }
}
