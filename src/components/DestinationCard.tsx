
import Image from "next/image";
import type { IDestination } from "@/types/destination";
import Link from "next/link";

interface DestinationCardProps {
    destination: IDestination;
}

const DestinationCard = ({ destination }: DestinationCardProps) => {
    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            {/* Destination Image */}
            <div className="relative h-52 w-full bg-gray-100">
                {destination.imageUrl ? (
                    <Image
                        src={destination.imageUrl}
                        alt={destination.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center text-gray-400">
                        No Image Available
                    </div>
                )}

                <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-700 shadow">
                    {destination.category}
                </span>
            </div>

            {/* Destination Details */}
            <div className="space-y-3 p-5">
                <div>
                    <h2 className="text-xl font-bold text-gray-900">
                        {destination.name}
                    </h2>
                    <p className="text-sm text-gray-500">
                        {destination.country}
                    </p>
                </div>

                <p className="text-sm leading-6 text-gray-600">
                    {destination.description}
                </p>

                <div className="space-y-2 border-t border-gray-100 pt-3 text-sm text-gray-600">
                    <p>
                        <span className="font-medium text-gray-800">Duration:</span>{" "}
                        {destination.duration}
                    </p>

                    <p>
                        <span className="font-medium text-gray-800">Departure:</span>{" "}
                        {destination.departureDate}
                    </p>
                </div>

                <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                    <div>
                        <p className="text-xs text-gray-500">Starting from</p>
                        <p className="text-2xl font-bold text-blue-600">
                            ${Number(destination.price).toLocaleString()}
                        </p>
                    </div>


                    <Link href={`/destinations/${destination._id}`}>
                        <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700">
                            View Details
                        </button>
                    </Link>


                </div>
            </div>
        </div>
    );
};

export default DestinationCard;