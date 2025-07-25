"use client";

import LoadingButton from "@/components/LoadingButton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLogin } from "@/modules/auth/hooks";
import { setAuthSession } from "@/modules/auth/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

// Zod schema for sign-in
const signInSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

type SignInValues = z.infer<typeof signInSchema>;

export default function SignInForm() {
  const router = useRouter();
  const form = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  const loginFn = useLogin({
    config: {
      onSuccess(data) {
        if (!data?.success) return;
        setAuthSession(data?.data);
        toast.success("Login Success");
        window.location.href = "/admin";
      },
    },
  });

  async function onSubmit(values: SignInValues) {
    await loginFn.mutateAsync(values as any);
  }

  return (
    <main className="m-auto my-10 max-w-md space-y-10">
      <div className="space-y-5 text-center">
        <h1 className="text-2xl font-bold">Sign In</h1>
        <p className="text-muted-foreground">Access your account</p>
      </div>
      <Form {...form}>
        <form
          className="space-y-4"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <LoadingButton type="submit" loading={isSubmitting}>
            Sign In
          </LoadingButton>
        </form>
      </Form>
    </main>
  );
}
