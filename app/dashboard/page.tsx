import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import FormUrl from '@/components/FormUrl'

export default async function Home() {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  return (
    <div className="grid items-start gap-8">
      <div className="flex items-center justify-between px-2">
        <div className="grid gap-1">
          <h1 className="text-3xl md:text-4xl">Security check settings</h1>
          <p className="text-lg text-muted-foreground">
            Provide additional security check settings
          </p>
        </div>
      </div>
      <FormUrl />
    </div>
  )
}
