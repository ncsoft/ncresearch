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
    padding: 0 0 3.75rem 0;
    margin-top: 1.875rem;
    /* max-width: 77.875rem; */
  }
  .post_img_nogap img {
    padding: 0 0 0rem 0;
    margin-top: 0rem;
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
  .llm_detail_nogap {
    color: var(--gray700) !important;
    margin: 0;
  }
  .llm_detail_ul {
    margin_top: 0;
    margin-left: 2rem;
    color: var(--gray700) !important;
  }
  .llm_detail_ol {
    margin-left: 1.625rem;
    color: var(--gray700) !important;
    list-style-position: inside;
    text-indent: -1em;
  }
  .llm_detail_ol li {
    list-style: none;
  }
  .llm_detail_ol li::before {
    content: "•";
    left: -0.8em;
    margin-right: 0.5em;
    font-size: 1.1em;
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
  .llm_blocktitle {
    background-color: #fbfbfc;
    border-radius: 0.625rem;
    height: 3.75rem;
    display: flex; 
    justify-content: space-between;
    align-items: center;
    padding: 0 1.5rem 0 1.5rem;
    border-left: none;
    margin: 3.75rem 0 1.875rem 0;
    color: var(--gray800);
  }
  .header_nogap {
    margin-top: 0rem !important;
  }
  .header_gap {
    margin-top: 3.75rem !important;
  }
  .benchmark_detail {
    color: var(--gray700);
    font-size: 18pt;
    font-weight: 600;
    margin-bottom: 1rem; !important;
  }
  .downloadline_color {
    color: var(--gray700);
  }
  .tag-list {
    display: none; !important;
  }
  article.main-container {
    padding: 200px 30px 150px 30px; !important;
  }
</style>
<script>
  window.onload = function() {
    setTimeout(window.scrollTo(0, window.scrollY), 1000);
  }
</script>


## Model Description

<h6 style="color: var(--gray700);">VARCO LLM 2.0은 텍스트 생성, 질의응답, 챗봇, 요약, 정보추출 등 다양한 자연어처리 기반 AI 서비스 개발에 적용할 수 있는 Large Language Model입니다.
NC는 VARCO LLM 2.0 개발을 위해 데이터 구축 및 사전학습(Pre-training), 미세조정(Instruction Tuning), 정렬조정(Alignment Tuning)까지 모두 자사의 기술로 개발되었습니다. 새로운 VARCO LLM 2.0은 다양한 NLP 태스크에서 성능을 측정한 결과, VARCO LLM 1.0 대비 성능이 크게 향상되었으며, 비슷한 규모의 한국어 LLM 모델 중 가장 높은 성능을 자랑합니다. 특히, 창의적인 글쓰기, 요약, 질의 응답, 챗봇, 번역 등 고수준의 자연어처리 응용 분야에서 활용될 수 있도록 학습되었고, 관련 정량 지표에서도 높은 성능을 보여줍니다.</h6>
<p style="margin: 0 0 1.5rem 0;"/>
<h6 style="color: var(--gray700);">이제 고객들은 AWS 플랫폼 내에서 자신만의 고유의 데이터를 가지고 SageMaker를 사용하여 커스터마이징 할 수 있습니다.</h6>
<h6 style="color: var(--gray700);">앞으로도 지속적인 모델 업데이트를 지원하고, 특정 작업에 맞게 조정된 LLM도 출시할 예정입니다.</h6>
<h6 style="color: var(--gray700);">추가 성능 개선이나 서비스 적용을 위한 협업 관련 문의는 이메일(<a class="post_a" href="mailto:varco_llm@ncsoft.com">varco_llm@ncsoft.com</a>)로 문의하시기 바랍니다.</h6>

<div class='llm_blocktitle'><div><h3 id='varco-llm-20' style='margin: 0;'>2024년 - VARCO LLM 2.0</h3></div></div>
- VARCO LLM 2.0은 실제 사용성 향상을 위해 생성 성능에 중점을 두고 모델을 개선하였습니다.
- VARCO LLM 1.0에 비해 더 많은 학습 데이터로 사전학습 및 Instruction Tuning을 진행하였으며, 자체 구축한 Human Feedback 데이터셋으로 Alignment Tuning을 수행하였습니다. 
- 이전 모델 대비 컨텍스트 길이가 2배 확장 되었습니다. (2k -> 4k)
{:.llm_detail_ol}

![]({{"/assets/img/renewal/varco_llm_2_0_overview.png"| relative_url}})
{:.post_img}

### VARCO LLM 2.0 Small
{:.header_nogap}

- VARCO LLM 2.0 Small은 빠르고 효율적인 고성능 소형 언어 모델입니다.
- 한국어, 영어에 능통하며, 중국어, 일본어 능력도 우수합니다.                             
- 4k 컨텍스트 길이를 지원합니다.
- Instruction 모델은 Multi-turn을 지원합니다.
{:.llm_detail_ol}

### VARCO LLM 2.0 Base
{:.header_gap}

- VARCO LLM 2.0 Base는 복잡한 NLP 태스크를 더욱 뛰어난 품질로 수행 가능한 중형 언어 모델입니다.
- 챗봇, 번역, QA 등 대부분의 NLP 태스크에서 뛰어난 성능을 보이는 고성능 언어 모델입니다.
- 한국어, 영어에 능통하며, 중국어, 일본어 능력도 우수합니다.
- 4k 컨텍스트 길이를 지원합니다.
- Instruction 모델은 Multi-turn을 지원합니다.
{:.llm_detail_ol}

### Training Datasets
{:.header_gap}

- 1.0 대비 약 4.5배 더 많은 학습 데이터로 사전 학습하였습니다.
- 1.0 대비 10배 더 많은 학습 데이터 구축 및 Instruction Tuning으로 다양한 태스크의 지시문을 잘 이해합니다.
- AI 윤리 등 자체 구축한 고품질 Alignment Dataset으로 Alignment Tuning으로 사용자들의 선호도를 반영하였습니다. 
{:.llm_detail_ol}

![]({{"/assets/img/renewal/training_datasets.png"| relative_url}})
{:.post_img}

### VARCO LLM 2.0 성능 평가 지표
{:.header_nogap}

NC에서는 LLM 한국어 생성 능력을 평가하기 위해 아래의 두 가지 벤치마크를 통해 VARCO LLM의 성능을 평가하였습니다.
{:.llm_detail_nogap}
1. MT-Bench (Link) : Multi-turn 대화를 통해 생성 능력 평가
- 코딩, 정보 추출, 인문, 수학, 추론, 역할극, STEM, 글쓰기 8가지 카테고리의 Multi-turn 프롬프트 80개로 구성
2. LogicKor 벤치마크 (Link): 한국어 언어모델에 대한 다양한 분야에서의 사고력 평가
- 추론, 수학, 글쓰기, 코딩, 이해, 국어 6가지 카테고리의 Multi-turn 프롬프트 42개로 구성
{:.llm_detail_ul}

(두 벤치마크 모두 해당 벤치마크 평가 페이지에서 제공하는 템플릿에 맞춰 평가하였으며, 평가 모델은 gpt-4-1106-preview로 진행)
{:.llm_detail_nogap}

### MT-Benchmark 결과
{:.header_gap}

MT-bench에서 VARCO LLM 2.0 Small Instruct 모델은 유사한 크기 중에서 가장 높은 성능이며, 일부 큰 모델들 보다도 좋은 성능을 보이고 있습니다. <br>
VARCO LLM 2.0 Base Instruct 모델 역시 유사한 크기의 모델들 중 가장 우수한 성능을 가지며, GPT-3.5 Turbo와 비교하여도 견줄만한 성능을 가지고 있습니다. <br>
{:.benchmark_detail}
(MT-bench 평가 로그 다운로드 : [VARCO LLM 2.0 Small Instruct v1.0](https://raw.githubusercontent.com/ncsoft/ncresearch/feature/VARCO_LLM_2_0/benchmark_logs/mt_bench_varco-llm-2.0-small-instruct.jsonl){:.post_a} , [VARCO LLM 2.0 Base Instruct v1.0](https://raw.githubusercontent.com/ncsoft/ncresearch/feature/VARCO_LLM_2_0/benchmark_logs/mt_bench_varco-llm-2.0-base-instruct.jsonl){:.post_a})
{:.downloadline_color}

![]({{"/assets/img/renewal/mt_benchmark_result.png"| relative_url}})
{:.post_img}

### LogicKor Benchmark 결과
{:.header_nogap}

LogicKor-Bench에서도 VARCO LLM은 동일 크기 모델 대비 최고 성능을 보이고 있으며, VARCO LLM 2.0 Base Instruct는 GPT-3.5-Turbo와 비교하여도 견줄만한 성능을 보이고 있습니다. Reasoning, Understanding 뿐 아니라 이메일, 광고 기획, 스토리 생성 등 Writing에 강합니다.
{:.benchmark_detail}
(LogicKor-bench 평가 로그 다운로드 : [VARCO LLM 2.0 Small Instruct v1.0](https://raw.githubusercontent.com/ncsoft/ncresearch/feature/VARCO_LLM_2_0/benchmark_logs/logickor_varco-llm-2.0-small-instruct.jsonl){:.post_a} , [VARCO LLM 2.0 Base Instruct v1.0](https://raw.githubusercontent.com/ncsoft/ncresearch/feature/VARCO_LLM_2_0/benchmark_logs/logickor_varco-llm-2.0-base-instruct.jsonl){:.post_a})
{:.downloadline_color}

![]({{"/assets/img/renewal/logickor_benchmark_result.png"| relative_url}})
{:.post_img}

![]({{"/assets/img/renewal/logickor_benchmark_detail.png"| relative_url}})
{:.post_img_nogap}

<!--

<div class='llm_blocktitle'><div><h4>2023년</h4></div></div>

![]({{"/assets/img/renewal/model_desc.png"| relative_url}})
{:.post_img}

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

-->