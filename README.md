# ChatGPT

[2023.3.1부터 ChatGPT를 위한 API](https://openai.com/blog/introducing-chatgpt-and-whisper-apis)가 공식적으로 "gpt-3.5-turbo"로 지원되고 있습니다. 이것은 ["text-davinci-003" 모델](https://github.com/kyopark2014/ChatGPT/blob/main/text-davinci-003.md) 대비 90% 낮은 비용으로 사용할 수 있지만, 채팅중에 검색과 같은 기능은 제공하지 않습니다. 

여기서 구현한 Architecture는 아래와 같습니다. 사용자는 CloudFront로 Chat을 위한 Web page을 오픈합니다. 이후 채팅 메시지를 입력하면, API Gateway와 Lambda을 통해 OpenAI의 ChatGPT API를 호출합니다. 상세 시나리오는 아래와 같습니다.

1) 사용자는 CloudFront를 통해 S3에 있는 html 파일을 로드합니다. 
2) 웹브라우저에서 ChatGPT를 향해 메시지를 전송합니다. CORS를 위해 여기서 javascript의 destination은 CloudFront의 도메인입니다. 
3) Chat 메시지는 "/chat" 리소스로 POST방식으로 JSON 파일을 전송하여, RESTful 방식으로 동작합니다. 
4) API Gateway로 들어온 요청(Request)가 들어오면 Lambda로 전송합니다.
5) Lambda는 text를 parsing하여 ChatGPT API로 요청을 수행합니다.
6) ChatGPT의 결과가 Lambda로 전달됩니다. Lambda의 응답은 상기 라우팅을 따라 200OK 응답으로 전달됩니다. 

<img width="607" alt="image" src="https://user-images.githubusercontent.com/52392004/222997842-2fe132d3-f8ba-4158-943d-27696687846b.png">




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

OpenAI가 제공하는 ChatGPT API인 "v1/chat/completions"로 HTTPS POST로 요청을 수행합니다. 이를 위해 여기서는 [fetch](https://www.npmjs.com/package/node-fetch)를 사용합니다. 이때 ChatGPT에 전달하는 요청의 header에는 아래와 같이 Authorization과 Content-Type을 포함하여야 합니다. Authorization에 필요한 API Key는 [OpenAI: API Key](https://platform.openai.com/account/api-keys)에서 발급받아서 환경변수로 저장하여 사용합니다. 메시지 요청시 role은 [ChatGPT API Transition Guide](https://help.openai.com/en/articles/7042661-chatgpt-api-transition-guide)에 따라 "user", "system", "assistant"로 지정할 수 있습니다.

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

### Client에서 Chat API 활용하기

[chat.js](https://github.com/kyopark2014/ChatGPT/blob/main/html/chat.js)와 같이 Client는 Chat 서버에 RESTful 방식으로 아래와 같이 채팅 메시지를 전송하고 응답이 오면 수신 채팅 버블에 표시 합니다. 

```java
function sendRequest(text) {
    const uri = "chat";
    const xhr = new XMLHttpRequest();

    xhr.open("POST", uri, true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            response = JSON.parse(xhr.responseText);
            console.log("response: " + JSON.stringify(response));
            
            addReceivedMessage(response.msg)
        }
    };

    var requestObj = {"text":text}
    console.log("request: " + JSON.stringify(requestObj));

    var blob = new Blob([JSON.stringify(requestObj)], {type: 'application/json'});

    xhr.send(blob);            
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

![noname](https://user-images.githubusercontent.com/52392004/222937589-a50115a3-68ad-4a97-81e4-c6a0310a45f3.png)



Output의 Web URL을 접속하면 아래와 같이 ChatGPT와 chatting을 할 수 있습니다.

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


