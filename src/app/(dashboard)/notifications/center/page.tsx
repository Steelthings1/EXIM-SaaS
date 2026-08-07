"use client";

import React, { useState } from 'react';
import { Bell, CheckCircle2, ShieldAlert, Award, Landmark, Clock, ArrowRight } from 'lucide-react';
import { calculateUnreadCount, markNotificationAsRead, NotificationItem } from '@/lib/notification-dispatch-engine';
import Link from 'next/link';

export default function NotificationCenterPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([
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
      isRead: false,
      createdAt: '2026-02-01T10:00:00Z'
    },
    {
      notificationId: 'notif-103',
      userId: 'usr-9041',
      category: 'INCENTIVE_SCROLLS',
      title: 'DGFT e-Scrip Scroll Issued',
      message: 'Scroll SCRL-ICEGATE-2026-88123 worth ₹57,281 issued for RoDTEP claim.',
      linkUrl: '/incentives/claims-v3',
      isRead: true,
      createdAt: '2026-01-28T14:30:00Z'
    }
  ]);

  const unreadCount = calculateUnreadCount(notifications);

  const handleMarkAsRead = (id: string) => {
    setNotifications(markNotificationAsRead(notifications, id));
  };

  const getCategoryBadge = (cat: string) => {
    switch (cat) {
      case 'APPROVALS_NEEDED':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">APPROVALS NEEDED</span>;
      case 'LC_EXPIRY':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">LC EXPIRY</span>;
      case 'INCENTIVE_SCROLLS':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">INCENTIVES</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-500/20 text-slate-300 border border-slate-500/30">ALERT</span>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="border-b border-slate-800 pb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <div className="relative">
                <Bell className="w-7 h-7 text-indigo-400" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white rounded-full text-[9px] font-black flex items-center justify-center animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </div>
              Real-Time In-App Notification Center & Alert Feed
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Live operational telemetry alerts across LC expirations, executive approvals, customs queries, and e-scrip scrolls.
            </p>
          </div>

          <Link href="/notifications/preferences"
            className="px-4 py-2 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 rounded-xl text-xs font-semibold">
            Delivery Preferences
          </Link>
        </div>

        {/* Notifications Feed */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Alert Stream ({notifications.length} Total &bull; {unreadCount} Unread)
            </h2>
          </div>

          <div className="space-y-3">
            {notifications.map((n) => (
              <div key={n.notificationId}
                className={`p-4 rounded-xl border transition-all ${
                  n.isRead ? 'bg-slate-950/60 border-slate-800/80 text-slate-400' : 'bg-slate-900 border-indigo-500/40 text-slate-100 shadow-lg'
                } flex flex-col md:flex-row md:items-center justify-between gap-4`}>
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    {getCategoryBadge(n.category)}
                    <h3 className="font-bold text-white font-mono text-sm">{n.title}</h3>
                  </div>
                  <p className="text-slate-300 font-sans text-xs">{n.message}</p>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  {!n.isRead && (
                    <button onClick={() => handleMarkAsRead(n.notificationId)}
                      className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-sans text-xs font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Mark Read
                    </button>
                  )}

                  <Link href={n.linkUrl}
                    className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-indigo-300 rounded-lg font-sans text-xs font-semibold flex items-center gap-1">
                    <span>View</span> <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
