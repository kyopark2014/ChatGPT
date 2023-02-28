# ChatGPT

## Open API Guide

아래와 같이 필요한 라이브러리를 설치합니다. 

For Python

```java
pip install openai
```

For Node.js

```java
npm install openai
```

### List models

[List models](https://platform.openai.com/docs/api-reference/models/list)을 통해 사용할 수 있는 모델을 확인합니다. 아래 API 호출시 내용이 너무 많으므로 [model.txt](https://github.com/kyopark2014/ChatGPT/blob/main/model.txt)에서 현재 사용할 수 있는 모델을 확인할 수 있습니다. 

```java
curl https://api.openai.com/v1/models \
  -H 'Authorization: Bearer YOUR_API_KEY' \
  -H 'OpenAI-Organization: org-ZWy3HyPztSeGQHR7WH8XbZEJ'
```  

### Create completion

[Create completion](https://platform.openai.com/docs/api-reference/completions/create)을 이용하여 OpenAI API를 호출합니다.

#### Curl 사용시 
```java
curl https://api.openai.com/v1/completions \
-H "Content-Type: application/json" \
-H "Authorization: Bearer YOUR_API_KEY" \
-d '{"model": "text-davinci-003", "prompt": "Say this is a test", "temperature": 0, "max_tokens": 7}'
```

#### Code로 요청시 

Example with the [openai Node.js package](https://platform.openai.com/docs/api-reference/requesting-organization)에서 상세한 정보를 확인할 수 있습니다.

for Python

```python
import os
import openai
openai.organization = "org-ZWy3HyPztSeGQHR7WH8XbZEJ"
openai.api_key = os.getenv("OPENAI_API_KEY")
openai.Model.list()
```

for Node.js

```java
import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
    organization: "org-ZWy3HyPztSeGQHR7WH8XbZEJ",
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const response = await openai.listEngines();
```

#### Parameters

- model: ID of the model to use. You can use the List models API to see all of your available models, or see our Model overview for descriptions of them.
- prompt: The prompt(s) to generate completions for, encoded as a string, array of strings, array of tokens, or array of token arrays.
- suffix: The suffix that comes after a completion of inserted text. Defaults to null
- max_tokens: The maximum number of tokens to generate in the completion. default는 16
- temperature: What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic. Defaults to 1
- top_p: An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered. Defaults to 1
- frequency_penalty: Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim. Defaults to 0
- presence_penalty: Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.



## Reference 
[Open-AI: API keys](https://platform.openai.com/account/api-keys)

[Open-AI: Making requests](https://platform.openai.com/docs/api-reference/making-requests)

[Let's build GPT: from scratch, in code, spelled out.](https://www.youtube.com/watch?v=kCc8FmEb1nY&t=2s): 자세히 다시 볼것 

[말을 알아듣는 AI가 일처리를 해준다고? ChatGPT 원리/사용법/미래 전망 및 우려 한방에 알아보기](https://www.youtube.com/watch?v=HfyG8QgrkMc): 아주 쉬운 

[nanoGPT](https://github.com/karpathy/nanoGPT): GPT2, 좋은 셈플

[GPT - Notebook](https://colab.research.google.com/drive/1JMLa53HDuA-i7ZBmqV7ZnA3c_fvtXnx-?usp=sharing)

[nanogpt-lecture](https://github.com/karpathy/ng-video-lecture): 상기 동영상과 연결

[AWS 기반으로 나만의 ChatGTP 앱을 만들어보겠습니다.](https://www.youtube.com/watch?v=zg0RHHd9_LI&t=431s)

[aws-serverless-openai-chatbot-demo](https://github.com/aws-samples/aws-serverless-openai-chatbot-demo)
