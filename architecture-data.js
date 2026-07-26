export const architectureData = {
  title: 'Pharma Enterprise System Architecture',
  subtitle: 'Normalized PostgreSQL foundation connecting simulated MES, LIMS, QMS, CMMS, training, environmental monitoring, and ALCOA+ audit services.',
  layers: [
    {
      name: 'Experience Layer',
      accent: 'cyan',
      description: 'The EES Portfolio Universe presents the database as an interactive Three.js command center rather than a conventional chart dashboard.',
      items: ['Three.js holographic scene', 'Interactive system directory', 'Live simulated database screens', 'Responsive portfolio HUD']
    },
    {
      name: 'Application Systems',
      accent: 'violet',
      description: 'Five operational domains represent the major pharmaceutical information systems supported by the data model.',
      items: ['MES — manufacturing execution', 'LIMS — laboratory analytics', 'QMS — deviations, CAPA and change control', 'CMMS — equipment, calibration and maintenance', 'ALCOA+ — audit trail and electronic-signature metadata']
    },
    {
      name: 'Data Services',
      accent: 'green',
      description: 'Reusable SQL views and indexed relational paths support quality, engineering, operations, and compliance analysis.',
      items: ['Batch quality summary view', 'Equipment compliance view', 'Training compliance view', 'OOS and CPP analysis', 'Stability and downtime trending']
    },
    {
      name: 'PostgreSQL Core',
      accent: 'blue',
      description: 'A 38-table normalized schema enforces primary keys, foreign keys, controlled relationships, indexes, UTC timestamps, and append-only audit behavior.',
      items: ['Master and reference data', 'Manufacturing and batch genealogy', 'QC and stability records', 'Equipment and calibration history', 'Quality events and training records', 'Environmental monitoring and audit trail']
    }
  ],
  flows: [
    ['Master Data', 'Products, materials, formulas, MBRs and test methods establish approved standards.'],
    ['Manufacturing', 'Work orders create batches, material lots, process events, CPP readings and IPQC results.'],
    ['Laboratory', 'Samples connect each batch to analytical methods, instruments, results, stability data and OOS investigations.'],
    ['Quality', 'Deviations can drive CAPAs and change controls while SOP training supports procedural compliance.'],
    ['Engineering', 'Equipment assets connect to calibrations, maintenance plans, work orders and system suitability tests.'],
    ['Integrity', 'Audit events retain attribution, timestamps, reason for change, session identifiers, signatures and SHA-256 mock hashes.']
  ],
  tableGroups: [
    ['Foundation', 8, 'sites, departments, roles, employees, suppliers, products, materials, specifications'],
    ['Master Records', 5, 'formulas, components, master batch records, MBR steps, test methods'],
    ['Manufacturing', 9, 'lines, equipment, batches, work orders, materials, process events, CPPs, IPQC, downtime'],
    ['Laboratory & Quality', 9, 'samples, results, OOS, stability, deviations, CAPAs and change controls'],
    ['Engineering & Compliance', 7, 'calibration, maintenance, SST, SOPs, training, environmental monitoring and audit trail']
  ]
};
