
import $ from 'jquery'


export default function load() {

    $(window).scroll(function () {
        if ($(document).scrollTop() > 100) {
            $('nav').addClass('animate');
        } else {
            $('nav').removeClass('animate');
        }
    })

}

// export default headerLogic;