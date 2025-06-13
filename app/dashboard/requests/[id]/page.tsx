import { RequestDetailsView } from "@/components/request-details-view"

export default function RequestDetails({ params }: { params: { id: string } }) {
  return <RequestDetailsView requestId={params.id} />
}
