// Advanced V4 interactions (vanilla + GSAP)
document.addEventListener('DOMContentLoaded', ()=> {
  const scene = document.getElementById('scene');
  const card = document.getElementById('card');
  const cursor = document.getElementById('cursor');
  const modal = document.getElementById('modal');
  const modalClose = document.getElementById('modalClose');

  // Magnetic cursor follow
  document.addEventListener('mousemove', (e)=> {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });

  // Parallax card response to mouse
  scene.addEventListener('mousemove', (e)=> {
    const rect = scene.getBoundingClientRect();
    const x = (e.clientX - rect.left) - rect.width/2;
    const y = (e.clientY - rect.top) - rect.height/2;
    const rotX = (-y / rect.height) * 12;
    const rotY = (x / rect.width) * 12;
    gsap.to(card, {rotationX: rotX, rotationY: rotY, duration: 0.6, transformPerspective:1200, ease:'power3.out'});
    gsap.to(card.querySelector('.edge-glow'), {x: rotY * 2, y: rotX * -2, duration:0.6});
  });

  scene.addEventListener('mouseleave', ()=> {
    gsap.to(card, {rotationX:0, rotationY:0, duration:0.8, ease:'power3.out'});
    gsap.to(card.querySelector('.edge-glow'), {x:0,y:0,duration:0.8});
  });

  // Magnetic buttons
  document.querySelectorAll('.magnetic').forEach(btn=>{
    btn.addEventListener('mousemove', (e)=>{
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width/2;
      const y = e.clientY - rect.top - rect.height/2;
      gsap.to(btn, {x: x*0.2, y: y*0.2, duration:0.25, ease:'power2.out'});
    });
    btn.addEventListener('mouseleave', ()=> gsap.to(btn, {x:0,y:0,duration:0.25,ease:'power2.out'}));
  });

  // Project tile click -> modal
  document.querySelectorAll('.project-tile').forEach(tile=>{
    tile.addEventListener('click', ()=>{
      const title = tile.dataset.title;
      const desc = tile.dataset.desc;
      const tech = tile.dataset.tech;
      document.getElementById('mTitle').innerText = title;
      document.getElementById('mDesc').innerText = desc;
      document.getElementById('mTech').innerText = tech;
      document.getElementById('mDemo').href = '#';
      modal.classList.add('open');
      gsap.from('.modal-card', {y:40, opacity:0, duration:0.5, ease:'power3.out'});
    });
  });

  modalClose.addEventListener('click', ()=> closeModal());
  modal.addEventListener('click', (e)=> { if(e.target === modal) closeModal(); });

  function closeModal(){
    modal.classList.remove('open');
  }

  // CTA actions
  document.querySelectorAll('[data-action]').forEach(el=>{
    el.addEventListener('click', (e)=>{
      const a = e.currentTarget.dataset.action;
      if(a === 'see-projects') document.getElementById('projects').scrollIntoView({behavior:'smooth'});
      if(a === 'contact') document.getElementById('contact').scrollIntoView({behavior:'smooth'});
    });
  });

  // Theme toggle
  const themeToggle = document.getElementById('themeToggle');
  themeToggle.addEventListener('click', ()=>{
    const html = document.documentElement;
    const isDark = html.classList.toggle('light-mode');
    themeToggle.textContent = isDark ? '🌙' : '☀️';
    // simple color flip - not full theme system but visual
  });

  // Entrance animations
  gsap.from('.hero-title', {y:20, opacity:0, duration:0.8, delay:0.2, ease:'power3.out'});
  gsap.from('.card-inner', {scale:0.96, opacity:0, duration:0.8, delay:0.25, ease:'power3.out'});

});
