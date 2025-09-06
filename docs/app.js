
async function load(){
  const res = await fetch('cases.json'); const data = await res.json();
  const items = data.items||[]; const grid = document.getElementById('grid'); const q = document.getElementById('q');
  function render(keyword=''){
    grid.innerHTML=''; const kw = keyword.toLowerCase();
    items.filter(x=> JSON.stringify(x).toLowerCase().includes(kw)).forEach(x=>{
      const c = document.createElement('div'); c.className='card';
      const img = (x.images && x.images[1]) ? '../'+x.images[1].src : '';
      c.innerHTML = `<img src="${img}" alt="preview"><h3>${x.title}</h3>`;
      grid.appendChild(c);
    });
  }
  q.addEventListener('input', e=>render(e.target.value)); render();
}
load();
