let now_selected_filter = '*';
let tech_object = {
  ai: ["speech", "vision", "graphics", "reinforcement_learning", "ai_system"],
  nlp: ["understanding", "dialogue", "translation", "search", "data"],
  applied_ai: ["curation", "anomaly_detection", "sequence_modeling", "xai"],
};
let tech_object_reverse;

function initEventListener() {
    console.log('publications init');
    // const anchor_array = document.getElementsByClassName('show-message');

    // for (let i = 0; i < anchor_array.length; i += 1) {
    //     anchor_array[i].addEventListener('click', function(e) {
    //         e.preventDefault();

    //         // console.log(e.target)
    //         let clicked_div = e.target;
    //         while (clicked_div.tagName != 'A') {
    //             clicked_div = clicked_div.parentElement;
    //         }
    //         let div = document.getElementById(`pub_popup_${clicked_div.dataset.id}`);
    //         // console.log(div);
    //         if (div.style.display == 'none') {
    //             div.style.display = 'block';
    //         }
    //         else {
    //             div.style.display = 'none';
    //         }
    //     });
    // }

    const pub_div_array = document.querySelectorAll('.publication_div');
    const pub_tag_array = document.querySelectorAll('.publication_tag');

    for (let i = 0; i < pub_tag_array.length; i += 1) {
        pub_tag_array[i].addEventListener('click', function(e) {
            e.preventDefault();

            if (now_selected_filter == e.target.dataset.filter) {
                now_selected_filter = '*';

                for (let j = 0; j < pub_div_array.length; j += 1) {
                    pub_div_array[j].style.display = '';
                }

                // reset tag style
                pub_tag_array.forEach(c => {
                    removeClass(c, 'selected_pub_tag');
                });
            }
            else {
                now_selected_filter = e.target.dataset.filter;

                for (let j = 0; j < pub_div_array.length; j += 1) {
                    if (hasClass(pub_div_array[j], now_selected_filter)) {
                        pub_div_array[j].style.display = '';
                    }
                    else {
                        pub_div_array[j].style.display = 'none';
                    }
                }

                // reset tag style
                pub_tag_array.forEach(c => {
                    if (c.dataset.filter == now_selected_filter) {
                        addClass(c, 'selected_pub_tag');
                    }
                    else {
                        removeClass(c, 'selected_pub_tag');
                    }
                });
            }
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
