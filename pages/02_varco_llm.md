---
layout: page
title: VARCO LLM
title2: 거대언어모델
permalink: /varco-llm/
subtitle: "VARCO (Via AI, Realize your Creativity and Originality) LLM"
page-type: main_page
---

<script src="{{ site.baseurl | prepend: site.url }}/assets/js/about_llm.js"></script>
<script>
  window.onload = function() {
    setTimeout(window.scrollTo(0, window.scrollY), 1000);
  }
</script>

<style>
  .title-padder {
    padding-bottom: 0 !important;
  }
  h1.main_page {
    padding: 0 !important;
  }
  h1 {
    padding-top: 6.875rem;
    padding-bottom: 1.875rem;
    margin: 0;
  }
  h4.subtitle {
    padding-bottom: 1.75rem;
    margin-bottom: 0;
  }
  h6 a {
    text-decoration: underline;
    color: var(--gray600);
  }
  a {
    color: var(--gray700) !important;
    text-decoration: none !important;
  }
  a:hover {
    color: var(--blue) !important;
    text-decoration: underline !important;
  }
  .llm_table p, ul {
    margin: 0;
    line-height: 1.5;
  }
  .llm_table ul {
    margin-left: 1.25rem !important;
  }
  .llm_table .gray_p {
    color: var(--gray300);
  }
  .llm_table td:first-child {
    width: 14rem;
  }
  .llm_desc img {
    padding-bottom: 2rem;
  }
  img {
    padding: 0;
  }
  .llm_blockquote {
    background-color: #fbfbfc;
    border-radius: 0.625rem;
    line-height: 1;
    padding: 1.5rem 2rem 2rem 2rem;
    border-left: none;
    margin: 2rem 0 0 0;
    color: var(--gray800);
  }
  .llm_blockquote ul {
    margin-left: 1.25rem;
  }
  .llm_blockquote h3 {
    margin: 0 !important;
  }
  .aws_button {
    float: right;
    border-radius: 0.375rem;
    border: 2px solid var(--blue);
    padding: 0.75rem 1rem;
    color: var(--blue) !important;
    font-size: 1.25rem;
    font-weight: 700;
    margin-top: -11rem;
  }
  .aws_button:hover {
    text-decoration: none !important;
    background-color: var(--blue) !important;
    color: white !important;
  }
  iframe {
    padding: 0;
  }
  .post_img {
    margin-bottom: 0;
  }
  .post_img img {
    padding: 0 0 0 0;
    /* margin-top: 1.875rem; */
    /* max-width: 77.875rem; */
  }
  a.blogs-link {
    margin-top: 0.75rem;
  }
  .llm_p {
    color: var(--gray600);
  }
</style>

<h6>AI를 통해 당신의 독창성을 실현하세요.</h6>
<h6>우리는 AI를 통해 인간이 창작의 본질, 일의 본질에 집중하고 발전시켜 나가기를 희망합니다.</h6>
<h6>단순한 작업, 반복적인 작업을 AI에게 맡기고 인간은 고유의 창의력, 다양성, 특이성을 실현해 가기를 바랍니다.</h6>
<h6>기업은 언어모델을 활용하여 워크플로우를 단순화하고, 자동화된 창작 프로세스를 만들 수 있으며,</h6>
<h6>그동안 풀지 못한 문제의 솔루션을 개발하고, 고객에게 새로운 소통과 경험을 줄 수 있습니다.</h6>
<h6>우리는 기업과 개인이 창작과 생산을 위해 고민하는 긴 과정에서 AI 가 인간의 든든한 동반자가 되어 주기를 바랍니다.</h6>

# 로드맵

![]({{"/assets/img/renewal/roadmap.png"| relative_url}})
{:.post_img}


<div class="llm-div">
  <span class="llm-title">모델 공개 리스트</span>
  <a class="blogs-link" href="https://ncsoft.github.io/ncresearch/varco-llm-details">자세히 보기</a>
</div>

<h6>VARCO LLM 은 NC의 거대 언어모델입니다.</h6>
<h6>Q&A, 챗봇, 요약, 정보 추출 등 다양한 NLP 기반 AI 서비스 개발에 활용될 수 있습니다.</h6>
<h6>공개된 사전학습 데이터와 자체 구축한 고품질 한국어 데이터로 학습된 VARCO LLM은, 현재까지 공개된 유사한 크기의 한국어 언어모델 대비 최고의 성능을 자랑하고 있습니다.</h6>
<h6>향후에도 지속적으로 성능이 개선된 모델이 업데이트될 예정이며, 다국어 및 개별 태스크에 특화된 모델들도 순차적으로 공개됩니다.</h6>
<h6>모델의 추가적인 성능 개선이나 튜닝, 서비스 적용을 위한 협업 문의는 메일(<a href="mailto:varco_llm@ncsoft.com">varco_llm@ncsoft.com</a>) 로 연락주십시오.</h6>

|공개 일정|모델명|
|**2023.08.16**|{::nomarkdown}<p><a href="https://ncsoft.github.io/ncresearch/varco-llm-details#varco-llm-ko-13b-ist"><b><u>VARCO LLM KO-13B-IST</u></b></a></p><ul><li>VARCO LLM 13B-IST 모델은 13B-FM 모델을 NC에서 자체 구축한 Instruction 데이터 셋으로 추가 학습한 모델입니다.</li><li>13B-FM 모델의 기본적인 성능에 더하여 사용자가 입력하는 프롬프트를 잘 수행하도록 학습되었기 때문에 보다 유연하게 다양한 태스크에 활용될 수 있습니다.</li><li>추론과 생성 능력에 집중하였습니다. 워크플로우의 자동화를 통해 생산성을 향상하고, One-stop 서비스형 챗봇, 개성이 묻어나는 챗봇 등을 제작하여 고객에게 새로운 경험을 제공하세요.</li></ul>{:/}|
|**2023.08.16**|{::nomarkdown}<p><a href="https://ncsoft.github.io/ncresearch/varco-llm-details#varco-llm-ko-13b-fm"><b><u>VARCO LLM KO-13B-FM</u></b></a></p><ul><li>VARCO LLM 13B 모델은 현재 시점에서 NC가 제공하는 가장 강력한 성능의 언어모델입니다.</li><li>VARCO LLM 1.3B, 6.4B 모델이 잘 수행할 수 있는 모든 NLP 태스크를 더욱 뛰어난 품질로 수행 가능합니다.</li><li>13B-FM을 활용하면 수행 속도보다 품질이 더욱 중요한 AI 서비스를 합리적인 비용으로 제공할 수 있습니다.</li></ul>{:/}|
|**2023.08.16**|{::nomarkdown}<p><a href="https://ncsoft.github.io/ncresearch/varco-llm-details#varco-llm-ko-64b-ist"><b><u>VARCO LLM KO-6.4B-IST</u></b></a></p><ul><li>VARCO LLM 6.4B-IST 모델은 6.4B-FM 모델을 NC에서 자체 구축한 Instruction 데이터 셋으로 추가 학습한 모델입니다.</li><li>6.4B-FM 모델의 기본적인 성능에 더하여 사용자가 입력하는 프롬프트를 잘 수행하도록 학습되었기 때문에 보다 유연하게 다양한 태스크에 활용될 수 있습니다.</li><li>추론과 생성 능력에 집중하였습니다. 워크플로우의 자동화를 통해 생산성을 향상하고, One-stop 서비스형 챗봇, 개성이 묻어나는 챗봇 등을 제작하여 고객에게 새로운 경험을 제공하세요.</li></ul>{:/}|
|**2023.08.16**|{::nomarkdown}<p><a href="https://ncsoft.github.io/ncresearch/varco-llm-details#varco-llm-ko-64b-fm"><b><u>VARCO LLM KO-6.4B-FM</u></b></a></p><ul><li>VARCO LLM 6.4B 모델은 대부분의 NLP 태스크에서 뛰어난 성능을 보이는 고성능 언어모델입니다.</li><li>Q&A, 문서 요약, 정보 추출, 챗봇 등 다양한 NLP 태스크에 적용 가능하며, 높은 성능이 요구되는 고품질 AI 서비스 개발에 적합합니다.</li></ul>{:/}|
|**2023.08.16**|{::nomarkdown}<p><a href="https://ncsoft.github.io/ncresearch/varco-llm-details#varco-llm-ko-13b-fm--ist"><b><u>VARCO LLM KO-1.3B-IST</u></b></a></p><ul><li>VARCO LLM 1.3B-IST 모델은 1.3B-FM 모델을 NC에서 자체 구축한 Instruction 데이터 셋으로 추가 학습한 모델입니다.</li><li>1.3B-FM 모델의 기본적인 성능에 더하여 사용자가 입력하는 프롬프트를 잘 수행하도록 학습되었기 때문에 보다 유연하게 다양한 태스크에 활용될 수 있습니다.</li><li>기존의 NLP 분석 엔진을 쉽게 대체할 수 있습니다. 빅데이터 분석 엔진 등에서 경제적으로 NLP의 어려운 문제를 해결하세요.</li></ul>{:/}|
|**2023.08.16**|{::nomarkdown}<p><a href="https://ncsoft.github.io/ncresearch/varco-llm-details#varco-llm-ko-13b-fm--ist"><b><u>VARCO LLM KO-1.3B-FM</u></b></a></p><ul><li>VARCO LLM 1.3B 모델은 작지만 7B급 언어모델에 준하는 높은 성능을 보유하고 있는 경제적인 모델입니다.</li><li>특히, 텍스트의 감성/감정 분석이나 문서 분류와 같은 태스크에서 뛰어난 성능을 보이며, 간단한 일상 대화 챗봇 개발에도 활용 가능합니다.</li></ul>{:/}|
|**2023.08.29**|{::nomarkdown}<p><b>VARCO LLM KO/EN-6.4B-IST</b></p><ul><li>VARCO LLM KO/EN-6.4B-IST 모델은 NC에서 자체 구축한 한국어/영어 사전 학습 데이터 및 Instruction 데이터 셋으로 학습한 이중 언어 모델입니다.</li><li>VARCO LLM KO-6.4B-IST 이상의 한국어/영어 텍스트 생성 능력을 갖추고 있으며, 하나의 모델로 한국과 영어권 국가에 대응하는 글로벌 서비스 개발이 가능합니다.</li><li>한국어 IST 모델 대비 10배 이상 많은 Instruction 데이터 셋으로 학습되어 훨씬 더 다양한 형태의 사용자 프롬프트에 효과적으로 대응할 수 있습니다.</li></ul>{:/}|
|**2023.08.29**|{::nomarkdown}<p><b>VARCO LLM KO/EN-13B-IST</b></p><ul><li>VARCO LLM KO/EN-13B-IST 모델은 NC에서 자체 구축한 한국어/영어 사전 학습 데이터 및 Instruction 데이터 셋으로 학습한 이중 언어 모델입니다.</li><li>VARCO LLM KO-13B-IST 이상의 한국어/영어 텍스트 생성 능력을 갖추고 있으며, 하나의 모델로 한국과 영어권 국가에 대응하는 글로벌 서비스 개발이 가능합니다.</li><li>한국어 IST 모델 대비 10배 이상 많은 Instruction 데이터 셋으로 학습되어 훨씬 더 다양한 형태의 사용자 프롬프트에 효과적으로 대응할 수 있습니다.</li></ul>{:/}|
|{::nomarkdown}<p class="gray_p"><b>2023.09 공개 예정</b></p>{:/}|{::nomarkdown}<p class="gray_p"><b>VARCO LLM 6.4B-PERSONA</b></p><p class="gray_p">페르소나/감정/의도를 주입하여 대화 흐름을 제어할 수 있는 고품질 챗봇 서비스용 언어모델입니다.</p>{:/}|
|{::nomarkdown}<p class="gray_p"><b>2023.09 공개 예정</b></p>{:/}|{::nomarkdown}<p class="gray_p"><b>VARCO LLM 13B-NARRATIVE</b></p><p class="gray_p">사용자와의 상호작용을 통해 다양한 형태의 내러티브나 게임 퀘스트 생성을 지원하는 모델입니다.</p>{:/}|
|{::nomarkdown}<p class="gray_p"><b>2023.11 공개 예정</b></p>{:/}|{::nomarkdown}<p class="gray_p"><b>VARCO LLM 52B-IST</b></p><p class="gray_p">성능이 절대적으로 중요한 태스크나 중/소 규모 언어모델 학습용 데이터 생성에 활용 가능한 모델입니다.</p>{:/}|
|{::nomarkdown}<p class="gray_p"><b>2024.03 공개 예정</b></p>{:/}|{::nomarkdown}<p class="gray_p"><b>VARCO LLM 100B-MULTI</b></p><p class="gray_p">텍스트와 함께 그림이나 사진을 하나의 맥락으로써 이해하고 응답할 수 있는 초거대 언어모델입니다.</p>{:/}|
{:.llm_table}

> ### NC 자체 서비스
> - NC 자체 인프라를 활용하여 서비스 합니다. (ex 공공, 뉴스 분야 등)  
> - 서비스 문의 : [varco_llm@ncsoft.com](mailto:varco_llm@ncsoft.com)
{:.llm_blockquote}

<blockquote class="llm_blockquote">
  <h3 id="aws-클라우드-서비스">AWS 클라우드 서비스</h3>
  <ul>
    <li>AWS SageMaker 인프라를 활용하여 서비스합니다. (ex 프라이빗 인프라 &amp;  글로벌 서비스 제공)</li>
    <li>VARCO LLM은 사용자가 직접 보안이 유지된 자신만의 환경에서 안전하게 도메인 데이터로 커스터마이징하여<br/>구동할 수 있도록 AWS Private Cloud에서 제공할 계획입니다. </li>
    <li>고객은 인프라를 준비할 필요도 없고, 보안을 걱정할 필요도 없이, 글로벌 어느 지역에서나 구독을 통해 즉시 사용하고,<br/>이를 활용하여 글로벌하게 자신만의 서비스를 개시할 수 있습니다.</li>
  </ul>
  <a class="aws_button" href="https://aws.amazon.com/marketplace/seller-profile?id=seller-tkuvdeznmi2w4">AWS SageMaker로 이동</a>
</blockquote>


# VARCO Studio 영상

<h6>VARCO Studio는 거대 언어모델을 활용하여, 생성 AI를 보다 쉽게 활용하기 위한 저작 도구입니다.</h6>
<h6>VARCO Studio는 VARCO Text, VARCO Art, VARCO Human으로 구성됩니다.</h6>
<h6>현재는 게임 콘텐츠 개발을 위한 도구로 사용 중이며, 향후 일반인들도 사용할 수 있도록 오픈할 계획입니다.</h6>

<iframe width="100%" style="height:calc(100vw * 0.56);max-height:600px;" src="https://www.youtube.com/embed/iSOBXZdu8Tc?si=HVvK3y-fqt8dzZl0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
{:.center_div}


# 파트너

<h6>NC는 게임 콘텐츠 외에도 교육, 금융, 바이오 등의 분야에서 유망한 파트너들과 AI 기술력과 전문지식을 결합하여 고객의 Pain point를 해결하고,</h6>
<h6>새로운 성장모멘텀을 함께 만들어 가고 있습니다.</h6>
<h6>VARCO LLM은 언어모델의 모든 단계를 도메인에 맞게 조율할 수 있으며, 고객의 서비스에 따라 커스터마이징을 진행합니다.</h6>
<h6>고객은 NC와 협력하여 기술과 데이터 변화에 지속적, 능동적으로 대처할 수 있습니다.</h6>

> ## 차량 플랫폼
> 
>실시간 정보들과 빅데이터가 연결된 VARCO LLM은 운전자에게 꼭 맞는 정보와 인터페이스를 차내 인포테이먼트 시스템을 통하여 전달해줄 수 있습니다.
>
> ![]({{"/assets/img/renewal/partner_car.png"| relative_url}})
{:.llm_desc}

> ## 교육
> 
>VARCO LLM은 단순히 문제에 대한 답을 제공하기 보다는 학생으로 하여금 사고력을 강화시킬 수 있는 방향으로 풀이를 유도할 수 있습니다.  
>또한 개념에 대한 대화를 통하여 이해력을 도와 학습을 향상시키는 데 도움을 줄 수 있습니다.  
>VARCO LLM는 학생이 어려움을 느끼고 있는 과목이나 공부에 대한 이슈에 대한 상담을 통해서 코칭을 제안할 수 있습니다.  
>
> ![]({{"/assets/img/renewal/partner_edu.png"| relative_url}})
{:.llm_desc}


> ## 로봇
> 
>VARCO LLM이 탑재된 로봇은 사용자와의 대화를 통하여 보다 일상 생활에 필요한 안내와 보조 역할을 해줌으로써 편안한 생활이 되도록 도와 줄 수 있습니다.  
>혼자 사는 사람들이나 실버 세대들은 로봇과 자신들의 건강이나 정서에 대해 이야기 나눌 수 있고, 위급 상황에 대응할 수 있습니다.  
>
> ![]({{"/assets/img/renewal/partner_robot.png"| relative_url}})
{:.llm_desc}

> ## 금융
> 
>과거 및 산업 전반에 일어나고 있는 데이터들을 활용하여 VARCO LLM은 사용자로 하여금 위험을 감지하여 올바른 투자판단을 할 수 있도록 돕고,  
>원활한 주식 트레이딩 및 각각 고객의 니즈에 맞는 금융 정보를 제공할 수 있습니다.  
>
> ![]({{"/assets/img/renewal/partner_finance.png"| relative_url}})
{:.llm_desc}

> ## 바이오
> 
>VARCO LLM 은 생물학과 화학을 해독하여 삶을 근본적으로 개선하는 신약 개발의 가능성을 돕고자 합니다.  
>바이오 빅데이터와 Bio Entity간의 관계 및 작용 메커니즘을 학습하여 약물 발견 프로세스를 가속화 합니다.  
>
> ![]({{"/assets/img/renewal/partner_bio.png"| relative_url}})
{:.llm_desc}


> ## 공공
> 
>VARCO LLM을 통해 날씨와 뉴스 등 여러 공공 데이터들을 활용하여 실시간 공공정보를 생성하고 취합된 데이터들을 기반으로 분석 레포트를 자동 생성합니다.  
>또한 이 중에서 중요한 이슈들에 대해 보도자료를 자동 생성할 수 있습니다.  
>
> ![]({{"/assets/img/renewal/partner_public.png"| relative_url}})
{:.llm_desc}


# 언어모델 학습 데이터 연구 참여 기관

<p class="llm_p">부산외국어대학교 류법모 교수 연구실<br>
상명대학교 게임전공 박소영 교수 연구실<br>
서울대학교 국어국문학과 박진호 교수 연구실<br>
연세대학교 언어정보학 협동과정 김한샘 교수 연구실<br>
전북대학교 문헌정보학과 오효정 교수 지능정보융합연구실<br>
제주대학교 인공지능학과 윤여찬 교수 연구실<br>
한국외국어대학교 디지털언어지식콘텐츠연구센터 (DICORA) 남지순 교수 연구실<br>
홍익대학교 게임학부 강신진 교수 연구실</p>

<p class="llm_p">VARCO LLM의 한국어 학습 데이터 구축을 위해 연구에 참여해주신 많은 분들께 감사드립니다.</p>
