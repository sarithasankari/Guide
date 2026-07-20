import { useState, useRef, useEffect } from 'react';
import { Search, Phone, Video, Info, Paperclip, Smile, Send, Lock, Clock } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Messages() {
  const { messages: conversations, sendMessage } = useApp();
  const [activeId, setActiveId] = useState(1);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All Chats');
  const messagesEndRef = useRef(null);

  const activeConv = conversations.find(c => c.id === activeId);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => { scrollToBottom(); }, [activeId, activeConv?.messages?.length]);

  const handleSelectConversation = (id) => {
    setActiveId(id);
    // Ideally this would also clear unread count in context, but keeping it simple
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
    <div style={{ display: 'flex', height: '100%', overflow: 'hidden' }}>

      {/* Chat List Pane */}
      <div style={{ width: '340px', borderRight: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', background: 'white' }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--color-border)' }}>
          <div style={{ position: 'relative', marginBottom: '1rem' }}>
            <Search size={16} style={{ position: 'absolute', top: '50%', left: '1rem', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
            <input type="text" className="form-input" placeholder="Search conversations..."
              value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
              style={{ paddingLeft: '2.5rem', borderRadius: 'var(--radius-full)', background: '#F1F5F9', border: 'none' }} />
          </div>
          <div className="flex gap-2">
            {['All Chats', 'Unread', 'Bookings'].map(f => (
              <button key={f} onClick={() => setFilter(f)}
                style={{ padding: '0.3rem 0.8rem', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', border: 'none', background: filter === f ? 'var(--color-primary)' : '#F1F5F9', color: filter === f ? 'white' : 'var(--color-text-main)' }}>
                {f}
              </button>
            ))}
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto' }}>
          {filteredConvs.length === 0 ? (
            <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>No conversations found</div>
          ) : filteredConvs.map(conv => (
            <div key={conv.id} onClick={() => handleSelectConversation(conv.id)}
              style={{
                display: 'flex', gap: '1rem', padding: '1.25rem 1.5rem', cursor: 'pointer',
                borderLeft: conv.id === activeId ? '4px solid var(--color-primary)' : '4px solid transparent',
                background: conv.id === activeId ? '#EFF6FF' : 'transparent',
                borderBottom: '1px solid var(--color-border)', transition: 'background 0.1s'
              }}>
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <img src={conv.contact.img} alt={conv.contact.name} style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} />
                {conv.contact.online && <div style={{ position: 'absolute', bottom: '1px', right: '1px', width: '12px', height: '12px', borderRadius: '50%', background: '#10B981', border: '2px solid white' }}></div>}
                {conv.unread > 0 && <div style={{ position: 'absolute', top: '-5px', right: '-5px', width: '20px', height: '20px', borderRadius: '50%', background: '#EF4444', border: '2px solid white', color: 'white', fontSize: '0.65rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{conv.unread}</div>}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="flex justify-between items-center" style={{ marginBottom: '0.25rem' }}>
                  <span style={{ fontWeight: conv.unread > 0 ? 700 : 600, fontSize: '0.9rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{conv.contact.name}</span>
                  <span style={{ fontSize: '0.7rem', color: conv.id === activeId ? 'var(--color-primary)' : 'var(--color-text-muted)', fontWeight: 500, flexShrink: 0, marginLeft: '0.5rem' }}>{conv.time}</span>
                </div>
                <p style={{ fontSize: '0.82rem', color: conv.unread > 0 ? 'var(--color-primary)' : 'var(--color-text-muted)', fontWeight: conv.unread > 0 ? 600 : 400, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginBottom: '0.3rem' }}>
                  {conv.lastMessage}
                </p>
                {conv.badge && <span style={{ background: '#D1FAE5', color: '#065F46', fontSize: '0.6rem', fontWeight: 700, padding: '0.15rem 0.5rem', borderRadius: '99px' }}>{conv.badge}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      {activeConv ? (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundImage: 'radial-gradient(#E2E8F0 1px, transparent 1px)', backgroundSize: '20px 20px', backgroundColor: '#F8FAFC' }}>

          {/* Header */}
          <div style={{ padding: '1rem 2rem', background: 'rgba(255, 255, 255,0.95)', backdropFilter: 'blur(10px)', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="flex items-center gap-3">
              <div style={{ position: 'relative' }}>
                <img src={activeConv.contact.img} alt="" style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                {activeConv.contact.online && <div style={{ position: 'absolute', bottom: 0, right: 0, width: '12px', height: '12px', borderRadius: '50%', background: '#10B981', border: '2px solid white' }}></div>}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '1rem' }}>{activeConv.contact.name}</div>
                <div style={{ fontSize: '0.75rem', color: activeConv.contact.online ? '#10B981' : 'var(--color-text-muted)', fontWeight: 500 }}>
                  {activeConv.contact.online ? 'Online now' : 'Offline'}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="btn btn-ghost" style={{ padding: '0.5rem', borderRadius: '50%', color: 'var(--color-text-muted)' }}><Phone size={20} /></button>
              <button className="btn btn-ghost" style={{ padding: '0.5rem', borderRadius: '50%', color: 'var(--color-text-muted)' }}><Video size={20} /></button>
              <button className="btn btn-ghost" style={{ padding: '0.5rem', borderRadius: '50%', color: 'var(--color-text-muted)' }}><Info size={20} /></button>
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, padding: '1.5rem 2rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {activeConv.messages.map((msg, i) => (
              <div key={i} style={{ alignSelf: msg.from === 'me' ? 'flex-end' : 'flex-start', maxWidth: '70%', display: 'flex', gap: '0.75rem', alignItems: 'flex-end', flexDirection: msg.from === 'me' ? 'row-reverse' : 'row' }}>
                {msg.from !== 'me' && <img src={activeConv.contact.img} alt="" style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />}
                <div>
                  {msg.image && (
                    <div style={{ marginBottom: '0.5rem', borderRadius: '1.25rem', overflow: 'hidden', maxWidth: '300px' }}>
                      <img src={msg.image} alt="shared" style={{ width: '100%', display: 'block', borderRadius: '1rem' }} />
                    </div>
                  )}
                  {msg.text && (
                    <div style={{
                      padding: '0.8rem 1.2rem',
                      borderRadius: msg.from === 'me' ? '1.5rem 1.5rem 0 1.5rem' : '1.5rem 1.5rem 1.5rem 0',
                      background: msg.from === 'me' ? 'var(--color-primary)' : '#E0E7FF',
                      color: msg.from === 'me' ? 'white' : 'var(--color-text-main)',
                      boxShadow: 'var(--shadow-sm)', fontSize: '0.9rem', lineHeight: '1.5'
                    }}>{msg.text}</div>
                  )}
                  <div style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', marginTop: '0.3rem', textAlign: msg.from === 'me' ? 'right' : 'left' }}>
                    {msg.time} {msg.from === 'me' && '✓'}
                  </div>
                </div>
              </div>
            ))}
            {activeConv.typing && (
              <div style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <img src={activeConv.contact.img} alt="" style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }} />
                <div style={{ background: '#E2E8F0', padding: '0.7rem 1rem', borderRadius: '1.5rem', display: 'flex', gap: '4px', alignItems: 'center' }}>
                  {[0, 0.2, 0.4].map((delay, i) => (
                    <div key={i} style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#94A3B8', animation: `bounce 1s ${delay}s infinite` }}></div>
                  ))}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div style={{ padding: '1.25rem 2rem', background: 'white', borderTop: '1px solid var(--color-border)' }}>
            <form onSubmit={handleSend}>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', background: '#F8FAFC', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', padding: '0.5rem 0.5rem 0.5rem 1rem' }}>
                <button type="button" style={{ color: 'var(--color-text-muted)', background: 'none', border: 'none', cursor: 'pointer', display: 'flex' }}><Paperclip size={20} /></button>
                <button type="button" style={{ color: 'var(--color-text-muted)', background: 'none', border: 'none', cursor: 'pointer', display: 'flex' }}><Smile size={20} /></button>
                <input
                  type="text"
                  value={newMessage}
                  onChange={e => setNewMessage(e.target.value)}
                  placeholder={`Message ${activeConv.contact.name.split(' ')[0]}...`}
                  style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontSize: '0.9rem', padding: '0.4rem' }}
                />
                <button type="submit" disabled={!newMessage.trim()} className="btn btn-primary"
                  style={{ width: '40px', height: '40px', padding: 0, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: newMessage.trim() ? 1 : 0.5 }}>
                  <Send size={18} />
                </button>
              </div>
            </form>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '0.6rem', fontSize: '0.65rem', color: 'var(--color-text-light)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Lock size={10} /> End-to-end encrypted</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Clock size={10} /> Usually responds in 1h</span>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-muted)' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💬</div>
            <p style={{ fontWeight: 600 }}>Select a conversation to start messaging</p>
          </div>
        </div>
      )}

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
      `}</style>
    </div>
  );
}
