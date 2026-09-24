import React from 'react';
import Link from 'next/link';
import { BRAND } from '@barber/shared';
import { Wordmark } from './Navbar';

const COLUMNS = [
  {
    title: 'Explore',
    links: [
      { href: '/services', label: 'Menu and prices' },
      { href: '/gentlemen', label: 'Barbers' },
      { href: '/about', label: 'Our story' },
    ],
  },
  {
    title: 'Appointments',
    links: [
      { href: '/book', label: 'Book a chair', id: 'footer-book-cta' },
      { href: '/manage', label: 'Change or cancel' },
      { href: '/visit', label: 'Getting here' },
    ],
  },
];

export function Footer() {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${BRAND.name}, ${BRAND.location.address}, ${BRAND.location.city}`
  )}`;

  return (
    <footer className="bg-mist text-ink-2 t-fine">
      <div className="shell">
        <div className="pt-10 pb-8 border-t border-hairline">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-8 pb-8 border-b border-hairline">
            <div className="col-span-2 md:col-span-1 space-y-3">
              <Link href="/" className="text-ink inline-block" aria-label="Home">
                <Wordmark className="text-[1.0625rem]" />
              </Link>
              <p className="max-w-[26ch]">
                A barbershop in Avondale, Harare, where every appointment gets the whole hour.
              </p>
            </div>

            {COLUMNS.map(col => (
              <div key={col.title}>
                <h2 className="text-ink font-semibold mb-2.5">{col.title}</h2>
                <ul className="space-y-2">
                  {col.links.map(link => (
                    <li key={link.href}>
                      <Link id={link.id} href={link.href} className="hover:text-ink hover:underline underline-offset-2">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="col-span-2 md:col-span-1">
              <h2 className="text-ink font-semibold mb-2.5">Studio</h2>
              <address className="not-italic space-y-2">
                <a href={mapsUrl} target="_blank" rel="noreferrer" className="block hover:text-ink hover:underline underline-offset-2">
                  {BRAND.location.address}, {BRAND.location.city}
                </a>
                <a href={`tel:${BRAND.location.phone.replace(/\s/g, '')}`} className="block hover:text-ink hover:underline underline-offset-2">
                  {BRAND.location.phone}
                </a>
                <a href={`mailto:${BRAND.location.email}`} className="block hover:text-ink hover:underline underline-offset-2 break-all">
                  {BRAND.location.email}
                </a>
              </address>
            </div>
          </div>

          <div className="pt-5 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p>Copyright © {new Date().getFullYear()} Gentleman’s Grooming Bar. All rights reserved.</p>
            <div className="flex items-center divide-x divide-hairline">
              <Link href="/privacy" id="footer-privacy-link" className="pr-3 hover:text-ink hover:underline underline-offset-2">
                Privacy
              </Link>
              <Link href="/terms" id="footer-terms-link" className="pl-3 pr-3 hover:text-ink hover:underline underline-offset-2">
                Terms
              </Link>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="pl-3 hover:text-ink hover:underline underline-offset-2">
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
