import {TweenMax} from 'gsap/TweenMax';

export default class FlashSaleDetail {
  /* ===================================
   *  CONSTRUCTOR
   * =================================== */
  constructor(){
    // Elements
    this.$flashSaleSection = $('.section-fs-detail');
    this.$phoneImgHolder = this.$flashSaleSection.find('.phone-img-holder');
    this.$phoneNameHolder = this.$flashSaleSection.find('.phone-name-holder');
    this.$flashSaleDetail = this.$flashSaleSection.find('.flashsale-main-content');
    this.$phoneName = this.$flashSaleDetail.find('.product-logo-holder');
    this.$phoneSlogan = this.$flashSaleDetail.find('.product-slogan-holder');
    this.$flashSaleDetailImage = this.$flashSaleDetail.find('.product-flashsale-image');
    this.$flashSaleCountdownHolder = this.$flashSaleDetail.find('.product-flashsale-countdown');

    // Update Element
    // Cloud Element
    this.$cloudElement = $('.section-fs-detail .effect-layer .cloud-layer');

    // Countdown Element
    this.countDownDate = new Date("Jan 12, 2020 23:59:59").getTime();
    this.$daysValue = this.$flashSaleCountdownHolder.find('.clock-value .value.days');
    this.$hoursValue = this.$flashSaleCountdownHolder.find('.clock-value .value.hours');
    this.$minsValue = this.$flashSaleCountdownHolder.find('.clock-value .value.mins');
    this.$secondsValue = this.$flashSaleCountdownHolder.find('.clock-value .value.seconds');
    this.bindEvents();
  }


  /* ===================================
   *  EVENTS
   * =================================== */
  bindEvents(){
    this.FlashSaleInit();
    this.FlashSaleAnimation();
  }

  /* ===================================
   *  METHODS
   * =================================== */
  FlashSaleInit(){
    // setInterval(() => {
    //   this.SetupCountDownClock();
    // }, 1000);

    // Set Init State
    TweenMax.set(this.$phoneImgHolder, { opacity: 0, y: window.innerWidth * 0.035 });
    TweenMax.set(this.$phoneName, { opacity: 0, x: window.innerWidth * 0.05 });
    TweenMax.set(this.$phoneSlogan, { opacity: 0, x: - window.innerWidth * 0.05 });
    TweenMax.set(this.$flashSaleDetailImage, { opacity: 0, y: window.innerWidth * 0.017 });
    TweenMax.set(this.$flashSaleCountdownHolder, { opacity: 0, y: window.innerWidth * 0.012 });
    TweenMax.set(this.$cloudElement, { opacity: 0 });

    this.flashSaleAnimation = new TimelineMax({ paused: true, onComplete: () => {
        this.SetupFlashSale();
      }
    });

    this.flashSaleAnimation.add('animation start');
    this.flashSaleAnimation.to( this.$cloudElement, 0.75, {opacity: 1});
    this.flashSaleAnimation.to( this.$phoneImgHolder, 0.75, { opacity: 1, y: 0 });
    this.flashSaleAnimation.to( [ this.$phoneName, this.$phoneSlogan ], 0.75,
      { opacity: 1, x: 0, ease: Power2.easeOut }, '-=0.15' );
    this.flashSaleAnimation.to( this.$flashSaleDetailImage, 0.65, { opacity: 1, y: 0, ease: Power2.easeOut }, '-=0.25');
    this.flashSaleAnimation.to( this.$flashSaleCountdownHolder, 0.65, { opacity: 1, y: 0, ease: Power2.easeOut }, '-=0.17');
  }

  FlashSaleAnimation(){
    rmFlashSaleListener.on('flashsale-anim', () => {
      this.flashSaleAnimation.play();
    })
  }

  SetupFlashSale(){
    this.$switchBlueBtn = $('.phone-name-holder .name-item.blue');
    this.$switchRedBtn = $('.phone-name-holder .name-item.red');

    this.$phoneRedImg = $('.phone-img-holder .phone-holder .phone-red');
    this.$phoneBlueImg = $('.phone-img-holder .phone-holder .phone-blue');

    this.SwitchColorTimeout = null;
    this.currentColor = 'red';
    this.ActiveColorTimeout();

    this.$switchBlueBtn.on('click', () => {
      if(!this.$switchBlueBtn.hasClass('active')){
        // If Timeout is still running
        clearInterval(this.SwitchColorTimeout);

        this.$switchRedBtn.removeClass('active');
        this.$phoneRedImg.removeClass('active');
        this.$phoneBlueImg.addClass('active');
        this.$switchBlueBtn.addClass('active');
        this.currentColor = 'blue';

        this.ActiveColorTimeout();
      }
    });

    this.$switchRedBtn.on('click', () => {
      if(!this.$switchRedBtn.hasClass('active')){
        // If Timeout is still running
        clearInterval(this.SwitchColorTimeout);

        this.$phoneBlueImg.removeClass('active');
        this.$switchBlueBtn.removeClass('active');
        this.$switchRedBtn.addClass('active');
        this.$phoneRedImg.addClass('active');
        this.currentColor = 'red';

        this.ActiveColorTimeout();
      }
    });
  }

  ActiveColorTimeout(){
    this.SwitchColorTimeout = setInterval(() => {
      switch (this.currentColor) {
        case 'red':
          this.$switchRedBtn.removeClass('active');
          this.$phoneRedImg.removeClass('active');
          this.$phoneBlueImg.addClass('active');
          this.$switchBlueBtn.addClass('active');
          this.currentColor = 'blue';

          break;
        case 'blue':
          this.$phoneBlueImg.removeClass('active');
          this.$switchBlueBtn.removeClass('active');
          this.$switchRedBtn.addClass('active');
          this.$phoneRedImg.addClass('active');
          this.currentColor = 'red';

          break;
      }
    }, 2400)
  }

  // SetupCountDownClock(){
  //   let now = new Date().getTime();
  //   let distance = this.countDownDate - now;
  //
  //   let days = Math.floor(distance / (1000 * 60 * 60 * 24));
  //   let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  //   let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  //   let seconds = Math.floor((distance % (1000 * 60)) / 1000);
  //
  //   this.$daysValue.html(days);
  //   this.$hoursValue.html(hours);
  //   this.$minsValue.html(minutes);
  //   this.$secondsValue.html(seconds);
  // }
}