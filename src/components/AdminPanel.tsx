'use client';

import { useState, useEffect, useRef } from 'react';
import { MessageCircle, ExternalLink, Send } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

interface Headline {
  id: string;
  ref: string;
  headline: string;
  created_at: string;
  updated_at: string;
}

interface Message {
  id: string;
  type: 'assistant' | 'user';
  content: string;
  headline?: Headline;
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export const AdminPanel = () => {
  const [headlines, setHeadlines] = useState<Headline[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [sending, setSending] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchHeadlines = async () => {
      if (!supabase) {
        setLoading(false);
        setMessages([
          {
            id: '1',
            type: 'assistant',
            content: 'Hello! Welcome to the Headlines widget. I can help you explore different headline variations. What would you like to know?',
          },
        ]);
        return;
      }
      try {
        const { data, error } = await supabase
          .from('headlines')
          .select('*')
          .order('ref', { ascending: true });

        if (error) {
          console.error('Error fetching headlines:', error);
          return;
        }

        setHeadlines(data || []);
        setMessages([
          {
            id: '1',
            type: 'assistant',
            content: 'Hello! Welcome to the Headlines widget. I can help you explore different headline variations. What would you like to know?',
          },
        ]);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchHeadlines();
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || sending) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    setSending(true);

    setMessages((prev) => [
      ...prev,
      {
        id: `user-${Date.now()}`,
        type: 'user',
        content: userMessage,
      },
    ]);

    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/chat`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-${Date.now()}`,
          type: 'assistant',
          content: data.response || 'Sorry, I could not process that.',
        },
      ]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-error-${Date.now()}`,
          type: 'assistant',
          content: 'Sorry, something went wrong. Please try again.',
        },
      ]);
    } finally {
      setSending(false);
      inputRef.current?.focus();
    }
  };

  const handleNextHeadline = () => {
    if (currentIndex < headlines.length - 1) {
      const nextIndex = currentIndex + 1;
      const nextHeadline = headlines[nextIndex];
      setCurrentIndex(nextIndex);
      setMessages((prev) => [
        ...prev,
        {
          id: `user-${nextIndex}`,
          type: 'user',
          content: 'Next',
        },
        {
          id: `assistant-${nextIndex}`,
          type: 'assistant',
          content: `Here's the "${nextHeadline.ref}" headline variation:`,
          headline: nextHeadline,
        },
      ]);
    }
  };

  const handleViewHeadline = (headline: Headline) => {
    const currentUrl = typeof window !== 'undefined' ? window.location.origin : '';
    window.open(`${currentUrl}?ref=${headline.ref}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-amber-800 hover:bg-amber-900 text-white rounded-full p-4 shadow-lg transition-all hover:scale-110"
          aria-label="Open chat"
        >
          <MessageCircle size={24} />
        </button>
      ) : (
        <div className="bg-white rounded-lg shadow-2xl w-96 max-h-[80vh] overflow-hidden flex flex-col">
          <div className="bg-gradient-to-r from-amber-800 to-amber-700 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageCircle size={20} />
              <h3 className="font-semibold">Headlines Assistant</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-amber-200 transition-colors text-xl"
              aria-label="Close chat"
            >
              ×
            </button>
          </div>

          <div className="overflow-y-auto flex-1 p-4 bg-gray-50 space-y-3">
            {loading ? (
              <div className="flex justify-center items-center h-32">
                <div className="text-gray-500 text-sm">Loading...</div>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.type === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-xs rounded-lg p-3 ${
                      message.type === 'user'
                        ? 'bg-amber-800 text-white rounded-br-none'
                        : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    {message.headline && (
                      <div className="bg-amber-50 rounded p-2 mt-3 space-y-2">
                        <div>
                          <p className="text-xs font-semibold text-amber-900">
                            ?ref={message.headline.ref}
                          </p>
                          <p className="text-sm text-gray-800 mt-1 italic">
                            "{message.headline.headline}"
                          </p>
                        </div>
                        <button
                          onClick={() => handleViewHeadline(message.headline!)}
                          className="flex items-center gap-1 text-xs text-amber-700 hover:text-amber-900 transition-colors font-medium"
                        >
                          <ExternalLink size={12} />
                          Test this
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="bg-white border-t border-gray-200 p-3 space-y-2">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask me anything..."
                disabled={sending}
                className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-amber-600 disabled:bg-gray-100"
              />
              <button
                onClick={handleSendMessage}
                disabled={sending || !inputValue.trim()}
                className="bg-amber-800 hover:bg-amber-900 disabled:bg-gray-300 text-white rounded-lg px-3 py-2 transition-colors"
                aria-label="Send message"
              >
                <Send size={16} />
              </button>
            </div>
            {headlines.length > 0 && currentIndex < headlines.length - 1 && (
              <button
                onClick={handleNextHeadline}
                className="w-full text-xs bg-amber-100 hover:bg-amber-200 text-amber-900 rounded px-2 py-1 transition-colors"
              >
                Show Next Headline
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
