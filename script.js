const form = document.querySelector('.modal-form');
const submitBtn = document.querySelector('.modal-submit');
const formWrap = document.getElementById('modalFormWrap');

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function setLoading(loading) {
  submitBtn.disabled = loading;
  submitBtn.style.opacity = loading ? '0.5' : '';
  submitBtn.style.cursor = loading ? 'not-allowed' : '';
}

form?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('wlName').value.trim();
  const email = document.getElementById('wlEmail').value.trim();
  const phone = document.getElementById('wlPhone').value.trim();

  if (!name || !email || !phone) {
    return;
  }

  if (!validateEmail(email)) {
    return;
  }

  setLoading(true);

  try {
    const res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'Something went wrong.');
    }

    formWrap.classList.add('hide');
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
});
