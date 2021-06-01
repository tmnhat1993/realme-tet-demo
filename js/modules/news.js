export default class News {
  /* ===================================
   *  CONSTRUCTOR
   * =================================== */
  constructor(){
    this.bindEvents();
  }


  /* ===================================
   *  EVENTS
   * =================================== */
  bindEvents(){
    this.SetupNews();
    this.SetupGallery();
  }

  /* ===================================
   *  METHODS
   * =================================== */
  SetupNews(){
    this.$newsSlider = $('.news-block .news-slider');
    if(this.$newsSlider.length > 0){
      this.$newsSlider.slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        prevArrow: '<div class="slick-control prev-arrow white"></div>',
        nextArrow: '<div class="slick-control next-arrow white"></div>',
        responsive: [
          {
            breakpoint: 769,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              prevArrow: '<div class="slick-control prev-arrow white"></div>',
              nextArrow: '<div class="slick-control next-arrow white"></div>',
            }
          },{
            breakpoint: 481,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              prevArrow: '<div class="slick-control prev-arrow white"></div>',
              nextArrow: '<div class="slick-control next-arrow white"></div>',
            }
          }
        ]
      })
    }
  }

  SetupGallery(){
    this.$gallerySlider = $('.gallery-block .gallery-slider');
    if(this.$gallerySlider.length > 0){
      this.$gallerySlider.slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        prevArrow: '<div class="slick-control prev-arrow white"></div>',
        nextArrow: '<div class="slick-control next-arrow white"></div>',
        responsive: [
          {
            breakpoint: 769,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              prevArrow: '<div class="slick-control prev-arrow white"></div>',
              nextArrow: '<div class="slick-control next-arrow white"></div>',
            }
          },{
            breakpoint: 481,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              prevArrow: '<div class="slick-control prev-arrow white"></div>',
              nextArrow: '<div class="slick-control next-arrow white"></div>',
            }
          }
        ]
      })
    }
  }
}