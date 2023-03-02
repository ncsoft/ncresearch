---
layout: post
title: "긴 글을 위한 트랜스포머 모델 - LongFormer와 BigBird (1편)"
icon: paper
author: 97c27168919f1b883a64fe978b8abac68124308b
permalink: 6fc502ede05ca318787928fa22332a82b112805b
categories: paper
tags: [머신러닝, 딥러닝, 트랜스포머, 문서처리, LongFormer, BigBird, 어텐션]
excerpt: 긴 문서를 처리하기 위해 고안된 두 모델 LongFormer, Transformer의 원리에 대해서 설명합니다.
back_color: "#eff7ff"
toc: true
show: true
---

* 요약 / TL;DR
* 1. 개요
* 2. 모델 소개
* 3. 결론
* References
{:toc}

<br/>

# 요약 / TL;DR

1. 기존 트랜스포머 모델은 셀프 어텐션 구조로 높은 성능을 달성했지만, 처리할 수 있는 길이에 제한이 있었습니다.
2. LongFormer와 BigBird는 긴 글을 처리하기 위해 고안된 희소 어텐션 메커니즘을 채택하였습니다.  
   기존 풀 어텐션은 $$O(n^2)$$의 복잡도를 가지는 것에 비해, 희소 어텐션은 $$O(n)$$의 시간 복잡도를 가집니다.
3. CUDA 환경에서 희소 행렬 계산을 수행하기 위해 서로 다른 해결 방법이 적용되었습니다.

<br/>

# 1. 개요

근 몇 년 동안 언어 모델의 성능은 많은 발전을 이루었습니다. 비교적 최근 OpenAI측에서 공개한 ChatGPT의 경우 정말 사람 같은, 어쩌면 사람 이상일 수도 있는 작문과 정보 전달 능력을 보여주면서 NLP에 대해 모르는 사람들에게도 자신을 확실하게 각인시켰죠. 이런 언어 모델 붐의 근원을 따라가면 그곳엔 하나의 기폭제가 있습니다. 바로 여러분들도 잘 알고 계시는 그 논문, "Attention Is All You Need" _(Vaswani et al., 2017)_ 입니다.

![Attention Is All You Need 초록 캡쳐]({{"/assets/img/post/6fc502ede05ca318787928fa22332a82b112805b/attentionisallyouneed-abstract.png"| relative_url}})
*Attention Is All You Need 논문의 초록. 해당 논문은 2023년 2월 기준으로 인용수가 64000회를 넘습니다.*

이 논문에서 제안된 **트랜스포머(Transformer)** 신경망 구조로 학습된 모델은 거의 모든 자연어처리 과제(Task)의 SOTA를 갈아치우는 기염을 토했고, 이윽고 거의 모든 언어 모델이 트랜스포머를 그 기반으로 채택하게 됩니다. 사실상 NLP 분야의 반(半) 표준 지위에 올랐다고 해도 과언이 아니죠. 그렇다면 도대체 트랜스포머의 무엇이 특별하길래 이토록 높은 성능을 보이는 것일까요?

여러 가지 원인이 있겠지만, 트랜스포머의 핵심 중 하나는 바로 **셀프 어텐션(Self-Attention)** 메커니즘입니다. 간략하게 설명하자면, 입력된 글을 구성하는 토큰(단어)들끼리 서로와의 유사도를 구하는 메커니즘입니다. 이를 통해 트랜스포머 기반 모델은 글을 구성하는 요소들 간의 관계를 학습할 수 있게 됩니다. 소위 "문맥"이나 그와 비슷한 무언가를 파악할 수 있게 된다는 것이죠.  
이는 그 전까지 제안된 모델들에 비해 높은 성능을 낼 수 있는 원동력이 됩니다.

![셀프 어텐션 구조]({{"/assets/img/post/6fc502ede05ca318787928fa22332a82b112805b/self-attention.png"| relative_url}})
*셀프 어텐션 구조의 예시*

셀프 어텐션은 분명 잘 고안된 구조이지만, 동시에 그 구조로 인한 한계도 분명 존재합니다. 한번 다음 그림과 같이 생각해 볼까요.

![셀프 어텐션 제곱 연산]({{"/assets/img/post/6fc502ede05ca318787928fa22332a82b112805b/attention-quadratic.png"| relative_url}})
*셀프 어텐션 연산 과정의 예시*

입력을 구성하는 모든 토큰 간에 서로 어텐션을 계산한다면 그림과 같은 2차원 형태로 표현할 수 있을 것입니다. 이것은 셀프 어텐션의 시간과 공간 복잡도가 입력 길이의 제곱에 비례함을 뜻합니다($$O(n^2)$$). 입력이 짧을 때는 큰 문제가 없겠지만, 입력이 길어지면 길어질수록 결과를 내기 위해 필요한 자원은 훨씬 더 늘어나게 되겠죠. BERT등 많은 트랜스포머 모델들은 이러한 한계로 인해 입력의 최대 길이를 512토큰으로 제한하고 있습니다.

512토큰은 문장 몇 개나 짧은 문단을 처리하기에는 충분한 길이이지만, 긴 글을 처리할 필요성은 분명히 있습니다. 책이나 논문 등에 포함된 양질의 정보를 활용할 수도 있고, 길게 이어지는 대화문으로부터 대화의 흐름을 파악해 내는 데에 활용될 수도 있겠죠.

때문에 연산량으로 인한 길이 제한을 극복하기 위해 여러 방법들이 시도되었습니다. 가장 간단하게는, 여러분께서도 금방 생각할 수 있듯이 입력을 길이 제한에 걸리지 않을 만큼 쪼개서 모델에 집어넣는 방법이 있을 것입니다. 하지만 이 경우 각각의 쪼개진 조각 간에도 존재할 연관 관계를 결과에 충분히 반영할 수 없겠죠.

본 포스트에서는 이런 문제들을 극복할 수 있게끔 고안된 언어 모델들, 그 중에서도 LongFormer와 BigBird라는 두 모델에 집중하여 살펴봅니다. 이 모델들이 긴 입력에 대응하기 위해 고안한 설계, 그리고 이 설계를 GPU 위에서 실제로 작동시키기 위해 채택한 방법에 대해서 알아보려고 합니다. 후속 포스트에서는 논문에 언급된 모델 학습 과정 및 결과, 그리고 유사한 모델 및 파생 모델들에 대한 소개가 예정되어 있습니다.

<br/>

# 2. 모델 소개

## 2.1. [공통] 희소 어텐션 (Sparse Attention)

행렬 안에 0이 아닌 원소가 가득 차 있는 행렬을 밀집(Dense) 행렬이라고 합니다. 반대로 행렬 안에 0이 많이 들어차 있는 행렬을 희소(Sparse) 행렬이라고 하죠.

$$
\text{Dense Matrix:}
\begin{pmatrix}
  1 & 5 & 3 & 4 \\
  2 & 3 & 9 & 6 \\
  5 & 1 & 8 & 7 \\
  4 & 6 & 3 & 9 \\
\end{pmatrix}

\text{, Sparse Matrix:}
\begin{pmatrix}
  0 & 0 & 3 & 0 \\
  2 & 0 & 9 & 6 \\
  0 & 0 & 0 & 7 \\
  0 & 0 & 3 & 0 \\
\end{pmatrix}
$$

기존의 셀프 어텐션이 택하는 풀 어텐션(Full Attention) 방식을 밀집 행렬에 비유한다면, 앞으로 설명드릴 두 모델의 핵심을 희소 행렬에 비유하면 이해가 편하실 거라 생각합니다.

어텐션 대상이 너무 많아서 시간이 오래 걸린다면, 꼭 필요한 대상에만 어텐션을 수행하면 되겠죠? 두 모델은 어텐션 계산을 최대한 줄여서 $O(n^2)$이 아니라 $O(n)$을 만드는 메커니즘인 희소 어텐션(Sparse Attention)을 핵심 골자로 삼고 있습니다.

## 2.2. Longformer: The Long-Document Transformer

LongFormer 논문의 저자는 크게 세 가지 관점에서 바라본 희소 어텐션 방식을 제안합니다.
1. 슬라이딩 윈도우 어텐션 (Sliding Window Attention; (b))
2. 팽창된 슬라이딩 윈도우 어텐션 (Dilated Sliding Window Attention; (c))
3. 전역 어텐션 (Global Attention; (d))

![Longformer에서 사용된 어텐션 패턴]({{"/assets/img/post/6fc502ede05ca318787928fa22332a82b112805b/attention-patterns.png"| relative_url}})
*LongFormer에서 사용된 어텐션 패턴*

이 세 가지 어텐션 방식을 결합함으로써 긴 문서에서 RoBERTa를 앞서는 성능을 보였다고 하네요.

### 슬라이딩 윈도우 어텐션 (Sliding Window Attention)

![Sliding Window Attention]({{"/assets/img/post/6fc502ede05ca318787928fa22332a82b112805b/longformer-sliding-crop.png"| relative_url}})

여러 연구(_Kovaleva et al., 2019_)를 통해서, 문장 내 어떤 단어와 가장 관계가 깊은 단어는 주로 해당 단어의 주변에 위치한다는 것이 밝혀져 있습니다. 그렇다면 각 토큰에 특히 집중해서 어텐션을 수행하면 되지 않을까요?

![Sliding Window Attention - Single Layer]({{"/assets/img/post/6fc502ede05ca318787928fa22332a82b112805b/sliding-window-singlelayer.png"| relative_url}})

그림에서 익숙한 느낌이 드신다면 정확합니다. CNN(Convolutional Neural Network)에서 이와 비슷한 방식을 채택하고 있죠.  
슬라이딩 윈도우 방식에서는 이렇게 특정 토큰과 이웃한 w개(좌로 $$\frac{1}{2}w$$개, 우로 $$\frac{1}{2}w$$개)의 토큰에만 어텐션을 취합니다. 이렇게 되면 길이가 n인 입력에 대해 어텐션의 복잡도는 $$O(n \times w)$$가 되겠네요. 일반적인 상황이라면 입력의 길이에 비해 윈도우의 크기 w가 충분히 작을 테니, $$O(n)$$이라고 말할 수도 있겠습니다.

![Sliding Window Attention - Multi Layer]({{"/assets/img/post/6fc502ede05ca318787928fa22332a82b112805b/sliding-window-attention.png"| relative_url}})

이러한 레이어를 여러(l) 장 더 쌓는다고 생각해 봅시다. 레이어 위로 올라갈수록 뉴런 한 개가 바라보는(Attend) 토큰의 개수가 늘어납니다. 이를 수용 영역(Receptive Field)이라 정의하면 맨 위 레이어의 수용 영역은 $$l \times w$$입니다. 아래 레이어에서는 '나무'만 볼 수 있지만, 위로 올라갈수록 '숲'을 볼 수 있게 되는 것이죠.

실제 모델을 학습할 때는 레이어마다 다른 윈도우 크기를 적용하여 모델의 성능과 용량 사이에서 균형을 맞췄다고 하네요.

### 팽창된 슬라이딩 윈도우 어텐션 (Dilated Sliding Window Attention)

![Dilated Sliding Window Attention]({{"/assets/img/post/6fc502ede05ca318787928fa22332a82b112805b/dilated-sliding-window-crop.png"| relative_url}})

![팽창된 슬라이딩 윈도우 어텐션]({{"/assets/img/post/6fc502ede05ca318787928fa22332a82b112805b/dilated-sliding-window.png"| relative_url}})

팽창된(Dilated) 윈도우 어텐션은 계산량을 늘리지 않고 모델의 수용 영역을 늘리기 위한 기법입니다. 이 또한 Dilated CNN(_van den Oord et al., 2016_)이라는 유사한 방법이 있다고 하네요.

그림에서 보실 수 있듯이 이번 어텐션에서는 윈도우 사이즈를 d칸씩 띄웁니다. 그러면 수용 영역의 크기는 기존 슬라이딩 윈도우에서 d가 추가되어 $$l \times d \times w$$로 계산됩니다. 또한 멀티 헤드 어텐션(Multi-Head Attention) 학습을 수행할 시에 각 헤드에 다른 사이즈의 Dilation을 적용할 수 있는데요, 작은 d가 적용된 헤드에서는 지역적인 맥락(Local Context)에 / 큰 d가 적용된 헤드에서는 상대적으로 긴 맥락(Longer Context)에 집중하는 효과를 거둘 수 있습니다.

### 전역 어텐션 (Global Attention)

![Global Attention]({{"/assets/img/post/6fc502ede05ca318787928fa22332a82b112805b/longformer-global-crop.png"| relative_url}})

![전역 어텐션]({{"/assets/img/post/6fc502ede05ca318787928fa22332a82b112805b/global-attention.png"| relative_url}})

BERT와 같이 최근 언어 모델들은 해결하고자 하는 과제에 맞게 특수 토큰을 활용합니다. 대표적인 특수 토큰으로는 `[CLS]`, `[SEP]`가 있습니다. 분류(Classification) 문제를 수행할 때는 `[CLS]`토큰의 임베딩을 참조하는 게 일반적이고, QA 문제의 경우 본문과 질문을 구별하기 위해 `[SEP]`이 활용되죠. 이들은 글을 구성하는 모든 토큰과 어텐션을 수행하면서도 해당 토큰 자체로는 큰 의미를 갖지 않기 때문에 이런 식의 활용이 가능합니다.

LongFormer의 경우에는 어떨까요? 위에 언급된 슬라이딩 윈도우 기반 방법들은 결국 특정 토큰 근처에 위치한 토큰들의 정보를 중점적으로 반영합니다. 만약 분류와 같은 작업을 수행하고자 한다면, 입력된 글의 전체적인 맥락을 파악할 수 있도록 하는 역할이 무엇인가 있어야 할 것 같습니다. LongFormer에서는 이를 극복하기 위해 전역 어텐션이라는 패턴을 제안합니다. 기본적으로 윈도우 기반 어텐션을 수행하지만, 그 와중에도 특정(특수) 토큰들만은 필수적으로 어텐션을 수행하도록 하는 것이죠. 이를 통해 언어 모델을 여러 가지 과제에 대해 쉽게 Fine-Tuning시킬 수 있습니다. 분류 과제에는 `[CLS]` 토큰에 대해 계산된 전역 어텐션을 활용하면 됩니다. QA 과제를 수행하고자 한다면, 각 질문을 구별하는 토큰에 대해 계산된 전역 어텐션을 활용합니다.

전역 어텐션을 적용하는 토큰의 수가 입력의 길이에 비해 충분히 작을 경우, 어텐션의 시간 복잡도는 여전히 $$O(n)$$입니다. 이렇게 글 전체의 문맥 정보를 잃지 않으면서도, 긴 문서에 대해 선형 복잡도를 확보하는 희소 어텐션 방식을 제안하고 적용한 것이 LongFormer의 핵심이라고 할 수 있겠습니다.


## 2.3. BigBird: Transformers for Longer Sequences

BigBird 또한 LongFormer와 매우 흡사한 아이디어와 구조를 가집니다. $$O(n^2)$$의 큰 코스트를 가지는 풀 어텐션을 $$O(n)$$으로 끌어내리기 위한 세 가지의 희소 어텐션 방식을 제안합니다.

1. 무작위 어텐션 (Random Attention; (a))
2. 윈도우 어텐션 (Window Attention; (b))
3. 전역 어텐션 (Random Attention; (c))

![BigBird 어텐션 패턴]({{"/assets/img/post/6fc502ede05ca318787928fa22332a82b112805b/bigbird-attention-patterns.png"| relative_url}})

BigBird에서 주목할 점은 희소 어텐션 방식에 이론적 근거를 부여하고자 노력했다는 것입니다. 이를 위해 BigBird에서는 어텐션을 그래프로 생각합니다. 각 토큰은 노드, 각 토큰 간의 어텐션은 노드를 잇는 간선이 되는 것이죠. 풀 어텐션은 각 노드가 서로 직접 연결되어 있는 그래프로 생각할 수 있을 것입니다. 그래프 희소화 이론(Graph Sparsification Theorem)을 참고하여 그래프를 적절하게 간결화하는 것이 BigBird의 지항점이 되겠습니다.

![Full Attention Graph]({{"/assets/img/post/6fc502ede05ca318787928fa22332a82b112805b/full-graph.png"| relative_url}})
*그래프로 나타낸 풀 어텐션. 출처: https://huggingface.co/blog/big-bird*

### 무작위 어텐션 (Random Attention)

![BigBird Random Attention Crop]({{"/assets/img/post/6fc502ede05ca318787928fa22332a82b112805b/bigbird-random-crop.png"| relative_url}})

무작위 어텐션을 그래프로 나타내면 풀 어텐션 그래프에서 무작위로 간선을 지워낸 형태라고 생각할 수 있습니다.

![Bigbird Random Attention Graph]({{"/assets/img/post/6fc502ede05ca318787928fa22332a82b112805b/random-graph.png"| relative_url}})
*그래프로 나타낸 랜덤 어텐션. 출처: https://huggingface.co/blog/big-bird*

어떤 노드로부터 다른 노드까지의 최단 거리에 관해 생각해 봅시다. 당연히 풀 어텐션에서는 언제나 1이겠죠. 그렇다면 간선을 무작위로 지워냈다고 생각해 볼까요. 최단 거리의 평균은 1보다는 커지게 될 것입니다. 그런데 이 때 노드의 개수(입력의 길이)가 커지면 최단 거리의 평균은 어떤 식으로 변화할까요? 이론에 따르면 그래프의 모든 간선이 동일한 확률로 남아 있을 때, 노드 간 최단 거리의 평균은 노드 개수의 로그에 비례한다고 알려져 있습니다. 즉, 노드가 많아지더라도 노드 간 최단 거리는 그 정도로 크게 멀어지지 않는다는 이야기입니다. 서로가 직접 연결되어 있지 않아도 몇 단계만 거치면 간접적으로 어텐션을 갖는 효과가 나올 수 있겠죠. BigBird 모델에서는 이에 착안하여 각 쿼리당 r개의 무작위 키를 선택하여 어텐션을 계산합니다. (쿼리, 키는 어텐션 메커니즘에서 이야기하는 Q, K를 말합니다)


### 윈도우 어텐션 (Window Attention)

![BigBird Window Attention Crop]({{"/assets/img/post/6fc502ede05ca318787928fa22332a82b112805b/bigbird-window-crop.png"| relative_url}})

윈도우 어텐션은 LongFormer의 것과 사실상 동일합니다.

![Bigbird Window Attention Graph]({{"/assets/img/post/6fc502ede05ca318787928fa22332a82b112805b/window-graph.png"| relative_url}})
*그래프로 나타낸 윈도우 어텐션. 출처: https://huggingface.co/blog/big-bird*

위와 같이 이웃한 노드끼리 연결된 그래프로 시각화할 수 있겠네요.

### 전역 어텐션 (Global Attention)

![BigBird Window Attention Crop]({{"/assets/img/post/6fc502ede05ca318787928fa22332a82b112805b/bigbird-global-crop.png"| relative_url}})

![Bigbird Global Attention Graph]({{"/assets/img/post/6fc502ede05ca318787928fa22332a82b112805b/global-graph.png"| relative_url}})
*그래프로 나타낸 글로벌 어텐션. 출처: https://huggingface.co/blog/big-bird*

BigBird 저자들의 실험 결과, 무작위와 윈도우 어텐션의 조합만으로는 충분한 성능을 얻을 수 없었다고 합니다. 그래서 BigBird 또한 전역 어텐션이 필요하다는 결론에 이르게 되었죠. 이 때, 두 가지 전역 어텐션 방식을 고안하여 각각 실험을 진행하였습니다.  
* BigBird-ITC: 이미 입력에 존재하는 토큰 중 일부를 전역 토큰으로 만드는 방식입니다. * BigBird-ETC: 전역 토큰의 역할을 할 특수 토큰(`[CLS]` 등) g개를 입력과 별도로 추가하는 방식입니다.

두 가지의 모델 중 ETC가 근소하게 더 좋은 성능을 보였다고 합니다.

지금까지 알아본 BigBird의 어텐션을 전부 종합하면 아래 그림과 같이 나타낼 수 있겠죠.

![BigBird Total Attention Crop]({{"/assets/img/post/6fc502ede05ca318787928fa22332a82b112805b/bigbird-total-crop.png"| relative_url}})

![Bigbird Total Attention Graph]({{"/assets/img/post/6fc502ede05ca318787928fa22332a82b112805b/total-graph.gif"| relative_url}})
*그래프로 나타낸 BigBird의 전체 어텐션. 출처: https://huggingface.co/blog/big-bird*


## 2.4. GPU/TPU를 위한 설계

지금까지 두 모델의 핵심 원리에 대하여 알아보았습니다. 두 모델 모두 **풀 어텐션을 희소 어텐션(Sparse Attention)으로 대체**하여 **선형 복잡도를 확보**함으로써 긴 글을 효율적으로 처리할 수 있도록 설계되었음을 알 수 있었죠?

그러면 이대로 코드를 작성하기만 하면 될까요? 아쉽게도 그렇지 않습니다. 현실은 항상 쉽지 않죠.

여러분께서도 잘 알고 계시듯이 보통 딥 러닝 모델을 학습시킬 때는 GPU를 활용합니다. GPU는 많은 양의 연산을 병렬로 처리할 수 있기 때문에 딥 러닝 모델의 구조와 잘 어울리기 때문이죠. 이 때 GPU 프로그래밍을 위하여 일반적으로 CUDA라는 도구를 사용합니다.

그러나 본 논문에서 제안된 희소 어텐션(Sparse Attention)을 효율적으로 계산하기 위한 희소 행렬 연산(Sparse Matrix Computation)을 CUDA에서는 지원하지 않았습니다. 희소 행렬이 가지는 계산에서의 이점을 이용하지 않고 단순히 행렬 연산을 수행한다면, 그냥 풀 어텐션 방식을 사용하는 것과 다를 바가 없습니다.

그렇다면 애써 고안해 낸 모델 구조를 제대로 활용하기 위해선 어떻게 해야 할까요? LongFormer와 BigBird에서는 서로 다른 방향의 해결 방법을 제시했습니다.

### LongFormer - 커스텀 CUDA 커널

LongFormer의 저자들은 희소 행렬 연산을 위한 CUDA 커널을 직접 구현하였습니다(!). 구현에는 TVM이라고 하는 기계 학습 컴파일러 프레임워크가 사용되었다고 합니다. 자세한 구현은 LongFormer의 [코드](https://github.com/allenai/longformer)를 참조해 주세요.

### BigBird - 블록 희소 어텐션

BigBird의 저자들은 어텐션을 블록화(Blockify)하고 계산 트릭을 구사하여 연산 문제를 최적화하였습니다.

블록화란, 이웃한 토큰 b개를 묶어 한 개의 유닛(블록)으로 취급하는 것입니다. n개의 토큰이 있다면 총 n/b개의 유닛이 존재합니다. 위에서 설명드린 BigBird의 원리는 b = 1일 때를 기준으로 했다고 생각하면 되겠죠. 아래에서 알아볼 어텐션 계산 트릭 또한 b = 1일 때를 우선시하여 표현하겠습니다.

![Sparse Block Attention - 0]({{"/assets/img/post/6fc502ede05ca318787928fa22332a82b112805b/sparse-block-attention-0.png"| relative_url}})  

위와 같이 어텐션 행렬이 구성되었다고 생각해 봅시다. 푸른색은 전역 어텐션, 주황색은 윈도우 어텐션, 그리고 빨간색은 무작위 어텐션을 의미합니다. 각 행은 어텐션의 쿼리(Query)를 뜻하고, 각 열은 어텐션의 키(Key)를 뜻합니다.

윈도우 어텐션의 계산에 대해서 먼저 생각해 볼까요. 그림에서 키(Key) 쪽을 보시면, 원본 글("나는야 엔씨소프트 NLP센터 검색기술실 내러티브팀의 도구리") 위에 글 두 개가 더 있는 것을 보실 수 있습니다. 각각 원본 문장에서 오른쪽으로 한 토큰, 왼쪽으로 한 토큰이 밀려 있죠. 윈도우 사이즈가 3인 윈도우 어텐션을 대각선 성분 3개의 합본으로 생각하고, 이를 위해 원본 Key와 한 칸씩 밀린 Key 두 개를 더 준비하는 것이 윈도우 어텐션 계산을 위해 준비된 트릭입니다.

무슨 뜻인지 한 번에 이해가 가지 않으실 수도 있습니다. 조금 더 자세히 알아볼까요?

![Sparse Block Attention - 1]({{"/assets/img/post/6fc502ede05ca318787928fa22332a82b112805b/sparse-block-attention-1.png"| relative_url}})

쿼리 Q와 원본 키 K의 성분별 곱셈(Element-Wise Product)을 수행한다고 생각해 봅시다.

```
[Q[0], Q[1], ..., Q[n-1]] * [K[0], K[1], ..., K[n-1]]
```

이렇게 수도 코드로 나타낼 수도 있겠네요.

이들은 어텐션 행렬에서 어디에 위치할까요? 그림에서 강조된 것처럼, 바로 대각선 성분 중에서도 가운데 부분입니다. 이제 대각선의 아래 부분과 윗 부분이 남았습니다. 이들은 어떻게 계산할까요?

![Sparse Block Attention - 2]({{"/assets/img/post/6fc502ede05ca318787928fa22332a82b112805b/sparse-block-attention-2.png"| relative_url}})

K를 오른쪽으로 한 칸 밀어내서 만든 새로운 키 K'에 주목합시다. Q와 K'의 성분별 곱셈은 어떻게 될까요?

```
[Q[0], Q[1], ..., Q[n-1]] * [K[n-1], K[0], K[1], ..., K[n-2]]
```

이를 행렬 위에 표시하면 앞선 이미지와 같습니다. 대각선의 아랫 부분을 차지하고 있군요. 그렇다면 남은 윗 부분은 어떻게 계산하면 좋을지 이미 감을 잡으셨겠죠?

![Sparse Block Attention - 3]({{"/assets/img/post/6fc502ede05ca318787928fa22332a82b112805b/sparse-block-attention-3.png"| relative_url}})

이번엔 K를 왼쪽으로 밀어낸 키 K''와 Q를 가지고 계산을 하면 되겠습니다.

```
[Q[0], Q[1], ..., Q[n-1]] * [K[1], K[2], ..., K[n-1], K[0]]
```

이 셋을 합치면

```
[Q[0], Q[1], ..., Q[n-1]] * [K[n-1], K[0], K[1], ..., K[n-2]];
[Q[0], Q[1], ..., Q[n-1]] * [K[0], K[1], ..., K[n-1]];
[Q[0], Q[1], ..., Q[n-1]] * [K[1], K[2], ..., K[n-1], K[0]];
```

이걸 다시 쓰면,

```
Q[0] * [K[n-1], K[0], K[1]];
Q[1] * [K[0], K[1], K[2]];
Q[2] * [K[1], K[2], K[3]];
...
Q[n-1] * [K[n-2], K[n-1], K[0]];
```

이와도 같다고 볼 수 있겠네요. 이렇게 간단한 벡터 연산 세 번으로 윈도우 어텐션 계산이 끝났습니다.

| ![Sparse Block Global]({{"/assets/img/post/6fc502ede05ca318787928fa22332a82b112805b/sparse-block-global.png"| relative_url}}) | ![Sparse Block Random]({{"/assets/img/post/6fc502ede05ca318787928fa22332a82b112805b/sparse-block-random.png"| relative_url}}) |
| :---------------------------------------------------: | :---------------------------------------------------: |
|                     _전역 어텐션_                     |                    _무작위 어텐션_                    |

전역 어텐션과 무작위 어텐션은 더 간단하죠.  
각각

```
Q[0] * [K[0], K[1], …, K[n-1]];
Q[n-1] * [K[0], K[1], …, K[n-1]];
K[0] * [Q[0], Q[1], …, Q[n-1]];
K[n-1] * [Q[0], Q[1], …, Q[n-1]];
```
```
Q[1] * [K[r1], K[r2], …, K[r]];
Q[2] * [K[r1], K[r2], …, K[r]];
...
Q[n-3] * [K[r1], K[r2], …, K[r]];
Q[n-2] * [K[r1], K[r2], …, K[r]];
```

이처럼 표현할 수 있습니다. (수도 코드는 [허깅페이스 블로그](https://huggingface.co/blog/big-bird)를 참조하여 작성하였습니다)

이 어텐션 계산 과정을 종합적으로 표현하면(블록 사이즈까지 포함해서) 다음과 같습니다.

![BigBird Total]({{"/assets/img/post/6fc502ede05ca318787928fa22332a82b112805b/bigbird-total-block.png"| relative_url}})

이미지에서 빨간색 블록은 쿼리, 초록색 블록은 전역 어텐션, 파란색은 윈도우, 주황색은 무작위를 의미합니다.

BigBird의 희소 어텐션은 전역 토큰 / 랜덤 토큰 / 그리고 원본 키와 밀린 키들을 모아 쿼리와 곱함으로써 한 번에 계산될 수 있겠군요. 아주 깔끔한 결과입니다.

<br/>

# 3. 결론

기존 트랜스포머 모델들은 셀프 어텐션 구조 덕분에 훌륭한 성능을 보일 수 있었지만, 입력의 최대 길이에 제한이 있었습니다.

본 포스트에서는 (1) LongFormer와 (2) BigBird 두 모델이 어떤 원리를 통해서 이러한 한계를 극복하고자 했는지에 대해서 알아보았습니다. 자세한 부분에서는 차이가 있었지만, 두 모델 모두 희소 어텐션(Sparse Attention) 메커니즘을 적용하여 어텐션 과정에서의 복잡도를 낮추고자 했죠. 슬라이딩 윈도우 어텐션(Sliding Window Attention)과 전역 어텐션(Global Attention)이 공통으로 적용된 것도 재미있는 부분입니다.

또한 CUDA 환경에서 희소 어텐션을 효율적으로 계산한 방법에 대해서도 살펴보았습니다. 각각 TVM을 통한 커스텀 CUDA 커널 구현, 그리고 블록 희소 어텐션(Block Sparse Attention)을 통해 CUDA에서 희소 행렬 연산을 미지원하는 상황을 해결하였습니다.

다음 포스트에서는 이 두 모델의 학습 과정과 그 결과, 그리고 이 모델들과 유사하거나 이들로부터 파생된 모델들에 대해서 소개드리는 시간을 가지려고 합니다.

여기까지 긴 글을 읽어주셔서 감사합니다. 오랜만에 머릿 속 생각을 글로 풀어내려니 쉽지 않았는데요, 부디 유용한 정보를 얻어가셨으면 좋겠네요. 제 후속편 이외에도 여러 유익하고 재미있는 글들이 올라올 예정이니 많은 관심 부탁드리겠습니다.

<br/>

# References

* I Beltagy et al., Longformer: The Long-Document Transformer, 2020.
* M Zaheer et al., Big Bird: Transformers for Longer Sequences, 2020.
* https://desh2608.github.io/2021-07-11-linear-transformers/
* https://towardsdatascience.com/advancing-over-bert-bigbird-convbert-dynabert-bca78a45629c
* https://medium.com/deep-learning-reviews/big-bird-transformers-for-longer-sequences-paper-review-63f722c431e1
* https://huggingface.co/blog/big-bird
* https://ai.googleblog.com/2021/03/constructing-transformers-for-longer.html
* https://velog.io/@kangmin/%EB%85%BC%EB%AC%B8-%EB%A6%AC%EB%B7%B0-Longformer-The-Long-Document-Transformer#1-introduction
* https://medium.com/@eyfydsyd97/%EB%85%BC%EB%AC%B8-%EB%A6%AC%EB%B7%B0-longformer-the-long-document-transformer-e9ade1980536
* https://myeonghak.github.io/natural%20language%20processing/NLP-Longformer/
* https://soundprovider.tistory.com/entry/2020-Big-Bird-Transformers-for-Longer-Sequences
* https://soundprovider.tistory.com/entry/Big-Bird-Implementation-details
* https://ok-lab.tistory.com/187
