// const aws = require('aws-sdk');
import * as aws from 'aws-cdk';
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

exports.handler = async (event, context) => {
    //console.log('## ENVIRONMENT VARIABLES: ' + JSON.stringify(process.env));
    //console.log('## EVENT: ' + JSON.stringify(event))

    try {
    const response = await openai.createCompletion({
      model: params.model_name,
      prompt: prompt,
      temperature: params.temperature, // Higher values means the model will take more risks.
      max_tokens: params.max_tokens, // The maximum number of tokens to generate in the completion. 
      top_p: params.top_p, // alternative to sampling with temperature, called nucleus sampling
      frequency_penalty: params.frequency_penalty, //decreasing the model's likelihood to repeat the same line verbatim.
      presence_penalty: params.presence_penalty, // increasing the model's likelihood to talk about new topics.
    });
    return {
      statusCode: 200,
      body: JSON.stringify({id:body.id,
        bot:response.data.choices[0].text}),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error || "Something wrong"),
    };
  }
};