import ServiceListClient from "@/components/services/ServiceListClient"

const SERVICES_DATA: Record<string, any[]> = {
  cleaning: [
    { id: "c1", name: "Deep House Cleaning", price: 1299, rating: 4.8, reviews: 124, time: "3-4 hrs", description: "Complete house scrubbing, kitchen and bathroom sanitization." },
    { id: "c2", name: "Kitchen Cleaning", price: 599, rating: 4.6, reviews: 82, time: "1-2 hrs", description: "Degreasing, tile scrubbing, and detailing of all kitchen surfaces." },
    { id: "c3", name: "Bathroom Cleaning", price: 399, rating: 4.9, reviews: 210, time: "1 hr", description: "Intense cleaning of tiles, grout, toilet, and sink." },
  ],
  plumbing: [
    { id: "p1", name: "Tap Repair", price: 199, rating: 4.7, reviews: 342, time: "30 mins", description: "Fixing leaks, washers, or replacing old taps." },
    { id: "p2", name: "Drain Unclogging", price: 499, rating: 4.8, reviews: 156, time: "1 hr", description: "Efficient clearing of blocked drains and pipes." },
    { id: "p3", name: "Toilet Installation", price: 1499, rating: 4.9, reviews: 45, time: "2-3 hrs", description: "Professional installation of new toilet units." },
  ],
  electrical: [
    { id: "e1", name: "Fan Installation", price: 299, rating: 4.8, reviews: 521, time: "45 mins", description: "Mounting and wiring of ceiling or wall fans." },
    { id: "e2", name: "Switchboard Repair", price: 399, rating: 4.7, reviews: 203, time: "1 hr", description: "Fixing loose connections, burnt sockets, or switches." },
    { id: "e3", name: "House Wiring Check", price: 999, rating: 4.6, reviews: 12, time: "2-3 hrs", description: "Complete audit of house wiring for safety." },
  ]
}

export async function generateStaticParams() {
  return [
    { category: 'cleaning' },
    { category: 'plumbing' },
    { category: 'electrical' },
  ]
}

export default function ServicesPage({ params }: { params: { category: string } }) {
  const category = params.category
  const services = SERVICES_DATA[category] || []

  return <ServiceListClient category={category} initialServices={services} />
}
