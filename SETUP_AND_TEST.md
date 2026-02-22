# Complete Setup & Test Guide
**Goal:** Create test data and verify the dashboard works
**Time:** 5-10 minutes

---

## 📋 Step 1: Create Table in Supabase

### Option A: Via Supabase Web UI (Recommended)

1. **Open Supabase:**
   - Go to: https://supabase.com
   - Login with your account
   - Select project: **tradeleadsflow**

2. **Create the table:**
   - Left sidebar → Click: **SQL Editor**
   - Click: **New Query**
   - Copy and paste this SQL:

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

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_call_analytics_client_id
  ON call_analytics(client_id);

CREATE INDEX IF NOT EXISTS idx_call_analytics_created_at
  ON call_analytics(created_at DESC);
```

3. **Run the query:**
   - Click: **Run** button (or Cmd+Enter)
   - You should see: "Success" message

4. **Verify:**
   - Left sidebar → Click: **Table Editor**
   - Look for: **call_analytics** table
   - Should show it's empty (0 rows)

---

## 🧪 Step 2: Create Test Data

### Method 1: Using Browser Console (Easiest)

1. **Open Dashboard:**
   - Go to: https://vercel-upload-psi.vercel.app/client

2. **Open Console:**
   - Press: **F12** (or Cmd+Option+I on Mac)
   - Click: **Console** tab

3. **Copy & Paste Script:**
   - Copy everything from: `CONSOLE_SETUP_SCRIPT.js`
   - Paste into console
   - Press: **Enter**

4. **Run the setup:**
   - In console, type: `setupAndCreateTestData()`
   - Press: **Enter**
   - Wait for "✅ Setup Complete!" message

5. **Expected Output:**
   ```
   Step 1: Checking if table exists...
   ✅ Table exists!

   Step 2: Creating test data (5 calls)...
   ✅ Call 1/5 created: BOOKED
   ✅ Call 2/5 created: LOST
   ✅ Call 3/5 created: BOOKED
   ✅ Call 4/5 created: INFO
   ✅ Call 5/5 created: BOOKED

   📊 Test Data Creation Results:
   ✅ Successful: 5/5
   ❌ Failed: 0/5

   Step 3: Verifying data...
   ✅ Query successful! Found 5 calls

   Step 4: Dashboard Metrics:
   Total Calls: 5
   Booked: 3
   Lost: 1
   Emergency: 0
   Info Only: 1
   Conversion Rate: 60%
   Revenue: $150
   ```

---

## ✅ Step 3: Verify Dashboard Works

### Check 1: Metrics Display

1. **Refresh dashboard:**
   - Go to: https://vercel-upload-psi.vercel.app/client
   - Wait 30 seconds

2. **Look for:**
   - ✅ No error message
   - ✅ Metrics showing:
     - **Total Calls: 5**
     - **Bookings: 3**
     - **Conversion Rate: 60%**
     - **Revenue: $150**

3. **If metrics don't show:**
   - Wait another 30 seconds (refresh every 30s)
   - Or manually refresh the page

### Check 2: Conversations Tab

1. **Click: Conversations tab**
   - Should show 5 conversations
   - Each with:
     - Customer name
     - Time received
     - Status (BOOKED, LOST, etc.)
     - Potential value

2. **Click on a conversation:**
   - Should show full transcript
   - Should show call details

### Check 3: Chat Widget

1. **Open chat:**
   - Click chat bubble (bottom-right corner)

2. **Ask questions:**
   - "How many calls did I get?"
   - "What's my conversion rate?"
   - "How much revenue did I make?"

3. **Expected responses:**
   - Chat should answer with real metrics
   - "You got 5 calls"
   - "Your conversion rate is 60%"
   - "Revenue: $150"

### Check 4: Console Debugging

1. **Open console again (F12)**

2. **Run diagnostic:**
   ```javascript
   window.dashboardDebugger.diagnose()
   ```

3. **Expected output:**
   ```
   ✅ API Connection: OK
   ✅ Table Exists: OK
   ✅ Query Works: OK (5 records)
   ```

---

## 🎯 Success Checklist

- [ ] Table created in Supabase
- [ ] Test data created (5 calls)
- [ ] Dashboard loads without errors
- [ ] Metrics display correctly (5 calls, 3 booked, 60% conversion)
- [ ] Conversations tab shows all 5 calls
- [ ] Chat widget responds with real data
- [ ] Console diagnostic passes all tests

---

## 🐛 Troubleshooting

### Problem: "Could not find table 'call_analytics'"

**Solution:**
1. Go to Supabase Web UI
2. Verify table exists in Table Editor
3. Run the CREATE TABLE SQL from Step 1

### Problem: Test data creation fails

**Solution:**
1. Check table structure matches:
   - id, client_id, call_id, caller_id, category, transcript, duration, created_at
2. Verify API key is correct in script
3. Check RLS is disabled (Settings → Authentication)

### Problem: Dashboard shows error but no metrics

**Solution:**
1. Wait 30 seconds (data loads every 30s)
2. Manually refresh page
3. Check console: `window.dashboardDebugger.diagnose()`
4. Look at console logs (F12 → Console tab)

### Problem: Metrics show but wrong numbers

**Solution:**
1. Check Supabase has 5 records: Run query in SQL Editor
2. Check client_id is correct: "contractor-gorilla-trial-001"
3. Verify categories are spelled correctly (BOOKED, LOST, INFO, EMERGENCY)

---

## 📊 What the Numbers Mean

After creating 5 test calls:

| Metric | Value | Meaning |
|--------|-------|---------|
| **Total Calls** | 5 | 5 calls received |
| **Bookings** | 3 | 3 became bookings |
| **Conversion** | 60% | 3÷5 = 60% |
| **Revenue** | $150 | 3 × $50 = $150 |

This simulates:
- Customer calls in
- AI answers and handles it
- 60% successfully book appointments
- Dashboard captures this automatically

---

## 🚀 Next Steps After Verification

### If Dashboard Works:
1. ✅ Delete test data (optional, can keep for demo)
2. ✅ Share dashboard URL with Aaron: https://vercel-upload-psi.vercel.app/client
3. ✅ Tell Aaron to call: 213-556-0023 to test

### If Dashboard Doesn't Work:
1. Run: `window.dashboardDebugger.diagnose()` in console
2. Check output for which test failed
3. Follow troubleshooting guide above
4. Contact: hassen@tradeleadsflow.com

---

## 📝 Commands Reference

| What | Command |
|------|---------|
| Full diagnosis | `window.dashboardDebugger.diagnose()` |
| Create test call | `window.dashboardDebugger.createTestCall()` |
| Test query | `window.dashboardDebugger.testQuery()` |
| List tables | `window.dashboardDebugger.listTables()` |
| Run setup script | `setupAndCreateTestData()` (after pasting script) |

---

## ✨ Expected Timeline

- **0-2 min:** Create table in Supabase
- **2-3 min:** Open dashboard and copy console script
- **3-4 min:** Paste and run setup script
- **4-5 min:** Verify metrics appear
- **5 min:** Dashboard is ready!

---

## 📞 Need Help?

```
Issue during setup?

📧 Email: hassen@tradeleadsflow.com
📞 Phone: 825-754-0122

Include:
1. What step you're on
2. Error message (if any)
3. Console output from: window.dashboardDebugger.diagnose()
```

---

## 🎉 Once Verified

### Dashboard is ready for Aaron's trial!

- ✅ Real data integration works
- ✅ Metrics calculate correctly
- ✅ Charts display properly
- ✅ Chat widget responds with real data
- ✅ Error handling works
- ✅ Loading states show correctly

**Status:** READY FOR FEB 24 LAUNCH

---

**Last Updated:** February 12, 2026
**Next Action:** Complete this guide and run setupAndCreateTestData()
