const scrollButtons = document.querySelectorAll('[data-scroll-target]');
const checkItems = document.querySelectorAll('.check-item');
const checkedCount = document.getElementById('checkedCount');
const checkWarning = document.getElementById('checkWarning');
const copyButtons = document.querySelectorAll('[data-copy-target]');

scrollButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const targetSelector = button.getAttribute('data-scroll-target');
    const target = document.querySelector(targetSelector);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

function updateChecklist() {
  const count = document.querySelectorAll('.check-item.is-checked').length;
  if (checkedCount) {
    checkedCount.textContent = String(count);
  }
  if (checkWarning) {
    checkWarning.hidden = count < 3;
  }
}

checkItems.forEach((item) => {
  item.addEventListener('click', () => {
    const isPressed = item.getAttribute('aria-pressed') === 'true';
    item.setAttribute('aria-pressed', String(!isPressed));
    item.classList.toggle('is-checked', !isPressed);
    updateChecklist();
  });
});

copyButtons.forEach((button) => {
  button.addEventListener('click', async () => {
    const targetSelector = button.getAttribute('data-copy-target');
    const target = document.querySelector(targetSelector);
    const status = button.parentElement?.querySelector('.copy-status');
    const text = target?.innerText || '';

    try {
      await navigator.clipboard.writeText(text);
      if (status) {
        status.textContent = 'コピーしました。Xの投稿欄に貼り付けできます。';
      }
    } catch (error) {
      if (status) {
        status.textContent = 'コピーできませんでした。本文を選択してコピーしてください。';
      }
    }
  });
});

updateChecklist();
