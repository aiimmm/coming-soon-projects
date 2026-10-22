import MatrixRain from "@/components/elements/MatrixRain";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { headers } from "next/headers";
import "../styles/hacker.css";

export const metadata = {
  title: "404 | Domain Not Found",
  robots: { index: false, follow: false },
};

async function getRequestedHost() {
  try {
    const headerList = await headers();
    return (headerList.get("host") ?? "")
      .toLowerCase()
      .replace(/:\d+$/, "")
      .replace(/^www\./, "")
      .slice(0, 80);
  } catch {
    return "";
  }
}

export default async function NotFound() {
  const host = await getRequestedHost();
  const target = host || "unknown-host";

  const logs = [
    `Resolving ${target}...`,
    "Checking domain configuration...",
    "Status: NOT REGISTERED",
    "Access denied.",
  ];

  return (
    <main className="hacker-page relative flex min-h-dvh flex-col overflow-hidden bg-background px-5 py-5 text-foreground sm:px-8 sm:py-6">
      {/* Layer background */}
      <MatrixRain />
      <div className="hacker-grid pointer-events-none absolute inset-0" />
      <div className="hacker-glow pointer-events-none absolute left-1/2 top-1/2" />
      <div className="scanlines pointer-events-none absolute inset-0" />

      <header className="relative z-10 flex items-center justify-between gap-4 pb-4">
        <div className="flex min-w-0 items-center gap-3 font-mono text-[10px] font-semibold tracking-widest text-primary sm:text-xs">
          <span className="shrink-0 tracking-[-0.2em]">{"//////"}</span>
          <span className="truncate">{target}</span>
        </div>

        <Badge
          variant="outline"
          className="shrink-0 gap-2 rounded-none border-primary/40 bg-primary/5 px-3 py-1.5 font-mono text-[9px] tracking-widest text-primary sm:text-[10px]"
        >
          <span className="size-1.5 animate-pulse bg-primary" />
          ERROR 404
        </Badge>
      </header>

      <section className="relative z-10 mx-auto flex min-h-0 w-full max-w-6xl flex-1 flex-col items-center justify-center py-12 sm:py-16 lg:py-4">
        <div className="hero-content w-full max-w-2xl text-center">
          <Badge
            variant="outline"
            className="gap-2 rounded-none border-primary/50 bg-primary/6 px-4 py-4 font-mono text-[10px] tracking-[0.12em] text-primary sm:text-xs"
          >
            <span className="size-2 animate-pulse bg-primary shadow-[0_0_10px_var(--primary)]" />
            ACCESS DENIED
          </Badge>

          <h1
            data-text="404"
            className="glitch-title mt-7 font-mono text-7xl font-bold uppercase leading-none tracking-tight sm:text-8xl lg:mt-5 lg:text-[clamp(4rem,16vh,9rem)]"
          >
            404
            <span className="terminal-cursor text-primary">_</span>
          </h1>

          <div className="mt-6 flex items-center justify-center gap-3 font-mono text-sm tracking-widest text-primary sm:text-base lg:mt-4">
            <span className="opacity-50">[</span>
            <span>DOMAIN NOT FOUND</span>
            <span className="opacity-50">]</span>
          </div>

          <p className="mx-auto mt-6 max-w-xl font-mono text-xs leading-7 text-muted-foreground sm:text-sm sm:leading-8 lg:mt-4">
            <span className="text-primary">&gt; </span>
            This domain is not registered in our system. Please check the address and try again.
          </p>

          <Card className="terminal-panel corner-frame relative mx-auto mt-10 w-full max-w-md gap-0 rounded-none border-primary/25 bg-black/70 p-4 text-left shadow-none sm:p-5 lg:mt-6">
            <div className="mb-4 flex items-center justify-between border-b border-primary/20 pb-3">
              <span className="truncate font-mono text-[10px] text-primary">root@{target}:~#</span>
              <div className="flex shrink-0 gap-1.5">
                <span className="size-2 rounded-full border border-primary/60" />
                <span className="size-2 rounded-full border border-primary/60" />
                <span className="size-2 rounded-full bg-primary" />
              </div>
            </div>

            <div className="space-y-2 font-mono text-[10px] leading-relaxed text-primary/80 sm:text-xs">
              {logs.map((log, index) => (
                <p
                  key={log}
                  className="terminal-log break-all"
                  style={{ animationDelay: `${index * 260}ms` }}
                >
                  <span className="mr-2 text-primary">&gt;</span>
                  {log}
                </p>
              ))}

              <p className="text-primary">
                <span className="mr-2">&gt;</span>
                <span className="terminal-cursor">█</span>
              </p>
            </div>
          </Card>
        </div>
      </section>

      <footer className="relative z-10 mt-auto">
        {/* <Separator className="mb-4 bg-primary/20" /> */}

        <div className="flex flex-col items-start justify-between gap-3 font-mono text-[9px] tracking-wider text-muted-foreground sm:flex-row sm:items-center sm:text-[10px]">
          <div className="flex flex-wrap items-center gap-2 text-primary">
            <span className="size-1.5 bg-primary" />
            <span>[ OFFLINE ]</span>
            <span className="text-muted-foreground">{"// CONNECTION REFUSED"}</span>
          </div>

          <p>© {new Date().getFullYear()} All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
