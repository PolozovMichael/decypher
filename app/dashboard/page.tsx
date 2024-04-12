import SubmitBtns from '@/components/SubmitBtns'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import prisma from '@/lib/db'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { revalidatePath } from 'next/cache'

export default async function page() {
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
      <Card>
        <form>
          <CardHeader>
            <CardTitle>General Data</CardTitle>
            <CardDescription>Please general information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="space-y-1">
                <Label>Website Link</Label>
                <Input
                  name="link"
                  type="text"
                  id="link"
                  placeholder="Enter the website link"
                />
              </div>
              <div className="space-y-1">
                <Label>Types of website security vulnerabilities</Label>
                <Select name="checking-type" defaultValue="sql">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a type of website security vulnerabilities" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Checking types</SelectLabel>
                      <SelectItem value="sql">SQL injections</SelectItem>
                      <SelectItem value="xss">
                        Cross-site scripting (XSS)
                      </SelectItem>
                      <SelectItem value="csrf">
                        Cross-site request forgery (CSRF)
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit">Test for vulnerabilities</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
