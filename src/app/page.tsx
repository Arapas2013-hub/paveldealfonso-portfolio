'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

const EVENTOS = [
  { src: '/imgs/eventos-01.png',  label: 'Palomo × Zalando',    type: 'land' },
  { src: '/imgs/eventos-02.png',  label: 'Cena Issey Miyake',   type: 'port' },
  { src: '/imgs/eventos-03.png',  label: 'Drunk Elephant',      type: 'land' },
  { src: '/imgs/eventos-04.png',  label: 'Quick × Madrid',      type: 'sq'   },
  { src: '/imgs/eventos-05.png',  label: 'Yves Rocher',         type: 'port' },
  { src: '/imgs/eventos-06.png',  label: 'Palomo Garden',       type: 'land' },
  { src: '/imgs/eventos-07.png',  label: 'Suaji Studio',        type: 'sq'   },
  { src: '/imgs/eventos-08.png',  label: 'Mesa dulces',         type: 'land' },
  { src: '/imgs/eventos-09.png',  label: 'Catering',            type: 'port' },
  { src: '/imgs/eventos-10.png',  label: 'Evento Madrid',       type: 'land' },
  { src: '/imgs/eventos-11.png',  label: 'Producción 11',       type: 'sq'   },
  { src: '/imgs/eventos-12.png',  label: 'Producción 12',       type: 'land' },
  { src: '/imgs/eventos-13.png',  label: 'Producción 13',       type: 'port' },
  { src: '/imgs/eventos-14.png',  label: 'Producción 14',       type: 'land' },
  { src: '/imgs/eventos-15.png',  label: 'Producción 15',       type: 'sq'   },
  { src: '/imgs/eventos-16.png',  label: 'Evento 16',           type: 'land' },
  { src: '/imgs/eventos-17.png',  label: 'Evento 17',           type: 'port' },
]
const EXPOSICIONES = [
  { src: '/imgs/exposiciones-01.png', label: 'Tejido dorado',    type: 'port' },
  { src: '/imgs/exposiciones-02.png', label: 'Escultura de luz', type: 'land' },
  { src: '/imgs/exposiciones-03.png', label: 'Lámparas espiral', type: 'sq'   },
  { src: '/imgs/exposiciones-04.png', label: 'Maniquíes Fera',   type: 'port' },
]
const VIDEOS = [
  { src: 'https://res.cloudinary.com/dmyodciqo/video/upload/juan_avellaneda_presenta_su_nuevo_proyecto_en_colaboración_con_see_iou_v1_1080p_blqjyg', label: 'Juan Avellaneda × See Iou', type: 'land' },
  { src: 'https://res.cloudinary.com/dmyodciqo/video/upload/levis_presentó_en_el_invernadero_su_nueva_colección_de_primavera_v1_1080p_jlkcsn', label: "Levi's Invernadero", type: 'land' },
  { src: 'https://res.cloudinary.com/dmyodciqo/video/upload/VENTA._MADRID._La_casa_perfecta_en_la_zona_más_efervescente_de_la_capital._Os_enseñamos_recomend_ylggas', label: 'Venta Madrid', type: 'land' },
  { src: 'https://res.cloudinary.com/dmyodciqo/video/upload/EVENTOS._Os_presentamos_105_un_olivar_secreto_en_el_corazón_de_la_capital.Este_espacio_es_una_d_wknz5l', label: 'Olivar secreto Madrid', type: 'land' },
  { src: 'https://res.cloudinary.com/dmyodciqo/video/upload/evento_my_wish_en_tr31ntayuno_v1_2160p_pnjeuw', label: 'My Wish en TR31NTAYUNO', type: 'land' },
  { src: 'https://res.cloudinary.com/dmyodciqo/video/upload/MAH01839_3_jxpkzr', label: 'Producción audiovisual', type: 'land' },
  { src: 'https://res.cloudinary.com/dmyodciqo/video/upload/8f1923f5-fdcc-44ef-8573-37ebca6a2ff5_rvmc3l', label: 'Edición 06', type: 'land' },
  { src: 'https://res.cloudinary.com/dmyodciqo/video/upload/copy_76C786EE-DE6A-43E4-8E10-7455A8591625_bf3bpn', label: 'Edición 07', type: 'land' },
]

const EXPERIENCIA = [
  { role: 'Responsable audiovisual y digital', place: '@thesibarist', ig: 'https://www.instagram.com/thesibarist' },
  { role: 'Diseñador de cocinas',              place: '@ikea',        ig: null },
  { role: 'Asistente de eventos',              place: '@thecube',     ig: 'https://www.instagram.com/thecube/' },
  { role: 'Community manager',                 place: '@ottobayt',    ig: 'https://www.instagram.com/ottobayt/' },
  { role: 'Community manager',                 place: '@auraessence', ig: 'https://www.instagram.com/aura.esence/' },
]

type Slide = { src: string; label: string; type: string }
type Page = 'home' | 'work' | 'carousel'
type CarType = 'foto' | 'exposiciones' | 'edicion'

function drawCrack(canvas: HTMLCanvasElement, progress: number, reverse: boolean) {
  const W = canvas.width, H = canvas.height
  const ctx = canvas.getContext('2d')!
  ctx.clearRect(0, 0, W, H)
  const cx = W/2, cy = H/2, ox = 22, oy = 30
  const arms = [
    [[ox,oy],[ox-5,oy-H*.15],[cx-20,cy-80],[cx,cy]],
    [[ox,oy],[ox+W*.15,oy+20],[cx+W*.2,cy],[W-30,cy+20]],
    [[ox,oy],[ox+20,oy+H*.2],[cx-80,H*.7],[cx,H-20]],
    [[ox,oy],[ox+W*.3,oy-10],[W*.6,cy-40],[W-20,cy]],
    [[ox,oy],[ox+10,oy+H*.4],[cx,H*.75],[W*.7,H-10]],
  ]
  const p = reverse ? 1-progress : progress
  ctx.strokeStyle='#1a1a18'; ctx.lineCap='round'
  arms.forEach((pts,ai)=>{
    const delay=ai*0.07, ap=Math.max(0,Math.min((p-delay)/(1-delay),1))
    if(ap<=0)return
    ctx.lineWidth=reverse?1.2+ap*0.4:1.4
    ctx.globalAlpha=Math.min(ap*3,0.82)
    ctx.beginPath()
    const ti=Math.floor(ap*(pts.length-1)), fr=ap*(pts.length-1)-ti
    ctx.moveTo(pts[0][0],pts[0][1])
    for(let i=1;i<=ti&&i<pts.length;i++)ctx.lineTo(pts[i][0],pts[i][1])
    if(ti<pts.length-1){const a=pts[ti],b=pts[ti+1];ctx.lineTo(a[0]+(b[0]-a[0])*fr,a[1]+(b[1]-a[1])*fr)}
    ctx.stroke()
  })
  if(!reverse&&progress>0.6){
    const r=((progress-0.6)/0.4)*Math.sqrt(W*W+H*H)*0.85
    const g=ctx.createRadialGradient(cx,cy,0,cx,cy,r)
    g.addColorStop(0,'rgba(240,236,228,1)');g.addColorStop(0.8,'rgba(240,236,228,.9)');g.addColorStop(1,'rgba(240,236,228,0)')
    ctx.globalAlpha=1;ctx.fillStyle=g;ctx.fillRect(0,0,W,H)
  }
  if(reverse&&progress>0.6){
    const rp=(progress-0.6)/0.4, r=Math.sqrt(W*W+H*H)*0.85*(1-rp)
    const g=ctx.createRadialGradient(ox,oy,0,ox,oy,r)
    g.addColorStop(0,'rgba(240,236,228,0)');g.addColorStop(0.7,'rgba(240,236,228,.9)');g.addColorStop(1,'rgba(240,236,228,1)')
    ctx.globalAlpha=1;ctx.fillStyle=g;ctx.fillRect(0,0,W,H)
  }
}

// ── BREATHING CRACK — bigger, more dramatic ──
function BreathingCrack() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(()=>{
    const canvas = ref.current; if(!canvas) return
    let raf = 0
    function draw(t: number){
      const W = canvas!.offsetWidth || 200
      const H = canvas!.offsetHeight || window.innerHeight*0.72
      canvas!.width = W; canvas!.height = H
      const ctx = canvas!.getContext('2d')!
      ctx.clearRect(0,0,W,H)
      const cycle = (t % 3000) / 3000
      let breath: number
      if(cycle < 0.15)      breath = cycle / 0.15
      else if(cycle < 0.35) breath = 1 - (cycle-0.15)/0.20
      else if(cycle < 0.45) breath = (cycle-0.35)/0.10 * 0.5
      else if(cycle < 0.55) breath = 0.5 - (cycle-0.45)/0.10 * 0.5
      else                  breath = 0
      const spread = breath * 18  // wider — more dramatic
      const cx = W/2
      const pts = [
        [cx, 0],        [cx-5, H*0.09],  [cx+7, H*0.20],
        [cx-6, H*0.31], [cx+8, H*0.42],  [cx-7, H*0.53],
        [cx+6, H*0.63], [cx-4, H*0.73],  [cx+4, H*0.85],
        [cx,   H],
      ]
      // Left wall
      ctx.strokeStyle='#1a1a18'; ctx.lineWidth=1.4; ctx.globalAlpha=0.75; ctx.lineCap='round'
      ctx.beginPath()
      ctx.moveTo(pts[0][0]-spread*0.25, pts[0][1])
      for(let i=1;i<pts.length;i++){
        const s=Math.sin(i/pts.length*Math.PI)*spread
        ctx.lineTo(pts[i][0]-s, pts[i][1])
      }
      ctx.stroke()
      // Right wall
      ctx.beginPath()
      ctx.moveTo(pts[0][0]+spread*0.25, pts[0][1])
      for(let i=1;i<pts.length;i++){
        const s=Math.sin(i/pts.length*Math.PI)*spread
        ctx.lineTo(pts[i][0]+s, pts[i][1])
      }
      ctx.stroke()
      // Dark void inside when open
      if(spread > 1){
        ctx.beginPath()
        ctx.moveTo(pts[0][0]-spread*0.25, pts[0][1])
        for(let i=1;i<pts.length;i++){const s=Math.sin(i/pts.length*Math.PI)*spread; ctx.lineTo(pts[i][0]-s, pts[i][1])}
        for(let i=pts.length-1;i>=0;i--){const s=Math.sin(i/pts.length*Math.PI)*spread; ctx.lineTo(pts[i][0]+s, pts[i][1])}
        ctx.closePath(); ctx.fillStyle='rgba(26,26,18,0.22)'; ctx.globalAlpha=1; ctx.fill()
      }
      // Branches
      ctx.globalAlpha=0.35; ctx.lineWidth=0.8
      ctx.beginPath(); ctx.moveTo(pts[2][0]+5,pts[2][1]); ctx.lineTo(pts[2][0]+30,pts[2][1]-30); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(pts[4][0]-5,pts[4][1]); ctx.lineTo(pts[4][0]-35,pts[4][1]+22); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(pts[6][0]+4,pts[6][1]); ctx.lineTo(pts[6][0]+22,pts[6][1]+16); ctx.stroke()
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)
    return()=>cancelAnimationFrame(raf)
  },[])
  // bigger canvas: 200px wide, 72% height
  return <canvas ref={ref} style={{position:'absolute',top:0,left:'calc(50% - 100px)',width:200,height:'72%',pointerEvents:'none'}}/>
}

const NAV: React.CSSProperties = {
  fontSize:'0.9rem', letterSpacing:'0.03em', color:'#3a3830',
  textDecoration:'none', cursor:'pointer', background:'none',
  border:'none', padding:0, fontFamily:"'DM Mono',monospace",
  fontWeight:400, transition:'color 0.3s',
}

export default function Home() {
  const [introDone, setIntroDone] = useState(false)
  const [page, setPage] = useState<Page>('home')
  const [prevPage, setPrevPage] = useState<Page>('home')
  const [carType, setCarType] = useState<CarType>('foto')
  const [slides, setSlides] = useState<Slide[]>(EVENTOS)
  const [subcat, setSubcat] = useState<'eventos'|'exposiciones'>('eventos')
  const [offset, setOffset] = useState(0)
  const [showBack, setShowBack] = useState(false)
  const [lightbox, setLightbox] = useState<string|null>(null)

  const dotRef = useRef<HTMLDivElement>(null)
  const crackIntroRef = useRef<HTMLCanvasElement>(null)
  const crackOverlayRef = useRef<HTMLCanvasElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)

  const bKeys=[{t:0,y:0},{t:.1,y:80},{t:.2,y:0},{t:.28,y:45},{t:.36,y:0},{t:.42,y:22},{t:.47,y:0},{t:.51,y:10},{t:.55,y:0},{t:.58,y:4},{t:.61,y:0}]
  const eIn=(t:number)=>t*t*t
  const eOut=(t:number)=>1-Math.pow(1-t,3)
  const lerp=(a:number,b:number,t:number)=>a+(b-a)*t
  function getY(p:number){
    const n=Math.min(p,.61);let i=0
    while(i<bKeys.length-1&&bKeys[i+1].t<=n)i++
    const k0=bKeys[i],k1=bKeys[i+1];if(!k1)return 0
    const s=(n-k0.t)/(k1.t-k0.t)
    return lerp(k0.y,k1.y,k1.y>k0.y?eIn(s):eOut(s))
  }

  useEffect(()=>{
    let phase='bounce', ps:number|null=null
    function run(ts:number){
      if(!ps)ps=ts; const el=(ts-ps)/1000
      if(phase==='bounce'){
        if(el<1.4){
          if(dotRef.current) dotRef.current.style.transform=`translate(-50%,-50%) translateY(${getY(el/1.4*0.61)}px)`
          if(el>0.7&&crackIntroRef.current){
            const c=crackIntroRef.current
            c.style.opacity='1'; c.width=c.offsetWidth||window.innerWidth; c.height=c.offsetHeight||window.innerHeight
            drawCrack(c,Math.min((el-0.7)/1.2,0.55),false)
          }
          rafRef.current=requestAnimationFrame(run)
        } else {phase='fall';ps=ts;rafRef.current=requestAnimationFrame(run)}
      } else if(phase==='fall'){
        const p=Math.min(el/0.3,1)
        if(dotRef.current){dotRef.current.style.transform=`translate(-50%,-50%) translateY(${eIn(p)*120}px)`;dotRef.current.style.opacity=String(1-p*1.5)}
        if(crackIntroRef.current){
          const c=crackIntroRef.current; c.width=c.offsetWidth||window.innerWidth; c.height=c.offsetHeight||window.innerHeight
          drawCrack(c,Math.min(0.55+p*0.45,1),false)
        }
        if(el>0.25) setIntroDone(true)
        if(el<0.4) rafRef.current=requestAnimationFrame(run)
      }
    }
    const tid=setTimeout(()=>{rafRef.current=requestAnimationFrame(run)},80)
    return()=>{clearTimeout(tid);cancelAnimationFrame(rafRef.current)}
  },[])

  const crackAnim=useCallback((reverse:boolean,cb:()=>void)=>{
    const c=crackOverlayRef.current;if(!c)return
    c.style.opacity='1';c.style.pointerEvents='all'
    c.width=c.parentElement?.offsetWidth||window.innerWidth;c.height=window.innerHeight
    let s:number|null=null
    function frame(ts:number){
      if(!s)s=ts;const p=Math.min((ts-s)/750,1),e=p<.5?2*p*p:1-Math.pow(-2*p+2,2)/2
      drawCrack(c!,e,reverse)
      if(p<.65)requestAnimationFrame(frame)
      else{
        cb();let fo=0
        const fade=()=>{fo+=.08;c!.style.opacity=String(1-fo);if(fo<1)requestAnimationFrame(fade);else{c!.style.opacity='0';c!.style.pointerEvents='none'}}
        setTimeout(fade,reverse?280:80)
      }
    }
    requestAnimationFrame(frame)
  },[])

  const goWork=()=>crackAnim(false,()=>{setPrevPage('home');setPage('work');setShowBack(true)})
  const openCarousel=(type:CarType)=>{
    setCarType(type)
    if(type==='foto'){setSlides(EVENTOS);setSubcat('eventos')}
    else if(type==='exposiciones'){setSlides(EXPOSICIONES)}
    else{setSlides(VIDEOS)}
    setOffset(0)
    crackAnim(false,()=>{setPrevPage('work');setPage('carousel');setShowBack(true)})
  }
  const goBack=()=>{
    setShowBack(false)
    crackAnim(true,()=>{const d=prevPage==='work'?'work':'home';setPage(d);if(d!=='home')setShowBack(true)})
  }
  const switchSubcat=(sub:'eventos'|'exposiciones')=>{setSubcat(sub);setSlides(sub==='eventos'?EVENTOS:EXPOSICIONES);setOffset(0)}
  function moveCarr(dir:number){
    const els=trackRef.current?.querySelectorAll('.cs');if(!els)return
    setOffset(o=>Math.max(0,Math.min(o+dir,els.length-2)))
  }
  useEffect(()=>{
    const t=trackRef.current;if(!t)return
    const els=t.querySelectorAll<HTMLElement>('.cs')
    let px=0;for(let i=0;i<offset&&i<els.length;i++)px+=els[i].offsetWidth+10
    t.style.transform=`translateX(-${px}px)`
  },[offset,slides])

  const hov=(e:React.MouseEvent<HTMLElement>,on:boolean)=>{(e.currentTarget as HTMLElement).style.color=on?'#1a1a18':'#3a3830'}
  const slideW=(t:string)=>t==='land'?'min(480px,48vw)':t==='port'?'min(220px,22vw)':'min(320px,32vw)'
  const isVideo=(src:string)=>src.endsWith('.mp4')||src.endsWith('.mov')
  const textColor='#2e2c28'


  return (
    <>
      {!introDone&&(
        <div style={{position:'fixed',inset:0,zIndex:200,background:'#f0ece4',display:'flex',alignItems:'center',justifyContent:'center'}}>
          <canvas ref={crackIntroRef} style={{position:'absolute',inset:0,width:'100%',height:'100%',opacity:0,pointerEvents:'none'}}/>
          <div ref={dotRef} style={{position:'absolute',width:9,height:9,borderRadius:'50%',background:'#1a1a18',left:'50%',top:'50%',transform:'translate(-50%,-50%)'}}/>
        </div>
      )}

      <canvas ref={crackOverlayRef} style={{position:'fixed',inset:0,zIndex:150,pointerEvents:'none',opacity:0}}/>

      {showBack&&(
        <button onClick={goBack} title="volver"
          style={{position:'fixed',top:'1rem',left:'1rem',zIndex:100,width:44,height:44,borderRadius:'50%',background:'transparent',border:'none',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',padding:0}}
          onMouseEnter={e=>{(e.currentTarget.querySelector('.bd') as HTMLElement).style.transform='scale(1.7)'}}
          onMouseLeave={e=>{(e.currentTarget.querySelector('.bd') as HTMLElement).style.transform='scale(1)'}}>
          <div className="bd" style={{width:11,height:11,borderRadius:'50%',background:'#1a1a18',transition:'transform .4s cubic-bezier(.16,1,.3,1)'}}/>
        </button>
      )}

      {lightbox&&(
        <div onClick={()=>setLightbox(null)}
          style={{position:'fixed',inset:0,zIndex:300,background:'rgba(0,0,0,0.93)',display:'flex',alignItems:'center',justifyContent:'center',cursor:'zoom-out'}}>
          {isVideo(lightbox)?<video src={lightbox} controls autoPlay style={{maxWidth:'90vw',maxHeight:'90vh'}}/>:<img src={lightbox} alt="" style={{maxWidth:'90vw',maxHeight:'90vh',objectFit:'contain'}}/>}
          <div style={{position:'absolute',top:'2rem',right:'2.5rem',color:'rgba(255,255,255,.45)',fontSize:'.7rem',letterSpacing:'.14em',textTransform:'uppercase',fontFamily:"'DM Mono',monospace"}}>cerrar ×</div>
        </div>
      )}

      <div style={{opacity:introDone?1:0,transition:'opacity .7s ease',width:'100%',height:'100vh',position:'relative'}}>

        {/* ── HOME ── */}
        {page==='home'&&(
          <div style={{width:'100%',height:'100vh',position:'relative',overflow:'hidden',background:'#f0ece4'}}>

            {/* BIO */}
            <div style={{position:'absolute',top:'3.5%',left:'3.5%',width:'30%',fontSize:'0.88rem',lineHeight:1.75,color:textColor,fontFamily:"'DM Mono',monospace",fontWeight:400,letterSpacing:'0.01em'}}>
              ¡Hola!, soy un apasionado por la búsqueda, diseño y producción de eventos que conectan personas, marcas y emociones. Creo en el poder de los espacios como herramienta de comunicación: lugares donde las ideas se transforman en experiencias memorables. Mi experiencia en diseño visual, comunicación y producción audiovisual me permite integrar distintos lenguajes para potenciar el mensaje de cada proyecto. Me inspira trabajar en entornos creativos, colaborativos y desafiantes, donde cada detalle cuenta y cada historia puede dejar huella.
            </div>

            {/* CONTACT */}
            <div style={{position:'absolute',top:'3.5%',right:'3.5%',textAlign:'right',fontSize:'0.88rem',lineHeight:1.75,color:textColor,fontFamily:"'DM Mono',monospace",fontWeight:400}}>
              <a href="mailto:paveldealfonso@gmail.com" style={{color:textColor,textDecoration:'none',display:'block'}}>paveldealfonso@gmail.com</a>
              <a href="tel:+34601256546" style={{color:textColor,textDecoration:'none',display:'block'}}>601256546</a>
              <span style={{display:'block'}}>Madrid</span>
            </div>

            {/* BREATHING CRACK — centre */}
            <BreathingCrack/>

            {/* CRACK bottom-right */}
            <svg style={{position:'absolute',bottom:0,right:'2%',width:110,height:'48%',pointerEvents:'none'}} viewBox="0 0 100 300" fill="none" preserveAspectRatio="none">
              <path d="M45 0 L50 55 L42 110 L52 175 L44 240 L50 300" stroke="#1a1a18" strokeWidth="1.2" opacity=".65"/>
            </svg>

            {/* SILHOUETTE removed */}

            {/* NAV */}
            <div style={{position:'absolute',top:'52%',left:0,right:0,display:'flex',alignItems:'center',padding:'0 3.5%'}}>
              <span style={{fontFamily:"'DM Mono',monospace",fontWeight:400,fontSize:'0.9rem',color:textColor,flexShrink:0,marginRight:'5%'}}>pavel de alfonso</span>
              <div style={{display:'flex',gap:'3rem'}}>
                <button style={NAV} onClick={goWork} onMouseEnter={e=>hov(e,true)} onMouseLeave={e=>hov(e,false)}>Work</button>
                <a href="https://readymag.website/u731161752/6395974/" target="_blank" rel="noreferrer" style={NAV} onMouseEnter={e=>hov(e,true)} onMouseLeave={e=>hov(e,false)}>Portfolio</a>
              </div>
              <div style={{flex:1}}/>
              <div style={{display:'flex',gap:'3rem',marginRight:'8%'}}>
                <a href="https://www.linkedin.com/in/pavel-de-alfonso-354941160/" target="_blank" rel="noreferrer" style={NAV} onMouseEnter={e=>hov(e,true)} onMouseLeave={e=>hov(e,false)}>Linkedin</a>
                <a href="https://www.instagram.com/paveldealfonso/" target="_blank" rel="noreferrer" style={NAV} onMouseEnter={e=>hov(e,true)} onMouseLeave={e=>hov(e,false)}>Instagram</a>
              </div>
            </div>

            {/* ESTUDIOS — bottom left */}
            <div style={{position:'absolute',bottom:'3%',left:'3.5%',width:'22%'}}>
              <span style={{fontSize:'0.65rem',letterSpacing:'0.12em',textTransform:'uppercase' as const,color:'#2e2c28',fontFamily:"'DM Mono',monospace",fontWeight:500,display:'block',marginBottom:'0.6rem'}}>estudios</span>
              <div style={{fontSize:'0.78rem',lineHeight:1.85,color:'#5a5650',fontFamily:"'DM Mono',monospace",fontWeight:300}}>
                Realización de espectáculos audiovisuales y eventos<br/>
                Máster en protocolo y gestión de eventos<br/>
                Canela — Creative New Blood
              </div>
            </div>

            {/* EXPERIENCIA — just below crack, centred */}
            <div style={{position:'absolute',top:'73%',left:'50%',transform:'translateX(-50%)',width:'26%'}}>
              <span style={{fontSize:'0.65rem',letterSpacing:'0.12em',textTransform:'uppercase' as const,color:'#2e2c28',fontFamily:"'DM Mono',monospace",fontWeight:500,display:'block',marginBottom:'0.5rem'}}>experiencia</span>
              <div style={{fontSize:'0.78rem',lineHeight:1.95,color:'#5a5650',fontFamily:"'DM Mono',monospace",fontWeight:300}}>
                {EXPERIENCIA.map((e,i)=>(
                  <div key={i}>
                    {e.role}{' '}
                    {e.ig
                      ? <a href={e.ig} target="_blank" rel="noreferrer"
                          style={{color:'#2e2c28',textDecoration:'none',transition:'opacity .3s'}}
                          onMouseEnter={ev=>(ev.currentTarget.style.opacity='.5')}
                          onMouseLeave={ev=>(ev.currentTarget.style.opacity='1')}>
                          {e.place}
                        </a>
                      : <span style={{color:'#2e2c28'}}>{e.place}</span>
                    }
                  </div>
                ))}
              </div>
            </div>

            {/* HABILIDADES — bottom right, before the right crack (around 78%) */}
            <div style={{position:'absolute',bottom:'3%',left:'72%',width:'18%'}}>
              <span style={{fontSize:'0.65rem',letterSpacing:'0.12em',textTransform:'uppercase' as const,color:'#2e2c28',fontFamily:"'DM Mono',monospace",fontWeight:500,display:'block',marginBottom:'0.6rem'}}>habilidades</span>
              <div style={{fontSize:'0.78rem',lineHeight:1.85,color:'#5a5650',fontFamily:"'DM Mono',monospace",fontWeight:300}}>
                Adobe Premiere · After Effects · Illustrator<br/>
                Canva · CapCut · Claude AI
              </div>
            </div>
          </div>
        )}

        {/* ── WORK ── */}
        {page==='work'&&(
          <div style={{width:'100%',height:'100vh',position:'relative',overflow:'hidden',background:'#f0ece4'}}>
            <div style={{position:'absolute',top:'8%',left:'14%',right:'4%'}}>
              <span onClick={()=>openCarousel('edicion')}
                style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300,fontSize:'1.8rem',letterSpacing:'-.01em',color:'#1a1a18',cursor:'pointer',transition:'opacity .3s',display:'block',marginBottom:'1rem'}}
                onMouseEnter={e=>(e.currentTarget.style.opacity='.45')} onMouseLeave={e=>(e.currentTarget.style.opacity='1')}>
                edición
              </span>
              <div style={{display:'flex',gap:8}}>
                {VIDEOS.slice(0,4).map((v,i)=>(
                  <div key={i} onClick={()=>openCarousel('edicion')}
                    style={{width:'calc(25% - 6px)',aspectRatio:'16/9',overflow:'hidden',borderRadius:2,cursor:'pointer',background:'#e0dbd2'}}>
                    <video src={v.src} muted playsInline preload="metadata"
                      style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}}
                      onMouseEnter={e=>(e.currentTarget as HTMLVideoElement).play()}
                      onMouseLeave={e=>{const el=e.currentTarget as HTMLVideoElement;el.pause();el.currentTime=0}}/>
                  </div>
                ))}
              </div>
            </div>

            <div style={{position:'absolute',top:'52%',left:'14%',right:'4%'}}>
              <div style={{display:'flex',alignItems:'baseline',gap:'1.5rem',marginBottom:'1rem'}}>
                <span onClick={()=>openCarousel('foto')}
                  style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300,fontSize:'1.8rem',letterSpacing:'-.01em',color:'#1a1a18',cursor:'pointer',transition:'opacity .3s'}}
                  onMouseEnter={e=>(e.currentTarget.style.opacity='.45')} onMouseLeave={e=>(e.currentTarget.style.opacity='1')}>
                  fotografía
                </span>
                <span onClick={()=>openCarousel('foto')} style={{fontSize:'0.72rem',fontFamily:"'DM Mono',monospace",color:'#b0aba4',letterSpacing:'0.08em',cursor:'pointer',transition:'color .3s'}} onMouseEnter={e=>(e.currentTarget.style.color='#1a1a18')} onMouseLeave={e=>(e.currentTarget.style.color='#b0aba4')}>eventos</span>
                <span onClick={()=>openCarousel('exposiciones')} style={{fontSize:'0.72rem',fontFamily:"'DM Mono',monospace",color:'#b0aba4',letterSpacing:'0.08em',cursor:'pointer',transition:'color .3s'}} onMouseEnter={e=>(e.currentTarget.style.color='#1a1a18')} onMouseLeave={e=>(e.currentTarget.style.color='#b0aba4')}>exposiciones</span>
              </div>
              <div style={{display:'flex',gap:8}}>
                {EVENTOS.slice(0,4).map((s,i)=>(
                  <div key={i} onClick={()=>openCarousel('foto')}
                    style={{width:'calc(25% - 6px)',aspectRatio:'4/3',overflow:'hidden',borderRadius:2,cursor:'pointer',background:'#e0dbd2'}}>
                    <img src={s.src} alt={s.label} style={{width:'100%',height:'100%',objectFit:'cover',display:'block',transition:'transform .5s'}}
                      onMouseEnter={e=>(e.currentTarget.style.transform='scale(1.05)')} onMouseLeave={e=>(e.currentTarget.style.transform='scale(1)')}/>
                  </div>
                ))}
              </div>
            </div>

            <svg style={{position:'absolute',top:0,right:'8%',width:90,height:'55%',pointerEvents:'none'}} viewBox="0 0 100 340" fill="none" preserveAspectRatio="none">
              <path d="M50 0 L44 60 L52 130 L40 210 L48 300 L42 340" stroke="#1a1a18" strokeWidth="1.2" opacity=".68"/>
            </svg>
            <svg style={{position:'absolute',bottom:0,left:0,width:70,height:'48%',pointerEvents:'none'}} viewBox="0 0 100 280" fill="none" preserveAspectRatio="none">
              <path d="M55 0 L47 70 L55 140 L43 210 L50 280" stroke="#1a1a18" strokeWidth="1.1" opacity=".58"/>
            </svg>
          </div>
        )}

        {/* ── CAROUSEL ── */}
        {page==='carousel'&&(
          <div style={{width:'100%',height:'100vh',position:'relative',overflow:'hidden',background:'#f0ece4'}}>
            <div style={{position:'absolute',top:0,left:0,right:0,height:54,display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 3.5%',borderBottom:'1px solid #ddd8d0'}}>
              <span style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300,fontSize:'1.1rem',letterSpacing:'-.01em',color:'#1a1a18'}}>
                {carType==='edicion'?'edición':carType==='exposiciones'?'exposiciones':'fotografía'}
              </span>
              {carType==='foto'&&(
                <div style={{display:'flex',gap:'2rem'}}>
                  {(['eventos','exposiciones'] as const).map(s=>(
                    <button key={s} onClick={()=>switchSubcat(s)}
                      style={{fontSize:'0.8rem',letterSpacing:'0.04em',color:subcat===s?'#1a1a18':'#8a857e',cursor:'pointer',background:'none',border:'none',fontFamily:"'DM Mono',monospace",fontWeight:400,borderBottom:subcat===s?'1px solid #1a1a18':'1px solid transparent',paddingBottom:2}}>
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div style={{position:'absolute',top:54,bottom:54,left:0,right:0,overflow:'hidden',display:'flex',alignItems:'center'}}>
              <div ref={trackRef} style={{display:'flex',gap:10,padding:'0 3.5%',transition:'transform .7s cubic-bezier(.16,1,.3,1)',height:'86%',alignItems:'center'}}>
                {slides.map((s,i)=>(
                  <div key={i} className="cs" onClick={()=>setLightbox(s.src)}
                    style={{flexShrink:0,width:slideW(s.type),height:'100%',position:'relative',overflow:'hidden',borderRadius:2,cursor:'zoom-in'}}>
                    {isVideo(s.src)
                      ?<video src={s.src} muted loop playsInline onMouseEnter={e=>(e.currentTarget as HTMLVideoElement).play()} onMouseLeave={e=>(e.currentTarget as HTMLVideoElement).pause()} style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}}/>
                      :<img src={s.src} alt={s.label} style={{width:'100%',height:'100%',objectFit:'cover',display:'block',transition:'transform .6s'}} onMouseEnter={e=>(e.currentTarget.style.transform='scale(1.04)')} onMouseLeave={e=>(e.currentTarget.style.transform='scale(1)')}/>
                    }
                    <div style={{position:'absolute',bottom:'.8rem',left:'.8rem',fontSize:'.5rem',letterSpacing:'.1em',textTransform:'uppercase',color:'rgba(255,255,255,.75)',zIndex:2,fontFamily:"'DM Mono',monospace"}}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{position:'absolute',bottom:0,left:0,right:0,height:54,display:'flex',alignItems:'center',justifyContent:'center',gap:'1.4rem',borderTop:'1px solid #ddd8d0'}}>
              <button onClick={()=>moveCarr(-1)} style={{background:'none',border:'1px solid #ddd8d0',width:30,height:30,cursor:'pointer',fontSize:'.8rem',color:'#8a857e',fontFamily:"'DM Mono',monospace",display:'flex',alignItems:'center',justifyContent:'center'}}>←</button>
              <div style={{display:'flex',gap:8,alignItems:'center'}}>
                {slides.map((_,i)=>(
                  <div key={i} onClick={()=>setOffset(i)} style={{width:5,height:5,borderRadius:'50%',background:offset===i?'#1a1a18':'#ddd8d0',transform:offset===i?'scale(1.3)':'scale(1)',transition:'all .3s',cursor:'pointer'}}/>
                ))}
              </div>
              <button onClick={()=>moveCarr(1)} style={{background:'none',border:'1px solid #ddd8d0',width:30,height:30,cursor:'pointer',fontSize:'.8rem',color:'#8a857e',fontFamily:"'DM Mono',monospace",display:'flex',alignItems:'center',justifyContent:'center'}}>→</button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
