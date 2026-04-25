import { useState, useEffect } from 'react';
import { 
  MessageSquare, Home, User, Settings, Folder, Search, 
  Phone, Video, MoreVertical, Paperclip, Smile, Send, Sun, Moon,
  PhoneIncoming, PhoneOutgoing, PhoneMissed, Volume2
} from 'lucide-react';

const mockChats = [
  { id: '1', name: 'أحمد هاشم', lastMessage: 'تم إرسال الملف المطلوب يا خالد...', time: 'الآن', active: true, avatar: 'أ' },
  { id: '2', name: 'سارة علي', lastMessage: 'هل سنلتقي في الموعد المحدد؟', time: '10:45 ص', active: false, avatar: 'س' },
  { id: '3', name: 'مجموعة العمل', lastMessage: 'ياسر: تم الانتهاء من التصميم', time: 'أمس', active: false, avatar: 'م' },
];

const mockCallHistory = [
    { id: '1', name: 'أحمد هاشم', type: 'incoming', time: '12:30 م' },
    { id: '2', name: 'سارة علي', type: 'missed', time: '10:00 ص' },
    { id: '3', name: 'ياسر', type: 'outgoing', time: 'أمس' },
];

export default function App() {
  const [selectedChat, setSelectedChat] = useState(mockChats[0]);
  const [darkMode, setDarkMode] = useState(false);
  const [messages, setMessages] = useState<Record<string, string[]>>({});
  const [newMessage, setNewMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [sidebarTab, setSidebarTab] = useState<'chats' | 'calls'>('chats');
  const [isVideoCallActive, setIsVideoCallActive] = useState(false);
  const [viewContact, setViewContact] = useState<any | null>(null);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    setMessages(prev => ({
      ...prev,
      [selectedChat.id]: [...(prev[selectedChat.id] || []), newMessage]
    }));
    setNewMessage('');
  };

  const addEmoji = (emoji: string) => {
    setNewMessage(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  const speakText = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ar-SA';
    window.speechSynthesis.speak(utterance);
  };

  const getCallIcon = (type: string) => {
    switch (type) {
        case 'incoming': return <PhoneIncoming className="w-4 h-4 text-green-500" />;
        case 'outgoing': return <PhoneOutgoing className="w-4 h-4 text-blue-500" />;
        case 'missed': return <PhoneMissed className="w-4 h-4 text-red-500" />;
        default: return null;
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#F1F5F9] dark:bg-slate-950 font-sans overflow-hidden" dir="rtl">
        {viewContact && (
            <div className="absolute inset-0 z-50 bg-black/60 flex items-center justify-center p-4" onClick={() => setViewContact(null)}>
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 w-full max-w-sm shadow-2xl space-y-4" onClick={e => e.stopPropagation()}>
                    <div className="flex items-center gap-4">
                        <div className="w-20 h-20 rounded-full bg-indigo-500 flex items-center justify-center text-white text-3xl font-bold">
                            {viewContact.avatar}
                        </div>
                        <div>
                            <h2 className="text-xl font-bold dark:text-white">{viewContact.name}</h2>
                            <p className="text-sm text-slate-500 dark:text-slate-400">تفاصيل الاتصال</p>
                        </div>
                    </div>
                    <div className="border-t border-slate-100 dark:border-slate-800 pt-4 space-y-2">
                        <p className="text-sm dark:text-slate-300">يوجد هنا تفاصيل أكثر حول الشخص.</p>
                        <p className="text-sm text-slate-400">رقم الهاتف: +966 5X XXX XXXX</p>
                        <p className="text-sm text-slate-400">البريد: {viewContact.name.replace(/\s+/g, '').toLowerCase()}@example.com</p>
                    </div>
                    <button onClick={() => setViewContact(null)} className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700">إغلاق</button>
                </div>
            </div>
        )}
        {isVideoCallActive && (
          <div className="absolute inset-0 z-50 bg-slate-900/90 flex flex-col items-center justify-center p-8">
            <div className="w-full max-w-4xl aspect-video bg-slate-800 rounded-3xl mb-8 flex items-center justify-center">
                <span className="text-white text-xl">جاري الاتصال بـ {selectedChat.name}... (كامييرا معطلة في العرض التوضيحي)</span>
            </div>
            <button onClick={() => setIsVideoCallActive(false)} className="bg-red-500 text-white p-4 rounded-full">إيقاف المكالمة</button>
          </div>
        )}
        {/* Navigation Rail */}
        <nav className="w-20 bg-[#0F172A] dark:bg-slate-900 flex flex-col items-center py-8 gap-10 shrink-0 shadow-xl">
          <div className="w-12 h-12 bg-indigo-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div className="flex flex-col gap-8">
            <Home className="text-indigo-400 cursor-pointer w-6 h-6" />
            <User className="text-slate-400 opacity-60 hover:opacity-100 cursor-pointer w-6 h-6" />
            <Settings className="text-slate-400 opacity-60 hover:opacity-100 cursor-pointer w-6 h-6" />
            <Folder className="text-slate-400 opacity-60 hover:opacity-100 cursor-pointer w-6 h-6" />
            <button onClick={() => setDarkMode(!darkMode)} className="text-slate-400 opacity-60 hover:opacity-100 cursor-pointer w-6 h-6">
              {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
            </button>
          </div>
          <div className="mt-auto">
            <div className="w-10 h-10 rounded-full bg-slate-700 border-2 border-slate-600"></div>
          </div>
        </nav>
        <aside className="w-80 bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 flex flex-col shrink-0">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">{sidebarTab === 'chats' ? 'المحادثات' : 'سجل المكالمات'}</h1>
            <div className="flex gap-2 mb-6">
                <button onClick={() => setSidebarTab('chats')} className={`flex-1 text-sm py-2 rounded-lg ${sidebarTab === 'chats' ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>الدردشات</button>
                <button onClick={() => setSidebarTab('calls')} className={`flex-1 text-sm py-2 rounded-lg ${sidebarTab === 'calls' ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>المكالمات</button>
            </div>
            {sidebarTab === 'chats' && (
                <div className="relative">
                  <input type="text" placeholder="البحث عن رسائل..." className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-xl py-3 pr-10 pl-4 text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-slate-800 dark:text-slate-100" />
                  <Search className="absolute right-3 top-3.5 text-slate-400 w-4 h-4" />
                </div>
            )}
          </div>

          <div className="flex-1 overflow-y-auto px-2">
            {sidebarTab === 'chats' ? (
                mockChats.map((chat) => (
              <div 
                    key={chat.id} 
                    className={`rounded-2xl p-4 flex items-center gap-4 cursor-pointer transition-colors ${selectedChat.id === chat.id ? 'bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800' : 'hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                  >
                    <div className="relative" onClick={() => setViewContact(chat)}>
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${chat.id === '1' ? 'bg-gradient-to-tr from-indigo-500 to-purple-500' : 'bg-slate-300 dark:bg-slate-700'}`}>
                        {chat.avatar}
                      </div>
                      {chat.active && <div className="absolute bottom-0 left-0 w-3.5 h-3.5 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full"></div>}
                    </div>
                    <div className="flex-1 min-w-0" onClick={() => setSelectedChat(chat)}>
                      <div className="flex justify-between mb-1">
                        <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm truncate">{chat.name}</h3>
                        <span className={`text-[10px] ${selectedChat.id === chat.id ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'} font-medium`}>{chat.time}</span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{chat.lastMessage}</p>
                    </div>
                  </div>
                ))
            ) : (
                mockCallHistory.map((call) => (
                    <div key={call.id} className="rounded-2xl p-4 flex items-center gap-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors" onClick={() => setViewContact(call)}>
                        <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-500">
                             {getCallIcon(call.type)}
                        </div>
                        <div className="flex-1 min-w-0" onClick={() => setViewContact(call)}>
                            <div className="flex justify-between mb-1">
                                <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm truncate">{call.name}</h3>
                                <span className="text-[10px] text-slate-400">{call.time}</span>
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 capitalize">{call.type}</p>
                        </div>
                    </div>
                ))
            )}
          </div>
        </aside>

        {/* Main Chat Window */}
        <main className="flex-1 flex flex-col bg-[#F8FAFC] dark:bg-slate-950">
          {/* Header */}
          <header className="h-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold">{selectedChat.avatar}</div>
              <div>
                <h2 className="font-bold text-slate-800 dark:text-slate-100">{selectedChat.name}</h2>
                <span className="text-xs text-green-500 flex items-center gap-1">متصل الآن</span>
              </div>
            </div>
            <div className="flex gap-4">
              <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"><Phone className="w-5 h-5" /></button>
              <button onClick={() => setIsVideoCallActive(true)} className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"><Video className="w-5 h-5" /></button>
              <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"><MoreVertical className="w-5 h-5" /></button>
            </div>
          </header>


          {/* Message Area */}
          <div className="flex-1 p-8 space-y-6 overflow-y-auto">
            <div className="flex justify-center">
              <span className="text-[11px] bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-3 py-1 rounded-full uppercase tracking-wider">اليوم</span>
            </div>
            {(messages[selectedChat.id] || []).map((msg, i) => (
                <div 
                    key={i} 
                    className="flex flex-row-reverse items-end gap-3 max-w-[70%] mr-auto group"
                >
                    <div className="w-8 h-8 rounded-full bg-indigo-500 flex-shrink-0 text-white flex items-center justify-center text-xs">أ</div>
                    <div className="bg-indigo-600 p-4 rounded-2xl rounded-bl-none shadow-md shadow-indigo-100 dark:shadow-none flex items-center gap-2">
                        <p className="text-sm text-white leading-relaxed">{msg}</p>
                        <button onClick={() => speakText(msg)} className="text-white/70 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                            <Volume2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            ))}
            {(messages[selectedChat.id] || []).length === 0 && (
                <div className="text-center text-slate-400 dark:text-slate-600 text-sm italic">لا توجد رسائل حالياً في {selectedChat.name}</div>
            )}
          </div>

          {/* Input Area */}
          <div className="h-24 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 p-6">
            <div className="relative max-w-4xl mx-auto flex items-center gap-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-2">
              {showEmojiPicker && (
                <div className="absolute bottom-16 right-0 bg-white dark:bg-slate-800 p-2 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 grid grid-cols-4 gap-2">
                    {['😀', '😂', '😍', '👍', '👏', '🔥', '🎉', '😊'].map(emoji => (
                        <button key={emoji} onClick={() => addEmoji(emoji)} className="hover:bg-slate-100 dark:hover:bg-slate-700 p-2 rounded text-lg">{emoji}</button>
                    ))}
                </div>
              )}
              <button className="text-slate-400 hover:text-indigo-500 dark:hover:text-indigo-400"><Paperclip className="w-5 h-5" /></button>
              <input 
                type="text" 
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="اكتب رسالتك هنا..." 
                className="flex-1 bg-transparent border-none outline-none text-sm text-slate-700 dark:text-slate-200 py-2" 
              />
              <button onClick={() => setShowEmojiPicker(!showEmojiPicker)} className="text-slate-400 hover:text-indigo-500 dark:hover:text-indigo-400"><Smile className="w-5 h-5" /></button>
              <button onClick={handleSendMessage} className="bg-indigo-600 text-white w-10 h-10 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200 dark:shadow-none hover:bg-indigo-700">
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </main>
    </div>
  );
}
