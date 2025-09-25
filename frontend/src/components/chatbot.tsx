import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageSquare, Send, X } from 'lucide-react';

// Define the structure of a message
interface Message {
  from: 'user' | 'bot';
  text: string;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([
    { from: 'bot', text: 'Hello! I am the KolamKar assistant. How can I help you create something beautiful today?' }
  ]);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Effect to scroll to the bottom of the chat window when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { from: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Add a placeholder for the bot's response
    setMessages(prev => [...prev, { from: 'bot', text: '' }]);

    // Use EventSource for Server-Sent Events (SSE)
    const eventSource = new EventSource(`/api/chatbot/stream?message=${encodeURIComponent(input)}`);

    eventSource.onmessage = (event) => {
      if (event.data === '[DONE]') {
        setIsLoading(false);
        eventSource.close();
        return;
      }
      
      try {
        const token = JSON.parse(event.data);
        setMessages(prevMessages => {
          const lastMessage = prevMessages[prevMessages.length - 1];
          if (lastMessage && lastMessage.from === 'bot') {
            const updatedMessages = [...prevMessages];
            updatedMessages[prevMessages.length - 1] = {
              ...lastMessage,
              text: lastMessage.text + token,
            };
            return updatedMessages;
          }
          return prevMessages;
        });
      } catch (error) {
        console.error("Failed to parse event data:", event.data);
      }
    };

    eventSource.onerror = () => {
      setMessages(prevMessages => {
          const lastMessage = prevMessages[prevMessages.length - 1];
          if (lastMessage && lastMessage.from === 'bot') {
            const updatedMessages = [...prevMessages];
            updatedMessages[prevMessages.length - 1] = {
              ...lastMessage,
              text: "Oops! I seem to be having trouble connecting. Please try again in a moment.",
            };
            return updatedMessages;
          }
          return prevMessages;
        });
      setIsLoading(false);
      eventSource.close();
    };
  };

  return (
    <>
      {/* Chat Bubble Toggle */}
      <div className="fixed bottom-5 right-5 z-[9999]">
        <Button onClick={() => setIsOpen(!isOpen)} size="icon" className="rounded-full w-14 h-14 shadow-lg">
          {isOpen ? <X /> : <MessageSquare />}
        </Button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-5 w-80 h-96 bg-card shadow-xl rounded-lg flex flex-col z-[9999] border animate-slide-up">
          {/* Header */}
          <div className="p-3 bg-primary text-primary-foreground rounded-t-lg">
            <h3 className="font-bold text-center">KolamKar Assistant</h3>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto">
            {messages.map((msg, index) => (
              <div key={index} className={`flex mb-3 ${msg.from === 'bot' ? 'justify-start' : 'justify-end'}`}>
                <div className={`rounded-lg px-3 py-2 max-w-[85%] break-words ${msg.from === 'bot' ? 'bg-muted' : 'bg-primary text-primary-foreground'}`}>
                  {msg.text}
                  {/* Blinking cursor for loading state */}
                  {isLoading && msg.from === 'bot' && index === messages.length - 1 && (
                     <span className="inline-block w-2 h-4 ml-1 bg-primary animate-pulse" />
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-2 border-t flex">
            <Input
              type="text"
              placeholder="Ask about Kolam..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              disabled={isLoading}
              className="flex-1"
            />
            <Button onClick={handleSend} size="icon" className="ml-2" disabled={isLoading}>
              <Send size={18}/>
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;