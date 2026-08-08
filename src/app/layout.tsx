import React from 'react';
import './globals.css';
import { AppLayout } from '@/components/app-layout';

export const metadata = {
  title: 'EXIM.IM — Enterprise Exim Trade SaaS Platform',
  description: 'Complete 30-Module Exim Platform with Ecosystem Directory V3, Service RFQs, Developer API Keys V3, Webhook Subscriptions V3, Security Audit Logs V2, Anomaly Alerts, Workspace Settings V2 & Branding, Scheduled Management Reports, Workspace Settings & Audit Logs, Notification Center, Workflow Automation, Export Incentive Ledger, LC UCP 600 Auditor V3, eBRC / EDPMS Reconciliation, Multi-Currency Finance, Developer API Center, Statutory Vault, and Global Trade Infrastructure.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-slate-950 text-slate-100 min-h-screen font-sans antialiased">
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
