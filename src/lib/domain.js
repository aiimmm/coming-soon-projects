import { defaultDomain, domains } from "../config/domain";

export function normalizeHostname(hostname = "") {
  return hostname
    .trim()
    .toLowerCase()
    .replace(/\.$/, "")
    .replace(/:\d+$/, "")
    .replace(/^www\./, "");
}

export function getDomainConfig(hostname = "") {
  const normalizedHostname = normalizeHostname(hostname);

  if (
    process.env.NODE_ENV !== "production" &&
    ["localhost", "127.0.0.1"].includes(normalizedHostname)
  ) {
    return domains[defaultDomain] ?? null;
  }

  return domains[normalizedHostname] ?? null;
}
