# My AI Workflow

## LLM :

- GPT or Generative Pre-trained Transformer is a large language model or LLM.
- LLM is an instance of a foundational model. LLMs models are trained in large datasets of text, books, articles and conversation.
- A parameter is a value the model cal change independently as it learns, and the more parameters a model has, the more complex it can be. GPT-3 is pre-trained on 45 terabytes of data and use 175 billion ML parameters.
- LLM consists of the following concepts. Data, Architecture, and Training. Architecture ( neural network that transforms data and generates new text). This Architecture is trained on the large amount of data.

## Context Window :

- Context Window is equivalent to working memory. It determines how long of a conversation the LLM can carry out without forgetting details from earlier conversations.
- When a conversion goes beyond the context window, LLM would make guesseswhich results in Hallucinations.
- Context Windows are measured with Tokens.
- For Humans the smallest units of information that we use to represent language is single charater or number or symbol. Smallest unit of language that AI models use is a token.
- The tool that converts language to tokens is called Tokenizer.
- Context Length Size - It consists of UserInput, System Prompt, Model Response, attached Documents, Code snippets, and RAG.
- Larger Context Window leads to Challenges - Large context increases compute time, affects performance, safety issues.

## Agents :

- Models are limited to the data on which they are trained. Hard to adapt; we need to train the LLM with our data, and it will take resources. Models can be used for many tasks like summarizing documents, drafting emails, and reports.
- Compound AI system - Models become more powerful when we build a system around them. Systems like access to a database. The compound AI system is modular due to this its easy to adopt however, Models needs fine tunning.
- RAG is a compound AI system.
- When we are talking about answering a user's query, we have the following: Control Logic - Programmatic control logic( Thinking is faster), and another way is keeping LLM in charge ( Think slow ).
- LLM with an external system to help to solve the problems. We can use LLM agents.
- LLM Agents - Ability to plan, reason, and Act (via tools). Tools can be a search tool, a calculator, code to manipulate a database, another llm, API. Another capability is memory access.
- What happens when we configure a ReAct Agent ( RE - reason, Act ): User query -> Plan (think) -> Act (using tool), -> Observe (if not satisfied, go back to Plan until we get desired answers) -> Answer to user.

## MCP

- MCP stands for Multi-Context Processing.
- MCP allows the model to handle multiple contexts simultaneously, improving its ability to manage complex tasks and conversations.
- MCP can be used to integrate various data sources, tools, and memory systems, enhancing the model's overall performance and versatility.
- MCP is more than tools. Initial releases came with tools, resources, sampling. Later received features like authorization, tool annotations, Elicitation, URL Elicitation, step-up authorization, sampling with tools and MCP apps.
- MCP Apps can call tools from the MCP server to result in 'side-effects'( any action done by the app that affects the external environment).
- MCP servers with Apps include custom web components to visualize results.
- Apps can attach context to the conversation that set on foloowup messages.
- Apps can trigger the host to send messages to the LLM on behalf of the user(with approval).

## Ask, Edit and Agent - Overview on Github Copliot Chat modes. 
- 
