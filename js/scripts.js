import Common from './modules/common';
import Home from './modules/home';
import MiniGame from './modules/mini-game';

$(document).ready(function() {
    // Behavior for page-wrapper with ID = "home-page"
    if($('#realme-december-flashsale-event').length > 0){
        let home = new Home();
    }
    // Behavior for page-wrapper with ID = "home-page"
    if($('.section-wheel-spin').length > 0){
        let miniGame = new MiniGame();
    }

    window.onload = () => {
        $('body').removeClass('pending');
        $('.page-marker').addClass('active');
        $('body').trigger('finish-loaded');
    }
});
