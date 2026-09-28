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
    <div className="container max-w-7xl mx-auto px-4 py-12 md:py-20">
      <div className="flex flex-col gap-4 mb-12">
        <h1 className="font-heading text-4xl font-bold tracking-tight">
          Services
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Professional services to help you build, design, and scale your
          digital presence.
        </p>
      </div>

      {services.length === 0 ? (
        <p className="text-muted-foreground">No services found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service: Service) => (
            <Card key={service.id} className="flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="outline" className="mb-2">
                    {service.category}
                  </Badge>
                  {service.isFeatured && (
                    <Badge
                      variant="default"
                      className="bg-primary text-primary-foreground"
                    >
                      Featured
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-2xl">{service.title}</CardTitle>
                <CardDescription className="text-base mt-2">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">
                      Starting from
                    </h4>
                    <p className="text-3xl font-bold">${service.price}</p>
                  </div>

                  {service.features && service.features.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">
                        Includes:
                      </h4>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        {service.features.map((feature: string, i: number) => (
                          <li key={i}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex gap-4 text-sm text-muted-foreground">
                    {service.deliveryDays && (
                      <div>⏱ {service.deliveryDays} Days Delivery</div>
                    )}
                    {service.revisions && (
                      <div>🔄 {service.revisions} Revisions</div>
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-4 border-t border-border/40">
                <ServiceRequestModal
                  serviceId={service.id}
                  packageName={service.title}
                >
                  <Button className="w-full" size="lg">
                    Request Service
                  </Button>
                </ServiceRequestModal>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {packages.length > 0 && (
        <div className="mt-20">
          <div className="flex flex-col gap-4 mb-10">
            <h2 className="font-heading text-3xl font-bold tracking-tight">
              Service Packages
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Bundled solutions for comprehensive results and better value.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((pkg: ServicePackage) => (
              <Card
                key={pkg.id}
                className="flex flex-col bg-muted/30 border-primary/20"
              >
                <CardHeader>
                  <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                  <CardDescription className="text-base mt-2">
                    {pkg.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">
                        Package Price
                      </h4>
                      <p className="text-3xl font-bold text-primary">
                        ${pkg.price}
                      </p>
                    </div>

                    {pkg.features && pkg.features.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-2">
                          What&apos;s included:
                        </h4>
                        <ul className="list-disc pl-5 space-y-1 text-sm">
                          {pkg.features.map((feature: string, i: number) => (
                            <li key={i}>{feature}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="flex gap-4 text-sm text-muted-foreground">
                      {pkg.deliveryDays && (
                        <div>⏱ {pkg.deliveryDays} Days Delivery</div>
                      )}
                      {pkg.revisions && <div>🔄 {pkg.revisions} Revisions</div>}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-4 border-t border-border/40">
                  <ServicePackageRequestModal
                    packageId={pkg.id}
                    packageName={pkg.name}
                  >
                    <Button className="w-full" variant="default" size="lg">
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
