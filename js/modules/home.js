// Common Behavior
import Common from './common';

// Sections Scripts
import ProductListing from './products-listing';
import Banner from './banner';
import Comparision from './comparision';
import News from './news';
import FlashSaleDetail from './flashsale';
import YouTubePlayer from 'youtube-player';

// Utils
import { pageListener, reachSection } from './utils';

export default class Home {
    /* ===================================
     *  CONSTRUCTOR
     * =================================== */
    constructor(){
        window.rmFlashSaleListener = new pageListener();

        // Common Behavior
        let common = new Common();

        // Individual Section
        let banner = new Banner();

        let productListing = new ProductListing();
        let comparision = new Comparision();
        let news = new News();
        let flashsale = new FlashSaleDetail();

        /* Sections */
        this.$flashsaleSection = $('.section-fs-detail');

        /* Animation Status */
        this.animationStatus = {
            flashsale: false,
        };
        
        if($('#music-event-holder').length > 0){
            this.playerYT = YouTubePlayer('music-event-holder', {
                videoId: '8Ft5ew4bBIg', // Default Clip
                playerVars: {
                    disablekb: 1,
                    fs: 0,
                    modestbranding: 1,
                    rel: 0,
                    controls: 0,
                    loop: 1,
                },
            });
            this.playerYT.playVideo();
        }

        this.bindEvents();
    }


    /* ===================================
     *  EVENTS
     * =================================== */
    bindEvents(){
        this.SetupHomePage();
    }

    /* ===================================
     *  METHODS
     * =================================== */
    SetupHomePage(){
        $(window).on('scroll', (e) => {
            if(reachSection( this.$flashsaleSection )){
                if( !this.animationStatus.flashsale){
                    this.animationStatus.flashsale = true;
                    rmFlashSaleListener.emit('flashsale-anim');
                }
            }
        });
    }
}