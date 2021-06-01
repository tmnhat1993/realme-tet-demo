import {TweenMax} from 'gsap/TweenMax';
import { Power4 } from 'gsap'

export default class Banner {
  /* ===================================
   *  CONSTRUCTOR
   * =================================== */
  constructor(){
    /* === VARIABLES === */
    this.isMobile = false;
    if(window.innerWidth <= 768){
      this.isMobile = true;
    }

    // Main Layer Element
    this.$bannerSection = $('.section-fs-banner-january');
    this.$fireworkLayer = $('.firework-layer');
    this.$decorationBackLayer = this.$bannerSection.find('.decoration-back-layer');
    this.$decorationFrontLayer = this.$bannerSection.find('.decoration-front-layer');
    this.$phonesLayer = this.$bannerSection.find('.phones-layer');
    this.$celebsLayer = this.$bannerSection.find('.celebs-layer');
    this.$mainContentLayer = this.$bannerSection.find('.context-layer');

    // Flowers Blossom Effect Elements
    this.$flowerElem1 = $('.flowers-layer .flower-item.flower-1');
    this.$flowerElem2 = $('.flowers-layer .flower-item.flower-2');
    this.$flowerElem3 = $('.flowers-layer .flower-item.flower-3');
    this.$flowerElem4 = $('.flowers-layer .flower-item.flower-4');
    this.$flowerElem5 = $('.flowers-layer .flower-item.flower-5');
    this.$flowerElem6 = $('.flowers-layer .flower-item.flower-6');
    this.$flowerElem7 = $('.flowers-layer .flower-item.flower-7');
    this.$flowerElem8 = $('.flowers-layer .flower-item.flower-8');

    this.bindEvents();
  }


  /* ===================================
   *  EVENTS
   * =================================== */
  bindEvents(){
    this.SetupBanner();
    $('body').on('finish-loaded', () => {
      this.DoBannerAnimation();
    });
  }

  /* ===================================
   *  METHODS
   * =================================== */
  SetupBanner(){
    /* === BANNER MAIN ELEMENTS === */
    TweenMax.set([this.$decorationBackLayer, this.$decorationFrontLayer],{
        y: window.innerWidth * 0.04,
        opacity: 0,
      });

    if(this.isMobile){
      TweenMax.set([this.$phonesLayer], { y: window.innerWidth * 0.03, opacity: 0 });
      TweenMax.set([this.$mainContentLayer], { y: window.innerWidth * 0.03, opacity: 0 });
    } else {
      TweenMax.set([this.$phonesLayer], { y: -window.innerWidth * 0.03, opacity: 0 });
      TweenMax.set([this.$mainContentLayer], { x: -window.innerWidth * 0.03, opacity: 0 });
    }

    TweenMax.set([this.$celebsLayer], { y: window.innerWidth * 0.03, opacity: 0 });

    this.bannerAnimationTimeline = new TimelineMax({ paused: true, onComplete: () => {
      this.$fireworkLayer.addClass('animating');
      this.DoFlowerAnimation();
    }});

    this.bannerAnimationTimeline.add(
      [
        TweenMax.to(this.$decorationBackLayer, 0.85, { opacity: 1, y: 0 }),
        TweenMax.to(this.$decorationFrontLayer, 0.85, { opacity: 1, y: 0, delay: 0.2 }),
      ], '+=0.2'
    );
    this.bannerAnimationTimeline.add(
      [
        TweenMax.to(this.$celebsLayer, 0.65, { opacity: 1, y: 0 }),
        TweenMax.to(this.$phonesLayer, 0.65, { opacity: 1, y: 0 }),
      ]
    );
    this.bannerAnimationTimeline.to(this.$mainContentLayer, 0.65, { x: 0, y:0 , opacity: 1 }, '+=0.05');

    /* === FLOWER EFFECT === */
    TweenMax.set([
      this.$flowerElem1,
      this.$flowerElem2,
      this.$flowerElem3,
      this.$flowerElem4,
      this.$flowerElem5,
      this.$flowerElem6,
      this.$flowerElem7,
      this.$flowerElem8,
    ], { scale: 0.25, autoAlpha: 0 });

    // Banner Animation Flowers Group 1
    this.flowerGroup1Timeline = new TimelineMax({ paused: true, repeat: -1, repeatDelay: 0.85 });
    this.flowerGroup1Timeline.add([
      TweenMax.to(this.$flowerElem1, 1, { rotation: 80, autoAlpha: 1, scale: 1, ease: Power4.easeOut}),
      TweenMax.to(this.$flowerElem2, 1, { delay: 0.2, rotation: -30, autoAlpha: 1, scale: 1, ease: Power4.easeOut})
    ]);
    this.flowerGroup1Timeline.add([
      TweenMax.to(this.$flowerElem1, 0.55, { rotation: 100, autoAlpha: 0, scale: 1.1, ease: Power4.easeIn}),
      TweenMax.to(this.$flowerElem2, 0.49, { delay: 0.1, rotation: -40, autoAlpha: 0, scale: 1.075, ease: Power4.easeIn})
    ], '+=1.75');

    // Banner Animation Flowers Group 2
    this.flowerGroup2Timeline = new TimelineMax({ paused: true, repeat: -1, repeatDelay: 1.15 });
    this.flowerGroup2Timeline.add([
      TweenMax.to(this.$flowerElem3, 1.1, { rotation: 80, autoAlpha: 1, scale: 1, ease: Power4.easeOut}),
      TweenMax.to(this.$flowerElem4, 0.9, { delay: 0.2, rotation: -30, autoAlpha: 1, scale: 1, ease: Power4.easeOut})
    ], '+=1');
    this.flowerGroup2Timeline.add([
      TweenMax.to(this.$flowerElem3, 0.65, { rotation: 100, autoAlpha: 0, scale: 1.1, ease: Power4.easeIn}),
      TweenMax.to(this.$flowerElem4, 0.49, { delay: 0.3, rotation: -40, autoAlpha: 0, scale: 1.075, ease: Power4.easeIn})
    ], '+=1.75');

    // Banner Animation Flowers Group 3
    this.flowerGroup3Timeline = new TimelineMax({ paused: true, repeat: -1, repeatDelay: 1.35 });
    this.flowerGroup3Timeline.add([
      TweenMax.to(this.$flowerElem5, 1.1, { rotation: 80, autoAlpha: 1, scale: 1, ease: Power4.easeOut}),
      TweenMax.to(this.$flowerElem6, 0.9, { delay: 0.2, rotation: -30, autoAlpha: 1, scale: 1, ease: Power4.easeOut}),
      TweenMax.to(this.$flowerElem7, 0.9, { delay: 0.2, rotation: -35, autoAlpha: 1, scale: 1, ease: Power4.easeOut}),
      TweenMax.to(this.$flowerElem8, 0.8, { delay: 0.2, rotation: -32, autoAlpha: 1, scale: 1, ease: Power4.easeOut})
    ], '+=0.8');
    this.flowerGroup3Timeline.add([
      TweenMax.to(this.$flowerElem5, 0.65, { rotation: 100, autoAlpha: 0, scale: 1.1, ease: Power4.easeIn}),
      TweenMax.to(this.$flowerElem6, 0.49, { delay: 0.3, rotation: -40, autoAlpha: 0, scale: 1.075, ease: Power4.easeIn}),
      TweenMax.to(this.$flowerElem7, 0.49, { delay: 0.3, rotation: -45, autoAlpha: 0, scale: 1.075, ease: Power4.easeIn}),
      TweenMax.to(this.$flowerElem8, 0.39, { delay: 0.3, rotation: -42, autoAlpha: 0, scale: 1.075, ease: Power4.easeIn})
    ], '+=2.25');
    /* === FLOWER EFFECT - END === */
  }

  DoBannerAnimation(){
    this.bannerAnimationTimeline.play();
  }

  DoFlowerAnimation(){
    // Flower Effect Play
    this.flowerGroup1Timeline.play();
    this.flowerGroup2Timeline.play();
    this.flowerGroup3Timeline.play();
  }
}