import Data from './phone-data'
export default class Comparision {
  /* ===================================
   *  CONSTRUCTOR
   * =================================== */
  constructor(){
    this.phoneDetails = Data;

    this.$comparisionSection = $('.section-phones-comparision');
    this.$comparisionGroup = $('.comparision-group');
    this.$compareGroup1 = $('.comparision-group.group-1');
    this.$compareGroup2 = $('.comparision-group.group-2');
    this.$aspectDetailList = this.$comparisionGroup.find('.product-detail .feature-detail');

    // Current Phone Mode For Each Group
    this.currentGroup1 = this.$compareGroup1.data('current-phone');
    this.currentGroup2 = this.$compareGroup2.data('current-phone');

    // Feature List For Each Group
    this.$featureListHolder1 = this.$compareGroup1.find('.product-detail .feature-detail');
    this.$featureListHolder2 = this.$compareGroup2.find('.product-detail .feature-detail');

    // Phone Image
    this.$group1PhoneImage = this.$compareGroup1.find('.product-detail .phone-image .img-holder img');
    this.$group2PhoneImage = this.$compareGroup2.find('.product-detail .phone-image .img-holder img');

    // Version List
    this.$group1VersionList = this.$compareGroup1.find('.version-list');
    this.$group2VersionList = this.$compareGroup2.find('.version-list');
    this.$group1CurrentVersion = this.$compareGroup1.find('.version-active .value');
    this.$group2CurrentVersion = this.$compareGroup2.find('.version-active .value');

    // Price Holder
    this.$group1PriceHolder = this.$compareGroup1.find('.price-detail');
    this.$group2PriceHolder = this.$compareGroup2.find('.price-detail');

    // Landing Page Link Holder
    this.$group1CurrentLandingPage = this.$compareGroup1.find('.seemore-holder .seemore');
    this.$group2CurrentLandingPage = this.$compareGroup2.find('.seemore-holder .seemore');

    // Buy Now Button Holder
    this.$group1BuynowButton = this.$compareGroup1.find('.buynow-holder .buynow-btn');
    this.$group2BuynowButton = this.$compareGroup2.find('.buynow-holder .buynow-btn');


    // Selection Items
    this.$selectionItems = this.$comparisionSection.find('.comparision-selection .selection-list .selection-item');

    // Current Aspect To Compare
    this.currentAspect = 'specs';
    this.bindEvents();
  }


  /* ===================================
   *  EVENTS
   * =================================== */
  bindEvents(){
    this.EventSetup();
    this.SetupComparision();
  }

  /* ===================================
   *  METHODS
   * =================================== */
  SetupComparision(){
    this.UpdateGroup(1, this.currentGroup1);
    this.UpdateGroup(2, this.currentGroup2);
  }

  UpdateGroup(group = 1, data = 'realme-c2'){
    console.log(this.phoneDetails[data])
    if(group == 1){
      this.$group1PhoneImage.attr('src', this.phoneDetails[data]['image-link']);
      this.$group1CurrentLandingPage.attr('href', this.phoneDetails[data]['landing-page']);
      this.$group1BuynowButton.data('preorder-phone', data);
      this.$group1BuynowButton.attr('id', `Comparision Left ${this.phoneDetails[data]['name']} Buynow Button`);
      this.currentGroup1 = data;
    } else {
      this.$group2PhoneImage.attr('src', this.phoneDetails[data]['image-link']);
      this.$group2CurrentLandingPage.attr('href', this.phoneDetails[data]['landing-page']);
      this.$group2BuynowButton.data('preorder-phone', data);
      this.$group2BuynowButton.attr('id', `Comparision Right ${this.phoneDetails[data]['name']} Buynow Button`);
      this.currentGroup2 = data;
    }
    this.UpdateVersion(group);

    this.UpdateFeature();
  }

  UpdateVersion(group = 1){
    switch(group){
      case 1:
        // Get Version Data
        let versionData1 = this.phoneDetails[this.currentGroup1]['versions'];

        // Update Current Name
        this.$group1CurrentVersion.html(versionData1[0]['name']);

        // Update Version Select List
        this.$group1VersionList.html('');
        versionData1.forEach( (element, index) => {
          this.$group1VersionList.append(
            `<li class="version-item" data-version="${index}">${element['name']}</li>`
          )
        });
        this.UpdatePrice(1, 0);
        break;
      default:
        // Get Version Data
        let versionData2 = this.phoneDetails[this.currentGroup2]['versions'];

        // Update Current Name
        this.$group2CurrentVersion.html(versionData2[0]['name']);

        // Update Version Select List
        this.$group2VersionList.html('');
        versionData2.forEach( (element, index) => {
          this.$group2VersionList.append(
            `<li class="version-item" data-version="${index}">${element['name']}</li>`
          )
        });

        this.UpdatePrice(2, 0);
        break;
    }
  }

  UpdatePrice(group = 1, index = 0){
    if(group == 1){
      // Product Group 1 Is Sale
      if(this.phoneDetails[this.currentGroup1]['versions'][index]['is-sale']){
        this.$group1PriceHolder.html(
          this.phoneDetails[this.currentGroup1]['versions'][index]['sale-price-html']
        );
      } else {
        // Original Price
        this.$group1PriceHolder.html(
          this.phoneDetails[this.currentGroup1]['versions'][index]['original-price-html']
        );
      }
    } else {
      // Product Group 2 Is Sale
      if(this.phoneDetails[this.currentGroup2]['versions'][index]['is-sale']) {
        this.$group2PriceHolder.html(
          this.phoneDetails[this.currentGroup2]['versions'][index]['sale-price-html']
        );
      } else {
        // Original Price
        this.$group2PriceHolder.html(
          this.phoneDetails[this.currentGroup2]['versions'][index]['original-price-html']
        );
      }
    }
  }

  UpdateFeature(){
    let group1List = this.phoneDetails[this.currentGroup1][this.currentAspect];
    let group2List = this.phoneDetails[this.currentGroup2][this.currentAspect];

    this.$featureListHolder1.html('');
    group1List.forEach( element => {
      this.$featureListHolder1.append(
        `<li class="feature-item">${element}</li>`
      )
    });

    this.$featureListHolder2.html('');
    group2List.forEach( element => {
      this.$featureListHolder2.append(
        `<li class="feature-item">${element}</li>`
      )
    })
  }

  EventSetup(){
    /* === Changing Phone Model === */
    // Common Elements
    this.$modelToggleBtn = this.$comparisionGroup.find('.select-phone-wrapper .caret');

    // Common Elements Event
    this.$modelToggleBtn.on('click', (e) => {
      let slideTarget = $(e.target).siblings('.phone-list, .version-list');
      if(!slideTarget.hasClass('active')){
        // Other Listing Block
        $('.phone-list.active , .version-list.active')
        .removeClass('active')
        .slideUp('fast');

        // Target Element Slide Down
        slideTarget.addClass('active')
        .slideDown('fast');
      } else {
        // Click on the active element itself
        slideTarget.removeClass('active')
        .slideUp('fast');
      }
    });


    // Group Elements - Group 1
    this.$modelHolder1 = this.$compareGroup1.find('.select-phone-wrapper');
    this.$group1CurrentPhone = this.$modelHolder1.find('.phone-active .value');
    this.$group1PhoneSelection = this.$compareGroup1.find('.phone-list .phone-item');

    // Events Group 1
    // Phone Model Events
    this.$group1PhoneSelection.on('click', (e) => {
      let newPhoneValue = $(e.target).data('phone-model');
      let phoneContext = $(e.target).html();

      this.$group1CurrentPhone.html(phoneContext);
      $(e.target).parents('.phone-list').removeClass('active').slideUp('fast');
      
      this.UpdateGroup( 1, newPhoneValue );
    });

    // Versions Events
    $('body').on('click', '.comparision-group.group-1 .version-list', (e) => {
      let slideTarget = $(e.target).parents('.version-list');
      slideTarget.removeClass('active').slideUp('fast');

      let versionData = this.phoneDetails[this.currentGroup1]['versions'][$(e.target).data('version')]['name'];
      this.$group1CurrentVersion.html(versionData);

      this.UpdatePrice(1, $(e.target).data('version'));
    });


    // Group Elements - Group 2
    this.$modelHolder2 = this.$compareGroup2.find('.select-phone-wrapper');
    this.$group2CurrentPhone = this.$modelHolder2.find('.phone-active .value');
    this.$group2PhoneSelection = this.$compareGroup2.find('.phone-list .phone-item');

    // Events Group 2
    this.$group2PhoneSelection.on('click', (e) => {
      let newPhoneValue = $(e.target).data('phone-model');
      let phoneContext = $(e.target).html();

      this.$group2CurrentPhone.html(phoneContext);
      $(e.target).parents('.phone-list').removeClass('active').slideUp('fast');
      this.$group2CurrentPhone.html(phoneContext);
      this.UpdateGroup( 2, newPhoneValue );
    });

    // Versions Events
    $('body').on('click', '.comparision-group.group-2 .version-list', (e) => {
      let slideTarget = $(e.target).parents('.version-list');
      slideTarget.removeClass('active').slideUp('fast');

      let versionData = this.phoneDetails[this.currentGroup2]['versions'][$(e.target).data('version')]['name'];
      this.$group1CurrentVersion.html(versionData);

      this.UpdatePrice(2, $(e.target).data('version'));
    });

    // Changing Compare Aspect
    this.$selectionItems.on('click', (e) => {
      if(!$(e.target).hasClass('active')){
        // Switch Active Aspect
        this.$selectionItems.removeClass('active');
        $(e.target).addClass('active');
        this.currentAspect = $(e.target).data('aspect');

        // Run Update Function
        this.UpdateFeature()
      }
    })
  }
}