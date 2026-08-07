// EXIM.IM SaaS Platform - In-App Notifications API Endpoint
import { calculateUnreadCount, NotificationItem } from '@/lib/notification-dispatch-engine';

export async function GET(request: Request) {
  const sampleNotifications: NotificationItem[] = [
    {
      notificationId: 'notif-101',
      userId: 'usr-9041',
      category: 'APPROVALS_NEEDED',
      title: 'High Value Order Sign-Off Required',
      message: 'Order SO-2026-9041 ($125,000) exceeds $50,000 ceiling. Chief Trade Officer sign-off pending.',
      linkUrl: '/workflow/approvals',
      isRead: false,
      createdAt: '2026-02-04T09:15:00Z'
    },
    {
      notificationId: 'notif-102',
      userId: 'usr-9041',
      category: 'LC_EXPIRY',
      title: 'Letter of Credit Expiring Soon',
      message: 'LC-DB-2026-9041 expires in 7 days (Presentation deadline: 2026-02-15).',
      linkUrl: '/banking/lc-auditor-v3',
      isRead: true,
      createdAt: '2026-02-01T10:00:00Z'
    }
  ];

  const unreadCount = calculateUnreadCount(sampleNotifications);

  return Response.json({
    success: true,
    unreadCount,
    count: sampleNotifications.length,
    data: sampleNotifications
  });
}
