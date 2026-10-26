import DestinationCard from '@/components/DestinationCard';
import { IDestination } from '@/types/destination';
import React from 'react';

const AllDestinations = async () => {

    const res = await fetch("http://localhost:5000/destinations")
    const data = await res.json();

    return (
        <div className='grid grid-cols-3 gap-5 m-10'>
            {data.map((d:IDestination) => (
                <DestinationCard key={d._id} destination={d} />
            ))}
        </div>
    );
};

export default AllDestinations;