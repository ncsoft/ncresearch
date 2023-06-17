let now_selected_filter = "*";
let tech_object = {
  'ai': ['speech', 'vision', 'graphics', 'reinforcement_learning', 'ai_system'],
  'nlp': ['understanding', 'dialogue', 'translation', 'search', 'data'],
  'applied_ai': ['curation', 'anomaly_detection', 'sequence_modeling', 'xai']
};

function initEventListener() {
    console.log('blogs init');

    const blog_div_array = document.querySelectorAll('.blog-post-item');
    const checkbox_array = document.querySelectorAll('input[type=checkbox]');
    
    for (let i = 0; i < checkbox_array.length; i += 1) {
      checkbox_array[i].addEventListener('change', () => {
        switch (checkbox_array[i].id) {
          case 'ai':
          case 'nlp':
          case 'applied_ai':
            for (let j = 0; j < tech_object[checkbox_array[i].id].length; j += 1) {
              const sub_checkbox = document.getElementById(tech_object[checkbox_array[i].id][j]);
              sub_checkbox.checked = checkbox_array[i].checked;
            }
            break;
        }
      });
    }
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
