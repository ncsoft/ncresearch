---
layout: post
title: "VARCO-MLLM 한국어 잘하는 멀티모달 모델"
icon: paper
author: 3bcb5e490a059a94e8ca43ef4b085329e113dd0b
permalink: 8406a783d8dea98e70cbccaa329e505931d8f378
categories: Vision
tags: [MLLM, LVLM, VLM, LMM, Multimodal, VARCO-MLLM, 멀티모달]
excerpt: "MLLM의 기본 개념을 설명하고, VARCO-MLLM을 소개합니다."
back_color: "#ffffff"
img_name: "썸네일.PNG"
toc: true
show: true
new: false
series: -1
index: 55
---

- 
{:toc}

<br/>
> **작성자**
> 
> * 김영준(멀티모달 AI Lab)
> - 다양한 모달리티를 이해하고 생성하는 MLLM을 연구하고 있습니다.
> 
> **이런 분이 읽으면 좋습니다!**
> 
> - VARCO-MLLM에 관심이 있으신 분
> - MLLM이 어떻게 이미지를 이해할 수 있는지 궁금하신 분
> 
> **이 글로 알 수 있는 내용**
> 
> - VARCO-MLLM 주요 특징
> - MLLM 학습 단계 및 좋은 MLLM을 만들기 위해서 고려해야 하는 것

<br>


# 들어가며
빌 게이츠와 샘 알트먼이 지난 1월 팟캐스트에서 만났습니다. 대화 중 빌 게이츠가 향후 2년간 가장 중요한 마일스톤(Milestone)이 무엇인지 묻자, 샘 알트먼은 가장 먼저 멀티모달을 언급했습니다. 이는 다양한 모달리티를 이해하고 생성할 수 있는 멀티모달 기술의 중요성을 시사하는 장면이었습니다. 그로부터 얼마 후, 샘 알트먼은 트위터에 'Her’라는 글과 함께 GPT-4o를 공개했습니다. GPT-4o는 영화 'Her'에 등장하는 AI처럼 시각, 청각, 언어를 모두 다루는 멀티모달 모델입니다. SF 영화에서나 볼 법한 기술이 현실이 된 것입니다.

이런 흐름 속에서 인공지능 업계는 빠르게 멀티모달 시대로 접어들고 있습니다. 특히 대규모 언어 모델(LLM, Large Language Model)을 기반으로, 텍스트뿐만 아니라 이미지, 영상, 음성 등 다양한 형태의 데이터를 처리할 수 있는 멀티모달 대규모 언어 모델(MLLM, Multimodal Large Language Model)에 대한 연구가 활발히 진행되고 있습니다. 아래 그림은 2022년부터 학계와 산업계에서 출시한 다양한 MLLM을 보여주고 있습니다. 시간이 지날수록 더 많은 MLLM이 등장하고 있다는 것을 한눈에 알 수 있습니다.

본 블로그에서는 제가 리더를 맡고 있는 **멀티모달생성팀**에서 개발중인 MLLM에 대해서 간단히 소개하고자 합니다. 저희 팀은 다양한 모달리티를 이해 및 생성하는 MLLM을 만드는 것을 목표로 매일 최선을 다하고 있습니다. 향후에 다양한 채널을 통해서 모델에 대한 구체적인 이야기를 공개할 예정이니 많은 관심 바랍니다. 이곳에서는 여러 MLLM 중에서 텍스트와 이미지를 입력으로 받고 텍스트를 출력하는 모델을 중심으로 설명하겠습니다. 글의 순서는 MLLM 학습 단계와 좋은 MLLM을 만들기 위한 방법을 설명해 드리고, 이후에 저희 팀이 개발 중인 VARCO-MLLM의 주요 특징에 대해서 공유드리겠습니다.

![]({{"/assets/img/post/8406a783d8dea98e70cbccaa329e505931d8f378/그림1.png"| relative_url}})
{:.center_div}
*그림 1. 주요 MLLM 타임라인 [^1]*
{:.center_div}

<br>
<br>

# MLLM 학습 단계
MLLM의 학습 과정은 크게 사전 학습 단계(Pre-training)와 미세 조정 단계(Fine-tuning)로 구분됩니다. 아래 그림은 **학습 단계별 모델의 구조**를 표현한 것입니다. 모델의 구조를 간략히 설명드리면 먼저 이미지를 입력으로 받는 사전 학습된 이미지 인코더가 있습니다. 프로젝터는 이미지 인코더에서 출력된 벡터를 텍스트 디코더가 입력으로 받을 수 있는 차원으로 변환해 주는 역할을 합니다. 텍스트 디코더는 사전 학습된 LLM을 의미합니다. 그리고 텍스트는 LLM의 임베딩 계층을 통해서 벡터로 변환됩니다. 아래 그림에서 붉은색은 Not frozen을 의미하며 모델의 Weight를 학습 가능한 상태로 설정했다는 이야기입니다. 반대로 녹색은 Frozen을 의미하며 모델의 Weight를 학습 불가능한 상태로 두었다는 뜻입니다. 이제 각 단계를 살펴보겠습니다.

![]({{"/assets/img/post/8406a783d8dea98e70cbccaa329e505931d8f378/그림2.png"| relative_url}})
{:.center_div}
*그림 2. MLLM 학습 단계 [^2]*
{:.center_div}

<br>

먼저 **사전 학습 단계**에서는 이미지-텍스트 입력(질문)을 바탕으로 텍스트 출력(캡션)을 생성합니다. 이 단계에서 주목할 점은 이미지 인코더와 텍스트 디코더가 Frozen 상태, 즉 학습되지 않고, 프로젝터만 학습된다는 것입니다. 한편 MLLM 학습 방법론은 아직 표준이 정립되지 않았습니다. 따라서 일부 학습 방법론에서는 사전 학습 때 입력 텍스트 없이 이미지만 입력하고 캡션을 출력하기도 합니다.

**미세 조정 단계**에서 텍스트 입력은 지시 사항이 들어가도록 하고, 텍스트 출력은 그에 맞는 답변이 생성되도록 합니다. 이전 단계와 다른 모델 구조별 학습 가능 여부는 텍스트 디코더를 Not frozen으로 설정한다는 점입니다. 학습 방법론에 따라서 이미지 인코더도 Not frozen 상태로 두어 모든 파라미터를 학습 가능한 상태로 두기도 합니다. 이 외에도 다양한 방법론이 있으며 최근 들어 더욱 빠르게 발전하고 있습니다.

이처럼 사전 학습과 미세 조정이라는 두 단계를 거치면서, MLLM은 이미지를 이해하고 관련된 질문에 답할 수 있는 능력을 갖추게 됩니다. 이러한 MLLM 기술은 인간이 시각적 정보와 언어를 통합하여 처리하는 방식과 유사합니다. 이는 인간-AI 상호작용의 새로운 장을 열어, 다양한 산업 분야에 변화를 불러올 것입니다.

<br>
<br>

# 좋은 MLLM 만드는 세 가지 방법: Data, Grounding, Alignment
앞서 MLLM이 어떻게 학습되는지 알아보았습니다. 이제부터는 어떻게 하면 좋은 MLLM을 만들 수 있는지 이야기해 보겠습니다. 좋은 MLLM을 만들기 위해서는 다양한 요소를 세심하게 고려해야 합니다. 예를 들어 사전학습 된 여러 이미지 인코더와 FM(Foundation-Model) 모델 중 어떤 것을 선택할지부터 많은 실험이 필요합니다. 본 장에서는 “*An Introduction to Vision-Language Modeling* [^3]”의 내용과 저희의 경험을 토대로 좋은 MLLM 만드는 방법을 크게 Data, Grounding, Alignment 세 가지 측면에서 간추려서 설명하겠습니다.

첫째로, ***Data***는 MLLM의 성능을 좌우하는 중요한 요소입니다. '좋은 데이터'란 무엇일까요? 바로 균형, 다양성, 품질을 갖춘 데이터를 말합니다. 균형이란 데이터셋 내 각 범주가 적절한 비율로 포함된 것을 의미합니다. 다양성은 데이터셋에 서로 다른 범주를 얼마나 많이 포함하고 있는지를 나타냅니다. 품질은 이미지에 대응하는 텍스트에 정확하고 풍부한 정보가 있는 것을 말합니다. 예를 들어, 동물 이미지 데이터셋에 개, 고양이, 새, 물고기 등 다양한 종류의 동물이 골고루 포함되어 있다면 이는 균형과 다양성이 높은 데이터셋이라고 할 수 있습니다.

아래 그림을 보면 고품질 데이터셋을 만들기 위한 여러 가지 방법들을 확인할 수 있습니다. 먼저 중복된 이미지를 제거하는 방법(*Remove duplicate*)이 있습니다. 그다음 다양한 이미지가 골고루 구성 되도록 하고(*Balancing*), 이미지에 알맞지 않은 캡션이 있다면 이를 제거(*Pruning*)하기도 합니다. 또한 단답형보다는 완성된 문장 형태로 풍부한 표현을 넣어 데이터의 품질(*Improving*)을 높일 수도 있습니다.

그림에는 없지만 특별히 강조하고 싶은 것은 앞서 언급한 데이터의 다양성입니다. 다양성은 모델의 제로샷 학습 능력을 크게 향상하기 때문입니다. 이는 MLLM이 새로운 상황에 잘 적응하고 폭넓게 활용될 수 있게 하는 핵심 요소입니다. 이렇게 균형, 다양성, 품질을 모두 갖춘 데이터셋으로 학습한 MLLM은 다양한 시나리오에서 효과적으로 대응할 것입니다.

![]({{"/assets/img/post/8406a783d8dea98e70cbccaa329e505931d8f378/그림3.png"| relative_url}})
{:.center_div}
*그림 3. 고품질 Data를 만들기 위해 고려해야 할 것 [^3]*
{:.center_div}

<br>

두 번째는 ***Grounding***입니다. Grounding이란 MLLM이 텍스트와 이미지 사이의 관계를 정확히 이해하고 연결하는 능력을 말합니다. 즉 Grounding 능력이 우수한 MLLM은 이미지 내 특정 영역을 정확히 식별하고 설명할 수 있습니다. 이 능력을 잘 함양하기 위해서는 학습 과정에서 텍스트와 이미지 사이의 관계를 연관 지어 이해할 수 있도록 해야 합니다.

Grounding 능력이 우수한 모델의 예를 들어보겠습니다. 아래 그림에서 MLLM은 빨간색 박스로 표시된 영역을 "수영하는 골든 리트리버”라고 정확히 식별하였습니다. 또한 주황색 박스로 표시된 부분을 "수영장의 테니스 공"이라고 올바르게 설명하였습니다. 이는 모델이 이미지의 특정 부분과 관련 텍스트를 정확하게 연관 짓는 능력을 보여줍니다. 이를 통해 모델이 단순히 이미지 내 객체를 인식하는 것을 넘어, 객체의 행동, 객체 간의 공간적 관계, 그리고 전체적인 장면의 맥락을 종합적으로 이해하고 설명할 수 있음을 알 수 있습니다.

이러한 Grounding 능력 덕분에 MLLM은 실제 세계의 복잡한 상황을 더욱 정확히 이해하고 대응할 수 있습니다. 이는 일상적인 언어로 표현된 복잡한 요청을 시각적 인지 능력과 결합하여 처리함으로써, 다양한 산업 분야의 문제 해결에 기여할 수 있을 것입니다.

![]({{"/assets/img/post/8406a783d8dea98e70cbccaa329e505931d8f378/그림4.png"| relative_url}})
{:.center_div}
*그림 4. MLLM에게 필요한 Grounding 능력 예시 [^3]*
{:.center_div}

<br>

세 번째는 ***Alignment***입니다. Alignment란 MLLM의 출력을 인간의 의도와 선호도에 맞추는 과정을 말합니다. Alignment는 MLLM이 단순히 정보를 제공하는 것을 넘어, 인간과 자연스럽게 대화할 수 있게 만드는 중요한 요소입니다. 잘 정렬된 MLLM은 사용자의 질문이나 지시를 더 정확하게 이해하고, 상황에 맞는 적절한 응답을 할 수 있습니다.

그림의 예시를 살펴보겠습니다. Alignment가 잘 조정된 모델은 "이미지에 제시된 내용을 설명하세요"라는 지시에 "이것은 웃고 있는 개의 사진입니다"라고 자연스럽게 응답합니다. 반면, Alignment 능력이 부족한 모델은 "안녕하세요, 저는 로봇입니다. 이것은 개의 사진입니다"와 같이 어색하고 기계적인 답변을 할 수 있습니다.

Alignment는 단순히 자연스러운 대화를 위한 것만은 아닙니다. 잘 정렬된 모델은 윤리적 문제나 안전성 문제에 대해서도 신중하게 대응할 수 있습니다. 또, 부적절한 요청에 대해서는 예의 바르게 거절할 수도 있습니다. Alignment 능력이 높아질수록 MLLM은 더욱 신뢰할 수 있고 사용자 친화적인 도구가 됩니다. 이는 MLLM이 일상 대화부터 전문적인 작업까지 다양한 분야에서 폭넓게 활용될 수 있도록 만들어줄 것입니다.

![]({{"/assets/img/post/8406a783d8dea98e70cbccaa329e505931d8f378/그림5.png"| relative_url}})
{:.center_div}
*그림 5. Alignment 예시 [^3]*
{:.center_div}

<br>
<br>

# VARCO-MLLM 주요 특징
지금까지 MLLM의 학습 단계와 좋은 MLLM을 만들기 위한 기본적인 방법에 대해서 살펴보았습니다. 그럼, 지금부터는 저희 팀이 개발 중인 VARCO-MLLM의 주요 특징을 소개하겠습니다. 본 블로그에서는 모델의 여러 가지 특징 중 세 가지만 간략하게 이야기를 드리고자 합니다.

<br>

## 1) 이미지에 있는 문자를 읽고 알맞은 응답을 할 수 있을까?
VARCO-MLLM은 이미지에 포함된 문자를 읽고 알맞은 응답을 할 수 있습니다. 특히 영어, 숫자뿐만 아니라 한글도 이해할 수 있습니다. 이 기능은 한국어가 있는 이미지 기반의 질의응답 시스템 등 다양한 태스크에서 유용하게 활용될 수 있습니다. 아래 그림을 살펴보겠습니다. 주어진 이미지에는 다양한 역 이름이 있고, 사용자는 “지금 무슨 역이야?”라고 물었습니다. 질문을 받은 VARCO-MLLM은 ‘신사’, ‘강남’, ‘판교, ‘성남’ 중에서 현재 역이 판교라고 정확하게 답하였습니다. 그뿐만 아니라 모델에 내재된 지식(Knowledge)을 활용하여 판교역은 IT 산업의 중심지이며 많은 직장인이 있다는 것도 알려주고 있습니다. 이처럼 VARCO-MLLM은 이미지에 있는 문자를 읽고, 사용자의 질의에 알맞은 응답을 할 수 있습니다. 또, 단순히 문자를 읽는 것이 아니라 모델에 내재되어 있는 지식과 상식을 기반으로 더욱 풍부한 정보를 사용자에게 제공할 수 있습니다.

![]({{"/assets/img/post/8406a783d8dea98e70cbccaa329e505931d8f378/그림6.PNG"| relative_url}})
{:.center_div}
*그림 6. 이미지에 있는 문자를 이해하고, 사용자의 질의에 알맞은 응답을 하는 VARCO-MLLM*
{:.center_div}

<br>

## 2) 이미지에 있는 객체의 위치를 찾을 수 있을까?
VARCO-MLLM은 이미지 내 객체의 위치를 식별하는 능력을 갖추고 있습니다. 이 능력 덕분에 이미지에 있는 객체들의 BBOX 좌표값을 알 수 있습니다. 아래 그림을 살펴보겠습니다. 주어진 이미지에는 노란색 차 뒤에서 한 사람이 다림질하고 있습니다. 사용자는 “이미지를 설명해줘”라고 물었습니다. VARCO-MLLM의 답변을 보면 모델에 내재된 상식(Common Sense)을 기반으로 이 이미지가 특이한 광경인 것을 인지하고 있다는 것을 알 수 있습니다. 그뿐만 아니라 응답에 있는 노란색 밴, 남성, 셔츠의 BBOX 좌표값도 함께 생성하였습니다. 아래 그림은 깔끔한 표기를 위해 응답에 생성된 BBOX 좌표값은 이미지에 그려 넣었고, 텍스트 답변에서는 제외하였습니다. 이러한 VARCO-MLLM의 능력은 객체 탐지 등 다양한 컴퓨터 비전 태스크에 활용될 수 있습니다.

![]({{"/assets/img/post/8406a783d8dea98e70cbccaa329e505931d8f378/그림7.PNG"| relative_url}})
{:.center_div}
*그림 7. 사용자의 질의에 알맞은 응답과 함께 이미지에 있는 객체들의 BBOX 좌표값도 생성하는 모습*
{:.center_div}

<br>

## 3) 이미지 없이 텍스트만 입력해도 괜찮을까?
VARCO-MLLM은 텍스트-이미지의 멀티모달 입력 뿐만 아니라 텍스트 또는 이미지의 단일 모달리티 입력도 처리할 수 있습니다. 이러한 모달리티 유연성은 하나의 모델로 다양한 시나리오에 대응할 수 있게 합니다. 아래 그림에서 사용자는 이미지 없이 텍스트만 입력하였고, 모델의 지식 통합 능력과 추론 능력을 보여줄 수 있는 시간 여행에 대한 질문을 하였습니다. 첫 번째 답변은 역사와 과학 지식을 연결하여 시간 여행의 영향을 다각도로 추론하고, 윤리적 고려사항도 언급하며 균형 잡힌 응답을 제시하였습니다. 두 번째 질의응답에서는 모델의 멀티턴 처리 능력이 드러나며, 이전 맥락을 참고하여 시간 여행에 대한 적절한 답변을 제공하고 있는 것을 확인할 수 있습니다. 또 시간 여행의 윤리적 문제, 사회적 불평등, 역사적 인물과의 상호작용 등 세 가지 주요 문제점을 체계적으로 제시하고, 각 문제의 구체적인 시나리오를 논리적으로 전개하고 있습니다. 이는 모델이 과학기술 발전의 사회적 영향을 이해하고 심도 있는 추론을 할 수 있음을 보여줍니다. 참고로 모델에 텍스트 없이 이미지만 입력하면 캡션이 출력됩니다.

![]({{"/assets/img/post/8406a783d8dea98e70cbccaa329e505931d8f378/그림8.PNG"| relative_url}})
{:.center_div}
*그림 8. 높은 추론능력으로 체계적으로 응답하는 VARCO-MLLM*
{:.center_div}

<br>
<br>

# 마치며
지금까지 우리는 MLLM의 학습 단계, 좋은 MLLM 만드는 방법, 그리고 VARCO-MLLM의 주요 특징들을 살펴보았습니다. VARCO-MLLM은 이미지 내 텍스트 인식부터 복잡한 추론에 이르기까지 다양한 시각-언어 과제를 수행할 수 있어, 실생활의 여러 문제 해결에 큰 도움이 될 것입니다.

저희 **멀티모달생성팀**은 VARCO-MLLM이 사용자에게 정확하고 풍부한 정보를 제공할 수 있도록 끊임없이 노력하고 있습니다. 이 과정에서 부족한 점은 솔직히 인정하고 개선해 나가며, 더욱 다양한 상황에서 강건한 모델로 발전시켜 나갈 계획입니다. VARCO-MLLM의 여정에 따뜻한 관심을 부탁드리며, 우리의 노력이 AI 기술을 통해 더 나은 세상을 만드는 데 기여하기를 바랍니다.

![]({{"/assets/img/post/8406a783d8dea98e70cbccaa329e505931d8f378/그림9.PNG"| relative_url}})
{:.center_div}
*그림 9. 이미지의 객체를 인식하고 상식에 근거하여 답을 하는 VARCO-MLLM*
{:.center_div}

<br>
<br>

# 참고 문헌
[^1]: Yin, S., et al. (2023). [A Survey on Multimodal Large Language Models](https://arxiv.org/pdf/2306.13549). *arXiv preprint arXiv:2306.13549*.
[^2]: Merve Noyan (2024). [Vision Language Models Explained](https://huggingface.co/blog/vlms). *Hugging Face Blog*.
[^3]: Bordes, F., et al. (2024). [An Introduction to Vision-Language Modeling](https://arxiv.org/pdf/2405.17247). *arXiv preprint arXiv:2405.17247*.