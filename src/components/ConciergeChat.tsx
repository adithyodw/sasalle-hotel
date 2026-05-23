import { useState, useRef, useEffect } from 'react';
import { ChatMessage, Booking, HousekeepingRequest, InRoomDiningOrder, Language } from '../types';
import { Send, Sparkles, Coffee, RefreshCw, Thermometer, UserCheck, HelpCircle } from 'lucide-react';
import { DICTIONARY } from '../data';

interface ConciergeChatProps {
  language: Language;
  activeBooking: Booking | null;
  onUpdateBookingPrefs: (prefs: Partial<Booking['preferences']>) => void;
  onAddHousekeeping: (req: HousekeepingRequest) => void;
  onAddDining: (order: InRoomDiningOrder) => void;
}

export default function ConciergeChat({
  language,
  activeBooking,
  onUpdateBookingPrefs,
  onAddHousekeeping,
  onAddDining
}: ConciergeChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init',
      sender: 'concierge',
      text: 'Welcome to the Sasalle Grand Concierge registry. I am your quiet advisor for dining reservations, room control orchestration, and tailored Batam island wellness paths. How may I customize your stay context today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const guestMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'guest',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, guestMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      // API call to custom Express server
      const response = await fetch('/api/concierge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          prompt: textToSend,
          language,
          booking: activeBooking
        })
      });

      if (response.ok) {
        const data = await response.json();
        const aiMessage: ChatMessage = {
          id: `msg-${Date.now() + 1}`,
          sender: 'ai',
          text: data.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, aiMessage]);
      } else {
        throw new Error('Fallback offline model needed');
      }
    } catch (err) {
      // Beautiful offline fallback matching luxury European tone
      setTimeout(() => {
        let reply = '';
        const lowercaseText = textToSend.toLowerCase();

        if (lowercaseText.includes('dining') || lowercaseText.includes('eat') || lowercaseText.includes('food')) {
          reply = 'Our culinary hearth, The Brick & Iron, serves seasonal manifestations. I have logged your culinary interest and can immediately route an artisan tray to your room threshold. Please select from our guest macro shortcuts above to finalize.';
        } else if (lowercaseText.includes('temp') || lowercaseText.includes('cold') || lowercaseText.includes('warm') || lowercaseText.includes('climate')) {
          reply = 'Your climate nodes are calibrated dynamically. I can adjust your sanctuary temperature to your exact preference on your behalf.';
        } else if (lowercaseText.includes('spa') || lowercaseText.includes('massage') || lowercaseText.includes('wellness')) {
          reply = 'Our wellness sanctuarium recommends the Stone Bathing Ritual utilizing local river basalt, or the Hijau Nyonya Clay Wrap for physical mineral renewal. Shall I request a session opening?';
        } else {
          reply = `I have received your inquiry: "${textToSend}". Under Sasalle hospitality protocol, we preserve quietude. Your desire is being synchronized into the general concierge ledger for physical assistance shortly.`;
        }

        const aiMessage: ChatMessage = {
          id: `msg-${Date.now() + 2}`,
          sender: 'ai',
          text: reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, aiMessage]);
      }, 900);
    } finally {
      setIsLoading(false);
    }
  };

  // Direct in-app macro operations
  const triggerInRoomDining = (item: string, price: number) => {
    if (!activeBooking) {
      alert('In-Room Dining requires an active room reservation sequence.');
      return;
    }
    const order: InRoomDiningOrder = {
      id: `DIN-${Math.floor(100+Math.random()*900)}`,
      items: [{ item, price, quantity: 1 }],
      status: 'ordered',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    onAddDining(order);

    const confirmationMsg: ChatMessage = {
      id: `macro-${Date.now()}`,
      sender: 'concierge',
      text: `Order successfully logged against ${activeBooking.id}. **${item}** ($${price} USD) is now being firebuilt at The Brick & Iron kitchens. Expected room service delivery is within 25 minutes in silent cardboard chests.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, confirmationMsg]);
  };

  const triggerHousekeeping = (type: HousekeepingRequest['type'], label: string) => {
    if (!activeBooking) {
      alert('Housekeeping commands require an active room reservation sequence.');
      return;
    }
    const req: HousekeepingRequest = {
      id: `HK-${Math.floor(100+Math.random()*900)}`,
      type,
      status: 'requested',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    onAddHousekeeping(req);

    const confirmationMsg: ChatMessage = {
      id: `macro-${Date.now()}`,
      sender: 'concierge',
      text: `Your luxury housekeeping directive has been synced to the house floor. Your request for **${label} Service** has been prioritized for silent room entry.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, confirmationMsg]);
  };

  const triggerTempChange = (newTemp: number) => {
    if (!activeBooking) {
      alert('Climate control adjustment requires an active room reservation sequence.');
      return;
    }
    onUpdateBookingPrefs({ roomTemp: newTemp });
    
    const confirmationMsg: ChatMessage = {
      id: `macro-${Date.now()}`,
      sender: 'concierge',
      text: `Climate sensors successfully updated. Your sanctuary ambient target has been hardlocked to **${newTemp}°C**. Air convection modules are soundlessly adapting.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, confirmationMsg]);
  };

  return (
    <div className="bg-[#F5F1EA] text-[#0B0D10] flex flex-col h-full max-w-md mx-auto border border-[#0B0D10]/10 rounded-none relative">
      {/* Header Info */}
      <div className="bg-[#0B0D10] text-[#F5F1EA] p-4 flex items-center justify-between border-b border-[#0B0D10]/20 select-none">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#B89B5E] animate-pulse" />
          <span className="font-sans text-xs font-bold tracking-[0.15em] uppercase text-[#F5F1EA]">
            CONCIERGE LEDGER AI
          </span>
        </div>
        <span className="text-[9px] font-mono border border-[#F5F1EA]/20 px-2 py-0.5 opacity-80 uppercase text-[#B89B5E]">
          {activeBooking ? activeBooking.id : 'Lobby Terminal'}
        </span>
      </div>

      {/* Shortcuts Slider */}
      <div className="bg-[#0B0D10]/5 border-b border-[#0B0D10]/10 py-2.5 px-3 flex gap-2 overflow-x-auto no-scrollbar scroll-smooth select-none">
        {/* Dining */}
        <button
          id="btn-macro-dining-crab"
          onClick={() => triggerInRoomDining('Clay-Baked Batam Crab', 42)}
          className="flex items-center gap-1.5 px-3 py-1 bg-white border border-[#0B0D10]/15 rounded-none text-[10px] font-mono hover:border-[#7A3A2E] text-stone-700 font-bold whitespace-nowrap active:scale-95"
        >
          <Coffee size={11} className="text-[#7A3A2E]" />
          ORDER CRAB ($42)
        </button>

        <button
          id="btn-macro-dining-coffee"
          onClick={() => triggerInRoomDining('Sumatran Peaberry Press', 12)}
          className="flex items-center gap-1.5 px-3 py-1 bg-white border border-[#0B0D10]/15 rounded-none text-[10px] font-mono hover:border-[#7A3A2E] text-stone-700 font-bold whitespace-nowrap active:scale-95"
        >
          <Coffee size={11} className="text-[#B89B5E]" />
          PRESS SUMATRA COFFEE ($12)
        </button>

        {/* Housekeeping */}
        <button
          id="btn-macro-hk-turndown"
          onClick={() => triggerHousekeeping('turndown', 'Grand Turndown & Essential Oils')}
          className="flex items-center gap-1.5 px-3 py-1 bg-white border border-[#0B0D10]/15 rounded-none text-[10px] font-mono hover:border-[#7A3A2E] text-stone-700 font-bold whitespace-nowrap active:scale-95"
        >
          <RefreshCw size={11} className="text-[#7A3A2E]" />
          REQUEST TURNDOWN
        </button>

        <button
          id="btn-macro-hk-towels"
          onClick={() => triggerHousekeeping('towels', 'Egyptian Cotton Towels Replenish')}
          className="flex items-center gap-1.5 px-3 py-1 bg-white border border-[#0B0D10]/15 rounded-none text-[10px] font-mono hover:border-[#7A3A2E] text-stone-700 font-bold whitespace-nowrap active:scale-95"
        >
          <RefreshCw size={11} className="text-[#7A3A2E]" />
          FRESH TOWELS
        </button>

        {/* Temperature adjust */}
        <button
          id="btn-macro-temp-cool"
          onClick={() => triggerTempChange(20.0)}
          className="flex items-center gap-1.5 px-3 py-1 bg-white border border-[#0B0D10]/15 rounded-none text-[10px] font-mono hover:border-[#7A3A2E] text-stone-700 font-bold whitespace-nowrap active:scale-95"
        >
          <Thermometer size={11} className="text-blue-600" />
          COOL TO 20°C
        </button>

        <button
          id="btn-macro-temp-cozy"
          onClick={() => triggerTempChange(23.5)}
          className="flex items-center gap-1.5 px-3 py-1 bg-white border border-[#0B0D10]/15 rounded-none text-[10px] font-mono hover:border-[#7A3A2E] text-stone-700 font-bold whitespace-nowrap active:scale-95"
        >
          <Thermometer size={11} className="text-orange-600" />
          WARM TO 23.5°C
        </button>
      </div>

      {/* Messages Window */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 min-h-[300px] max-h-[480px]">
        {messages.map((msg) => {
          const isGuest = msg.sender === 'guest';
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isGuest ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] px-4 py-3 text-xs leading-relaxed transition-all ${
                  isGuest
                    ? 'bg-[#0B0D10] text-[#F5F1EA] rounded-none shadow-sm'
                    : msg.sender === 'ai'
                    ? 'bg-[#B89B5E]/10 text-[#0B0D10] border-l-2 border-[#B89B5E] rounded-none'
                    : 'bg-white border border-[#0B0D10]/10 text-stone-800 rounded-none'
                }`}
              >
                {/* Paragraph spacing inside messaging box */}
                <p className="whitespace-pre-wrap">{msg.text}</p>
              </div>
              <span className="text-[8px] font-mono text-[#0B0D10]/50 mt-1 uppercase">
                {msg.sender === 'guest' ? 'Guest' : msg.sender === 'ai' ? 'Sasalle AI' : 'House Concierge'} • {msg.timestamp}
              </span>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-center gap-2 text-xs font-mono text-[#7A3A2E] animate-pulse">
            <Sparkles size={14} className="animate-spin" />
            <span>Sasalle advisory node is writing...</span>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      {/* Input Tray */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage(inputText);
        }}
        className="p-3 bg-[#F5F1EA] border-t border-[#0B0D10]/10 flex gap-2"
      >
        <input
          type="text"
          id="input-chat-query"
          placeholder={DICTIONARY['chat_placeholder']?.[language] || 'Ask something...'}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          disabled={isLoading}
          className="flex-1 bg-white border border-[#0B0D10]/10 px-3.5 py-2 text-xs font-sans focus:outline-none focus:border-[#7A3A2E] disabled:opacity-50"
        />
        <button
          type="submit"
          id="btn-send-message"
          disabled={!inputText.trim() || isLoading}
          className="bg-[#0B0D10] text-white p-2.5 hover:bg-[#7A3A2E] disabled:opacity-50 select-none transition-colors"
        >
          <Send size={15} />
        </button>
      </form>
    </div>
  );
}
