"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { submitContact } from "@/lib/api";
import { toast } from "sonner";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      await submitContact(data);
      toast.success("Message sent successfully!");
      reset();
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container max-w-screen-md mx-auto px-4 py-12 md:py-24">
      <div className="flex flex-col gap-4 mb-12 text-center items-center">
        <h1 className="font-heading text-4xl font-bold tracking-tight">Get in Touch</h1>
        <p className="text-muted-foreground text-lg max-w-xl">
          Have a project in mind or just want to say hi? I'd love to hear from you.
        </p>
      </div>

      <Card className="mx-auto max-w-lg">
        <CardHeader>
          <CardTitle>Contact Form</CardTitle>
          <CardDescription>Fill out the form and I'll respond as soon as possible.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Name</label>
              <Input id="name" placeholder="John Doe" {...register("name", { required: true })} />
              {errors.name && <span className="text-xs text-destructive">Name is required</span>}
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <Input id="email" type="email" placeholder="john@example.com" {...register("email", { required: true })} />
              {errors.email && <span className="text-xs text-destructive">Email is required</span>}
            </div>
            
            <div className="space-y-2">
              <label htmlFor="whatsapp" className="text-sm font-medium">WhatsApp (Optional)</label>
              <Input id="whatsapp" type="tel" placeholder="+1234567890" {...register("whatsapp")} />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">Message</label>
              <Textarea id="message" placeholder="How can I help you?" className="min-h-[150px]" {...register("message", { required: true })} />
              {errors.message && <span className="text-xs text-destructive">Message is required</span>}
            </div>
            
            <Button type="submit" className="w-full" disabled={loading} size="lg">
              {loading ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
