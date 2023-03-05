# ChatGPT

[2023.3.1부터 ChatGPT를 위한 API](https://openai.com/blog/introducing-chatgpt-and-whisper-apis)가 공식적으로 "gpt-3.5-turbo"로 지원되고 있습니다. 이것은 ["text-davinci-003" 모델](https://github.com/kyopark2014/ChatGPT/blob/main/text-davinci-003.md) 대비 90% 낮은 비용으로 사용할 수 있지만, 채팅중에 검색과 같은 기능은 제공하지 않습니다. 여기서 구현한 Architecture는 아래와 같습니다. 사용자는 CloudFront로 Chat을 위한 Web page을 오픈합니다. 이후 채팅 메시지를 입력하면, API-Gateway와 Lambda을 통해 OpenAI의 ChatGPT API를 호출합니다. 

<img width="519" alt="image" src="https://user-images.githubusercontent.com/52392004/222920792-95ea6da1-8632-4917-8060-dc845e5704ec.png">


## ChatGPT API

ChatGPT를 curl이용해 호출시 아래와 같은 결과를 얻을 수 있습니다. 

```java
curl https://api.openai.com/v1/chat/completions \
 -H "Authorization: Bearer sample-1234N6dQac0enXfPpCT3BlbkFJY4UE9yXdow54a78m2775" \
 -H "Content-Type: application/json" \
 -d '{
 "model": "gpt-3.5-turbo",
 "messages": [{"role": "user", "content": "What is the OpenAI mission?"}]
 }'

{"id":"chatcmpl-6qOKjDawBvE42BGRHZhztnnkeTgwh","object":"chat.completion","created":1677944613,"model":"gpt-3.5-turbo-0301","usage":{"prompt_tokens":14,"completion_tokens":80,"total_tokens":94},"choices":[{"message":{"role":"assistant","content":"\n\nAs an AI language model, I do not have a personal mission. However, OpenAI’s mission is to ensure that artificial intelligence benefits humanity as a whole. They aim to achieve this by researching and developing AI technologies that are safe, transparent, and aligned with human values. They also aim to share their research and findings with the broader community to encourage open and collaborative progress in AI research."},"finish_reason":null,"index":0}]}
```

### gpt-3.5-turbo 모델 사용하기

OpenAI가 제공하는 ChatGPT API인 "v1/chat/completions"로 HTTPS POST로 요청을 수행합니다. 이를 위해 여기서는 fetch를 사용합니다. 이때 ChatGPT에 전달하는 요청의 header에는 아래와 같이 Authorization과 Content-Type을 포함하여야 합니다. Authorization에 필요한 API Key는 OpenAPI: API Key에서 발급받아서 환경변수로 저장하여 사용합니다. 메시지 요청시 role로 "user",

```java
import fetch from 'node-fetch';

const apiKey = process.env.OPENAI_API_KEY

let msg = "";
const res = await fetch('https://api.openai.com/v1/chat/completions',{
  method: "POST",
  headers: {
    "Authorization": "Bearer "+apiKey,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    "model": "gpt-3.5-turbo",
    "messages": [
      {"role": "user", "content": prompt},
    ],
  }),
});

if (res.ok) {
  const data = await res.json();
  console.log("output: ", data.choices[0]);

  msg = data.choices[0].message.content;
  console.log("msg: "+ msg);
      
  return {
    statusCode: 200,
    msg: msg
  };    
}
```

## Deployment

소스를 다운로드 합니다. 

```java
git clone https://github.com/kyopark2014/ChatGPT
```

cdk 폴더로 이동하여 관련된 라이브러리를 설치합니다.

```java
cd ChatGPT/cdk-chat && npm install aws-cdk-lib path
```

"cdk-chat/lib/cdk-chat-stack.ts"파일에서 environment의 "OPENAI_API_KEY"를 업데이트 합니다. 처음 사용하는 경우에는 [OPENAI_API_KEY](https://platform.openai.com/account/api-keys)에서 API Key를 발급 받습니다.

![noname](https://user-images.githubusercontent.com/52392004/222936716-4f77bf71-9217-40af-a5dd-400e781d36d2.png)

이후, 아래와 같이 설치합니다.

```java
cdk deploy
```

## 실행결과

[index.mjs](https://github.com/kyopark2014/ChatGPT/blob/main/lambda-chat/index.mjs)와 같이 구현한 결과는 아래와 같습니다. 

아래와 같은 Output이 생성됩니다.

![image](https://user-images.githubusercontent.com/52392004/222920252-33c5b065-dadc-45a5-a167-9394ff1436eb.png)

여기서 접속하는 Web URL은 "https://dre57i7noiw1a.cloudfront.net/chat.html" 입니다. 접속후 아래와 같인 chatting을 수행할 수 있습니다.

#### 한국어 

![noname](https://user-images.githubusercontent.com/52392004/222921154-c9941cdd-69c2-4a32-88d3-3e21dade2764.png)



#### 영어 

![image](https://user-images.githubusercontent.com/52392004/222920699-78fdff76-9a3f-400d-b22e-4d15016796a1.png)




## Reference 

[Introducing ChatGPT and Whisper APIs](https://openai.com/blog/introducing-chatgpt-and-whisper-apis)

[OpenAI Node.js Library](https://github.com/openai/openai-node)

[Open-AI: API keys](https://platform.openai.com/account/api-keys)

[Open-AI: Making requests](https://platform.openai.com/docs/api-reference/making-requests)

[AWS Samples: aws-serverless-openai-chatbot-demo](https://github.com/aws-samples/aws-serverless-openai-chatbot-demo)

[AWS 기반으로 나만의 ChatGTP 앱을 만들어보겠습니다.](https://www.youtube.com/watch?v=zg0RHHd9_LI&t=431s)

[Let's build GPT: from scratch, in code, spelled out.](https://www.youtube.com/watch?v=kCc8FmEb1nY&t=2s): 자세히 다시 볼것 

[말을 알아듣는 AI가 일처리를 해준다고? ChatGPT 원리/사용법/미래 전망 및 우려 한방에 알아보기](https://www.youtube.com/watch?v=HfyG8QgrkMc): 아주 쉬운 

[nanoGPT](https://github.com/karpathy/nanoGPT): GPT2, 좋은 셈플

[GPT - Notebook](https://colab.research.google.com/drive/1JMLa53HDuA-i7ZBmqV7ZnA3c_fvtXnx-?usp=sharing)

[nanogpt-lecture](https://github.com/karpathy/ng-video-lecture): 상기 동영상과 연결


