function initializeCopyButtons() {
  const codeBlocks = document.querySelectorAll('pre:has(code), pre');

  codeBlocks.forEach((pre) => {
    // Remove any old/stale buttons or containers
    pre.querySelectorAll('.copy-cnt, .copy-btn').forEach((el) => el.remove());

    pre.classList.add('relative');

    const btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.setAttribute('type', 'button');
    btn.setAttribute('aria-label', 'Copy code to clipboard');

    const copyIcon = `
      <svg class="copy-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
      </svg>
    `;

    const checkIcon = `
      <svg class="check-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    `;

    btn.innerHTML = `${copyIcon}<span class="copy-text">Copy</span>`;

    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      const code = pre.querySelector('code');
      const textToCopy = (code ? code.innerText : pre.innerText).trimEnd();

      try {
        await navigator.clipboard.writeText(textToCopy);
        btn.classList.add('copied');
        btn.innerHTML = `${checkIcon}<span class="copy-text">Copied</span>`;

        setTimeout(() => {
          btn.classList.remove('copied');
          btn.innerHTML = `${copyIcon}<span class="copy-text">Copy</span>`;
        }, 2000);
      } catch (err) {
        console.error('Failed to copy code: ', err);
      }
    });

    pre.appendChild(btn);
  });
}

document.addEventListener('DOMContentLoaded', initializeCopyButtons);
document.addEventListener('astro:after-swap', initializeCopyButtons);
document.addEventListener('astro:page-load', initializeCopyButtons);
initializeCopyButtons();
