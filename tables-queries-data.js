export const databaseCatalog = {
  tables: [
    ['Enterprise Foundation', [
      ['sites','Manufacturing and development site directory.'],
      ['departments','Functional departments assigned to each site.'],
      ['roles','GxP and administrative role definitions.'],
      ['employees','Attributable personnel records used throughout the platform.'],
      ['suppliers','Approved and conditional supplier qualification records.']
    ]],
    ['Master Data', [
      ['products','Commercial product, dosage-form, shelf-life, and storage master.'],
      ['materials','API, excipient, and packaging-material master.'],
      ['material_specifications','Approved material tests and specification limits.'],
      ['product_formulas','Controlled product formulas and standard batch sizes.'],
      ['formula_components','Ingredient quantities, sequence, and tolerances.'],
      ['master_batch_records','Approved master batch records by product and version.'],
      ['mbr_steps','Detailed manufacturing instructions and critical-step flags.'],
      ['test_methods','Validated analytical method and instrument requirements.']
    ]],
    ['MES Manufacturing', [
      ['production_lines','Manufacturing lines by site and dosage form.'],
      ['equipment','Production and laboratory equipment asset master.'],
      ['batches','Batch header, formula, MBR, yield, timing, and disposition.'],
      ['work_orders','Scheduled manufacturing work orders and planner ownership.'],
      ['batch_materials','Material-lot genealogy and actual dispensed quantities.'],
      ['process_events','Executed batch operations, equipment, and operator attribution.'],
      ['process_parameters','CPP values, limits, timestamps, and excursion flags.'],
      ['ipqc_results','In-process hardness, weight, and pass/fail results.'],
      ['downtime_events','Planned and unplanned production downtime records.']
    ]],
    ['LIMS Laboratory', [
      ['samples','In-process, release, and stability sample records.'],
      ['analytical_results','Numerical QC results, specifications, analysts, and reviewers.'],
      ['oos_records','Out-of-specification investigations linked to results.'],
      ['stability_studies','Product stability protocols and storage conditions.'],
      ['stability_timepoints','Potency and impurity results over study timepoints.'],
      ['sst_results','System-suitability results for analytical instruments.']
    ]],
    ['QMS Compliance', [
      ['deviations','Process, equipment, documentation, and laboratory deviations.'],
      ['capas','Corrective and preventive actions with effectiveness status.'],
      ['change_controls','Controlled process, equipment, method, and document changes.'],
      ['sops','Controlled procedures, versions, departments, and approvals.'],
      ['training_records','Employee SOP assignments, completion dates, and scores.']
    ]],
    ['CMMS and Monitoring', [
      ['calibrations','Calibration history, standards, due dates, and overdue flags.'],
      ['maintenance_plans','Approved preventive-maintenance frequencies and tasks.'],
      ['maintenance_work_orders','Preventive, corrective, and emergency maintenance execution.'],
      ['environmental_monitoring','Air, surface, and personnel microbiological monitoring.']
    ]],
    ['Data Integrity', [
      ['audit_trail','Append-only old/new values, reasons, timestamps, signatures, and hashes.']
    ]]
  ],
  queries: [
    {
      id: 'batch-risk',
      title: 'Executive Batch-Risk Ranking',
      purpose: 'Ranks batches using CPP excursions, OOS results, and deviation counts.',
      sql: `SELECT *\nFROM pharma_enterprise.vw_batch_quality_summary\nORDER BY (cpp_excursions * 2\n        + oos_results * 5\n        + deviations * 3) DESC\nLIMIT 25;`
    },
    {
      id: 'oos-product',
      title: 'OOS Results by Product and Test',
      purpose: 'Summarizes failed analytical results by product and analytical test.',
      sql: `SELECT p.product_name, ar.test_name, COUNT(*) AS oos_count\nFROM pharma_enterprise.analytical_results ar\nJOIN pharma_enterprise.samples s USING (sample_id)\nJOIN pharma_enterprise.batches b USING (batch_id)\nJOIN pharma_enterprise.products p USING (product_id)\nWHERE ar.pass_fail = 'FAIL'\nGROUP BY p.product_name, ar.test_name\nORDER BY oos_count DESC;`
    },
    {
      id: 'cpp-pareto',
      title: 'CPP Excursion Pareto',
      purpose: 'Identifies which critical process parameters generate the most excursions.',
      sql: `SELECT parameter_name, COUNT(*) AS excursion_count\nFROM pharma_enterprise.process_parameters\nWHERE excursion_flag\nGROUP BY parameter_name\nORDER BY excursion_count DESC;`
    },
    {
      id: 'downtime-pareto',
      title: 'Downtime Pareto',
      purpose: 'Totals downtime minutes and event counts by reason code.',
      sql: `SELECT reason_code,\n       SUM(duration_min) AS total_minutes,\n       COUNT(*) AS events\nFROM pharma_enterprise.downtime_events\nGROUP BY reason_code\nORDER BY total_minutes DESC;`
    },
    {
      id: 'equipment-compliance',
      title: 'Calibration and SST Exceptions',
      purpose: 'Surfaces overdue calibration records and failed system-suitability tests.',
      sql: `SELECT *\nFROM pharma_enterprise.vw_equipment_compliance\nWHERE overdue_flag\n   OR failed_sst_count > 0\nORDER BY overdue_flag DESC, failed_sst_count DESC;`
    },
    {
      id: 'capa-effectiveness',
      title: 'CAPA Effectiveness Status',
      purpose: 'Counts CAPAs by lifecycle and effectiveness status.',
      sql: `SELECT status, COUNT(*) AS capa_count\nFROM pharma_enterprise.capas\nGROUP BY status\nORDER BY status;`
    },
    {
      id: 'training-compliance',
      title: 'Training Compliance',
      purpose: 'Reviews assigned and completed SOP training by employee.',
      sql: `SELECT *\nFROM pharma_enterprise.vw_training_compliance\nORDER BY completion_pct, employee_id;`
    },
    {
      id: 'stability-trend',
      title: 'Stability Potency and Impurity Trend',
      purpose: 'Compares assay and total impurities by product, condition, and month.',
      sql: `SELECT p.product_name, ss.condition, st.month,\n       AVG(st.assay_pct) AS avg_assay,\n       AVG(st.total_impurities_pct) AS avg_impurities\nFROM pharma_enterprise.stability_timepoints st\nJOIN pharma_enterprise.stability_studies ss USING (stability_study_id)\nJOIN pharma_enterprise.products p USING (product_id)\nGROUP BY p.product_name, ss.condition, st.month\nORDER BY p.product_name, ss.condition, st.month;`
    },
    {
      id: 'em-alerts',
      title: 'Environmental Monitoring Alerts',
      purpose: 'Finds rooms and sampling types with non-passing monitoring events.',
      sql: `SELECT site_id, room_id, sample_type,\n       COUNT(*) AS alert_events\nFROM pharma_enterprise.environmental_monitoring\nWHERE status <> 'PASS'\nGROUP BY site_id, room_id, sample_type\nORDER BY alert_events DESC;`
    },
    {
      id: 'audit-coverage',
      title: 'Audit-Trail Coverage',
      purpose: 'Shows recorded audit actions across governed database entities.',
      sql: `SELECT table_name, action_type, COUNT(*) AS events\nFROM pharma_enterprise.audit_trail\nGROUP BY table_name, action_type\nORDER BY table_name, action_type;`
    }
  ]
};
