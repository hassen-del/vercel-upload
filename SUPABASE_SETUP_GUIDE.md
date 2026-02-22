# Supabase Setup & Test Data Guide
**For:** Contractor Gorilla Trial Dashboard
**Last Updated:** February 12, 2026

---

## 🎯 Quick Start

### Option 1: Use Browser Console (Easiest)
1. Open dashboard: https://vercel-upload-psi.vercel.app/client
2. Press F12 to open DevTools
3. Go to Console tab
4. Paste: `window.debugger.diagnose()`
5. Follow the output

### Option 2: Create Test Data via Console
```javascript
// Open DevTools Console (F12)

// Create 1 test call
window.debugger.createTestCall()

// Create 5 test calls
for (let i = 0; i < 5; i++) {
  window.debugger.createTestCall();
  await new Promise(r => setTimeout(r, 500));
}

// Create specific call types
window.debugger.createTestCall({ category: 'BOOKED' })
window.debugger.createTestCall({ category: 'LOST' })
window.debugger.createTestCall({ category: 'EMERGENCY' })
```

---

## 📋 Supabase Configuration

### Current Setup
- **Project URL:** https://unyzapzmjobkaadkrvng.supabase.co
- **API Key:** (embedded in code)
- **Trial Customer ID:** contractor-gorilla-trial-001
- **Table:** call_analytics

### Table Structure (call_analytics)
```sql
- id (UUID, Primary Key)
- client_id (text) - "contractor-gorilla-trial-001"
- call_id (text) - Unique call identifier
- caller_id (text) - Phone number or identifier
- category (text) - BOOKED, LOST, EMERGENCY, INFO
- transcript (text) - Full call transcript
- duration (integer) - Duration in seconds
- created_at (timestamp) - When call was received
```

---

## 🔍 Diagnosis: If Dashboard Shows Error 400

### Step 1: Run Diagnostic
```javascript
// In DevTools Console:
window.debugger.diagnose()
```

This will check:
1. ✅ API connectivity
2. ✅ Table exists
3. ✅ Query works

### Step 2: Check Specific Areas

#### Check Connection Only
```javascript
window.debugger.testConnection()
// Should return: true
```

#### Check Table Exists
```javascript
window.debugger.checkTable()
// Should return: true
```

#### Check Query Works
```javascript
window.debugger.testQuery()
// Should show records or empty array
```

#### List All Tables
```javascript
window.debugger.listTables()
// Should show call_analytics in the list
```

---

## ⚠️ Troubleshooting 400 Error

### Problem: API Error 400 - Bad Request

**Likely Causes:**

1. **Table doesn't exist**
   ```
   Solution: Create table in Supabase
   See: "Create Table" section below
   ```

2. **Wrong table name**
   ```
   Check: Is it "call_analytics" not "CallAnalytics"?
   Solution: Rename table to lowercase
   ```

3. **API key is invalid**
   ```
   Check: Is the key in the code the same as in Supabase?
   Solution: Copy fresh key from Supabase settings
   ```

4. **RLS (Row Level Security) is enabled**
   ```
   Check: Settings → Authentication → RLS
   Solution: Disable RLS for development
   ```

5. **Wrong column names in query**
   ```
   Check: Does table have "client_id" column?
   Solution: Verify column names match query
   ```

---

## 🛠️ Setup Guide: Create Table in Supabase

### Via Supabase Dashboard (Web UI)

1. **Login to Supabase:**
   - Go to: https://supabase.com
   - Login with your account
   - Select project: tradeleadsflow

2. **Create Table:**
   - Click: SQL Editor (left sidebar)
   - Click: New Query
   - Paste the SQL below:

```sql
-- Create call_analytics table
CREATE TABLE IF NOT EXISTS call_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id TEXT NOT NULL,
  call_id TEXT NOT NULL,
  caller_id TEXT,
  category TEXT DEFAULT 'INFO',
  transcript TEXT,
  duration INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_call_analytics_client_id
  ON call_analytics(client_id);

CREATE INDEX IF NOT EXISTS idx_call_analytics_created_at
  ON call_analytics(created_at DESC);

-- Insert sample data
INSERT INTO call_analytics (client_id, call_id, caller_id, category, transcript, duration)
VALUES
  ('contractor-gorilla-trial-001', 'call-001', '+1-555-0001', 'BOOKED', 'Customer wants to schedule HVAC service next week', 180),
  ('contractor-gorilla-trial-001', 'call-002', '+1-555-0002', 'LOST', 'Caller hung up after hearing pricing', 45),
  ('contractor-gorilla-trial-001', 'call-003', '+1-555-0003', 'BOOKED', 'Confirmed appointment for Friday at 2pm', 240),
  ('contractor-gorilla-trial-001', 'call-004', '+1-555-0004', 'INFO', 'Asked about service area and hours', 120),
  ('contractor-gorilla-trial-001', 'call-005', '+1-555-0005', 'BOOKED', 'New customer, scheduled emergency repair', 300);
```

3. **Run Query:**
   - Click: "Run" button (or Cmd+Enter)
   - Wait for success message

4. **Verify:**
   - Go to: Table Editor (left sidebar)
   - Look for: call_analytics table
   - Should show 5 sample records

---

## 📊 Via Direct SQL (Alternative)

If you have CLI access:

```bash
# Connect to Supabase Postgres
psql -U postgres -d postgres -h unyzapzmjobkaadkrvng.postgres.supabase.co

# Run the SQL from "Create Table" section above
```

---

## ✅ Verify Dashboard Works

### After Creating Table:

1. **Refresh Dashboard:**
   - Open: https://vercel-upload-psi.vercel.app/client
   - Wait 3 seconds for load

2. **Check Results:**
   - ✅ No error message
   - ✅ Metrics show: 5 calls, 3 bookings, 60% conversion
   - ✅ Conversations tab shows calls

3. **Real-time Updates:**
   - Open DevTools Console
   - Create new call: `window.debugger.createTestCall()`
   - Wait 30 seconds
   - Dashboard updates automatically

---

## 🔐 Security Notes

### RLS (Row Level Security)
- **For Development:** DISABLE RLS
- **For Production:** ENABLE RLS with proper policies

To disable RLS:
1. Go to Supabase Dashboard
2. Click: Settings → Authentication → Row Level Security
3. Toggle: OFF

### API Key
- Current key is embedded in code (for development only)
- **Before Production:** Move to environment variables
- **Example:**
```javascript
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
```

---

## 📱 Testing the Full Flow

### Test 1: Create One Call
```javascript
// Open console and run:
window.debugger.createTestCall({
  category: 'BOOKED',
  transcript: 'Customer called to schedule HVAC maintenance'
})

// Wait 30 seconds, dashboard should update
```

### Test 2: Create Multiple Calls
```javascript
// Create 10 calls with mixed statuses
const categories = ['BOOKED', 'LOST', 'EMERGENCY', 'INFO'];

for (let i = 0; i < 10; i++) {
  window.debugger.createTestCall({
    category: categories[i % 4],
    transcript: `Test call ${i + 1} - ${categories[i % 4]} status`
  });

  // Wait 500ms between calls
  await new Promise(r => setTimeout(r, 500));
}

// After 30 seconds, metrics should show 10 calls
```

### Test 3: Verify Metrics
After creating calls, dashboard should show:
- **Total Calls:** 10
- **Bookings:** ~3 (depends on random distribution)
- **Conversion Rate:** ~30%
- **Revenue:** ~$150 (3 × $50)

---

## 🐛 Debug Mode: Console Commands

### Available Commands

```javascript
// 1. Full diagnosis (recommended first step)
window.debugger.diagnose()

// 2. Check if API responds
window.debugger.testConnection()

// 3. Test the actual query
window.debugger.testQuery()

// 4. Verify table exists
window.debugger.checkTable()

// 5. See all tables in database
window.debugger.listTables()

// 6. Create a test call
window.debugger.createTestCall()

// 7. Create call with specific data
window.debugger.createTestCall({
  category: 'BOOKED',
  transcript: 'Custom call transcript',
  caller_id: '+1-555-1234',
  duration: 300
})

// 8. Help - show all commands
window.debugger.help()
```

---

## 🎯 For Aaron's Trial (Feb 24)

### Before Trial Starts:
- [ ] Verify Supabase table exists
- [ ] Test with 5 sample calls
- [ ] Confirm dashboard shows data
- [ ] Test real call from 213-556-0023
- [ ] Verify live data appears within 30s

### During Trial:
- [ ] Monitor for API errors
- [ ] Check Supabase logs
- [ ] Gather feedback
- [ ] Note any issues

### Success Criteria:
- ✅ Dashboard loads without error
- ✅ Metrics display correctly
- ✅ Real calls appear automatically
- ✅ No API errors after first 5 minutes

---

## 📞 Support

### If You See Error 400:
1. Run: `window.debugger.diagnose()`
2. Check output for which test failed
3. See troubleshooting section above
4. Create issue with diagnostic results

### If Data Doesn't Appear:
1. Verify table has records: `window.debugger.testQuery()`
2. Check client_id matches: `contractor-gorilla-trial-001`
3. Verify query syntax in browser console
4. Check Supabase logs for errors

### Need More Help:
- Contact: hassen@tradeleadsflow.com
- Phone: 825-754-0122
- Include: Browser console output from diagnostic

---

## 📚 Quick Reference

| Task | Command |
|------|---------|
| Diagnose issues | `window.debugger.diagnose()` |
| View all records | `window.debugger.testQuery()` |
| Create test call | `window.debugger.createTestCall()` |
| List all tables | `window.debugger.listTables()` |
| Check connection | `window.debugger.testConnection()` |
| View help | `window.debugger.help()` |

---

**Last Updated:** February 12, 2026
**Status:** Ready for Aaron's Trial
**Support:** hassen@tradeleadsflow.com
