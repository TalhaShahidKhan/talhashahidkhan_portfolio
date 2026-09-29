"use client";

import { Button } from "@/components/ui/button";
import {
 Card,
 CardContent,
 CardDescription,
 CardHeader,
 CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { submitContact } from "@/lib/api";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type ContactFormData = {
 name: string;
 email: string;
 whatsapp?: string;
 message: string;
};

export default function ContactPage() {
 const [loading, setLoading] = useState(false);
 const {
 register,
 handleSubmit,
 reset,
 formState: { errors },
 } = useForm<ContactFormData>();

 const onSubmit = async (data: ContactFormData) => {
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
 <div className="container max-w-6xl mx-auto px-4 py-12 md:py-24">
 <div className="flex flex-col gap-4 mb-16 text-center items-center">
 <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight">
 Let&apos;s work together
 </h1>
 <p className="text-muted-foreground text-lg max-w-xl">
 Have a project or requirements in mind? Or just want to say hi?
 I&apos;d love to hear from you.
 </p>
 </div>

 <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
 {/* Contact Info Sidebar */}
 <div className="lg:col-span-2 flex flex-col justify-between p-8 md:p-10 bg-primary/5 border border-primary/10 relative overflow-hidden">
 <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-primary/20 blur-[100px] pointer-events-none"/>

 <div className="relative z-10">
 <h3 className="text-2xl md:text-3xl font-bold mb-4">
 Get in touch
 </h3>
 <p className="text-muted-foreground mb-12">
 Fill out the form and I&apos;ll respond as soon as possible.
 Usually within 24 hours.
 </p>

 <div className="flex flex-col gap-8">
 <div className="flex items-center gap-4">
 <div className="w-12 h-12 flex items-center justify-center bg-background border border-border/50 shadow-sm text-primary">
 <svg
 xmlns="http://www.w3.org/2000/svg"
 width="20"
 height="20"
 viewBox="0 0 24 24"
 fill="none"
 stroke="currentColor"
 strokeWidth="2"
 strokeLinecap="round"
 strokeLinejoin="round"
 >
 <rect width="20"height="16"x="2"y="4"rx="2"/>
 <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
 </svg>
 </div>
 <div>
 <p className="text-sm text-muted-foreground font-medium mb-1">
 Email
 </p>
 <p className="font-semibold">talha@talhashahidkhan.com</p>
 </div>
 </div>

 <div className="flex items-center gap-4">
 <div className="w-12 h-12 flex items-center justify-center bg-background border border-border/50 shadow-sm text-primary">
 <svg
 xmlns="http://www.w3.org/2000/svg"
 width="20"
 height="20"
 viewBox="0 0 24 24"
 fill="none"
 stroke="currentColor"
 strokeWidth="2"
 strokeLinecap="round"
 strokeLinejoin="round"
 >
 <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
 </svg>
 </div>
 <div>
 <p className="text-sm text-muted-foreground font-medium mb-1">
 Phone/Whatsapp
 </p>
 <p className="font-semibold">+8801717051054</p>
 </div>
 </div>
 </div>
 </div>
 </div>

 {/* Form Container */}
 <div className="lg:col-span-3">
 <Card className="border-border/50 shadow-xl shadow-black/5 overflow-hidden bg-card/50 backdrop-blur-xl">
 <CardHeader className="px-8 md:px-10 pt-8 md:pt-10 pb-0">
 <CardTitle className="text-2xl font-bold">
 Send a Message
 </CardTitle>
 <CardDescription className="text-base mt-2">
 I&apos;m currently available for new projects and
 collaborations.
 </CardDescription>
 </CardHeader>
 <CardContent className="p-8 md:p-10">
 <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
 <div className="space-y-2">
 <label
 htmlFor="name"
 className="text-sm font-semibold text-foreground/80"
 >
 Your Name <span className="text-destructive">*</span>
 </label>
 <Input
 id="name"
 placeholder="John Doe"
 className="bg-background/50 h-12 px-4"
 {...register("name", { required: true })}
 />
 {errors.name && (
 <span className="text-xs text-destructive font-medium">
 Name is required
 </span>
 )}
 </div>

 <div className="space-y-2">
 <label
 htmlFor="email"
 className="text-sm font-semibold text-foreground/80"
 >
 Your Email <span className="text-destructive">*</span>
 </label>
 <Input
 id="email"
 type="email"
 placeholder="john@example.com"
 className="bg-background/50 h-12 px-4"
 {...register("email", { required: true })}
 />
 {errors.email && (
 <span className="text-xs text-destructive font-medium">
 Email is required
 </span>
 )}
 </div>
 </div>

 <div className="space-y-2">
 <label
 htmlFor="whatsapp"
 className="text-sm font-semibold text-foreground/80"
 >
 WhatsApp{""}
 <span className="text-muted-foreground font-normal">
 (Optional)
 </span>
 </label>
 <Input
 id="whatsapp"
 type="tel"
 placeholder="+1 (555) 000-0000"
 className="bg-background/50 h-12 px-4"
 {...register("whatsapp")}
 />
 </div>

 <div className="space-y-2">
 <label
 htmlFor="message"
 className="text-sm font-semibold text-foreground/80"
 >
 Your Message <span className="text-destructive">*</span>
 </label>
 <Textarea
 id="message"
 placeholder="How can I help you? Please describe your project or inquiry..."
 className="bg-background/50 min-h-[160px] p-4 resize-none"
 {...register("message", { required: true })}
 />
 {errors.message && (
 <span className="text-xs text-destructive font-medium">
 Message is required
 </span>
 )}
 </div>

 <Button
 type="submit"
 className="w-full h-12 text-base font-semibold shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5"
 disabled={loading}
 size="lg"
 >
 {loading ? (
 <div className="flex items-center gap-2">
 <div className="w-4 h-4 border-2 border-white/30 border-t-white animate-spin"/>
 Sending...
 </div>
 ) : (
 "Send Message"
 )}
 </Button>
 </form>
 </CardContent>
 </Card>
 </div>
 </div>
 </div>
 );
}
