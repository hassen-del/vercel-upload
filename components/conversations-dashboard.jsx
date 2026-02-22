import React, { useState } from 'react';
import { MessageSquare, Search, Filter, Download, Phone, Calendar, DollarSign, Clock, User, CheckCircle, AlertCircle, TrendingUp, BarChart3, Settings, Bell, LogOut, Menu } from 'lucide-react';
import { branding } from '../config/branding';

export default function ConversationsDashboard({ callsData = [] }) {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Convert real call data to conversation format
  const generateConversationsFromCalls = () => {
    if (!callsData || callsData.length === 0) {
      return demoConversations; // Fallback to demo data
    }

    return callsData.slice(0, 10).map((call, index) => ({
      id: index + 1,
      customer: { name: 'Caller', phone: call.caller_id || 'Unknown', avatar: 'C' },
      lastMessage: call.transcript ? call.transcript.substring(0, 50) + '...' : 'No transcript',
      timestamp: new Date(call.created_at).toLocaleString(),
      status: call.category?.toLowerCase() === 'booked' ? 'converted' : call.category?.toLowerCase() === 'lost' ? 'lost' : 'pending',
      value: call.category === 'BOOKED' ? 50 : 0,
      messageCount: 1,
      unread: 0,
      messages: [
        {
          id: 1,
          from: 'customer',
          text: call.transcript || 'Call transcript not available',
          time: new Date(call.created_at).toLocaleString()
        },
        {
          id: 2,
          from: 'ai',
          text: `Call classification: ${call.category || 'PENDING'}${call.category === 'BOOKED' ? ' - Appointment scheduled!' : ''}`,
          time: new Date(call.created_at).toLocaleString()
        }
      ]
    }));
  };

  const demoConversations = [
    {
      id: 1,
      customer: { name: 'Sarah Mitchell', phone: '+1 780-555-1234', avatar: 'S' },
      lastMessage: 'Perfect! See you then.',
      timestamp: '2 hours ago',
      status: 'converted',
      value: 300,
      messageCount: 8,
      unread: 0,
      messages: [
        { id: 1, from: 'customer', text: 'Hi, I need to book an appointment', time: '3h ago' },
        { id: 2, from: 'ai', text: 'I\'d be happy to help! What type of service are you interested in?', time: '3h ago' },
        { id: 3, from: 'customer', text: 'Full consultation please', time: '3h ago' },
        { id: 4, from: 'ai', text: 'Great choice! I have availability:\n1️⃣ Monday 2:00 PM\n2️⃣ Tuesday 10:30 AM\n3️⃣ Wednesday 3:00 PM\nWhich works best for you?', time: '3h ago' },
        { id: 5, from: 'customer', text: '2', time: '2h ago' },
        { id: 6, from: 'ai', text: '✅ Perfect! Your consultation is confirmed for Tuesday, Jan 28 at 10:30 AM. You\'ll receive a reminder 24 hours before. Looking forward to seeing you!', time: '2h ago' },
        { id: 7, from: 'customer', text: 'Thank you!', time: '2h ago' },
        { id: 8, from: 'customer', text: 'Perfect! See you then.', time: '2h ago' }
      ]
    },
    {
      id: 2,
      customer: { name: 'John Davidson', phone: '+1 403-555-7890', avatar: 'J' },
      lastMessage: 'What are your rates?',
      timestamp: '5 hours ago',
      status: 'pending',
      value: 150,
      messageCount: 3,
      unread: 1,
      messages: [
        { id: 1, from: 'customer', text: 'Hello, are you taking new clients?', time: '6h ago' },
        { id: 2, from: 'ai', text: 'Yes, we are! We\'d love to work with you. What type of service are you looking for?', time: '6h ago' },
        { id: 3, from: 'customer', text: 'What are your rates?', time: '5h ago' }
      ]
    },
    {
      id: 3,
      customer: { name: 'Emily Rodriguez', phone: '+1 587-555-4321', avatar: 'E' },
      lastMessage: 'Urgent - need help today',
      timestamp: 'Saturday 8PM',
      status: 'urgent',
      value: 150,
      messageCount: 2,
      unread: 2,
      messages: [
        { id: 1, from: 'customer', text: 'Are you available now? I need urgent help', time: 'Sat 8PM' },
        { id: 2, from: 'ai', text: 'I appreciate you reaching out! We\'re currently closed but will be back Monday at 9 AM. This sounds important - would you like me to have someone call you first thing Monday morning?', time: 'Sat 8PM' }
      ]
    },
    {
      id: 4,
      customer: { name: 'Michael Torres', phone: '+1 416-555-9876', avatar: 'M' },
      lastMessage: 'Let me check my schedule',
      timestamp: '1 day ago',
      status: 'follow_up',
      value: 300,
      messageCount: 5,
      unread: 0,
      messages: [
        { id: 1, from: 'customer', text: 'Hi, interested in your premium package', time: '1d ago' },
        { id: 2, from: 'ai', text: 'Excellent choice! Our premium package includes...[details]. Would you like to schedule a consultation?', time: '1d ago' },
        { id: 3, from: 'customer', text: 'Yes please', time: '1d ago' },
        { id: 4, from: 'ai', text: 'Perfect! Available times:\n1️⃣ Wed 2PM\n2️⃣ Thu 10AM\n3️⃣ Fri 3PM', time: '1d ago' },
        { id: 5, from: 'customer', text: 'Let me check my schedule', time: '1d ago' }
      ]
    },
    {
      id: 5,
      customer: { name: 'Lisa Wang', phone: '+1 780-555-3333', avatar: 'L' },
      lastMessage: 'Great, I\'ll take it!',
      timestamp: '2 days ago',
      status: 'converted',
      value: 150,
      messageCount: 6,
      unread: 0,
      messages: [
        { id: 1, from: 'customer', text: 'Do you offer gift certificates?', time: '2d ago' },
        { id: 2, from: 'ai', text: 'Yes we do! Gift certificates are available in any amount. What amount were you thinking?', time: '2d ago' },
        { id: 3, from: 'customer', text: '$150?', time: '2d ago' },
        { id: 4, from: 'ai', text: 'Perfect! I can help you purchase a $150 gift certificate. Would you like it emailed or physical?', time: '2d ago' },
        { id: 5, from: 'customer', text: 'Email please', time: '2d ago' },
        { id: 6, from: 'customer', text: 'Great, I\'ll take it!', time: '2d ago' }
      ]
    }
  ];

  const stats = {
    total: 87,
    converted: 32,
    pending: 28,
    urgent: 12,
    followUp: 15
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'converted': return 'bg-green-100 text-green-700 border-green-300';
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'urgent': return 'bg-red-100 text-red-700 border-red-300';
      case 'follow_up': return 'bg-blue-100 text-blue-700 border-blue-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getStatusLabel = (status) => {
    switch(status) {
      case 'converted': return 'Converted';
      case 'pending': return 'Pending Response';
      case 'urgent': return 'Urgent';
      case 'follow_up': return 'Follow-up Needed';
      default: return 'Active';
    }
  };

  // Use real conversations from calls data or demo data
  const conversations = generateConversationsFromCalls();

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-gray-50 w-full">

      {/* Stats Bar */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { label: 'Total', value: stats.total, icon: MessageSquare, color: 'text-gray-600' },
            { label: 'Converted', value: stats.converted, icon: CheckCircle, color: 'text-green-600' },
            { label: 'Pending', value: stats.pending, icon: Clock, color: 'text-yellow-600' },
            { label: 'Urgent', value: stats.urgent, icon: AlertCircle, color: 'text-red-600' },
            { label: 'Follow-up', value: stats.followUp, icon: TrendingUp, color: 'text-blue-600' }
          ].map((stat, idx) => (
            <div key={idx} className="bg-gray-50 rounded-2xl p-4 hover:shadow-md transition-all cursor-pointer">
              <div className="flex items-center gap-3">
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                <div>
                  <p className="text-2xl font-black text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex h-[calc(100vh-200px)]">
        {/* Conversations List */}
        <div className="w-96 bg-white border-r border-gray-200 flex flex-col">
          {/* Search & Filter */}
          <div className="p-6 border-b border-gray-200">
            <div className="relative mb-4">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all font-medium"
              />
            </div>
            <div className="flex gap-2">
              {['all', 'converted', 'pending', 'urgent'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                    filterStatus === status
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Conversations */}
          <div className="flex-1 overflow-y-auto">
            {conversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => setSelectedConversation(conv)}
                className={`p-6 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-all ${
                  selectedConversation?.id === conv.id ? 'bg-blue-50 border-l-4 border-l-blue-600' : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg">
                      {conv.customer.avatar}
                    </div>
                    {conv.unread > 0 && (
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {conv.unread}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-bold text-gray-900 truncate">{conv.customer.name}</h3>
                      <span className="text-xs text-gray-500 font-medium">{conv.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-600 truncate mb-2">{conv.lastMessage}</p>
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(conv.status)}`}>
                        {getStatusLabel(conv.status)}
                      </span>
                      <span className="text-xs font-bold text-gray-900">${conv.value}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-white">
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="p-6 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl">
                      {selectedConversation.customer.avatar}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{selectedConversation.customer.name}</h2>
                      <p className="text-gray-600 font-medium">{selectedConversation.customer.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-white rounded-xl px-4 py-3 border border-gray-200">
                      <p className="text-xs text-gray-500 font-medium">Deal Value</p>
                      <p className="text-2xl font-black text-gray-900">${selectedConversation.value}</p>
                    </div>
                    <button className="p-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg shadow-green-500/30">
                      <Phone className="w-5 h-5" />
                    </button>
                    <button className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg shadow-blue-500/30">
                      <Calendar className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-8 space-y-6">
                {selectedConversation.messages.map((message) => (
                  <div key={message.id} className={`flex ${message.from === 'customer' ? 'justify-start' : 'justify-end'}`}>
                    <div className={`max-w-[70%] ${
                      message.from === 'customer'
                        ? 'bg-gray-100'
                        : 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white'
                    } rounded-3xl px-6 py-4 shadow-sm`}>
                      <p className={`leading-relaxed ${message.from === 'customer' ? 'text-gray-900' : 'text-white'} whitespace-pre-line`}>
                        {message.text}
                      </p>
                      <p className={`text-xs mt-2 ${message.from === 'customer' ? 'text-gray-500' : 'text-blue-100'}`}>
                        {message.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-6 border-t border-gray-200 bg-gray-50">
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    className="flex-1 px-6 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 transition-all font-medium"
                  />
                  <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all font-bold shadow-lg shadow-blue-500/30">
                    Send
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-center p-8">
              <div>
                <MessageSquare className="w-24 h-24 text-gray-300 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Select a conversation</h3>
                <p className="text-gray-600">Choose a conversation from the list to view messages</p>
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar - Contact Info */}
        {selectedConversation && (
          <div className="w-80 bg-gray-50 border-l border-gray-200 p-6 overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h3>
            
            <div className="bg-white rounded-2xl p-6 mb-6 border border-gray-200">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-2xl">
                  {selectedConversation.customer.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">{selectedConversation.customer.name}</h4>
                  <p className="text-gray-600 text-sm">{selectedConversation.customer.phone}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2">
                  <span className="text-gray-600 font-medium">Status</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(selectedConversation.status)}`}>
                    {getStatusLabel(selectedConversation.status)}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-gray-600 font-medium">Deal Value</span>
                  <span className="font-black text-gray-900 text-lg">${selectedConversation.value}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-gray-600 font-medium">Messages</span>
                  <span className="font-bold text-gray-900">{selectedConversation.messageCount}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button className="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all font-bold flex items-center justify-center gap-2 shadow-lg shadow-green-500/30">
                <Phone className="w-5 h-5" />
                Call Customer
              </button>
              <button className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30">
                <Calendar className="w-5 h-5" />
                Schedule Meeting
              </button>
              <button className="w-full px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 transition-all font-bold flex items-center justify-center gap-2">
                <Download className="w-5 h-5" />
                Export Chat
              </button>
            </div>

            <div className="mt-8">
              <h4 className="font-bold text-gray-900 mb-4">Quick Actions</h4>
              <div className="space-y-2">
                <button className="w-full px-4 py-2 text-left text-gray-700 hover:bg-white rounded-lg transition-all font-medium">
                  Send follow-up
                </button>
                <button className="w-full px-4 py-2 text-left text-gray-700 hover:bg-white rounded-lg transition-all font-medium">
                  Mark as urgent
                </button>
                <button className="w-full px-4 py-2 text-left text-gray-700 hover:bg-white rounded-lg transition-all font-medium">
                  Add to campaign
                </button>
                <button className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 rounded-lg transition-all font-medium">
                  Archive conversation
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
