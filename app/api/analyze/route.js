import { NextResponse } from 'next/server'
import OpenAI from 'openai'
import { v4 as uuidv4 } from 'uuid';
import { firestore } from "@/firebase";
import { collection, deleteDoc, getDoc, getDocs, query, setDoc, doc, addDoc } from "firebase/firestore";
const systemPrompt = `
Identify if the user's call transcript contains a complaint related to a banking or credit card issue. If it is a valid complaint, return ONLY the following JSON object with the details, and no other text:

{ "isComplaint": true,
  "description": "Brief summary of the complaint",
  "category": "Credit card" or "Banking service" or other relevant categories,
  "subCategory": "General-purpose credit card or charge card" or "Store credit card" or "Problem with convenience check" or other relevant sub-categories,
  "status": "pending"
}

If it is not a complaint, return {"isComplaint": false}.
`;
export async function POST(req) {
    const openai = new OpenAI(({
        baseURL: "https://openrouter.ai/api/v1",
        apiKey: "your api key"
    })) // Create a new instance of the OpenAI client
    const { transcript } = await req.json();

    const completion = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: transcript },
      ],
      model: 'meta-llama/llama-3.1-8b-instruct:free',
      stream: false,
    });
  
    // Extract the response from the choices array
    const result = completion.choices[0].message.content;
  
    try {
      const parsedResult = JSON.parse(result.trim());
  
      // Check if the response is a valid complaint
      if (parsedResult.isComplaint !== false) {
        const complaintId = uuidv4(); // Generate a unique ID for the complaint
  
        // Store the complaint in Firestore
        await addDoc(collection(firestore, "complaints"), {
          complaintId,
          description: parsedResult.description,
          category: parsedResult.category,
          subCategory: parsedResult.subCategory,
          status: parsedResult.status,
          createdAt: new Date(),
        });
  
        //console.log(`Complaint ${complaintId} stored successfully.`);
      }
    } catch (error) {
      console.error("Error processing or storing complaint:", error);
    }
  
    return new NextResponse(result);
  
}