function initEventListener() {
  console.log('main_page init');
  const site_header = document.getElementsByClassName('site-header')[0];
  removeClass(site_header, 'site_header_wheeled');
  
  addEventListener('scroll', (e) => {
    const main_div = document.getElementById('main');
    // const logo_blue = document.getElementById('logo_blue');
    // const logo_white = document.getElementById('logo_white');
    const site_header = document.getElementsByClassName('site-header')[0];
    const site_header_a = document.querySelectorAll('a.clear');

    if (window.scrollY <= 20) {
      removeClass(main_div, 'call-out_img_wheeled');
    //   addClass(logo_blue, 'avatar_hide');
    //   removeClass(logo_white, 'avatar_hide');
      removeClass(site_header, 'site_header_wheeled');
      site_header_a.forEach(c => addClass(c, 'main_page_a'));
    //   main_div.style.display = 'inline-block';
    }
    else {
      addClass(main_div, 'call-out_img_wheeled');
    //   removeClass(logo_blue, 'avatar_hide');
    //   addClass(logo_white, 'avatar_hide');
      addClass(site_header, 'site_header_wheeled');
      site_header_a.forEach(c => removeClass(c, 'main_page_a'));
    //   main_div.style.display = 'none';
    }
  });
  
}

function hasClass(el, className) {
    if (el.classList) {
        return el.classList.contains(className);
    }
    else {
        return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
    }
}

function addClass(el, className) {
    if (el.classList) {
        el.classList.add(className);
    }
    else if (!hasClass(el, className)) {
        el.className += ' ' + className;
    }
}

function removeClass(el, className) {
    if (el.classList) {
        el.classList.remove(className);
    }
    else if (hasClass(el, className)) {
        let reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
        el.className = el.className.replace(reg, ' ');
    }
}

document.addEventListener('DOMContentLoaded', function(e) {
    initEventListener();
});
