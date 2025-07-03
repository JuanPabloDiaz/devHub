/**
Renders a navigation component with a sticky header, containing a logo and a link to take a quiz.
@component
@returns {JSX.Element} The rendered navigation component.
*/

import Link from 'next/link'
import { Container } from '.'
import { TbBrandGithub, TbCode, TbTerminal2 } from 'react-icons/tb'

export const Navigation = () => {
  return (
    <div className="sticky top-0 glassmorphism z-50 shadow-md border-b border-[#00ffaa]/20">
      <Container className="flex justify-between items-center py-3" as="nav">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold text-[#00ffaa] hover:text-[#00d791] transition-colors"
        >
          <TbTerminal2 className="text-2xl" />
          <span className="font-mono tracking-tight">
            <span className="text-[#00ffaa]">Dev</span>
            <span className="text-gray-900 dark:text-gray-100">Hub</span>
            <span className="text-[#00ffaa] animate-blink">_</span>
          </span>
        </Link>

        <div className="flex gap-4 items-center">
          <Link
            href="/"
            className="hidden sm:flex items-center gap-1 font-medium text-gray-700 dark:text-gray-300 hover:text-[#00ffaa] dark:hover:text-[#00ffaa] transition-colors"
          >
            <TbCode className="text-lg" />
            <span>Resources</span>
          </Link>
          <Link
            href="https://github.com/JuanPabloDiaz/devHub"
            className="flex items-center gap-1 font-medium text-gray-700 dark:text-gray-300 hover:text-[#00ffaa] dark:hover:text-[#00ffaa] transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <TbBrandGithub className="text-lg" />
            <span className="hidden sm:block">GitHub</span>
          </Link>
        </div>
      </Container>
    </div>
  )
}
