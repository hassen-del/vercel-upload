import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { AlertTriangle, TrendingDown, TrendingUp, DollarSign, Users, MessageCircle, Clock, XCircle, CheckCircle, Target, Zap, Phone, Mail, Calendar, Download, Filter, Search, Bell, ArrowUpRight, Activity, AlertCircle } from 'lucide-react';
import { branding } from '../config/branding';

export default function PremiumRevenueLeakDashboard({ callsData = [], metrics: propsMetrics = null }) {
  const [timeRange, setTimeRange] = useState('week');
  const [filter, setFilter] = useState('all');
  const [showRecoveryModal, setShowRecoveryModal] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);

  // Use real data from props if available, otherwise use demo data
  const metrics = propsMetrics ? {
    totalLeads: propsMetrics.totalCalls,
    convertedLeads: propsMetrics.bookings,
    conversionRate: propsMetrics.conversions,
    lostRevenue: (propsMetrics.totalCalls - propsMetrics.bookings) * 50,
    recoverableRevenue: (propsMetrics.totalCalls - propsMetrics.bookings) * 25,
    avgServiceValue: 50,
    lifetimeValue: 150,
    
    trends: {
      revenueChange: -14.5,
      conversionChange: -5.2,
      responseTimeChange: +18.3,
      leadsChange: +12.1
    },
    
    predictions: {
      nextWeekLeads: 94,
      potentialRevenue: 14100,
      projectedLoss: 9100,
      recoveryPotential: 6300
    },

    leakSources: {
      noResponse: { count: 23, revenue: 3450, percentage: 41.8, recoverable: 2760, trend: 'up' },
      abandonedBooking: { count: 18, revenue: 2700, percentage: 32.7, recoverable: 2160, trend: 'stable' },
      slowResponse: { count: 8, revenue: 1200, percentage: 14.5, recoverable: 480, trend: 'down' },
      afterHours: { count: 6, revenue: 900, percentage: 10.9, recoverable: 720, trend: 'up' }
    },

    weeklyTrend: [
      { day: 'Mon', leads: 12, converted: 6, lost: 6, revenue: 900, lostRevenue: 900 },
      { day: 'Tue', leads: 15, converted: 8, lost: 7, revenue: 1200, lostRevenue: 1050 },
      { day: 'Wed', leads: 13, converted: 5, lost: 8, revenue: 750, lostRevenue: 1200 },
      { day: 'Thu', leads: 18, converted: 7, lost: 11, revenue: 1050, lostRevenue: 1650 },
      { day: 'Fri', leads: 16, converted: 4, lost: 12, revenue: 600, lostRevenue: 1800 },
      { day: 'Sat', leads: 8, converted: 2, lost: 6, revenue: 300, lostRevenue: 900 },
      { day: 'Sun', leads: 5, converted: 0, lost: 5, revenue: 0, lostRevenue: 750 }
    ],

    responseTime: [
      { range: '<30s', count: 45, percentage: 51.7, converted: 28 },
      { range: '30s-2m', count: 22, percentage: 25.3, converted: 12 },
      { range: '2m-5m', count: 12, percentage: 13.8, converted: 4 },
      { range: '>5m', count: 8, percentage: 9.2, converted: 1 }
    ],

    segments: {
      highValue: { count: 15, converted: 8, avgValue: 300, potential: 2100 },
      mediumValue: { count: 42, converted: 18, avgValue: 150, potential: 3600 },
      lowValue: { count: 30, converted: 6, avgValue: 75, potential: 1800 }
    },
    
    criticalIssues: [
      {
        id: 1,
        type: 'abandoned_booking',
        customer: '+1 780-555-1234',
        customerName: 'Sarah M.',
        segment: 'high-value',
        lastMessage: 'I need an appointment',
        timeElapsed: '3 hours ago',
        potentialValue: 300,
        lifetimeValue: 900,
        priority: 95,
        status: 'critical',
        recoverability: 'high',
        suggestedAction: 'Immediate call',
        conversationFlow: [
          { from: 'customer', text: 'I need an appointment for consultation', time: '3h ago' },
          { from: 'bot', text: 'Great! Available times:\n1️⃣ Mon 2PM\n2️⃣ Tue 10AM\n3️⃣ Wed 3PM', time: '3h ago' },
          { from: 'customer', text: '', time: 'No response...' }
        ],
        insights: [
          'Previously booked 2 appointments',
          'High engagement rate',
          '85% likely to convert with follow-up'
        ]
      },
      {
        id: 2,
        type: 'no_response',
        customer: '+1 403-555-7890',
        customerName: 'John D.',
        segment: 'medium-value',
        lastMessage: 'How much does it cost?',
        timeElapsed: '5 hours ago',
        potentialValue: 150,
        lifetimeValue: 450,
        priority: 88,
        status: 'urgent',
        recoverability: 'medium',
        suggestedAction: 'Send pricing + booking link',
        conversationFlow: [
          { from: 'customer', text: 'How much does a consultation cost?', time: '5h ago' },
          { from: 'bot', text: '', time: 'Bot failed to respond' }
        ],
        insights: [
          'New customer',
          'Price-sensitive query',
          'Requires immediate response'
        ]
      },
      {
        id: 3,
        type: 'after_hours',
        customer: '+1 587-555-4321',
        customerName: 'Emily R.',
        segment: 'medium-value',
        lastMessage: 'Are you open now?',
        timeElapsed: 'Saturday 8PM',
        potentialValue: 150,
        lifetimeValue: 450,
        priority: 72,
        status: 'warning',
        recoverability: 'high',
        suggestedAction: 'Morning follow-up',
        conversationFlow: [
          { from: 'customer', text: 'Are you open now? Need help urgently', time: 'Sat 8PM' },
          { from: 'bot', text: 'We\'re open Mon-Fri 9AM-6PM, Sat 10AM-4PM.', time: 'Sat 8PM' },
          { from: 'customer', text: '', time: 'No follow-up sent' }
        ],
        insights: [
          'Expressed urgency',
          'Weekend inquiry',
          'Send Monday morning follow-up'
        ]
      }
    ],
    
    hourlyConversions: [
      { hour: '9AM', leads: 5, converted: 3, lost: 2, convRate: 60 },
      { hour: '10AM', leads: 8, converted: 4, lost: 4, convRate: 50 },
      { hour: '11AM', leads: 6, converted: 3, lost: 3, convRate: 50 },
      { hour: '12PM', leads: 4, converted: 2, lost: 2, convRate: 50 },
      { hour: '1PM', leads: 7, converted: 2, lost: 5, convRate: 28.6 },
      { hour: '2PM', leads: 9, converted: 5, lost: 4, convRate: 55.6 },
      { hour: '3PM', leads: 8, converted: 3, lost: 5, convRate: 37.5 },
      { hour: '4PM', leads: 6, converted: 4, lost: 2, convRate: 66.7 },
      { hour: '5PM', leads: 5, converted: 2, lost: 3, convRate: 40 }
    ]
  } : {
    totalLeads: 87,
    convertedLeads: 32,
    conversionRate: 36.8,
    lostRevenue: 8250,
    recoverableRevenue: 5400,
    avgServiceValue: 150,
    lifetimeValue: 450,
    trends: { revenueChange: -14.5, conversionChange: -5.2, responseTimeChange: +18.3, leadsChange: +12.1 },
    predictions: { nextWeekLeads: 94, potentialRevenue: 14100, projectedLoss: 9100, recoveryPotential: 6300 },
    leakSources: {
      noResponse: { count: 23, revenue: 3450, percentage: 41.8, recoverable: 2760, trend: 'up' },
      abandonedBooking: { count: 18, revenue: 2700, percentage: 32.7, recoverable: 2160, trend: 'stable' },
      slowResponse: { count: 8, revenue: 1200, percentage: 14.5, recoverable: 480, trend: 'down' },
      afterHours: { count: 6, revenue: 900, percentage: 10.9, recoverable: 720, trend: 'up' }
    },
    weeklyTrend: [
      { day: 'Mon', leads: 12, converted: 6, lost: 6, revenue: 900, lostRevenue: 900 },
      { day: 'Tue', leads: 15, converted: 8, lost: 7, revenue: 1200, lostRevenue: 1050 },
      { day: 'Wed', leads: 13, converted: 5, lost: 8, revenue: 750, lostRevenue: 1200 },
      { day: 'Thu', leads: 18, converted: 7, lost: 11, revenue: 1050, lostRevenue: 1650 },
      { day: 'Fri', leads: 16, converted: 4, lost: 12, revenue: 600, lostRevenue: 1800 },
      { day: 'Sat', leads: 8, converted: 2, lost: 6, revenue: 300, lostRevenue: 900 },
      { day: 'Sun', leads: 5, converted: 0, lost: 5, revenue: 0, lostRevenue: 750 }
    ],
    responseTime: [
      { range: '<30s', count: 45, percentage: 51.7, converted: 28 },
      { range: '30s-2m', count: 22, percentage: 25.3, converted: 12 },
      { range: '2m-5m', count: 12, percentage: 13.8, converted: 4 },
      { range: '>5m', count: 8, percentage: 9.2, converted: 1 }
    ],
    segments: {
      highValue: { count: 15, converted: 8, avgValue: 300, potential: 2100 },
      mediumValue: { count: 42, converted: 18, avgValue: 150, potential: 3600 },
      lowValue: { count: 30, converted: 6, avgValue: 75, potential: 1800 }
    },
    criticalIssues: [],
    hourlyBreakdown: [
      { hour: '9AM', leads: 5, converted: 2, lost: 3, convRate: 40 },
      { hour: '10AM', leads: 8, converted: 4, lost: 4, convRate: 50 },
      { hour: '11AM', leads: 6, converted: 3, lost: 3, convRate: 50 },
      { hour: '12PM', leads: 4, converted: 2, lost: 2, convRate: 50 },
      { hour: '1PM', leads: 7, converted: 2, lost: 5, convRate: 28.6 },
      { hour: '2PM', leads: 9, converted: 5, lost: 4, convRate: 55.6 },
      { hour: '3PM', leads: 8, converted: 3, lost: 5, convRate: 37.5 },
      { hour: '4PM', leads: 6, converted: 4, lost: 2, convRate: 66.7 },
      { hour: '5PM', leads: 5, converted: 2, lost: 3, convRate: 40 }
    ]
  };

  const COLORS = {
    primary: '#3B82F6',
    success: '#10B981',
    warning: '#F59E0B',
    danger: '#EF4444',
    purple: '#8B5CF6',
    indigo: '#6366F1'
  };

  const pieData = [
    { name: 'No Response', value: metrics.leakSources.noResponse.revenue, color: COLORS.danger },
    { name: 'Abandoned', value: metrics.leakSources.abandonedBooking.revenue, color: COLORS.warning },
    { name: 'Slow Response', value: metrics.leakSources.slowResponse.revenue, color: COLORS.purple },
    { name: 'After Hours', value: metrics.leakSources.afterHours.revenue, color: COLORS.primary }
  ];

  const StatCard = ({ title, value, subtitle, icon: Icon, trend, trendValue, prediction, color }) => (
    <div className="group relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
      {/* Subtle gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>
      
      <div className="relative">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">{title}</p>
            <div className="flex items-baseline gap-3 mb-2">
              <p className="text-5xl font-bold text-gray-900">{value}</p>
              {trend && (
                <span className={`flex items-center gap-1 text-sm font-bold px-2.5 py-1 rounded-lg ${
                  trendValue > 0 ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'
                }`}>
                  {trendValue > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  {Math.abs(trendValue)}%
                </span>
              )}
            </div>
            {subtitle && <p className="text-sm text-gray-600 font-medium">{subtitle}</p>}
          </div>
          <div className={`p-4 rounded-2xl ${color.replace('from-', 'bg-').split(' ')[0].replace('to-', '').replace('bg-bg-', 'bg-')} bg-opacity-10`}>
            <Icon className={`w-8 h-8 ${color.includes('red') ? 'text-red-500' : color.includes('green') ? 'text-green-500' : color.includes('orange') ? 'text-orange-500' : 'text-blue-500'}`} />
          </div>
        </div>

        {prediction && (
          <div className="pt-6 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Next Week Forecast</p>
                <p className="text-2xl font-bold text-gray-900">{prediction}</p>
              </div>
              <ArrowUpRight className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const IssueCard = ({ issue }) => {
    const getTypeIcon = (type) => {
      switch(type) {
        case 'no_response': return XCircle;
        case 'abandoned_booking': return AlertTriangle;
        case 'slow_response': return Clock;
        case 'after_hours': return MessageCircle;
        default: return AlertTriangle;
      }
    };

    const Icon = getTypeIcon(issue.type);
    
    const priorityColors = issue.priority >= 90 ? 'from-red-500 to-pink-500' : 
                          issue.priority >= 75 ? 'from-orange-500 to-red-500' : 
                          'from-yellow-500 to-orange-500';

    return (
      <div className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-start gap-4 flex-1">
            <div className={`p-3 rounded-xl bg-gradient-to-br ${priorityColors} bg-opacity-10`}>
              <Icon className={`w-6 h-6 bg-gradient-to-br ${priorityColors} bg-clip-text text-transparent`} style={{WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', filter: 'brightness(0.8)'}} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <h3 className="text-xl font-bold text-gray-900">{issue.customerName}</h3>
                <span className="text-sm text-gray-500 font-mono">{issue.customer}</span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  issue.recoverability === 'high' ? 'bg-green-100 text-green-700' :
                  issue.recoverability === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {issue.recoverability.toUpperCase()} RECOVERY
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{issue.timeElapsed} • {issue.suggestedAction}</p>
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-3">
            <div className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${priorityColors} flex items-center justify-center`}>
              <span className="text-3xl font-black text-white">{issue.priority}</span>
              <div className="absolute -bottom-1 -right-1 bg-white rounded-lg px-2 py-0.5 shadow-lg">
                <span className="text-xs font-bold text-gray-700">Priority</span>
              </div>
            </div>
            <div className="text-right bg-gray-50 rounded-xl px-4 py-3">
              <p className="text-xs text-gray-500 font-medium mb-1">Deal Value</p>
              <p className="text-2xl font-black text-gray-900">${issue.potentialValue}</p>
              <p className="text-xs text-blue-600 font-bold mt-1">LTV ${issue.lifetimeValue}</p>
            </div>
          </div>
        </div>

        {/* AI Insights */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 mb-5 border border-blue-100">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-5 h-5 text-blue-600" />
            <p className="text-sm font-bold text-blue-900 uppercase tracking-wide">AI Insights</p>
          </div>
          <ul className="space-y-2">
            {issue.insights.map((insight, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                <span className="text-sm text-gray-700 leading-relaxed">{insight}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Conversation Timeline */}
        <div className="space-y-3 mb-6">
          {issue.conversationFlow.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.from === 'customer' ? 'justify-start' : 'justify-end'}`}>
              <div className={`max-w-[75%] ${
                msg.from === 'customer' 
                  ? 'bg-gray-100' 
                  : msg.text 
                    ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white'
                    : 'bg-red-50 border-2 border-red-200'
              } rounded-2xl px-5 py-3 shadow-sm`}>
                <p className={`text-sm leading-relaxed ${
                  msg.from === 'customer' ? 'text-gray-900' :
                  msg.text ? 'text-white' : 'text-red-600 italic font-medium'
                }`}>
                  {msg.text || msg.time}
                </p>
                <p className={`text-xs mt-2 ${
                  msg.from === 'customer' ? 'text-gray-500' :
                  msg.text ? 'text-blue-100' : 'text-red-400'
                }`}>
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-3">
          <button 
            onClick={() => {
              setSelectedIssue(issue);
              setShowRecoveryModal(true);
            }}
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-3.5 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30"
          >
            <Zap className="w-4 h-4" />
            Auto-Recover
          </button>
          <button className="border-2 border-green-500 text-green-700 px-5 py-3.5 rounded-xl hover:bg-green-50 transition-all duration-300 text-sm font-bold flex items-center justify-center gap-2">
            <Phone className="w-4 h-4" />
            Call Now
          </button>
          <button className="border-2 border-gray-300 text-gray-700 px-5 py-3.5 rounded-xl hover:bg-gray-50 transition-all duration-300 text-sm font-bold flex items-center justify-center gap-2">
            <Calendar className="w-4 h-4" />
            Schedule
          </button>
        </div>
      </div>
    );
  };

  const RecoveryModal = ({ issue, onClose }) => {
    if (!issue) return null;
    
    const recoveryTemplates = [
      {
        id: 1,
        name: 'Friendly Reminder',
        message: `Hi ${issue.customerName}! Just following up on your interest in booking. We still have those times available. Reply with 1, 2, or 3 to confirm!`,
        successRate: 68
      },
      {
        id: 2,
        name: 'Urgency + Value',
        message: `Hi ${issue.customerName}! Those appointment slots are filling up fast. Book in the next hour and get 10% off your first service!`,
        successRate: 72
      },
      {
        id: 3,
        name: 'Help + Alternative',
        message: `Hi ${issue.customerName}! Haven't heard back - did you need different times? I can check other availability or answer any questions!`,
        successRate: 65
      }
    ];

    return (
      <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
        <div className="bg-white rounded-3xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto shadow-2xl animate-slideUp">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">Recovery Campaign</h3>
              <p className="text-gray-600">Choose a template to recover this opportunity</p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-xl transition-all">
              <XCircle className="w-6 h-6" />
            </button>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 mb-8 border border-blue-100">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-xl font-bold text-gray-900">{issue.customerName}</p>
                <p className="text-sm text-gray-600">{issue.suggestedAction}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-white rounded-xl p-4">
                <p className="text-xs text-gray-500 mb-1">Deal Value</p>
                <p className="text-2xl font-bold text-gray-900">${issue.potentialValue}</p>
              </div>
              <div className="bg-white rounded-xl p-4">
                <p className="text-xs text-gray-500 mb-1">Recovery Probability</p>
                <p className="text-2xl font-bold text-green-600">70%</p>
              </div>
            </div>
          </div>

          <h4 className="font-bold text-gray-900 mb-4 text-lg">Select Recovery Template</h4>
          <div className="space-y-4 mb-8">
            {recoveryTemplates.map(template => (
              <div key={template.id} className="group border-2 border-gray-200 rounded-2xl p-6 hover:border-blue-500 hover:shadow-lg cursor-pointer transition-all">
                <div className="flex items-center justify-between mb-3">
                  <p className="font-bold text-gray-900 text-lg">{template.name}</p>
                  <div className="flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-lg">
                    <Activity className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-bold text-green-600">{template.successRate}% success</span>
                  </div>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed mb-4 bg-gray-50 p-4 rounded-xl">{template.message}</p>
                <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3.5 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all font-bold shadow-lg shadow-blue-500/30">
                  Send This Message
                </button>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <p className="text-sm font-semibold text-green-900">Predicted Recovery</p>
            </div>
            <p className="text-3xl font-black text-green-700">${Math.round(issue.potentialValue * 0.7)}</p>
            <p className="text-sm text-green-700 mt-1">Based on 70% conversion probability</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-gray-50 w-full">
      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Time Range */}
        <div className="mb-12 flex gap-3">
          {['today', 'week', 'month'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-8 py-3.5 rounded-xl font-bold transition-all duration-300 ${
                timeRange === range
                  ? 'bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-xl shadow-red-500/30 scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200'
              }`}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <StatCard
            title="Lost Revenue"
            value={`$${metrics.lostRevenue.toLocaleString()}`}
            subtitle="This week"
            icon={DollarSign}
            trend={true}
            trendValue={metrics.trends.revenueChange}
            color="from-red-500 to-pink-500"
            prediction={`$${metrics.predictions.projectedLoss.toLocaleString()}`}
          />
          <StatCard
            title="Recoverable"
            value={`$${metrics.recoverableRevenue.toLocaleString()}`}
            subtitle="65% can be saved"
            icon={Target}
            trend={false}
            trendValue={-8.2}
            color="from-green-500 to-emerald-500"
            prediction={`$${metrics.predictions.recoveryPotential.toLocaleString()}`}
          />
          <StatCard
            title="Conversion Rate"
            value={`${metrics.conversionRate}%`}
            subtitle={`${metrics.convertedLeads} of ${metrics.totalLeads} leads`}
            icon={Activity}
            trend={true}
            trendValue={metrics.trends.conversionChange}
            color="from-orange-500 to-red-500"
          />
          <StatCard
            title="Response Time"
            value="1.2s"
            subtitle="Target: <5s"
            icon={Clock}
            trend={true}
            trendValue={metrics.trends.responseTimeChange}
            color="from-blue-500 to-indigo-500"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-3xl shadow-sm p-8 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Weekly Revenue Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={metrics.weeklyTrend}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorLost" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" stroke="#9ca3af" style={{fontSize: '12px', fontWeight: 600}} />
                <YAxis stroke="#9ca3af" style={{fontSize: '12px', fontWeight: 600}} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '2px solid #e5e7eb',
                    borderRadius: '12px',
                    padding: '12px'
                  }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={3} fill="url(#colorRevenue)" />
                <Area type="monotone" dataKey="lostRevenue" stroke="#EF4444" strokeWidth={3} fill="url(#colorLost)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-3xl shadow-sm p-8 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Conversion by Hour</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={metrics.hourlyConversions}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="hour" stroke="#9ca3af" style={{fontSize: '12px', fontWeight: 600}} />
                <YAxis stroke="#9ca3af" style={{fontSize: '12px', fontWeight: 600}} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '2px solid #e5e7eb',
                    borderRadius: '12px',
                    padding: '12px'
                  }}
                />
                <Bar dataKey="converted" fill="#10B981" radius={[8, 8, 0, 0]} />
                <Bar dataKey="lost" fill="#EF4444" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recovery Potential Banner */}
        <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-3xl p-10 mb-12 shadow-2xl shadow-green-500/30">
          <div className="flex items-center justify-between">
            <div className="text-white">
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-10 h-10" />
                <h3 className="text-3xl font-black">Recovery Opportunity</h3>
              </div>
              <p className="text-xl font-semibold text-green-50 mb-2">You can recover up to</p>
              <p className="text-6xl font-black mb-4">${metrics.recoverableRevenue.toLocaleString()}</p>
              <p className="text-green-100 text-lg">with automated follow-up campaigns</p>
            </div>
            <button className="bg-white text-green-600 px-10 py-5 rounded-2xl hover:bg-green-50 transition-all font-black text-xl shadow-2xl hover:scale-105 duration-300">
              Start Recovery →
            </button>
          </div>
        </div>

        {/* Critical Issues */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-black text-gray-900 mb-2">Critical Issues</h2>
              <p className="text-gray-600 text-lg">Sorted by priority • Immediate action required</p>
            </div>
            <span className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-6 py-3 rounded-2xl text-lg font-bold shadow-lg shadow-red-500/30">
              {metrics.criticalIssues.length} Urgent
            </span>
          </div>
          <div className="space-y-6">
            {metrics.criticalIssues
              .sort((a, b) => b.priority - a.priority)
              .map((issue) => (
                <IssueCard key={issue.id} issue={issue} />
              ))}
          </div>
        </div>

        {/* Action Plan */}
        <div className="bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-3xl p-10 shadow-2xl shadow-blue-500/30">
          <h3 className="text-3xl font-black text-white mb-8">Automated Recovery Plan</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {[
              { num: 1, title: 'Instant Follow-Up', desc: 'Auto-send after 2 hours', savings: '$2,400/week' },
              { num: 2, title: 'Priority Queue', desc: 'High-value leads get instant attention', savings: '$1,800/week' },
              { num: 3, title: 'Smart Reminders', desc: '24h reminder for abandoned bookings', savings: '$1,200/week' },
              { num: 4, title: 'After-Hours Recovery', desc: 'Next-day follow-up automation', savings: '$600/week' }
            ].map((action) => (
              <div key={action.num} className="bg-white bg-opacity-15 backdrop-blur-lg rounded-2xl p-6 hover:bg-opacity-20 transition-all">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white bg-opacity-20 flex items-center justify-center font-black text-2xl text-white flex-shrink-0">
                    {action.num}
                  </div>
                  <div>
                    <h4 className="font-bold text-xl text-white mb-2">{action.title}</h4>
                    <p className="text-blue-100 text-sm mb-3">{action.desc}</p>
                    <p className="text-2xl font-black text-white">{action.savings}</p>
                  </div>
                </div>
                <button className="w-full bg-white text-blue-600 px-6 py-3 rounded-xl hover:bg-blue-50 transition-all font-bold shadow-lg">
                  Activate Now
                </button>
              </div>
            ))}
          </div>
          <div className="bg-white bg-opacity-15 backdrop-blur-lg rounded-2xl p-8 text-center border-2 border-white border-opacity-30">
            <p className="text-blue-100 text-lg mb-3">Total Annual Recovery Potential</p>
            <p className="text-6xl font-black text-white mb-2">$312,000</p>
            <p className="text-blue-100 text-lg">with all systems active</p>
          </div>
        </div>
      </div>

      {showRecoveryModal && (
        <RecoveryModal 
          issue={selectedIssue} 
          onClose={() => {
            setShowRecoveryModal(false);
            setSelectedIssue(null);
          }}
        />
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
