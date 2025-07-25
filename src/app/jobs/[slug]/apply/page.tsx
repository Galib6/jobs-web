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
import { useCreateApplication } from "@/modules/applications/hooks";
import { IApplicationCreate } from "@/modules/applications/interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

// Zod schema for validation
const applySchema = z.object({
  applicantName: z.string().min(1, "Name is required"),
  applicantEmail: z.string().email("Invalid email"),
  job: z.number(),
  cvUrl: z.string().url("Invalid CV URL"),
  notes: z.string().optional(),
});

type ApplyValues = z.infer<typeof applySchema>;

export default function ApplyForm({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const form = useForm<ApplyValues>({
    resolver: zodResolver(applySchema),
    defaultValues: { job: Number(params?.slug) as any, cvUrl: "" },
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  const [uploading, setUploading] = useState(false);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("files", file);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_END_POINT}/files`,
        {
          method: "POST",
          body: formData,
        },
      );
      const data = await res.json();
      const uploadedLink = data?.data?.[0]?.link;
      console.log("Uploaded CV Link:", uploadedLink);
      form.setValue("cvUrl", uploadedLink, {
        shouldValidate: true,
        shouldDirty: true,
      });
    } catch (err) {
      alert("File upload failed");
    } finally {
      setUploading(false);
    }
  }

  const createApplication = useCreateApplication({
    config: {
      onSuccess: (res: any) => {
        if (!res?.success) return;
        toast.success("Successfully Submitted");
      },
    },
  });

  async function onSubmit(values: ApplyValues) {
    console.log("🚀😬 ~ onSubmit ~ values:", values);
    // Submit application logic here
    createApplication.mutate(values as IApplicationCreate);
    router.push(`/jobs/${params?.slug}/apply-submitted`);
  }

  return (
    <main className="m-auto my-10 max-w-md space-y-10">
      <div className="space-y-5 text-center">
        <h1 className="text-2xl font-bold">Apply for this job</h1>
      </div>
      <Form {...form}>
        <form
          className="space-y-4"
          noValidate
          onSubmit={handleSubmit(onSubmit, (errors) => {
            console.log("Validation errors:", errors); // ✅
          })}
        >
          <FormField
            control={control}
            name="applicantName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="applicantEmail"
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
            name="cvUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CV Upload</FormLabel>
                <FormControl>
                  <div>
                    <Input
                      type="file"
                      accept="application/pdf"
                      onChange={handleFileChange}
                    />
                    {uploading && <span className="text-xs">Uploading...</span>}
                    {field.value && (
                      <a
                        href={field.value}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 block text-xs text-blue-600"
                      >
                        View uploaded CV
                      </a>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Notes</FormLabel>
                <FormControl>
                  <textarea
                    className="w-full rounded border px-3 py-2 text-sm"
                    rows={4}
                    placeholder="Any additional information you'd like to provide..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Hidden job id field */}
          <FormField
            control={control}
            name="job"
            render={({ field }) => <input type="hidden" {...field} />}
          />
          <LoadingButton type="submit" loading={isSubmitting}>
            Apply
          </LoadingButton>
        </form>
      </Form>
    </main>
  );
}
