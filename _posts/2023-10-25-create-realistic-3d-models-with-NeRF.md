---
layout: post
title: "NeRF로 실감나는 3D 모델 만들기"
icon: paper
author: 279ceffd3b2e70b1578876160693f0db744a2363
permalink: 3100003e8ae8576086e5ae2b649f3c3e1863fa91
categories: [Vision]
tags: [AI, 딥러닝, 3D Modeling, Neural Rendering, NeRF]
excerpt: 최신 딥러닝 기술(NeRF)을 활용한 3D 모델링 기술을 소개하고 실제 사진 촬영을 통해 3D Object/Scene을 모델링하는 사례를 알아봅니다.
back_color: "#ffffff"
img_name: "pic2_NeRF_pipeline.png"
toc: true
show: true
new: false
series: -1
index: 33
---

* 3D 모델링 기술 소개 
* NeRF 개요 및 동작 원리 
* 게임 제작과 NeRF기반 3D 모델링 
* 실제 촬영 영상을 활용한 3D 모델링 데모
{:toc}

<br/>

> **작성자**
> - 안상준 (Vision AI Lab)
> - 딥러닝을 활용한 3D 모델링 기술을 연구하고 있습니다.
>
> **이런 분이 읽으면 좋습니다!**
> - 최신 딥러닝을 활용한 3D 모델링의 기술 수준이 궁금하신 분
> - 추억하고 싶은 장소나 간직하고 싶은 사물을 자신만의 3D 모델로 만들고 싶은 분
>
> **이 글로 알 수 있는 내용**
> - NeRF를 활용한 3D 모델링 기술의 동작 원리와 현 수준

<br/>

# 3D 모델링 기술 소개

3D 모델링이란 현실의 물체를 가상공간에 3차원으로 묘사하거나, 물리적 환경을 모델링하여 가상환경 속에서 물체의 모습을 만들어내는 것을 의미합니다. 오랫동안 3D 모델링은 전문적인 지식을 갖춘 디자이너가 3D 모델링 Tool을 이용해 오랜 시간 수작업을 통해서만 만들어 내거나 매우 비용이 비싼 장비와 기술을 통해 만들 수 있었습니다.

이러한 기술의 복잡도 때문에 휠씬 비용이 싸고 과정이 단순한 딥러닝 기반 3D 모델링 기술이 연구되고 있었지만, 최근까지도 딥러닝을 활용한 3D 모델링 기술은 수작업 대비 품질이 좋지 않아 실제 제품이나 서비스에 사용되는 경우가 거의 없었습니다. 하지만 2020년 발표된 NeRF기술은 이전 논문 결과들과는 확연히 다른 결과를 보여주었고, 추가적인 수작업 없이 사진 촬영만으로도 고품질의 3D Object나 Scene을 모델링할 수 있다는 가능성을 보여 주었습니다.


<iframe width="100%" style="height:calc(100vw * 0.56);max-height:600px;" src="https://www.youtube.com/embed/JuH79E8rdKc?si=DQQNSeNpvkjRjqiv&amp;start=118" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
{:.center_div}

*[영상 1] NeRF기반 3D 모델링*
{:.center_div}

이미 우리가 알지 못하는 사이에 NeRF 기술은 뮤직비디오, 광고나 Google Search 같은 여러 상용 서비스나 제품에 적용되고 있습니다. NeRF기술을 이용하면 기존 광고에서는 사용할 수 없었던 카메라 구도를 만들 수도 있고, 인터넷상에 업로드 된 몇 장의 사진만으로도 제품의 3D 형상을 만들어 제공할 수도 있습니다.

<iframe width="100%" style="height:calc(100vw * 0.56);max-height:600px;" src="https://www.youtube.com/embed/34KeBnSwvmc?si=z_hBjEE1wmg-_Iof" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
{:.center_div}

*[영상 2] NeRF로 만든 CF*
{:.center_div}

![]({{"https://storage.googleapis.com/gweb-uniblog-publish-prod/original_images/2D-_3D_Technology.gif"| relative_url}})
*[그림 1] Google Search 서비스*

<br/>

# NeRF 개요 

NeRF는 2020년 ECCV에 제출된 논문 “NeRF: Representing Scenes as Neural Radiance Fields for View Synthesis”제목의 약자입니다. NeRF는 한 마디로 표현하면 적은 수의 촬영 이미지를 가지고 360도 전방향에서 바라보는 이미지를 생성하는 Neural Network라고 할 수 있습니다.

NeRF를 이용한 3D 모델링 과정은 다음과 같은 3단계로 이루어집니다.

1.	여러 방향에서 3D 모델링 대상 객체를 촬영
2.	촬영한 이미지의 3차원 공간상의 촬영 위치 계산
3.	이미지 + 촬영된 위치 정보를 입력으로 NeRF 학습

![]({{"/assets/img/post/3100003e8ae8576086e5ae2b649f3c3e1863fa91/pic2_NeRF_pipeline.png"| relative_url}})
*[그림 2] NeRF기반 3D 모델링 Pipeline*

NeRF 학습이 완료된 이후에는 전방향에서 원하는 시점을 입력으로 넣어주면 학습에 사용하지 않았던 카메라 시점의 새로운 영상도 만들 수 있게 됩니다.

아래 이미지에서 다수의 검은색 사각뿔 도형이 실제 촬영을 통해 학습에 사용한 카메라의 시점이라면 학습 후에는 파란색 사각뿔의 위치와 같이 임의의 전방향에서 바라보는 새로운 영상을 출력할 수 있습니다. 

![]({{"/assets/img/post/3100003e8ae8576086e5ae2b649f3c3e1863fa91/pic3_NeRF_NewView.png"| relative_url}})
*[그림 3] 새로운 시점의 영상 생성 예*

이런 방식으로 360도 전방향에서 바라보는 영상을 생성하면 아래와 같은 3D 모델의 360도 렌더링 결과를 만들어 낼 수 있습니다. 

<iframe width="100%" style="height:calc(100vw * 0.56);max-height:600px;" src="https://www.youtube.com/embed/JuH79E8rdKc?si=kCCzPYk8ftXpVZic&amp;start=99" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
{:.center_div}

*[영상 3] 3D 물체의 360도 렌더링 결과*
{:.center_div}

<br/>

# NeRF 동작 원리

여기서는 NeRF를 구성하는 Network의 간략한 구조 설명을 통해 동작원리를 설명하려고 합니다. 논문 제목에도 나와 있는 Neural Radiance Fields를 이용한 Network 구조를 사용한 것이 NeRF와 기존 기술들과 차이점이자 3D 모델링 성능의 핵심입니다.  

NeRF의 Neural Network 구조는 3차원 공간상의 위치(X, Y, Z)와 Viewing Direction을 입력하면 그 위치의 Radiance Fields (Color와 Opacity)을 출력하는 단순한 구조를 가지고 있습니다. 학습에 사용되는 3차원 공간상의 위치는 촬영 이미지의 각 pixel을 시점에서 대상 물체를 향하는 가상의 Ray를 생성하고 일정 간격으로 Sampling을 통해 선정하게 됩니다. 

![]({{"/assets/img/post/3100003e8ae8576086e5ae2b649f3c3e1863fa91/pic4_NeRF_Network.png"| relative_url}})
*[그림 4] NeRF의 Neural Network 구조*

<iframe width="100%" style="height:calc(100vw * 0.56);max-height:600px;" src="https://www.youtube.com/embed/JuH79E8rdKc?si=mUuLwc3IGg7PpWSJ&amp;start=10" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
{:.center_div}

*[영상 4] NeRF의 학습 과정*
{:.center_div}

기존 기술들과 달리 3D Geometry 구조를 직접 학습하는 방식이 아니라 학습을 위해 Annotation이 어려운 3D Geometry Ground Truth 데이터가 필요 없고, 대규모 데이터를 이용한 사전 학습도 불필요합니다. 오직 3D 모델링할 대상을 여러 방향에서 촬영한 이미지만으로 학습이 가능한 구조입니다. 다만 물체를 구성하는 공간상 다수의 3차원 위치(X, Y, Z)에서 학습이 필요해 간단한 구조이지만 많은 횟수의 연산이 필요한 단점이 있습니다. 그리고 여러 각도에서 대상 물체를 촬영할 때 물체를 이동하거나 자세를 바꾸지 말아야 한다는 제약사항도 있습니다.

이러한 단점에도 불구하고 논문의 제시된 실험 결과는 NeRF가 기존 연구 결과들보다 월등히 좋은 정량/정성 평가 성능 가지고 있음을 잘 보여 주고 있습니다. 또, 2020년 NeRF의 첫 번째 논문이 공개된 이후로 유례없이 많은 후속 논문이 발표되고 앞에서 언급한 단점들도 해결되고 성능도 빠른 속도로 개선되고 있습니다. 

![]({{"/assets/img/post/3100003e8ae8576086e5ae2b649f3c3e1863fa91/pic5_NeRF_Quantitative_01.png"| relative_url}})
![]({{"/assets/img/post/3100003e8ae8576086e5ae2b649f3c3e1863fa91/pic5_NeRF_Qualitative_02.png"| relative_url}})
*[그림 5] NeRF의 3D 모델링 정량/정성 평가 결과*

<br/>

# 게임 제작과 NeRF기반 3D 모델링

최근에는 NeRF를 이용해 만든 3D 모델링 결과를 게임 제작에 활용하려는 시도도 많이 있습니다.

아래와 같이 NeRF를 이용해 실내외 공간을 3D로 모델링하고 배경으로 사용해 게임 캐릭터가 현실 공간에서 이동하는듯한 효과를 만들기도 하고, 자신의 모습을 3D로 모델링하고 게임의 캐릭터로 활용하기도 합니다. 아직은 기존 게임 엔진과의 호환성과 고해상도 모델의 경우에는 렌더링 속도 등 해결해야 할 문제가 있지만, 수작업 없이 빠르게 실사 같은 3D 모델을 만들 수 있다는 점에서 많은 발전 가능성을 가지고 있습니다.

![]({{"/assets/img/post/3100003e8ae8576086e5ae2b649f3c3e1863fa91/pic6_Indoor_NeRF.gif"| relative_url}})
*[그림 6] NeRF기반 3D Scene과 게임 엔진 연동*

<iframe width="100%" style="height:calc(100vw * 0.56);max-height:600px;" src="https://www.youtube.com/embed/usYHf2Vpk_s?si=vybWVygwKRZFn2LI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
{:.center_div}

*[영상 5] NeRF기반 3D 캐릭터와 게임 엔진 연동*
{:.center_div}

<br/>

# 휴대폰 촬영 영상을 이용한 3D 모델링 데모

NeRF 구현 코드는 github에 공개되어 있어 누구나 Python 프로그래밍만 할 수 있으면 쉽게 주변의 사물이나 풍경을 촬영하고 3D 모델링을 해볼 수 있습니다. 만약 프로그래밍에 익숙하지 않다면 NeRF관련 Startup에서 제공하는 iOS App([Luma AI](https://apps.apple.com/in/app/luma-ai/id1615849914))을 통해서도 휴대폰 사진 촬영만으로 NeRF기반 3D 모델링을 체험해 볼 수 있습니다.

마지막으로 저희 팀에서 추가적인 수작업 없이 휴대폰 사진 촬영과 NeRF 학습만으로 생성한 과자 상자와 NC Soft R&D 센터의 야외 정원을 3D 모델링한 결과를 공유 드리면서 글을 마칩니다. 여러분도 NeRF를 이용해서 추억하고 싶은 순간이나 기억하고 싶은 사물을 3D 모델로 만들어 보는 경험을 해볼 수 있으면 좋겠습니다. 다음번 글에서는 NeRF의 여러 제약 사항들을 해결한 기술들에 대해 소개하겠습니다.

NeRF를 활용한 3D 모델 생성 기술에 관심 있으시다면 NCDP 2023 발표한 영상도 참고해주시면 좋을 것 같습니다. 😊 -> [“[NCDP] 미래의 조각가! NeRF로 실감나는 3D 모델 만들기”](https://youtu.be/OU32me0lRL4?si=hVmpjsdNJdJB-wL0)

<iframe width="100%" style="height:calc(100vw * 0.56);max-height:600px;" src="https://www.youtube.com/embed/98eVXbX9hds?si=w7XN8aLCJoRe6emh" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
{:.center_div}

*[영상 6] 3D Object 모델링 결과*
{:.center_div}

<iframe width="100%" style="height:calc(100vw * 0.56);max-height:600px;" src="https://www.youtube.com/embed/HbaVlH8qM0c?si=XX14uVWwhyraLSvv" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
{:.center_div}

*[영상 7] 3D Scene 모델링 결과*
{:.center_div}

<br/>

# 참고 자료
- [NeRF Project Webpage](https://www.matthewtancik.com/nerf)
- [NeRF 개념 설명](https://csm-kr.tistory.com/64)
- [NeRF on Google Search](https://twitter.com/i/status/1649270583782412293)
- [McDonald's CF](https://youtu.be/34KeBnSwvmc?feature=shared)
- [NeRF와 Blender 연동](https://docs.nerf.studio/extensions/blender_addon.html)
- [NeRF기반 3D 게임 캐릭터 생성](https://youtu.be/usYHf2Vpk_s?feature=shared)
