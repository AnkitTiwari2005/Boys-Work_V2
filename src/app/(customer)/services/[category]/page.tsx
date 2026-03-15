'use client'

import ServicesPage from "../all/page"

export default function CategoryServicesPage({ params }: { params: { category: string } }) {
  return <ServicesPage params={params} />
}
