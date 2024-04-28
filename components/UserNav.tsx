import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from '@kinde-oss/kinde-auth-nextjs/components'
import { CreditCardIcon, DoorClosed, Home, Settings } from 'lucide-react'

export const navItems = [
  { name: 'Home', href: '/dashboard', icon: Home },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
]

interface UserNavProps {
  name: string
  email: string
  image: string
}

export default function UserNav({ name, email, image }: UserNavProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-10 w-10 rounded-full focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          <Avatar className="h-10 w-10 rounded-full">
            <AvatarImage src={image} alt="avatar" />
            <AvatarFallback>{name.slice(0, 1)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-50" align="end" forceMount>
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none ">{name}</p>
            <p className="text-sw leading-none text-muted-foreground">
              {email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {navItems.map((item, index) => (
            <DropdownMenuItem asChild key={index}>
              <Link
                href={item.href}
                className="w-full justify-start items-center gap-2 cursor-pointer"
              >
                <span>
                  <item.icon className="w-4 h-4" />
                </span>
                {item.name}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          asChild
          className="cursor-pointer w-full flex justify-start items-center gap-2"
        >
          <LogoutLink>
            <span>
              <DoorClosed className="w-4 h-4" />
            </span>
            Logout
          </LogoutLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
