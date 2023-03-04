# ChatGPT

[Introducing ChatGPT and Whisper APIs](https://openai.com/blog/introducing-chatgpt-and-whisper-apis)와 같이 2023.3.1부터 공식직으로 "gpt-3.5-turbo"이 지원됨으로해서 ["text-davinci-003" 모델](https://github.com/kyopark2014/ChatGPT/blob/main/text-davinci-003.md)을 대체하게 되었습니다. 

## API

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

[Introducing ChatGPT and Whisper APIs](https://openai.com/blog/introducing-chatgpt-and-whisper-apis)

[OpenAI Node.js Library](https://github.com/openai/openai-node)
