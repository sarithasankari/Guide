import React, { createContext, useContext, useState, useEffect } from 'react';
import { GUIDES, MOCK_BOOKINGS, MOCK_MESSAGES } from '../data/mockData';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  // Existing User State
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('currentUser');
    return saved ? JSON.parse(saved) : null;
  });

  const [savedGuides, setSavedGuides] = useState(() => {
    const saved = localStorage.getItem('savedGuides');
    return saved ? JSON.parse(saved) : [1, 3];
  });

  const [searchQuery, setSearchQuery] = useState({ location: '', dates: '', guests: '' });

  // New Data States
  const [guides, setGuides] = useState(() => {
    const saved = localStorage.getItem('guides');
    return saved ? JSON.parse(saved) : GUIDES;
  });

  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem('bookings');
    return saved ? JSON.parse(saved) : MOCK_BOOKINGS;
  });

  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('messages');
    return saved ? JSON.parse(saved) : MOCK_MESSAGES;
  });

  // LocalStorage Sync
  useEffect(() => { localStorage.setItem('currentUser', JSON.stringify(user)); }, [user]);
  useEffect(() => { localStorage.setItem('savedGuides', JSON.stringify(savedGuides)); }, [savedGuides]);
  useEffect(() => { localStorage.setItem('guides', JSON.stringify(guides)); }, [guides]);
  useEffect(() => { localStorage.setItem('bookings', JSON.stringify(bookings)); }, [bookings]);
  useEffect(() => { localStorage.setItem('messages', JSON.stringify(messages)); }, [messages]);

  // Actions
  const login = (role = 'traveler') => {
    setUser({
      name: 'Alex Morgan',
      email: 'alex.morgan@example.com',
      role,
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=100&q=80',
    });
  };

  const logout = () => setUser(null);

  const toggleSave = (guideId) => {
    setSavedGuides(prev =>
      prev.includes(guideId) ? prev.filter(id => id !== guideId) : [...prev, guideId]
    );
  };

  const isSaved = (guideId) => savedGuides.includes(guideId);

  const addBooking = (booking) => {
    setBookings(prev => [...prev, { ...booking, id: `BK-${Date.now()}`, daysUntil: 0 }]);
  };

  const updateBookingStatus = (id, status) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
  };

  const sendMessage = (threadId, text) => {
    setMessages(prev => 
      prev.map(thread => {
        if (thread.id === threadId) {
          return {
            ...thread,
            lastMessage: text,
            time: 'Just now',
            messages: [...thread.messages, { from: 'me', text, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]
          };
        }
        return thread;
      })
    );
  };

  return (
    <AppContext.Provider value={{
      user, login, logout,
      savedGuides, toggleSave, isSaved,
      searchQuery, setSearchQuery,
      guides, setGuides,
      bookings, addBooking, updateBookingStatus,
      messages, sendMessage
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
