/**
 * Dashboard Setup & Test Data Creator
 * Paste this entire script into browser console (F12) on the dashboard
 * Then run: setupAndCreateTestData()
 */

const SUPABASE_URL = 'https://unyzapzmjobkaadkrvng.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVueXphcHptam9ia2FhZGtydm5nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg4NzE0MDMsImV4cCI6MjA4NDQ0NzQwM30._g-ZeAyP0ZxMU3MXdxL6VsOXTGg7Pgcb5U3frwsTSwk';
const TRIAL_CUSTOMER_ID = 'contractor-gorilla-trial-001';

// Test calls to create
const testCalls = [
  {
    call_id: `test-call-${Date.now()}-001`,
    caller_id: '+1-555-0001',
    category: 'BOOKED',
    transcript: 'Hi, I need to schedule an HVAC maintenance appointment for next week. Yes, we can do Tuesday at 2 PM.',
    duration: 180,
  },
  {
    call_id: `test-call-${Date.now()}-002`,
    caller_id: '+1-555-0002',
    category: 'LOST',
    transcript: 'How much does your service cost? Oh, that is more than I expected. I will call back.',
    duration: 45,
  },
  {
    call_id: `test-call-${Date.now()}-003`,
    caller_id: '+1-555-0003',
    category: 'BOOKED',
    transcript: 'I have an emergency HVAC issue right now. Can you come today? Yes, we have someone available in 2 hours.',
    duration: 240,
  },
  {
    call_id: `test-call-${Date.now()}-004`,
    caller_id: '+1-555-0004',
    category: 'INFO',
    transcript: 'Do you service the downtown area? Yes we do. What are your hours? We are open 8 AM to 6 PM Monday to Friday.',
    duration: 120,
  },
  {
    call_id: `test-call-${Date.now()}-005`,
    caller_id: '+1-555-0005',
    category: 'BOOKED',
    transcript: 'I need a new HVAC system installed. Perfect, we can schedule a consultation this week.',
    duration: 300,
  },
];

async function setupAndCreateTestData() {
  console.log('🚀 Starting Dashboard Setup & Test Data Creation...\n');

  try {
    // Step 1: Check if table exists
    console.log('Step 1: Checking if table exists...');
    const tableCheckResponse = await fetch(
      `${SUPABASE_URL}/rest/v1/call_analytics?limit=1`,
      {
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
        }
      }
    );

    if (tableCheckResponse.status === 404) {
      console.log('❌ Table does not exist. Creating table via Supabase UI...');
      console.log('\n📋 MANUAL SETUP REQUIRED:');
      console.log('1. Go to: https://supabase.com');
      console.log('2. Login and select the tradeleadsflow project');
      console.log('3. Click: SQL Editor (left sidebar)');
      console.log('4. Click: New Query');
      console.log('5. Paste the SQL from SUPABASE_SETUP_GUIDE.md');
      console.log('6. Click: Run');
      console.log('7. Then come back here and run this script again\n');
      return;
    }

    console.log('✅ Table exists!\n');

    // Step 2: Create test calls
    console.log('Step 2: Creating test data (5 calls)...');
    let successCount = 0;
    let failureCount = 0;

    for (let i = 0; i < testCalls.length; i++) {
      const testCall = {
        client_id: TRIAL_CUSTOMER_ID,
        ...testCalls[i],
        created_at: new Date(Date.now() - (testCalls.length - i) * 60000).toISOString(),
      };

      try {
        const response = await fetch(
          `${SUPABASE_URL}/rest/v1/call_analytics`,
          {
            method: 'POST',
            headers: {
              'apikey': SUPABASE_KEY,
              'Authorization': `Bearer ${SUPABASE_KEY}`,
              'Content-Type': 'application/json',
              'Prefer': 'return=representation'
            },
            body: JSON.stringify(testCall)
          }
        );

        if (response.ok) {
          const result = await response.json();
          console.log(`  ✅ Call ${i + 1}/5 created: ${testCall.category}`);
          successCount++;
        } else {
          const error = await response.text();
          console.error(`  ❌ Call ${i + 1}/5 failed:`, error);
          failureCount++;
        }

        // Wait 500ms between calls to avoid rate limiting
        await new Promise(r => setTimeout(r, 500));
      } catch (error) {
        console.error(`  ❌ Call ${i + 1}/5 error:`, error.message);
        failureCount++;
      }
    }

    console.log(`\n📊 Test Data Creation Results:`);
    console.log(`  ✅ Successful: ${successCount}/5`);
    console.log(`  ❌ Failed: ${failureCount}/5\n`);

    // Step 3: Query the data
    console.log('Step 3: Verifying data in database...');
    const queryResponse = await fetch(
      `${SUPABASE_URL}/rest/v1/call_analytics?client_id=eq.${TRIAL_CUSTOMER_ID}&order=created_at.desc`,
      {
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
        }
      }
    );

    if (queryResponse.ok) {
      const data = await queryResponse.json();
      console.log(`✅ Query successful! Found ${data.length} calls\n`);

      // Step 4: Calculate and display metrics
      console.log('Step 4: Dashboard Metrics:');
      const total = data.length;
      const booked = data.filter(c => c.category === 'BOOKED').length;
      const lost = data.filter(c => c.category === 'LOST').length;
      const emergency = data.filter(c => c.category === 'EMERGENCY').length;
      const info = data.filter(c => c.category === 'INFO').length;
      const conversionRate = total > 0 ? ((booked / total) * 100).toFixed(1) : 0;
      const revenue = booked * 50;

      console.log(`  Total Calls: ${total}`);
      console.log(`  Booked: ${booked}`);
      console.log(`  Lost: ${lost}`);
      console.log(`  Emergency: ${emergency}`);
      console.log(`  Info Only: ${info}`);
      console.log(`  Conversion Rate: ${conversionRate}%`);
      console.log(`  Revenue: $${revenue}\n`);

      // Step 5: Show sample records
      console.log('Step 5: Sample Records:');
      data.slice(0, 3).forEach((call, i) => {
        console.log(`  Call ${i + 1}:`);
        console.log(`    ID: ${call.call_id}`);
        console.log(`    Category: ${call.category}`);
        console.log(`    Duration: ${call.duration}s`);
        console.log(`    Transcript: "${call.transcript.substring(0, 50)}..."`);
      });

      console.log('\n✅ Setup Complete!');
      console.log('\n📋 Next Steps:');
      console.log('1. Refresh the dashboard: https://vercel-upload-psi.vercel.app/client');
      console.log('2. Wait 30 seconds for data to load');
      console.log('3. Verify metrics appear in the dashboard');
      console.log('4. Check all 4 tabs work (Revenue, Conversations, Appointments, Analytics)');
      console.log('\n🎉 Dashboard is ready for Aaron\'s trial!');

    } else {
      console.error('❌ Query failed');
      const error = await queryResponse.text();
      console.error('Error:', error);
    }

  } catch (error) {
    console.error('❌ Setup failed:', error.message);
  }
}

// Run it!
console.log('════════════════════════════════════════════════════════');
console.log('  CONTRACTOR GORILLA - DASHBOARD SETUP & TEST DATA');
console.log('════════════════════════════════════════════════════════\n');
console.log('To start setup, paste this command and press Enter:');
console.log('  setupAndCreateTestData()\n');
console.log('Or just type the command below if this script is already loaded...\n');

// Make function available globally
window.setupAndCreateTestData = setupAndCreateTestData;
console.log('✅ Script loaded! Run: setupAndCreateTestData()');
