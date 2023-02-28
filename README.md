# ChatGPT

## Open API

Install Library

For Python

```java
pip install openai
```

For Node.js

```java
npm install openai
```

```java
curl https://api.openai.com/v1/models \
  -H 'Authorization: Bearer YOUR_API_KEY' \
  -H 'OpenAI-Organization: org-ZWy3HyPztSeGQHR7WH8XbZEJ'
```  




```java
curl https://api.openai.com/v1/completions \
-H "Content-Type: application/json" \
-H "Authorization: Bearer YOUR_API_KEY" \
-d '{"model": "text-davinci-003", "prompt": "Say this is a test", "temperature": 0, "max_tokens": 7}'
```

Example with the [openai Node.js package](https://platform.openai.com/docs/api-reference/requesting-organization)

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
