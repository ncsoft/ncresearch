---
layout: page
title: VARCO LLM Details
title2: VARCO LLM 모델 상세 정보
permalink: /varco-llm-details/
subtitle: ""
page-type: main_page
hide: true
---

<style>
  .title-padder {
    padding-bottom: 0 !important;
  }
  h1 {
    padding-bottom: 2rem;
    margin: 0;
  }
  h1.main_page {
    padding: 0 !important;
  }
  h2#model-description {
    padding-top: 3.125rem;
  }
  h2#data-details {
    margin-top: 1.875rem;
    padding-top: 0;
    padding-bottom: 0;
  }
  h4.subtitle {
    display: none;
  }
  h2 {
    padding-top: 3rem;
    padding-bottom: 1.5rem;
    margin: 0;
    scroll-margin-top: 6rem;
    line-height: normal !important;
  }
  h3 {
    scroll-margin-top: 6rem;
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
    line-height: normal !important;
  }
  h3#instruction-tuning-datasets {
    margin-top: 0;
  }
  h2#model-details {
    padding-top: 0;
    padding-bottom: 0;
    margin-top: 1.875rem;
    margin-bottom: 1.875rem;
  }
  .post_img {
    margin-bottom: 0;
  }
  .data_detail_img {
    padding-bottom: 30px;
  }
  .data_detail_img img {
    padding-bottom: 0 !important;
  }
  .post_img img {
    padding: 0 0 5rem 0;
    margin-top: 1.875rem;
    /* max-width: 77.875rem; */
  }
  a.post_a {
    color: var(--gray600) !important;
    text-decoration: underline !important;
  }
  a.post_a:hover {
    color: var(--blue) !important;
    text-decoration: underline !important;
  }
  .llm_detail_ul {
    margin-bottom: 0;
    color: var(--gray700) !important;
  }
  .llm_detail_ol {
    margin-left: 2.5rem;
    color: var(--gray700) !important;
  }
  .llm-detail-footnote {
    margin: 0 0 50px;
    padding-left: 30px;
    list-style: none;
  }
  .llm-detail-footnote li {
    position: relative;
    padding-left: 20px;
    font-size: 14px;
    line-height: 190%;
  }
  .llm-detail-footnote li span {
    position: absolute;
    left: 0;
    top: 0;
  }
  .llm-detail-footnote .footnote-link {
    color: var(--gray700);
    font-size: 14px;
    line-height: 190%;
  }
</style>
<script>
  window.onload = function() {
    setTimeout(window.scrollTo(0, window.scrollY), 1000);
  }
</script>


## Model Description

<h6>VARCO LLM 은 NC의 거대 언어모델입니다.</h6>
<h6>Q&A, 챗봇, 요약, 정보 추출 등 다양한 NLP 기반 AI 서비스 개발에 활용될 수 있습니다.</h6>
<h6>공개된 사전학습 데이터와 자체 구축한 고품질 한국어 데이터로 학습된 VARCO LLM은,</h6>
<h6>현재까지 공개된 유사한 크기의 한국어 언어모델 대비 최고의 성능을 자랑하고 있습니다.(<a class="post_a" href="https://ncsoft.github.io/ncresearch/varco-llm-details/#model-details">성능 비교 평가</a>)</h6>
<h6>지속적으로 성능이 개선된 모델이 업데이트 될 예정이며, 다국어 및 개별 태스크에 특화된 모델들도 순차적으로 공개됩니다.</h6>
<h6>모델의 추가적인 성능 개선이나 튜닝, 서비스 적용을 위한 협업 문의는 메일(<a class="post_a" href="mailto:varco_llm@ncsoft.com">varco_llm@ncsoft.com</a>) 로 연락주십시오.</h6>

![]({{"/assets/img/renewal/model_desc.png"| relative_url}})
{:.post_img}

## Model Details


### VARCO LLM KO-13B-IST

- VARCO LLM 13B-IST 모델은 13B-FM 모델을 NC에서 자체 구축한 Instruction 데이터 셋으로 추가 학습한 모델입니다.  
- 13B-FM 모델의 기본적인 성능에 더하여 사용자의 지시를 따르도록 학습되었기 때문에 보다 유연하게 다양한 태스크에 활용될 수 있습니다.  
- 모델 성능은 [KOBEST 데이터 셋](https://huggingface.co/datasets/skt/kobest_v1){:.post_a}을 이용하여 4개의 벤치마크 테스트를 진행하였습니다.  
- VARCO LLM은 기존 공개된 비슷한 파라미터의 모델과 비교하여 가장 우수한 성능을 달성하였습니다.

![]({{"/assets/img/renewal/model_details6.png"| relative_url}})
{:.post_img}

### VARCO LLM KO-13B-FM

- VARCO LLM 13B 모델은 현재 시점에서 NC가 제공하는 가장 강력한 성능의 언어모델입니다.  
- VARCO LLM 1.3B, 6.4B 모델이 잘 수행할 수 있는 모든 NLP 태스크를 더욱 뛰어난 품질로 수행 가능합니다.  
- 13B-FM을 활용하면 수행 속도보다 품질이 더욱 중요한 AI 서비스를 합리적인 비용으로 제공할 수 있습니다.  
- 모델 성능은 [KOBEST 데이터 셋](https://huggingface.co/datasets/skt/kobest_v1){:.post_a}을 이용하여 4개의 벤치마크 테스트를 진행하였습니다.  
- VARCO LLM은 기존 공개된 비슷한 파라미터의 모델과 비교하여 가장 우수한 성능을 달성하였습니다.

![]({{"/assets/img/renewal/model_details5.png"| relative_url}})
{:.post_img}

### VARCO LLM KO-6.4B-IST

- VARCO LLM 6.4B-IST 모델은 6.4B-FM 모델을 NC에서 자체 구축한 Instruction 데이터 셋으로 추가 학습한 모델입니다.  
- 6.4B-FM 모델의 기본적인 성능에 더하여 사용자의 지시를 따르도록 학습되었기 때문에 보다 유연하게 다양한 태스크에 활용될 수 있습니다.  
- 모델 성능은 [KOBEST 데이터 셋](https://huggingface.co/datasets/skt/kobest_v1){:.post_a}을 이용하여 4개의 벤치마크 테스트를 진행하였습니다.  
- VARCO LLM은 기존 공개된 비슷한 파라미터의 모델과 비교하여 가장 우수한 성능을 달성하였습니다.

![]({{"/assets/img/renewal/model_details4.png"| relative_url}})
{:.post_img}

### VARCO LLM KO-6.4B-FM

- VARCO LLM 6.4B 모델은 대부분의 NLP 태스크에서 뛰어난 성능을 보이는 고성능 언어모델입니다.  
- Q&A, 문서 요약, 정보 추출, 챗봇 등 다양한 NLP 태스크에 적용 가능하며, 높은 성능이 요구되는 고품질 AI 서비스 개발에 적합합니다.  
- 모델 성능은 [KOBEST 데이터 셋](https://huggingface.co/datasets/skt/kobest_v1){:.post_a}을 이용하여 4개의 벤치마크 테스트를 진행하였습니다.  
- VARCO LLM은 기존 공개된 비슷한 파라미터의 모델과 비교하여 가장 우수한 성능을 달성하였습니다.

![]({{"/assets/img/renewal/model_details3.png"| relative_url}})
{:.post_img}

### VARCO LLM KO-1.3B-FM / IST

- VARCO LLM 1.3B 모델은 작지만 7B급 언어모델에 준하는 높은 성능을 보유하고 있는 경제적인 모델입니다.
- 특히, 텍스트의 감성/감정 분석이나 문서 분류와 같은 태스크에서 뛰어난 성능을 보이며, 간단한 일상 대화 챗봇 개발에도 활용 가능합니다.
- 모델 성능은 [KOBEST 데이터 셋](https://huggingface.co/datasets/skt/kobest_v1){:.post_a}을 이용하여 4개의 벤치마크 테스트를 진행하였습니다. 
- VARCO LLM 1.3B IST 모델은 1.3B FM 모델을 NC에서 자체 구축한 Instruction 데이터 셋으로 추가 학습한 모델입니다.
- 1.3B FM 모델의 기본적인 성능에 더하여 사용자의 지시를 따르도록 학습되었기 때문에 보다 유연하게 다양한 태스크에 활용될 수 있습니다.
- VARCO LLM은 기존 공개된 비슷한 크기의 모델과 비교하여 가장 우수한 성능을 달성하였습니다.

![]({{"/assets/img/renewal/model_details1.png"| relative_url}})
{:.post_img}

