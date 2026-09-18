document.addEventListener('DOMContentLoaded', () => {
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const scenes = [...document.querySelectorAll('.scene')];
  const toggle = document.getElementById('motion-toggle');
  const next = document.getElementById('scene-next');
  const labels = ['01 / SEA FREIGHT', '02 / AIR FREIGHT', '03 / ROAD DELIVERY'];
  let position = 0, paused = motion.matches, timer;
  const advance = () => {
    scenes[position].classList.remove('active');
    position = (position + 1) % scenes.length;
    scenes[position].classList.add('active');
    document.getElementById('scene-label').textContent = labels[position];
  };
  const schedule = () => {
    clearInterval(timer);
    document.body.classList.toggle('motion-paused', paused);
    if (toggle) { toggle.textContent = paused ? 'Play motion' : 'Pause motion'; toggle.setAttribute('aria-pressed', String(paused)); }
    if (scenes.length && !paused && !document.hidden) timer = setInterval(advance, 7000);
  };
  if (scenes.length) {
    toggle.addEventListener('click', () => { paused = !paused; schedule(); });
    next.addEventListener('click', () => { advance(); schedule(); });
    motion.addEventListener('change', () => { paused = motion.matches; schedule(); });
    document.addEventListener('visibilitychange', schedule);
    schedule();
  }
  const services = [
    ['Sea Freight','container-ship.webp','Container ship at sea','Big possibilities. Carefully coordinated.','Container shipping and cargo handling through Ghana’s major ports, with guidance from origin to arrival.'],
    ['Air Freight','cargo-plane.webp','Cargo aircraft','When your cargo cannot wait.','Discuss air freight options for urgent or high-value shipments, with support for cargo preparation and onward delivery.'],
    ['Customs Clearance','port.webp','Shipping port','Clarity at every checkpoint.','Get guidance on documentation and cargo clearance through Ghana’s ports. Speak to our team about your shipment requirements.'],
    ['Door-to-Door Delivery','truck.webp','Freight truck','The final mile matters.','Coordinate onward transport from the port or warehouse to your destination in Ghana. Share your location and cargo details to get started.']
  ];
  const tabs = [...document.querySelectorAll('[data-service]')];
  function selectService(index, focus = false) {
    tabs.forEach((tab, i) => { tab.setAttribute('aria-selected', String(i === index)); tab.tabIndex = i === index ? 0 : -1; });
    const [name, image, alt, title, description] = services[index];
    const panel = document.getElementById('service-panel');
    panel.setAttribute('aria-labelledby', tabs[index].id);
    const img = document.getElementById('service-image'); img.src = 'images/' + image; img.alt = alt;
    document.getElementById('service-tag').textContent = name.toUpperCase();
    document.getElementById('service-title').textContent = title;
    document.getElementById('service-description').textContent = description;
    const link = document.getElementById('service-quote'); link.href = 'quote.html?service=' + encodeURIComponent(name); link.textContent = 'Request a ' + name.toLowerCase() + ' quote ↗';
    if (focus) tabs[index].focus();
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectService(index));
    tab.addEventListener('keydown', event => {
      let target;
      if (event.key === 'ArrowRight') target = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') target = (index + tabs.length - 1) % tabs.length;
      if (event.key === 'Home') target = 0;
      if (event.key === 'End') target = tabs.length - 1;
      if (target !== undefined) { event.preventDefault(); selectService(target, true); }
    });
  });
  const serviceSelect = document.querySelector('select[name="service"]');
  if (serviceSelect) {
    const requested = new URLSearchParams(location.search).get('service');
    if ([...serviceSelect.options].some(option => option.value === requested)) serviceSelect.value = requested;
    const hints = {
      'Sea Freight': 'Include your origin port, container size or cargo volume, and expected shipping date.',
      'Air Freight': 'Include the cargo weight, dimensions, origin airport and required arrival date.',
      'Customs Clearance': 'Include the port, cargo description and available shipping documents. Do not include sensitive document numbers here.',
      'Door-to-Door Delivery': 'Include collection and delivery locations, cargo dimensions and preferred delivery date.',
      'Warehousing': 'Include the type and volume of goods, storage duration and any special handling needs.',
      'Vehicle Import Support': 'Include the vehicle type, origin and expected arrival port.',
      'Import & Export Consultancy': 'Tell us what you plan to import or export and where you need guidance.'
    };
    const update = () => { const help = document.getElementById('service-help'); if (help) help.textContent = hints[serviceSelect.value] || 'Select a service for guidance on the details to include.'; };
    serviceSelect.addEventListener('change', update); update();
  }
});
