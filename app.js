const panel = document.querySelector('#detail');
const grid = document.querySelector('#interest-grid');
const cards = [];
let active;
function element(tag, className, text) {
  const node = document.createElement(tag);
  node.className = className;
  if (text) node.textContent = text;
  return node;
}
function closePanel() {
  panel.hidden = true;
  cards.forEach(card => card.setAttribute('aria-expanded', 'false'));
  active?.focus({preventScroll:true});
}
(window.portfolioInterests || []).forEach((item, index) => {
  const card = element('button', 'object ' + item.id);
  card.type = 'button';
  card.style.setProperty('--accent', item.accent || '137,238,98');
  card.setAttribute('aria-expanded', 'false');
  card.setAttribute('aria-controls', 'detail');
  const visual = element('span', 'visual');
  const floating = element('span', 'float');
  floating.style.animationDelay = (index * -2) + 's';
  const sprite = element('span', 'sprite');
  sprite.setAttribute('role', 'img');
  sprite.setAttribute('aria-label', item.alt || item.name);
  if (item.image) {
    sprite.style.backgroundImage = 'url("' + item.image + '")';
    sprite.style.backgroundSize = 'contain';
    sprite.style.backgroundPosition = 'center';
  } else sprite.style.backgroundPosition = (item.spritePosition || '0%') + ' 50%';
  floating.append(sprite);
  visual.append(element('span', 'halo'), floating);
  const caption = element('span', 'caption');
  const title = element('span', 'title', item.name);
  const arrow = element('span', '', '↗');
  arrow.setAttribute('aria-hidden', 'true');
  title.append(arrow);
  caption.append(title);
  card.append(visual, caption);
  cards.push(card);
  grid.append(card);
  card.addEventListener('pointermove', event => {
    if (event.pointerType !== 'mouse') return;
    const box = card.getBoundingClientRect();
    card.style.setProperty('--ry', (((event.clientX-box.left)/box.width-.5)*18) + 'deg');
    card.style.setProperty('--rx', (-((event.clientY-box.top)/box.height-.5)*12) + 'deg');
  });
  card.addEventListener('pointerleave', () => {
    card.style.setProperty('--ry','0deg');
    card.style.setProperty('--rx','0deg');
  });
  card.addEventListener('click', () => {
    if (card.getAttribute('aria-expanded') === 'true') return closePanel();
    active = card;
    cards.forEach(other => other.setAttribute('aria-expanded', String(other === card)));
    document.querySelector('#detail-title').textContent = item.title;
    document.querySelector('#detail-copy').textContent = item.copy;
    const link = document.querySelector('#detail-link');
    link.href = item.url;
    link.textContent = item.link + ' ↗';
    panel.hidden = false;
    panel.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'nearest'});
    document.querySelector('.close').focus({preventScroll:true});
  });
});
document.querySelector('.close').addEventListener('click', closePanel);
document.addEventListener('keydown', event => {
  if(event.key === 'Escape' && !panel.hidden) closePanel();
});

// Keep a stable accessible heading while the visual text types and erases.
const typedText = document.querySelector('#typed-text');
const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
const phrase = 'Just breathe.';
let typingTimer;
let character = 0;
let erasing = false;
function typeNext() {
  if (motionPreference.matches) return;
  character += erasing ? -1 : 1;
  typedText.textContent = phrase.slice(0, character);
  let delay = erasing ? 65 : 125;
  if (character === phrase.length) { erasing = true; delay = 3200; }
  else if (character === 0) { erasing = false; delay = 650; }
  typingTimer = setTimeout(typeNext, delay);
}
function updateTyping() {
  clearTimeout(typingTimer);
  typedText.textContent = phrase;
  if (!motionPreference.matches) {
    character = 0;
    erasing = false;
    typedText.textContent = '';
    typingTimer = setTimeout(typeNext, 400);
  }
}
motionPreference.addEventListener('change', updateTyping);
updateTyping();
