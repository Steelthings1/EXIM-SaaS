// EXIM.IM SaaS Platform - Module 26: Report Generation Engine
import crypto from 'crypto';

export interface ReportTemplate {
  templateId: string;
  templateName: string;
  category: 'Export Performance' | 'Incentive Realization' | 'Compliance Risk' | 'Logistics SLA';
  scheduleFrequency: 'Daily' | 'Weekly' | 'Monthly' | 'Ad-Hoc';
  exportFormat: 'PDF' | 'EXCEL' | 'CSV';
  recipientEmails: string[];
  isActive: boolean;
}

export interface GeneratedReport {
  reportId: string;
  templateId: string;
  reportName: string;
  category: string;
  fileFormat: string;
  fileSizeBytes: number;
  downloadUrl: string;
  sha256Checksum: string;
  generatedAt: string;
}

/**
 * Validates report schedule frequency.
 */
export function validateScheduleFrequency(frequency: string): boolean {
  const allowed = ['Daily', 'Weekly', 'Monthly', 'Ad-Hoc'];
  return allowed.includes(frequency);
}

/**
 * Generates an executive management report archive entry with SHA-256 cryptographic signature.
 */
export function generateManagementReport(template: ReportTemplate): GeneratedReport {
  const reportId = `RPT-${Date.now()}`;
  const timestamp = new Date().toISOString();
  const reportPayload = `${template.templateId}:${template.templateName}:${timestamp}`;
  const sha256Checksum = crypto.createHash('sha256').update(reportPayload).digest('hex');

  return {
    reportId,
    templateId: template.templateId,
    reportName: `${template.templateName} - ${new Date().toISOString().split('T')[0]}`,
    category: template.category,
    fileFormat: template.exportFormat,
    fileSizeBytes: 245800,
    downloadUrl: `/api/reports/download/${reportId}.${template.exportFormat.toLowerCase()}`,
    sha256Checksum,
    generatedAt: timestamp
  };
}
