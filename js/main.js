(function(){
  var root=document.documentElement,btn=document.getElementById('tema');
  btn.addEventListener('click',function(){
    var n=root.getAttribute('data-theme')==='dark'?'light':'dark';
    root.setAttribute('data-theme',n);
    try{localStorage.setItem('padoca-tema',n)}catch(e){}
  });
  var trilho=document.getElementById('cards');
  if(trilho){
    var ant=document.querySelector('.seta.ant'),prox=document.querySelector('.seta.prox');
    var atualiza=function(){
      var max=trilho.scrollWidth-trilho.clientWidth-2;
      ant.disabled=trilho.scrollLeft<=2;
      prox.disabled=trilho.scrollLeft>=max;
    };
    var passo=function(){var c=trilho.querySelector('.card');return c?c.getBoundingClientRect().width+18:240};
    ant.addEventListener('click',function(){trilho.scrollBy({left:-passo()*2,behavior:'smooth'})});
    prox.addEventListener('click',function(){trilho.scrollBy({left:passo()*2,behavior:'smooth'})});
    trilho.addEventListener('scroll',atualiza,{passive:true});
    window.addEventListener('resize',atualiza);
    atualiza();
  }
  var st=document.getElementById('status'),stTxt=document.getElementById('status-txt');
  if(st&&stTxt){
    var agora=function(){
      try{
        var p=new Intl.DateTimeFormat('en-US',{timeZone:'America/Campo_Grande',weekday:'short',hour:'2-digit',minute:'2-digit',hour12:false}).formatToParts(new Date()),o={};
        p.forEach(function(x){o[x.type]=x.value});
        var m=(parseInt(o.hour,10)%24)*60+parseInt(o.minute,10),dom=o.weekday==='Sun';
        var abre=330,fecha=dom?720:1200,aberto=m>=abre&&m<fecha;
        st.classList.toggle('fechado',!aberto);
        stTxt.textContent=aberto?'Aberto agora · fecha às '+(dom?'12h':'20h'):'Fechado agora · abre às 5h30';
        st.hidden=false;
      }catch(e){st.hidden=true}
    };
    agora();setInterval(agora,60000);
  }
  var links=[].slice.call(document.querySelectorAll('.nav ul a'));
  var secoes=['produtos','destaque','momentos','encomendas','avaliacoes','visite'].map(function(id){return document.getElementById(id)}).filter(Boolean);
  var marca=function(){
    var h=document.querySelector('header').offsetHeight+60,atual='topo';
    secoes.forEach(function(s){if(s.getBoundingClientRect().top<=h)atual=s.id});
    if(window.innerHeight+window.scrollY>=document.documentElement.scrollHeight-4)atual='visite';
    links.forEach(function(a){
      var on=a.getAttribute('href')==='#'+atual;
      a.classList.toggle('ativo',on);
      if(on)a.setAttribute('aria-current','true');else a.removeAttribute('aria-current');
    });
  };
  window.addEventListener('scroll',marca,{passive:true});
  window.addEventListener('resize',marca);
  marca();
  var els=[].slice.call(document.querySelectorAll('.rev'));
  if(!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('on')});return}
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('on');io.unobserve(e.target)}})},{threshold:.12});
  els.forEach(function(e,i){e.style.transitionDelay=(i%3)*80+'ms';io.observe(e)});
})();
