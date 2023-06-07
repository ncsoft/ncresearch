---
layout: page
title : Publications
permalink: /publications/
h_color: var(--gray0)
subtitle: "NC Research의 연구 논문, 발표 자료"
feature-img: "assets/img/Topbg_pubs.png"
page-type: main_page
---

<script src="{{ site.baseurl | prepend: site.url }}/assets/js/publications.js"></script>

<div class="home">
    {% assign pubs = site.data.publications | sort: "year" %}
    {% for pub in pubs reversed %}
        <div class='publication_div {% if pub.tags.size > 0 %}{% for tag in pub.tags %}{{ tag }} {% endfor %}{% endif %}'>
            <a href='' class='show-message' data-id='{{ pub.id }}'>
                <h3 class='pub_title'>
                    {{ pub.title }}
                </h3>
                <ul>
                    <li class='publications_meta'>{{ pub.conf }}</li>
                    <li class='publications_meta'>{{ pub.authors }}</li>
                </ul>
                {% if pub.tags.size > 0 %}
                    {% for tag in pub.tags %}
                        <a class='publication_tag' href='' data-filter="{{ tag }}">{{ tag }}</a>
                    {% endfor %}
                {% endif %}
                <div>　</div>
            </a>
            <div class="modal-hide" id="pub_popup_{{ pub.id }}" style="display:none;">{{ pub.abstract }}</div>
        </div>
    {% endfor %}
</div>
