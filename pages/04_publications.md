---
layout: page
title : Publications
title2 : Publications
permalink: /publications/
h_color: var(--gray0)
subtitle: "NC Research가 발표한 논문들입니다."
page-type: main_page
---

<script src="{{ site.baseurl | prepend: site.url }}/assets/js/publications.js"></script>

<div class="home">
    <div class="blog-page">
        <div class="item-filter">
          <div class="item-filter-title">
            FILTERS
          </div>
          <div class="blog-filter-big">
            <input type="checkbox" id="ai" checked/><label for="ai"></label><span class="blog-filter-big-title">　AI</span><span id="ai_chevron" class="chevron"></span>
          </div>
          <div id="ai_subtech">
            <div class="blog-filter-small"><input type="checkbox" id="speech" checked/><label for="speech"></label><span class="blog-filter-small-title">　Speech</span></div>
            <div class="blog-filter-small"><input type="checkbox" id="vision" checked/><label for="vision"></label><span class="blog-filter-small-title">　Vision</span></div>
            <div class="blog-filter-small"><input type="checkbox" id="graphics" checked/><label for="graphics"></label><span class="blog-filter-small-title">　Graphics</span></div>
            <div class="blog-filter-small"><input type="checkbox" id="reinforcement_learning" checked/><label for="reinforcement_learning"></label><span class="blog-filter-small-title">　Reinforcement Learning</span></div>
            <div class="blog-filter-small"><input type="checkbox" id="ai_system" checked/><label for="ai_system"></label><span class="blog-filter-small-title">　AI System</span></div>
          </div>
          <div class="blog-filter-big">
            <input type="checkbox" id="nlp" checked/><label for="nlp"></label><span class="blog-filter-big-title">　NLP</span><span id="nlp_chevron" class="chevron"></span>
          </div>
          <div id="nlp_subtech">
            <div class="blog-filter-small"><input type="checkbox" id="understanding" checked/><label for="understanding"></label><span class="blog-filter-small-title">　Understanding</span></div>
            <div class="blog-filter-small"><input type="checkbox" id="dialogue" checked/><label for="dialogue"></label><span class="blog-filter-small-title">　Dialogue</span></div>
            <div class="blog-filter-small"><input type="checkbox" id="translation" checked/><label for="translation"></label><span class="blog-filter-small-title">　Translation</span></div>
            <div class="blog-filter-small"><input type="checkbox" id="search" checked/><label for="search"></label><span class="blog-filter-small-title">　Search</span></div>
            <div class="blog-filter-small"><input type="checkbox" id="data" checked/><label for="data"></label><span class="blog-filter-small-title">　Data</span></div>
          </div>
          <div class="blog-filter-big">
            <input type="checkbox" id="applied_ai" checked/><label for="applied_ai"></label><span class="blog-filter-big-title">　Applied AI</span><span id="applied_ai_chevron" class="chevron"></span>
          </div>
          <div id="applied_ai_subtech">
            <div class="blog-filter-small"><input type="checkbox" id="curation" checked/><label for="curation"></label><span class="blog-filter-small-title">　Curation</span></div>
            <div class="blog-filter-small"><input type="checkbox" id="anomaly_detection" checked/><label for="anomaly_detection"></label><span class="blog-filter-small-title">　Anomaly Detection</span></div>
            <div class="blog-filter-small"><input type="checkbox" id="sequence_modeling" checked/><label for="sequence_modeling"></label><span class="blog-filter-small-title">　Sequence Modeling</span></div>
            <div class="blog-filter-small"><input type="checkbox" id="xai" checked/><label for="xai"></label><span class="blog-filter-small-title">　XAI</span></div>
          </div>
        </div>
        <div class="publication-group">
            {% assign pubs = site.data.publications | sort: "year" %}
            {% for pub in pubs reversed %}
                <div class='publication_div {% if pub.tags.size > 0 %}{% for tag in pub.tags %}{{ tag }} {% endfor %}{% endif %}'>
                    <a href='' class='show-message' data-id='{{ pub.id }}'>
                        <h3 class='pub_title'>
                            {{ pub.title }}
                        </h3>
                        <div class='publications_meta'>{{ pub.conf }}</div>
                        <div class='publications_author'>{{ pub.authors }}</div>
                        <div class="publications_tag_list">
                        {% if pub.tags.size > 0 %}
                            {% for tag in pub.tags %}
                                <a class='publication_tag' href='' data-filter="{{ tag }}">{{ tag }}</a>
                            {% endfor %}
                        {% endif %}
                        </div>
                        <div>　</div>
                    </a>
                    <div class="modal-hide" id="pub_popup_{{ pub.id }}" style="display:none;">{{ pub.abstract }}</div>
                </div>
            {% endfor %}
        </div>
    </div>
</div>
