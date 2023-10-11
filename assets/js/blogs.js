let tech_object = {
  'ai': ['speech', 'vision', 'graphics', 'reinforcement_learning', 'ai_system'],
  'nlp': ['understanding', 'dialogue', 'translation', 'search', 'data'],
  'applied_ai': ['curation', 'anomaly_detection', 'sequence_modeling', 'xai'],
  'financial_ai': ["investment-strategy", "market-understanding", "investor-understanding", "mlops"],
};
let tech_object_reverse;

function refreshList() {
  const blog_div_array = document.querySelectorAll(".blog-post-item");
  const checkbox_array = document.querySelectorAll("input[type=checkbox]");

  // show checked blogs only
  let checked_tag_array = [];
  for (let j = 0; j < checkbox_array.length; j += 1) {
    if (checkbox_array[j].checked) {
      checked_tag_array.push(checkbox_array[j].id);
    }
  }

  // console.log(checked_tag_array);

  for (let k = 0; k < blog_div_array.length; k += 1) {
    const class_list = blog_div_array[k].classList
      .toString()
      .toLowerCase()
      .split(" ");
    let show = false;
    for (let m = 0; m < checked_tag_array.length; m += 1) {
      if (class_list.indexOf(checked_tag_array[m]) != -1) {
        show = true;
        break;
      }
    }

    if (show) {
      blog_div_array[k].style.display = "";
    } else {
      blog_div_array[k].style.display = "none";
    }
  }
}

function initEventListener() {
    console.log('blogs init');

    tech_object_reverse = {};
    for (const [k, v] of Object.entries(tech_object)) {
      for (let i = 0; i < v.length; i += 1) {
        tech_object_reverse[v[i]] = k;
      }
    }

    const blog_div_array = document.querySelectorAll('.blog-post-item');
    const checkbox_array = document.querySelectorAll('input[type=checkbox]');
    const blog_filter_big_array = document.querySelectorAll(".blog-filter-big");
    const blog_filter_small_array = document.querySelectorAll(".blog-filter-small");
    const tech_main_object = Object.keys(tech_object);
    
    for (let i = 0; i < checkbox_array.length; i += 1) {
      checkbox_array[i].addEventListener('change', () => {
        // main to sub check
        const isMain = tech_main_object.some((key) => key === checkbox_array[i].id);
        if (isMain) {
            for (let j = 0; j < tech_object[checkbox_array[i].id].length; j += 1) {
              const sub_checkbox = document.getElementById(tech_object[checkbox_array[i].id][j]);
              sub_checkbox.checked = checkbox_array[i].checked;
            }
        }
        
        refreshList();
      });
    }

    // label click to check
    for (let i = 0; i < blog_filter_small_array.length; i += 1) {
      blog_filter_small_array[i].addEventListener('click', (e) => {
        // if (e.target.tagName == 'INPUT') {
        //   return;
        // }
        const checkbox = blog_filter_small_array[i].querySelector('input');
        checkbox.checked = !checkbox.checked;

        if (checkbox.checked == false) {
          // main uncheck when sub uncheck
          if (Object.keys(tech_object).indexOf(checkbox.id) == -1) {
            const main_tech_id = tech_object_reverse[checkbox.id];
            document.getElementById(main_tech_id).checked = false;
          }
        }
        else {
          // main check when all sub check
          if (Object.keys(tech_object).indexOf(checkbox.id) == -1) {
            const sub_array = tech_object[tech_object_reverse[checkbox.id]];
            let all_checked = true;
            sub_array.forEach(c => {
              if (document.getElementById(c).checked == false) {
                all_checked = false;
              }
            });
            if (all_checked) {
              const main_tech_id = tech_object_reverse[checkbox.id];
              document.getElementById(main_tech_id).checked = true;
            }
          }
        }

        refreshList();
      });
    }

    // show/hide sub tech
    for (let i = 0; i < blog_filter_big_array.length; i += 1) {
      blog_filter_big_array[i].addEventListener('click', (e) => {
        // e.stopPropagation();
        // console.log(e.target.tagName)
        if (e.target.tagName == "INPUT" || e.target.tagName == "LABEL") {
          refreshList();
          return;
        }

        const checkbox = blog_filter_big_array[i].querySelector('input');
        const subtech_div = document.getElementById(`${checkbox.id}_subtech`);
        const chevron = document.getElementById(`${checkbox.id}_chevron`);
        
        if (hasClass(subtech_div, 'hide')) {
          removeClass(subtech_div, 'hide');
          removeClass(chevron, "chevron_hide");
        }
        else {
          addClass(subtech_div, 'hide');
          addClass(chevron, "chevron_hide");
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
