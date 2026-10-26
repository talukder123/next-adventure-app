import DeleteDestination from '@/components/deleteDestination';
import EditDestination from '@/components/edit-destination';
import Image from 'next/image';
import React from 'react';

type Props = {
    params: Promise<{ id: string }>;
};

const DestinationDetailsPage = async ({ params}: Props) => {
    const { id } = await params

    // calling the api
    const res = await fetch(`http://localhost:5000/destination/${id}`)
    const data = await res.json();
    console.log(data);

    return (
        <div className="mx-auto max-w-6xl px-4 py-10">
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                {/* Image Section */}
                <div className="relative flex h-64 items-center justify-center bg-gray-100 md:h-96">
                    {data.imageUrl ? (
                        <Image
                            src={data.imageUrl}
                            alt={data.name}
                            height={10}
                            width={10}
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <p className="text-gray-400">No Image Available</p>
                    )}

                    <span className="absolute left-5 top-5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-gray-800 shadow">
                        {data.category}
                    </span>
                </div>

                {/* Details Section */}
                <div className="p-6 md:p-10">
                    <div className="flex flex-col justify-between gap-6 md:flex-row">
                        <div>
                            <p className="mb-2 text-sm font-medium uppercase tracking-wider text-blue-600">
                                Explore Destination
                            </p>

                            <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
                                {data.name}
                            </h1>

                            <p className="mt-2 text-lg text-gray-500">
                                {data.country}
                            </p>
                        </div>

                        <div className="rounded-xl bg-blue-50 p-5 md:min-w-52">
                            <p className="text-sm text-gray-500">Package Price</p>
                            <p className="mt-1 text-3xl font-bold text-blue-700">
                                ${Number(data.price).toLocaleString()}
                            </p>
                            <p className="mt-1 text-xs text-gray-500">
                                Per person
                            </p>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="mt-8">
                        <h2 className="text-xl font-bold text-gray-900">
                            About This Destination
                        </h2>

                        <p className="mt-3 leading-7 text-gray-600">
                            {data.description}
                        </p>
                    </div>

                    {/* Trip Information */}
                    <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="rounded-xl border border-gray-200 p-5">
                            <p className="text-sm text-gray-500">Duration</p>
                            <p className="mt-2 font-semibold text-gray-900">
                                {data.duration}
                            </p>
                        </div>

                        <div className="rounded-xl border border-gray-200 p-5">
                            <p className="text-sm text-gray-500">Departure Date</p>
                            <p className="mt-2 font-semibold text-gray-900">
                                {data.departureDate}
                            </p>
                        </div>

                        <div className="rounded-xl border border-gray-200 p-5">
                            <p className="text-sm text-gray-500">Destination Type</p>
                            <p className="mt-2 font-semibold text-gray-900">
                                {data.category}
                            </p>
                        </div>
                    </div>

                    {/* Action Button */}
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <button className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700">
                            Book This Trip
                        </button>
                        <EditDestination destination={data}></EditDestination>

                        <DeleteDestination id={id}></DeleteDestination>

                        <button
                            
                            className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
                        >
                            Go Back
                        </button>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default DestinationDetailsPage;