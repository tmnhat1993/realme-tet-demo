import preorderData from './preorder-data'
export default class Common {
    /* ===================================
     *  CONSTRUCTOR
     * =================================== */
    constructor(){
        this.currentPreOrderPhone = 'realme-c2';

        this.preOrderInfor = preorderData;

        this.currentPreorder = 'realme-c2';

        // Preorder Elements
        this.$preorderSection = $('.pre-order-dialog .pre-order-content');
        this.$activePhoneName = this.$preorderSection.find('.active-phone .phone-name');
        this.$phoneListToggler = this.$preorderSection.find('.open-pre-order-phones-list');
        this.$preorderPhoneList = this.$preorderSection.find('.active-phone .phones-list');

        this.$preorderVersionName = this.$preorderSection.find('.active-version .version-name');
        this.$versionListToggler = this.$preorderSection.find('.open-pre-order-version-list');
        this.$preorderVersionList = this.$preorderSection.find('.active-version .version-list');

        this.$searchStoreButton = this.$preorderSection.find('.pre-order-footer .cta');

        // Partner Elements
        this.$partnerList = this.$preorderSection.find('.partners-list');
        this.$tgddHolder = this.$partnerList.find('.partner-item.tgdd');
        this.$fptHolder = this.$partnerList.find('.partner-item.fpt');
        this.$viettelHolder = this.$partnerList.find('.partner-item.viettel');
        this.$vinproHolder = this.$partnerList.find('.partner-item.vinpro');
        this.$lazadaHolder = this.$partnerList.find('.partner-item.lazada');

        this.bindEvents();
    }


    /* ===================================
     *  EVENTS
     * =================================== */
    bindEvents(){
        this.SetupCommon();
    }

    /* ===================================
     *  METHODS
     * =================================== */
    SetupCommon(){
        /**
         * TODO:
         * _ Header And Footer Effect
         * _ Menu Effect For Desktop And Mobile
         * _ Modal Control
         **/

        this.slickFunction();
        this.headerProductFunction();
        this.footerFunction();
        this.SmoothScrollingSetup();

        // Modal Setup
        this.GameRuleModalSetup();
        this.PreorderModalSetup();
        this.LoginModalSetup();
        this.GameResultModalSetup();
        this.GameHistoryModalSetup();

        // Mobile Special Menu
        if(window.innerWidth <= 768){
            this.SetupMobileSpecialMenu();
        }
    }

    SetupMobileSpecialMenu(){
        this.$specialHeader = $('.special-header');
        this.$specialHeaderMenuToggler = $('.special-mobile-menu-toggler');
        this.$closeSpecialMenu = $('.close-special-header');
        this.$specialHeaderMenu = $('.flash-sale-menu');
        this.allowSpecialMenuInteraction = true;

        this.$specialHeaderMenuToggler.on('click', (e) => {
            if(this.allowSpecialMenuInteraction){
                this.allowSpecialMenuInteraction = false;

                if(!this.$specialHeader.hasClass('show-menu')){
                    this.$specialHeader.addClass('show-menu');
                    this.$specialHeaderMenu.slideDown('fast', () => {
                        this.allowSpecialMenuInteraction = true;
                    })
                } else {
                    this.$specialHeader.removeClass('show-menu');
                    this.$specialHeaderMenu.slideUp('fast', () => {
                        this.allowSpecialMenuInteraction = true;
                    })
                }
            }
        });

        this.$closeSpecialMenu.on('click', () => {
            if(this.allowSpecialMenuInteraction){
                this.allowSpecialMenuInteraction = false;
                this.$specialHeader.removeClass('show-menu');
                this.$specialHeaderMenu.slideUp('fast', () => {
                    this.allowSpecialMenuInteraction = true;
                });
            }
        })
    }

    SmoothScrollingSetup(){
        $('a[href*="#"]')
        // Remove links that don't actually link to anything
          .not('[href="#"]')
          .not('[href="#0"]')
          .click(function(event) {
            // On-page links
            if (
              location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
              &&
              location.hostname == this.hostname
            ) {
                // Figure out element to scroll to
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                // Does a scroll target exist?
                if (target.length) {
                    // Only prevent default if animation is actually gonna happen
                    event.preventDefault();
                    $('html, body').animate({
                        scrollTop: target.offset().top
                    }, 700, function() {
                        // Callback after animation
                        // Must change focus!
                        var $target = $(target);
                        $target.focus();
                        if ($target.is(":focus")) { // Checking if the target was focused
                            return false;
                        } else {
                            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
                            $target.focus(); // Set focus again
                        };
                    });
                }
            }
        });
    }

    headerProductFunction() {
        if($(window).width() > 767) {
            $('.header__list__product').hover(function () {
                $('#page-header').toggleClass('product-active');
            })
        } else {
            $('.header__list__product').click(function () {
                $(".nav-product").stop().slideToggle(300);
            })
        }
        $('#nav-icon4').click(function () {
            $(this).toggleClass('open');
            $('#page-header').toggleClass('menu-active');
            $(".header__list").stop().slideToggle(300);
            $('body').toggleClass('stop-scroll');
        })
        $(window).scroll(function() {
            if($(window).scrollTop() > 100) {
                $('#page-header').addClass('menu-scroll');
                $('.special-header').addClass('menu-scroll');
            } else {
                $('#page-header').removeClass('menu-scroll');
                $('.special-header').removeClass('menu-scroll');
            }
        });
    }

    footerFunction() {
        $('#page-footer .footer__col').each(function () {
            var $thisCol = $(this);
            if($(window).width() < 768) {
                $(this).find('h3').click(function () {
                    $thisCol.find('ul').slideToggle(300);
                    $(this).toggleClass('footer__col__ul--active');
                })
            }
        })
    }

    slickFunction() {
        $('.top-slider .top-slider__wrap, .product-slide .product-slide__wrap').slick({
            dots: true,
        });

        $('.nav-product__list').slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            infinite: false,
            responsive: [
                {
                    breakpoint: 767,
                    settings: "unslick"
                }
            ]
        });
    }

    /* ==== MODALS ==== */
    GameRuleModalSetup(){
        this.$openGameRuleModal = $('.open-game-rule-modal');
        this.$closeGameRuleModal = $('.close-game-rule-modal');
        this.$gameRuleModal = $('.game-rule-modal');

        this.$openGameRuleModal.on('click', () => {
            $('body').addClass('show-modal');
            this.$gameRuleModal.addClass('active');
        });

        this.$closeGameRuleModal.on('click', () => {
            $('body').removeClass('show-modal');
            this.$gameRuleModal.removeClass('active');
        });
    }

    GameResultModalSetup(){
        // This modal cannot be open normally, only after the rotation
        this.$closeGameResultModal = $('.close-game-result-modal');
        this.$gameResultModal = $('.game-result-modal');

        this.$closeGameResultModal.on('click', () => {
            $('body').removeClass('show-modal');
            this.$gameResultModal.removeClass('active');
        });
    }

    GameHistoryModalSetup(){
        this.$closeGameHistoryModal = $('.close-game-history-modal');
        this.$openGameHistoryModal = $('.open-game-history-modal');
        this.$gameHistoryModal = $('.game-history-modal');

        this.$closeGameHistoryModal.on('click', () => {
            $('body').removeClass('show-modal');
            this.$gameHistoryModal.removeClass('active');
        });

        this.$openGameHistoryModal.on('click', () => {
            $('body').addClass('show-modal');
            this.$gameHistoryModal.addClass('active');
        });
    }

    PreorderModalSetup(){
        this.$openPreorderModal = $('.open-pre-order-modal');
        this.$closePreorderModal = $('.close-pre-order-modal');
        this.$preorderModal = $('.pre-order-modal');

        // Open And Close Modal Events
        this.$openPreorderModal.on('click', (e) => {
            let targetPhone = $(e.target).data('preorder-phone');
            this.UpdatePreorderModal(targetPhone);

            $('body').addClass('show-modal');
            this.$preorderModal.addClass('active');
        });

        this.$closePreorderModal.on('click', () => {
            $('body').removeClass('show-modal');
            this.$preorderModal.removeClass('active');
        });


        // Phone and Version Picker Behavior
        this.$phoneListToggler.on('click', (e) => {
            if(!this.$preorderPhoneList.hasClass('active')){
                // Close Below Selector
                this.$preorderVersionList.slideUp('fast', () => {
                    this.$preorderVersionList.removeClass('active');
                });

                this.$preorderPhoneList.slideDown('fast', () => {
                    this.$preorderPhoneList.addClass('active')
                })
            } else {
                this.$preorderPhoneList.slideUp('fast', () => {
                    this.$preorderPhoneList.removeClass('active')
                });
            }
        });

        this.$versionListToggler.on('click', (e) => {
            if(!this.$preorderVersionList.hasClass('active')){
                this.$preorderVersionList.slideDown('fast', () => {
                    this.$preorderVersionList.addClass('active');
                });
            } else {
                this.$preorderVersionList.slideUp('fast', () => {
                    this.$preorderVersionList.removeClass('active');
                });
            }
        });

        $('body').on('click', '.pre-order-dialog .pre-order-content .phone-item', (e) => {
            let phoneModel = $(e.target).data('phone-model');
            this.UpdatePreorderModal(phoneModel);

            $(e.target).parents('.phones-list').slideUp('fast', () => {
                $(e.target).parents('.phones-list').removeClass('active');
            });
        });

        $('body').on('click', '.pre-order-dialog .pre-order-content .version-item', (e) => {
            let versionName = $(e.target).html();
            let versionIndex = $(e.target).data('version-index');

            this.UpdateKALink(versionIndex);

            this.$searchStoreButton.attr('id', `Popup Search Store ${this.preOrderInfor[this.currentPreorder]['name']} ${this.preOrderInfor[this.currentPreorder]['versions'][versionIndex]['name']} Button`)

            this.$preorderVersionName.html(versionName);

            $(e.target).parents('.version-list').slideUp('fast', () => {
                $(e.target).parents('.version-list').removeClass('active');
            });
        });
    }

    LoginModalSetup(){
        this.$openLoginModal = $('.open-login-modal');
        this.$closeLoginModal = $('.close-login-modal');
        this.$loginModal = $('.login-modal');

        this.$toSignupBtn = $('.to-signup');
        this.$toLoginBtn = $('.to-login');
        this.$loginForm = this.$loginModal.find('.login-form');
        this.$signupForm = this.$loginModal.find('.signup-form');
        this.allowSwitchForm = true;

        // Modal Control
        this.$openLoginModal.on('click', () => {
            $('body').addClass('show-modal');
            this.$loginModal.addClass('active');
        });
        this.$closeLoginModal.on('click', () => {
            $('body').removeClass('show-modal');
            this.$loginModal.removeClass('active');
        });

        // Form Switching
        this.$toSignupBtn.on('click', () => {
            if(this.allowSwitchForm){
                this.allowSwitchForm = false;
                this.$loginForm.fadeOut('fast', () => {
                    this.$signupForm.fadeIn('fast');
                    this.allowSwitchForm = true;
                });
            }
        });

        this.$toLoginBtn.on('click', () => {
            if(this.allowSwitchForm){
                this.allowSwitchForm = false;
                this.$signupForm.fadeOut('fast', () => {
                    this.$loginForm.fadeIn('fast');
                    this.allowSwitchForm = true;
                });
            }
        });
    }

    UpdatePreorderModal(phoneType = 'reamle-c2'){
        let phoneData = this.preOrderInfor[phoneType];

        // Update Current Preorder Phone
        this.currentPreorder = phoneType;
        this.$searchStoreButton.attr('id', `Popup Search Store ${this.preOrderInfor[phoneType]['name']} ${this.preOrderInfor[phoneType]['versions'][0]['name']} Button`)

        // Update Phone Name
        this.$activePhoneName.html(this.preOrderInfor[phoneType]['name']);

        // Render Version
        let versionsData = this.preOrderInfor[phoneType]['versions'];
        this.$preorderVersionName.html(this.preOrderInfor[phoneType]['versions'][0]['name']);
        this.$preorderVersionList.html('');
        versionsData.forEach((element, index) => {
            this.$preorderVersionList.append(
              `<li class="version-item" data-version-index="${index}">${element['name']}</li>`
            );
        });
        this.UpdateKALink(0);
    }

    UpdateKALink(versionIndex = 0){
        let KAData = this.preOrderInfor[this.currentPreorder]['versions'][versionIndex]['links'];

        this.$viettelHolder = this.$partnerList.find('.partner-item.viettel');
        this.$vinproHolder = this.$partnerList.find('.partner-item.vinpro');
        this.$lazadaHolder = this.$partnerList.find('.partner-item.lazada');


        if(KAData['tgdd'] !== ''){
            this.$tgddHolder.html('');
            this.$tgddHolder.append(
              `<a class="link-wrapper track-this-button" 
                  href="${this.preOrderInfor[this.currentPreorder]['versions'][versionIndex]['links']['tgdd']}"
                  id="Popup ${this.currentPreorder} ${this.preOrderInfor[this.currentPreorder]['versions'][versionIndex]['name']} TGDD Buynow Button">
                <img src="img/partners/tgdd.png">
              </a>`
            );
            this.$tgddHolder.show();
        } else {
            this.$tgddHolder.hide();
        }

        if(KAData['fpt'] !== ''){
            this.$fptHolder.html('');
            this.$fptHolder.append(
              `<a class="link-wrapper track-this-button"
                   href="${this.preOrderInfor[this.currentPreorder]['versions'][versionIndex]['links']['fpt']}"
                  id="Popup ${this.currentPreorder} ${this.preOrderInfor[this.currentPreorder]['versions'][versionIndex]['name']} FPTShop Buynow Button">
                <img src="img/partners/fpt.png">
              </a>`
            );
            this.$fptHolder.show();
        } else {
            this.$fptHolder.hide();
        }

        if(KAData['vinpro'] !== ''){
            this.$vinproHolder.html('');
            this.$vinproHolder.append(
              `<a class="link-wrapper track-this-button"
                   href="${this.preOrderInfor[this.currentPreorder]['versions'][versionIndex]['links']['vinpro']}"
                  id="Popup ${this.currentPreorder} ${this.preOrderInfor[this.currentPreorder]['versions'][versionIndex]['name']} Vinpro Buynow Button">
                <img src="img/partners/vinpro.png">
              </a>`
            );
            this.$vinproHolder.show();
        } else {
            this.$vinproHolder.hide();
        }

        if(KAData['viettel'] !== ''){
            this.$viettelHolder.html('');
            this.$viettelHolder.append(
              `<a class="link-wrapper track-this-button"
                   href="${this.preOrderInfor[this.currentPreorder]['versions'][versionIndex]['links']['viettel']}"
                  id="Popup ${this.currentPreorder} ${this.preOrderInfor[this.currentPreorder]['versions'][versionIndex]['name']} Viettel Buynow Button">
                <img src="img/partners/viettel.png">
              </a>`
            );
            this.$viettelHolder.show();
        } else {
            this.$viettelHolder.hide();
        }

        if(KAData['lazada'] !== ''){
            this.$lazadaHolder.html('');
            this.$lazadaHolder.append(
              `<a class="link-wrapper track-this-button"
                   href="${this.preOrderInfor[this.currentPreorder]['versions'][versionIndex]['links']['lazada']}"
                  id="Popup ${this.currentPreorder} ${this.preOrderInfor[this.currentPreorder]['versions'][versionIndex]['name']} Lazada Buynow Button">
                  <img src="img/partners/lazada.png">
              </a>`
            );
            this.$lazadaHolder.show();
        } else {
            this.$lazadaHolder.hide();
        }
    }
}
