---
layout: post
title: "LangChain에 대하여"
icon: tech
author: 3305e2d4ec867d5e010d94d4f1ce9b04192e023c
permalink: f4a00ed849299e3c91fb3244e74ea7f9b974ebb7
categories: NLP
tags: [langchain, llm, chatbot, NLP, AI, 랭체인, 챗봇]
excerpt: Langchain을 통해 LLM(Large Language Model)을 이용한 애플리케이션을 더 쉽게 만듭니다.
back_color: "#ffffff"
img_name: "img01.png"
toc: true
show: true
new: false
series: -1
index: 22
---

* 개요
* 해결하려는 문제
* 모듈
* 예제: 단순한 챗봇
* 예제: Agent
* 예제: 실제 LLM(OpenAI)로 Agent 실행
* 결론
* References
{:toc}


<br/>

# 개요

OpenAI의 ChatGPT 이래로 LLM(Large Language Model)은 AI, NLP 관련자들 뿐만 아니라 사회 전반적인 화제가 되고 있습니다.

[LangChain](https://docs.langchain.com/docs/)은 이런 LLM을 좀 더 쉽게 사용할 수 있도록 개념들을 추상화하여, LLM을 사용하면서 편리할만한 패턴들을 규격화시킨 프레임워크입니다.

이 글에서는 LangChain의 주요 모듈에 대한 간략한 설명과, LangChain이 어떤 편리함을 제공하고 어떻게 활용해볼 수 있을지 예제를 통해 알아보겠습니다.

LangChain은 [Javascript 버전](https://js.langchain.com/docs/)과 [Python](https://python.langchain.com/en/latest/) 버전을 제공하는데, 이 글은 이 둘 중에서 주로 Python을 사용하여 설명하겠습니다.

<br/>

# 해결하려는 문제

OpenAI의 ChatGPT, 혹은 Bing의 BingChat 같은 서비스를 사용해보면 채팅만 입력하면 바로 봇과 채팅하는 것 같이 사용할 수 있도록 편리한 인터페이스를 제공합니다. 하지만 그 뒤에 있는 중추적 기능인 LLM은 어떤 글에 대한 답이 될만한 글을 생성할 뿐이지 웹페이지에 채팅 형식으로 표시되기 위한 여러가지 밑작업까지 해결해주지는 않습니다.

LLM을 사용하여 챗봇을 구현하기 위해 필요한 작업들을 대략 나열해보자면 아래와 같습니다.

1. 챗봇의 정책을 세우기 위해 숨겨진 프롬프트를 지정하고 매 호출마다 LLM이 해당 내용을 최초에 제공받을 수 있게 합니다.
2. 대화의 맥락을 기억합니다.
3. 대화가 너무 길어지면 앞 부분을 자르거나 요약하는 등 LLM이 처리하기 용이한 사이즈를 유지하게 해줍니다.
4. LLM의 답변에서 인터넷에 접속하여 내용을 보충할 수 있을만한 부분을 인터넷에 접속하여 보충합니다. (Bing의 BingChat이나 Google의 Bard의 기능)

이러한 문제를 해결하기 위해서 LangChain은 여러 형태의 추상화된 인터페이스를 제공하고, 기본적으로 제공되는 구현을 사용하거나 혹은 자기가 원하는 정책을 직접 구현하여 연쇄적인 체인(Chain)의 한 부분으로 동작하게 할 수 있습니다. 또한 LangChain에는 챗봇 뿐만이 아니라, 연쇄적인 동작이 필요한 다른 시나리오도 해결하려고 하고 있습니다.

이러한 기능을 구현하는 데에 주축이 되는 중요한 모듈들에 대해 우선 설명하겠습니다.

<br/>

# 모듈

[LangChain의 문서](https://python.langchain.com/en/latest/index.html)의 목차에서는 가장 대표적인 것으로 아래의 모듈들을 명시하고 있습니다.

각 모듈들의 종류와 간략한 설명은 아래와 같습니다.

- Models:

  LLM을 나타냅니다. 질문을 넣으면 답변을 하거나, 미완성 된 문자열을 넣으면 완성을 하는 등의 기능을 제공합니다. LLM과 ChatModel이라는 클래스가 있는데, 2023년 6월 현재 ChatModel의 API가 확정되지 않아서 아직 Custom ChatModel을 만들 수 있는 방법이 제공되지 않고 있습니다. 이 글에서는 LLM 클래스만을 언급하겠습니다.

- Prompts:

  말그대로 LLM에 들어갈 프롬프트를 추상화시킨 템플릿입니다. 사용자에게는 일반적으로 노출하지 않는 숨겨진 프롬프트나 후에 언급할 Memory, 혹은 채팅의 경우 메시지 목록을 LLM에 입력할 수 있도록 문자열을 잘 조립하여 반환하는 기능을 제공합니다.

- Memory:

  채팅 기록이나 특정 시점에서 이전의 상호작용을 기억하기 위한 저장소와 같이 사용됩니다. 입력과 출력의 History를 저장하는 리스트라고 생각하면 됩니다.

- Indexes:

  LLM이 쉽게 접근할 수 있도록 문서에 접근하는 표준적인 인터페이스를 제공합니다. 이를테면 Retrievers가 있는데, 어떤 문자열을 주고 그 문자열과 관련된 Document(이 목록에는 없지만 Document 또한 LangChain에서 정의해놓은 클래스입니다)의 목록을 불러오는 기능을 제공합니다. 이 모듈에 대해서는 이 글에서는 자세히 다루지 않겠습니다.

- Chains:

  다른 모듈들을 묶어서 같이 맞물려 동작할 수 있도록 해주는 중심적인 모듈입니다. 체인을 생성하면서 해당 체인에 어떤 Model을 사용하고, 어떤 Prompt를 사용하고, 어떤 Memory를 사용할지 등등을 결정합니다.

- Agents:

  LLM이 직접 답하는 것이 아니라 다른 외부의 도구를 사용하는 것이 더 정확하거나 유용한 것들, 이를테면 수학적인 계산이나 잘 구조화 된 데이터의 조회(예시: 특정 배우의 나이, 출연작을 조회하고 싶다)같은 LLM 외부 기능이 필요할 때에 호출될 수 있는 인터페이스를 제공하는 모듈입니다. 도구의 호출 방식을 규격화하는 Tool이 같이 사용됩니다.

- Callbacks:

  LangChain의 각 동작 단계마다 hooking을 할 수 있도록 Callback을 제공합니다. 모니터링, 로깅이나 스트리밍에 관련된 기능이기 때문에 이 글에서는 자세히 다루지 않을 예정입니다.


<br/>

# 예제: 단순한 챗봇

<br/>

## 단순 질문-응답기

우선 테스트를 위해 가짜 LLM을 만들겠습니다.
공식 문서에서 [Custom LLM을 작성하는 방법](https://python.langchain.com/en/latest/modules/models/llms/examples/custom_llm.html)에 대해 설명하고 있습니다.

Custom LLM의 최소한의 구현은 `_call` 함수만 구현하면 됩니다.
실제 LLM을 통한 구현이라면 `_call` 함수의 인자로 받은 prompt를 LLM에 넘기는 등의 동작을 하겠지만, 이 예제에서는 무조건 초기화 할 때 `reply`로 주어진 문자열을 반환하도록 Custom LLM을 작성하였습니다.

```python
# custom_llm.py
from typing import Any, List, Mapping, Optional

from langchain.callbacks.manager import CallbackManagerForLLMRun
from langchain.llms.base import LLM

class CustomLLM(LLM):

    reply: str

    @property
    def _llm_type(self) -> str:
        return "custom"

    def _call(
        self,
        prompt: str,
        stop: Optional[List[str]] = None,
        run_manager: Optional[CallbackManagerForLLMRun] = None,
    ) -> str:
        return self.reply

    @property
    def _identifying_params(self) -> Mapping[str, Any]:
        """Get the identifying parameters."""
        return {"reply": self.reply}
```

위의 가짜 LLM 클래스를 테스트해 보려면 인스턴스를 만든 후 바로 함수처럼 호출하면 됩니다.

```python
llm = CustomLLM(reply='나는 제대로 된 LLM이 아니라서 항상 같은 대답만 합니다.')
print(llm('당신은 어떤 질문에 대해 답할 수 있습니까?'))
```

_출력:_

```
나는 제대로 된 LLM이 아니라서 항상 같은 대답만 합니다.
```

이 LLM을 사용하여 가장 간단한 Chain부터 점점 기능을 더하면서 진행하겠습니다.
우선은 가장 간단한, 프롬프트를 가질 뿐인 질문/답변 기능을 만들겠습니다.

```python
# app/ex01_basic.py
from langchain import PromptTemplate, LLMChain

from app.custom_llm import CustomLLM

llm = CustomLLM(reply='나는 제대로 된 LLM이 아니라서 항상 같은 대답만 합니다.')

template = """
당신은 AI 도우미로서 질의자 '사람'이 하는 질문에 대해서 성실하게 대답해야 합니다.
당신은 스스로가 가지지 않은 능력이 필요한 질문을 받았을 때에는 자신의 한계에 대해서 솔직하게 말해야 합니다.

사람: {question}
"""

prompt = PromptTemplate(
    input_variables=["question"],
    template=template,
)

chain = LLMChain(llm=llm, prompt=prompt, verbose=True)

if __name__ == '__main__':
    print(chain.run('당신은 어떤 능력을 가지고 있습니까?'))

```

_출력:_

```
> Entering new  chain...
Prompt after formatting:

당신은 AI 도우미로서 질의자 '사람'이 하는 질문에 대해서 성실하게 대답해야 합니다.
당신은 스스로가 가지지 않은 능력이 필요한 질문을 받았을 때에는 자신의 한계에 대해서 솔직하게 말해야
합니다.

사람: 당신은 어떤 능력을 가지고 있습니까?


> Finished chain.
나는 제대로 된 LLM이 아니라서 항상 같은 대답만 합니다.
```

위와 같이 PromptTemplate와 LLMChain을 이용하여 chain을 구성해 놓으면 `chain.run` 함수를 이용하여 질문만 바꿔가며 LLM에 여러가지 질문을 할 수 있습니다.
FastAPI나 Flask 같은 웹 프레임워크를 사용하면 이를 간단하게 서버로 만들어 테스트해볼 수도 있습니다.

```python
from fastapi import FastAPI

from app.ex01_basic import chain

app = FastAPI()

@app.get('/')
def answer_with_llm(question):
    return chain.run(question)
```

명령창:

```shell
$ uvicorn app.ex01_basic:app --reload
```

![]({{"/assets/img/post/f4a00ed849299e3c91fb3244e74ea7f9b974ebb7/img01.png"| relative_url}})
*"정말로 어떤 질문을 해도 똑같은 대답만 합니까?"라는 질문을 하면 "나는 제대로 된 LLM이 아니라서 항상 같은 대답만 합니다."라는 답변이 돌아오는 OpenAPI 테스트의 이미지*


<br/>

## 대화 맥락 기억하기

하지만 위에서 만든 chain은 대화의 맥락을 기억하지 못하고 하나의 질문에만 답할 수 있습니다.
ChatGPT 같은 서비스처럼 대화의 맥락을 LLM에게 전달하기 위해서는 지금까지 해온 모든 대화의 내용을 LLM에 전달할 필요가 있습니다.
이를 위해 존재하는 것이 Memory입니다.
Memory에서 기본적으로 사용하는 key와 맞추기 위해 template을 조금 변경한 뒤, 이 모두를 Chain에 연결하겠습니다.

```python
# app/ex02_memory.py
from pprint import pprint

from langchain import PromptTemplate
from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationChain

from app.custom_llm import CustomLLM

llm = CustomLLM(reply='나는 제대로 된 LLM이 아니라서 항상 같은 대답만 합니다.')

template = """
당신은 AI 도우미로서 질의자 '사람'이 하는 질문에 대해서 성실하게 대답해야 합니다.
당신은 스스로가 가지지 않은 능력이 필요한 질문을 받았을 때에는 자신의 한계에 대해서 솔직하게 말해야 합니다.

{history}
사람: {input}
"""

prompt = PromptTemplate(
    input_variables=["history", "input"],
    template=template,
)

memory = ConversationBufferMemory(human_prefix='사람', ai_prefix='AI')

chain = ConversationChain(llm=llm, prompt=prompt, memory=memory, verbose=True)

chain.predict(input='당신은 어떤 능력을 가지고 있습니까?')
chain.predict(input='정말 항상 같은 대답만 합니까?')
chain.predict(input='하지만 이전에 했던 대화들은 기억하고 있으리라 믿습니다.')
pprint(memory.chat_memory.messages)
```

_출력:_

```
> Entering new  chain...
Prompt after formatting:

당신은 AI 도우미로서 질의자 '사람'이 하는 질문에 대해서 성실하게 대답해야 합니다.
당신은 스스로가 가지지 않은 능력이 필요한 질문을 받았을 때에는 자신의 한계에 대해서 솔직하게 말해야 합니다.


사람: 당신은 어떤 능력을 가지고 있습니까?


> Finished chain.


> Entering new  chain...
Prompt after formatting:

당신은 AI 도우미로서 질의자 '사람'이 하는 질문에 대해서 성실하게 대답해야 합니다.
당신은 스스로가 가지지 않은 능력이 필요한 질문을 받았을 때에는 자신의 한계에 대해서 솔직하게 말해야 합니다.

사람: 당신은 어떤 능력을 가지고 있습니까?
AI: 나는 제대로 된 LLM이 아니라서 항상 같은 대답만 합니다.
사람: 정말 항상 같은 대답만 합니까?


> Finished chain.


> Entering new  chain...
Prompt after formatting:

당신은 AI 도우미로서 질의자 '사람'이 하는 질문에 대해서 성실하게 대답해야 합니다.
당신은 스스로가 가지지 않은 능력이 필요한 질문을 받았을 때에는 자신의 한계에 대해서 솔직하게 말해야 합니다.

사람: 당신은 어떤 능력을 가지고 있습니까?
AI: 나는 제대로 된 LLM이 아니라서 항상 같은 대답만 합니다.
사람: 정말 항상 같은 대답만 합니까?
AI: 나는 제대로 된 LLM이 아니라서 항상 같은 대답만 합니다.
사람: 하지만 이전에 했던 대화들은 기억하고 있으리라 믿습니다.


> Finished chain.
[HumanMessage(content='당신은 어떤 능력을 가지고 있습니까?', additional_kwargs={}, example=False),
 AIMessage(content='나는 제대로 된 LLM이 아니라서 항상 같은 대답만 합니다.', additional_kwargs={}, example=False),
 HumanMessage(content='정말 항상 같은 대답만 합니까?', additional_kwargs={}, example=False),
 AIMessage(content='나는 제대로 된 LLM이 아니라서 항상 같은 대답만 합니다.', additional_kwargs={}, example=False),
 HumanMessage(content='하지만 이전에 했던 대화들은 기억하고 있으리라 믿습니다.', additional_kwargs={}, example=False),
 AIMessage(content='나는 제대로 된 LLM이 아니라서 항상 같은 대답만 합니다.', additional_kwargs={}, example=False)]
```

ConversationBufferMemory는 Message의 리스트의 형태로 지난 입력과 출력들을 기억하고, 프롬프트의 history에는 기존 대화들을, input에는 이번 사용자 입력이 들어가게 해줍니다.
ConversationChain이 이러한 과정을 처리해줍니다.

Chain 생성시의 `verbose=True` 인자 때문에 `chain.predict`를 세 번 호출하면서 `{history}`에 기존 대화의 내용들이 누적되어 입력되는 것을 볼 수 있습니다.
마지막으로 `memory.chat_memory.messages`를 출력해보면 `HumanMessage`와 `AIMessage`가 번갈아가며 리스트 형태로 기억되고 있는 것을 볼 수 있습니다.
이러한 기능을 웹에서 사용하려면 사용자를 식별하여 접속 종료시 History를 DB에 보존하고 재접속시 다시 불러와서 초기화하는 추가적인 코드가 필요합니다.

그런 처리를 쉽게 하기 위하여 히스토리를 `dict`로 변환하거나 `dict`에서 히스토리를 생성하는 방법은 [문서에 관련 내용](https://python.langchain.com/en/latest/modules/memory/getting_started.html#saving-message-history)이 있습니다.

<br/>

## 길이 줄이기

챗봇 같은 서비스에서 LLM과 나누는 대화가 길어졌을 때, LLM에 모든 대화가 들어가면 물론 이상적이겠지만 성능이나 비용의 문제로 입력의 길이에 어느정도 제한을 두는 것이 현실적입니다.

이를 처리하는 가장 인기 있는 전략의 두가지 중 하나는 가장 최근의 몇 개 대화만을 LLM에 넘겨주는 것이고, 다른 하나는 앞의 내용을 LLM을 통하여 요약하는 방법이 있겠습니다.

두 가지 전략 모두 LangChain에 구현체가 있는데, 전자는 `ConversationBufferWindowMemory`라는 클래스로 구현되어 있고, 후자는 `ConversationSummaryMemory`나 `ConversationSummaryBufferMemory`가 있습니다.

이외에도 다른 전략이나 히스토리의 저장과 복구에 관련된 구현체가 존재합니다. Memory에 관한 [How-To Guides](https://python.langchain.com/en/latest/modules/memory/how_to_guides.html)에 관련 내용이 서술되어 있습니다.

이 글에서는 가장 간단한 `ConversationBufferWindowMemory`를 사용하겠습니다.

```python
# app/ex03_memwindow.py
from pprint import pprint

from langchain import PromptTemplate
from langchain.memory import ConversationBufferWindowMemory
from langchain.chains import ConversationChain

from app.custom_llm import CustomLLM

llm = CustomLLM(reply='나는 제대로 된 LLM이 아니라서 항상 같은 대답만 합니다.')

template = """
당신은 AI 도우미로서 질의자 '사람'이 하는 질문에 대해서 성실하게 대답해야 합니다.
당신은 스스로가 가지지 않은 능력이 필요한 질문을 받았을 때에는 자신의 한계에 대해서 솔직하게 말해야 합니다.

{history}
사람: {input}
"""

prompt = PromptTemplate(
    input_variables=["history", "input"],
    template=template,
)

memory = ConversationBufferWindowMemory(human_prefix='사람', ai_prefix='AI', k=3)

chain = ConversationChain(llm=llm, prompt=prompt, memory=memory, verbose=True)

chain.predict(input='당신의 기억력을 테스트하려고 합니다.')
for idx in range(10):
    chain.predict(input=f'이것은 {idx}번째 질문입니다.')
chain.predict(input="이제 몇 번째 전 대화까지 기억하고 있는지 보여주세요")

pprint(memory.chat_memory.messages)
```

_출력:_

```
> Entering new  chain...
Prompt after formatting:

당신은 AI 도우미로서 질의자 '사람'이 하는 질문에 대해서 성실하게 대답해야 합니다.
당신은 스스로가 가지지 않은 능력이 필요한 질문을 받았을 때에는 자신의 한계에 대해서 솔직하게 말해야 합니다.


사람: 당신의 기억력을 테스트하려고 합니다.


> Finished chain.


> Entering new  chain...
Prompt after formatting:

당신은 AI 도우미로서 질의자 '사람'이 하는 질문에 대해서 성실하게 대답해야 합니다.
당신은 스스로가 가지지 않은 능력이 필요한 질문을 받았을 때에는 자신의 한계에 대해서 솔직하게 말해야 합니다.

사람: 당신의 기억력을 테스트하려고 합니다.
AI: 나는 제대로 된 LLM이 아니라서 항상 같은 대답만 합니다.
사람: 이것은 0번째 질문입니다.


> Finished chain.

<...중략...>

> Finished chain.


> Entering new  chain...
Prompt after formatting:

당신은 AI 도우미로서 질의자 '사람'이 하는 질문에 대해서 성실하게 대답해야 합니다.
당신은 스스로가 가지지 않은 능력이 필요한 질문을 받았을 때에는 자신의 한계에 대해서 솔직하게 말해야 합니다.

사람: 이것은 7번째 질문입니다.
AI: 나는 제대로 된 LLM이 아니라서 항상 같은 대답만 합니다.
사람: 이것은 8번째 질문입니다.
AI: 나는 제대로 된 LLM이 아니라서 항상 같은 대답만 합니다.
사람: 이것은 9번째 질문입니다.
AI: 나는 제대로 된 LLM이 아니라서 항상 같은 대답만 합니다.
사람: 이제 몇 번째 전 대화까지 기억하고 있는지 보여주세요


> Finished chain.
[HumanMessage(content='당신의 기억력을 테스트하려고 합니다.', additional_kwargs={}, example=False),
 AIMessage(content='나는 제대로 된 LLM이 아니라서 항상 같은 대답만 합니다.', additional_kwargs={}, example=False),
 HumanMessage(content='이것은 0번째 질문입니다.', additional_kwargs={}, example=False),
 AIMessage(content='나는 제대로 된 LLM이 아니라서 항상 같은 대답만 합니다.', additional_kwargs={}, example=False),
 HumanMessage(content='이것은 1번째 질문입니다.', additional_kwargs={}, example=False),
 AIMessage(content='나는 제대로 된 LLM이 아니라서 항상 같은 대답만 합니다.', additional_kwargs={}, example=False),
 HumanMessage(content='이것은 2번째 질문입니다.', additional_kwargs={}, example=False),
 AIMessage(content='나는 제대로 된 LLM이 아니라서 항상 같은 대답만 합니다.', additional_kwargs={}, example=False),
 HumanMessage(content='이것은 3번째 질문입니다.', additional_kwargs={}, example=False),
 AIMessage(content='나는 제대로 된 LLM이 아니라서 항상 같은 대답만 합니다.', additional_kwargs={}, example=False),
 HumanMessage(content='이것은 4번째 질문입니다.', additional_kwargs={}, example=False),
 AIMessage(content='나는 제대로 된 LLM이 아니라서 항상 같은 대답만 합니다.', additional_kwargs={}, example=False),
 HumanMessage(content='이것은 5번째 질문입니다.', additional_kwargs={}, example=False),
 AIMessage(content='나는 제대로 된 LLM이 아니라서 항상 같은 대답만 합니다.', additional_kwargs={}, example=False),
 HumanMessage(content='이것은 6번째 질문입니다.', additional_kwargs={}, example=False),
 AIMessage(content='나는 제대로 된 LLM이 아니라서 항상 같은 대답만 합니다.', additional_kwargs={}, example=False),
 HumanMessage(content='이것은 7번째 질문입니다.', additional_kwargs={}, example=False),
 AIMessage(content='나는 제대로 된 LLM이 아니라서 항상 같은 대답만 합니다.', additional_kwargs={}, example=False),
 HumanMessage(content='이것은 8번째 질문입니다.', additional_kwargs={}, example=False),
 AIMessage(content='나는 제대로 된 LLM이 아니라서 항상 같은 대답만 합니다.', additional_kwargs={}, example=False),
 HumanMessage(content='이것은 9번째 질문입니다.', additional_kwargs={}, example=False),
 AIMessage(content='나는 제대로 된 LLM이 아니라서 항상 같은 대답만 합니다.', additional_kwargs={}, example=False),
 HumanMessage(content='이제 몇 번째 전 대화까지 기억하고 있는지 보여주세요', additional_kwargs={}, example=False),
 AIMessage(content='나는 제대로 된 LLM이 아니라서 항상 같은 대답만 합니다.', additional_kwargs={}, example=False)]
```

위의 출력 결과를 보면 프롬프트에는 Memory를 생성할 때 주어진 `k=3` 인자에 의해 가장 최근의 세 번의 대화만 입력되고 있는 것을 볼 수 있습니다.

하지만 LLM에게 제공하는 것이 마지막의 `k`개일 뿐, `pprint`의 출력 내용으로 확인할 수 있는 것처럼 History 객체는 모든 대화 내용을 보관하고 있습니다. 이는 웹 화면 같은 곳에서 사용자가 볼 채팅 내역과 상태가 일치하도록 하는 데 유용히 사용될 수 있습니다.

지금까지 이야기한 기능들과 더불어, 히스토리 저장과 복구에 관련된 `MongoDBChatMessageHistory` 클래스 등을 추가로 활용한다면 ChatGPT와 비슷한 기능을 구현하는 데에 필요한 도구들이 모두 Langchain에 있다는 것을 확인할 수 있습니다.

<br/>

# 예제: Agent

`AgentExecutor` 모듈은 특정한 형태로 조립된 Chain으로, 이미 특정한 형식의 숨겨진 Prompt를 갖고 있고, LLM의 답변을 파싱하고, 그 파싱한 결과를 통해 사용자의 추가 입력 없이도 도구를 호출하거나 다시 LLM을 호출하여 답을 도출해냅니다.

아래의 코드는 순서대로 정해진 답을 뱉는 가짜 LLM 구현을 활용하여 두 가지 Tool을 실행해보는 예제입니다.

```python
# app/ex04_agent.py
from langchain.agents import load_tools, initialize_agent, AgentType
from langchain.llms.base import LLM


class AgentCustomLLM(LLM):
    replies: list[str]
    cursor = 0

    @property
    def _llm_type(self) -> str:
        return "agent-custom"

    def _call(
        self,
        prompt: str,
        stop = None,
        run_manager = None,
    ) -> str:
        ret = self.replies[self.cursor]
        self.cursor += 1
        return ret

llm = AgentCustomLLM(replies=[
'''First, I need to run some python code.
Action: Python REPL
Action Input:
foo = 42
bar = foo + 42
print(bar)
''',
'''Second, I need to show how requests tool works.
Action: requests_get
Action Input: https://example.com/
''',
'''I've done what I was requested to do.
Final Answer: Done
''',
])
tools = load_tools(['python_repl', 'requests'])
agent = initialize_agent(tools, llm, agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION, verbose=True)

agent.run('적당한 Python 코드 실행 예제와 requests 실행 예제를 보여주세요.')
```

_출력:_

```
> Entering new  chain...

First, I need to run a python code.
Action: Python REPL
Action Input:
foo = 42
bar = foo + 42
print(bar)

Observation: 84

Thought:
Second, I need to show how requests tool works.
Action: requests_get
Action Input: https://example.com/

Observation: <!doctype html>
<html>
<head>
    <title>Example Domain</title>

    <meta charset="utf-8" />
    <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style type="text/css">
    body {
        background-color: #f0f0f2;
        margin: 0;
        padding: 0;
        font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;

    }
    div {
        width: 600px;
        margin: 5em auto;
        padding: 2em;
        background-color: #fdfdff;
        border-radius: 0.5em;
        box-shadow: 2px 3px 7px 2px rgba(0,0,0,0.02);
    }
    a:link, a:visited {
        color: #38488f;
        text-decoration: none;
    }
    @media (max-width: 700px) {
        div {
            margin: 0 auto;
            width: auto;
        }
    }
    </style>
</head>

<body>
<div>
    <h1>Example Domain</h1>
    <p>This domain is for use in illustrative examples in documents. You may use this
    domain in literature without prior coordination or asking for permission.</p>
    <p><a href="https://www.iana.org/domains/example">More information...</a></p>
</div>
</body>
</html>

Thought:
I've done what I was requested to do.
Final Answer: Done


> Finished chain.
```

Agent를 잘 설정하고 좋은 질문과 좋은 LLM만 있다면 질문 한 번으로 여러 번의 Tool 호출을 거쳐 AI가 스스로 단계별로 생각하는 것처럼 여러 작업을 수행할 수 있습니다.

`AgentExecutor`(`initialize_agent`가 반환하는 것이 이 클래스입니다)는 각 단계마다 LLM이 반환하는 값을 파싱하여 필요한 도구들을 호출합니다.

`AgentExecutor`가 원하는 형식을 알려면 숨겨진 프롬프트 내용을 보면 됩니다.

`_call` 함수에서 `prompt` 인자를 출력해보면 그 내용은 아래와 같습니다.

```
Answer the following questions as best you can. You have access to the following tools:

Python REPL: A Python shell. Use this to execute python commands. Input should be a valid python command. If you want to see the output of a value, you should print it out with `print(...)`.
requests_get: A portal to the internet. Use this when you need to get specific content from a website. Input should be a  url (i.e. https://www.google.com). The output will be the text response of the GET request.

Use the following format:

Question: the input question you must answer
Thought: you should always think about what to do
Action: the action to take, should be one of [Python REPL, requests_get]
Action Input: the input to the action
Observation: the result of the action
... (this Thought/Action/Action Input/Observation can repeat N times)
Thought: I now know the final answer
Final Answer: the final answer to the original input question

Begin!

Question: 적당한 Python 코드 실행 예제와 requests 실행 예제를 보여주세요.
Thought:
```

숨겨진 프롬프트를 확인하면 AgentExecutor는 Question, Thought, Action, Action Input과 같이 나눠서 기술해주기를 기대한다는 것을 알 수 있습니다.
만약 LLM으로부터 이 형식에 맞지 않는 문자열이 돌아온다면 Agent가 파싱 오류를 내뱉을 수 있으니 적절한 예외처리가 필요합니다.

AgentExecutor는 저 프롬프트를 이용해 Final Answer가 나올 때까지 계속해서 LLM과 Tool을 자동적으로 호출합니다.
따라서 BingChat과 같이 인터넷 상 문서들을 검색하는 기능을 자신의 애플리케이션에 구현하고 싶다면 Agent를 활용할 필요가 있습니다.

<br/>

# 예제: 실제 LLM(OpenAI)으로 Agent 실행

지금까지는 편의를 위해 완벽하게 통제할 수 있는 가짜 LLM만을 사용했습니다만, 마지막으로 OpenAI를 통해 실제로 잘 동작하는지 확인해보겠습니다.

아래의 코드는 OpenAI가 주어진 파이썬 코드를 보고 직접 실행결과를 유추하는 것이 아니라, Agent에게 적절한 도구를 요청해서 정확한 코드 실행 결과를 받아본 뒤 그 결과를 해석하는 형태로 진행되기를 기대하며 작성한 예제입니다.

```python
from langchain.llms import OpenAI
from langchain.agents import load_tools, initialize_agent, AgentType


llm = OpenAI()

tools = load_tools(["python_repl"])

agent = initialize_agent(
    tools,
    llm,
    agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
    verbose=True,
)

agent.run(
    """What will be printed if I execute following python code?

for i in range(5, 0, -1):
    print("*" * i)
"""
)

```

_출력:_

```
> Entering new  chain...
 I need to execute the code to see the output
Action: Python REPL
Action Input: for i in range(5, 0, -1):
    print("*" * i)
Observation: *****
****
***
**
*

Thought: I now know the final answer
Final Answer: Five lines of asterisks, each line with one fewer asterisk than the line before it.
```

체인의 진행과정을 살펴보면 의도대로 잘 동작했음을 확인할 수 있었습니다.
이 LLM 체인의 작동 과정은 다음과 같습니다.

1. Agent의 숨겨진 프롬프트에 사용할 수 있는 도구, 기대하는 답변 형식, 질문을 잘 삽입해서 OpenAI에 요청합니다.
2. OpenAI는 `python_repl` 도구를 사용하면 적절할 것 같고 그 도구의 인자로 질문자가 입력한 코드를 넣는 것이 좋을 것 같다고 답변합니다.
3. Agent가 OpenAI의 답변을 파싱하여 사용하려는 도구에 인자를 넣고 실행해 그 결과를 Observation에 넣어줍니다.
4. Observation 결과까지 더해서 다시 OpenAI에 요청합니다.
5. OpenAI는 기존 질문과 Observation의 내용을 보고 충분히 내용을 알 수 있다고 판단하였는지 Final Answer에 프린트 되는 내용을 설명합니다.
6. Agent는 Final Answer가 있는 것을 인식하여 이를 반환하고 체인이 종료됩니다.

약간 아쉬운 점이 있다면 예제에서 사용한 `ZERO_SHOT_REACT_DESCRIPTION` Agent는 사실상 OpenAI나 그와 비슷한 성능의 상업적인 LLM이 아니면 동작시키기가 꽤 힘들다는 것입니다.
GPT2, llama, vicuna 등의 무료로 사용할 수 있는 모델에 정밀한 설정 없이 사용할 경우, Agent가 요구하는 형식을 약간씩 어기거나, Observation(Action 실행의 결과)까지 자동완성해버리는 어처구니 없는 경우가 생겨서 운이 좋을 때에만 문제 없이 동작합니다.

<br/>

# 결론

LangChain은 LLM과 LLM을 활용하는 애플리케이션을 개발하는 데 필요한 여러가지 디자인 패턴을 표준화시키려고 노력하는 것으로 보입니다.
2023년 6월 현재 버전도 0.0.200 버전으로 아직 성숙하지 않았고, 이 글에서도 잠깐 언급한 바와 같이 `ChatModel`처럼 customize 가능하게 할 예정이 있지만 아직 그 규칙이 정해지지 않은 것도 있습니다.
이러한 미성숙한 단계임에도 실제로 쓸 법한 용례를 꽤 많이 고려하고 있다는 것이 문서나 예제에서 잘 보입니다.

그리고 (만약 잘 동작한다면) `Agent`가 명령 한 번에 여러 Tool을 오가며 마법처럼 여러가지 동작을 하는 것은 터미널 창에 지나가는 실행 과정 텍스트를 보는 것만으로 만족스러운 점이 있습니다.

여러 한계에도 불구하고 LLM을 활용하면서 자주 발생하는 전처리/후처리가 있거나, 도구를 통해 LLM을 보조하고 싶거나, 단계적으로 여러 번 LLM을 호출해야 할 필요가 있다면 LangChain의 인터페이스를 활용하여 문제를 정리하는 것은 설계의 교통정리에 꽤 도움이 될 듯 합니다. LLM으로 애플리케이션을 작성하는 데에 Langchain이 유용하게 사용될 수 있으리라 생각합니다.

<br/>

# References

* [https://python.langchain.com/en/latest/index.html](https://python.langchain.com/en/latest/index.html)

* [https://medium.com/databutton/getting-started-with-langchain-a-powerful-tool-for-working-with-large-language-models-286419ba0842](https://medium.com/databutton/getting-started-with-langchain-a-powerful-tool-for-working-with-large-language-models-286419ba0842)

* [https://revf.tistory.com/280](https://revf.tistory.com/280)
