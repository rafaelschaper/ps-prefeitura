import Link from 'next/link'
import Image from 'next/image'

import navLogo from '../assets/img/nav-logo.png'
const navItems = [
  'Quem somos',
  'Projetos',
  'Documentos',
  'Comunicacao',
  'Contato',
]

export function SiteNavbar() {
  return (
    <header className="border-b border-stone-200 bg-[#f1eee8]">
      <div className="mx-auto flex min-h-14 max-w-5xl items-center justify-center px-6 sm:justify-between">
        <Image
          src={navLogo}
          alt="Logo"
          className="h-20 w-20 brightness-0 saturate-100"
         />

        <nav aria-label="Navegacao principal">
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 py-4 text-sm md:text-lg font-bold text-emerald-900">
            {navItems.map((item) => (
              <li key={item}>
                {item === 'Projetos' ? (
                  <Link className="transition hover:text-sky-700" href="/">
                    {item}
                  </Link>
                ) : (
                  <button
                    className="transition hover:text-sky-700"
                    type="button"
                  >
                    {item}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
