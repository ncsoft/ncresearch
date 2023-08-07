function initEventListener() {
  const desc_array = document.querySelectorAll(".llm_desc");
  desc_array.forEach(c => {
    c.addEventListener('click', function(e) {
      if (hasClass(c, "active")) {
        removeClass(c, "active");
      } else {
        addClass(c, "active");
      }
    });
  });
}

function hasClass(el, className) {
  if (el.classList) {
    return el.classList.contains(className);
  } else {
    return !!el.className.match(new RegExp("(\\s|^)" + className + "(\\s|$)"));
  }
}

function addClass(el, className) {
  if (el.classList) {
    el.classList.add(className);
  } else if (!hasClass(el, className)) {
    el.className += " " + className;
  }
}

function removeClass(el, className) {
  if (el.classList) {
    el.classList.remove(className);
  } else if (hasClass(el, className)) {
    let reg = new RegExp("(\\s|^)" + className + "(\\s|$)");
    el.className = el.className.replace(reg, " ");
  }
}

document.addEventListener("DOMContentLoaded", function (e) {
  initEventListener();
});
