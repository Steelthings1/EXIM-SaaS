// EXIM.IM SaaS Platform - Module 24: Notification Dispatch Engine

export interface NotificationItem {
  notificationId: string;
  userId: string;
  category: 'SHIPMENT_STATUS' | 'CUSTOMS_ALERT' | 'LC_EXPIRY' | 'APPROVALS_NEEDED' | 'INCENTIVE_SCROLLS';
  title: string;
  message: string;
  linkUrl: string;
  isRead: boolean;
  createdAt: string;
}

export interface UserPreferences {
  userId: string;
  enableInApp: boolean;
  enableEmail: boolean;
  enableSms: boolean;
}

/**
 * Calculates unread notification count for a user's feed.
 */
export function calculateUnreadCount(notifications: NotificationItem[]): number {
  return notifications.filter(n => !n.isRead).length;
}

/**
 * Marks notification as read and updates timestamp.
 */
export function markNotificationAsRead(notifications: NotificationItem[], notificationId: string): NotificationItem[] {
  return notifications.map(n => {
    if (n.notificationId === notificationId) {
      return { ...n, isRead: true };
    }
    return n;
  });
}
