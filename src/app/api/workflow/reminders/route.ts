// EXIM.IM SaaS Platform - Workflow Reminders API Endpoint
import { createAutomatedReminder, ReminderRuleInput } from '@/lib/workflow-automation-engine';

export async function GET(request: Request) {
  const sampleReminders = [
    {
      reminder_id: 'rem-101',
      trigger_rule: 'EXPIRING_LC_7_DAYS',
      entity_reference: 'LC-DB-2026-9041',
      recipient_role: 'TRADE_FINANCE_MANAGER',
      scheduled_at: '2026-02-08T00:00:00Z',
      is_dispatched: false,
      created_at: '2026-02-01T10:00:00Z'
    }
  ];

  return Response.json({ success: true, count: sampleReminders.length, data: sampleReminders });
}

export async function POST(request: Request) {
  try {
    const body: ReminderRuleInput = await request.json();
    const result = createAutomatedReminder(body);

    return Response.json({
      success: true,
      message: 'Automated reminder rule scheduled',
      data: result
    }, { status: 201 });
  } catch (error) {
    return Response.json({ success: false, error: 'Reminder rule creation failed' }, { status: 500 });
  }
}
