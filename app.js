import { architectureData } from './architecture-data.js';
import { projectDetails } from './project-details.js';
import { databaseCatalog } from './tables-queries-data.js';
import * as THREE from 'three';import{OrbitControls}from'three/addons/controls/OrbitControls.js';import{EffectComposer}from'three/addons/postprocessing/EffectComposer.js';import{RenderPass}from'three/addons/postprocessing/RenderPass.js';import{UnrealBloomPass}from'three/addons/postprocessing/UnrealBloomPass.js';
const data={overview:['DATABASE COMMAND CORE','Enterprise Pharmaceutical Data Platform','A visual command center connecting manufacturing, laboratory, quality, engineering, and data-integrity systems.',[['TABLES','38'],['BATCHES','600'],['AUDIT EVENTS','8,000'],['SYSTEMS','5']],[['PostgreSQL Core','ONLINE'],['Relational Integrity','VERIFIED'],['Portfolio Simulation','ACTIVE']]],mes:['MANUFACTURING EXECUTION SYSTEM','MES Production Hologram','Tracks batch execution, material genealogy, critical process parameters, in-process controls, production lines, and downtime events.',[['BATCHES','600'],['PROCESS EVENTS','4,800'],['CPP RECORDS','19,200'],['LINES','12']],[['Batch Genealogy','SYNCED'],['CPP Monitoring','LIVE'],['Work Orders','COMPLETE']]],lims:['LABORATORY INFORMATION MANAGEMENT','LIMS Analytical Laboratory','Displays samples, validated test methods, analytical results, OOS investigations, stability protocols, and system suitability testing.',[['SAMPLES','1,800'],['RESULTS','9,000'],['METHODS','35'],['SST RUNS','1,200']],[['Assay Testing','PASS'],['Stability Program','ACTIVE'],['OOS Workflow','MONITORED']]],qms:['QUALITY MANAGEMENT SYSTEM','QMS Compliance Matrix','Connects deviations, CAPAs, change controls, SOPs, training, reviews, and quality ownership.',[['DEVIATIONS','180'],['CAPAs','120'],['CHANGES','90'],['SOPs','120']],[['CAPA Effectiveness','TRACKED'],['Training Compliance','100%'],['Change Control','GOVERNED']]],cmms:['COMPUTERIZED MAINTENANCE MANAGEMENT','CMMS Equipment Network','Visualizes equipment assets, calibration schedules, maintenance plans, work orders, and instrument suitability exceptions.',[['EQUIPMENT','120'],['CALIBRATIONS','480'],['WORK ORDERS','900'],['SST FAILURES','4']],[['Calibration Status','WATCH'],['Preventive Maintenance','ACTIVE'],['Asset Criticality','MAPPED']]],audit:['ALCOA+ DATA INTEGRITY','Immutable Audit Trail','Simulates attributable, contemporaneous, original, accurate, complete, consistent, enduring, and available regulated records.',[['AUDIT EVENTS','8,000'],['HASH MODE','SHA-256'],['TIME STANDARD','UTC'],['CONTROL','APPEND-ONLY']],[['Electronic Signatures','CAPTURED'],['Change Reasons','REQUIRED'],['Record History','IMMUTABLE']]]};
const canvas=document.querySelector('#c'),renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:true});renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.setSize(innerWidth,innerHeight);renderer.outputColorSpace=THREE.SRGBColorSpace;const scene=new THREE.Scene();scene.fog=new THREE.FogExp2(0x020611,.026);const camera=new THREE.PerspectiveCamera(50,innerWidth/innerHeight,.1,300);camera.position.set(19,10,22);const controls=new OrbitControls(camera,renderer.domElement);controls.enableDamping=true;controls.minDistance=10;controls.maxDistance=42;controls.maxPolarAngle=Math.PI*.52;controls.target.set(0,2.5,0);const composer=new EffectComposer(renderer);composer.addPass(new RenderPass(scene,camera));composer.addPass(new UnrealBloomPass(new THREE.Vector2(innerWidth,innerHeight),1.05,.55,.72));scene.add(new THREE.AmbientLight(0x2b4c6e,1.15));const light=new THREE.PointLight(0x62e7ff,45,34);light.position.set(0,11,0);scene.add(light);
const neon=(c,o=.82)=>new THREE.MeshStandardMaterial({color:c,emissive:c,emissiveIntensity:1.7,transparent:true,opacity:o,roughness:.28,metalness:.25});const interact=[],roots={},streams=[];
function tex(title,c){const cv=document.createElement('canvas');cv.width=1024;cv.height=576;const x=cv.getContext('2d');x.fillStyle='rgba(2,8,20,.95)';x.fillRect(0,0,1024,576);x.fillStyle=c;x.fillRect(0,0,1024,8);x.font='700 36px Arial';x.fillStyle='#eefaff';x.fillText(title,40,60);x.font='600 21px monospace';[['NODE STATUS','ONLINE'],['QUERY PIPELINE','ACTIVE'],['RECORD HASH','VERIFIED'],['ACCESS MODE','READ ONLY']].forEach((r,i)=>{x.fillStyle=i%2?c:'#9d6cff';x.fillText(r[0],50,130+i*78);x.fillStyle='#68ffbd';x.fillText(r[1],760,130+i*78)});return new THREE.CanvasTexture(cv)}
function holo(id,label,pos,color){const g=new THREE.Group();g.position.copy(pos);g.userData.system=id;const base=new THREE.Mesh(new THREE.CylinderGeometry(2.1,2.5,.45,48),new THREE.MeshStandardMaterial({color:0x071425,metalness:.8,roughness:.25}));base.position.y=.25;g.add(base);const ring=new THREE.Mesh(new THREE.TorusGeometry(1.8,.05,12,80),neon(color));ring.rotation.x=Math.PI/2;ring.position.y=.56;g.add(ring);const tower=new THREE.Mesh(new THREE.BoxGeometry(2.5,3.5,2.2),new THREE.MeshStandardMaterial({color:0x07131f,metalness:.65,roughness:.22,emissive:color,emissiveIntensity:.16}));tower.position.y=2.3;g.add(tower);for(let y=1.05;y<3.7;y+=.48){const led=new THREE.Mesh(new THREE.BoxGeometry(1.8,.05,.05),neon(color));led.position.set(0,y,1.13);g.add(led)}const scr=new THREE.Mesh(new THREE.PlaneGeometry(4.7,2.65),new THREE.MeshBasicMaterial({map:tex(label,'#'+color.toString(16).padStart(6,'0')),transparent:true,opacity:.93,side:THREE.DoubleSide}));scr.position.set(0,5.5,0);scr.rotation.y=-.12;g.add(scr);const beam=new THREE.Mesh(new THREE.CylinderGeometry(.25,1.35,4.6,32,1,true),new THREE.MeshBasicMaterial({color,transparent:true,opacity:.07,side:THREE.DoubleSide}));beam.position.y=3.1;g.add(beam);g.traverse(o=>{if(o.isMesh){o.userData.system=id;interact.push(o)}});scene.add(g);roots[id]=g;return g}
const floor=new THREE.Mesh(new THREE.CircleGeometry(19,96),new THREE.MeshStandardMaterial({color:0x020914,metalness:.75,roughness:.42}));floor.rotation.x=-Math.PI/2;scene.add(floor);const grid=new THREE.GridHelper(38,38,0x296b8f,0x12334a);grid.material.transparent=true;grid.material.opacity=.34;grid.position.y=.02;scene.add(grid);
const systems=[['mes','MES',new THREE.Vector3(-8,0,-3),0x4f7cff],['lims','LIMS',new THREE.Vector3(0,0,-7),0x62e7ff],['qms','QMS',new THREE.Vector3(8,0,-3),0x9d6cff],['cmms','CMMS',new THREE.Vector3(6,0,6),0x68ffbd],['audit','AUDIT',new THREE.Vector3(-6,0,6),0x4de0c0]];systems.forEach(s=>holo(...s));const core=new THREE.Group(),orb=new THREE.Mesh(new THREE.IcosahedronGeometry(2.25,4),new THREE.MeshStandardMaterial({color:0x8bdfff,wireframe:true,emissive:0x4f7cff,emissiveIntensity:1.6,transparent:true,opacity:.8}));orb.position.y=5;core.add(orb);core.userData.system='overview';core.traverse(o=>{if(o.isMesh){o.userData.system='overview';interact.push(o)}});scene.add(core);roots.overview=core;
const pg=new THREE.BufferGeometry(),pc=1200,pa=new Float32Array(pc*3);for(let i=0;i<pc;i++){const r=12+Math.random()*35,a=Math.random()*Math.PI*2;pa[i*3]=Math.cos(a)*r;pa[i*3+1]=Math.random()*22-2;pa[i*3+2]=Math.sin(a)*r}pg.setAttribute('position',new THREE.BufferAttribute(pa,3));const particles=new THREE.Points(pg,new THREE.PointsMaterial({color:0x62e7ff,size:.045,transparent:true,opacity:.62}));scene.add(particles);
systems.forEach((s,si)=>{const st=new THREE.Vector3(0,5,0),en=s[2].clone().add(new THREE.Vector3(0,4,0)),curve=new THREE.CatmullRomCurve3([st,st.clone().lerp(en,.35).add(new THREE.Vector3(0,2.5,0)),st.clone().lerp(en,.7).add(new THREE.Vector3(0,1.2,0)),en]);scene.add(new THREE.Mesh(new THREE.TubeGeometry(curve,64,.025,8,false),new THREE.MeshBasicMaterial({color:s[3],transparent:true,opacity:.25})));const packets=[];for(let p=0;p<5;p++){const q=new THREE.Mesh(new THREE.SphereGeometry(.08,12,12),neon(s[3]));q.userData.o=p/5;scene.add(q);packets.push(q)}streams.push({curve,packets})});
function update(id){const d=data[id];kicker.textContent=d[0];title.textContent=d[1];copy.textContent=d[2];scene.textContent=d[1].toUpperCase();metrics.innerHTML=d[3].map(m=>`<div class="metric"><span>${m[0]}</span><strong>${m[1]}</strong></div>`).join('');lines.innerHTML=d[4].map(l=>`<div class="line"><i></i><span>${l[0]}</span><em>${l[1]}</em></div>`).join('');panel.classList.remove('hidden');document.querySelectorAll('nav button').forEach(b=>b.classList.toggle('active',b.dataset.id===id))}
document.querySelectorAll('nav button').forEach(b=>b.onclick=()=>{update(b.dataset.id);const r=roots[b.dataset.id];if(r)controls.target.lerp(r.position.clone().add(new THREE.Vector3(0,3,0)),.45)});close.onclick=()=>panel.classList.add('hidden');const ray=new THREE.Raycaster(),pointer=new THREE.Vector2();addEventListener('pointermove',e=>{pointer.x=e.clientX/innerWidth*2-1;pointer.y=-(e.clientY/innerHeight)*2+1;ray.setFromCamera(pointer,camera);document.body.style.cursor=ray.intersectObjects(interact,false)[0]?'pointer':'default'});addEventListener('click',e=>{if(e.target.closest('.hud')&&!e.target.matches('#c'))return;ray.setFromCamera(pointer,camera);const id=ray.intersectObjects(interact,false)[0]?.object?.userData?.system;if(id)update(id)});const clock=new THREE.Clock();function animate(){requestAnimationFrame(animate);const t=clock.getElapsedTime();controls.update();particles.rotation.y=t*.006;orb.rotation.y=t*.24;orb.rotation.x=Math.sin(t*.45)*.18;Object.entries(roots).forEach(([id,r],i)=>{if(id!=='overview'){r.position.y=Math.sin(t*.8+i)*.08;r.rotation.y=Math.sin(t*.22+i)*.025}});streams.forEach((s,si)=>s.packets.forEach((p,pi)=>p.position.copy(s.curve.getPoint((t*.12+p.userData.o+si*.07)%1))));rate.textContent=`${(2.5+Math.sin(t)*.45).toFixed(1)}K rec/s`;composer.render()}update('overview');animate();addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);composer.setSize(innerWidth,innerHeight)});


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


function databaseMarkup() {
  const tableCount = databaseCatalog.tables.reduce((total, domain) => total + domain[1].length, 0);
  return `
    <header class="modal-hero">
      <small>POSTGRESQL DATABASE BROWSER</small>
      <h2 id="modal-title">Created Tables &amp; SQL Analysis Library</h2>
      <p>Browse the normalized enterprise schema and review the SQL queries executed against the pharmaceutical dataset.</p>
    </header>
    <section class="project-metrics">
      <article class="project-metric"><span>CREATED TABLES</span><strong>${tableCount}</strong></article>
      <article class="project-metric"><span>SQL ANALYSES</span><strong>${databaseCatalog.queries.length}</strong></article>
      <article class="project-metric"><span>DATABASE</span><strong>PostgreSQL</strong></article>
      <article class="project-metric"><span>SCHEMA</span><strong>pharma_enterprise</strong></article>
    </section>
    <div class="database-toolbar">
      <button class="db-tab active" type="button" data-db-tab="tables">Created Tables</button>
      <button class="db-tab" type="button" data-db-tab="queries">SQL Queries Ran</button>
      <label class="db-search"><span>Search</span><input id="database-search" type="search" placeholder="Search tables or queries"></label>
    </div>
    <section id="database-tables" class="database-view active">
      ${databaseCatalog.tables.map(domain => `
        <article class="catalog-domain" data-search-item="${domain[0]} ${domain[1].map(table => table.join(' ')).join(' ')}">
          <header><h3>${domain[0]}</h3><span>${domain[1].length} tables</span></header>
          <div class="table-catalog">
            ${domain[1].map(table => `<div class="catalog-table"><code>${table[0]}</code><p>${table[1]}</p></div>`).join('')}
          </div>
        </article>`).join('')}
    </section>
    <section id="database-queries" class="database-view">
      <div class="query-library">
        ${databaseCatalog.queries.map((query, index) => `
          <article class="query-card" data-search-item="${query.title} ${query.purpose} ${query.sql}">
            <header><span>QUERY ${String(index + 1).padStart(2, '0')}</span><h3>${query.title}</h3></header>
            <p>${query.purpose}</p>
            <pre><code>${query.sql.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')}</code></pre>
            <button type="button" class="copy-query" data-copy-query="${query.id}">Copy SQL</button>
          </article>`).join('')}
      </div>
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
    views[activeTab].querySelectorAll('[data-search-item]').forEach(item => {
      item.hidden = term && !item.dataset.searchItem.toLowerCase().includes(term);
    });
  };

  tabs.forEach(tab => tab.addEventListener('click', () => {
    activeTab = tab.dataset.dbTab;
    tabs.forEach(item => item.classList.toggle('active', item === tab));
    Object.entries(views).forEach(([name, view]) => view.classList.toggle('active', name === activeTab));
    search.value = '';
    filter();
  }));
  search.addEventListener('input', filter);

  modalContent.querySelectorAll('[data-copy-query]').forEach(button => {
    button.addEventListener('click', async () => {
      const query = databaseCatalog.queries.find(item => item.id === button.dataset.copyQuery);
      try {
        await navigator.clipboard.writeText(query.sql);
        button.textContent = 'SQL Copied';
        setTimeout(() => { button.textContent = 'Copy SQL'; }, 1400);
      } catch {
        button.textContent = 'Select SQL Above';
      }
    });
  });
}

function openDetailModal(type) {
  modalContent.innerHTML = type === 'architecture' ? architectureMarkup() : type === 'database' ? databaseMarkup() : projectMarkup();
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  controls.enabled = false;
  if (type === 'database') activateDatabaseViewer();
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
