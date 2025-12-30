import React from 'react'
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import Link from 'next/link'
import toast from 'react-hot-toast'



const BreakingNewsBanner = () => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
      const user = useSelector((state: RootState) => state.auth.user)
      const userRole = user?.role 
  return (
    <div>
      <div className="secondary_bg text-white py-2 overflow-hidden">
        <div className="container flex items-center gap-4">
          <span className="rounded-md bg-black px-2 py-2 text-xs font-bold uppercase whitespace-nowrap">
            Breaking News
          </span>
          <div className="overflow-hidden whitespace-nowrap w-full">
            <div className="inline-block animate-marquee font-serif">
              <span className="mx-8">Premium advertising spaces now available for Q2</span>
              <span className="mx-8">New interactive ad formats launching next month</span>
              <span className="mx-8">Limited-time offer: 20% off premium placements</span>
            </div>
          </div>


          {!isAuthenticated ? (
            <Link href="/signup" className="hidden md:flex items-center gap-1">
              <div className="bg-black text-white px-2 rounded-md py-2 text-xs font-bold uppercase whitespace-nowrap">
                Post Free Ads
              </div>
            </Link>
          ) : (
            <>
              {userRole === 'ADVERTISER' && (
                <Link href='/dashboard/advertiser'>
                  <div className="bg-black text-white px-2 py-2 text-xs font-bold uppercase whitespace-nowrap">
                    Post Free Ads
                  </div>
                </Link>
              )}

{userRole === 'USER' && (
          <div
            className="bg-black hover:bg-black/80 text-white px-2 py-2 text-xs font-bold uppercase whitespace-nowrap cursor-pointer"
            onClick={() => {
              toast.error('Please upgrade your account to advertiser to post ads', {
                duration: 3000,
                position: 'top-center',
              })
            }}
          >
            Post Free Ads
          </div>
        )}



            </>
          )}

        </div>
      </div>
    </div>
  )
}

export default BreakingNewsBanner;
