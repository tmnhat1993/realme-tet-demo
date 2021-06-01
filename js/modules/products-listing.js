export default class ProductListing {
  /* ===================================
   *  CONSTRUCTOR
   * =================================== */
  constructor(){
    this.$productSliderSection = $('.section-fs-product-listing');

    this.bindEvents();
  }


  /* ===================================
   *  EVENTS
   * =================================== */
  bindEvents(){
    this.SetupProductSlider();
    this.SetupProductColorChanger();
    this.SetupProductCountdown();
  }

  /* ===================================
   *  METHODS
   * =================================== */
  // Product Slider
  SetupProductSlider(){
    this.$productSlider = $('.products-slider-holder .products-slider');
    this.$productSlider.on('init reinit', () => {
      this.$realmeXTBlock = this.$productSliderSection.find('.product-item.realme-xt');
      this.$realme5sBlock = this.$productSliderSection.find('.product-item.realme-5s');
      this.$realme5ProBlock1 = this.$productSliderSection.find('.product-item.realme-5-pro.realme-5-pro-4-128');
      this.$realme5ProBlock2 = this.$productSliderSection.find('.product-item.realme-5-pro.realme-5-pro-8-128');
      this.$realme5Block1 = this.$productSliderSection.find('.product-item.realme-5.realme-5-3-64');
      this.$realme5Block2 = this.$productSliderSection.find('.product-item.realme-5.realme-5-4-128');
      this.$realmeC2Block1 = this.$productSliderSection.find('.product-item.realme-c2.c2-2-16');
      this.$realmeC2Block2 = this.$productSliderSection.find('.product-item.realme-c2.c2-2-32');
      this.$realmeC2Block3 = this.$productSliderSection.find('.product-item.realme-c2.c2-3-32');

      this.SetupSingleProductCountdown(this.$realmeXTBlock,'Feb 1, 2020 23:59:59');
      this.SetupSingleProductCountdown(this.$realme5sBlock,'Feb 1, 2020 23:59:59');
      this.SetupSingleProductCountdown(this.$realme5ProBlock1,'Feb 1, 2020 23:59:59');
      this.SetupSingleProductCountdown(this.$realme5ProBlock2,'Feb 1, 2020 23:59:59');
      this.SetupSingleProductCountdown(this.$realme5Block1,'Feb 1, 2020 23:59:59');
      this.SetupSingleProductCountdown(this.$realme5Block2,'Feb 1, 2020 23:59:59');
      this.SetupSingleProductCountdown(this.$realmeC2Block2,'Feb 1, 2020 23:59:59');
    });
    if(this.$productSlider.length > 0){
      this.$productSlider.slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        prevArrow: '<div class="slick-control prev-arrow"></div>',
        nextArrow: '<div class="slick-control next-arrow"></div>',
        responsive: [
          {
            breakpoint: 769,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              prevArrow: '<div class="slick-control prev-arrow"></div>',
              nextArrow: '<div class="slick-control next-arrow"></div>',
            }
          }]
      })
    }
  }

  // Product Color Changer
  SetupProductColorChanger(){
    this.SetupSingleProductColor(this.$realme5sBlock);
    this.SetupSingleProductColor(this.$realme5ProBlock1);
    this.SetupSingleProductColor(this.$realme5ProBlock2);
    this.SetupSingleProductColor(this.$realme5Block1);
    this.SetupSingleProductColor(this.$realme5Block2);
    this.SetupSingleProductColor(this.$realmeC2Block2);
  }

  SetupSingleProductColor($targetElement){
    let $nameSwitcher = $targetElement.find('.name-switcher');
    let $name1 = $nameSwitcher.find('.phone-name.name-1');
    let $name2 = $nameSwitcher.find('.phone-name.name-2');

    let $phoneImgHolder = $targetElement.find('.phones-img-holder');
    let $colorImg1 = $phoneImgHolder.find('.color-1');
    let $colorImg2 = $phoneImgHolder.find('.color-2');

    $name1.on('click', () => {
      console.log($name1)
      if(!$name1.hasClass('active')){
        $name2.removeClass('active');
        $colorImg2.removeClass('active');

        $name1.addClass('active');
        $colorImg1.addClass('active');
      }
    });

    $name2.on('click', () => {
      if(!$name2.hasClass('active')){
        $name1.removeClass('active');
        $colorImg1.removeClass('active');

        $name2.addClass('active');
        $colorImg2.addClass('active');
      }
    });
  }

  // Product Count Down
  SetupProductCountdown(){

  }

  SetupSingleProductCountdown($targetElement, endDate){
    let countDownDate = new Date(endDate).getTime();
    let $daysValue = $targetElement.find('.discount-countdown .clock-value .value.days');
    // let $hoursValue = $targetElement.find('.discount-countdown .clock-value .value.hours');
    // let $minsValue = $targetElement.find('.discount-countdown .clock-value .value.mins');
    // let $secondsValue = $targetElement.find('.discount-countdown .clock-value .value.seconds');

    let now = new Date().getTime();
    let distance = countDownDate - now;

    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    $daysValue.html(days);


    // setInterval(() => {
      // let now = new Date().getTime();
      // let distance = countDownDate - now;
      //
      // let days = Math.floor(distance / (1000 * 60 * 60 * 24));
      // $daysValue.html(days);
      // let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      // let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      // let seconds = Math.floor((distance % (1000 * 60)) / 1000);
    //
    //   $hoursValue.html(hours);
    //   $minsValue.html(minutes);
    //   $secondsValue.html(seconds);
    // }, 1000);
  }
}