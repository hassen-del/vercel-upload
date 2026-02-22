import React, { useState, useEffect } from 'react';
import { LayoutDashboard, MessageSquare, Calendar, BarChart3, X, Send, Minimize2, Maximize2, AlertCircle, RefreshCw } from 'lucide-react';
import PremiumRevenueDashboard from '../components/premium-revenue-dashboard';
import ConversationsDashboard from '../components/conversations-dashboard';
import AppointmentsCalendar from '../components/appointments-calendar';
import AnalyticsReports from '../components/analytics-reports';
import { branding } from '../config/branding';
import { dashboardDebugger } from '../utils/debugger';

const SUPABASE_URL = 'https://unyzapzmjobkaadkrvng.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVueXphcHptam9ia2FhZGtydm5nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg4NzE0MDMsImV4cCI6MjA4NDQ0NzQwM30._g-ZeAyP0ZxMU3MXdxL6VsOXTGg7Pgcb5U3frwsTSwk';
const TRIAL_CUSTOMER_ID = 'contractor-gorilla-trial-001';

export default function ClientPortal() {
  const [activeTab, setActiveTab] = useState('revenue');
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMinimized, setChatMinimized] = useState(false);
  const [callsData, setCallsData] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [dataError, setDataError] = useState(null);
  const [dashboardMetrics, setDashboardMetrics] = useState({
    totalCalls: 0,
    bookings: 0,
    conversions: 0,
    revenue: 0
  });
  const [chatMessages, setChatMessages] = useState([
    { id: 1, from: 'ai', text: 'Hi! 👋 Welcome to your Ava AI dashboard. How can I help you today?', time: '10:30 AM' }
  ]);
  const [messageInput, setMessageInput] = useState('');

  // Expose debugger to window for console access
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.dashboardDebugger = dashboardDebugger;
      console.log('✅ Dashboard Debugger loaded. Type: window.dashboardDebugger.help() in console');
    }
  }, []);

  // Fetch real call data from Supabase
  useEffect(() => {
    const fetchCallData = async () => {
      setIsLoadingData(true);
      setDataError(null);

      try {
        // Build the API URL
        const apiUrl = `${SUPABASE_URL}/rest/v1/call_analytics?client_id=eq.${TRIAL_CUSTOMER_ID}&order=created_at.desc&limit=50`;

        // Log request details for debugging
        console.log('📡 Supabase Request:', {
          url: apiUrl,
          timestamp: new Date().toISOString(),
          customerId: TRIAL_CUSTOMER_ID,
          supabaseUrl: SUPABASE_URL,
          hasApiKey: !!SUPABASE_KEY,
        });

        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=representation'
          }
        });

        // Log response details
        console.log('📡 Supabase Response:', {
          status: response.status,
          statusText: response.statusText,
          headers: Object.fromEntries(response.headers.entries()),
          timestamp: new Date().toISOString(),
        });

        if (!response.ok) {
          let errorMsg = `API Error: ${response.status} ${response.statusText}`;

          // More specific error messages
          if (response.status === 400) {
            errorMsg = 'Bad Request: Check query format or API configuration';
            console.error('❌ 400 Error - Likely causes: Invalid query, wrong table name, or malformed request');
          } else if (response.status === 401) {
            errorMsg = 'Authentication Failed: Invalid API key';
          } else if (response.status === 403) {
            errorMsg = 'Permission Denied: Check Supabase RLS policies';
          } else if (response.status === 404) {
            errorMsg = 'Resource Not Found: Table or column does not exist';
          } else if (response.status === 429) {
            errorMsg = 'Rate Limited: Too many requests';
          }

          // Try to get more details from response body
          try {
            const errorBody = await response.text();
            console.error('API Error Details:', errorBody);
            if (errorBody) {
              errorMsg += ` - ${errorBody.substring(0, 100)}`;
            }
          } catch (e) {
            // Ignore if can't parse error body
          }

          throw new Error(errorMsg);
        }

        const data = await response.json();

        console.log('✅ Supabase Success:', {
          recordCount: data.length,
          firstRecord: data[0],
          timestamp: new Date().toISOString(),
        });

        setCallsData(data);
        setDataError(null);

        // Calculate metrics from real data
        const total = data.length;
        const booked = data.filter(c => c.category === 'BOOKED').length;
        const conversionRate = total > 0 ? ((booked / total) * 100).toFixed(1) : 0;
        const totalRevenue = booked * 50; // $50 per booking

        console.log('📊 Metrics Calculated:', {
          total,
          booked,
          conversionRate,
          totalRevenue,
        });

        setDashboardMetrics({
          totalCalls: total,
          bookings: booked,
          conversions: conversionRate,
          revenue: totalRevenue
        });
      } catch (error) {
        console.error('❌ Error fetching call data:', error);

        // Create detailed error message
        let userMessage = 'Unable to load live data';

        if (error.message.includes('400')) {
          userMessage = 'Configuration Error: Please check API settings (click Retry to try again)';
        } else if (error.message.includes('401')) {
          userMessage = 'Authentication Error: API key may be invalid';
        } else if (error.message.includes('403')) {
          userMessage = 'Permission Error: Check database access rights';
        } else if (error.message.includes('404')) {
          userMessage = 'Not Found: Check database table configuration';
        } else if (error.message.includes('Network')) {
          userMessage = 'Network Error: Check your internet connection';
        }

        setDataError(userMessage);

        // Use demo data as fallback
        setDashboardMetrics({
          totalCalls: 0,
          bookings: 0,
          conversions: 0,
          revenue: 0
        });
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchCallData();
    const interval = setInterval(fetchCallData, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const tabs = [
    { id: 'revenue', name: 'Revenue Dashboard', icon: LayoutDashboard, component: PremiumRevenueDashboard },
    { id: 'conversations', name: 'Conversations', icon: MessageSquare, component: ConversationsDashboard },
    { id: 'appointments', name: 'Appointments', icon: Calendar, component: AppointmentsCalendar },
    { id: 'analytics', name: 'Analytics', icon: BarChart3, component: AnalyticsReports }
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component;

  const sendMessage = () => {
    if (!messageInput.trim()) return;

    const newMessage = {
      id: chatMessages.length + 1,
      from: 'user',
      text: messageInput,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages([...chatMessages, newMessage]);
    setMessageInput('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: chatMessages.length + 2,
        from: 'ai',
        text: getAIResponse(messageInput),
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const getAIResponse = (message) => {
    const msg = message.toLowerCase();

    if (msg.includes('revenue') || msg.includes('lost') || msg.includes('money')) {
      return `I can see you have ${dashboardMetrics.bookings} bookings with $${dashboardMetrics.revenue} in revenue from ${dashboardMetrics.totalCalls} calls. Your conversion rate is ${dashboardMetrics.conversions}%. Keep up the great work!`;
    }
    if (msg.includes('appointment') || msg.includes('schedule') || msg.includes('book')) {
      return `You have ${dashboardMetrics.bookings} bookings confirmed so far. Would you like to see more details about your scheduled appointments?`;
    }
    if (msg.includes('conversation') || msg.includes('message') || msg.includes('call')) {
      return `You have ${dashboardMetrics.totalCalls} total calls. Your Ava AI receptionist is helping you capture leads automatically. Check the Conversations tab to see details!`;
    }
    if (msg.includes('help') || msg.includes('how') || msg.includes('?')) {
      return "I can help you with:\n• Revenue tracking and insights\n• Call and booking analytics\n• Conversation management\n• Performance metrics\n\nWhat would you like to know?";
    }

    return "I'm here to help! You can ask me about your calls, bookings, revenue, conversations, or analytics. What would you like to know?";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Clean Header */}
      <header className="sticky top-0 bg-white border-b border-gray-200 z-40">
        <div className="px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">Contractor Gorilla Dashboard</h1>
          <div className="hidden md:flex gap-1">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {tab.name}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Error Alert */}
      {dataError && (
        <div className="max-w-[1920px] mx-auto px-6 py-4">
          <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-700 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-bold text-yellow-900">⚠️ API Connection Issue</p>
              <p className="text-sm text-yellow-800 mb-2">{dataError}</p>
              <p className="text-xs text-yellow-700 italic">
                📋 Showing demo data below. Live data will appear once Supabase connection is restored.
              </p>
              <div className="mt-2 p-2 bg-white rounded border border-yellow-200">
                <p className="text-xs font-mono text-gray-600">
                  <strong>Debug:</strong> Open browser DevTools (F12) → Console to see detailed error logs
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setDataError(null);
                  setIsLoadingData(true);
                  // Trigger a refetch
                  const event = new Event('refetch');
                  window.dispatchEvent(event);
                }}
                className="px-3 py-1 text-sm font-bold text-yellow-700 hover:bg-yellow-100 rounded transition-colors whitespace-nowrap"
              >
                Retry Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dashboard Content */}
      <div className="relative">
        {isLoadingData ? (
          <div className="flex items-center justify-center py-24">
            <div className="text-center">
              <div className="animate-spin w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full mx-auto mb-4"></div>
              <p className="text-gray-600 font-semibold">Loading your dashboard...</p>
            </div>
          </div>
        ) : (
          ActiveComponent && <ActiveComponent callsData={callsData} metrics={dashboardMetrics} />
        )}
      </div>

      {/* Floating Chat Widget */}
      {!chatOpen && (
        <button
          onClick={() => setChatOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full shadow-2xl flex items-center justify-center text-white hover:scale-110 transition-all z-50 animate-bounce"
        >
          <MessageSquare className="w-7 h-7" />
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center font-bold">
            1
          </span>
        </button>
      )}

      {/* Chat Window */}
      {chatOpen && (
        <div 
          className={`fixed z-50 transition-all duration-300 ${
            chatMinimized 
              ? 'bottom-6 right-6 w-80' 
              : 'bottom-6 right-6 w-96 h-[600px]'
          }`}
        >
          <div className="bg-white rounded-3xl shadow-2xl border-2 border-gray-200 flex flex-col h-full overflow-hidden">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold">AI Assistant</h3>
                  <p className="text-blue-100 text-xs">Always here to help</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setChatMinimized(!chatMinimized)}
                  className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
                >
                  {chatMinimized ? (
                    <Maximize2 className="w-5 h-5 text-white" />
                  ) : (
                    <Minimize2 className="w-5 h-5 text-white" />
                  )}
                </button>
                <button 
                  onClick={() => setChatOpen(false)}
                  className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {!chatMinimized && (
              <>
                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
                  {chatMessages.map(msg => (
                    <div key={msg.id} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] ${msg.from === 'user' ? 'order-2' : 'order-1'}`}>
                        <div className={`rounded-3xl px-6 py-3 ${
                          msg.from === 'user'
                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                            : 'bg-white border-2 border-gray-200 text-gray-900'
                        }`}>
                          <p className="leading-relaxed whitespace-pre-line">{msg.text}</p>
                        </div>
                        <p className={`text-xs text-gray-500 mt-1 ${msg.from === 'user' ? 'text-right' : 'text-left'}`}>
                          {msg.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chat Input */}
                <div className="p-4 bg-white border-t border-gray-200">
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      placeholder="Ask me anything..."
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all"
                    />
                    <button
                      onClick={sendMessage}
                      className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all font-bold shadow-lg shadow-blue-500/30"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button 
                      onClick={() => {
                        setMessageInput('Show me revenue opportunities');
                        setTimeout(() => sendMessage(), 100);
                      }}
                      className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs font-semibold text-gray-700 transition-colors"
                    >
                      💰 Revenue
                    </button>
                    <button 
                      onClick={() => {
                        setMessageInput('Check my appointments');
                        setTimeout(() => sendMessage(), 100);
                      }}
                      className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs font-semibold text-gray-700 transition-colors"
                    >
                      📅 Appointments
                    </button>
                    <button 
                      onClick={() => {
                        setMessageInput('Help me with conversations');
                        setTimeout(() => sendMessage(), 100);
                      }}
                      className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs font-semibold text-gray-700 transition-colors"
                    >
                      💬 Messages
                    </button>
                  </div>
                </div>
              </>
            )}

            {chatMinimized && (
              <div className="p-4">
                <p className="text-sm text-gray-600 text-center">Click to expand chat</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
