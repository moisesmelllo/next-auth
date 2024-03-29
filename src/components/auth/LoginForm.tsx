'use client'

import * as z from 'zod'

import { useState, useTransition } from 'react';

import {useForm} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { LoginSchema } from '@/schemas';
import { Input } from '../ui/input';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { CardWrapper } from "./CardWrapper";
import { Button } from '../ui/button';
import { FormError } from '../form-error';
import { FormSucess } from '../form-sucess';
import { login } from '@/actions/login';

export const LoginForm = () => {
  const [error, setError] = useState<string |undefined>('')
  const [success, setSucess] = useState<string |undefined>('')
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  })

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError('')
    setSucess('')
    startTransition(() => {
      login(values)
      .then((data) => {
        setError(data.error);
        setSucess(data.success)
      })
    })
  }

  return (
    <CardWrapper
      headerLabel="Welcome back"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
      showSocial
    >
      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-6'  
        >
          <div className='mb-4 space-y-4'>
            <FormField
              control={form.control}
              name='email'
              render={({field}) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      {...field}
                      placeholder='john.doe@example.com'
                      type='email'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({field}) => (
                <FormItem>
                  <FormLabel>password</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      {...field}
                      placeholder='******'
                      type='password'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error}/>
          <FormSucess message={success}/>
          <Button
            disabled={isPending}
            type='submit'
            className='w-full'
          >
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
    
  )
}