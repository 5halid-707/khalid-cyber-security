import { NextResponse } from "next/server";
import { execSync } from "child_process";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";
export const revalidate = 0;

/**
 * Returns a build/version identifier.
 * Combines: latest git commit hash (if available) + package.json version +
 * last-modified time of key source files. This lets the AutoUpdater client
 * detect when the site has been updated and reload automatically.
 */
export async function GET() {
  let gitHash = "unknown";
  try {
    gitHash = execSync("git rev-parse --short HEAD 2>/dev/null", {
      encoding: "utf8",
    }).trim();
  } catch {
    gitHash = "nogit";
  }

  // Compute a fingerprint from the most-recent mtime of source files
  let srcMtime = 0;
  try {
    const srcDir = path.join(process.cwd(), "src");
    const walk = (dir: string) => {
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) walk(full);
        else {
          const st = fs.statSync(full);
          if (st.mtimeMs > srcMtime) srcMtime = st.mtimeMs;
        }
      }
    };
    walk(srcDir);
  } catch {
    // ignore
  }

  // Read package version
  let pkgVersion = "0.0.0";
  try {
    pkgVersion = JSON.parse(
      fs.readFileSync(path.join(process.cwd(), "package.json"), "utf8")
    ).version;
  } catch {
    // ignore
  }

  const version = `${pkgVersion}-${gitHash}-${Math.floor(srcMtime)}`;

  return NextResponse.json(
    { version, gitHash, pkgVersion, builtAt: new Date().toISOString() },
    {
      headers: {
        "Cache-Control": "no-store, max-age=0",
        "Access-Control-Allow-Origin": "'self'",
      },
    }
  );
}
