import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import './css/Chat.css'; // Ensure this CSS file is linked

const genAi = new GoogleGenerativeAI("AIzaSyDfJBywDN6b8K68p92bynyWRCg_pJ-I-9E");
const model = genAi.getGenerativeModel({
  "model": "gemini-1.5-flash", // Ensure this is the correct model
});

const Chat = () => {
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Define a map of common inputs and their responses
  const predefinedResponses = {
    "hi": "Hello! How can I assist you today?",
    "hello": "Hi there! How can I help?",
    "good morning": "Good morning to you too! How are you today?",
    "good afternoon": "Good afternoon! How’s your day going?",
    "good evening": "Good evening! How was your day?",
    "how are you": "I'm doing great! Thanks for asking. How about you?",
    "bye": "Goodbye! Have a great day!",
    "thanks": "You're welcome! Feel free to ask if you need anything else.",
    "sorry": "No worries! How can I help?",
  };

  const handleSend = async () => {
    if (!userInput.trim()) return; // Prevent sending empty messages

    const userMessage = {
      type: 'user',
      text: userInput,
    };

    setMessages((prev) => [...prev, userMessage]); // Add user message to chat
    setUserInput(''); // Clear input
    setLoading(true); // Set loading state

    // Check if the input matches any predefined responses
    const normalizedInput = userInput.trim().toLowerCase();
    if (predefinedResponses[normalizedInput]) {
      // If input matches a predefined response, use it directly
      const aiMessage = {
        type: 'ai',
        text: predefinedResponses[normalizedInput],
      };
      setMessages((prev) => [...prev, aiMessage]);
      setLoading(false);
      return;
    }

    // If no predefined response, use the AI model
    const prompt = `Respond to the following message in a friendly and conversational tone: ${userInput}`;

    try {
      const response = await model.generateContent(prompt);
      const aiMessage = {
        type: 'ai',
        text: response.response.text().trim(),
      };

      setMessages((prev) => [...prev, aiMessage]); // Add AI response to chat
    } catch (error) {
      console.error('Error generating AI response:', error);
      const errorMessage = {
        type: 'ai',
        text: 'Sorry, I could not process your request. Please try again.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.type}`}>
            {msg.type === 'ai' ? (
              <div>{msg.text}</div>
            ) : (
              msg.text
            )}
          </div>
        ))}
        {loading && <div className="chat-message ai">Loading...</div>} {/* Loading indicator */}
      </div>

      <div className="input-container">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Say something..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
