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
        var dias={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6},d=dias[o.weekday],I=240,T=1080;
        var sem=document.getElementById('semana'),bt=[].slice.call(sem.querySelectorAll('button')),bar=sem.querySelector('.barra');
        if(sem.dataset.sel===undefined)sem.dataset.sel=d;
        var sd=+sem.dataset.sel,b=bt.filter(function(x){return +x.dataset.d===sd})[0],a=+b.dataset.a,f=+b.dataset.f;
        bt.forEach(function(x){x.classList.toggle('hoje',+x.dataset.d===d);x.classList.toggle('sel',x===b);x.setAttribute('aria-pressed',x===b)});
        bar.style.setProperty('--a',0);bar.style.setProperty('--f',100);
        var hj=sd===d,ab=m>=a&&m<f,falta=f-m;
        sem.classList.toggle('eh-hoje',hj);sem.classList.toggle('fechado',!ab);sem.classList.toggle('perto',ab&&falta<=60);
        bar.querySelector('.agora').style.left=Math.max(0,Math.min(100,(m-a)/(f-a)*100))+'%';
        bar.querySelector('.jan').style.setProperty('--p',(ab?(m-a)/(f-a)*100:0)+'%');
        document.getElementById('sel-dia').textContent=(hj?'Hoje · ':'')+b.dataset.n;
        document.getElementById('sel-hr').textContent=(hj&&ab&&falta<=60?'Fecha em '+falta+' min · ':'')+'5h30 às '+(f===720?'12h':'20h');
        if(!sem.dataset.ok){sem.dataset.ok=1;bt.forEach(function(x){x.addEventListener('click',function(){sem.dataset.sel=x.dataset.d;agora()})})}      }catch(e){st.hidden=true}
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
