
import React, { useState, useRef, useEffect } from 'react';
import { Message } from './types';
import { getChefResponse } from './geminiService';
import MessageBubble from './components/MessageBubble';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'chef',
      text: "Chef says: Welcome to my chaotic kitchen! What flavor of nonsense should we cook today? 🍳✨",
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: input.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const chefReply = await getChefResponse(userMsg.text);
    
    const chefMsg: Message = {
      id: (Date.now() + 1).toString(),
      sender: 'chef',
      text: chefReply,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, chefMsg]);
    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="min-h-screen messy-bg flex flex-col items-center p-4 sm:p-6">
      {/* Header */}
      <header className="w-full max-w-2xl mb-6 text-center transform -rotate-1">
        <div className="bg-red-500 inline-block p-4 rounded-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] border-4 border-black">
          <h1 className="text-4xl sm:text-5xl font-bungee text-white tracking-tighter drop-shadow-lg">
            CHAOTIC KITCHEN
          </h1>
          <p className="text-red-100 font-bold mt-2 uppercase text-sm tracking-widest">
            Warning: Do not follow any advice 👩‍🍳💥
          </p>
        </div>
      </header>

      {/* Chat Area */}
      <main className="w-full max-w-2xl flex-1 flex flex-col bg-amber-50 rounded-3xl border-8 border-amber-900/10 shadow-2xl overflow-hidden relative">
        {/* Background Icons Decor */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex flex-wrap justify-around items-center p-10 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <i key={i} className={`fa-solid ${['fa-pizza-slice', 'fa-egg', 'fa-carrot', 'fa-ice-cream', 'fa-utensils'][i % 5]} text-8xl m-4`}></i>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 scrollbar-hide relative z-10">
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
          {isLoading && (
            <div className="flex justify-start mb-4">
              <div className="bg-white border-4 border-orange-500 rounded-2xl rounded-tl-none p-4 shadow-md flex items-center gap-3">
                <span className="text-2xl animate-spin">🍳</span>
                <span className="font-bold text-orange-600 animate-pulse">CHEF IS THROWING FLOUR...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t-4 border-amber-200">
          <div className="flex gap-2 relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask for a recipe or cooking tip..."
              className="flex-1 p-4 rounded-xl border-4 border-amber-400 focus:outline-none focus:border-red-500 font-bold text-gray-700 placeholder-gray-400 shadow-inner"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white p-4 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] transition-all active:translate-y-1 active:shadow-none border-b-4 border-red-800"
            >
              <i className="fa-solid fa-paper-plane text-xl"></i>
            </button>
          </div>
          <div className="mt-2 text-center">
            <span className="text-[10px] font-bold text-amber-800 uppercase tracking-tighter opacity-50">
              Kitchen status: Utterly Mad • Ingredients: Mostly Magic
            </span>
          </div>
        </div>
      </main>

      {/* Floating Kitchen Utensils for Vibe */}
      <div className="fixed bottom-10 right-10 hidden lg:block opacity-20 pointer-events-none transform rotate-12">
          <i className="fa-solid fa-spoon text-[150px] text-amber-900"></i>
      </div>
      <div className="fixed top-20 left-10 hidden lg:block opacity-20 pointer-events-none transform -rotate-45">
          <i className="fa-solid fa-blender text-[120px] text-amber-900"></i>
      </div>
    </div>
  );
};

export default App;
