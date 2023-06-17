let now_selected_filter = '*';
let tech_object = {
  ai: ["speech", "vision", "graphics", "reinforcement_learning", "ai_system"],
  nlp: ["understanding", "dialogue", "translation", "search", "data"],
  applied_ai: ["curation", "anomaly_detection", "sequence_modeling", "xai"],
};
let tech_object_reverse;

function refreshList(retry=true) {
  const pub_div_array = document.querySelectorAll(".publication_div");
  const checkbox_array = document.querySelectorAll("input[type=checkbox]");

  // show checked blogs only
  let checked_tag_array = [];
  for (let j = 0; j < checkbox_array.length; j += 1) {
    if (checkbox_array[j].checked) {
      checked_tag_array.push(checkbox_array[j].id);
    }
  }

  // console.log(checked_tag_array);

  let count = 0;

  for (let k = 0; k < pub_div_array.length; k += 1) {
    const class_list = pub_div_array[k].classList
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
      if (now_selected_filter == '*') {
        pub_div_array[k].style.display = "";
        count += 1;
      } else {
        if (hasClass(pub_div_array[k], now_selected_filter)) {
          pub_div_array[k].style.display = "";
          count += 1;
        }
        else {
          pub_div_array[k].style.display = "none";
        }
      }
    } else {
      pub_div_array[k].style.display = "none";
    }
  }

  console.log(count, checked_tag_array, retry);

  if (count == 0 && checked_tag_array.length != 0 && retry == true) {
    // refresh again, because of tag hide
    now_selected_filter = "*";
    refreshTagFilter(now_selected_filter);
    refreshList(false);
  }
}

function refreshTagFilter(selcted_filter) {
    const pub_div_array = document.querySelectorAll(".publication_div");
    const pub_tag_array = document.querySelectorAll(".publication_tag");
    
    if (now_selected_filter == selcted_filter) {
      now_selected_filter = "*";

      for (let j = 0; j < pub_div_array.length; j += 1) {
        pub_div_array[j].style.display = "";
      }

      // reset tag style
      pub_tag_array.forEach((c) => {
        removeClass(c, "selected_pub_tag");
      });
    } else {
      now_selected_filter = selcted_filter;

      for (let j = 0; j < pub_div_array.length; j += 1) {
        if (hasClass(pub_div_array[j], now_selected_filter)) {
          pub_div_array[j].style.display = "";
        } else {
          pub_div_array[j].style.display = "none";
        }
      }

      // reset tag style
      pub_tag_array.forEach((c) => {
        if (c.dataset.filter == now_selected_filter) {
          addClass(c, "selected_pub_tag");
        } else {
          removeClass(c, "selected_pub_tag");
        }
      });
    }
}

function initEventListener() {
    console.log('publications init');

    tech_object_reverse = {};
    for (const [k, v] of Object.entries(tech_object)) {
      for (let i = 0; i < v.length; i += 1) {
        tech_object_reverse[v[i]] = k;
      }
    }

    const anchor_array = document.getElementsByClassName('show-message');

    for (let i = 0; i < anchor_array.length; i += 1) {
        anchor_array[i].addEventListener('click', function(e) {
            e.preventDefault();

            // console.log(e.target)
            let clicked_div = e.target;
            while (clicked_div.tagName != 'A') {
                clicked_div = clicked_div.parentElement;
            }
            let div = document.getElementById(`pub_popup_${clicked_div.dataset.id}`);
            // console.log(div);
            if (div.style.display == 'none') {
                div.style.display = 'block';
            }
            else {
                div.style.display = 'none';
            }
        });
    }

    const pub_div_array = document.querySelectorAll('.publication_div');
    const pub_tag_array = document.querySelectorAll('.publication_tag');
    const checkbox_array = document.querySelectorAll("input[type=checkbox]");
    const blog_filter_big_array = document.querySelectorAll(".blog-filter-big");
    const blog_filter_small_array = document.querySelectorAll(".blog-filter-small");

    for (let i = 0; i < checkbox_array.length; i += 1) {
      checkbox_array[i].addEventListener("change", () => {
        // main to sub check
        switch (checkbox_array[i].id) {
          case "ai":
          case "nlp":
          case "applied_ai":
            for (
              let j = 0;
              j < tech_object[checkbox_array[i].id].length;
              j += 1
            ) {
              const sub_checkbox = document.getElementById(
                tech_object[checkbox_array[i].id][j]
              );
              sub_checkbox.checked = checkbox_array[i].checked;
            }
            break;
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

    for (let i = 0; i < pub_tag_array.length; i += 1) {
        pub_tag_array[i].addEventListener('click', function(e) {
            e.preventDefault();

            refreshTagFilter(e.target.dataset.filter);
        });
    }
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
