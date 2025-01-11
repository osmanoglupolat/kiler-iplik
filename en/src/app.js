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
    pagination: {
      el: ".swiper-pagination",
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

  const getBackgroundColorAtElement = (absoluteElement) => {
    const rect = absoluteElement.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Üstteki elementi geçici olarak görünmez yap
    document.querySelector(".social-container").style.visibility = "hidden";

    // Arkadaki elementi bul
    const elementBehind = document.elementFromPoint(centerX, centerY);

    // Görünmezliği geri al
    document.querySelector(".social-container").style.visibility = "visible";

    if (!elementBehind) {
      return null; // Arkada element yok
    }

    // Arkadaki elementin arka plan rengini al
    const backgroundColor =
      window.getComputedStyle(elementBehind).backgroundColor;
    return backgroundColor;
  };

  const handleSvgColors = () => {
    const targets = document.querySelectorAll(".social-container ul li a");
    targets.forEach((target) => {
      const backgroundColor = getBackgroundColorAtElement(target);
      if (backgroundColor == "rgb(255, 255, 255)") {
        target.classList.add("text-primary");
      } else {
        target.classList.remove("text-primary");
      }
    });
  };

  handleSvgColors();
  window.addEventListener("scroll", handleSvgColors);
  window.addEventListener("resize", handleSvgColors);

  // header bg
  window.addEventListener("scroll", () => {
    const header = document.querySelector("header");
    if (window.scrollY > 100) {
      header.classList.add("bg-primary");
    } else {
      header.classList.remove("bg-primary");
    }
  });
});

// Google Map Custom Styles
const mapStyles = [
  {
      "featureType": "all",
      "elementType": "labels.text.fill",
      "stylers": [
          {
              "color": "#ffffff"
          }
      ]
  },
  {
      "featureType": "all",
      "elementType": "labels.text.stroke",
      "stylers": [
          {
              "color": "#000000"
          },
          {
              "lightness": 13
          }
      ]
  },
  {
      "featureType": "administrative",
      "elementType": "geometry.fill",
      "stylers": [
          {
              "color": "#000000"
          }
      ]
  },
  {
      "featureType": "administrative",
      "elementType": "geometry.stroke",
      "stylers": [
          {
              "color": "#144b53"
          },
          {
              "lightness": 14
          },
          {
              "weight": 1.4
          }
      ]
  },
  {
      "featureType": "landscape",
      "elementType": "all",
      "stylers": [
          {
              "color": "#08304b"
          }
      ]
  },
  {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
          {
              "color": "#0c4152"
          },
          {
              "lightness": 5
          }
      ]
  },
  {
      "featureType": "road.highway",
      "elementType": "geometry.fill",
      "stylers": [
          {
              "color": "#000000"
          }
      ]
  },
  {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
          {
              "color": "#0b434f"
          },
          {
              "lightness": 25
          }
      ]
  },
  {
      "featureType": "road.arterial",
      "elementType": "geometry.fill",
      "stylers": [
          {
              "color": "#000000"
          }
      ]
  },
  {
      "featureType": "road.arterial",
      "elementType": "geometry.stroke",
      "stylers": [
          {
              "color": "#0b3d51"
          },
          {
              "lightness": 16
          }
      ]
  },
  {
      "featureType": "road.local",
      "elementType": "geometry",
      "stylers": [
          {
              "color": "#000000"
          }
      ]
  },
  {
      "featureType": "transit",
      "elementType": "all",
      "stylers": [
          {
              "color": "#146474"
          }
      ]
  },
  {
      "featureType": "water",
      "elementType": "all",
      "stylers": [
          {
              "color": "#021019"
          }
      ]
  }
]

// Google Maps API Key
const GOOGLE_MAPS_API_KEY = "AIzaSyDU5QLLHaSV9fltitKB87Ithqn9YYglRKc";

// Google Maps Implementation
document.addEventListener("DOMContentLoaded", () => {
  const mapElement = document.getElementById("map");
  if (!mapElement) return;

  const script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&callback=initMap`;
  script.defer = true;

  const initializeMap = async () => {
    try {
      const location = {
        lat: 38.4951855,
        lng: 42.1996094,
      };

      const map = new google.maps.Map(mapElement, {
        zoom: 14.65,
        center: location,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        styles: mapStyles,
      });

      const contentString = `
        <div class="p-4 text-primary">
          <h3 class="font-bold">Kiler İplik Fabrikası</h3>
          <p>Karşıyaka Mahallesi Bitlis Yolu Caddesi No: 16/0</p>
          <p>Rahva Yolu Mevkii, Tatvan/BİTLİS</p>
        </div>
      `;

      const infowindow = new google.maps.InfoWindow({
        content: contentString,
      });

      const marker = new google.maps.Marker({
        map,
        position: location,
        title: "Kiler İplik Fabrikası"
      });

      marker.addListener("click", () => {
        infowindow.open(map, marker);
      });
    } catch (error) {
      console.error("Google Maps yüklenirken bir hata oluştu:", error);
    }
  };

  window.initMap = initializeMap;
  document.head.appendChild(script);
});
