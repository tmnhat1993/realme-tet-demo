/**
 * REQUIREMENT 
 */

import API from './api';
import { Power4, TweenMax } from 'gsap'

export default class MiniGame {
  /* ===================================
   *  CONSTRUCTOR
   * =================================== */
  constructor() {
    // Game Elements
    this.$wheelFrontBtn = $('.game-wheel-front');
    this.$gameWheelPrize = $('.game-wheel-prize');
    this.$gamePointer = $('.game-pointer');
    this.$spinTheWheelBtn = $('.spin-the-wheel');

    // Authenticate Elements
    this.$loginModal = $('.login-modal');
    this.$signupForm = $('#signupForm');
    this.$loginForm = $('#loginForm');
    this.$loginFormFeedback = $('#login-form-feedback');
    this.$signupFormFeedback = $('#signup-form-feedback');

    // Result Modal
    this.$resultModal = $('.game-result-modal');
    this.$prizeText = this.$resultModal.find('.result-context');
    this.$prizeImage = this.$resultModal.find('.prize-img');

    // Data Holder
    this.$remainingCoinHolder = $('#remaining-coin');
    this.$remainingLive = $('#remaining-lives');
    this.$luckyList = $('#lucky-persion-list');
    this.$spinningHistory = $('#spinning-history');

    // CTAs 
    this.$loggedOutButton = $('#game-logout-button');
    this.$buyLiveButton = $('#buy-live');
    this.$loginButton = $('#game-login-button');
    this.$loginSubmitButton = $('#login-submit');
    this.$registerSubmitButton = $('#signup-submit');
    this.$facebookSharingButton = $('#game-sharing-button');
    this.$showHistoryButton = $('#game-history-buton');

    this.userState = {
      isUserLoggedIn: false,
      data: null,
    };

    this.wheelIsSpinned = false;
    this.allowSpinning = true;

    this.bindEvents()
  }


  /* ===================================
   *  EVENTS
   * =================================== */
  bindEvents() {
    this.SetupMiniPage();

    this.SetupFlowerEffect();
  }

  /* ===================================
   *  METHODS
   * =================================== */
  SetupMiniPage() {
    this.AddRotateEvent();

    // GET Global Data
    this.GetPrizeWinners();

    // Buy live button
    this.BuyLiveSetup();

    // Sharing Button Setup
    this.SharingButtonSetup();

    // Authentication Setup
    this.AutoLogin();
    this.LoginSetup();
    this.LogoutSetup();
    this.RegisterSetup();
  }

  /* ==== GAME LOGIC ==== */
  StartRotate(result) {
    // Win Prize
    switch (result.data.type) {
      case '100xu':
        TweenMax.to(this.$gameWheelPrize, 10, {
          rotation: 3600 + 292,
          ease: Power4.easeOut,
          onComplete: () => { this.ShowResultDialog(result); }
        });
        break;

      case '500xu':
        TweenMax.to(this.$gameWheelPrize, 10, {
          rotation: 3600 + 200,
          ease: Power4.easeOut,
          onComplete: () => { this.ShowResultDialog(result); }
        });
        break;

      case '700xu':
        TweenMax.to(this.$gameWheelPrize, 10, {
          rotation: 3600 + 65,
          ease: Power4.easeOut,
          onComplete: () => { this.ShowResultDialog(result); }
        });
        break;

      case 'realme-hat':
        TweenMax.to(this.$gameWheelPrize, 10, {
          rotation: 3600 + 22,
          ease: Power4.easeOut,
          onComplete: () => { this.ShowResultDialog(result); }
        });
        break;

      case 'realme-headphone':
        TweenMax.to(this.$gameWheelPrize, 10, {
          rotation: 3600 + 157,
          ease: Power4.easeOut,
          onComplete: () => { this.ShowResultDialog(result); }
        });
        break;

      case 'realme-phone':
        TweenMax.to(this.$gameWheelPrize, 10, {
          rotation: 3600 + 337,
          ease: Power4.easeOut,
          onComplete: () => { this.ShowResultDialog(result); }
        });
        break;

      default:
        TweenMax.to(this.$gameWheelPrize, 10, {
          rotation: 3600 + 112,
          ease: Power4.easeOut,
          onComplete: () => { this.ShowResultDialog(result); }
        });
        break;
    }
  }

  RotateAPI() {
    // Remove old rotation
    const api = new API({
      url: '/quay_so',
      success: (res) => {
        this.StartRotate(res);

        // Update Live without calling API
        this.userState.data.lives -= 1;

        // After minus the live
        if(this.userState.data.lives > 0){
          // If live > 0
          this.$remainingLive.html(this.userState.data.lives);
        } else {
          // User run out of life
          $('.user-still-have-live').hide();
          $('.user-is-out-of-live').show();
        }
      },
      err: (res) => {
        alert('Quay số thất bại, vui lòng kiểm tra đường truyền và thử lại');
      }
    })

  }

  AddRotateEvent() {
    this.$spinTheWheelBtn.on('click', () => {
      // If is not logged in and
      if (this.userState.isUserLoggedIn) {

        // If amount if live still larger than 0
        if (this.userState.data.lives > 0) {

          // Block Interaction When Spinning
          if (this.allowSpinning) {
            this.allowSpinning = false;

            // Wheel already spinned at least 1 time, do the reset animation
            if (this.wheelIsSpinned) {
              TweenMax.to(this.$gameWheelPrize, 1, {
                rotation: 3600,
                onComplete: () => {
                  TweenMax.set(this.$gameWheelPrize, { rotation: 0 });
                  this.RotateAPI();
                }
              });
            } else {
              // First Time Spin The Wheel
              this.wheelIsSpinned = true;
              this.RotateAPI();
            }
          }
        } else {
          this.ShowResultDialog({data:{ type: 'out-of-live' }});
        }

      } else {
        // User not loggedin , show loggedin modal
        this.$loginModal.addClass('active');
      }
    })
  }

  BuyLiveSetup() {
    this.$buyLiveButton.on('click', () => {
      if (this.userState.isUserLoggedIn) {
        const api = new API({
          url: '/change_coin_to_live',
          method: 'GET',
          success: (res) => {
            // console.log('buy life result', res);

            if(res.is_success){
              this.userState.data.lives = res.data.lives;
              this.userState.data.coin = res.data.coin;

              this.$remainingCoinHolder.html(this.userState.data.coin );
              this.$remainingLive.html(this.userState.data.lives);

              // Life is now > 0, hide buying button
              $('.user-still-have-live').show();
              $('.user-is-out-of-live').hide();
            } else {
              this.ShowResultDialog( { data:{ type: 'buy-life-failed' }} );
            }
          },
          err: (err, textStatus, errorThrown) => {
            this.ShowResultDialog( { data:{ type: 'buy-life-failed-server' }} );
          }
        });
      }
    })
  }

  SharingButtonSetup() {
    this.$facebookSharingButton.on('click', () => {
      FB.ui( {
        method: 'share',
        hashtag: '#TếtREALME',
        // href: 'https://realmemobile.vn/realme-5-series/?utm_source=ReviewSharer&utm_medium=Reviewcontest&utm_campaign=RM5',
        href: 'https://realmemobile.vn/tet-realme/?utm_source=Facebook&utm_medium=ShareTram5&utm_campaign=RM3-Teasing',
      }, (response) => {
        // console.log(response);
        if(response !== undefined){
          // Success
          this.ProcessSharing();
        } else {
          this.ShowResultDialog({ data:{ type:'sharing-failed'}});
        }
      });
    })
  }

  ProcessSharing(){
    const api = new API({
      url: '/sharing',
      method: 'GET',
      success: (res) => {
        if(res.is_success){
          this.ShowResultDialog({ data:{ type:'sharing-success'}});
          this.userState.data.coin += 1000;
          this.$remainingCoinHolder.html(this.userState.data.coin);
        } else {
          this.ShowResultDialog({ data:{ type:'sharing-already'}});
        }
      },
      err: () => {
        this.ShowResultDialog({ data:{ type:'sharing-failed'}});
      }
    });
  }

  /* ==== AUTHENTICATION ==== */
  RegisterSetup() {
    jQuery.validator.addMethod("checkPhoneNumber", (value, element) => {
      const phone = this.$signupForm.find('[name="phone"]').val()

      if (phone.length === 10) {
        return true
      }

      return false
    }, 'Vui lòng nhập email hoặc số điện thoại');

    this.$signupForm.validate({
      rules: {
        fullname: "required",
        phone: {
          required: true,
          checkPhoneNumber: true,
        },
        email: {
          required: true,
          email: true,
        },
      },
      messages: {
        fullname: "Họ và tên là bắt buộc.",
        phone: {
          required: "Vui lòng nhập số điện thoại.",
          checkPhoneNumber: "Vui lòng nhập số điện thoại hợp lệ."
        },
        email: {
          required: "Vui lòng nhập Email.",
          email: "Vui lòng nhập email hợp lệ.",
        }
      }
    });

    this.$signupForm.on('submit',(e) => {
      e.preventDefault();
      this.SubmitSignup();
    })

    this.$registerSubmitButton.click(() => {
      this.SubmitSignup();
    })

    this.SetInputFilter(this.$signupForm.find('[name="phone"]').get(0), function(value) {
      return /^\d*$/.test(value); // Allow digits
    });

  }

  SetupFlowerEffect(){
    this.$flowerHolder = $('.section-wheel-spin .flower-layer');

    // Flower Group 1
    this.$flowerElement1 = this.$flowerHolder.find('.flower-1');
    this.$flowerElement2 = this.$flowerHolder.find('.flower-3');

    // Flower Group 2
    this.$flowerElement3 = this.$flowerHolder.find('.flower-2');
    this.$flowerElement4 = this.$flowerHolder.find('.flower-4');
    this.$flowerElement5 = this.$flowerHolder.find('.flower-5');

    TweenMax.set([
      this.$flowerElement1,
      this.$flowerElement2,
      this.$flowerElement3,
      this.$flowerElement4,
      this.$flowerElement5,
    ], { scale: 0.25, autoAlpha: 0 });

    // Banner Animation Flowers Group 1
    this.flowerGroup1Timeline = new TimelineMax({ repeat: -1, repeatDelay: 0.85 });
    this.flowerGroup1Timeline.add([
      TweenMax.to(this.$flowerElement1, 1, { rotation: 80, autoAlpha: 1, scale: 1, ease: Power4.easeOut}),
      TweenMax.to(this.$flowerElement2, 1, { delay: 0.2, rotation: -30, autoAlpha: 1, scale: 1, ease: Power4.easeOut})
    ]);
    this.flowerGroup1Timeline.add([
      TweenMax.to(this.$flowerElement1, 0.55, { rotation: 100, autoAlpha: 0, scale: 1.1, ease: Power4.easeIn}),
      TweenMax.to(this.$flowerElement2, 0.49, { delay: 0.1, rotation: -40, autoAlpha: 0, scale: 1.075, ease: Power4.easeIn})
    ], '+=1.75');

    // Banner Animation Flowers Group 2
    this.flowerGroup2Timeline = new TimelineMax({ repeat: -1, repeatDelay: 1.15 });
    this.flowerGroup2Timeline.add([
      TweenMax.to(this.$flowerElement3, 1.1, { rotation: 80, autoAlpha: 1, scale: 1, ease: Power4.easeOut}),
      TweenMax.to(this.$flowerElement4, 0.9, { delay: 0.2, rotation: -30, autoAlpha: 1, scale: 1, ease: Power4.easeOut}),
      TweenMax.to(this.$flowerElement5, 0.93, { delay: 0.24, rotation: -35, autoAlpha: 1, scale: 1, ease: Power4.easeOut})
    ], '+=1');
    this.flowerGroup2Timeline.add([
      TweenMax.to(this.$flowerElement3, 0.65, { rotation: 100, autoAlpha: 0, scale: 1.1, ease: Power4.easeIn}),
      TweenMax.to(this.$flowerElement4, 0.49, { delay: 0.3, rotation: -40, autoAlpha: 0, scale: 1.075, ease: Power4.easeIn}),
      TweenMax.to(this.$flowerElement5, 0.45, { delay: 0.32, rotation: -45, autoAlpha: 0, scale: 1.075, ease: Power4.easeIn})
    ], '+=1.75');
  }

  // Restricts input for the given textbox to the given inputFilter function.
  SetInputFilter(textbox, inputFilter) {
    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
      textbox.addEventListener(event, function() {
        if (inputFilter(this.value)) {
          this.oldValue = this.value;
          this.oldSelectionStart = this.selectionStart;
          this.oldSelectionEnd = this.selectionEnd;
        } else if (this.hasOwnProperty("oldValue")) {
          this.value = this.oldValue;
          this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
        } else {
          this.value = "";
        }
      });
    });
  }

  LoginSetup() {
    this.$loginForm.validate({
      rules: {
        // fullname: "required",
        login: "required",
      },
      messages: {
        // fullname: "Họ và tên là bắt buộc.",
        login: "Nhập email hoặc số điện thoại đã đăng ký."
      }
    });

    this.$loginForm.on('submit', (e) => {
      e.preventDefault();
      this.SubmitLogin();
    })


    this.$loginSubmitButton.click(() => {
      this.SubmitLogin();
    })
  }

  SubmitLogin() {
    const isValid = this.$loginForm.valid();

    if (isValid) {
      const api = new API({
        url: '/sign_in',
        method: 'POST',
        data: {
          login: this.$loginForm.find('[name="login"]').val(),
        },
        success: (res) => {
          this.LoggedInProcess(res.data.user);
        },
        err: (err, textStatus, errorThrown) => {
          this.$loginFormFeedback
                .html('Email hoặc số điện thoại không hợp lệ, quý khách vui lòng thử lại hoặc bấm vào <b>Đăng ký ngay</b> để tạo tài khoản')
                .show();
        }
      });
    }
  }

  SubmitSignup() {
    const isValid = this.$signupForm.valid();

    if (isValid) {
      const api = new API({
        url: '/register',
        method: 'POST',
        data: {
          name: this.$signupForm.find('[name="fullname"]').val(),
          phone_number: this.$signupForm.find('[name="phone"]').val(),
          email: this.$signupForm.find('[name="email"]').val(),
        },
        success: (res) => {
          // console.log('signup success', res);
          this.$signupFormFeedback.html('').hide();
          this.LoggedInProcess(res.data.user);
        },
        err: (err, textStatus, errorThrown) => {
          let errInfo = JSON.parse(err.responseText)
          // console.log(JSON.parse(err.responseText));
          if(errInfo.data.messages.length > 0){
            this.$signupFormFeedback.html('');

            errInfo.data.messages.forEach( message => {
              switch (message){
                case 'Email has already been taken':
                  this.$signupFormFeedback.append(`<span>Email đã tồn tại</span><br>`);
                  break;
                case "Phone number has already been taken":
                  this.$signupFormFeedback.append(`<span>Số điện thoại đã tồn tại</span><br>`);
                  break;
                default:
                  this.$signupFormFeedback.append(`<span>Đăng ký không thành công, quý khách vui lòng thử lại</span><br>`);
                  break;
              };
            });

            this.$signupFormFeedback.show();
          }
        }
      })
    }
  }

  LogoutSetup() {
    this.$loggedOutButton.on('click', () => {
      this.LoggedOutProcess();
    });
  }

  AutoLogin() {
    if (localStorage.getItem('token')) {
      // There is data of the user
      const api = new API({
        url: '/me',
        method: 'GET',
        success: (res) => {
          // console.log(res)
          this.$loginModal.removeClass('active');
          this.LoggedInProcess(res.data.user);
        },
        err: (err, textStatus, errorThrown) => {
          // console.log('login failed', err, textStatus, errorThrown);
        }
      });
    } else {
      // No data, do logged out process
      this.LoggedOutProcess();
    }
  }

  LoggedInProcess(loginInfo = null) {
    this.$loginModal.removeClass('active');

    // Hide Logged out elements & Show loggedIn elements
    $('.user-is-logged-out').hide();
    $('.user-is-logged-in').show();

    // console.log(loginInfo);
    this.userState = {
      isUserLoggedIn: true,
      data: {
        name: loginInfo['name'],
        lives: loginInfo['lives'],
        coin: loginInfo['coin'],
        sharing_day: loginInfo['sharing_day'],
      }
    }

    this.$remainingCoinHolder.html(this.userState.data.coin);
    this.$remainingLive.html(this.userState.data.lives);

    // Remaining Live Processing
    if (this.userState.data.lives == 0) {
      $('.user-still-have-live').hide();
      $('.user-is-out-of-live').show();
    } else {
      $('.user-still-have-live').show();
      $('.user-is-out-of-live').hide();
    }

    // User History Processing
    this.GetSpinHistory()
  }

  LoggedOutProcess() {
    // Hide logged in elements & Show logged out elements
    $('.user-is-logged-out').show();
    $('.user-is-logged-in').hide();
    $('.user-still-have-live').hide();
    $('.user-is-out-of-live').hide();

    localStorage.clear();

    this.userState = {
      isUserLoggedIn: false,
      data: null,
    };

    this.$remainingCoinHolder.html('0');
    this.$remainingLive.html('0');
    this.$spinningHistory.html('');

    // Reset The Wheel
    this.wheelIsSpinned = false;
    TweenMax.set(this.$gameWheelPrize, { rotation: 0 });
  }

  /* ==== ULTILITIES === */
  ShowResultDialog(result) {
    this.allowSpinning = true;
    this.$resultModal.addClass('active');
    // console.log(result);

    // Call API update history
    this.GetSpinHistory();

    switch (result.data.type) {
      case '100xu':
        this.$prizeImage.hide();
        this.$prizeText.html(result.data.message);
        this.$resultModal.find('.result-image .realme-coin').show();
        this.userState.data.coin += 100;
        this.$remainingCoinHolder.html(this.userState.data.coin);
        break;

      case '500xu':
        this.$prizeImage.hide();
        this.$prizeText.html(result.data.message);
        this.$resultModal.find('.result-image .realme-coin').show();
        this.userState.data.coin += 500;
        this.$remainingCoinHolder.html(this.userState.data.coin);
        break;

      case '700xu':
        this.$prizeImage.hide();
        this.$prizeText.html(result.data.message);
        this.$resultModal.find('.result-image .realme-coin').show();
        this.userState.data.coin += 700;
        this.$remainingCoinHolder.html(this.userState.data.coin);
        break;

      case 'realme-hat':
        this.$prizeImage.hide();
        this.$prizeText.html(result.data.message);
        this.$resultModal.find('.result-image .realme-cap').show();
        break;

      case 'realme-headphone':
        this.$prizeImage.hide();
        this.$prizeText.html(result.data.message);
        this.$resultModal.find('.result-image .realme-headphone').show();
        break;

      case 'realme-phone':
        this.$prizeImage.hide();
        this.$prizeText.html(result.data.message);
        this.$resultModal.find('.result-image .realme-phone').show();
        break;

      case 'out-of-live':
        this.$prizeText.html('Bạn đã dùng hết lượt quay, xin hãy quay trở lại vào ngày mai!');
        this.$prizeImage.hide();
        break;

      case 'buy-life-failed':
        this.$prizeText.html('Bạn không đủ xu để mua thêm mạng, xin hãy quay trở lại vào ngày mai');
        this.$prizeImage.hide();
        break;

      case 'buy-life-failed-server':
        this.$prizeText.html('Không thể kết nối, quý khách vui lòng thử lại');
        this.$prizeImage.hide();
        break;

      case 'sharing-success':
        this.$prizeText.html('Share thông tin thành công, quý khách được tặng 1000 xu, chân thành cảm ơn quý khách');
        this.$prizeImage.hide();
        break;

      case 'sharing-failed':
        this.$prizeText.html('Share thông tin không thành công, quý khách vui lòng thử lại');
        this.$prizeImage.hide();
        break;

      case 'sharing-already':
        this.$prizeText.html('Mỗi ngày bạn chỉ được phép share 1 lần, hãy trở lại vào ngày mai');
        this.$prizeImage.hide();
        break;

      default:
        this.$prizeText.html('Chúc bạn may mắn lần sau');
        this.$prizeImage.hide();
        break;
    }
  }

  GetSpinHistory() {
    const api = new API({
      url: '/history',
      method: 'GET',
      success: (res) => {
        // console.log(res.data);
        this.$spinningHistory.html('');
        res.data.histories.forEach(element => {
          let spinTime = new Date(element.created_at);
          let spinTimeString = `${
            (spinTime.getDate() < 10 ? '0' : '') + spinTime.getDate()
          }/${
            (spinTime.getMonth() + 1 < 10 ? '0': '') + (spinTime.getMonth() + 1)
          }/${
            spinTime.getFullYear()
          } - ${
            (spinTime.getHours() < 10 ? '0' : '') + spinTime.getHours()
          }:${
            (spinTime.getMinutes() < 10 ? '0' : '') + spinTime.getMinutes()
          }
          - ${this.FilterPrizeName(element.description)}`
          this.$spinningHistory.append(`
            <li class="spinning-history-item">
              ${spinTimeString}
            </li>
          `);
        });
      }
    });
  }

  GetPrizeWinners() {
    const api = new API({
      url: '/top5_recent_winner',
      method: 'GET',
      success: (res) => {
        // console.log(res.data);
        this.$luckyList.html('');
        // Update History Holder, only 5 on the array
        let loadAmount = res.data.length > 5 ? 5 : res.data.length
        for (let i = 0; i < loadAmount; i++) {
          this.$luckyList.append(`<li>
              ${res.data[i].phone} - 
              <span class="capitalize">${ res.data[i].name}</span> đã trúng
              ${this.FilterPrizeName(res.data[i].type)}
            </li>`);
        }
      }
    });
  }

  FilterPrizeName(name = '') {
    switch (name) {
      case '100xu':
        return '100 Xu';
      case '500xu':
        return '500 Xu';
      case '700xu':
        return '700 Xu';
      case 'realme-hat':
        return 'Nón lưỡi trai realme';
      case 'realme-headphone':
        return 'Tai nghe realme buds';
      case 'realme-phone':
        return 'Realme 5i';
      default:
        return 'Không trúng thưởng';
    }

    return 'Không trúng thưởng';
  }
}
