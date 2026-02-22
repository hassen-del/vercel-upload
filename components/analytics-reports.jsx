import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Funnel, FunnelChart } from 'recharts';
import { DollarSign, Users, Target, Clock, TrendingUp, TrendingDown, Download, Calendar, Filter, RefreshCw, Bell, Settings, Sparkles, CheckCircle, ArrowUpRight, Activity, Phone, Mail, MapPin } from 'lucide-react';
import { branding } from '../config/branding';

export default function AnalyticsReports() {
  const [dateRange, setDateRange] = useState('30days');
  const [compare, setCompare] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Revenue trend data
  const revenueTrendData = [
    { date: 'Jan 14', revenue: 1730, previous: 1200 },
    { date: 'Jan 15', revenue: 1644, previous: 1350 },
    { date: 'Jan 16', revenue: 1211, previous: 1100 },
    { date: 'Jan 17', revenue: 1470, previous: 1250 },
    { date: 'Jan 18', revenue: 1730, previous: 1400 },
    { date: 'Jan 19', revenue: 1298, previous: 1150 },
    { date: 'Jan 20', revenue: 1554, previous: 1300 },
  ];

  // Lead sources data
  const leadSourcesData = [
    { name: 'Website', value: 129, color: '#3b82f6' },
    { name: 'SMS', value: 86, color: '#10b981' },
    { name: 'Phone', value: 43, color: '#f59e0b' },
    { name: 'Referral', value: 29, color: '#8b5cf6' },
  ];

  // Conversion funnel data
  const funnelData = [
    { stage: 'Inquiries', value: 287, percentage: 100, color: '#3b82f6' },
    { stage: 'Qualified', value: 198, percentage: 69, color: '#10b981' },
    { stage: 'Quote Sent', value: 156, percentage: 54, color: '#f59e0b' },
    { stage: 'Booked', value: 123, percentage: 43, color: '#8b5cf6' },
    { stage: 'Completed', value: 98, percentage: 34, color: '#06b6d4' },
  ];

  // Hourly performance data
  const hourlyData = [
    { hour: '9 AM', leads: 12, rate: 45 },
    { hour: '10 AM', leads: 18, rate: 52 },
    { hour: '11 AM', leads: 24, rate: 58 },
    { hour: '12 PM', leads: 15, rate: 38 },
    { hour: '1 PM', leads: 20, rate: 48 },
    { hour: '2 PM', leads: 28, rate: 65 },
    { hour: '3 PM', leads: 32, rate: 71 },
    { hour: '4 PM', leads: 22, rate: 55 },
    { hour: '5 PM', leads: 16, rate: 42 },
  ];

  // Detailed table data
  const dailyData = [
    { date: 'Jan 20', leads: 42, converted: 18, conversionRate: 42.9, revenue: 1554, avgDeal: 86.33, responseTime: '0.7s' },
    { date: 'Jan 19', leads: 38, converted: 15, conversionRate: 39.5, revenue: 1298, avgDeal: 86.53, responseTime: '0.9s' },
    { date: 'Jan 18', leads: 45, converted: 20, conversionRate: 44.4, revenue: 1730, avgDeal: 86.50, responseTime: '0.8s' },
    { date: 'Jan 17', leads: 40, converted: 17, conversionRate: 42.5, revenue: 1470, avgDeal: 86.47, responseTime: '0.8s' },
    { date: 'Jan 16', leads: 36, converted: 14, conversionRate: 38.9, revenue: 1211, avgDeal: 86.50, responseTime: '1.1s' },
    { date: 'Jan 15', leads: 44, converted: 19, conversionRate: 43.2, revenue: 1644, avgDeal: 86.53, responseTime: '0.7s' },
    { date: 'Jan 14', leads: 42, converted: 20, conversionRate: 47.6, revenue: 1730, avgDeal: 86.50, responseTime: '0.6s' },
  ];

  const getBarColor = (rate) => {
    if (rate >= 60) return '#10b981';
    if (rate >= 45) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div className="bg-gray-50 w-full">
      <div className="max-w-[1920px] mx-auto px-8 py-8">
        {/* Analytics Header */}
        <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl font-black text-gray-900 mb-2">Analytics & Reports</h1>
              <p className="text-gray-600">Comprehensive business insights and performance metrics</p>
            </div>
            
            <div className="flex items-center gap-3">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-4 py-2 border-2 border-gray-200 rounded-xl font-semibold focus:outline-none focus:border-blue-500"
              >
                <option value="today">Today</option>
                <option value="7days">Last 7 Days</option>
                <option value="30days">Last 30 Days</option>
                <option value="90days">Last 90 Days</option>
                <option value="custom">Custom Range</option>
              </select>

              <label className="flex items-center gap-2 px-4 py-2 border-2 border-gray-200 rounded-xl font-semibold cursor-pointer hover:bg-gray-50">
                <input
                  type="checkbox"
                  checked={compare}
                  onChange={(e) => setCompare(e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-sm">Compare</span>
              </label>

              <button className="px-6 py-2 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-all flex items-center gap-2">
                <Download className="w-5 h-5" />
                Export Report
              </button>

              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <RefreshCw className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-4">Last updated: 2 minutes ago</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 border-2 border-green-200 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600 font-semibold">Total Revenue</p>
                <p className="text-4xl font-black text-gray-900">$24,850</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-green-600 text-sm font-bold">
              <TrendingUp className="w-4 h-4" />
              <span>+23.5%</span>
              <span className="text-gray-400">vs previous</span>
            </div>
            <div className="mt-3 h-8">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueTrendData.slice(-7)}>
                  <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border-2 border-blue-200 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600 font-semibold">Leads Captured</p>
                <p className="text-4xl font-black text-gray-900">287</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-green-600 text-sm font-bold">
              <TrendingUp className="w-4 h-4" />
              <span>+18.2%</span>
            </div>
            <p className="text-sm text-gray-600 mt-2">Conversion: 42.8%</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border-2 border-orange-200 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600 font-semibold">Conversion Rate</p>
                <p className="text-4xl font-black text-gray-900">42.8%</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-green-600 text-sm font-bold">
              <TrendingUp className="w-4 h-4" />
              <span>+5.3%</span>
            </div>
            <p className="text-sm text-gray-600 mt-2">Industry avg: 31.2%</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border-2 border-purple-200 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600 font-semibold">Avg Deal Value</p>
                <p className="text-4xl font-black text-gray-900">$86.50</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-green-600 text-sm font-bold">
              <TrendingUp className="w-4 h-4" />
              <span>+4.1%</span>
            </div>
            <p className="text-sm text-gray-600 mt-2">Range: $45-$350</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border-2 border-indigo-200 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600 font-semibold">Response Time</p>
                <p className="text-4xl font-black text-gray-900">0.8s</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-green-600 text-sm font-bold">
              <TrendingDown className="w-4 h-4" />
              <span>-22.1%</span>
              <span className="text-gray-400">faster</span>
            </div>
            <p className="text-sm text-gray-600 mt-2">Target: &lt;5s</p>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Revenue Over Time */}
          <div className="bg-white rounded-2xl p-6 shadow-xl border-2 border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Revenue Trend</h3>
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm font-semibold">Daily</button>
                <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm font-semibold">Weekly</button>
                <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm font-semibold">Monthly</button>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueTrendData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                {compare && <Line type="monotone" dataKey="previous" stroke="#9ca3af" strokeWidth={2} strokeDasharray="5 5" />}
                <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Lead Sources */}
          <div className="bg-white rounded-2xl p-6 shadow-xl border-2 border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Lead Sources Breakdown</h3>
            <div className="flex items-center gap-8">
              <div className="flex-1">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={leadSourcesData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {leadSourcesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-3">
                {leadSourcesData.map((source, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded" style={{backgroundColor: source.color}}></div>
                    <div>
                      <div className="font-bold text-gray-900">{source.name}</div>
                      <div className="text-sm text-gray-600">{source.value} leads ({Math.round(source.value/287*100)}%)</div>
                    </div>
                  </div>
                ))}
                <div className="pt-3 border-t border-gray-200">
                  <div className="font-bold text-gray-900">Total</div>
                  <div className="text-2xl font-black text-blue-600">287</div>
                </div>
              </div>
            </div>
          </div>

          {/* Conversion Funnel */}
          <div className="bg-white rounded-2xl p-6 shadow-xl border-2 border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Sales Funnel</h3>
            <div className="space-y-3">
              {funnelData.map((stage, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-900">{stage.stage}</span>
                    <span className="text-sm text-gray-600">{stage.value} ({stage.percentage}%)</span>
                  </div>
                  <div className="relative h-12 rounded-xl overflow-hidden" style={{backgroundColor: '#f3f4f6'}}>
                    <div 
                      className="absolute h-full rounded-xl transition-all duration-500"
                      style={{
                        width: `${stage.percentage}%`,
                        backgroundColor: stage.color
                      }}
                    >
                      <div className="flex items-center justify-center h-full text-white font-bold">
                        {stage.value}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hourly Performance */}
          <div className="bg-white rounded-2xl p-6 shadow-xl border-2 border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Performance by Hour</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="hour" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Bar dataKey="leads" radius={[8, 8, 0, 0]}>
                  {hourlyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getBarColor(entry.rate)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="flex items-center justify-center gap-4 mt-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-green-500"></div>
                <span>High (&gt;60%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-yellow-500"></div>
                <span>Medium (45-60%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-red-500"></div>
                <span>Low (&lt;45%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content with Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Detailed Table */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex gap-2 mb-4">
                  {['overview', 'revenue', 'leads', 'appointments', 'behavior'].map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                        activeTab === tab
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Date</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Leads</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Converted</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Revenue</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Avg Deal</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Response</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dailyData.map((row, idx) => (
                      <tr key={idx} className="border-t border-gray-200 hover:bg-gray-50">
                        <td className="px-6 py-4 font-semibold text-gray-900">{row.date}</td>
                        <td className="px-6 py-4 text-gray-700">
                          {row.leads}
                          <span className="ml-2 text-xs text-green-600">↑</span>
                        </td>
                        <td className="px-6 py-4 text-gray-700">
                          {row.converted}
                          <span className="ml-2 text-xs text-gray-500">({row.conversionRate}%)</span>
                        </td>
                        <td className="px-6 py-4 font-bold text-gray-900">${row.revenue}</td>
                        <td className="px-6 py-4 text-gray-700">${row.avgDeal}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                            parseFloat(row.responseTime) < 1 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {row.responseTime}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Insights Sidebar */}
          <div className="space-y-6">
            {/* AI Insights */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-6 shadow-xl text-white">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-6 h-6" />
                <h3 className="text-xl font-bold">Key Insights</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <div className="text-2xl">🚀</div>
                  <div>
                    <p className="font-semibold">Revenue up 23.5%</p>
                    <p className="text-sm text-blue-100">Highest in 3 months</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="text-2xl">⚡</div>
                  <div>
                    <p className="font-semibold">Response time improved 22%</p>
                    <p className="text-sm text-blue-100">This week</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="text-2xl">📈</div>
                  <div>
                    <p className="font-semibold">Tuesday has highest conversion</p>
                    <p className="text-sm text-blue-100">48.2% success rate</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="text-2xl">⏰</div>
                  <div>
                    <p className="font-semibold">Peak performance: 2-4 PM</p>
                    <p className="text-sm text-blue-100">71% conversion rate</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="text-2xl">💰</div>
                  <div>
                    <p className="font-semibold">High-value leads convert 15% better</p>
                    <p className="text-sm text-blue-100">$200+ deals</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-white rounded-2xl p-6 shadow-xl border-2 border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Recommended Actions</h3>
              <div className="space-y-3">
                <div className="p-3 bg-green-50 rounded-xl border border-green-200">
                  <p className="font-semibold text-gray-900 mb-2">Schedule more slots on Tue/Wed</p>
                  <button className="text-sm text-green-600 font-bold flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" />
                    Take Action
                  </button>
                </div>
                <div className="p-3 bg-orange-50 rounded-xl border border-orange-200">
                  <p className="font-semibold text-gray-900 mb-2">Follow up with 12 pending high-value leads</p>
                  <button className="text-sm text-orange-600 font-bold flex items-center gap-1">
                    <ArrowUpRight className="w-4 h-4" />
                    View Leads
                  </button>
                </div>
                <div className="p-3 bg-blue-50 rounded-xl border border-blue-200">
                  <p className="font-semibold text-gray-900 mb-2">Automate 2-4 PM instant responses</p>
                  <button className="text-sm text-blue-600 font-bold flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" />
                    Set Up
                  </button>
                </div>
              </div>
            </div>

            {/* Goals */}
            <div className="bg-white rounded-2xl p-6 shadow-xl border-2 border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Monthly Goal</h3>
              <div className="mb-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Revenue Target</span>
                  <span className="font-bold text-gray-900">$50,000</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 h-4 rounded-full" style={{width: '49.7%'}}></div>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm font-bold text-green-600">$24,850 (49.7%)</span>
                  <span className="text-sm text-gray-600">11 days remaining</span>
                </div>
              </div>
              <div className="pt-3 border-t border-gray-200">
                <p className="text-sm text-gray-600">Required daily average</p>
                <p className="text-2xl font-black text-gray-900">$2,286</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
