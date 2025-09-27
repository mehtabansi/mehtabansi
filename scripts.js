{\rtf1\ansi\ansicpg1252\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 // scripts.js\
// Runs after DOM is parsed (defer used in HTML)\
\
// Smooth-scrolling for internal anchors (native but fallback)\
document.addEventListener('click', function(e)\{\
  const a = e.target.closest('a[href^="#"]');\
  if(!a) return;\
  const href = a.getAttribute('href');\
  if(href.length === 1) return;\
  const target = document.querySelector(href);\
  if(target)\{\
    e.preventDefault();\
    target.scrollIntoView(\{ behavior: 'smooth', block: 'start' \});\
    // update focus for accessibility\
    target.setAttribute('tabindex', '-1');\
    window.setTimeout(()=> target.focus(), 600);\
  \}\
\});\
\
// IntersectionObserver for scroll-spy: highlight nav links\
(function()\{\
  const sections = document.querySelectorAll('section[data-section]');\
  const navLinks = document.querySelectorAll('.nav-link');\
\
  if('IntersectionObserver' in window)\{\
    const io = new IntersectionObserver((entries)=>\{\
      entries.forEach(entry=>\{\
        const id = entry.target.id;\
        const link = document.querySelector('.nav-link[href="#' + id + '"]');\
        if(entry.isIntersecting)\{\
          navLinks.forEach(l=> l.classList.remove('active'));\
          if(link) link.classList.add('active');\
        \}\
      \});\
    \}, \{ root: null, threshold: 0.45 \}); // 45% visible\
    sections.forEach(s => io.observe(s));\
  \} else \{\
    // fallback: simple scroll handler (throttled)\
    let timeout = null;\
    window.addEventListener('scroll', function()\{\
      if(timeout) return;\
      timeout = setTimeout(()=>\{\
        timeout = null;\
        let idx = 0;\
        sections.forEach((s,i)=>\{\
          const rect = s.getBoundingClientRect();\
          if(rect.top <= window.innerHeight * 0.4) idx = i;\
        \});\
        navLinks.forEach(l=> l.classList.remove('active'));\
        const current = sections[idx];\
        const link = document.querySelector('.nav-link[href="#' + current.id + '"]');\
        if(link) link.classList.add('active');\
      \}, 120);\
    \});\
  \}\
\})();\
\
// Companies track: pause animation on hover and handle reduced-motion\
(function()\{\
  const track = document.querySelector('[data-track]');\
  if(!track) return;\
  // If user prefers reduced motion, don't animate\
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;\
  if(prefersReduced)\{\
    track.style.animation = 'none';\
    return;\
  \}\
  // Pause on hover/focus\
  track.addEventListener('mouseenter', ()=> track.style.animationPlayState='paused');\
  track.addEventListener('mouseleave', ()=> track.style.animationPlayState='running');\
  track.addEventListener('focusin', ()=> track.style.animationPlayState='paused');\
  track.addEventListener('focusout', ()=> track.style.animationPlayState='running');\
\})();\
\
// small enhancement: keyboard accessible project-cards focus style\
document.querySelectorAll('.project-card').forEach(card=>\{\
  card.addEventListener('keydown', (e)=>\{\
    if(e.key === 'Enter')\{\
      const link = card.querySelector('.link');\
      if(link) link.click();\
    \}\
  \});\
\});}