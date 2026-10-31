import DestinationDetails from '@/components/destination-details';
import { IDestination } from '@/types/destination';

type Props = {
    params: Promise<{ id: string }>;
};

const DestinationDetailsPage = async ({ params }: Props) => {
    const { id } = await params

    // calling the api
    const res = await fetch(`http://localhost:5000/destination/${id}`)
    const data: IDestination = await res.json();

    console.log(data);

    return <DestinationDetails id={id} destination={data} />;
};

export default DestinationDetailsPage;
