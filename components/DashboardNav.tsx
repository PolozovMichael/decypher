'use client'

import { cn } from '@/lib/utils'
import { CreditCardIcon, Home, Settings } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { navItems } from './UserNav'

export default function DashboardNav() {
  const pathName = usePathname()
  return (
    <nav className="grid items-start gap-2">
      {navItems.map((item, index) => (
        <Link key={index} href={item.href}>
          <span
            className={cn(
              'group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-all duration-300 ease-in-out',
              pathName === item.href
                ? 'bg-accent text-accent-foreground'
                : 'text-accent',
            )}
          >
            <item.icon className="mr-2 h-4 w-4" />
            <span>{item.name}</span>
          </span>
        </Link>
      ))}
    </nav>
  )
}
