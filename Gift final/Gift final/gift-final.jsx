import { useState } from "react";

const SKEB = "/images/IMG-2026001.jpg";
const LES = "/images/IMG-2026002.jpg";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
  @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
  @keyframes float { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-10px); } }
  @keyframes heartbeat { 0%,100% { transform:scale(1); } 50% { transform:scale(1.15); } }
  @keyframes popIn { 0% { opacity:0; transform:scale(0.85) translateY(20px); } 70% { transform:scale(1.03) translateY(-2px); } 100% { opacity:1; transform:scale(1) translateY(0); } }
  @keyframes petal { 0% { transform:translateY(-20px) rotate(0deg); opacity:0; } 10% { opacity:1; } 90% { opacity:0.6; } 100% { transform:translateY(110vh) rotate(720deg); opacity:0; } }
  .screen { animation: fadeUp 0.6s ease both; }
  .btn-main { border:none; cursor:pointer; font-family:'DM Sans',sans-serif; font-weight:500; letter-spacing:0.05em; transition:all 0.25s ease; }
  .btn-main:hover { transform:translateY(-2px); filter:brightness(1.05); }
  .btn-main:active { transform:scale(0.97); }
  .profile-card { transition:all 0.3s cubic-bezier(0.34,1.56,0.64,1); cursor:pointer; }
  .profile-card:hover { transform:translateY(-8px) scale(1.03); box-shadow:0 24px 50px rgba(0,0,0,0.18) !important; }
  .profile-card:active { transform:scale(0.97); }
  .mood-btn { transition:all 0.22s cubic-bezier(0.34,1.56,0.64,1); cursor:pointer; border:none; }
  .mood-btn:hover { transform:translateY(-5px) scale(1.06); }
  .mood-btn:active { transform:scale(0.95); }
  .back-link { background:none; border:none; cursor:pointer; font-family:'DM Sans',sans-serif; transition:all 0.2s; }
  .back-link:hover { opacity:0.7; transform:translateX(-3px); }
  .overlay { position:fixed; inset:0; background:rgba(0,0,0,0.5); backdrop-filter:blur(4px); display:flex; align-items:center; justify-content:center; z-index:100; padding:1.5rem; animation:fadeIn 0.3s ease; }
  .popup { animation:popIn 0.45s cubic-bezier(0.34,1.56,0.64,1); max-width:380px; width:100%; }
  .petal { position:fixed; top:-40px; font-size:1.4rem; animation:petal linear infinite; pointer-events:none; z-index:0; }
`;

const SKEB_MOODS = [
  { emoji:"😊", label:"Happy", msg:"Ayeye bheka kujabule bani 😹\n\nI'm imagining you smiling right now — sengyahlanya — but yeah, you look sweet when you smile. So smile, udida ama enemy. You look like a butternut when you smile, that's actually why I called you that.\n\nI wonder what made you happy though... I'm going to guess. If I get it right, idk, skyff tiramisu 😅\n\n1. Mr Price related 🛍️\n2. You did something big and you didn't think you would do it 💪\n3. You met someone you haven't seen in a long time 🥺" },
  { emoji:"😔", label:"Sad", msg:"I know. And that's okay. You're allowed to feel this. You don't have to rush through it or pretend it isn't there. But I need you to hear me — your sadness doesn't make you less. It makes you human. And I love every human part of you.\n\nI wish I could be there right now. Everything is going to be okay — action reaction, what you're going through will react back positively btw. 💙" },
  { emoji:"😰", label:"Stressed", msg:"I'm not sure what's exactly stressing you, which makes this harder than it is — but I know you are handling so much more than you see. So much more than you even give yourself credit for.\n\nStress means you care — and you care so deeply. But you can't pour from an empty cup. Please rest. Please be gentle with yourself tonight — I wish I could say that I don't know how many times.\n\nI believe in you more than you know, gojasi. 🌿" },
  { emoji:"😕", label:"Confused / Lost", msg:"Being lost doesn't mean you're failing — it means you're in the middle of something. Like when you read a book, every chapter that changes you starts with not knowing what comes next.\n\nYou don't have to have it figured out right now. Take one small step. Then another. And know that wherever you end up, I'll be there cheering you on every step of the way.\n\nYou'll find your way. You always do — unama super power girl ukakhulu 😗" },
  { emoji:"💭", label:"Not Enough", msg:"There's going to be a lot of glaze here because wow.\n\nI need you to listen to me. You are MORE than enough. You have always been more than enough. The world has been loud and unkind and it's gotten into your head — but none of it is true.\n\nYou are brilliant, you are worthy, you are exactly who you are supposed to be. Girl uwu — Tanya Mnisi, like cmon, do you know who you are? Everything you do is weird and abnormal but it works. That's the beauty of you.\n\nI see you. And what I see takes my breath away. Please don't let anyone — including yourself — convince you otherwise. 💗" },
  { emoji:"😴", label:"Tired", msg:"It's okay to be tired baby. Rest a bit, ubuye usu right — you deserve to rest kancane. 🌙" },
  { emoji:"😠", label:"Frustrated", msg:"Your frustration is valid. Full stop. Whatever it is — whoever it is — you have every right to feel exactly how you feel. Let it out. Don't like shrink it.\n\nBut after you've felt it, please don't let it live in you too long. You're too good, too warm, too precious to carry someone else's mess. 🔥" },
  { emoji:"😨", label:"Anxious", msg:"I know your mind is racing. I know it feels big and loud and like too much all at once. But you've survived 100% of your hard days so far. Every single one. This one won't be different.\n\nYou are more resilient than your anxiety is telling you. Come back to right now, to this moment. You're safe. And I'm right here with you — ngokomoya if not physically. 🫂" },
  { emoji:"🥺", label:"Missing You", msg:"I miss you too girl. Every single day. The distance is real — like iyaphila lento — and it's hard and I won't pretend otherwise.\n\nBut what we have is also real. That doesn't shrink with kilometers. If anything — it makes me love you more fiercely, more deliberately, more completely. You are so worth every mile. I'm counting down.\n\nNaku rhandza hi mbilu ya mina hinkwayo. 💌" },
  { emoji:"😶", label:"Numb / Empty", msg:"Sometimes you don't feel anything at all — and that's just as valid as feeling everything. Numbness is your mind's way of protecting you after carrying too much. I'm not going to push you to feel differently. I just want you to know I'm here. Sitting with you in it. You're not alone in the emptiness. I see you, even when you can't see yourself right now. ✨" },
];

const LES_MOODS = [
  { emoji:"😓", label:"Tired / Exhausted", msg:"Mmmm kyanyiwa — but you are allowed to be tired. The cooking, the worrying, the showing up even when you had nothing left. You are not weak for being exhausted. You are human.\n\nPlease rest without guilt today. The world will wait. You have done enough honestly. We love you. 💐" },
  { emoji:"🥺", label:"Unappreciated", msg:"I know it doesn't always feel like we notice. But we do. We notice everything. The way you remember small things. The way you sacrifice without saying a word. The way you love us even when we make it hard. You are not invisible. You are the centre of this family. And if nobody has said it today — thank you. For everything. For all of it. 💛" },
  { emoji:"😟", label:"Worried", msg:"It's okay to worry. That's just what your love looks like — it turns into worry because you care so deeply.\n\nBut he is going to be okay. You have raised him well. You have given him enough. Trust the work you put in. And when you catch yourself spiralling — you can call him, ok, that's obvious, but please. 🌸" },
  { emoji:"😊", label:"Happy / Good", msg:"Happy happiness 😊 🌻" },
  { emoji:"😰", label:"Overwhelmed", msg:"Too much at once — I see it. And I know you always try to carry everything without complaining, even when it's heavy. But you don't always have to be strong alone.\n\nStart with one thing at a time, breathe a little, and put the rest down for now. And please… let people help you sometimes. Let me help you too. I'm here for you, always. 🫂" },
  { emoji:"🥲", label:"Feeling Invisible", msg:"You. Are. Seen. Completely. Not just what you do — but who you ARE. Your humour that sneaks up on you. The way you laugh at your own jokes. The warmth in your loving voice. The strength underneath everything. We see the full person, not just the mother. And the full person is extraordinary. Don't you ever forget that.\n\nIt might not be said but it is felt — siyakuzwa mama. 💗" },
  { emoji:"😤", label:"Frustrated", msg:"Eish, sometimes this family is A LOT. We know 😅 Your frustration is valid — completely. You can say it, feel it, let it out. You are not required to be a saint.\n\nBut after the frustration settles — know that this family, chaotic as it is, loves you immensely. We just show it badly sometimes but they do. 💕" },
  { emoji:"💔", label:"Heartbroken / Sad", msg:"Mama. I'm so sorry you're hurting. Whatever it is — your pain matters and it deserves to be healed. You have spent your whole life holding everyone else up. Today, let us hold you. You don't have to be strong right now. Just be. Cry if you need to. We're not going anywhere. We love you through all of it. 💠" },
  { emoji:"🤧", label:"Not Feeling Well", msg:"Please rest! No cooking, no cleaning, no doing anything for anyone. Today is a rest day and we mean it. Drink water. Sleep. You spend so much time taking care of everyone else — your body deserves attention too. Things handled.\n\nPhumula Skebekwa ✨️" },
  { emoji:"🙏", label:"Grateful / At Peace", msg:"There is something so beautiful about a woman who has found her peace. You've been through so much — and yet here you are, grateful, still standing Chuck Norris, still loving.\n\nWe are so grateful for YOU. For your laughter, your love, your presence in our lives. Thank you for choosing us every single day. 🌺" },
];

const PETALS = ["🌸","🌺","🌷","✨","💕","🌸","🌺"];
function Petals() {
  return <>{PETALS.map((p,i) => <span key={i} className="petal" style={{left:`${8+i*13}%`,animationDuration:`${4+i*0.8}s`,animationDelay:`${i*0.6}s`}}>{p}</span>)}</>;
}

const serif = { fontFamily:"'Cormorant Garamond',serif", fontSize:"1.15rem", lineHeight:2, whiteSpace:"pre-wrap" };

export default function App() {
  const [screen,setScreen] = useState("home");
  const [profile,setProfile] = useState(null);
  const [mood,setMood] = useState(null);
  const [ateResp,setAteResp] = useState(null);
  const [showAte,setShowAte] = useState(false);
  const [showAteReply,setShowAteReply] = useState(false);

  const go = (s) => { setScreen(s); window.scrollTo(0,0); };

  const T = {
    skebekwa:{ bg:"linear-gradient(160deg,#1a0a12 0%,#2d1020 50%,#1f0d1a 100%)", acc:"#e8a0bf", accD:"#c06080", text:"#f5e8f0", sub:"#c4a0b4", btn:"linear-gradient(135deg,#c06080,#e8a0bf)", btnT:"#fff", mBg:"rgba(255,255,255,0.07)", mBr:"rgba(232,160,191,0.25)" },
    lesedi:{ bg:"linear-gradient(160deg,#1a1200 0%,#2d2008 50%,#1f1800 100%)", acc:"#f0c060", accD:"#c89030", text:"#f5f0e0", sub:"#c8b880", btn:"linear-gradient(135deg,#c89030,#f0c060)", btnT:"#1a1200", mBg:"rgba(255,255,255,0.07)", mBr:"rgba(240,192,96,0.25)" }
  };
  const t = profile ? T[profile] : T.skebekwa;

  const page = { minHeight:"100vh", background:t.bg, padding:"2rem 1.5rem 4rem", display:"flex", flexDirection:"column", alignItems:"center", fontFamily:"'DM Sans',sans-serif", position:"relative", overflow:"hidden" };
  const cardStyle = { background:"rgba(255,255,255,0.06)", border:`1px solid ${t.accD}30`, borderRadius:24, padding:"2rem", backdropFilter:"blur(8px)", marginBottom:"2rem", textAlign:"left" };
  const h2Style = { fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(1.8rem,6vw,2.4rem)", fontWeight:300, fontStyle:"italic", color:t.text, marginBottom:"0.5rem" };
  const divider = { width:50, height:1, background:t.acc, margin:"0 auto 2rem", opacity:0.5 };
  const btnMain = { background:t.btn, color:t.btnT, padding:"0.9rem 2.5rem", borderRadius:50, fontSize:"0.95rem", boxShadow:`0 8px 24px ${t.accD}40`, width:"100%", maxWidth:280 };
  const backStyle = { alignSelf:"flex-start", color:t.sub, fontSize:"0.85rem", marginBottom:"2rem", zIndex:1 };

  if(screen==="home") return (
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#0d0810 0%,#1a0f1e 50%,#0d0c10 100%)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"2rem",fontFamily:"'DM Sans',sans-serif",overflow:"hidden",position:"relative"}}>
      <style>{css}</style><Petals/>
      <div className="screen" style={{textAlign:"center",zIndex:1,width:"100%",maxWidth:500}}>
        <div style={{fontSize:"2.8rem",animation:"heartbeat 2s ease-in-out infinite",marginBottom:"1rem"}}>💌</div>
        <h1 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(1.6rem,5vw,2.6rem)",fontWeight:300,color:"#f5e8f5",marginBottom:"0.5rem",letterSpacing:"0.04em"}}>
          Nazi ezibandayo baby<br/><span style={{fontStyle:"italic",color:"#e8a0bf"}}>it's not much but 🌷</span>
        </h1>
        <p style={{color:"#8a7090",fontSize:"0.9rem",marginBottom:"3rem",letterSpacing:"0.05em"}}>Choose your name to begin 🌸</p>
        <div style={{display:"flex",gap:"1.2rem",justifyContent:"center",flexWrap:"wrap"}}>
          <div className="profile-card" onClick={()=>{setProfile("skebekwa");go("sk_love");}} style={{background:"rgba(232,160,191,0.08)",border:"1.5px solid rgba(232,160,191,0.2)",borderRadius:24,padding:"2rem 1.5rem",width:180,display:"flex",flexDirection:"column",alignItems:"center",gap:"1rem",boxShadow:"0 8px 32px rgba(0,0,0,0.3)"}}>
            <img src={SKEB_IMG} alt="Skebekwa" style={{width:90,height:90,borderRadius:"50%",objectFit:"cover",objectPosition:"center top",border:"3px solid rgba(232,160,191,0.5)",boxShadow:"0 8px 24px rgba(0,0,0,0.3)"}}/>
            <div>
              <div style={{color:"#f0d0e0",fontFamily:"'Cormorant Garamond',serif",fontSize:"1.25rem"}}>Skebekwa</div>
              <div style={{color:"#8a6070",fontSize:"0.72rem",letterSpacing:"0.08em",marginTop:2}}>From your GUY 💕</div>
            </div>
          </div>
          <div className="profile-card" onClick={()=>{setProfile("lesedi");go("le_welcome");}} style={{background:"rgba(240,192,96,0.08)",border:"1.5px solid rgba(240,192,96,0.2)",borderRadius:24,padding:"2rem 1.5rem",width:180,display:"flex",flexDirection:"column",alignItems:"center",gap:"1rem",boxShadow:"0 8px 32px rgba(0,0,0,0.3)"}}>
            <img src={LES_IMG} alt="Lesedi" style={{width:90,height:90,borderRadius:"50%",objectFit:"cover",objectPosition:"center",border:"3px solid rgba(240,192,96,0.5)",boxShadow:"0 8px 24px rgba(0,0,0,0.3)"}}/>
            <div>
              <div style={{color:"#f0e8d0",fontFamily:"'Cormorant Garamond',serif",fontSize:"1.25rem"}}>Lesedi</div>
              <div style={{color:"#8a7840",fontSize:"0.72rem",letterSpacing:"0.08em",marginTop:2}}>From your GUY 🌻</div>
            </div>
          </div>
        </div>
        <p style={{color:"#4a3858",fontSize:"0.7rem",marginTop:"3rem",letterSpacing:"0.1em",fontStyle:"italic"}}>Made by Slamzy001 • Always&Forever 🌷</p>
      </div>
    </div>
  );

  if(screen==="sk_love") return (
    <div style={page}>
      <style>{css}</style>
      <button className="back-link" onClick={()=>go("home")} style={backStyle}>← Back</button>
      <div className="screen" style={{zIndex:1,width:"100%",maxWidth:520,textAlign:"center"}}>
        <div style={{fontSize:"3rem",animation:"heartbeat 2s ease-in-out infinite",marginBottom:"1.5rem"}}>💕</div>
        <h2 style={h2Style}>Hey, Skebekwa.</h2>
        <div style={divider}/>
        <div style={cardStyle}>
          <p style={{...serif,color:t.text}}>{`I bet you would never predict this 😅

But yeah I want you to know something — not because it's Mother's Day, not because I'm supposed to say it... ok I'm supposed to say it — but because it's the most true thing I know:

You are so incredibly loved. Not just when you're at your best, not just when things are easy — but every single day. Especially the hard ones. Especially the days you feel like you're falling apart, and on the days where you're happy too.

You are the kind of person who makes a room warmer just by being in it. The kind of person I think about randomly and smile (u busy lapho 📿). The kind of person I am so genuinely grateful to have in my life — nanoma uhlupha, but that's the best part.

Whatever you're going through right now, whatever weight you're carrying — you are not carrying it alone. Unendoda girl, I am here. And everything is going to be better. I promise you that.`}</p>
        </div>
        <button className="btn-main" onClick={()=>go("sk_promise")} style={btnMain}>Continue →</button>
      </div>
    </div>
  );

  if(screen==="sk_promise") return (
    <div style={page}>
      <style>{css}</style>
      <button className="back-link" onClick={()=>go("sk_love")} style={backStyle}>← Back</button>
      <div className="screen" style={{zIndex:1,width:"100%",maxWidth:520,textAlign:"center"}}>
        <div style={{fontSize:"2.8rem",marginBottom:"1.5rem"}}>🤝</div>
        <h2 style={{...h2Style}}>Before we continue...</h2>
        <div style={divider}/>
        <div style={cardStyle}>
          <p style={{...serif,color:t.text}}>{`I need you to make me a promise.

Promise me that if you're ever going through something — anything at all, big or small — you won't keep it to yourself. You don't have to figure it out alone. You don't have to be strong by yourself all the time.

I want to be there for you. The happy moments and the hard ones — sizozama, or something, we'll do something. For the happy days and the days that feel impossible. I want all of it — because you matter to me more than you know. You're the khwin of my kingdom 😅 I still think that's sus by the way.

No more going through things in silence. Deal? 💙`}</p>
        </div>
        <button className="btn-main" onClick={()=>go("sk_moods")} style={{...btnMain,maxWidth:300}}>I promise 🤝</button>
      </div>
    </div>
  );

  if(screen==="sk_moods") return (
    <div style={page}>
      <style>{css}</style>
      <button className="back-link" onClick={()=>go("sk_promise")} style={backStyle}>← Back</button>
      <div className="screen" style={{zIndex:1,width:"100%",maxWidth:560,textAlign:"center"}}>
        <div style={{fontSize:"2rem",marginBottom:"1rem"}}>💭</div>
        <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(1.5rem,5vw,2rem)",fontWeight:300,fontStyle:"italic",color:t.text,marginBottom:"0.5rem"}}>How are you feeling right now?</h2>
        <p style={{color:t.sub,fontSize:"0.85rem",marginBottom:"2.5rem"}}>Pick whatever feels closest to the truth.</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(130px,1fr))",gap:"0.85rem"}}>
          {SKEB_MOODS.map((m,i)=>(
            <button key={m.label} className="mood-btn" onClick={()=>{setMood(m);go("sk_msg");}} style={{background:t.mBg,border:`1.5px solid ${t.mBr}`,borderRadius:18,padding:"1.1rem 0.5rem",display:"flex",flexDirection:"column",alignItems:"center",gap:"0.4rem",backdropFilter:"blur(8px)",boxShadow:"0 4px 16px rgba(0,0,0,0.15)",animation:`fadeUp 0.5s ease ${0.05*i}s both`}}>
              <span style={{fontSize:"1.8rem"}}>{m.emoji}</span>
              <span style={{color:t.sub,fontSize:"0.75rem"}}>{m.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  if(screen==="sk_msg"&&mood) return (
    <div style={page}>
      <style>{css}</style>
      <button className="back-link" onClick={()=>go("sk_moods")} style={backStyle}>← Choose another feeling</button>
      <div className="screen" style={{zIndex:1,width:"100%",maxWidth:520,textAlign:"center"}}>
        <div style={{fontSize:"3rem",marginBottom:"1rem",animation:"float 3s ease-in-out infinite"}}>{mood.emoji}</div>
        <h3 style={{color:t.acc,fontFamily:"'Cormorant Garamond',serif",fontSize:"1rem",letterSpacing:"0.12em",textTransform:"uppercase",fontWeight:400,marginBottom:"2rem",opacity:0.8}}>{mood.label}</h3>
        <div style={cardStyle}><p style={{...serif,color:t.text}}>{mood.msg}</p></div>
        <button className="btn-main" onClick={()=>go("sk_moods")} style={{background:"rgba(255,255,255,0.07)",color:t.sub,padding:"0.75rem 2rem",borderRadius:50,fontSize:"0.85rem",border:`1px solid ${t.mBr}`}}>← How else are you feeling?</button>
      </div>
    </div>
  );

  if(screen==="le_welcome") return (
    <div style={page}>
      <style>{css}</style>
      <button className="back-link" onClick={()=>go("home")} style={backStyle}>← Back</button>
      <div className="screen" style={{zIndex:1,width:"100%",maxWidth:520,textAlign:"center"}}>
        <div style={{fontSize:"3rem",animation:"float 3s ease-in-out infinite",marginBottom:"1.5rem"}}>🌻</div>
        <h2 style={h2Style}>To Lesedi.</h2>
        <div style={divider}/>
        <div style={cardStyle}>
          <p style={{...serif,color:t.text}}>{`I bet you thought I'd just say "Happy Mother's Day" and disappear 😭 but nah, I actually need you to understand something.

Watching you be a mom is one of the most beautiful things ever. Like genuinely. You carry so much on your shoulders and somehow you still manage to love so deeply, care so much, and still be there. I know there are days where ukhathele, overwhelmed, stressed, emotionally drained, and probably questioning if you're doing enough… but you are doing more than enough actually.

Omphi is growing up with someone loving, strong, funny, caring and soft-hearted — ngithembe lokho kubaluleke kakhulu.

And can we talk about how you somehow manage to be a whole mom and still be cute 😭 like excuse me? One minute you're handling serious mom responsibilities, one minute you're being adorable and a cool mom, and the next minute ugaya umuthi wokuthi ngiku khumbule 😑

But jokes aside, I really admire you. Not just because you're a mother, but because of the type of mother you are. The way you love, the way you try, the way you keep going even when kunzima — it says so much about your heart.

I hope today reminds you that you deserve appreciation too. You deserve softness, reassurance, rest, love, comfort, and someone reminding you that you're doing an amazing job. And even though I may joke around a lot, I really do mean it when I say I'm proud of you.

Happy Mother's Day, Miss Wife ❤️

Keep being the beautiful person and amazing mom you are. And please remember to save some love for yourself too — and not just everyone else.`}</p>
        </div>
        <button className="btn-main" onClick={()=>setShowAte(true)} style={btnMain}>Continue →</button>
      </div>
      {showAte&&!showAteReply&&(
        <div className="overlay">
          <div className="popup" style={{background:"linear-gradient(160deg,#2d2008,#3d3010)",border:`1.5px solid ${t.accD}50`,borderRadius:24,padding:"2rem",textAlign:"center",boxShadow:"0 24px 60px rgba(0,0,0,0.5)"}}>
            <div style={{fontSize:"2.5rem",marginBottom:"1rem"}}>🍽️</div>
            <h3 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.5rem",fontWeight:300,color:t.text,marginBottom:"0.75rem"}}>Quick question, Mama...</h3>
            <p style={{color:t.sub,lineHeight:1.7,marginBottom:"1.5rem",fontFamily:"'Cormorant Garamond',serif",fontSize:"1.1rem"}}>Did you eat today? 👀</p>
            <div style={{display:"flex",gap:"1rem",justifyContent:"center"}}>
              <button className="btn-main" onClick={()=>{setAteResp("yes");setShowAteReply(true);}} style={{background:t.btn,color:t.btnT,padding:"0.7rem 1.8rem",borderRadius:50,fontSize:"0.9rem"}}>Yes ✅</button>
              <button className="btn-main" onClick={()=>{setAteResp("no");setShowAteReply(true);}} style={{background:"rgba(255,255,255,0.08)",color:t.text,padding:"0.7rem 1.8rem",borderRadius:50,fontSize:"0.9rem",border:`1px solid ${t.mBr}`}}>No 🙈</button>
            </div>
          </div>
        </div>
      )}
      {showAteReply&&(
        <div className="overlay">
          <div className="popup" style={{background:"linear-gradient(160deg,#2d2008,#3d3010)",border:`1.5px solid ${t.accD}50`,borderRadius:24,padding:"2rem",textAlign:"center",boxShadow:"0 24px 60px rgba(0,0,0,0.5)"}}>
            <div style={{fontSize:"2.5rem",marginBottom:"1rem"}}>{ateResp==="yes"?"😒":"😤"}</div>
            <p style={{color:t.text,lineHeight:1.9,fontFamily:"'Cormorant Garamond',serif",fontSize:"1.15rem",marginBottom:"1.5rem",fontStyle:"italic"}}>
              {ateResp==="yes"?"I don't believe you 😂 Doritos don't count. But fine — I'll let you be this time. 😌":"Go eat please. 💛"}
            </p>
            <button className="btn-main" onClick={()=>{setShowAte(false);setShowAteReply(false);go("le_moods");}} style={{background:t.btn,color:t.btnT,padding:"0.75rem 2rem",borderRadius:50,fontSize:"0.9rem"}}>Okay okay 😄 Continue →</button>
          </div>
        </div>
      )}
    </div>
  );

  if(screen==="le_moods") return (
    <div style={page}>
      <style>{css}</style>
      <button className="back-link" onClick={()=>go("le_welcome")} style={backStyle}>← Back</button>
      <div className="screen" style={{zIndex:1,width:"100%",maxWidth:560,textAlign:"center"}}>
        <div style={{fontSize:"2rem",marginBottom:"1rem"}}>🌻</div>
        <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(1.5rem,5vw,2rem)",fontWeight:300,fontStyle:"italic",color:t.text,marginBottom:"0.5rem"}}>How are you feeling, Mama?</h2>
        <p style={{color:t.sub,fontSize:"0.85rem",marginBottom:"2.5rem"}}>Pick whatever speaks to you right now.</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(130px,1fr))",gap:"0.85rem"}}>
          {LES_MOODS.map((m,i)=>(
            <button key={m.label} className="mood-btn" onClick={()=>{setMood(m);go("le_msg");}} style={{background:t.mBg,border:`1.5px solid ${t.mBr}`,borderRadius:18,padding:"1.1rem 0.5rem",display:"flex",flexDirection:"column",alignItems:"center",gap:"0.4rem",backdropFilter:"blur(8px)",boxShadow:"0 4px 16px rgba(0,0,0,0.15)",animation:`fadeUp 0.5s ease ${0.05*i}s both`}}>
              <span style={{fontSize:"1.8rem"}}>{m.emoji}</span>
              <span style={{color:t.sub,fontSize:"0.73rem",textAlign:"center"}}>{m.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  if(screen==="le_msg"&&mood) return (
    <div style={page}>
      <style>{css}</style>
      <button className="back-link" onClick={()=>go("le_moods")} style={backStyle}>← Choose another feeling</button>
      <div className="screen" style={{zIndex:1,width:"100%",maxWidth:520,textAlign:"center"}}>
        <div style={{fontSize:"3rem",marginBottom:"1rem",animation:"float 3s ease-in-out infinite"}}>{mood.emoji}</div>
        <h3 style={{color:t.acc,fontFamily:"'Cormorant Garamond',serif",fontSize:"1rem",letterSpacing:"0.12em",textTransform:"uppercase",fontWeight:400,marginBottom:"2rem",opacity:0.8}}>{mood.label}</h3>
        <div style={cardStyle}><p style={{...serif,color:t.text}}>{mood.msg}</p></div>
        <button className="btn-main" onClick={()=>go("le_moods")} style={{background:"rgba(255,255,255,0.07)",color:t.sub,padding:"0.75rem 2rem",borderRadius:50,fontSize:"0.85rem",border:`1px solid ${t.mBr}`}}>← How else are you feeling?</button>
      </div>
    </div>
  );

  return null;
}
