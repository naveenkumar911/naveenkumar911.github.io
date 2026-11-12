import { useEffect, useRef, useState, type ReactNode } from 'react';

type Msg = { role: 'user' | 'assistant'; content: string };

interface Props {
  endpoint: string;
  calcom: string;
  email: string;
}

const STARTERS = [
  'Summarise Naveen for a Head of AI role in 60 seconds.',
  'What has he actually shipped to production?',
  'How does he approach evaluation and governance for agents?',
  'Paste a job description and I will map it to evidence.',
];

function renderInline(text: string) {
  // minimal markdown: **bold**, [text](url), line breaks. Links limited to same-site or https.
  const parts: ReactNode[] = [];
  const re = /(\*\*[^*]+\*\*)|(\[[^\]]+\]\((\/[^)\s]*|https?:\/\/[^)\s]+)\))|<?(https?:\/\/[^\s<>)]+)>?/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  const link = (href: string, label: string) => {
    const external = href.startsWith('http');
    return (
      <a key={k++} href={href} className="underline underline-offset-2" target={external ? '_blank' : undefined} rel={external ? 'noopener' : undefined}>
        {label}
      </a>
    );
  };
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    if (m[1]) parts.push(<strong key={k++}>{m[1].slice(2, -2)}</strong>);
    else if (m[2]) parts.push(link(m[3], m[2].slice(1, m[2].indexOf(']('))));
    else if (m[4]) parts.push(link(m[4], m[4].replace(/^https?:\/\//, '')));
    last = re.lastIndex;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

function Message({ m }: { m: Msg }) {
  const lines = m.content.split('\n');
  return (
    <div className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[88%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-relaxed ${
          m.role === 'user' ? 'bg-accent-500 text-ink-950' : 'bg-[var(--bg)] border border-[var(--line)]'
        }`}
      >
        {lines.map((l, i) => (
          <span key={i}>
            {renderInline(l)}
            {i < lines.length - 1 ? '\n' : ''}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function ChatWidget({ endpoint, calcom, email }: Props) {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    document.addEventListener('open-chat', onOpen);
    return () => document.removeEventListener('open-chat', onOpen);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs, open]);

  const configured = Boolean(endpoint);

  async function send(text: string) {
    const content = text.trim();
    if (!content || busy) return;
    setErr(null);
    const next: Msg[] = [...msgs, { role: 'user', content }];
    setMsgs([...next, { role: 'assistant', content: '' }]);
    setInput('');
    setBusy(true);

    if (!configured) {
      setMsgs([
        ...next,
        {
          role: 'assistant',
          content:
            `The assistant is not connected yet (the Worker endpoint is not configured). In the meantime: [book a call](${calcom}) or email ${email}. Everything I would tell you is on this site: start with the [case studies](/case-studies).`,
        },
      ]);
      setBusy(false);
      return;
    }

    const ctrl = new AbortController();
    abortRef.current = ctrl;
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ messages: next.slice(-12) }),
        signal: ctrl.signal,
      });
      if (!res.ok || !res.body) {
        const t = await res.text().catch(() => '');
        throw new Error(t || `Request failed (${res.status})`);
      }
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let acc = '';
      let buf = '';
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buf += dec.decode(value, { stream: true });
        const events = buf.split('\n\n');
        buf = events.pop() ?? '';
        for (const ev of events) {
          const line = ev.split('\n').find((l) => l.startsWith('data:'));
          if (!line) continue;
          const data = line.slice(5).trim();
          if (data === '[DONE]') continue;
          try {
            const j = JSON.parse(data);
            if (j.error) throw new Error(j.error);
            const delta: string = j.delta ?? '';
            if (delta) {
              acc += delta;
              setMsgs([...next, { role: 'assistant', content: acc }]);
            }
          } catch (e) {
            if (e instanceof Error && e.message && !e.message.startsWith('Unexpected')) throw e;
          }
        }
      }
      if (!acc) setMsgs([...next, { role: 'assistant', content: 'I did not get a response. Please try again.' }]);
    } catch (e) {
      if ((e as Error).name === 'AbortError') return;
      const message = (e as Error).message || 'Something went wrong.';
      setErr(message);
      setMsgs([...next, { role: 'assistant', content: `Sorry, that failed: ${message}. You can [book a call](${calcom}) or email ${email}.` }]);
    } finally {
      setBusy(false);
      abortRef.current = null;
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        className="chat-launcher fixed bottom-[calc(5.25rem+env(safe-area-inset-bottom))] right-4 z-[60] flex min-h-12 min-w-12 items-center justify-center gap-2 rounded-full bg-accent-500 px-3.5 py-3 md:bottom-5 md:right-5 md:px-4 font-semibold text-ink-950 shadow-lg shadow-accent-500/30 transition hover:bg-accent-400 no-print"
        aria-expanded={open}
        aria-controls="ask-naveen-panel"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a8 8 0 0 1-8 8H8l-5 3 1.5-4.5A8 8 0 1 1 21 12Z" /></svg>
        <span className="hidden sm:inline">Ask Naveen's AI</span>
      </button>

      {open && (
        <div
          id="ask-naveen-panel"
          role="dialog"
          aria-label="Ask Naveen's AI"
          className="fixed inset-x-2 bottom-[calc(8.75rem+env(safe-area-inset-bottom))] top-20 z-[60] flex sm:inset-x-auto sm:right-4 sm:top-auto sm:h-[min(640px,calc(100dvh-11rem))] sm:w-[min(420px,calc(100vw-2rem))] md:bottom-20 md:h-[min(640px,calc(100dvh-6.5rem))] flex-col overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--bg-elev)] shadow-2xl no-print"
        >
          <div className="flex items-center justify-between border-b border-[var(--line)] px-4 py-3">
            <div>
              <div className="font-bold">Ask Naveen's AI</div>
              <div className="text-xs text-[var(--fg-muted)]">Grounded on this site. Not stored. Never discusses compensation.</div>
            </div>
            <button onClick={() => setOpen(false)} className="btn btn-ghost !p-2" aria-label="Close">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M18 6 6 18" /></svg>
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {msgs.length === 0 && (
              <div className="space-y-3">
                <p className="text-sm text-[var(--fg-muted)]">
                  I am a small governed agent built by Naveen. Ask about his experience, how he works, or paste a job description for an honest fit assessment.{' '}
                  <a className="underline" href="/case-studies/how-this-sites-ai-agent-is-built">How I am built.</a>
                </p>
                <div className="grid gap-2">
                  {STARTERS.map((s) => (
                    <button key={s} onClick={() => (s.startsWith('Paste') ? setInput('Here is the job description:\n\n') : send(s))} className="rounded-xl border border-[var(--line)] px-3 py-2 text-left text-sm hover:border-accent-500">
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {msgs.map((m, i) => <Message key={i} m={m} />)}
            {busy && msgs[msgs.length - 1]?.content === '' && (
              <div className="text-xs text-[var(--fg-muted)]">Thinking…</div>
            )}
            <div ref={bottomRef} />
          </div>

          <form
            className="border-t border-[var(--line)] p-3"
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
          >
            <div className="flex items-end gap-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    send(input);
                  }
                }}
                rows={input.length > 120 ? 5 : 2}
                maxLength={6000}
                placeholder="Ask a question or paste a job description…"
                className="flex-1 resize-none rounded-xl border border-[var(--line)] bg-[var(--bg)] px-3 py-2 text-sm outline-none focus:border-accent-500"
              />
              <button type="submit" disabled={busy || !input.trim()} className="btn btn-primary !px-3 !py-2 disabled:opacity-50" aria-label="Send">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7Z" /></svg>
              </button>
            </div>
            <div className="mt-2 flex items-center justify-between text-[11px] text-[var(--fg-muted)]">
              <span>{err ? 'Error. ' : ''}Shift+Enter for a new line.</span>
              <a className="underline" href={calcom} target="_blank" rel="noopener">Prefer a human? Book a call</a>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
