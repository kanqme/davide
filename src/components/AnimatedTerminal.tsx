import React, { useState, useEffect, useRef } from 'react';

interface AnimatedTerminalProps {}

const AnimatedTerminal: React.FC<AnimatedTerminalProps> = () => {
  // State for terminal lines, current command index, typing progress, etc.
  const [lines, setLines] = useState<Array<{text: string; type: 'prompt' | 'command' | 'output'}>>([]);
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0);
  const [typingIndex, setTypingIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const terminalRef = useRef<HTMLDivElement>(null);

  const commands = [
    { cmd: 'pwd', output: '/home/studente' },
    { cmd: 'ls', output: 'Desktop  Documents  Downloads  Music  Pictures  Videos' },
    { cmd: 'cd Documents', output: '' }, // cd usually has no output
    { cmd: 'ls', output: 'Progetto_Scuola  Appunti_Linux.txt  esercizi.sh' },
    { cmd: 'nano appunti.txt', output: 'Simulating nano editor...\n\n# Appunti Linux\n- Comandi base: ls, cd, pwd, mkdir, rm\n- Gestione pacchetti: apt update, apt upgrade\n- Permessi: chmod, chown\n\n[Premi Ctrl+X per uscire]' }, 
    { cmd: 'sudo apt update', output: 'Hit:1 http://archive.ubuntu.com/ubuntu jammy InRelease\nGet:2 http://security.ubuntu.com/ubuntu jammy-security InRelease [110 kB]\nGet:3 http://archive.ubuntu.com/ubuntu jammy-updates InRelease [119 kB]\nFetched 229 kB in 1s (215 kB/s)\nReading package lists... Done' },
    { cmd: 'sudo apt upgrade', output: 'Reading package lists... Done\nBuilding dependency tree... Done\nReading state information... Done\nCalculating upgrade... Done\n0 upgraded, 0 newly installed, 0 to remove and 0 not upgraded.' }
  ];

  // Blink cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    
    return () => clearInterval(cursorInterval);
  }, []);

  // Simulate typing and command execution
  useEffect(() => {
    if (currentCommandIndex >= commands.length) return;
    
    const currentPrompt = currentCommandIndex === 0 ? 'studente@ubuntu:~$ ' : 
                          currentCommandIndex === 2 ? 'studente@ubuntu:~$ ' :
                          currentCommandIndex === 3 ? 'studente@ubuntu:~/Documents$ ' :
                          'studente@ubuntu:~/Documents$ ';
    
    // Add prompt if not already added
    if (!isTyping && lines.length === 0 || 
        (lines.length > 0 && lines[lines.length - 1].type !== 'prompt' && lines[lines.length - 1].type !== 'command')) {
      setLines(prev => [...prev, { text: currentPrompt, type: 'prompt' }]);
      setIsTyping(true);
      setTypingIndex(0);
      return;
    }
    
    const currentCommand = commands[currentCommandIndex].cmd;
    
    // Type the command character by character
    if (isTyping && typingIndex < currentCommand.length) {
      const typingTimeout = setTimeout(() => {
        setLines(prev => {
          const newLines = [...prev];
          const lastLineIndex = newLines.length - 1;
          
          if (lastLineIndex >= 0 && newLines[lastLineIndex].type === 'prompt') {
            // Start new line for command
            newLines.push({ text: currentCommand.substring(0, typingIndex + 1), type: 'command' });
          } else if (lastLineIndex >= 0 && newLines[lastLineIndex].type === 'command') {
            // Update existing command line
            newLines[lastLineIndex] = { 
              ...newLines[lastLineIndex], 
              text: currentCommand.substring(0, typingIndex + 1) 
            };
          } else {
             // Fallback: Add prompt first if missing
             newLines.push({ text: currentPrompt, type: 'prompt' });
             newLines.push({ text: currentCommand.substring(0, typingIndex + 1), type: 'command' });
          }
          
          return newLines;
        });
        
        setTypingIndex(prev => prev + 1);
      }, Math.random() * 100 + 50); // Random typing speed for realism
      
      return () => clearTimeout(typingTimeout);
    }
    
    // Command fully typed, show output after a delay
    if (isTyping && typingIndex >= currentCommand.length) {
      const executeTimeout = setTimeout(() => {
        const output = commands[currentCommandIndex].output;
        
        if (output) {
          setLines(prev => [...prev, { text: output, type: 'output' }]);
        }
        
        setIsTyping(false);
        setCurrentCommandIndex(prev => prev + 1);
        
        // Scroll to bottom
        if (terminalRef.current) {
          terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
      }, 500); // Delay before showing output
      
      return () => clearTimeout(executeTimeout);
    }
  }, [currentCommandIndex, isTyping, typingIndex, lines]);

  // Auto-scroll to bottom when new content is added
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  // Start the animation sequence after initial render
  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setLines([]);
      setCurrentCommandIndex(0);
      setIsTyping(false);
    }, 1000);
    
    return () => clearTimeout(startTimeout);
  }, []);

  return (
    <div className="mt-8 mb-8 overflow-hidden rounded-lg border border-accent-purple/30 shadow-lg">
      {/* Terminal header */}
      <div className="bg-gray-900 px-3 sm:px-4 py-2 flex items-center border-b border-gray-700">
        <div className="flex space-x-1.5 sm:space-x-2">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500"></div>
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500"></div>
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-gray-400 text-xs sm:text-sm mx-auto">Terminal - bash</div>
      </div>
      
      {/* Terminal content */}
      <div 
        ref={terminalRef}
        className="bg-gray-900 p-3 sm:p-4 font-mono text-xs sm:text-sm text-gray-200 h-64 sm:h-80 overflow-y-auto"
        style={{ 
          backgroundImage: 'linear-gradient(to bottom, #1a1b26, #1a1b26)',
          boxShadow: 'inset 0 0 30px rgba(0, 0, 0, 0.3)'
        }}
      >
        {lines.map((line, index) => (
          <div key={index} className="whitespace-pre-wrap break-words">
            {line.type === 'prompt' && (
              <span className="text-accent-blue">{line.text}</span>
            )}
            {line.type === 'command' && (
              <span className="text-white">{line.text}</span>
            )}
            {line.type === 'output' && (
              <div className="text-gray-300 ml-0 my-1">{line.text}</div>
            )}
            {index === lines.length - 1 && line.type === 'command' && showCursor && (
              <span className="text-white animate-pulse">▋</span>
            )}
          </div>
        ))}
        {lines.length === 0 && showCursor && (
          <div>
            <span className="text-accent-blue">studente@ubuntu:~$ </span>
            <span className="text-white animate-pulse">▋</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnimatedTerminal;
