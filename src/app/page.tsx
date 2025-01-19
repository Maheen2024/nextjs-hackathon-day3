
import Test from "@/components/test";
import { client } from "@/sanity/sanity-utils";

interface Car {
  type: string;
  pricePerDay: number;
  transmission: string;
  imageUrl: string;
  fuelCapacity: number;
  seatingCapacity: number;
  name: string;
  slug?: {
    current: string;
  };
}

export default async function Home() {
  const carData = await client.fetch(
      `*[_type == "car"]{
        type,
        pricePerDay,
        transmission,
        "imageUrl": image.asset->url,
        fuelCapacity,
        seatingCapacity,
        name,
        slug
      }`
    );
  
    return (
      <div>
        <Test/>
      <div className="max-w-7xl mx-auto p-4">
        <h1 className="text-3xl font-semibold text-center mb-8">Our Cars</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {carData.map((car: Car) => (
            <div
              key={car.slug?.current}
              className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden"
            >
              <img
                src={car.imageUrl}
                alt={car.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{car.name}</h2>
                <p className="text-gray-500 text-sm mb-4">{car.type}</p>
                <div className="flex justify-between text-sm text-gray-600 mb-4">
                  <div>
                    <strong>Transmission:</strong> {car.transmission}
                  </div>
                  <div>
                    <strong>Seating:</strong> {car.seatingCapacity} people
                  </div>
                  <div>
                    <strong>Fuel:</strong> {car.fuelCapacity}L
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">
                    ${car.pricePerDay} / day
                  </span>
                  <a
                    href={`/cars/${car.slug?.current}`}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    View Details
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    );
  };