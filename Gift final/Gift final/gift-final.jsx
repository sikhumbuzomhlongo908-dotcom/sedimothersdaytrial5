import { useState } from "react";

const SKEB_IMG = "/images/IMG-2026001.jpg";
const LES_IMG = "/images/IMG-2026002.jpg";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  @keyframes fadeUp { from { opacity:0; transform:translateY(24px);} to {opacity:1; transform:translateY(0);} }
  @keyframes fadeIn { from { opacity:0;} to {opacity:1;} }
  @keyframes float { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-10px);} }
  @keyframes heartbeat { 0%,100%{transform:scale(1);} 50%{transform:scale(1.15);} }
  @keyframes popIn { 0%{opacity:0; transform:scale(0.85) translateY(20px);} 100%{opacity:1; transform:scale(1) translateY(0);} }

  .btn-main { border:none; cursor:pointer; font-family:'DM Sans',sans-serif; transition:0.25s; }
  .btn-main:hover { transform:translateY(-2px); }
  .btn-main:active { transform:scale(0.97); }

  .profile-card { cursor:pointer; transition:0.3s; }
  .profile-card:hover { transform:translateY(-8px) scale(1.03); }

  .mood-btn { cursor:pointer; transition:0.2s; border:none; }
  .mood-btn:hover { transform:translateY(-5px) scale(1.05); }

  .overlay { position:fixed; inset:0; background:rgba(0,0,0,0.5); display:flex; align-items:center; justify-content:center; }
`;

export default function App() {
  const [screen, setScreen] = useState("home");
  const [profile, setProfile] = useState(null);
  const [mood, setMood] = useState(null);

  const go = (s) => setScreen(s);

  const SKEB_MOODS = [
    { emoji:"😊", label:"Happy", msg:"You are loved and seen." },
    { emoji:"😔", label:"Sad", msg:"It’s okay to feel this. I’m here." },
  ];

  const LES_MOODS = [
    { emoji:"😰", label:"Overwhelmed", msg:"Take it one step at a time." },
    { emoji:"🥺", label:"Tired", msg:"Rest. You deserve it." },
  ];

  if (screen === "home") {
    return (
      <div>
        <style>{css}</style>

        <h1>Choose</h1>

        <div onClick={() => { setProfile("sk"); go("sk"); }}>
          <img src={SKEB_IMG} width="100" />
          Skebekwa
        </div>

        <div onClick={() => { setProfile("le"); go("le"); }}>
          <img src={LES_IMG} width="100" />
          Lesedi
        </div>
      </div>
    );
  }

  if (screen === "sk") {
    return (
      <div>
        <style>{css}</style>

        <h2>Skebekwa</h2>

        {SKEB_MOODS.map((m) => (
          <button
            key={m.label}
            onClick={() => setMood(m)}
            className="mood-btn"
          >
            {m.emoji} {m.label}
          </button>
        ))}

        {mood && (
          <div className="overlay">
            <div style={{ background:"#fff", padding:20 }}>
              <h3>{mood.label}</h3>
              <p>{mood.msg}</p>
              <button onClick={() => setMood(null)}>Close</button>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (screen === "le") {
    return (
      <div>
        <style>{css}</style>

        <h2>Lesedi</h2>

        {LES_MOODS.map((m) => (
          <button
            key={m.label}
            onClick={() => setMood(m)}
            className="mood-btn"
          >
            {m.emoji} {m.label}
          </button>
        ))}

        {mood && (
          <div className="overlay">
            <div style={{ background:"#fff", padding:20 }}>
              <h3>{mood.label}</h3>
              <p>{mood.msg}</p>
              <button onClick={() => setMood(null)}>Close</button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return null;
}

