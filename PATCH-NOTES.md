# Pharma Data Nexus — Live Command Core Hotfix

This hotfix removes the hard-coded Command Core metric values from the live application view.

When EES Universal Data Moon is connected, the main 3D command panel now derives:
- tables/views from the live Pharma catalog
- batch count from the discovered batch table
- audit-event count from the discovered audit table
- active schema from Data Moon
- MES/LIMS/QMS/CMMS card counts from matching real Pharma tables where available

If a corresponding live table is not present, the UI displays `—` instead of a fabricated portfolio value.

The existing sanitized catalog remains available only as the offline Tables & SQL fallback.
