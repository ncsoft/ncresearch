function initEventListener() {
  console.log('main_page init');
  
  addEventListener('wheel', (e) => {
    const main_div = document.getElementById('main');

    if (window.scrollY <= 20) {
      removeClass(main_div, 'call-out_img_wheeled');
    }
    else {
      addClass(main_div, 'call-out_img_wheeled');
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
