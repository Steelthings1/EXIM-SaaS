// EXIM.IM SaaS Platform - Document Version History Audit Trail API Endpoint

export async function GET(request: Request) {
  const sampleVersions = [
    {
      version_id: 'ver-101',
      document_id: 'doc-001',
      version_number: 2,
      modified_fields: ['itemQuantity', 'unitPriceUsd', 'cifTotalUsd'],
      modified_by: 'Documentation Officer (Rahul V.)',
      sha256_checksum: 'e719c3c881290412890412890412890412890412890412890412890412890412',
      created_at: '2026-02-06T11:00:00Z'
    },
    {
      version_id: 'ver-100',
      document_id: 'doc-001',
      version_number: 1,
      modified_fields: ['INITIAL_ORDER_CREATED'],
      modified_by: 'System AI Importer',
      sha256_checksum: '4d37be0881290412890412890412890412890412890412890412890412890412',
      created_at: '2026-02-05T09:15:00Z'
    }
  ];

  return Response.json({ success: true, count: sampleVersions.length, data: sampleVersions });
}
