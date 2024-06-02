'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'

import { Input } from '@/components/ui/input'
import axios from 'axios'

const formSchema = z.object({
  URL: z.string().min(2).max(50),
})

export default function FormUrl() {
  const [urlData, setUrlData] = useState('')

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  })

  const getData = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/check-url')
      setUrlData(res?.data.prediction)
    } catch (error) {
      console.log(error)
    }
  }
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values)
    getData()
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="URL"
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      <h1>Result: {urlData}</h1>
    </>
  )
}
