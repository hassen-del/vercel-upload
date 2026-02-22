/**
 * Dashboard Debugger Utility
 * Use in browser console (F12) for troubleshooting
 */

const SUPABASE_URL = 'https://unyzapzmjobkaadkrvng.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVueXphcHptam9ia2FhZGtydm5nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg4NzE0MDMsImV4cCI6MjA4NDQ0NzQwM30._g-ZeAyP0ZxMU3MXdxL6VsOXTGg7Pgcb5U3frwsTSwk';
const TRIAL_CUSTOMER_ID = 'contractor-gorilla-trial-001';

export const dashboardDebugger = {
  // Check API connectivity
  testConnection: async () => {
    console.log('🔍 Testing Supabase Connection...');

    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/`, {
        method: 'GET',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
        }
      });

      console.log('✅ Supabase API is reachable');
      console.log('Status:', response.status);
      return true;
    } catch (error) {
      console.error('❌ Connection failed:', error.message);
      return false;
    }
  },

  // Test the specific query
  testQuery: async () => {
    console.log('🔍 Testing Call Analytics Query...');

    const url = `${SUPABASE_URL}/rest/v1/call_analytics?client_id=eq.${TRIAL_CUSTOMER_ID}&order=created_at.desc&limit=50`;

    console.log('Query URL:', url);
    console.log('Headers:', {
      apikey: SUPABASE_KEY.substring(0, 20) + '...',
      Authorization: `Bearer ${SUPABASE_KEY.substring(0, 20)}...`,
    });

    try {
      const response = await fetch(url, {
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation'
        }
      });

      console.log('Response Status:', response.status);
      console.log('Response Headers:', Object.fromEntries(response.headers.entries()));

      const data = await response.json();

      if (response.ok) {
        console.log('✅ Query successful!');
        console.log('Records found:', data.length);
        if (data.length > 0) {
          console.log('First record:', data[0]);
        }
      } else {
        console.error('❌ Query failed with status', response.status);
        console.error('Response:', data);
      }

      return data;
    } catch (error) {
      console.error('❌ Query error:', error.message);
      return null;
    }
  },

  // Check if table exists
  checkTable: async () => {
    console.log('🔍 Checking call_analytics table...');

    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/call_analytics?limit=1`, {
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
        }
      });

      if (response.status === 404) {
        console.error('❌ Table "call_analytics" not found');
        return false;
      }

      console.log('✅ Table exists');
      return true;
    } catch (error) {
      console.error('❌ Error checking table:', error.message);
      return false;
    }
  },

  // List all tables
  listTables: async () => {
    console.log('🔍 Listing Supabase tables...');

    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/information_schema.tables?schema=eq.public`, {
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
        }
      });

      const tables = await response.json();

      if (response.ok) {
        console.log('✅ Available tables:');
        tables.forEach(table => {
          console.log(`  - ${table.table_name}`);
        });
      } else {
        console.error('❌ Could not list tables:', tables);
      }

      return tables;
    } catch (error) {
      console.error('❌ Error listing tables:', error.message);
      return null;
    }
  },

  // Check RLS policies
  checkRLS: async () => {
    console.log('🔍 Checking Row Level Security policies...');
    console.log('Note: RLS should be DISABLED for this API key to work');
    console.log('If you get 403 Forbidden errors, check Supabase RLS settings');
  },

  // Create test data
  createTestCall: async (customData = {}) => {
    console.log('🔍 Creating test call...');

    const testCall = {
      client_id: TRIAL_CUSTOMER_ID,
      call_id: `test-call-${Date.now()}`,
      caller_id: '+1-555-0123',
      category: customData.category || 'BOOKED',
      transcript: customData.transcript || 'This is a test call to verify dashboard functionality',
      duration: customData.duration || 120,
      created_at: new Date().toISOString(),
      ...customData
    };

    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/call_analytics`, {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testCall)
      });

      if (response.ok) {
        console.log('✅ Test call created successfully!');
        console.log('Call details:', testCall);
        return testCall;
      } else {
        const error = await response.json();
        console.error('❌ Failed to create test call:', error);
        return null;
      }
    } catch (error) {
      console.error('❌ Error creating test call:', error.message);
      return null;
    }
  },

  // Quick diagnosis
  diagnose: async () => {
    console.log('='.repeat(50));
    console.log('🔧 RUNNING FULL DIAGNOSIS...');
    console.log('='.repeat(50));

    const results = {
      connection: await this.testConnection(),
      tableExists: await this.checkTable(),
      queryWorks: await this.testQuery(),
    };

    console.log('\n' + '='.repeat(50));
    console.log('📋 DIAGNOSIS RESULTS:');
    console.log('='.repeat(50));

    if (results.connection) {
      console.log('✅ API Connection: OK');
    } else {
      console.log('❌ API Connection: FAILED');
    }

    if (results.tableExists) {
      console.log('✅ Table Exists: OK');
    } else {
      console.log('❌ Table Exists: NOT FOUND');
    }

    if (results.queryWorks && results.queryWorks.length > 0) {
      console.log('✅ Query Works: OK (' + results.queryWorks.length + ' records)');
    } else {
      console.log('❌ Query Works: FAILED or NO DATA');
    }

    console.log('='.repeat(50));

    return results;
  },

  // Help
  help: () => {
    console.log(`
🔧 DASHBOARD DEBUGGER - Available Commands:

1. Test Connection:
   window.debugger.testConnection()

2. Test Query:
   window.debugger.testQuery()

3. Check Table Exists:
   window.debugger.checkTable()

4. List All Tables:
   window.debugger.listTables()

5. Create Test Call:
   window.debugger.createTestCall()
   window.debugger.createTestCall({ category: 'LOST' })
   window.debugger.createTestCall({ category: 'EMERGENCY' })

6. Run Full Diagnosis:
   window.debugger.diagnose()

7. Show This Help:
   window.debugger.help()

📝 Example: Create 5 test calls
   for (let i = 0; i < 5; i++) {
     window.debugger.createTestCall();
     await new Promise(r => setTimeout(r, 500));
   }
    `);
  }
};

// Expose debugger to window for console access
if (typeof window !== 'undefined') {
  window.dashboardDebugger = dashboardDebugger;
  console.log('✅ Dashboard Debugger loaded. Type: window.dashboardDebugger.help()');
}
