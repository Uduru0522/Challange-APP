const swiper = new Swiper('.swiper-container', {
    // Optional parameters
    direction: 'horizontal',
    loop: false,
    slidesPerView : 1,
  
    // And if we need scrollbar
    scrollbar: {
      el: '.swiper-scrollbar',
      hide:true,
    },
    pagination: {
        el: ".swiper-pagination",
        dynamicBullets: true,
      },
  });
  

 