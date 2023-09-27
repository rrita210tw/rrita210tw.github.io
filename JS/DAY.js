/*
We need JavaScript to calculate and set `animation-delay`,
and update labels from locale.
Once this is done, it's *all* CSS.
*/
function uiCountdown(node, locale = 'en-US') {
    const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
    const setDelay = (name, delay) => {
      node.style.setProperty(`--delay-${name}`, `${delay}s`);
    }
    const setLabel = (type) => {
      const parts = rtf.formatToParts(3, type)
       return parts.at(parts.length -1)?.value
    }
  
    const end = new Date(node.getAttribute('data-time')).getTime();
    const remaining = Date.now() - end ;
  
    const DAY = 86400;
    const HOUR = 3600;
  
    const seconds = Math.floor((remaining / 1000) % 60);
    const days = Math.floor(remaining / (DAY * 1000));
     const hours = Math.floor((remaining / (HOUR * 1000)) % 24);
    const minutes = Math.floor((remaining / (60 * 1000)) % 60);
  
    const SECONDS = -Math.abs(60 - seconds)
    const MINUTES = -Math.abs(HOUR - (minutes * 60) - (60 - 1) - SECONDS);
    const HOURS =  -Math.abs(DAY - (hours * HOUR) + MINUTES);
  
    [...node.children].forEach((child, index) => {
      child.textContent = setLabel(child.dataset.label)
    })
    
    setDelay('days', -Math.abs(31536000 - (days * DAY) + HOURS));
    setDelay('hours', HOURS);
    setDelay('minutes', MINUTES);
    setDelay('seconds', SECONDS);
  }
  
  /* Init, play with `locale`! */
  uiCountdown(document.querySelector('.ui-countdown'), 'en-US')