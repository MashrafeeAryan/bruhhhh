// Pointer tilt enhances the static links; navigation also works without JavaScript.
document.querySelectorAll('.object').forEach(card => {
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
});
const filters = document.querySelector('.filters');
if (filters) {
  filters.hidden = false;
  const buttons = [...filters.querySelectorAll('button')];
  const cases = [...document.querySelectorAll('.case-card')];
  buttons.forEach(button => button.addEventListener('click', () => {
    let count=0;
    buttons.forEach(other=>other.setAttribute('aria-pressed',String(button===other)));
    cases.forEach(card=>{
      card.hidden = button.dataset.filter !== 'all' && card.dataset.group !== button.dataset.filter;
      if(!card.hidden) count++;
    });
    document.querySelector('#filter-count').textContent = count + (count===1?' case study shown':' case studies shown');
  }));
}
// The accessible heading remains stable during visual typing.
const typedText = document.querySelector('#typed-text');
if (typedText) {
  const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
  const phrase = 'Just breathe.';
  let timer,character=0,erasing=false;
  function typeNext() {
    if(motionPreference.matches) return;
    character += erasing ? -1 : 1;
    typedText.textContent=phrase.slice(0,character);
    let delay=erasing?65:125;
    if(character===phrase.length){erasing=true;delay=3200;}
    else if(character===0){erasing=false;delay=650;}
    timer=setTimeout(typeNext,delay);
  }
  function updateTyping(){
    clearTimeout(timer);
    typedText.textContent=phrase;
    if(!motionPreference.matches){
      character=0;erasing=false;typedText.textContent='';
      timer=setTimeout(typeNext,400);
    }
  }
  motionPreference.addEventListener('change',updateTyping);
  updateTyping();
}
