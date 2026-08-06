// EXIM.IM SaaS Platform - QC Lab Inspection Reports API Endpoint

export async function GET(request: Request) {
  const sampleQc = [
    {
      report_id: 'qc-101',
      batch_number: 'BATCH-2026-COF-091',
      lab_name: 'SGS India NABL Accredited Testing Laboratory',
      iso_accreditation: 'ISO_17025',
      moisture_content_pct: 4.8,
      active_ingredient_pct: 2.1,
      heavy_metals_ppm: 0.12,
      microbial_status: 'PASS_CLEAR',
      overall_result: 'PASS'
    },
    {
      report_id: 'qc-102',
      batch_number: 'LOT-2026-RIC-441',
      lab_name: 'Intertek Food Testing Services',
      iso_accreditation: 'ISO_17025',
      moisture_content_pct: 11.2,
      active_ingredient_pct: 99.1,
      heavy_metals_ppm: 0.05,
      microbial_status: 'PASS_CLEAR',
      overall_result: 'PASS'
    }
  ];

  return Response.json({ success: true, count: sampleQc.length, data: sampleQc });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { batch_number, lab_name, moisture_content_pct, active_ingredient_pct, heavy_metals_ppm } = body;

    if (!batch_number || !lab_name) {
      return Response.json({ success: false, error: 'Batch number and lab name are required' }, { status: 400 });
    }

    const moisture = Number(moisture_content_pct) || 5.0;
    const metals = Number(heavy_metals_ppm) || 0.1;
    const isPass = moisture <= 12.0 && metals <= 1.0;

    const newReport = {
      report_id: `qc-${Date.now()}`,
      batch_number,
      lab_name,
      iso_accreditation: 'ISO_17025',
      moisture_content_pct: moisture,
      active_ingredient_pct: Number(active_ingredient_pct) || 98.0,
      heavy_metals_ppm: metals,
      microbial_status: isPass ? 'PASS_CLEAR' : 'FAIL_CONTAMINATED',
      overall_result: isPass ? 'PASS' : 'REJECTED_OUT_OF_SPEC',
      inspected_at: new Date().toISOString()
    };

    return Response.json({
      success: true,
      message: 'QC Inspection Report logged',
      data: newReport
    }, { status: 201 });
  } catch (error) {
    return Response.json({ success: false, error: 'Invalid QC report payload' }, { status: 400 });
  }
}
