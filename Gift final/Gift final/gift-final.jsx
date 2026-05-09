import { useState } from "react";

const SKEB_IMG = "/images/IMG-2026001.jpg";
const LES_IMG = "/images/IMG-2026002.jpg";

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

export default function App() {
  const [screen,setScreen]=useState("home");
  const [profile,setProfile]=useState(null);
  const [mood,setMood]=useState(null);

  const go=(s)=>setScreen(s);

  if(screen==="home"){
    return(
      <div>
        <style>{css}</style>

        <div onClick={()=>{setProfile("sk");go("sk");}}>
          <img src={SKEB_IMG}/>
          Skebekwa
        </div>

        <div onClick={()=>{setProfile("le");go("le");}}>
          <img src={LES_IMG}/>
          Lesedi
        </div>
      </div>
    );
  }

  return <div><style>{css}</style>Working ✔</div>;
}

