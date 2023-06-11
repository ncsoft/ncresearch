---
layout: page
title : Links
title2 : Links
permalink: /links/
subtitle: "NC Research 관련 사이트"
h_color: var(--black)
page-type: main_page
---

<div class="home">
    <div class="link_container">
        {% assign links = site.data.links %}
        {% for link in links %}
        <div class="link_div" onclick="window.open('{{ link.url }}', '_blank')">
            <div class='link_img'></div>
            <h3 class="link_title">
                <a href='javascript:void(0);'>{{ link.name }}</a>
            </h3>
            <h4 class="link_desc">
                {{ link.desc }}
            </h4>
        </div>
        {% endfor %}
    </div>
</div>
