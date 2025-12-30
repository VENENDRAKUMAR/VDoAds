
import { AdvertiserSidebar } from "@/components/advertiser-sidebar"
import { CampaignForm } from "@/components/campaign-form"

export default function CreateCampaignPage() {
  return (
    <div className="flex min-h-screen flex-col">
     

      <div className="flex-1 flex">
        <AdvertiserSidebar />

        <main className="flex-1 p-6">
          <h1 className="text-3xl font-bold mb-6">Create New Campaign</h1>

          <CampaignForm />
        </main>
      </div>
    </div>
  )
}

