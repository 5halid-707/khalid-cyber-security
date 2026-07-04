"use client";

import { useEffect } from "react";

/**
 * Site-wide auto-update mechanism.
 * Periodically checks if the page has been updated (by comparing a build
 * version hash served from /api/version). If changed, prompts user to reload
 * or auto-reloads when safe (e.g., no form input in progress).
 */

const CHECK_INTERVAL_MS = 5 * 60 * 1000; // 5 minutes
const RELOAD_BANNER_ID = "auto-update-banner";

export default function AutoUpdater() {
  useEffect(() => {
    let lastVersion: string | null = null;
    let mounted = true;

    const checkForUpdate = async () => {
      try {
        // Use a cache-busting query to always get fresh version
        const res = await fetch(`/api/version?t=${Date.now()}`, {
          cache: "no-store",
        });
        if (!res.ok) return;
        const data = await res.json();
        const version: string = data.version || "";
        if (!version) return;

        if (lastVersion === null) {
          // First check — just store the version
          lastVersion = version;
          return;
        }

        if (lastVersion !== version && mounted) {
          // Version changed — check if user is in middle of something
          const activeEl = document.activeElement;
          const isInteracting =
            activeEl &&
            (activeEl.tagName === "INPUT" ||
              activeEl.tagName === "TEXTAREA" ||
              (activeEl as HTMLElement).isContentEditable);

          if (isInteracting) {
            // Defer reload — show banner instead
            showBanner();
          } else {
            // Safe to reload
            window.location.reload();
          }
        }
      } catch {
        // Silent fail — don't bother user with update check errors
      }
    };

    const showBanner = () => {
      if (document.getElementById(RELOAD_BANNER_ID)) return;
      const banner = document.createElement("div");
      banner.id = RELOAD_BANNER_ID;
      banner.style.cssText =
        "position:fixed;bottom:90px;right:50%;transform:translateX(50%);z-index:9998;background:#0d1117;color:#fff;padding:12px 18px;border:1px solid #00ffcc;border-radius:10px;font-family:sans-serif;font-size:14px;box-shadow:0 0 20px rgba(0,255,204,0.3);display:flex;align-items:center;gap:10px;";
      banner.innerHTML =
        '<span>🔄 تم تحديث الموقع بنسخة جديدة</span>' +
        '<button id="reload-now-btn" style="background:#00ffcc;color:#05080f;border:none;padding:6px 14px;border-radius:6px;font-weight:bold;cursor:pointer;font-size:13px;">تحديث الآن</button>' +
        '<button id="reload-later-btn" style="background:transparent;color:#6b7280;border:1px solid #1f2937;padding:6px 10px;border-radius:6px;cursor:pointer;font-size:13px;">لاحقاً</button>';
      document.body.appendChild(banner);
      document.getElementById("reload-now-btn")?.addEventListener("click", () => {
        window.location.reload();
      });
      document.getElementById("reload-later-btn")?.addEventListener("click", () => {
        banner.remove();
      });
    };

    // Initial check + interval
    checkForUpdate();
    const id = setInterval(checkForUpdate, CHECK_INTERVAL_MS);

    return () => {
      mounted = false;
      clearInterval(id);
    };
  }, []);

  return null;
}
