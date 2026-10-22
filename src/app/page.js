import CountDown from "@/components/elements/CountDown";
import MatrixRain from "@/components/elements/MatrixRain";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { defaultDomain, domains } from "@/config/domain";
import { headers } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";
import "../styles/hacker.css";

export const dynamic = "force-dynamic";

async function getCurrentDomain() {
  const headerList = await headers();
  const hostname = (headerList.get("host") ?? "")
    .toLowerCase()
    .replace(/:\d+$/, "")
    .replace(/^www\./, "");

  if (process.env.NODE_ENV !== "production" && ["localhost", "127.0.0.1"].includes(hostname)) {
    return domains[defaultDomain] ?? null;
  }

  return domains[hostname] ?? null;
}

export async function generateMetadata() {
  const config = await getCurrentDomain();

  if (!config) {
    return {
      title: "Domain Not Found",
      robots: { index: false, follow: false },
    };
  }

  if (config.metadata) {
    return config.metadata;
  }

  return {
    title: `${config.title} | ${config.name}`,
    description: config.description,
    robots: { index: false, follow: false },
  };
}

const logs = [
  "Initializing system...",
  "Checking domain configuration...",
  "Status: OK",
  "Loading resources...",
  "Preparing the next phase...",
];

function TerminalPanel({ domain }) {
  return (
    <Card className="terminal-panel corner-frame relative z-10 w-full max-w-sm gap-0 rounded-none border-primary/25 bg-black/70 p-4 shadow-none sm:p-5">
      <div className="mb-4 flex items-center justify-between border-b border-primary/20 pb-3">
        <span className="font-mono text-[10px] text-primary">root@{domain}:~#</span>
        <div className="flex gap-1.5">
          <span className="size-2 rounded-full border border-primary/60" />
          <span className="size-2 rounded-full border border-primary/60" />
          <span className="size-2 rounded-full bg-primary" />
        </div>
      </div>

      <div className="space-y-2 font-mono text-[10px] leading-relaxed text-primary/80 sm:text-xs">
        <p className="terminal-log text-muted-foreground">
          <span className="mr-2 text-primary">$</span>
          ./boot --verbose
        </p>

        {logs.map((log, index) => (
          <p
            key={log}
            className="terminal-log"
            style={{ animationDelay: `${(index + 1) * 220}ms` }}
          >
            <span className="mr-2 text-primary">&gt;</span>
            {log}
          </p>
        ))}

        <p className="text-primary">
          <span className="mr-2">&gt;</span>
          {domain}
          <span className="terminal-cursor ml-1">█</span>
        </p>
      </div>
    </Card>
  );
}

export default async function HomePage() {
  const config = await getCurrentDomain();

  if (!config) notFound();

  return (
    // lg:h-dvh -> di desktop tinggi halaman dikunci satu layar (tidak bisa di-scroll).
    // Di mobile/tablet tetap min-h-dvh supaya konten boleh memanjang jika perlu.
    <main className="hacker-page relative flex min-h-dvh flex-col overflow-hidden bg-background px-5 py-5 text-foreground sm:px-8 sm:py-7 2xl:h-dvh">
      {/* Layer background */}
      <MatrixRain />
      <div className="hacker-grid pointer-events-none absolute inset-0" />
      <div className="hacker-glow pointer-events-none absolute left-1/2 top-1/2" />
      <div className="scanlines pointer-events-none absolute inset-0" />

      <header className="relative z-10 flex items-center justify-between gap-4 pb-4">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-3 font-mono text-[10px] font-semibold tracking-widest text-primary sm:text-xs"
        >
          <span className="shrink-0 tracking-[-0.2em]">{"//////"}</span>
          <span className="truncate">{config.name}</span>
        </Link>

        <Badge
          variant="outline"
          className="shrink-0 gap-2 rounded-none border-primary/40 bg-primary/5 px-3 py-1.5 font-mono text-[9px] tracking-widest text-primary sm:text-[10px]"
        >
          <span className="size-1.5 animate-pulse bg-primary" />
          COMING SOON
        </Badge>
      </header>

      {/* min-h-0 + lg:py-4 -> section boleh menyusut di desktop agar tidak mendorong tinggi halaman */}
      <section className="relative z-10 mx-auto flex min-h-0 w-full max-w-6xl flex-1 flex-col items-center justify-center py-12 sm:py-16 lg:py-4">
        <div className="hero-content w-full max-w-2xl text-center">
          <Badge
            variant="outline"
            className="gap-2 rounded-none border-primary/50 bg-primary/6 px-4 py-4 font-mono text-[10px] tracking-[0.12em] text-primary sm:text-xs"
          >
            <span className="size-2 animate-pulse bg-primary shadow-[0_0_10px_var(--primary)]" />
            {config.badge}
          </Badge>

          {/* Ukuran judul di desktop mengikuti tinggi layar: min 3rem, maks 4.5rem */}
          <h1
            data-text={config.title}
            className="glitch-title mt-7 text-balance font-mono text-4xl font-bold uppercase leading-tight tracking-tight sm:text-6xl lg:mt-5 lg:text-[clamp(3rem,10vh,4.5rem)]"
          >
            {config.title}
            <span className="terminal-cursor text-primary">_</span>
          </h1>

          <div className="mt-6 flex items-center justify-center gap-3 font-mono text-sm tracking-widest text-primary sm:text-base lg:mt-4">
            <span className="opacity-50">[</span>
            <span className="break-all">{config.name}</span>
            <span className="opacity-50">]</span>
          </div>

          <p className="mx-auto mt-6 max-w-xl font-mono text-xs leading-7 text-muted-foreground sm:text-sm sm:leading-8 lg:mt-4">
            <span className="text-primary">&gt; </span>
            {config.description}
          </p>

          <div className="corner-frame mx-auto mt-10 max-w-xl border border-primary/20 bg-black/60 p-4 text-left backdrop-blur-sm lg:mt-6">
            <div className="mb-3 flex items-center justify-between gap-3 font-mono text-[9px] tracking-widest text-muted-foreground sm:text-[10px]">
              <span>TIME UNTIL LAUNCH</span>
              <span className="flex items-center gap-2 text-primary">
                <span className="size-1.5 animate-pulse bg-primary" />
                LIVE COUNTDOWN
              </span>
            </div>

            <CountDown targetDate={config.launchAt} />
          </div>

          <div className="mt-8 flex items-center justify-center gap-3 font-mono text-[9px] tracking-[0.12em] text-muted-foreground sm:text-[10px] lg:mt-5">
            <span className="text-primary">[+]</span>
            BUILDING SOMETHING GREAT
            <span className="animate-pulse text-primary">...</span>
          </div>
        </div>
      </section>

      <footer className="relative z-10 mt-auto">
        {/* <Separator className="mb-4 bg-primary/20" /> */}

        <div className="flex flex-col items-start justify-between gap-3 font-mono text-[9px] tracking-wider text-muted-foreground sm:flex-row sm:items-center sm:text-[10px]">
          <div className="flex flex-wrap items-center gap-2 text-primary">
            <span className="size-1.5 bg-primary" />
            <span>[ ONLINE ]</span>
            <span className="text-muted-foreground">{"// CONNECTION ACTIVE"}</span>
          </div>

          <p>
            © {new Date().getFullYear()} {config.name}. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
