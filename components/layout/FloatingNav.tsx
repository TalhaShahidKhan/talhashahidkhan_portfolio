"use client";

import { cn } from "@/lib/utils";
import {
 Briefcase,
 FileText,
 FolderGit2,
 Home,
 Mail,
 Wrench,
 GraduationCap,
 Code,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
 { name: "Home", href: "/", icon: Home },
 { name: "Skills", href: "/skills", icon: Code },
 { name: "Experience", href: "/experience", icon: Briefcase },
 { name: "Education", href: "/education", icon: GraduationCap },
 { name: "Projects", href: "/projects", icon: FolderGit2 },
 { name: "Services", href: "/services", icon: Wrench },
 { name: "Blog", href: "/blog", icon: FileText },
 { name: "Contact", href: "/contact", icon: Mail },
];

export function FloatingNav() {
 const pathname = usePathname();

 return (
 <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
 <nav className="inline-flex gap-2 h-12 items-center justify-center border border-border bg-muted p-1 text-muted-foreground shadow-sm">
 {navItems.map((item) => {
 const isActive = pathname === item.href;
 const Icon = item.icon;

 return (
 <Link
 key={item.href}
 href={item.href}
 className={cn(
 "group inline-flex items-center justify-center whitespace-nowrap px-4 py-2 text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
 "hover:-translate-y-1 hover:scale-110 active:scale-95 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]",
 isActive
 ? "bg-background text-foreground shadow-sm"
 : "hover:bg-background/50 hover:text-foreground",
 )}
 >
 <Icon className="w-5 h-5 shrink-0 transition-transform duration-300 group-hover:-rotate-6"/>
 <span className="overflow-hidden whitespace-nowrap transition-all duration-300 ease-out max-w-0 opacity-0 group-hover:ml-2 group-hover:max-w-[120px] group-hover:opacity-100">
 {item.name}
 </span>
 </Link>
 );
 })}
 </nav>
 </div>
 );
}
