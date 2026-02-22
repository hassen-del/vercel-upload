import React, { useState } from 'react';
import { Calendar, Clock, User, Phone, Mail, CheckCircle, XCircle, AlertCircle, ChevronLeft, ChevronRight, Plus, Edit, Trash2, Send, Video, MapPin, DollarSign, Users, TrendingUp, Filter, Search, Bell, Settings } from 'lucide-react';

export default function AppointmentsCalendar() {
  const [viewMode, setViewMode] = useState('month'); // month, week, day, list
  const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 20)); // Jan 20, 2026
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showNewModal, setShowNewModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');

  // Sample appointments data
  const appointments = [
    { id: 1, date: '2026-01-20', time: '09:00', customer: 'Sarah M.', phone: '+1 780-555-1234', service: 'Initial Consultation', duration: 60, status: 'confirmed', value: 300, notes: 'First time client' },
    { id: 2, date: '2026-01-20', time: '14:00', customer: 'John D.', phone: '+1 403-555-7890', service: 'Follow-up', duration: 45, status: 'pending', value: 150, notes: 'Needs quote confirmation' },
    { id: 3, date: '2026-01-20', time: '16:30', customer: 'Emily R.', phone: '+1 587-555-4321', service: 'Assessment', duration: 60, status: 'confirmed', value: 150, notes: '' },
    
    { id: 4, date: '2026-01-21', time: '10:00', customer: 'Michael T.', phone: '+1 416-555-9876', service: 'Full Service', duration: 90, status: 'confirmed', value: 300, notes: 'Premium package' },
    { id: 5, date: '2026-01-21', time: '13:00', customer: 'Lisa W.', phone: '+1 780-555-3333', service: 'Consultation', duration: 60, status: 'pending', value: 150, notes: '' },
    { id: 6, date: '2026-01-21', time: '15:00', customer: 'David K.', phone: '+1 780-555-4444', service: 'Review', duration: 45, status: 'confirmed', value: 150, notes: 'Returning client' },
    
    { id: 7, date: '2026-01-22', time: '09:30', customer: 'Jennifer L.', phone: '+1 780-555-5555', service: 'Initial Visit', duration: 60, status: 'confirmed', value: 150, notes: '' },
    { id: 8, date: '2026-01-22', time: '11:00', customer: 'Robert P.', phone: '+1 780-555-6666', service: 'Consultation', duration: 60, status: 'cancelled', value: 150, notes: 'Client cancelled' },
    { id: 9, date: '2026-01-22', time: '14:00', customer: 'Amanda S.', phone: '+1 780-555-7777', service: 'Assessment', duration: 60, status: 'pending', value: 150, notes: '' },
    
    { id: 10, date: '2026-01-23', time: '10:00', customer: 'Chris B.', phone: '+1 780-555-8888', service: 'Follow-up', duration: 45, status: 'confirmed', value: 150, notes: '' },
    { id: 11, date: '2026-01-23', time: '13:30', customer: 'Nicole H.', phone: '+1 780-555-9999', service: 'Full Service', duration: 90, status: 'confirmed', value: 300, notes: 'VIP client' },
    
    { id: 12, date: '2026-01-24', time: '09:00', customer: 'Kevin M.', phone: '+1 780-555-1111', service: 'Initial Consultation', duration: 60, status: 'pending', value: 150, notes: '' },
    { id: 13, date: '2026-01-24', time: '11:30', customer: 'Rachel T.', phone: '+1 780-555-2222', service: 'Assessment', duration: 60, status: 'confirmed', value: 150, notes: '' },
    { id: 14, date: '2026-01-24', time: '15:00', customer: 'Brandon W.', phone: '+1 780-555-3344', service: 'Review', duration: 45, status: 'confirmed', value: 150, notes: '' },
    
    { id: 15, date: '2026-01-27', time: '10:00', customer: 'Stephanie K.', phone: '+1 780-555-4455', service: 'Consultation', duration: 60, status: 'confirmed', value: 150, notes: '' },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'confirmed': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'cancelled': return 'bg-red-500';
      case 'completed': return 'bg-gray-400';
      default: return 'bg-gray-500';
    }
  };

  const getStatusTextColor = (status) => {
    switch(status) {
      case 'confirmed': return 'text-green-700 bg-green-100';
      case 'pending': return 'text-yellow-700 bg-yellow-100';
      case 'cancelled': return 'text-red-700 bg-red-100';
      case 'completed': return 'text-gray-700 bg-gray-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  const filterAppointments = (appts) => {
    if (filterStatus === 'all') return appts;
    return appts.filter(a => a.status === filterStatus);
  };

  const getTodaysAppointments = () => {
    const today = '2026-01-20';
    return filterAppointments(appointments.filter(a => a.date === today)).sort((a, b) => a.time.localeCompare(b.time));
  };

  const getUpcomingAppointments = () => {
    const today = '2026-01-20';
    return filterAppointments(appointments.filter(a => a.date > today)).slice(0, 5);
  };

  const stats = {
    today: getTodaysAppointments().length,
    thisWeek: filterAppointments(appointments).length,
    confirmed: appointments.filter(a => a.status === 'confirmed').length,
    pending: appointments.filter(a => a.status === 'pending').length
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const currentDay = new Date(startDate);
    
    for (let i = 0; i < 42; i++) {
      days.push(new Date(currentDay));
      currentDay.setDate(currentDay.getDate() + 1);
    }
    
    return days;
  };

  const getAppointmentsForDate = (date) => {
    const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    return filterAppointments(appointments.filter(a => a.date === dateStr));
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const isToday = (date) => {
    const today = new Date(2026, 0, 20);
    return date.toDateString() === today.toDateString();
  };

  const isCurrentMonth = (date) => {
    return date.getMonth() === currentDate.getMonth();
  };

  return (
    <div className="bg-gray-50 w-full">
      <div className="max-w-[1920px] mx-auto px-8 py-8">
        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 border-2 border-blue-200 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-semibold">Today's Appointments</p>
                <p className="text-4xl font-black text-gray-900">{stats.today}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-semibold">This Week</p>
                <p className="text-4xl font-black text-gray-900">{stats.thisWeek}</p>
                <p className="text-xs text-green-600 font-bold flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> +12%
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border-2 border-green-200 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-semibold">Confirmed</p>
                <p className="text-4xl font-black text-gray-900">{stats.confirmed}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border-2 border-yellow-200 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-semibold">Pending</p>
                <p className="text-4xl font-black text-gray-900">{stats.pending}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Calendar Header */}
        <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-200 mb-8">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" onClick={() => {
                  const newDate = new Date(currentDate);
                  newDate.setMonth(newDate.getMonth() - 1);
                  setCurrentDate(newDate);
                }}>
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <h2 className="text-3xl font-black text-gray-900">{formatDate(currentDate)}</h2>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" onClick={() => {
                  const newDate = new Date(currentDate);
                  newDate.setMonth(newDate.getMonth() + 1);
                  setCurrentDate(newDate);
                }}>
                  <ChevronRight className="w-5 h-5" />
                </button>
                <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-semibold transition-colors" onClick={() => setCurrentDate(new Date(2026, 0, 20))}>
                  Today
                </button>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex gap-2">
                  {['month', 'week', 'day', 'list'].map(mode => (
                    <button
                      key={mode}
                      onClick={() => setViewMode(mode)}
                      className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                        viewMode === mode
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {mode.charAt(0).toUpperCase() + mode.slice(1)}
                    </button>
                  ))}
                </div>

                <select 
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 border-2 border-gray-200 rounded-lg font-semibold focus:outline-none focus:border-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="pending">Pending</option>
                  <option value="cancelled">Cancelled</option>
                </select>

                <button 
                  onClick={() => setShowNewModal(true)}
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  New Appointment
                </button>
              </div>
            </div>
          </div>

          {/* Main Layout */}
          <div className="flex">
            {/* Calendar View */}
            <div className="flex-1 p-6">
              {viewMode === 'month' && (
                <div>
                  {/* Week Days Header */}
                  <div className="grid grid-cols-7 gap-2 mb-2">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                      <div key={day} className="text-center font-bold text-gray-600 py-2">
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 gap-2">
                    {generateCalendarDays().map((date, idx) => {
                      const dayAppts = getAppointmentsForDate(date);
                      const isCurrentMonthDay = isCurrentMonth(date);
                      const isTodayDate = isToday(date);

                      return (
                        <div
                          key={idx}
                          className={`min-h-[120px] p-2 rounded-xl border-2 transition-all ${
                            isTodayDate
                              ? 'border-blue-600 bg-blue-50'
                              : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                          } ${!isCurrentMonthDay ? 'opacity-40' : ''}`}
                        >
                          <div className={`text-sm font-bold mb-2 ${isTodayDate ? 'text-blue-600' : 'text-gray-900'}`}>
                            {date.getDate()}
                          </div>
                          <div className="space-y-1">
                            {dayAppts.slice(0, 3).map(appt => (
                              <div
                                key={appt.id}
                                onClick={() => setSelectedAppointment(appt)}
                                className={`text-xs px-2 py-1 rounded-lg ${getStatusColor(appt.status)} text-white cursor-pointer hover:scale-105 transition-transform truncate`}
                              >
                                {appt.time} {appt.customer}
                              </div>
                            ))}
                            {dayAppts.length > 3 && (
                              <div className="text-xs text-gray-600 font-semibold px-2">
                                +{dayAppts.length - 3} more
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {viewMode === 'list' && (
                <div className="space-y-4">
                  {Object.entries(
                    filterAppointments(appointments)
                      .sort((a, b) => {
                        const dateCompare = a.date.localeCompare(b.date);
                        return dateCompare !== 0 ? dateCompare : a.time.localeCompare(b.time);
                      })
                      .reduce((groups, appt) => {
                        const date = appt.date;
                        if (!groups[date]) groups[date] = [];
                        groups[date].push(appt);
                        return groups;
                      }, {})
                  ).map(([date, appts]) => (
                      <div key={date}>
                        <h3 className="text-lg font-bold text-gray-900 mb-3">
                          {new Date(date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                        </h3>
                        <div className="space-y-2">
                          {appts.map(appt => (
                            <div
                              key={appt.id}
                              onClick={() => setSelectedAppointment(appt)}
                              className="bg-white rounded-xl p-4 border-2 border-gray-200 hover:border-blue-500 cursor-pointer transition-all flex items-center justify-between"
                            >
                              <div className="flex items-center gap-4">
                                <div className="text-center">
                                  <div className="text-2xl font-black text-gray-900">{appt.time}</div>
                                  <div className="text-xs text-gray-600">60 min</div>
                                </div>
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg">
                                  {appt.customer.charAt(0)}
                                </div>
                                <div>
                                  <div className="font-bold text-gray-900">{appt.customer}</div>
                                  <div className="text-sm text-gray-600">{appt.phone}</div>
                                  <div className="text-sm text-gray-600">{appt.service}</div>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusTextColor(appt.status)}`}>
                                  {appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}
                                </span>
                                <div className="text-right">
                                  <div className="font-bold text-gray-900">${appt.value}</div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>

            {/* Right Sidebar */}
            <div className="w-80 border-l border-gray-200 p-6 bg-gray-50">
              {/* Today's Schedule */}
              <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Today's Schedule</h3>
                <p className="text-sm text-gray-600 mb-4">Tuesday, January 20, 2026</p>
                
                {getTodaysAppointments().length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No appointments today</p>
                ) : (
                  <div className="space-y-3">
                    {getTodaysAppointments().map(appt => (
                      <div key={appt.id} className="border-l-4 border-blue-600 pl-4 py-2">
                        <div className="text-2xl font-black text-gray-900">{appt.time}</div>
                        <div className="font-bold text-gray-900">{appt.customer}</div>
                        <div className="text-sm text-gray-600">{appt.phone}</div>
                        <div className="text-sm text-gray-600">{appt.service}</div>
                        <div className="flex items-center gap-2 mt-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-bold ${getStatusTextColor(appt.status)}`}>
                            {appt.status}
                          </span>
                          <span className="text-xs text-gray-600">{appt.duration} min</span>
                        </div>
                        <div className="flex gap-2 mt-2">
                          <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                            <Phone className="w-4 h-4 text-green-600" />
                          </button>
                          <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                            <Edit className="w-4 h-4 text-blue-600" />
                          </button>
                          <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                            <XCircle className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Upcoming */}
              <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Upcoming</h3>
                <p className="text-sm text-gray-600 mb-4">Next 7 Days</p>
                <div className="space-y-3">
                  {getUpcomingAppointments().map(appt => (
                    <div key={appt.id} className="border-b border-gray-200 pb-2">
                      <div className="text-sm font-bold text-gray-900">{appt.date}</div>
                      <div className="text-sm text-gray-600">{appt.time} - {appt.customer}</div>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-bold mt-1 ${getStatusTextColor(appt.status)}`}>
                        {appt.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Stats</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-600">Booking Rate</span>
                      <span className="text-sm font-bold text-green-600">78%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{width: '78%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Avg Duration</div>
                    <div className="text-xl font-bold text-gray-900">45 min</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">No-Show Rate</div>
                    <div className="text-xl font-bold text-gray-900">5%</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Satisfaction</div>
                    <div className="text-xl font-bold text-gray-900">4.8/5</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Appointment Detail Modal */}
      {selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-black text-gray-900">Appointment Details</h2>
                <button onClick={() => setSelectedAppointment(null)} className="p-2 hover:bg-gray-100 rounded-lg">
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-2xl">
                    {selectedAppointment.customer.charAt(0)}
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{selectedAppointment.customer}</div>
                    <div className="text-gray-600">{selectedAppointment.phone}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-600">Date & Time</label>
                    <div className="text-lg font-bold text-gray-900">{selectedAppointment.date} at {selectedAppointment.time}</div>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-600">Duration</label>
                    <div className="text-lg font-bold text-gray-900">{selectedAppointment.duration} minutes</div>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-600">Service</label>
                    <div className="text-lg font-bold text-gray-900">{selectedAppointment.service}</div>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-600">Value</label>
                    <div className="text-lg font-bold text-gray-900">${selectedAppointment.value}</div>
                  </div>
                  <div className="col-span-2">
                    <label className="text-sm font-semibold text-gray-600">Status</label>
                    <select className="w-full mt-1 px-4 py-2 border-2 border-gray-200 rounded-xl font-semibold focus:outline-none focus:border-blue-500">
                      <option value="confirmed">Confirmed</option>
                      <option value="pending">Pending</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className="text-sm font-semibold text-gray-600">Notes</label>
                    <textarea className="w-full mt-1 px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500" rows="3" placeholder="Add notes...">{selectedAppointment.notes}</textarea>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold hover:shadow-lg transition-all">
                    Save Changes
                  </button>
                  <button className="flex-1 px-6 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-all flex items-center justify-center gap-2">
                    <Send className="w-5 h-5" />
                    Send Reminder
                  </button>
                </div>
                <div className="flex gap-3">
                  <button className="flex-1 px-6 py-3 bg-yellow-500 text-white rounded-xl font-bold hover:bg-yellow-600 transition-all">
                    Reschedule
                  </button>
                  <button className="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-all">
                    Cancel Appointment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
