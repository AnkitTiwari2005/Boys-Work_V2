import ServiceListClient from "@/components/services/ServiceListClient"

export async function generateStaticParams() {
  return [
    { category: 'cleaning' },
    { category: 'plumbing' },
    { category: 'electrical' },
  ]
}

export default function ServicesPage({ params }: { params: { category: string } }) {
  return <ServiceListClient category={params.category} />
}
