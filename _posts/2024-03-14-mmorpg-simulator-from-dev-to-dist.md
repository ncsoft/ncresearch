---
layout: post
title: "MMORPG 시뮬레이터 개발부터 서비스 배포까지 3"
icon: paper
author: f0c9f1102deb254e64e66983dc240b434012afcc
permalink: 8fd765b30f5896a8f6eee727a1523a96874c72b4
categories: AI System
tags: [Game AI, 리니지, 리니지리마스터, MMORPG, AI 서비스, AI System, 라이브서비스]
excerpt: "학습된 AI를 게임에 서비스로 선보이기 위해 어떤 노력을 했는지 설명합니다."
back_color: "#ffffff"
img_name: "4_거울전쟁.png"
toc: true
show: true
new: false
series: 5
index: 44
---

- AI와 리니지 기획자들의 한판승부
- 섬세한 문제 분석을 위한 Battle Log Viewer
- 출시를 위한 안정성 확보 노력
- 테스트를 도와준 창의적인 플레이어들
- 라이브 서비스의 기쁨과 슬픔
- 이후에 개발한 Contents 소개
- 마치며
{:toc}

<br/>

> **작성자**
>
> - 정민철 (VARCO 개발실)
> - 독서가 취미인 개발자입니다. 효율적인 개발 과정을 만드는 데 관심이 있습니다.
>
> **이런 분이 읽으면 좋습니다!**
> -	게임에 AI 서비스를 배포하는 과정이 궁금하신 분
>
> **이 글로 알 수 있는 내용**
> - 리니지 리마스터에 AI 서비스를 출시한 과정
<br>

안녕하세요. NC Research에서 개발자로 일하고 있는 정민철입니다.  
3부에 걸쳐 AI서비스를 MMORPG에 출시하는 과정을 소개하는 글을 기획한게 얼마전인 것 같았는데, 벌써 마지막글을 쓰게 되었네요. 1, 2 부는 게임 시스템에 AI 학습 시스템을 연결하는 과정에 대한 내용이었습니다. 이번 글 에서는 학습된 AI를 플레이어들에게 서비스로 선보이기 위해 어떤 노력을 했는지 설명하도록 하겠습니다. 주요 내용은 학습된 AI를 서비스로 만들기위한 과정, 출시 과정 중에 있었던 에피소드, 플레이어들의 창의적인 공격방법에 대한 대응 과정입니다.

## AI와 리니지 기획자들의 한판승부

라이브 서비스로 학습이 완료된 AI를 내보내기 전, 사람이 느끼기에 얼마나 잘 싸우는지 알아보기 위해 첫 버전을 리니지 기획팀 분들께 선보이던 날이 생각납니다. 사전에 내부 테스트도 해보려고 했는데 생각보다 리니지가 컨트롤과 협동 플레이가 많이 필요해서, 숙련도가 낮은 우리를 AI가 순식간에 전멸시켜 버렸습니다. 기획팀 분들은 역시 능숙하셔서 2시간에 걸쳐 재미있게 AI과 전투를 벌이신 후에 여러가지 피드백을 주셨습니다. 다행히 첫 인상은 여러가지 스킬을 상황에 맞게 능숙하게 쓰며 사람처럼 잘 싸운다는 것이었습니다. 하지만 여러가지 전략에 대해서는 AI가 대응하지 못하는 모습을 보여주었습니다. 기획팀 분들이 많은 빈틈을 발견하셨고, 그 빈틈을 이용하니 쉽게 AI가 전멸했습니다. 예를 들어 여러명이 투명해지는 마법이나 아이템을 장착한 후 몰래 접근해 한 캐릭터를 둘러싸고 순식간에 죽여버리는 전략이 있었는데, 이런 전략을 상상도 못하고 있었기 때문에 AI 캐릭터가 전혀 대응하지 못했습니다.  
기획팀에서 테스트를 마치고 결과를 엑셀에 정리해주셨는데, 거기에는 여러가지 전략과 그에 대해 AI가 어떻게 대응하기를 원하는지가 잘 정리되어 있었습니다. 연구팀은 피드백 받은 부분을 해결하기 위해 고군분투 했습니다. 이후에는 라이브에 나갈 때 까지 이런 과정의 반복이었습니다.

![]({{"/assets/img/post/8fd765b30f5896a8f6eee727a1523a96874c72b4/1_인게임_스크린샷.png"| relative_url}})

{:.center_div}
그림 1. 인게임 스크린샷
<br>

## 섬세한 문제 분석을 위한 Battle Log Viewer

기획팀의 피드백을 반영해서 AI 캐릭터가 특정한 전략에 당하지 않게 하려면 섬세한 디버깅이 필요했습니다. 각 Step 별로 상황을 파악하고, 각 AI가 어떤 결정을 내렸는지를 확인하고, 우리가 변경한 내용이 AI의 결정에 반영이 되었는지를 확인해야 했습니다. 이를 위해 전투 상황을 상세히 기록한 Battle Log를 남기고 있었지만 텍스트로만 볼 수 있어서 상황을 전체적으로 파악하려면 시간이 너무 오래걸렸습니다. 이런 문제를 해결하기 위해 Battle Log Viewer를 만들었습니다.

![]({{"/assets/img/post/8fd765b30f5896a8f6eee727a1523a96874c72b4/2_battleLogViewer.png"| relative_url}})

{:.center_div}
그림 2. Battle Log Viewer
<br>

Battle Log Viewer에서는 각 step 별로 캐릭터의 위치, 각 캐릭터의 상태, AI 캐릭터의 의사결정 상황을 확인할 수 있습니다. 또한 선으로 누구를 공격하려 하는지, 어디로 이동하려 하는지를 표현하고 있습니다. 이 도구를 통해서 전제적인 전장의 상황을 파악할 수 있고, 세부 내용이 알고 싶은 경우 각 캐릭터를 클릭하여 상세한 정보를 파악할 수 있습니다. 이 도구를 이용해 전제적인 전투의 흐름을 파악하여 플레이어의 의도와 그에 대한 AI의 반응을 구체적으로 알 수 있어 AI를 개선하는데 큰 도움이 되었습니다.

## 출시를 위한 안정성 확보 노력

서비스 출시를 위해 안정성 확보에 많은 노력을 기울였습니다. 먼저 서비스 실행을 위한 적절한 서버 리소스(CPU, Memory 등)를 산정하기 위해 노력했습니다. 이를 위해 실제 서비스 운영 시 서버에서 발생하는 시나리오를 먼저 작성했습니다. AI 캐릭터가 최대 25명까지 소환될 수 있고, 상대할 사용자는 최대 150명을 가정했습니다. 이런 시나리오 상에서 AI 서버가 서비스를 1일 이상 실행하도록 설정한 후 CPU 사용량과 메모리 사용량을 기록해서 사용량이 얼마나 되는지, 메모리 누수 등의 문제가 없는지를 확인했습니다. 다행히 메모리 사용량도 적당하고 누수문제도 없었습니다. 하지만 CPU는 사용량이 너무 많아서 최적화를 수행해야 했습니다.

![]({{"/assets/img/post/8fd765b30f5896a8f6eee727a1523a96874c72b4/3_performanceTest.png"| relative_url}})

{:.center_div}
그림 3. Performance Test
<br>

프로파일러로 분석한 결과 CPU 사용량이 많은 부분은 게임에서 받은 정보를 AI 모델이 받을 수있는 형태로 변환하는 부분이었습니다. 연구팀에서 이 부분을 인식하고 python의 numba라는 package를 이용해 고속화작업을 해서 CPU 사용량을 많이 줄일 수 있었습니다. 이 외에도 프로파일러를 통해 병목이 되는 부분을 식별해 알고리즘 최적화나 필요없는 부분을 제거하는 등의 개선을 거쳐 서비스가 가능한 수준으로 최적화를 완성하였고, 운영팀에도 안정적으로 서비스를 제공할 수 있는 서버 리소스를 알려드릴 수 있게 되었습니다.

## 테스트를 도와준 창의적인 플레이어들

모든 준비를 마치고 드디어 테스트 서버에 AI를 내보내는 날이 왔습니다. 처음 플레이어와 대전할 때 채팅창으로 감탄(?)하던 것이 생각나네요. 하지만 플레이어들의 창의성은 대단했습니다. 얼마 지나지 않아 AI의 약점을 발견해서 공략하기 시작했습니다. 플레이어들의 창의성에 대항하는 AI 개선 시즌2가 시작되었습니다. 플레이어들이 AI를 공략하면, 우리는 AI가 그 방법에 당하지 않도록 수정해서 다시 테스트 서버에 내보내는 것을 반복했습니다. 제일 기억에 남았던 플레이는 AI 캐릭터가 보스 몬스터를 잡는 타이밍을 노려 난입해 AI 캐릭터와 약해진 보스몬스터를 둘다 잡는 마술을 보여준 혈맹이었습니다.  
또한 플레이어들의 편의성을 위한 행동방식도 추가했습니다. 예를 들어 AI가 1~2명만 남아 불리해 졌을 때 너무 잘 도망 다녀서 플레이어들의 짜증을 유발했기 때문에, 소수만 남았을때는 플레이어들에게 돌진해서 장렬하게 산화하도록 유도했습니다. 이렇게 테스트 서버에서도 많은 문제점을 발견하고 수정해서 서비스가 가능한 수준으로 만들었습니다.

## 라이브 서비스의 기쁨과 슬픔

<br>
[![]({{"/assets/img/post/8fd765b30f5896a8f6eee727a1523a96874c72b4/4_거울전쟁.png"| relative_url}})](https://youtu.be/tAgHaXBv6hY?si=9TE61W1bOsFFPUno)

{:.center_div}
그림 4. 거울전쟁 (공식 홍보영상 : [https://youtu.be/tAgHaXBv6hY?si=9TE61W1bOsFFPUno](https://youtu.be/tAgHaXBv6hY?si=9TE61W1bOsFFPUno))
<br>
<br>


드디어 라이브 서비스에 AI를 선보이는 날이 되었습니다. 우리는 직접 게임서버에 들어가서 모니터링을 할 수 없기 때문에 유명 유튜버들이 거울전쟁 컨텐츠에 참여하는 생방송을 모니터링하며 플레이어들과 AI의 전투를 지켜보았습니다. 다행히 생각보다 열심히 참여를 해주셔서 재미있게 즐기고 있다는 느낌이 들었습니다.  
대규모로 몰려와서 순식간에 AI를 전멸시킨 혈맹도 있었고, 플레이어가 적은 낮시간에 던전을 점령한 AI를 물리치기 위해서 계속 죽으면서도 소수의 인원으로 AI를 공략해낸 혈맹도 있었습니다. 오픈한지 얼마 안된 서버에서도 AI가 등장했었는데, 슬프게도 고레벨 플레이어의 수가 적어서 AI가 기란감옥을 점령하는 일이 벌어지기도 했습니다.  
라이브 서비스를 진행하면서 플레이어들이 즐기는 모습에 뿌듯하기도 했지만 다음 서비스를 위한 보완점도 생각하게 되었습니다. 먼저 보강이 필요한 부분은 모니터링 시스템이었습니다. 게임 서버가 38개나 되어서 모든 서버의 상황을 지켜볼 수는 없기 때문에 이벤트가 발생한 이후 남은 로그를 자동으로 분석해서 문제점을 알려주는 시스템이 필요하다는 생각이 들었습니다. 또한 플레이어의 수준에 맞는 레벨인 AI가 출현하도록 난이도 조절 시스템도 필요해 보였습니다. 이렇게 떠오른 개선점들을 라이브 서비스를 진행하며 메모해두었고, 2022년 3월 거울전쟁 시즌2를 진행할 때 반영했습니다.


## 이후에 개발한 Contents 소개

거울전쟁을 출시한 이후에도 지속적으로 PC 리니지에 AI를 이용한 서비스를 출시했습니다. 

2022년 3월에는 거울전쟁 시즌2를 진행했습니다.  
2022년 8월에는 AI 캐릭터가 히든 보스로 나오는 기란 무한대전을 진행했습니다. 

![]({{"/assets/img/post/8fd765b30f5896a8f6eee727a1523a96874c72b4/5_이계침공.png"| relative_url}})

{:.center_div}
그림 5. 기란무한대전 
<br>

마지막으로 작년 10월에는 잊혀진섬:용병 컨텐츠를 출시했습니다.  
잊혀진섬:용병 에서는 AI 캐릭터가 용병으로 고용되어 고 레벨 사냥터인 잊혀진섬에서 플레이어의 사냥을 도와줍니다. 이 Contents를 즐기기 위해 플레이어들이 몰려서 평소보다 2배의 인원이 사냥터로 몰려왔다고 합니다. (자세한 내용은 "[MMORPG에서 유저와 함께 플레이하는 AI 용병 만들기](/ncresearch/1cee38b5f39928bc5962c02d1694506d7931adc8)"글을 통해 보실 수 있습니다!)

![]({{"/assets/img/post/8fd765b30f5896a8f6eee727a1523a96874c72b4/6_용병.png"| relative_url}})

{:.center_div}
그림 6. "잊혀진 섬" AI 용병 시스템 
<br>


## 마치며

작년 6월부터 올해 3월까지 9개월 동안 3개의 글에 걸쳐서 리니지에 AI 서비스를 만든 이야기를 나눠봤습니다. 당시에는 AI가 게임에 적용된 사례가 많지 않아서 참고할만한 사례가 별로 없었습니다. 그래서 여러 시행착오를 겪을 수밖에 없었지만 리니지 캠프의 적극적인 도움으로 무사히 서비스를 출시할 수 있었습니다. 이제는 게임에 AI가 적용된 사례가 다양하게 나오고 있어서 감회가 새롭습니다. 제가 여기 공유드린 내용은 시간이 좀 된 이야기지만 조금이라도 AI를 적용한 게임 서비스를 만드는데 도움이 되기를 바랍니다. 그동안 긴 글 읽어 주셔서 감사합니다.