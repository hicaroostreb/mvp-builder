// ── GOOGLE APPS SCRIPT ENDPOINT ──
// Substitua pela URL gerada no Apps Script após o deploy
const API_URL = '/api/subscribe';

let currentPlan = '';

function openWaitlist(plan) {
  currentPlan = plan;
  document.getElementById('modalPlanBadge').textContent = '🎯 ' + plan;
  document.getElementById('modalOverlay').classList.add('open');
  document.getElementById('modalFormWrap').classList.remove('hide');
  document.getElementById('modalSuccess').classList.remove('show');
  document.getElementById('wlName').value = '';
  document.getElementById('wlEmail').value = '';
  document.getElementById('wlPhone').value = '';
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

function closeModalOutside(e) {
  if (e.target === document.getElementById('modalOverlay')) closeModal();
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

async function submitWaitlist() {
  const name  = document.getElementById('wlName').value.trim();
  const email = document.getElementById('wlEmail').value.trim();
  const phone = document.getElementById('wlPhone').value.trim();

  if (!name || !email || !phone) {
    [document.getElementById('wlName'), document.getElementById('wlEmail'), document.getElementById('wlPhone')]
      .forEach(el => { if (!el.value.trim()) el.style.borderColor = '#E53935'; });
    setTimeout(() => document.querySelectorAll('.modal-input').forEach(el => el.style.borderColor = ''), 2000);
    return;
  }

  const btn = document.getElementById('wlSubmit');
  const txt = document.getElementById('wlBtnText');
  const spinner = document.getElementById('wlSpinner');
  btn.disabled = true;
  txt.textContent = 'Enviando...';
  spinner.style.display = 'block';

  const payload = {
    name, email, phone,
    plan: currentPlan,
    timestamp: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
  };

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Request failed');
  } catch(err) {
    console.error('Fetch error:', err);
  }

  spinner.style.display = 'none';
  document.getElementById('modalFormWrap').classList.add('hide');
  document.getElementById('modalSuccess').classList.add('show');
}
