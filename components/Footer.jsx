/**
 * Footer component that appears at the bottom of every page
 * @component
 * @returns {JSX.Element} The rendered footer component
 */

import Link from 'next/link'
import { Container } from '.'
import { TbTerminal2, TbBrandGithub, TbCode, TbHeart } from 'react-icons/tb'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-b from-transparent to-gray-50/30 dark:to-gray-900/50 backdrop-blur-sm border-t border-gray-200/50 dark:border-[#00ffaa]/20 py-8 mt-12 relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-5 dark:opacity-10"></div>
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <TbTerminal2 className="text-2xl text-[#00ffaa]" />
            <span className="font-bold text-xl font-mono tracking-tight">
              <span className="text-[#00ffaa]">Dev</span>
              <span className="text-gray-900 dark:text-gray-100">Hub</span>
              <span className="text-[#00ffaa] animate-blink">_</span>
            </span>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <div className="flex gap-4 mb-3">
              <Link
                href="/"
                className="text-gray-600 dark:text-gray-400 hover:text-[#00ffaa] dark:hover:text-[#00ffaa] transition-colors font-mono"
              >
                Home
              </Link>
              <a
                href="https://github.com/JuanPabloDiaz/devHub"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-[#ff4082] dark:hover:text-[#ff4082] transition-colors flex items-center gap-1 font-mono"
              >
                <TbBrandGithub />
                <span>GitHub</span>
              </a>
            </div>

            <p className="text-gray-500 dark:text-gray-400 text-sm flex flex-wrap items-center gap-1 font-mono">
              <span className="text-gray-400 dark:text-gray-500">{'//'}</span>
              <span>Developed by</span>
              <Link
                href="https://github.com/JuanPabloDiaz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-[#5a00ff] dark:hover:text-[#5a00ff] transition-colors inline-flex items-center"
              >
                <span className="border-b border-dashed border-gray-400 hover:border-[#5a00ff]">Juan Diaz</span>
              </Link>
              <span className="mx-1">|</span>
              <span>© {currentYear} DevHub</span>
            </p>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
