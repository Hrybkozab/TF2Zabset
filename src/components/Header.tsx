import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import logoImg from "@/assets/tf2-logo.png";

const links = [
  { to: "/classes", label: "Classes" },
  { to: "/meta", label: "Meta" },
  { to: "/guides", label: "Guides" },
  { to: "/profile", label: "Connect" },
];

const mobileLinks = [{ to: "/about", label: "About" }, ...links];

export const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-gradient-dark border-b-4 border-primary text-surface-dark-foreground">
      <div className="container mx-auto flex items-center justify-between py-3 px-4">
        <div className="flex items-center gap-5">
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src={logoImg}
              alt="TF2 Guides logo"
              className="h-10 w-10 object-contain shadow-stamp-sm group-hover:rotate-6 transition-transform"
            />
            <div className="leading-none">
              <div className="font-display text-2xl tracking-wider">TF2 Guides</div>
            </div>
          </Link>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `hidden md:inline-block font-display tracking-wider uppercase text-lg px-3 py-2 transition-colors ${
                isActive ? "text-primary" : "hover:text-primary"
              }`
            }
          >
            About
          </NavLink>
        </div>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `font-display tracking-wider uppercase text-lg px-4 py-2 transition-colors ${
                  isActive ? "text-primary" : "hover:text-primary"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <button
          className="md:hidden p-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <nav className="md:hidden bg-surface-dark border-t border-primary/30 px-4 py-3 flex flex-col gap-1">
          {mobileLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `font-display text-xl uppercase px-3 py-2 ${isActive ? "text-primary" : ""}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
};
