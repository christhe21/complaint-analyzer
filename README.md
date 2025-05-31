# AI Complaint Analyzer 


## Getting Started
This is a complaint analyzer using AI summarization and categorization. Currently storing data to firestore database.  
Future Improvements include editing the complaint status, include RAG pipeline etc.

## Demo Img
![image](https://github.com/user-attachments/assets/c9a3bc06-75d8-46b9-a1a5-d5204a33ad38)
  Home Screen  

![image](https://github.com/user-attachments/assets/137dcfd1-787f-4f2f-ab91-72ff21a207ea)
  Analysis of the text message if it is a complaint!
  
![image](https://github.com/user-attachments/assets/6504a671-3f1f-456c-8d4d-1548077cf219)
  Not a complaint!

## Features
1. Use Llama Model and OpenRouter API for config.
2. Firebase Firestore Database for data storage.

## Dependencies
1. openai
2. firebase
3. mui
4. uuid
5. roboto font from mui

## Future Work: 
+ Backend: A Ruby on Rails server that handles API requests, processes consumer complaints, and interfaces with the AI model.
+ Database: PostgreSQL to store complaint data and category tags, with a separate vector database for RAG pipeline.
+ AI Integration: Use an LLM API to categorize complaints and generate summaries.
+ RAG Pipeline: Implement a pipeline that stores complaint vectors in a vector database, enabling quick retrieval of related complaints.
+ Deployment: Basic setup with a focus on AI functionality, ensuring the system can handle increased data loads for more complex use cases.



