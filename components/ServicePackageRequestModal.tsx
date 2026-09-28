"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { submitServicePackageRequest } from "@/lib/api";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface ServicePackageRequestFormData {
  name: string;
  email: string;
  whatsapp?: string;
  message: string;
  requirements?: string;
}

export function ServicePackageRequestModal({
  packageId,
  packageName,
  children,
}: {
  packageId: string;
  packageName?: string;
  children: React.ReactElement;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ServicePackageRequestFormData>();

  const onSubmit = async (data: ServicePackageRequestFormData) => {
    setLoading(true);
    try {
      await submitServicePackageRequest({
        packageId,
        name: data.name,
        email: data.email,
        whatsapp: data.whatsapp,
        message: data.message,
        additionalRequirements: data.requirements
          ? data.requirements.split(",").map((s: string) => s.trim())
          : [],
      });
      toast.success("Service package request submitted successfully!");
      reset();
      setOpen(false);
    } catch (error) {
      toast.error("Failed to submit request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={children} />
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>Request {packageName || "Package"}</DialogTitle>
          <DialogDescription>
            Fill out the form below to request this package. I&apos;ll get back
            to you shortly.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Input
              placeholder="Your Name"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className="text-xs text-destructive">Name is required</span>
            )}
          </div>
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="Your Email"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-xs text-destructive">
                Email is required
              </span>
            )}
          </div>
          <div className="space-y-2">
            <Input
              type="tel"
              placeholder="WhatsApp (Optional)"
              {...register("whatsapp")}
            />
          </div>
          <div className="space-y-2">
            <Textarea
              placeholder="Tell me about your project..."
              className="min-h-[100px]"
              {...register("message", { required: true })}
            />
            {errors.message && (
              <span className="text-xs text-destructive">
                Message is required
              </span>
            )}
          </div>
          <div className="space-y-2">
            <Input
              placeholder="Additional requirements (comma separated)"
              {...register("requirements")}
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Submitting..." : "Submit Request"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
