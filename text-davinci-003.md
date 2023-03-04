# text-davinci-003 모델

## "text-davinci-003" 모델 

[Introducing ChatGPT and Whisper APIs](https://openai.com/blog/introducing-chatgpt-and-whisper-apis)와 같이 2023.3.1부터 공식직으로 "gpt-3.5-turbo"이 지원됨으로해서 "text-davinci-003"을 대체하게 되었습니다. "gpt-3.5-turbo"와 "text-davinci-003"은 거의 같은 성능을 가지나 훨씬 더 저렴하게 사용할 수 있습니다.

```text
Model: The ChatGPT model family we are releasing today, gpt-3.5-turbo, is the same model used in the ChatGPT product. It is priced at $0.002 per 1k tokens, which is 10x cheaper than our existing GPT-3.5 models. It’s also our best model for many non-chat use cases—we’ve seen early testers migrate from text-davinci-003 to gpt-3.5-turbo with only a small amount of adjustment needed to their prompts.
```

[ChatGPT API - Update](https://github.com/waylaidwanderer/node-chatgpt-api#updates)를 참조하면 아래와 같습니다. 

```text
Support for the official ChatGPT model has been added! You can now use the gpt-3.5-turbo model with the official OpenAI API, using ChatGPTClient. This is the same model that ChatGPT uses, and it's the most powerful model available right now. Usage of this model is not free, however it is 10x cheaper (priced at $0.002 per 1k tokens) than text-davinci-003.
```

#### Curl 사용시 
```java
curl https://api.openai.com/v1/completions \
-H "Content-Type: application/json" \
-H "Authorization: Bearer YOUR_API_KEY" \
-d '{"model": "text-davinci-003", "prompt": "Say this is a test", "temperature": 0, "max_tokens": 7}'
```


## Open API 라이브러리 설치

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

## 코드로 구현

### Create Completion

[Create completion](https://platform.openai.com/docs/api-reference/completions/create)을 이용하여 OpenAI API를 호출합니다. 여기서 사용한 
[OpenAI Node.js Library](https://github.com/openai/openai-node)은 "text-davinci-003"입니다. 

구현된 코드는 [index.mjs](https://github.com/kyopark2014/ChatGPT/blob/main/etc/text-davinci-003/index.mjs)입니다.

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

[Introducing ChatGPT and Whisper APIs](https://openai.com/blog/introducing-chatgpt-and-whisper-apis)

[OpenAI Node.js Library](https://github.com/openai/openai-node)
