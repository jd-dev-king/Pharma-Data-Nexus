import { architectureData } from './architecture-data.js';
import { projectDetails } from './project-details.js';
import { databaseCatalog } from './tables-queries-data.js';
import { dataMoonHealth, choosePharmaSchema, loadLiveCatalog, sampleTable, runReadOnlySql } from './data-moon-service.js';
import * as THREE from 'three';import{OrbitControls}from'three/addons/controls/OrbitControls.js';import{EffectComposer}from'three/addons/postprocessing/EffectComposer.js';import{RenderPass}from'three/addons/postprocessing/RenderPass.js';import{UnrealBloomPass}from'three/addons/postprocessing/UnrealBloomPass.js';
const data={overview:['DATABASE COMMAND CORE','Enterprise Pharmaceutical Data Platform','A visual command center connecting manufacturing, laboratory, quality, engineering, and data-integrity systems.',[['TABLES / VIEWS','—'],['BATCHES','—'],['AUDIT EVENTS','—'],['SCHEMA','CONNECTING']],[['PostgreSQL Core','CONNECTING'],['Data Moon Catalog','CONNECTING'],['Source','PENDING']]],mes:['MANUFACTURING EXECUTION SYSTEM','MES Production Hologram','Tracks batch execution, material genealogy, critical process parameters, in-process controls, production lines, and downtime events.',[['BATCHES','600'],['PROCESS EVENTS','4,800'],['CPP RECORDS','19,200'],['LINES','12']],[['Batch Genealogy','SYNCED'],['CPP Monitoring','LIVE'],['Work Orders','COMPLETE']]],lims:['LABORATORY INFORMATION MANAGEMENT','LIMS Analytical Laboratory','Displays samples, validated test methods, analytical results, OOS investigations, stability protocols, and system suitability testing.',[['SAMPLES','1,800'],['RESULTS','9,000'],['METHODS','35'],['SST RUNS','1,200']],[['Assay Testing','PASS'],['Stability Program','ACTIVE'],['OOS Workflow','MONITORED']]],qms:['QUALITY MANAGEMENT SYSTEM','QMS Compliance Matrix','Connects deviations, CAPAs, change controls, SOPs, training, reviews, and quality ownership.',[['DEVIATIONS','180'],['CAPAs','120'],['CHANGES','90'],['SOPs','120']],[['CAPA Effectiveness','TRACKED'],['Training Compliance','100%'],['Change Control','GOVERNED']]],cmms:['COMPUTERIZED MAINTENANCE MANAGEMENT','CMMS Equipment Network','Visualizes equipment assets, calibration schedules, maintenance plans, work orders, and instrument suitability exceptions.',[['EQUIPMENT','120'],['CALIBRATIONS','480'],['WORK ORDERS','900'],['SST FAILURES','4']],[['Calibration Status','WATCH'],['Preventive Maintenance','ACTIVE'],['Asset Criticality','MAPPED']]],audit:['ALCOA+ DATA INTEGRITY','Immutable Audit Trail','Simulates attributable, contemporaneous, original, accurate, complete, consistent, enduring, and available regulated records.',[['AUDIT EVENTS','8,000'],['HASH MODE','SHA-256'],['TIME STANDARD','UTC'],['CONTROL','APPEND-ONLY']],[['Electronic Signatures','CAPTURED'],['Change Reasons','REQUIRED'],['Record History','IMMUTABLE']]]};
const canvas=document.querySelector('#c'),renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:true});renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.setSize(innerWidth,innerHeight);renderer.outputColorSpace=THREE.SRGBColorSpace;const scene=new THREE.Scene();scene.fog=new THREE.FogExp2(0x020611,.026);const camera=new THREE.PerspectiveCamera(50,innerWidth/innerHeight,.1,300);camera.position.set(19,10,22);const controls=new OrbitControls(camera,renderer.domElement);controls.enableDamping=true;controls.minDistance=10;controls.maxDistance=42;controls.maxPolarAngle=Math.PI*.52;controls.target.set(0,2.5,0);const composer=new EffectComposer(renderer);composer.addPass(new RenderPass(scene,camera));composer.addPass(new UnrealBloomPass(new THREE.Vector2(innerWidth,innerHeight),1.05,.55,.72));scene.add(new THREE.AmbientLight(0x2b4c6e,1.15));const light=new THREE.PointLight(0x62e7ff,45,34);light.position.set(0,11,0);scene.add(light);
const neon=(c,o=.82)=>new THREE.MeshStandardMaterial({color:c,emissive:c,emissiveIntensity:1.7,transparent:true,opacity:o,roughness:.28,metalness:.25});const interact=[],roots={},streams=[];
function tex(title,c){const cv=document.createElement('canvas');cv.width=1024;cv.height=576;const x=cv.getContext('2d');x.fillStyle='rgba(2,8,20,.95)';x.fillRect(0,0,1024,576);x.fillStyle=c;x.fillRect(0,0,1024,8);x.font='700 36px Arial';x.fillStyle='#eefaff';x.fillText(title,40,60);x.font='600 21px monospace';[['NODE STATUS','ONLINE'],['QUERY PIPELINE','ACTIVE'],['RECORD HASH','VERIFIED'],['ACCESS MODE','READ ONLY']].forEach((r,i)=>{x.fillStyle=i%2?c:'#9d6cff';x.fillText(r[0],50,130+i*78);x.fillStyle='#68ffbd';x.fillText(r[1],760,130+i*78)});return new THREE.CanvasTexture(cv)}
function holo(id,label,pos,color){const g=new THREE.Group();g.position.copy(pos);g.userData.system=id;const base=new THREE.Mesh(new THREE.CylinderGeometry(2.1,2.5,.45,48),new THREE.MeshStandardMaterial({color:0x071425,metalness:.8,roughness:.25}));base.position.y=.25;g.add(base);const ring=new THREE.Mesh(new THREE.TorusGeometry(1.8,.05,12,80),neon(color));ring.rotation.x=Math.PI/2;ring.position.y=.56;g.add(ring);const tower=new THREE.Mesh(new THREE.BoxGeometry(2.5,3.5,2.2),new THREE.MeshStandardMaterial({color:0x07131f,metalness:.65,roughness:.22,emissive:color,emissiveIntensity:.16}));tower.position.y=2.3;g.add(tower);for(let y=1.05;y<3.7;y+=.48){const led=new THREE.Mesh(new THREE.BoxGeometry(1.8,.05,.05),neon(color));led.position.set(0,y,1.13);g.add(led)}const scr=new THREE.Mesh(new THREE.PlaneGeometry(4.7,2.65),new THREE.MeshBasicMaterial({map:tex(label,'#'+color.toString(16).padStart(6,'0')),transparent:true,opacity:.93,side:THREE.DoubleSide}));scr.position.set(0,5.5,0);scr.rotation.y=-.12;g.add(scr);const beam=new THREE.Mesh(new THREE.CylinderGeometry(.25,1.35,4.6,32,1,true),new THREE.MeshBasicMaterial({color,transparent:true,opacity:.07,side:THREE.DoubleSide}));beam.position.y=3.1;g.add(beam);g.traverse(o=>{if(o.isMesh){o.userData.system=id;interact.push(o)}});scene.add(g);roots[id]=g;return g}
const floor=new THREE.Mesh(new THREE.CircleGeometry(19,96),new THREE.MeshStandardMaterial({color:0x020914,metalness:.75,roughness:.42}));floor.rotation.x=-Math.PI/2;scene.add(floor);const grid=new THREE.GridHelper(38,38,0x296b8f,0x12334a);grid.material.transparent=true;grid.material.opacity=.34;grid.position.y=.02;scene.add(grid);
const systems=[['mes','MES',new THREE.Vector3(-8,0,-3),0x4f7cff],['lims','LIMS',new THREE.Vector3(0,0,-7),0x62e7ff],['qms','QMS',new THREE.Vector3(8,0,-3),0x9d6cff],['cmms','CMMS',new THREE.Vector3(6,0,6),0x68ffbd],['audit','AUDIT',new THREE.Vector3(-6,0,6),0x4de0c0]];systems.forEach(s=>holo(...s));const core=new THREE.Group(),orb=new THREE.Mesh(new THREE.IcosahedronGeometry(2.25,4),new THREE.MeshStandardMaterial({color:0x8bdfff,wireframe:true,emissive:0x4f7cff,emissiveIntensity:1.6,transparent:true,opacity:.8}));orb.position.y=5;core.add(orb);core.userData.system='overview';core.traverse(o=>{if(o.isMesh){o.userData.system='overview';interact.push(o)}});scene.add(core);roots.overview=core;
const pg=new THREE.BufferGeometry(),pc=1200,pa=new Float32Array(pc*3);for(let i=0;i<pc;i++){const r=12+Math.random()*35,a=Math.random()*Math.PI*2;pa[i*3]=Math.cos(a)*r;pa[i*3+1]=Math.random()*22-2;pa[i*3+2]=Math.sin(a)*r}pg.setAttribute('position',new THREE.BufferAttribute(pa,3));const particles=new THREE.Points(pg,new THREE.PointsMaterial({color:0x62e7ff,size:.045,transparent:true,opacity:.62}));scene.add(particles);
systems.forEach((s,si)=>{const st=new THREE.Vector3(0,5,0),en=s[2].clone().add(new THREE.Vector3(0,4,0)),curve=new THREE.CatmullRomCurve3([st,st.clone().lerp(en,.35).add(new THREE.Vector3(0,2.5,0)),st.clone().lerp(en,.7).add(new THREE.Vector3(0,1.2,0)),en]);scene.add(new THREE.Mesh(new THREE.TubeGeometry(curve,64,.025,8,false),new THREE.MeshBasicMaterial({color:s[3],transparent:true,opacity:.25})));const packets=[];for(let p=0;p<5;p++){const q=new THREE.Mesh(new THREE.SphereGeometry(.08,12,12),neon(s[3]));q.userData.o=p/5;scene.add(q);packets.push(q)}streams.push({curve,packets})});
function update(id){const d=data[id];kicker.textContent=d[0];title.textContent=d[1];copy.textContent=d[2];scene.textContent=d[1].toUpperCase();metrics.innerHTML=d[3].map(m=>`<div class="metric"><span>${m[0]}</span><strong>${m[1]}</strong></div>`).join('');lines.innerHTML=d[4].map(l=>`<div class="line"><i></i><span>${l[0]}</span><em>${l[1]}</em></div>`).join('');panel.classList.remove('hidden');document.querySelectorAll('nav button').forEach(b=>b.classList.toggle('active',b.dataset.id===id))}
document.querySelectorAll('nav button').forEach(b=>b.onclick=()=>{update(b.dataset.id);const r=roots[b.dataset.id];if(r)controls.target.lerp(r.position.clone().add(new THREE.Vector3(0,3,0)),.45)});close.onclick=()=>panel.classList.add('hidden');const ray=new THREE.Raycaster(),pointer=new THREE.Vector2();addEventListener('pointermove',e=>{pointer.x=e.clientX/innerWidth*2-1;pointer.y=-(e.clientY/innerHeight)*2+1;ray.setFromCamera(pointer,camera);document.body.style.cursor=ray.intersectObjects(interact,false)[0]?'pointer':'default'});addEventListener('click',e=>{if(e.target.closest('.hud')&&!e.target.matches('#c'))return;ray.setFromCamera(pointer,camera);const id=ray.intersectObjects(interact,false)[0]?.object?.userData?.system;if(id)update(id)});const clock=new THREE.Clock();function animate(){requestAnimationFrame(animate);const t=clock.getElapsedTime();controls.update();particles.rotation.y=t*.006;orb.rotation.y=t*.24;orb.rotation.x=Math.sin(t*.45)*.18;Object.entries(roots).forEach(([id,r],i)=>{if(id!=='overview'){r.position.y=Math.sin(t*.8+i)*.08;r.rotation.y=Math.sin(t*.22+i)*.025}});streams.forEach((s,si)=>s.packets.forEach((p,pi)=>p.position.copy(s.curve.getPoint((t*.12+p.userData.o+si*.07)%1))));rate.textContent=`${(2.5+Math.sin(t)*.45).toFixed(1)}K rec/s`;composer.render()}update('overview');initializeLiveCommandCore();animate();addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);composer.setSize(innerWidth,innerHeight)});


const modal = document.querySelector('#detail-modal');
const modalContent = document.querySelector('#modal-content');

function architectureMarkup() {
  return `
    <header class="modal-hero">
      <small>SYSTEM ARCHITECTURE</small>
      <h2 id="modal-title">${architectureData.title}</h2>
      <p>${architectureData.subtitle}</p>
    </header>
    <section class="architecture-grid">
      ${architectureData.layers.map(layer => `
        <article class="architecture-layer layer-${layer.accent}">
          <h3>${layer.name}</h3>
          <p>${layer.description}</p>
          <ul>${layer.items.map(item => `<li>${item}</li>`).join('')}</ul>
        </article>
      `).join('')}
    </section>
    <h3 class="section-heading">End-to-End Data Flow</h3>
    <section class="flow-list">
      ${architectureData.flows.map(flow => `<article class="flow-card"><strong>${flow[0]}</strong><span>${flow[1]}</span></article>`).join('')}
    </section>
    <h3 class="section-heading">38-Table Domain Map</h3>
    <section class="table-groups">
      ${architectureData.tableGroups.map(group => `<article class="table-group"><strong>${group[0]}</strong><b>${group[1]}</b><span>${group[2]}</span></article>`).join('')}
    </section>`;
}

function projectMarkup() {
  return `
    <header class="modal-hero">
      <small>PROJECT DETAILS</small>
      <h2 id="modal-title">${projectDetails.title}</h2>
      <p>${projectDetails.subtitle}</p>
    </header>
    <section class="project-metrics">
      ${projectDetails.metrics.map(metric => `<article class="project-metric"><span>${metric[0]}</span><strong>${metric[1]}</strong></article>`).join('')}
    </section>
    <section class="details-grid">
      <article class="detail-section">
        <h3>Project Overview</h3>
        <p>${projectDetails.overview}</p>
      </article>
      <article class="detail-section">
        <h3>Technology Stack</h3>
        <div class="tech-tags">${projectDetails.technologies.map(item => `<span>${item}</span>`).join('')}</div>
      </article>
      <article class="detail-section">
        <h3>Core Capabilities</h3>
        <ul>${projectDetails.capabilities.map(item => `<li>${item}</li>`).join('')}</ul>
      </article>
      <article class="detail-section">
        <h3>Analysis Portfolio</h3>
        <div class="analysis-list">${projectDetails.analyses.map(item => `<div class="analysis-row"><strong>${item[0]}</strong><span>${item[1]}</span></div>`).join('')}</div>
      </article>
      <article class="detail-section warning-box">
        <h3>${projectDetails.regulatory.heading}</h3>
        <p>${projectDetails.regulatory.text}</p>
        <ul>${projectDetails.regulatory.limitations.map(item => `<li>${item}</li>`).join('')}</ul>
      </article>
    </section>`;
}


let liveDatabaseState = {
  connected: false,
  schema: null,
  tables: [],
  health: null,
  error: null
};

function findLiveTable(...patterns) {
  if (!liveDatabaseState.connected) return null;
  return liveDatabaseState.tables.find(table =>
    patterns.some(pattern => pattern.test(table.name))
  ) || null;
}

function liveCount(...patterns) {
  const table = findLiveTable(...patterns);
  return table?.rowCount == null ? "—" : Number(table.rowCount).toLocaleString();
}

function refreshLiveSystemMetrics() {
  if (!liveDatabaseState.connected) return;

  data.overview[3] = [
    ["TABLES / VIEWS", String(liveDatabaseState.tables.length)],
    ["BATCHES", liveCount(/^batches?$/i, /batch/i)],
    ["AUDIT EVENTS", liveCount(/^audit_events?$/i, /audit.*event/i, /audit/i)],
    ["SCHEMA", liveDatabaseState.schema]
  ];
  data.overview[4] = [
    ["PostgreSQL Core", "ONLINE"],
    ["Data Moon Catalog", "LIVE"],
    ["Source", "POSTGRESQL"]
  ];

  data.mes[3] = [
    ["BATCHES", liveCount(/^batches?$/i, /batch/i)],
    ["PROCESS EVENTS", liveCount(/process.*event/i, /manufacturing.*event/i)],
    ["CPP RECORDS", liveCount(/cpp/i, /process.*parameter/i)],
    ["LINES", liveCount(/^lines?$/i, /production.*line/i)]
  ];
  data.mes[4] = [
    ["Batch Genealogy", findLiveTable(/genealog/i) ? "LIVE" : "CATALOG"],
    ["CPP Monitoring", findLiveTable(/cpp/i) ? "LIVE" : "CATALOG"],
    ["Data Source", "DATA MOON"]
  ];

  data.lims[3] = [
    ["SAMPLES", liveCount(/^samples?$/i, /sample/i)],
    ["RESULTS", liveCount(/analytical.*result/i, /^results?$/i, /lab.*result/i)],
    ["METHODS", liveCount(/test.*method/i, /^methods?$/i)],
    ["STABILITY", liveCount(/stability/i)]
  ];
  data.lims[4] = [
    ["Laboratory Catalog", "LIVE"],
    ["Schema", liveDatabaseState.schema.toUpperCase()],
    ["Data Source", "DATA MOON"]
  ];

  data.qms[3] = [
    ["DEVIATIONS", liveCount(/deviation/i)],
    ["CAPAs", liveCount(/capa/i)],
    ["CHANGES", liveCount(/change.*control/i, /^changes?$/i)],
    ["SOPs", liveCount(/^sops?$/i, /procedure/i)]
  ];
  data.qms[4] = [
    ["Quality Catalog", "LIVE"],
    ["Relational Data", "VERIFIED"],
    ["Data Source", "DATA MOON"]
  ];

  data.cmms[3] = [
    ["EQUIPMENT", liveCount(/^equipment$/i, /equipment/i)],
    ["CALIBRATIONS", liveCount(/calibration/i)],
    ["WORK ORDERS", liveCount(/work.*order/i, /maintenance.*order/i)],
    ["MAINTENANCE", liveCount(/maintenance/i)]
  ];
  data.cmms[4] = [
    ["Asset Catalog", "LIVE"],
    ["Calibration Data", findLiveTable(/calibration/i) ? "AVAILABLE" : "—"],
    ["Data Source", "DATA MOON"]
  ];

  data.audit[3] = [
    ["AUDIT EVENTS", liveCount(/^audit_events?$/i, /audit.*event/i, /audit/i)],
    ["HASH MODE", "SHA-256"],
    ["TIME STANDARD", "UTC"],
    ["ACCESS", "READ ONLY"]
  ];
  data.audit[4] = [
    ["Audit Catalog", "LIVE"],
    ["Data Moon", "CONNECTED"],
    ["Record Access", "GOVERNED"]
  ];
}

async function initializeLiveCommandCore() {
  await prepareLiveDatabase();
  if (liveDatabaseState.connected) {
    refreshLiveSystemMetrics();
    update("overview");
  }
}

function escapeMarkup(value) {
  return String(value ?? "").replace(/[&<>"']/g, c => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
  })[c]);
}

function fallbackTableCount() {
  return databaseCatalog.tables.reduce((total, domain) => total + domain[1].length, 0);
}

async function prepareLiveDatabase() {
  try {
    const health = await dataMoonHealth();
    const schema = await choosePharmaSchema();
    if (!schema) throw new Error("No Pharma schema was discovered.");
    const catalog = await loadLiveCatalog(schema);
    liveDatabaseState = {
      connected: true,
      schema,
      tables: catalog.tables,
      health,
      error: null
    };
  } catch (error) {
    liveDatabaseState = {
      connected: false,
      schema: null,
      tables: [],
      health: null,
      error: error.message || String(error)
    };
  }
}

function fallbackTablesMarkup() {
  return databaseCatalog.tables.map(domain => `
    <article class="catalog-domain" data-search-item="${escapeMarkup(domain[0])} ${escapeMarkup(domain[1].map(table => table.join(' ')).join(' '))}">
      <header><h3>${escapeMarkup(domain[0])}</h3><span>${domain[1].length} tables</span></header>
      <div class="table-catalog">
        ${domain[1].map(table => `<div class="catalog-table"><code>${escapeMarkup(table[0])}</code><p>${escapeMarkup(table[1])}</p></div>`).join('')}
      </div>
    </article>`).join('');
}

function liveTablesMarkup() {
  return `
    <article class="catalog-domain" data-search-item="${escapeMarkup(liveDatabaseState.schema)} ${escapeMarkup(liveDatabaseState.tables.map(t => t.name).join(" "))}">
      <header><h3>${escapeMarkup(liveDatabaseState.schema)}</h3><span>${liveDatabaseState.tables.length} objects</span></header>
      <div class="table-catalog">
        ${liveDatabaseState.tables.map(table => `
          <button type="button" class="catalog-table live-table" data-live-table="${escapeMarkup(table.name)}">
            <code>${escapeMarkup(table.name)}</code>
            <p>${table.rowCount === null ? escapeMarkup(table.type) : `${Number(table.rowCount).toLocaleString()} rows · ${table.columns.length} columns`}</p>
          </button>`).join('')}
      </div>
    </article>
    <div id="live-table-preview" class="live-table-preview">
      <p>Select a live table to preview safe sample rows.</p>
    </div>`;
}

function renderResultTable(payload) {
  if (!payload?.columns?.length) return "<p>No rows returned.</p>";
  return `<div class="result-table-wrap"><table class="result-table"><thead><tr>${
    payload.columns.map(c => `<th>${escapeMarkup(c)}</th>`).join("")
  }</tr></thead><tbody>${
    payload.rows.map(row => `<tr>${row.map(v => `<td>${escapeMarkup(v)}</td>`).join("")}</tr>`).join("")
  }</tbody></table></div>`;
}

function sqlWorkbenchMarkup() {
  const examples = databaseCatalog.queries.slice(0, 6);
  const initialTable = liveDatabaseState.tables[0]?.name || "table_name";
  const initialSql = liveDatabaseState.connected
    ? `SELECT * FROM "${liveDatabaseState.schema}"."${initialTable}" LIMIT 25`
    : (examples[0]?.sql || "SELECT 1");
  return `
    <div class="data-moon-workbench">
      <label><span>READ-ONLY SQL</span><textarea id="live-sql-editor" spellcheck="false">${escapeMarkup(initialSql)}</textarea></label>
      <div class="workbench-actions">
        <button type="button" id="run-live-sql" ${liveDatabaseState.connected ? "" : "disabled"}>Run through Data Moon</button>
        <small>SELECT / WITH / EXPLAIN only · results capped server-side</small>
      </div>
      <div id="live-sql-results" class="live-sql-results">
        ${liveDatabaseState.connected ? "Ready." : "Connect the Data Moon API to execute live SQL."}
      </div>
    </div>
    <h3 class="section-heading">Saved Analysis Examples</h3>
    <div class="query-library">
      ${examples.map((query, index) => `
        <article class="query-card" data-search-item="${escapeMarkup(query.title)} ${escapeMarkup(query.purpose)}">
          <header><span>QUERY ${String(index + 1).padStart(2, '0')}</span><h3>${escapeMarkup(query.title)}</h3></header>
          <p>${escapeMarkup(query.purpose)}</p>
          <pre><code>${escapeMarkup(query.sql)}</code></pre>
          <button type="button" class="copy-query" data-copy-query="${escapeMarkup(query.id)}">Copy SQL</button>
        </article>`).join('')}
    </div>`;
}

function databaseMarkup() {
  const connected = liveDatabaseState.connected;
  const schemaLabel = liveDatabaseState.schema || "pharma_enterprise";
  const tableCount = connected ? liveDatabaseState.tables.length : fallbackTableCount();
  return `
    <header class="modal-hero">
      <small>POSTGRESQL DATABASE BROWSER · ${connected ? "EES DATA MOON LIVE" : "SANITIZED FALLBACK"}</small>
      <h2 id="modal-title">Pharma Schema &amp; SQL Workbench</h2>
      <p>${connected
        ? "Live metadata is supplied by EES Universal Data Moon. Database credentials remain server-side."
        : "The Data Moon API is unavailable, so the original sanitized pharmaceutical catalog remains available for the portfolio demo."}</p>
    </header>
    <section class="project-metrics">
      <article class="project-metric"><span>TABLES / VIEWS</span><strong>${tableCount}</strong></article>
      <article class="project-metric"><span>DATA SOURCE</span><strong>${connected ? "DATA MOON" : "SNAPSHOT"}</strong></article>
      <article class="project-metric"><span>DATABASE</span><strong>${escapeMarkup(liveDatabaseState.health?.database || "PostgreSQL")}</strong></article>
      <article class="project-metric"><span>SCHEMA</span><strong>${escapeMarkup(schemaLabel)}</strong></article>
    </section>
    ${liveDatabaseState.error ? `<p class="database-live-warning">Live catalog unavailable: ${escapeMarkup(liveDatabaseState.error)}</p>` : ""}
    <div class="database-toolbar">
      <button class="db-tab active" type="button" data-db-tab="tables">Tables</button>
      <button class="db-tab" type="button" data-db-tab="queries">SQL Workbench</button>
      <label class="db-search"><span>Search</span><input id="database-search" type="search" placeholder="Search tables or SQL"></label>
    </div>
    <section id="database-tables" class="database-view active">
      ${connected ? liveTablesMarkup() : fallbackTablesMarkup()}
    </section>
    <section id="database-queries" class="database-view">
      ${sqlWorkbenchMarkup()}
    </section>`;
}

function activateDatabaseViewer() {
  const tabs = modalContent.querySelectorAll('[data-db-tab]');
  const views = {
    tables: modalContent.querySelector('#database-tables'),
    queries: modalContent.querySelector('#database-queries')
  };
  const search = modalContent.querySelector('#database-search');
  let activeTab = 'tables';

  const filter = () => {
    const term = search.value.trim().toLowerCase();
    views[activeTab]?.querySelectorAll('[data-search-item]').forEach(item => {
      item.hidden = Boolean(term) && !item.dataset.searchItem.toLowerCase().includes(term);
    });
  };

  tabs.forEach(tab => tab.addEventListener('click', () => {
    activeTab = tab.dataset.dbTab;
    tabs.forEach(item => item.classList.toggle('active', item === tab));
    Object.entries(views).forEach(([name, view]) => view?.classList.toggle('active', name === activeTab));
    search.value = '';
    filter();
  }));
  search?.addEventListener('input', filter);

  modalContent.querySelectorAll('[data-copy-query]').forEach(button => {
    button.addEventListener('click', async () => {
      const query = databaseCatalog.queries.find(item => item.id === button.dataset.copyQuery);
      if (!query) return;
      try {
        await navigator.clipboard.writeText(query.sql);
        button.textContent = 'SQL Copied';
        setTimeout(() => { button.textContent = 'Copy SQL'; }, 1400);
      } catch {
        button.textContent = 'Select SQL Above';
      }
    });
  });

  modalContent.querySelectorAll('[data-live-table]').forEach(button => {
    button.addEventListener('click', async () => {
      const preview = modalContent.querySelector('#live-table-preview');
      preview.innerHTML = "<p>Loading sample rows…</p>";
      try {
        const result = await sampleTable(liveDatabaseState.schema, button.dataset.liveTable, 10);
        preview.innerHTML = `<h3>${escapeMarkup(liveDatabaseState.schema)}.${escapeMarkup(button.dataset.liveTable)}</h3>${renderResultTable(result)}`;
      } catch (error) {
        preview.innerHTML = `<p>${escapeMarkup(error.message)}</p>`;
      }
    });
  });

  modalContent.querySelector('#run-live-sql')?.addEventListener('click', async () => {
    const editor = modalContent.querySelector('#live-sql-editor');
    const results = modalContent.querySelector('#live-sql-results');
    results.textContent = "Running read-only query…";
    try {
      const payload = await runReadOnlySql(editor.value, 250);
      results.innerHTML = `<p>${payload.row_count} rows · ${payload.duration_ms} ms</p>${renderResultTable(payload)}`;
    } catch (error) {
      results.innerHTML = `<p>${escapeMarkup(error.message)}</p>`;
    }
  });
}

async function openDetailModal(type) {
  if (type === 'database') {
    modalContent.innerHTML = `<header class="modal-hero"><small>EES UNIVERSAL DATA MOON</small><h2 id="modal-title">Connecting to Pharma catalog…</h2><p>Loading live PostgreSQL metadata with sanitized fallback.</p></header>`;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    controls.enabled = false;
    await prepareLiveDatabase();
    modalContent.innerHTML = databaseMarkup();
    activateDatabaseViewer();
    return;
  }
  modalContent.innerHTML = type === 'architecture' ? architectureMarkup() : projectMarkup();
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  controls.enabled = false;
}

function closeDetailModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  controls.enabled = true;
}

document.querySelectorAll('[data-open-modal]').forEach(button => {
  button.addEventListener('click', () => openDetailModal(button.dataset.openModal));
});
document.querySelectorAll('[data-close-modal]').forEach(element => element.addEventListener('click', closeDetailModal));
window.addEventListener('keydown', event => { if (event.key === 'Escape' && modal.classList.contains('open')) closeDetailModal(); });
