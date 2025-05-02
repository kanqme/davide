import React, { useState, useEffect, useRef } from 'react';

interface Message {
  sender: 'nonno' | 'studente';
  text: string;
}

const messages: Message[] = [
  { sender: 'nonno', text: "👋 Ciao! Sono pronto per imparare!" },
  { sender: 'studente', text: "🙌 Ciao Nonno! Iniziamo con accendere il PC!" },
  { sender: 'nonno', text: "✅ Fatto! E ora?" },
  { sender: 'studente', text: "🌐 Apri il browser, ti spiego come navigare!" },
  { sender: 'nonno', text: "🎉 Che bello, sto imparando tantissime cose nuove!" },
];

const TypingIndicator: React.FC = () => (
  <div className="flex items-center space-x-1 p-2">
    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
  </div>
);

const AnimatedChat: React.FC = () => {
  const [displayedMessages, setDisplayedMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [typingSender, setTypingSender] = useState<'nonno' | 'studente'>('nonno');
  const [animationComplete, setAnimationComplete] = useState(false);
  
  // Refs to store timeouts for cleanup
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const messageDisplayTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const nextMessageTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Effect to handle the animation sequence, triggered by currentMessageIndex change
  useEffect(() => {
    // If animation is complete or index is out of bounds, do nothing
    if (animationComplete || currentMessageIndex >= messages.length) {
      if (currentMessageIndex >= messages.length) {
        setAnimationComplete(true);
        setIsTyping(false); // Ensure typing indicator is off at the end
      }
      return;
    }

    // Clear previous timeouts before starting new ones
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    if (messageDisplayTimeoutRef.current) clearTimeout(messageDisplayTimeoutRef.current);
    if (nextMessageTimeoutRef.current) clearTimeout(nextMessageTimeoutRef.current);

    // Set who is typing for the current message
    setTypingSender(messages[currentMessageIndex].sender);
    
    // Show typing indicator
    setIsTyping(true);
    
    // After 1 second, hide typing and prepare to show the message
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      
      // Short delay before showing the message
      messageDisplayTimeoutRef.current = setTimeout(() => {
        setDisplayedMessages(prev => [...prev, messages[currentMessageIndex]]);
        
        // Schedule the next message after 2 seconds
        nextMessageTimeoutRef.current = setTimeout(() => {
          setCurrentMessageIndex(prev => prev + 1); // Increment index to trigger the effect for the next message
        }, 2000);
      }, 100); 
    }, 1000); // Typing indicator duration

    // Cleanup function for this effect instance
    return () => {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      if (messageDisplayTimeoutRef.current) clearTimeout(messageDisplayTimeoutRef.current);
      if (nextMessageTimeoutRef.current) clearTimeout(nextMessageTimeoutRef.current);
    };
    // Depend on currentMessageIndex to re-run the effect for the next message
  }, [currentMessageIndex, animationComplete]);

  // Effect for auto-scrolling
  useEffect(() => {
    const chatContainer = document.getElementById('chat-container');
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [displayedMessages, isTyping]);

  return (
    <div className="mt-8 mb-8 bg-dark-300/50 rounded-xl shadow-inner border border-accent-purple/20 overflow-hidden">
      {/* Chat header */}
      <div className="bg-dark-300 p-3 border-b border-gray-700 flex items-center">
        <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
        <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
        <div className="text-gray-300 text-sm font-medium ml-2">Chat Nonni Smart</div>
      </div>
      
      {/* Chat messages */}
      <div 
        id="chat-container"
        className="flex flex-col space-y-3 p-4 h-56 sm:h-64 overflow-y-auto"
        style={{ scrollBehavior: 'smooth' }}
      >
        {displayedMessages.map((msg, index) => (
          <div 
            key={index} 
            className={`flex ${msg.sender === 'studente' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
          >
            <div 
              className={`px-4 py-2 rounded-2xl max-w-[80%] text-sm md:text-base shadow-md ${ 
                msg.sender === 'studente' 
                  ? 'bg-gradient-to-r from-green-600 to-green-500 text-white rounded-br-none' 
                  : 'bg-gray-700 text-gray-100 rounded-bl-none'
              }`}
            >
              <span className="font-bold text-xs block mb-1">
                {msg.sender === 'nonno' ? 'Nonno' : 'Studente'}:
              </span>
              {msg.text}
            </div>
          </div>
        ))}
        
        {isTyping && !animationComplete && (
          <div className={`flex ${typingSender === 'studente' ? 'justify-end' : 'justify-start'}`}>
             <div className={`rounded-2xl ${typingSender === 'studente' ? 'bg-green-600 rounded-br-none' : 'bg-gray-700 rounded-bl-none'}`}>
               <div className="px-2 py-1 text-xs font-bold text-gray-300">
                 {typingSender === 'nonno' ? 'Nonno' : 'Studente'} sta scrivendo...
               </div>
               <TypingIndicator />
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnimatedChat;
