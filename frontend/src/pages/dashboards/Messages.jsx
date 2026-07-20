import { useState, useRef, useEffect } from 'react';
import { Search, Phone, Video, Info, Paperclip, Smile, Send, Lock, Clock, ArrowLeft } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Messages() {
  const { messages: conversations, sendMessage } = useApp();
  const [activeId, setActiveId] = useState(1);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All Chats');
  const [showMobileChat, setShowMobileChat] = useState(false);
  const messagesEndRef = useRef(null);

  const activeConv = conversations.find(c => c.id === activeId);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => { scrollToBottom(); }, [activeId, activeConv?.messages?.length]);

  const handleSelectConversation = (id) => {
    setActiveId(id);
    setShowMobileChat(true);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    sendMessage(activeId, newMessage);
    setNewMessage('');
  };

  const filteredConvs = conversations.filter(c => {
    const matchSearch = c.contact.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchFilter = filter === 'All Chats' || (filter === 'Unread' && c.unread > 0);
    return matchSearch && matchFilter;
  });

  return (
    <div className="flex h-[calc(100vh-65px)] md:h-[calc(100vh)] overflow-hidden w-full bg-slate-50">

      {/* Chat List Pane */}
      <div className={`${
        showMobileChat ? 'hidden md:flex' : 'flex'
      } w-full md:w-[340px] shrink-0 border-r border-slate-200 flex-col bg-white h-full`}>
        <div className="p-4 border-b border-slate-200">
          <div className="relative mb-3">
            <Search size={16} className="absolute top-1/2 left-3.5 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              className="w-full pl-9 pr-4 py-2 text-xs rounded-full bg-slate-100 border-none outline-none text-slate-800 focus:ring-2 focus:ring-teal-500/20" 
              placeholder="Search conversations..."
              value={searchTerm} 
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            {['All Chats', 'Unread', 'Bookings'].map(f => (
              <button 
                key={f} 
                onClick={() => setFilter(f)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                  filter === f ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
          {filteredConvs.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-sm">No conversations found</div>
          ) : filteredConvs.map(conv => (
            <div 
              key={conv.id} 
              onClick={() => handleSelectConversation(conv.id)}
              className={`flex gap-3 p-4 cursor-pointer transition-colors border-l-4 ${
                conv.id === activeId ? 'border-l-teal-600 bg-teal-50/40' : 'border-l-transparent hover:bg-slate-50'
              }`}
            >
              <div className="relative shrink-0">
                <img src={conv.contact.img} alt={conv.contact.name} className="w-12 h-12 rounded-full object-cover shadow-sm" />
                {conv.contact.online && <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white"></span>}
                {conv.unread > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 border-2 border-white text-white text-[10px] font-bold flex items-center justify-center">
                    {conv.unread}
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <span className={`text-sm truncate ${conv.unread > 0 ? 'font-extrabold text-slate-900' : 'font-semibold text-slate-800'}`}>
                    {conv.contact.name}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium shrink-0 ml-2">{conv.time}</span>
                </div>
                <p className={`text-xs truncate mb-1 ${conv.unread > 0 ? 'font-bold text-teal-700' : 'text-slate-500'}`}>
                  {conv.lastMessage}
                </p>
                {conv.badge && (
                  <span className="inline-block px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    {conv.badge}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className={`${
        showMobileChat ? 'flex' : 'hidden md:flex'
      } flex-1 flex-col h-full bg-slate-50 relative`}>
        {activeConv ? (
          <>
            {/* Header */}
            <div className="px-4 py-3 bg-white/95 backdrop-blur-md border-b border-slate-200 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowMobileChat(false)}
                  className="md:hidden p-1.5 rounded-lg text-slate-600 hover:bg-slate-100"
                  aria-label="Back to conversations list"
                >
                  <ArrowLeft size={20} />
                </button>
                <div className="relative">
                  <img src={activeConv.contact.img} alt={activeConv.contact.name} className="w-10 h-10 rounded-full object-cover" />
                  {activeConv.contact.online && <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white"></span>}
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-sm">{activeConv.contact.name}</div>
                  <div className={`text-xs font-semibold ${activeConv.contact.online ? 'text-emerald-600' : 'text-slate-400'}`}>
                    {activeConv.contact.online ? 'Online now' : 'Offline'}
                  </div>
                </div>
              </div>
              <div className="flex gap-1">
                <button className="p-2 rounded-full text-slate-500 hover:bg-slate-100"><Phone size={18} /></button>
                <button className="p-2 rounded-full text-slate-500 hover:bg-slate-100"><Video size={18} /></button>
                <button className="p-2 rounded-full text-slate-500 hover:bg-slate-100"><Info size={18} /></button>
              </div>
            </div>

            {/* Messages Body */}
            <div className="flex-1 p-4 md:p-6 overflow-y-auto flex flex-col gap-4">
              {activeConv.messages.map((msg, i) => (
                <div 
                  key={i} 
                  className={`flex gap-2.5 max-w-[85%] sm:max-w-[70%] ${
                    msg.from === 'me' ? 'self-end flex-row-reverse' : 'self-start'
                  }`}
                >
                  {msg.from !== 'me' && (
                    <img src={activeConv.contact.img} alt="" className="w-7 h-7 rounded-full object-cover shrink-0 self-end" />
                  )}
                  <div>
                    {msg.image && (
                      <div className="mb-2 rounded-2xl overflow-hidden max-w-xs shadow-sm">
                        <img src={msg.image} alt="shared" className="w-full h-auto" />
                      </div>
                    )}
                    {msg.text && (
                      <div className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-xs ${
                        msg.from === 'me' 
                          ? 'bg-teal-600 text-white rounded-br-none' 
                          : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none'
                      }`}>
                        {msg.text}
                      </div>
                    )}
                    <div className={`text-[10px] text-slate-400 mt-1 font-medium ${msg.from === 'me' ? 'text-right' : 'text-left'}`}>
                      {msg.time} {msg.from === 'me' && '✓'}
                    </div>
                  </div>
                </div>
              ))}
              {activeConv.typing && (
                <div className="self-start flex items-center gap-2">
                  <img src={activeConv.contact.img} alt="" className="w-7 h-7 rounded-full object-cover" />
                  <div className="bg-slate-200 px-3 py-2 rounded-2xl flex gap-1.5 items-center">
                    {[0, 0.2, 0.4].map((delay, i) => (
                      <div key={i} className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: `${delay}s` }}></div>
                    ))}
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="p-3 sm:p-4 bg-white border-t border-slate-200 shrink-0">
              <form onSubmit={handleSend}>
                <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-full px-3 py-1.5">
                  <button type="button" className="text-slate-400 hover:text-slate-600 p-1"><Paperclip size={18} /></button>
                  <button type="button" className="text-slate-400 hover:text-slate-600 p-1"><Smile size={18} /></button>
                  <input
                    type="text"
                    value={newMessage}
                    onChange={e => setNewMessage(e.target.value)}
                    placeholder={`Message ${activeConv.contact.name.split(' ')[0]}...`}
                    className="flex-1 bg-transparent border-none outline-none text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 px-1"
                  />
                  <button 
                    type="submit" 
                    disabled={!newMessage.trim()} 
                    className="w-9 h-9 rounded-full bg-teal-600 text-white flex items-center justify-center disabled:opacity-40 transition-opacity"
                  >
                    <Send size={16} />
                  </button>
                </div>
              </form>
              <div className="flex justify-center gap-4 mt-2 text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                <span className="flex items-center gap-1"><Lock size={9} /> End-to-end encrypted</span>
                <span className="flex items-center gap-1"><Clock size={9} /> Usually responds in 1h</span>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-slate-400">
            <div className="text-center">
              <div className="text-4xl mb-2">💬</div>
              <p className="font-semibold text-sm">Select a conversation to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
