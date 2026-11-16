(() => {
  'use strict';
  // Navegación responsive para las tres demostraciones.
  document.querySelectorAll('[data-menu]').forEach(button => {
    const nav = document.getElementById(button.dataset.menu);
    if (!nav) return;
    button.addEventListener('click', () => {
      const open = button.getAttribute('aria-expanded') !== 'true';
      button.setAttribute('aria-expanded', String(open));
      button.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
      nav.classList.toggle('open', open);
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      nav.classList.remove('open');
      button.setAttribute('aria-expanded', 'false');
      button.setAttribute('aria-label', 'Abrir menú');
    }));
  });

  // Clínica: demostración explícita. No hay reserva real ni recolección de datos.
  const appointmentButton = document.getElementById('clinic-appointment-btn');
  const clinicAlert = document.getElementById('clinic-alert');
  appointmentButton?.addEventListener('click', () => {
    clinicAlert?.classList.toggle('show');
    appointmentButton.textContent = clinicAlert?.classList.contains('show') ? 'Ocultar explicación ↑' : 'Ver demostración de agendado ↗';
  });

  // Forma: detalles de proyectos conceptuales en modal accesible.
  const modal = document.getElementById('project-modal');
  const projects = {
    'casa-luz': {title:'Casa Luz', image:'../assets/architecture-scene.svg', description:'Volúmenes limpios, materiales honestos y una relación natural entre interiores y exteriores. Estudio conceptual de vivienda contemporánea con luz como protagonista.'},
    'patio-sur': {title:'Patio Sur', image:'../assets/architecture-interior.svg', description:'Interiores íntimos, texturas cálidas y espacios que invitan a quedarse. Una exploración de luz y materialidad en un entorno doméstico.'},
    'habitar': {title:'Habitar', image:'../assets/architecture-scene.svg', description:'Una propuesta espacial centrada en la proporción, las circulaciones y el encuentro. Composición conceptual que ilustra un posible proyecto editorial.'},
  };
  document.querySelectorAll('[data-project]').forEach(button => {
    button.addEventListener('click', () => {
      const p = projects[button.dataset.project];
      if (!p || !modal) return;
      document.getElementById('project-modal-title').textContent = p.title;
      document.getElementById('project-modal-img').src = p.image;
      document.getElementById('project-modal-description').textContent = p.description;
      modal.showModal();
    });
  });
  document.getElementById('project-modal-close')?.addEventListener('click', () => modal?.close());
  modal?.addEventListener('click', ev => { if (ev.target === modal) modal.close(); });

  // Nexo: datos locales simulados; no consulta APIs ni utiliza datos personales.
  if (!document.getElementById('nexo-chart')) return;
  const money = n => '$' + Math.round(n).toLocaleString('es-MX');
  const fakeData = Array.from({length:90}, (_, idx) => {
    const cycle = Math.sin(idx * .47) * 1250 + Math.cos(idx*.21) * 730;
    const revenue = Math.round(4100 + cycle + idx*13 + ((idx*47)%830));
    const expense = Math.round(revenue * (.40 + ((idx*7)%17)/100));
    const sales = 3 + (idx*11)%7;
    const operations = sales + 2 + (idx*5)%6;
    return {revenue, expense, sales, operations, idx};
  });

  function setText(id, value) { const el=document.getElementById(id); if(el) el.textContent=value; }
  function renderChart(rows) {
    const chart = document.getElementById('nexo-chart');
    const grid = document.getElementById('nexo-chart-grid');
    const yMax = Math.max(...rows.map(row => row.revenue)) * 1.18;
    const x = i => 22 + (i/(rows.length-1))*600;
    const y = n => 198 - (n/yMax)*174;
    const commands = rows.map((row,i) => `${i===0?'M':'L'}${x(i).toFixed(1)},${y(row.revenue).toFixed(1)}`).join(' ');
    document.getElementById('nexo-chart-line').setAttribute('d', commands);
    document.getElementById('nexo-chart-area').setAttribute('d',commands+` L622,198 L22,198 Z`);
    grid.replaceChildren();
    for(let i=0;i<4;i++){
      const yCoord=26+i*57;
      const line=document.createElementNS('http://www.w3.org/2000/svg','line');
      line.setAttribute('x1','22');line.setAttribute('x2','622');line.setAttribute('y1',String(yCoord));line.setAttribute('y2',String(yCoord));line.setAttribute('class','grid');grid.appendChild(line);
    }
    chart.setAttribute('aria-label',`Gráfica simulada de ingresos durante ${rows.length} días: monto menor ${money(Math.min(...rows.map(x=>x.revenue)))}; mayor ${money(Math.max(...rows.map(x=>x.revenue)))}`);
  }
  function renderTable(rows) {
    const tbody=document.getElementById('nexo-table-body');
    tbody.replaceChildren();
    const concepts=['Servicio mensual','Proyecto digital','Consultoría','Automatización','Licencia de servicio'];
    [...rows].reverse().slice(0,5).forEach((r,i) => {
      const tr=document.createElement('tr');
      const cells=[`NX-${String(9000+r.idx).padStart(5,'0')}`,concepts[r.idx%concepts.length],`Hace ${i+1} día${i===0?'':'s'}`,'Completado',money(r.revenue)];
      cells.forEach((value,j)=>{const td=document.createElement('td'); if(j===3){const span=document.createElement('span');span.className='status';span.textContent=value;td.appendChild(span);}else td.textContent=value;tr.appendChild(td);});
      tbody.appendChild(tr);
    });
  }
  function update(days){
    const rows=fakeData.slice(-days);
    const sum=k=>rows.reduce((n,item)=>n+item[k],0);
    const income=sum('revenue'),expense=sum('expense');
    setText('kpi-revenue',money(income));setText('kpi-expenses',money(expense));setText('kpi-profit',money(income-expense));setText('kpi-sales',sum('sales').toLocaleString('es-MX'));setText('kpi-operations',sum('operations').toLocaleString('es-MX'));
    renderChart(rows);renderTable(rows);
    const ratios=[.49 + days/900,.28,.23-days/900];
    const p1=Math.round(ratios[0]*100),p2=Math.round(ratios[1]*100),p3=100-p1-p2;
    const ring=document.getElementById('nexo-ring');
    ring.style.background=`conic-gradient(#66d9c7 0 ${p1}%,#437fba ${p1}% ${p1+p2}%,#e2ae65 ${p1+p2}% 100%)`;
    setText('nexo-ring-center','100%');
    const legend=document.getElementById('nexo-legend');legend.replaceChildren();
    [['Servicios',p1,'#66d9c7'],['Proyectos',p2,'#437fba'],['Consultoría',p3,'#e2ae65']].forEach(([name,pct,color])=>{
      const span=document.createElement('span'),b=document.createElement('b'),v=document.createElement('b'),icon=document.createElement('i');icon.style.background=color;b.append(icon,document.createTextNode(name));v.textContent=pct+'%';span.append(b,v);legend.appendChild(span);
    });
    document.querySelectorAll('[data-period]').forEach(button=>button.setAttribute('aria-pressed',String(Number(button.dataset.period)===days)));
  }
  document.querySelectorAll('[data-period]').forEach(button=>button.addEventListener('click',()=>update(Number(button.dataset.period))));
  update(30);
})();
