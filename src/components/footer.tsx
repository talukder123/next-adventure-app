import Image from "next/image";
import NewsletterForm from "@/components/newsletter-form";

const quickLinks = ["Home", "Destinations", "My Bookings", "My Profile"];
const supportLinks = ["Help Center", "Terms of Service", "Privacy Policy"];

const socials = [
  {
    label: "X",
    href: "https://x.com",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.555V9h3.564v11.452zM17.79 0H2.21C.988 0 0 .974 0 2.175v19.65C0 23.026.988 24 2.21 24h15.58c1.222 0 2.21-.974 2.21-2.175V2.175C20 .974 19.012 0 17.79 0z",
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z",
  },
];

function Column({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="text-[13px] font-medium uppercase tracking-[0.08em] text-white">
        {title}
      </h3>
      <div className="mt-5 space-y-4">{children}</div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] px-5 pb-8 pt-16 sm:pt-20">
      <div className="mx-auto max-w-[1160px]">
        <Image
          src="/images/Wanderlast-1.png"
          alt="Wanderlast"
          width={542}
          height={80}
          className="h-12 w-auto sm:h-14"
        />
        <p className="mt-4 text-sm text-neutral-400">
          Your gateway to extraordinary travel experiences around the world.
        </p>

        <div className="mt-14 grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <h3 className="text-[13px] font-medium uppercase tracking-[0.08em] text-white">
              Newsletter
            </h3>
            <p className="mt-5 text-sm text-neutral-400">
              Subscribe for exclusive travel deals and inspiration.
            </p>
            <NewsletterForm />
          </div>

          <Column title="Quick Links">
            {quickLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="block text-sm text-neutral-400 transition-colors hover:text-white"
              >
                {link}
              </a>
            ))}
          </Column>

          <Column title="Support">
            {supportLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="block text-sm text-neutral-400 transition-colors hover:text-white"
              >
                {link}
              </a>
            ))}
          </Column>

          <Column title="Contact Us">
            <a
              href="tel:+17869011622"
              className="block text-sm text-neutral-400 transition-colors hover:text-white"
            >
              786 901 1622
            </a>
            <a
              href="mailto:info@wandarland.com"
              className="block text-sm text-neutral-400 transition-colors hover:text-white"
            >
              info@wandarland.com
            </a>
          </Column>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-neutral-400">
            © 2026 Wanderlast. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="text-neutral-400 transition-colors hover:text-white"
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="size-[18px]"
                  fill="currentColor"
                >
                  <path d={social.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
