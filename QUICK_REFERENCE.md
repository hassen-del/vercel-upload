# Quick Reference Card
**Dashboard:** https://vercel-upload-psi.vercel.app/client

---

## 🚀 Getting Started (30 seconds)

### See if it works:
```javascript
// F12 → Console → Paste:
window.dashboardDebugger.diagnose()
```

---

## 🔴 If You See Error 400

### 1. Copy this command:
```javascript
window.dashboardDebugger.diagnose()
```

### 2. What the output means:
- ✅ All green = Dashboard is fine
- ❌ Red item = That's your problem

### 3. Fix checklist:
| Issue | Fix |
|-------|-----|
| ❌ Connection | Check internet, Supabase URL |
| ❌ Table missing | Run SQL in SUPABASE_SETUP_GUIDE.md |
| ❌ Query fails | Create test data (see below) |

---

## 📊 Create Test Data (1 minute)

### Create 1 call:
```javascript
window.dashboardDebugger.createTestCall()
```
Wait 30 seconds → Dashboard updates

### Create 5 calls:
```javascript
for (let i = 0; i < 5; i++) {
  window.dashboardDebugger.createTestCall();
  await new Promise(r => setTimeout(r, 500));
}
```
Wait 30 seconds → Dashboard shows metrics

### Create specific types:
```javascript
window.dashboardDebugger.createTestCall({ category: 'BOOKED' })
window.dashboardDebugger.createTestCall({ category: 'LOST' })
```

---

## 🎯 Console Commands

| Command | What It Does |
|---------|-------------|
| `diagnose()` | Full system check |
| `testConnection()` | Can reach Supabase? |
| `testQuery()` | Get data from table? |
| `checkTable()` | Table exists? |
| `listTables()` | Show all tables |
| `createTestCall()` | Add fake call |
| `help()` | Show all commands |

**Usage:** `window.dashboardDebugger.COMMAND()`

---

## 📱 What Metrics Mean

After calls are created:
- **Total Calls:** Number of test/real calls
- **Bookings:** Calls marked as BOOKED
- **Conversion %:** Bookings ÷ Total Calls × 100
- **Revenue:** Bookings × $50

Example:
- 5 calls total
- 2 booked
- Conversion: 40%
- Revenue: $100

---

## 🔧 Troubleshooting

| Problem | Solution |
|---------|----------|
| Page won't load | Refresh, check internet |
| Shows error forever | Run `diagnose()` |
| No demo data | Check RLS in Supabase |
| Commands don't work | Refresh page, F12 → Console |
| Test data won't create | Check API key is valid |

---

## 📞 Support

```
Issue: Still getting 400 error?
📧 Email: hassen@tradeleadsflow.com
📞 Phone: 825-754-0122

Include:
- Output from: window.dashboardDebugger.diagnose()
- Browser & version
- When error happens (on load? after click?)
```

---

## 📋 Before Aaron's Trial (Feb 24)

### Checklist:
- [ ] Open dashboard
- [ ] Run: `window.dashboardDebugger.diagnose()`
- [ ] See: All tests pass ✅
- [ ] Create test calls
- [ ] Wait 30 seconds
- [ ] See metrics update ✅
- [ ] Share dashboard URL with Aaron

### Dashboard URL to share:
```
https://vercel-upload-psi.vercel.app/client
```

---

## ⚡ Super Quick Test

1. Open: https://vercel-upload-psi.vercel.app/client
2. Press: F12 (opens DevTools)
3. Click: Console tab
4. Paste: `window.dashboardDebugger.diagnose()`
5. Press: Enter
6. Wait for results

---

**Everything you need is here!**
For more details, see:
- `DEBUG_AND_FIX_SUMMARY.md` - Full explanation
- `SUPABASE_SETUP_GUIDE.md` - Database setup
- `ANALYSIS_AND_IMPROVEMENTS.md` - Technical details
