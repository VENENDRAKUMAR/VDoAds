import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useInView } from "@/hooks/useInView";

interface AdvertisementCarouselItemProps {
  campaign: any;
}

export const AdvertisementCarouselItem: React.FC<
  AdvertisementCarouselItemProps
> = ({ campaign }) => {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.5 });

  React.useEffect(() => {
    if (inView) {
      fetch(
        `https://advertisemedia.onrender.com/api/campaigns/${campaign._id}/analytics`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            impressions: 1,
            clicks: 0,
            ctr: 0,
          }),
        }
      );
    }
  }, [inView, campaign._id]);

  return (
    <div ref={ref} className="relative w-full h-full aspect-[16/9]">
      <Link
        href={`/advertisements/${campaign._id}`}
        className="block relative w-full h-full aspect-[16/9]"
        onClick={() => {
          fetch(
            `https://advertisemedia.onrender.com/api/campaigns/${campaign._id}/analytics`,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                impressions: 0,
                clicks: 1,
                ctr: 0,
              }),
            }
          );
        }}
      >
        <Image
          src={campaign.imageUrl}
          alt={campaign.headline}
          fill
          className="object-cover transition-transform hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="text-white text-lg font-serif p-4 text-center">
            {campaign.headline}
          </span>
        </div>
      </Link>
    </div>
  );
};
