"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ArrowUpRight,
  Command,
  Search,
  SlidersHorizontal,
  ChevronsUpDown,
  Menu,
  Orbit,
  Radio,
  Layers3,
  Crosshair,
  UserRound,
  X,
  Globe2,
  Activity,
  Pause,
  Play,
} from "lucide-react";
import { organizations, searchWorkspace } from "@/lib/demo-data";
import { type Locale } from "@/lib/messages";
import { WorkspaceProvider, useWorkspace } from "./provider";
import { Modal, Avatar } from "./primitives";
import { DemoPlayback } from "./demo-playback";

export const navigation = [
  { href: "/my-work", title: "My Work", icon: UserRound },
  { href: "/live-feed", title: "Live Feed", icon: Activity },
  { href: "/workstreams", title: "Workstreams", icon: Layers3 },
  { href: "/mission-control", title: "Mission Control", icon: Radio },
  { href: "/team-focus", title: "Team Focus", icon: Crosshair },
];

function Shell({ children }: { children: ReactNode }) {
  const { t, locale, setLocale, org, orgId, setOrgId, playing, setPlaying } = useWorkspace();
  const pathname = usePathname();
  const router = useRouter();
  const [menu, setMenu] = useState(false);
  const sidebarRef = useRef<HTMLElement>(null);
  const [search, setSearch] = useState(false);
  const [settings, setSettings] = useState(false);
  const [query, setQuery] = useState("");
  const current = navigation.find((item) => pathname.startsWith(item.href));
  const results = searchWorkspace(orgId, query, locale);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  useEffect(() => {
    if (menu) sidebarRef.current?.querySelector("a")?.focus();
  }, [menu]);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearch((open) => !open);
      }
      if (event.key === "Escape") setMenu(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  function changeOrganization(id: string) {
    setOrgId(id);
    setQuery("");
    setSearch(false);
    setMenu(false);
    router.push("/mission-control");
  }

  return (
    <div className="workspace-shell">
      <a className="skip-link" href="#main-content">
        {t.skip}
      </a>
      {menu && (
        <button
          className="nav-backdrop"
          aria-label={t.close}
          onClick={() => setMenu(false)}
        />
      )}
      <aside
        ref={sidebarRef}
        id="workspace-navigation"
        className={`sidebar ${menu ? "open" : ""}`}
      >
        <Link
          href="/mission-control"
          className="brand"
          onClick={() => setMenu(false)}
        >
          <span className="brand-mark">
            <Orbit size={23} />
          </span>
          <span>
            corridor<span className="brand-period">.</span>
          </span>
        </Link>
        <label className="organization-picker">
          <span className="org-mark">{org.initials}</span>
          <span className="org-select-wrap">
            <span className="sr-only">{t.organization}</span>
            <select
              aria-label={t.organization}
              value={orgId}
              onChange={(event) => changeOrganization(event.target.value)}
            >
              {organizations.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            <span className="org-caption">{t.workspace}</span>
          </span>
          <ChevronsUpDown size={15} />
        </label>
        <div className="nav-label">WORKSPACE</div>
        <nav aria-label={t.workspace}>
          { ["WORKSPACE", "TEAM"].map((group) => (
          <div key={group} className={group === "TEAM" ? "nav-team" : "nav-workspace"}>
          {group === "TEAM" && <div className="nav-label">TEAM</div>}
          {navigation.filter((item) => (group === "TEAM") === ["/mission-control", "/team-focus"].includes(item.href)).map(({ href, title, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              aria-current={pathname.startsWith(href) ? "page" : undefined}
              className={`nav-item ${pathname.startsWith(href) ? "selected" : ""}`}
              onClick={() => setMenu(false)}
            >
              <Icon size={18} />
              <span>{title}</span>
              {pathname.startsWith(href) && <span className="nav-current" />}
            </Link>
          ))}
          </div>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <button
            className="profile-button"
            onClick={() => {
              setSettings(true);
              setMenu(false);
            }}
          >
            <Avatar id="min" />
            <span>
              <strong>Min</strong>
              <small>{t.settings}</small>
            </span>
            <SlidersHorizontal size={16} />
          </button>
        </div>
      </aside>
      <div className="workspace-main" inert={menu}>
        <div className="topbar">
          <div className="breadcrumb">
            <button
              className="icon-button mobile-menu"
              aria-label={menu ? t.close : t.menu}
              aria-expanded={menu}
              aria-controls="workspace-navigation"
              onClick={() => setMenu(!menu)}
            >
              {menu ? <X size={20} /> : <Menu size={20} />}
            </button>
            <span className="breadcrumb-org">{org.name}</span>
            <span className="breadcrumb-slash">/</span>
            {current?.href === pathname ? (
              <h1 className="topbar-title">{current.title}</h1>
            ) : (
              <strong className="topbar-title">{current?.title ?? "Corridor"}</strong>
            )}
          </div>
          <div className="topbar-actions">
            <button className="icon-button" aria-label={playing ? t.feedPause : t.feedResume} onClick={() => setPlaying(!playing)}>
              {playing ? <Pause size={16} /> : <Play size={16} />}
            </button>
            <button className="search-trigger" onClick={() => setSearch(true)}>
              <Search size={16} />
              <span>{t.search}</span>
              <kbd>
                <Command size={11} /> K
              </kbd>
            </button>
            <button
              className="locale-button"
              onClick={() => setLocale(locale === "ko" ? "en" : "ko")}
              aria-label={t.language}
            >
              <Globe2 size={15} />
              {locale === "ko" ? "EN" : "KO"}
            </button>
          </div>
        </div>
        <main id="main-content" key={orgId} tabIndex={-1}>
          <DemoPlayback />
          {children}
        </main>
      </div>
      {search && (
        <Modal
          title={t.searchTitle}
          onClose={() => {
            setSearch(false);
            setQuery("");
          }}
        >
          <div className="search-field">
            <Search size={20} />
            <input
              autoFocus
              aria-label={t.searchTitle}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t.search}
            />
          </div>
          <div
            className="search-results"
            aria-label={t.results}
            aria-live="polite"
          >
            {!query.trim() ? (
              <p className="empty-state">{t.searchHint}</p>
            ) : results.length ? (
              results.map((result) => (
                <Link
                  key={`${result.kind}-${result.id}`}
                  href={result.href}
                  onClick={() => {
                    setSearch(false);
                    setQuery("");
                  }}
                >
                  <span>
                    <small>{t[result.kind]}</small>
                    <strong>{result.title}</strong>
                  </span>
                  <ArrowUpRight size={17} />
                </Link>
              ))
            ) : (
              <p className="empty-state">{t.noResults}</p>
            )}
          </div>
        </Modal>
      )}
      {settings && (
        <Modal title={t.settings} onClose={() => setSettings(false)}>
          <div className="settings-content">
            <h3>{t.personalSettings}</h3>
            <div className="settings-row">
              <span>{t.account}</span>
              <span className="person">
                <Avatar id="min" small />
                Min
              </span>
            </div>
            <label className="settings-row">
              {t.language}
              <select
                value={locale}
                onChange={(event) => setLocale(event.target.value as Locale)}
              >
                <option value="ko">한국어</option>
                <option value="en">English</option>
              </select>
            </label>
            <h3>{t.organizationSettings}</h3>
            <label className="settings-row">
              {t.organization}
              <select
                value={orgId}
                onChange={(event) => changeOrganization(event.target.value)}
              >
                {organizations.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </label>
            <p className="notice">{t.settingsHint}</p>
          </div>
        </Modal>
      )}
    </div>
  );
}

export function WorkspaceShell({ children }: { children: ReactNode }) {
  return (
    <WorkspaceProvider>
      <Shell>{children}</Shell>
    </WorkspaceProvider>
  );
}
