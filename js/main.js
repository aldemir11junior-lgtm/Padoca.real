(function(){
  var root=document.documentElement,btn=document.getElementById('tema');
  btn.addEventListener('click',function(){
    var n=root.getAttribute('data-theme')==='dark'?'light':'dark';
    root.setAttribute('data-theme',n);
    try{localStorage.setItem('padoca-tema',n)}catch(e){}
  });
  var els=[].slice.call(document.querySelectorAll('.rev'));
  if(!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('on')});return}
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('on');io.unobserve(e.target)}})},{threshold:.12});
  els.forEach(function(e,i){e.style.transitionDelay=(i%3)*80+'ms';io.observe(e)});
})();
