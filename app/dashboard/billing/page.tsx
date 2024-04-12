import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import prisma from '@/lib/db'
import { CheckCircle2 } from 'lucide-react'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { getStripeSession } from '@/lib/stripe'
import { redirect } from 'next/navigation'
import { StripeSubmissionCreationBtn } from '@/components/SubmitBtns'

const featureItems = [
  { name: 'Lorem ipsum dolor sit amet' },
  { name: 'Lorem ipsum dolor sit amet' },
  { name: 'Lorem ipsum dolor sit amet' },
  { name: 'Lorem ipsum dolor sit amet' },
  { name: 'Lorem ipsum dolor sit amet' },
]

async function getData(userId: string) {
  const data = await prisma.subscription.findUnique({
    where: {
      userId: userId,
    },
    select: {
      status: true,
      user: {
        select: {
          stripeCustomerId: true,
        },
      },
    },
  })
  return data
}

export default async function page() {
  const { getUser } = getKindeServerSession()
  const user = await getUser()
  const data = await getData(user?.id as string)

  async function createSubscription() {
    'use server'
    const dbUser = await prisma.user.findUnique({
      where: {
        id: user?.id,
      },
      select: {
        stripeCustomerId: true,
      }
    })
    if (!dbUser?.stripeCustomerId) {
      throw new Error('Stripe customer id not found')
    }
    const subscriptionUrl = await getStripeSession({
      customerId: dbUser?.stripeCustomerId as string,
      domainUrl: 'http://localhost:3000',
      priceId: process.env.STRIPE_PRICE_ID as string,
    })

    return redirect(subscriptionUrl)
  }

  return (
    <div className="max-w-md mx-auto space-y-4">
      <Card className="flex flex-col">
        <CardContent className="py-8">
          <div>
            <h3 className="inline-flex px-4 py-1 rounded-full text-sm font-semibold tracking-wide uppercase bg-primary/10 text-primary">
              Monthly
            </h3>
          </div>
          <div className="mt-4 flex items-baseline text-6xl font-extrabold">
            $30{' '}
            <span className="ml-1 text-2xl font-medium text-muted-foreground">
              /mo
            </span>
          </div>
          <p className="mt-5 text-lg text-muted-foreground">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore,
            similique!
          </p>
        </CardContent>
        <div className="flex-1 flex flex-col justify-between px-6 pt-6 pb-8 bg-secondary rounded-lg m-1 space-y-6 sm:p-10 sm:pt-6">
          <ul className="space-y-4">
            {featureItems.map((item, index) => (
              <li className="flex items-center" key={index}>
                <div className="flex-shrink-0">
                  <CheckCircle2 className="h-6 w-6 text-green-500" />
                </div>
                <p className="ml-3 text-base">{item.name}</p>
              </li>
            ))}
          </ul>
          <form className="w-full" action={createSubscription}>
            <StripeSubmissionCreationBtn />
          </form>
        </div>
      </Card>
    </div>
  )
}