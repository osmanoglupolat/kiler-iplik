document.addEventListener("DOMContentLoaded", () => {
  const glightboxElements = [];
  document.querySelectorAll(".glightbox").forEach((element) => {
    // todo: kaldırılacak!
    const imageSrc = element.querySelector("img").getAttribute("src");
    element.href = imageSrc;
    // todo: kaldırılacak!
    glightboxElements.push(element);
  });

  if (glightboxElements.length > 0) {
    const lightbox = GLightbox();
  }

  const handleNavigation = {
    el: {
      openButton: "#open-navigation",
      closeButton: "#close-navigation",
      navigation: "#navigation",
    },
    init: function () {
      const openButtons = document.querySelectorAll(this.el.openButton);
      const closeButtons = document.querySelectorAll(this.el.closeButton);
      const navigation = document.querySelector(this.el.navigation);

      navigation.classList.add("hidden");

      openButtons.forEach((button) => {
        button.addEventListener("click", () => {
          navigation.classList.remove("hidden");
          navigation.style.animation = "toTop 0.2s ease";
        });
      });

      closeButtons.forEach((button) => {
        button.addEventListener("click", () => {
          navigation.style.animation = "none";
          navigation.classList.add("hidden");
        });
      });
    },
  };

  handleNavigation.init();

  new Swiper(".swiper-trigger", {
    // loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    paginationClickable: true,
    slidesPerView: 1,
    spaceBetween: 20,
  });

  // thumbs swiper
  // Initialize the thumbnail swiper
  const thumbSwiper = new Swiper(".thumb-swiper", {
    // loop: false,
    spaceBetween: 20,
    slidesPerView: 1,
    // freeMode: true,
    watchSlidesProgress: true,
  });

  // Initialize the main swiper
  const mainSwiper = new Swiper(".main-swiper", {
    // loop: false,
    spaceBetween: 20,
    slidesPerView: 1,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    thumbs: {
      swiper: thumbSwiper,
    },
  });

  if (thumbSwiper && mainSwiper) {
    // Sync main swiper when thumb swiper changes
    thumbSwiper.on("slideChange", function () {
      const activeIndex = thumbSwiper.activeIndex;
      mainSwiper.slideTo(activeIndex);
    });
  }
});
