export const dynamic = "force-dynamic";
import { ServicePackageRequestModal } from "@/components/ServicePackageRequestModal";
import { ServiceRequestModal } from "@/components/ServiceRequestModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
 Card,
 CardContent,
 CardDescription,
 CardFooter,
 CardHeader,
 CardTitle,
} from "@/components/ui/card";
import {
 fetchServicePackages,
 fetchServices,
 type Service,
 type ServicePackage,
} from "@/lib/api";

export default async function ServicesPage() {
 const services = await fetchServices();
 const packages = await fetchServicePackages();

 return (
 <div className="container max-w-7xl mx-auto px-4 py-12 md:py-24 relative">
 <div className="absolute top-0 right-1/4 w-full max-w-2xl h-64 bg-primary/10 blur-[120px] pointer-events-none -z-10"/>

 <div className="flex flex-col gap-4 mb-16 text-center items-center">
 <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight">
 Services
 </h1>
 <p className="text-muted-foreground text-lg max-w-2xl">
 Professional services to help you build, design, and scale your
 digital presence with quality and speed.
 </p>
 </div>

 {services.length === 0 ? (
 <div className="text-center py-20 bg-card/30 border border-border/50 backdrop-blur-sm">
 <p className="text-muted-foreground text-lg">No services found.</p>
 </div>
 ) : (
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
 {services.map((service: Service) => (
 <Card key={service.id} className="flex flex-col bg-card/40 backdrop-blur-md border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-2 relative overflow-hidden group">
 {service.isFeatured && (
 <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl -z-10 "/>
 )}
 <CardHeader className="p-8">
 <div className="flex justify-between items-start mb-4">
 <Badge variant="outline"className="bg-background/50 backdrop-blur-sm">
 {service.category}
 </Badge>
 {service.isFeatured && (
 <Badge
 variant="default"
 className="bg-primary/20 text-primary hover:bg-primary/30 border-none shadow-none font-semibold"
 >
 Featured
 </Badge>
 )}
 </div>
 <CardTitle className="text-3xl font-bold">{service.title}</CardTitle>
 <CardDescription className="text-base mt-3 leading-relaxed">
 {service.description}
 </CardDescription>
 </CardHeader>
 <CardContent className="flex-1 px-8">
 <div className="space-y-6">
 <div className="pb-6 border-b border-border/50">
 <h4 className="text-sm font-semibold text-muted-foreground mb-1 uppercase tracking-wider">
 Starting from
 </h4>
 <p className="text-4xl font-extrabold text-foreground">${service.price}</p>
 </div>

 {service.features && service.features.length > 0 && (
 <div>
 <h4 className="text-sm font-semibold text-foreground mb-3">
 What's Included
 </h4>
 <ul className="space-y-3 text-sm text-muted-foreground">
 {service.features.map((feature: string, i: number) => (
 <li key={i} className="flex items-start gap-2">
 <span className="text-primary font-bold mt-0.5">✓</span>
 <span>{feature}</span>
 </li>
 ))}
 </ul>
 </div>
 )}

 <div className="flex flex-wrap gap-4 pt-4 text-sm font-medium text-foreground/80">
 {service.deliveryDays && (
 <div className="flex items-center gap-1.5 bg-background/50 px-3 py-1.5 border border-border/50">
 <span className="text-primary">⏱</span> {service.deliveryDays} Days Delivery
 </div>
 )}
 {service.revisions && (
 <div className="flex items-center gap-1.5 bg-background/50 px-3 py-1.5 border border-border/50">
 <span className="text-primary">🔄</span> {service.revisions} Revisions
 </div>
 )}
 </div>
 </div>
 </CardContent>
 <CardFooter className="p-8 pt-4">
 <ServiceRequestModal
 serviceId={service.id}
 packageName={service.title}
 >
 <Button className="w-full h-12 text-base font-semibold transition-transform group-hover:scale-[1.02]"size="lg">
 Request Service
 </Button>
 </ServiceRequestModal>
 </CardFooter>
 </Card>
 ))}
 </div>
 )}

 {packages.length > 0 && (
 <div className="mt-32 relative">
 <div className="absolute top-1/2 left-0 w-full max-w-2xl h-64 bg-primary/5 blur-[120px] pointer-events-none -z-10"/>
 
 <div className="flex flex-col gap-4 mb-16 items-center text-center">
 <h2 className="font-heading text-4xl font-bold tracking-tight">
 Service Packages
 </h2>
 <p className="text-muted-foreground text-lg max-w-2xl">
 Bundled solutions for comprehensive results and better overall value.
 </p>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
 {packages.map((pkg: ServicePackage) => (
 <Card
 key={pkg.id}
 className="flex flex-col bg-card/60 backdrop-blur-md border-primary/20 hover:border-primary/60 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 group overflow-hidden relative"
 >
 <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 blur-3xl -z-10 "/>
 <CardHeader className="p-8 pb-6">
 <CardTitle className="text-3xl font-bold text-foreground">{pkg.name}</CardTitle>
 <CardDescription className="text-base mt-2">
 {pkg.description}
 </CardDescription>
 </CardHeader>
 <CardContent className="flex-1 px-8">
 <div className="space-y-6">
 <div className="pb-6 border-b border-border/50">
 <h4 className="text-sm font-semibold text-muted-foreground mb-1 uppercase tracking-wider">
 Package Price
 </h4>
 <p className="text-4xl font-extrabold text-primary">
 ${pkg.price}
 </p>
 </div>

 {pkg.features && pkg.features.length > 0 && (
 <div>
 <h4 className="text-sm font-semibold text-foreground mb-3">
 What's included
 </h4>
 <ul className="space-y-3 text-sm text-muted-foreground">
 {pkg.features.map((feature: string, i: number) => (
 <li key={i} className="flex items-start gap-2">
 <span className="text-primary font-bold mt-0.5">✓</span>
 <span>{feature}</span>
 </li>
 ))}
 </ul>
 </div>
 )}

 <div className="flex flex-wrap gap-4 pt-4 text-sm font-medium text-foreground/80">
 {pkg.deliveryDays && (
 <div className="flex items-center gap-1.5 bg-background/50 px-3 py-1.5 border border-border/50">
 <span className="text-primary">⏱</span> {pkg.deliveryDays} Days
 </div>
 )}
 {pkg.revisions && (
 <div className="flex items-center gap-1.5 bg-background/50 px-3 py-1.5 border border-border/50">
 <span className="text-primary">🔄</span> {pkg.revisions} Revisions
 </div>
 )}
 </div>
 </div>
 </CardContent>
 <CardFooter className="p-8 pt-4">
 <ServicePackageRequestModal
 packageId={pkg.id}
 packageName={pkg.name}
 >
 <Button className="w-full h-12 text-base font-semibold shadow-lg shadow-primary/20 transition-transform group-hover:scale-[1.02]"variant="default"size="lg">
 Request Package
 </Button>
 </ServicePackageRequestModal>
 </CardFooter>
 </Card>
 ))}
 </div>
 </div>
 )}
 </div>
 );
}
