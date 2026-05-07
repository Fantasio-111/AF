import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  Video,
  Lock,
  Globe2,
  Coins,
  ShieldCheck,
  MessageCircle,
  Crown,
  UserRound,
  Sparkles,
  Radio,
  Send,
  PhoneCall,
  PhoneOff,
  Gift,
  Wallet,
  Star,
  BadgeCheck,
  Flag,
  Settings,
  BarChart3,
} from "lucide-react";

const creators = [
  {
    id: 1,
    name: "Maya",
    age: 29,
    city: "Berlin",
    status: "Live öffentlich",
    viewers: 128,
    price: 25,
    match: 94,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80",
    tags: ["Dating", "Talk", "Musik"],
  },
  {
    id: 2,
    name: "Sofia",
    age: 35,
    city: "München",
    status: "Privat verfügbar",
    viewers: 64,
    price: 35,
    match: 88,
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80",
    tags: ["Lifestyle", "Q&A", "Premium"],
  },
  {
    id: 3,
    name: "Lea",
    age: 25,
    city: "Köln",
    status: "VIP Raum",
    viewers: 91,
    price: 45,
    match: 86,
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80",
    tags: ["Live", "Creator", "VIP"],
  },
];

const plans = [
  ["Free", "0 €", "Öffentliche Räume ansehen, begrenzter Chat"],
  ["Plus", "14,99 €/Monat", "Mehr Chat, Favoriten, bessere Sichtbarkeit"],
  ["VIP", "39,99 €/Monat", "Private Calls, VIP Räume, Premium-Support"],
];

const roadmap = [
  [Video, "Video-Infrastruktur", "Agora oder Twilio für 1:1 Video-Calls, öffentliche Livestreams und private Räume."],
  [Coins, "Coin-System", "Wallet, Coin-Pakete, Trinkgeld, private Minutenpreise und Creator-Auszahlungen."],
  [ShieldCheck, "18+ & Sicherheit", "Altersprüfung, Consent-Regeln, Melden, Blockieren, KI-Moderation, Audit-Logs."],
  [Lock, "Private Räume", "Einladungslinks, bezahlte private Sessions, Zeitlimit, Abbruch- und Refund-Regeln."],
  [BarChart3, "Creator Dashboard", "Umsatz, Zuschauer, Conversion, Auszahlungen und Performance-Statistiken."],
];

function Pill({ children }: { children: React.ReactNode }) {
  return <span className="rounded-full bg-white/20 px-3 py-1 text-sm backdrop-blur">{children}</span>;
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-3xl border bg-white shadow-sm ${className}`}>{children}</div>;
}

function Button({ children, onClick, variant = "primary", className = "" }: any) {
  const styles = variant === "primary" ? "bg-rose-500 text-white hover:bg-rose-600" : variant === "dark" ? "bg-slate-950 text-white hover:bg-slate-800" : "bg-slate-100 text-slate-900 hover:bg-slate-200";
  return <button onClick={onClick} className={`rounded-2xl px-4 py-3 font-semibold transition ${styles} ${className}`}>{children}</button>;
}

export default function LiveDatingPlatform() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [tab, setTab] = useState("live");
  const [selected, setSelected] = useState(creators[0]);
  const [coins, setCoins] = useState(250);
  const [plan, setPlan] = useState("Free");
  const [callActive, setCallActive] = useState(false);
  const [privateMode, setPrivateMode] = useState(false);
  const [toast, setToast] = useState("Willkommen bei HeartAI Live");
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState([
    { from: "Maya", text: "Willkommen im öffentlichen Live-Raum 👋" },
    { from: "System", text: "Bitte respektvoll bleiben. Dieser Bereich ist 18+ und wird moderiert." },
  ]);

  const nav = [
    ["live", Radio, "Live Räume"],
    ["private", Lock, "Privat Call"],
    ["chat", MessageCircle, "Chat"],
    ["wallet", Wallet, "Coins"],
    ["premium", Crown, "Premium"],
    ["creator", UserRound, "Creator"],
    ["safety", ShieldCheck, "Sicherheit"],
    ["plan", Settings, "Bauplan"],
    ["admin", ShieldCheck, "Admin"],
  ];

  const canStartPrivate = useMemo(() => coins >= selected.price, [coins, selected]);

  function sendMessage() {
    if (!draft.trim()) return;
    setMessages((items) => [...items, { from: "Du", text: draft.trim() }]);
    setDraft("");
    setTimeout(() => {
      setMessages((items) => [...items, { from: "KI-Moderator", text: "Nachricht geprüft. Alles wirkt respektvoll." }]);
    }, 300);
  }

  function startPublicRoom(creator: any) {
    setSelected(creator);
    setPrivateMode(false);
    setCallActive(true);
    setTab("live");
    setToast(`Öffentlicher Live-Raum von ${creator.name} geöffnet.`);
  }

  function startPrivateCall() {
    if (!canStartPrivate) {
      setToast("Nicht genug Coins für einen privaten Call. Bitte Coins aufladen.");
      setTab("wallet");
      return;
    }
    setCoins((value) => value - selected.price);
    setPrivateMode(true);
    setCallActive(true);
    setTab("private");
    setToast(`Privater Video-Call mit ${selected.name} gestartet. ${selected.price} Coins wurden reserviert.`);
  }

  function tip(amount: number) {
    if (coins < amount) {
      setToast("Nicht genug Coins für dieses Geschenk.");
      return;
    }
    setCoins((value) => value - amount);
    setToast(`${amount} Coins als Trinkgeld gesendet.`);
  }

  if (!loggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-rose-950 to-purple-950 p-4 text-white md:p-8">
        <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl items-center gap-8 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur">
              <ShieldCheck size={18} /> 18+ Live Dating · Moderiert · Sicher
            </div>
            <h1 className="text-5xl font-black tracking-tight md:text-7xl">HeartAI Live</h1>
            <p className="mt-5 max-w-xl text-lg text-white/75">Eine moderne Live-Dating Plattform mit öffentlichen Räumen, privaten Video-Calls, Coins, Creator-Profilen, Premium-Abos und KI-Moderation.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button onClick={() => setLoggedIn(true)} className="px-7">App benutzen</Button>
              <Button variant="secondary" onClick={() => { setLoggedIn(true); setTab("plan"); }}>Bauplan ansehen</Button>
            </div>
            <p className="mt-5 text-sm text-white/55">Hinweis: Der Prototyp ist 18+ ausgerichtet, aber ohne explizite Inhalte. Für echte Veröffentlichung brauchst du Altersprüfung, AGB, Datenschutz, Impressum und Moderationsregeln.</p>
          </motion.div>

          <div className="relative min-h-[620px] overflow-hidden rounded-[2rem] shadow-2xl">
            <img src={creators[0].image} className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            <div className="absolute left-5 top-5 flex gap-2">
              <span className="rounded-full bg-red-500 px-4 py-2 text-sm font-bold">LIVE</span>
              <span className="rounded-full bg-white/20 px-4 py-2 text-sm backdrop-blur">128 Zuschauer</span>
            </div>
            <div className="absolute bottom-0 p-7">
              <h2 className="text-4xl font-bold">Maya, 29</h2>
              <p className="mt-2 text-white/80">Öffentlicher Live-Raum · private Calls verfügbar</p>
              <div className="mt-4 flex gap-2"><Pill>Dating</Pill><Pill>Talk</Pill><Pill>VIP</Pill></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-purple-50 p-4 text-slate-950 md:p-8">
      <div className="mx-auto grid max-w-7xl gap-4 md:gap-6 lg:grid-cols-[280px_1fr]">
        <aside className="h-max rounded-3xl border bg-white p-4 shadow-sm md:p-5 lg:sticky lg:top-6">
          <div className="mb-6 flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-rose-500 text-white"><Heart fill="currentColor" /></div>
            <div><h1 className="text-xl font-black">HeartAI Live</h1><p className="text-xs text-slate-500">{plan} · {coins} Coins</p></div>
          </div>
          <nav className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-1">
            {nav.map(([key, Icon, label]: any) => (
              <button key={key} onClick={() => setTab(key)} className={`flex items-center gap-2 rounded-2xl px-4 py-3 text-left font-semibold transition ${tab === key ? "bg-rose-500 text-white" : "hover:bg-slate-100"}`}>
                <Icon size={18} /> {label}
              </button>
            ))}
          </nav>
          <div className="mt-5 rounded-3xl bg-rose-50 p-4 text-sm text-slate-600">
            <div className="mb-1 flex items-center gap-2 font-bold text-rose-700"><ShieldCheck size={18} /> Plattform-Regel</div>
            Nur 18+, respektvoller Umgang, Zustimmung, Melden/Blockieren und Moderation.
          </div>
        </aside>

        <main className="min-w-0">
          <header className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h2 className="text-3xl font-black tracking-tight md:text-4xl">
                {tab === "live" && "Öffentliche Live-Räume"}
                {tab === "private" && "Private Video-Calls"}
                {tab === "chat" && "Live Chat"}
                {tab === "wallet" && "Coin Wallet"}
                {tab === "premium" && "Premium & VIP"}
                {tab === "creator" && "Creator Dashboard"}
                {tab === "safety" && "Sicherheit & 18+"}
                {tab === "plan" && "Produktions-Bauplan"}
                {tab === "admin" && "Admin Steuerung"}
              </h2>
              <p className="mt-1 text-slate-500">{toast}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" onClick={() => setTab("wallet")}><Wallet className="mr-2 inline" size={18} /> {coins} Coins</Button>
              <Button onClick={() => tip(10)}><Gift className="mr-2 inline" size={18} /> 10 Coins senden</Button>
            </div>
          </header>

          {tab === "live" && (
            <div className="grid gap-4 md:gap-6 xl:grid-cols-[1fr_360px]">
              <Card className="overflow-hidden">
                <div className="relative min-h-[520px] bg-slate-900 md:min-h-[620px]">
                  <img src={selected.image} className="absolute inset-0 h-full w-full object-cover opacity-90" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                  <div className="absolute left-5 top-5 flex flex-wrap gap-2 text-white">
                    <span className="rounded-full bg-red-500 px-4 py-2 text-sm font-black">LIVE</span>
                    <span className="rounded-full bg-white/20 px-4 py-2 text-sm backdrop-blur"><Globe2 className="mr-1 inline" size={16} /> Öffentlich</span>
                    <span className="rounded-full bg-white/20 px-4 py-2 text-sm backdrop-blur">{selected.viewers} Zuschauer</span>
                  </div>
                  <div className="absolute bottom-0 w-full p-6 text-white">
                    <h3 className="text-4xl font-black">{selected.name}, {selected.age}</h3>
                    <p className="mt-2 text-white/80">{selected.city} · {selected.match}% KI-Match · {selected.status}</p>
                    <div className="mt-4 flex flex-wrap gap-2">{selected.tags.map((tag) => <Pill key={tag}>{tag}</Pill>)}</div>
                    <div className="mt-7 flex flex-wrap gap-3">
                      <Button onClick={startPrivateCall}><Lock className="mr-2 inline" size={18} /> Privat starten</Button>
                      <Button variant="secondary" onClick={() => setTab("chat")}><MessageCircle className="mr-2 inline" size={18} /> Chat öffnen</Button>
                      <Button variant="secondary" onClick={() => tip(25)}><Gift className="mr-2 inline" size={18} /> Geschenk senden</Button>
                    </div>
                  </div>
                </div>
              </Card>

              <div className="grid gap-4">
                {creators.map((creator) => (
                  <Card key={creator.id} className={`cursor-pointer overflow-hidden ${selected.id === creator.id ? "ring-2 ring-rose-400" : ""}`}>
                    <button onClick={() => startPublicRoom(creator)} className="grid w-full grid-cols-[100px_1fr] text-left">
                      <img src={creator.image} className="h-28 w-full object-cover" />
                      <div className="p-4">
                        <div className="flex items-center gap-1 font-bold">{creator.name}, {creator.age} <BadgeCheck className="text-rose-500" size={16} /></div>
                        <p className="text-sm text-slate-500">{creator.status}</p>
                        <p className="mt-2 text-sm font-semibold">{creator.viewers} Zuschauer · {creator.price} Coins/min privat</p>
                      </div>
                    </button>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {tab === "private" && (
            <div className="grid gap-4 md:gap-6 xl:grid-cols-[1fr_360px]">
              <Card className="overflow-hidden bg-slate-950 text-white">
                <div className="relative grid min-h-[520px] place-items-center md:min-h-[620px]">
                  {!callActive ? (
                    <div className="p-8 text-center">
                      <div className="mx-auto mb-5 grid h-20 w-20 place-items-center rounded-full bg-rose-500"><Video size={34} /></div>
                      <h3 className="text-3xl font-black">Privaten Video-Call starten</h3>
                      <p className="mx-auto mt-3 max-w-lg text-white/65">Ein privater Call reserviert Coins pro Minute. In der echten App läuft hier WebRTC über Agora oder Twilio.</p>
                      <Button onClick={startPrivateCall} className="mt-7"><PhoneCall className="mr-2 inline" size={18} /> Call starten</Button>
                    </div>
                  ) : (
                    <div className="relative h-full min-h-[520px] w-full md:min-h-[620px]">
                      <img src={selected.image} className="absolute inset-0 h-full w-full object-cover opacity-80" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                      <div className="absolute left-5 top-5 rounded-full bg-white/15 px-4 py-2 text-sm backdrop-blur">{privateMode ? "Privater Call" : "Öffentlicher Raum"}</div>
                      <div className="absolute right-5 top-5 h-36 w-28 overflow-hidden rounded-3xl border-2 border-white/40 bg-gradient-to-br from-rose-400 to-purple-500 p-4 text-center font-black">DU</div>
                      <div className="absolute bottom-0 w-full p-6">
                        <h3 className="text-4xl font-black">Call mit {selected.name}</h3>
                        <p className="mt-2 text-white/75">Coins verbleibend: {coins}. Moderation und Abbruchfunktion aktiv.</p>
                        <div className="mt-6 flex flex-wrap justify-center gap-3">
                          <Button onClick={() => tip(25)}><Gift className="mr-2 inline" size={18} /> Geschenk</Button>
                          <Button variant="secondary" onClick={() => setToast("Creator wurde gemeldet. Support prüft den Fall.")}><Flag className="mr-2 inline" size={18} /> Melden</Button>
                          <Button variant="dark" onClick={() => { setCallActive(false); setPrivateMode(false); setToast("Call beendet."); }}><PhoneOff className="mr-2 inline" size={18} /> Beenden</Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </Card>

              <Card className="p-5">
                <h3 className="text-xl font-black">Private Session</h3>
                <p className="mt-2 text-slate-600">Creator: {selected.name}</p>
                <p className="text-slate-600">Preis: {selected.price} Coins/min</p>
                <p className="text-slate-600">Dein Guthaben: {coins} Coins</p>
                <div className="mt-5 rounded-2xl bg-amber-50 p-4 text-sm text-amber-800">Nur mit Zustimmung, 18+ Prüfung und klaren Plattformregeln. Keine Aufzeichnung ohne Einwilligung.</div>
              </Card>
            </div>
          )}

          {tab === "chat" && (
            <Card className="p-5">
              <div className="space-y-3">
                {messages.map((message, i) => (
                  <div key={i} className={`max-w-2xl rounded-3xl p-4 ${message.from === "Du" ? "ml-auto bg-rose-500 text-white" : message.from === "System" || message.from === "KI-Moderator" ? "bg-purple-50 text-purple-950" : "bg-slate-100"}`}>
                    <div className="mb-1 text-xs font-bold opacity-70">{message.from}</div>
                    {message.text}
                  </div>
                ))}
              </div>
              <div className="mt-5 flex gap-3">
                <input value={draft} onChange={(e) => setDraft(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendMessage()} placeholder="Nachricht schreiben..." className="flex-1 rounded-2xl border px-4 py-3 outline-none" />
                <Button onClick={sendMessage}><Send size={18} /></Button>
              </div>
            </Card>
          )}

          {tab === "wallet" && (
            <div className="grid gap-5 md:grid-cols-3">
              {[[100, "4,99 €"], [500, "19,99 €"], [1500, "49,99 €"]].map(([amount, price]: any) => (
                <Card key={amount} className="p-6">
                  <Coins className="text-rose-500" size={34} />
                  <h3 className="mt-4 text-3xl font-black">{amount} Coins</h3>
                  <p className="mt-2 text-slate-500">{price}</p>
                  <Button className="mt-6 w-full" onClick={() => { setCoins((v) => v + amount); setToast(`${amount} Coins aufgeladen. In Produktion läuft hier Stripe Checkout.`); }}>Aufladen</Button>
                </Card>
              ))}
            </div>
          )}

          {tab === "premium" && (
            <div className="grid gap-5 md:grid-cols-3">
              {plans.map(([name, price, text]) => (
                <Card key={name} className={`p-6 ${plan === name ? "ring-2 ring-rose-400" : ""}`}>
                  <Crown className="text-rose-500" size={32} />
                  <h3 className="mt-3 text-2xl font-black">{name}</h3>
                  <p className="mt-3 text-3xl font-black">{price}</p>
                  <p className="mt-3 min-h-16 text-slate-600">{text}</p>
                  <Button className="mt-6 w-full" onClick={() => { setPlan(name); setToast(`${name} aktiviert. In Produktion öffnet sich Stripe.`); }}>{plan === name ? "Aktiv" : "Auswählen"}</Button>
                </Card>
              ))}
            </div>
          )}

          {tab === "creator" && (
            <div className="grid gap-5 lg:grid-cols-3">
              <Card className="p-6 lg:col-span-2">
                <h3 className="text-2xl font-black">Creator Dashboard</h3>
                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  <div className="rounded-3xl bg-slate-50 p-5"><p className="text-sm text-slate-500">Heute Umsatz</p><p className="text-3xl font-black">248 €</p></div>
                  <div className="rounded-3xl bg-slate-50 p-5"><p className="text-sm text-slate-500">Private Minuten</p><p className="text-3xl font-black">186</p></div>
                  <div className="rounded-3xl bg-slate-50 p-5"><p className="text-sm text-slate-500">Follower</p><p className="text-3xl font-black">3.842</p></div>
                </div>
                <div className="mt-6 rounded-3xl bg-slate-950 p-5 text-white">
                  <h4 className="font-bold">Auszahlungsstatus</h4>
                  <p className="mt-2 text-white/70">Nächste Auszahlung: 15. des Monats. Plattformgebühr und Steuern müssen rechtlich sauber geregelt werden.</p>
                </div>
              </Card>
              <Card className="p-6">
                <h3 className="text-xl font-black">Live gehen</h3>
                <p className="mt-2 text-slate-600">Öffentlichen Raum starten oder private Verfügbarkeit aktivieren.</p>
                <Button className="mt-5 w-full" onClick={() => setToast("Creator ist jetzt öffentlich live.")}><Radio className="mr-2 inline" size={18} /> Öffentlich live</Button>
                <Button variant="secondary" className="mt-3 w-full" onClick={() => setToast("Private Verfügbarkeit aktiviert.")}><Lock className="mr-2 inline" size={18} /> Privat verfügbar</Button>
              </Card>
            </div>
          )}

          {tab === "safety" && (
            <div className="grid gap-5 md:grid-cols-2">
              {["18+ Altersprüfung", "Consent-Regeln", "KI-Moderation", "Melden & Blockieren", "Anti-Fake Prüfung", "DSGVO & Datenschutz"].map((item) => (
                <Card key={item} className="p-5"><ShieldCheck className="mb-3 text-rose-500" /><h3 className="text-xl font-black">{item}</h3><p className="mt-2 text-slate-600">Pflicht für eine sichere, rechtlich saubere und vertrauenswürdige Plattform.</p></Card>
              ))}
            </div>
          )}

          {tab === "admin" && (
            <div className="grid gap-5">
              <div className="grid gap-5 md:grid-cols-4">
                {[
                  ["Nutzer", "12.842", "Aktive Accounts"],
                  ["Creator", "318", "Verifiziert"],
                  ["Live Räume", "47", "Gerade online"],
                  ["Offene Reports", "23", "Zu prüfen"],
                ].map(([label, value, sub]) => (
                  <Card key={label} className="p-5">
                    <p className="text-sm text-slate-500">{label}</p>
                    <p className="mt-2 text-3xl font-black">{value}</p>
                    <p className="text-sm text-slate-500">{sub}</p>
                  </Card>
                ))}
              </div>

              <div className="grid gap-5 lg:grid-cols-2">
                <Card className="p-5">
                  <h3 className="text-2xl font-black">Live-Räume steuern</h3>
                  <div className="mt-4 space-y-3">
                    {creators.map((creator) => (
                      <div key={creator.id} className="flex flex-col justify-between gap-3 rounded-2xl bg-slate-50 p-4 sm:flex-row sm:items-center">
                        <div className="flex items-center gap-3">
                          <img src={creator.image} className="h-12 w-12 rounded-2xl object-cover" />
                          <div>
                            <p className="font-bold">{creator.name}</p>
                            <p className="text-sm text-slate-500">{creator.status} · {creator.viewers} Zuschauer</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="secondary" onClick={() => setToast(`${creator.name} wurde hervorgehoben.`)}>Push</Button>
                          <Button variant="dark" onClick={() => setToast(`Live-Raum von ${creator.name} pausiert.`)}>Stop</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-5">
                  <h3 className="text-2xl font-black">Moderation</h3>
                  <div className="mt-4 space-y-3">
                    {[
                      ["Report #1042", "Unangemessene Nachricht", "Hoch"],
                      ["Report #1043", "Fake-Profil Verdacht", "Mittel"],
                      ["Report #1044", "Zahlungsproblem", "Niedrig"],
                    ].map(([id, reason, level]) => (
                      <div key={id} className="rounded-2xl bg-slate-50 p-4">
                        <div className="flex items-center justify-between"><b>{id}</b><span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-bold text-rose-700">{level}</span></div>
                        <p className="mt-1 text-sm text-slate-600">{reason}</p>
                        <div className="mt-3 flex gap-2">
                          <Button variant="secondary" onClick={() => setToast(`${id} geprüft und geschlossen.`)}>Schließen</Button>
                          <Button onClick={() => setToast(`${id}: Nutzer wurde temporär gesperrt.`)}>Sperren</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              <div className="grid gap-5 lg:grid-cols-3">
                <Card className="p-5"><h3 className="text-xl font-black">Coins & Zahlungen</h3><p className="mt-2 text-slate-600">Pakete, Preise, Refunds, Stripe-Status und Creator-Auszahlungen verwalten.</p><Button className="mt-5 w-full" onClick={() => setToast("Coin-Paket wurde geändert.")}>Coin-Paket bearbeiten</Button></Card>
                <Card className="p-5"><h3 className="text-xl font-black">Creator Freigabe</h3><p className="mt-2 text-slate-600">Ausweisprüfung, Profilcheck, Bankdaten und Steuerdaten prüfen.</p><Button className="mt-5 w-full" onClick={() => setToast("Creator wurde verifiziert.")}>Creator verifizieren</Button></Card>
                <Card className="p-5"><h3 className="text-xl font-black">App Einstellungen</h3><p className="mt-2 text-slate-600">Mindestalter, Länder, Gebühren, Moderationsregeln und Feature-Schalter.</p><Button className="mt-5 w-full" onClick={() => setToast("App-Einstellung gespeichert.")}>Speichern</Button></Card>
              </div>

              <Card className="bg-slate-950 p-5 text-white">
                <h3 className="text-xl font-black">Admin-Rollen</h3>
                <pre className="mt-3 overflow-auto rounded-2xl bg-black/30 p-4 text-sm text-white/80">{`owner: volle Kontrolle über App, Zahlungen, Admins
admin: Nutzer, Creator, Räume, Reports verwalten
moderator: Chat, Reports, Sperren, Inhalte prüfen
support: Tickets, Refunds, Nutzerhilfe
creator_manager: Creator-Verifizierung und Auszahlungen`}</pre>
              </Card>
            </div>
          )}

          {tab === "plan" && (
            <div className="grid gap-5">
              {roadmap.map(([Icon, title, text]: any) => (
                <Card key={title} className="p-5">
                  <div className="flex gap-4"><div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-rose-100 text-rose-600"><Icon /></div><div><h3 className="text-xl font-black">{title}</h3><p className="mt-1 text-slate-600">{text}</p></div></div>
                </Card>
              ))}
              <Card className="bg-slate-950 p-5 text-white">
                <h3 className="text-xl font-black">Datenbankmodell</h3>
                <pre className="mt-3 overflow-auto rounded-2xl bg-black/30 p-4 text-sm text-white/80">{`users(id, email, role, age_verified, created_at)
profiles(id, user_id, display_name, age, city, bio, photos)
rooms(id, creator_id, type_public_or_private, status, price_per_minute)
streams(id, room_id, provider_channel_id, started_at, ended_at)
wallets(user_id, coin_balance)
transactions(id, user_id, amount, type, stripe_session_id)
tips(id, from_user, to_creator, coins, created_at)
private_calls(id, viewer_id, creator_id, started_at, ended_at, coins_spent)
messages(id, room_id, sender_id, body, moderation_status)
reports(id, reporter_id, target_id, reason, status)
subscriptions(id, user_id, stripe_customer_id, plan, status)`}</pre>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
