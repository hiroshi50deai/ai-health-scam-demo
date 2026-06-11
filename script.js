const checklistButtons = document.querySelectorAll('.checklist button');
const checkCount = document.getElementById('checkCount');
const copyButton = document.getElementById('copyButton');
const copyStatus = document.getElementById('copyStatus');
const shareText = document.getElementById('shareText');

function updateCount() {
  const count = document.querySelectorAll('.checklist button.checked').length;
  checkCount.textContent = `${count}個チェックされています。`;
  if (count >= 3) {
    checkCount.textContent += ' すぐ買わず、家族や専門家に相談してください。';
  }
}

checklistButtons.forEach((button) => {
  button.addEventListener('click', () => {
    button.classList.toggle('checked');
    updateCount();
  });
});

copyButton?.addEventListener('click', async () => {
  const text = shareText?.innerText || '';
  try {
    await navigator.clipboard.writeText(text);
    copyStatus.textContent = 'コピーしました。X投稿欄に貼り付けできます。';
  } catch (error) {
    copyStatus.textContent = 'コピーできませんでした。本文を選択してコピーしてください。';
  }
});
