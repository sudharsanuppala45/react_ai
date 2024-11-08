import React, { useState } from 'react';
import './css/Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
  const [isTyping, setIsTyping] = useState(false); // State to show loading
  const [botResponse, setBotResponse] = useState(""); // Bot's response

  // Function to handle sending emoji and simulate bot response
  const handleChatSend = (emoji) => {
    setIsTyping(true); // Set typing state when user sends an emoji

    // Simulate a bot response after a short delay
    setTimeout(() => {
      setIsTyping(false); // Stop typing after response
      if (emoji === '😊 Hello!') {
        setBotResponse("Hi there! How can I assist you today?");
      } else if (emoji === '🤔 How can I help you?') {
        setBotResponse("I'm here to chat. What do you need help with?");
      } else if (emoji === '🌟 Ask anything!') {
        setBotResponse("Feel free to ask me anything, I'm ready!");
      } else if (emoji === '💬 Let’s chat!') {
        setBotResponse("Let's get started! Tell me something.");
      }
    }, 1500); // Simulate a delay for bot response
  };

  return (
    <>
      {/* Chatbot Box */}
      <div className="chatbox">
        <div className="chatbox-header">
          <h3>Chat with AI 🤖</h3>
          <p>click below emojis to kniow about bot</p>
          <p>click below button to chat with bot</p>
        </div>
        <div className="chatbox-body">
          {isTyping ? (
            <div className="bot-message typing">
              <p>...</p> {/* Bot is "thinking" */}
            </div>
          ) : (
            botResponse && (
              <div className="bot-message">
                <p>{botResponse}</p>
              </div>
            )
          )}
        </div>
        <div className="chatbox-footer">
          {/* User-friendly emoji buttons */}
          <button className="emoji-button" onClick={() => handleChatSend('😊 Hello!')}>
            😊
          </button>
          <button className="emoji-button" onClick={() => handleChatSend('🤔 How can I help you?')}>
            🤔
          </button>
          <button className="emoji-button" onClick={() => handleChatSend('🌟 Ask anything!')}>
            🌟
          </button>
          <button className="emoji-button" onClick={() => handleChatSend('💬 Let’s chat!')}>
            💬
          </button>
        </div>
      </div>

      {/* AI Bot Link */}
      <div className="ai-bot-link">
        <Link to="/chat" className="ai-bot-button">Go to AI Bot 🤖</Link>
      </div>
      
<img src="/assets/images/chat-bot.gif" alt="Chatbot animation" className="chatbot-gif" />

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 Chatbot Hub | All rights reserved.</p>
      </footer>
    </>
  );
};

export default Home;
