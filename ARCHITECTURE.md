# Pharma Data Nexus Architecture

The simulation presents four layers:

1. Experience layer — Three.js holographic interface and EES Portfolio Universe HUD.
2. Application systems — MES, LIMS, QMS, CMMS, and ALCOA+ audit domains.
3. Data services — SQL views and analysis queries for operations, quality, engineering, and compliance.
4. PostgreSQL core — 38 normalized tables with relational constraints, indexes, timestamps, and append-only audit controls.

## Major data flow

Master data establishes product, material, formula, MBR, and method standards. Manufacturing creates work orders, batches, genealogy, process events, CPP readings, and IPQC data. Laboratory workflows add samples, results, stability data, and OOS records. Quality workflows add deviations, CAPAs, change controls, SOPs, and training. Engineering workflows add calibration, maintenance, and SST records. The audit trail records attributed changes and review activity.
