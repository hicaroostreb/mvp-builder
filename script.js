const form = document.getElementById('waitlist-form');
const submitBtn = document.getElementById('submit-btn');
const btnText = document.querySelector('.btn-text');
const btnLoader = document.querySelector('.btn-loader');
const messageEl = document.getElementById('form-message');
const emailInput = document.getElementById('email');
const nameInput = document.getElementById('name');

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function setLoading(loading) {
  submitBtn.disabled = loading;
  btnText.classList.toggle('hidden', loading);
  btnLoader.classList.toggle('hidden', !loading);
}

function showMessage(text, type) {
  messageEl.textContent = text;
  messageEl.className = `message ${type}`;
  messageEl.classList.remove('hidden');
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  messageEl.classList.add('hidden');

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();

  if (!name) {
    showMessage('Please enter your name.', 'error');
    return;
  }

  if (!validateEmail(email)) {
    showMessage('Please enter a valid email address.', 'error');
    return;
  }

  setLoading(true);

  try {
    const res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'Something went wrong.');
    }

    showMessage("You're on the list! We'll be in touch soon.", 'success');
    form.reset();
  } catch (err) {
    showMessage(err.message || 'Failed to join. Please try again.', 'error');
  } finally {
    setLoading(false);
  }
});
