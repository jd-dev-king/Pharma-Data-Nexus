export const projectDetails = {
  title: 'Pharma Enterprise Analytics Platform',
  subtitle: 'A synthetic portfolio project demonstrating pharmaceutical data modeling, PostgreSQL engineering, cGMP-aware analytics, and interactive 3D communication.',
  overview: 'The project began as a four-pillar pharmaceutical database and evolved into a normalized enterprise simulation spanning manufacturing, laboratory, quality, maintenance, training, environmental monitoring, and data-integrity workflows.',
  metrics: [
    ['Normalized tables', '38'],
    ['Production batches', '600'],
    ['Process parameters', '19,200'],
    ['Analytical results', '9,000'],
    ['Audit events', '8,000'],
    ['Equipment assets', '120'],
    ['Environmental records', '3,600'],
    ['Training records', '2,160']
  ],
  technologies: ['PostgreSQL', 'pgAdmin 4', 'SQL', 'Python mock-data generation', 'CSV', 'Three.js', 'JavaScript ES modules', 'HTML5', 'CSS3', 'GitHub Pages'],
  capabilities: [
    'Normalized relational modeling with primary and foreign keys',
    'Batch genealogy from product formula through process and laboratory release',
    'Critical process parameter and in-process control exception detection',
    'OOS, deviation, CAPA, and change-control analysis',
    'Calibration, preventive maintenance, and SST exception monitoring',
    'Stability potency and impurity trend analysis',
    'Training and environmental-monitoring compliance views',
    'Append-only mock audit trail with attribution and electronic-signature metadata',
    'Interactive holographic visualization for the EES Portfolio Universe'
  ],
  analyses: [
    ['Batch risk ranking', 'Combines CPP excursions, OOS results, deviations, and yield.'],
    ['Downtime Pareto', 'Ranks breakdown, changeover, cleaning, material wait, and operator delay losses.'],
    ['Equipment compliance', 'Surfaces overdue calibration and failed system suitability tests.'],
    ['Stability trending', 'Compares assay and impurity performance across storage conditions and timepoints.'],
    ['Audit coverage', 'Summarizes inserts, updates, reviews, and status changes by regulated record type.']
  ],
  regulatory: {
    heading: 'Compliance Position',
    text: 'The schema is designed around cGMP and ALCOA+ concepts, including attribution, contemporaneous UTC timestamps, review fields, controlled relationships, audit history, and record hashes. It is synthetic educational data and is not a validated GxP system.',
    limitations: ['No validated software lifecycle', 'No production access-control implementation', 'No regulated electronic-signature validation', 'No operational product-release use', 'No regulatory submission use']
  }
};
