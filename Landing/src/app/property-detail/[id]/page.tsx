'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';
import { LiaCompressArrowsAltSolid } from 'react-icons/lia';
import { LuBath, LuBedDouble } from 'react-icons/lu';
import { FiMapPin, FiPhone } from 'react-icons/fi';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import Switcher from '../../components/switcher';

const TinySlider = dynamic(()=>import('tiny-slider-react'),{ssr:false})
import 'tiny-slider/dist/tiny-slider.css';

interface Property {
  id: number;
  name: string;
  description: string;
  price: number;
  discountedPrice?: number;
  size: number;
  beds: number;
  baths: number;
  category: {
    id: number;
    name: string;
    slug: string;
    image: string;
  };
  status: string;
  ownershipType: string;
  city: string;
  street: string;
  country: string;
  latitude: number;
  longitude: number;
  buildingStoriesNumber: number;
  buildingCondition: string;
  apartmentCondition: string;
  aboveGroundFloors: number;
  totalAboveGroundFloors: number;
  totalUndergroundFloors: number;
  reconstructionYearApartment: number;
  reconstructionYearBuilding: number;
  floorArea: number;
  builtUpArea: number;
  gardenHouseArea: number;
  terraceArea: number;
  totalLandArea: number;
  gardenArea: number;
  garageArea: number;
  balconyArea: number;
  pergolaArea: number;
  basementArea: number;
  workshopArea: number;
  totalObjectArea: number;
  usableArea: number;
  landArea: number;
  objectType: string;
  objectLocationType: string;
  houseEquipment: string;
  accessRoad: string;
  objectCondition: string;
  reservationPrice: number;
  equipmentDescription: string;
  additionalSources: string;
  buildingPermit: string;
  buildability: string;
  utilitiesOnLand: string;
  utilitiesOnAdjacentRoad: string;
  payments: string;
  brokerId: number;
  secondaryAgent: string;
  virtualTour: string;
  videoUrl: string;
  layout: string;
  images: { id: number; url: string }[];
}

export default function PropertyDetail() {
  const params = useParams();
  const id = parseInt(String(params?.id || 0));
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const settings = {
    container: '.tiny-one-item',
    items: 1,
    controls: true,
    mouseDrag: true,
    loop: true,
    rewind: true,
    autoplay: true,
    autoplayButtonOutput: false,
    autoplayTimeout: 3000,
    navPosition: "bottom",
    controlsText: ['<i class="mdi mdi-chevron-left "></i>', '<i class="mdi mdi-chevron-right"></i>'],
    nav: false,
    speed: 400,
    gutter: 0,
  };

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3003/api/properties/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch property');
        }
        const data = await response.json();
        setProperty(data);
        if (data.images && data.images.length > 0) {
          setSelectedImage(data.images[0].url);
        }
        setError(null);
      } catch (err) {
        setError('Failed to load property details. Please try again later.');
        console.error('Error fetching property:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProperty();
    }
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar navClass={''} topnavClass={''} tagline={false}/>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
        </div>
        <Footer/>
        <Switcher/>
      </>
    );
  }

  if (error || !property) {
    return (
      <>
        <Navbar navClass={''} topnavClass={''} tagline={false}/>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-red-500">{error || 'Property not found'}</div>
        </div>
        <Footer/>
        <Switcher/>
      </>
    );
  }

  const formatValue = (value: any) => {
    if (value === null || value === undefined || value === '') {
      return <span className="text-gray-400 italic">-</span>;
    }
    if (typeof value === 'object' && value !== null) {
      if ('name' in value && 'slug' in value && 'image' in value) {
        console.log('Category object:', value);
        return <span>{String(value.name)}</span>;
      }
      console.log('Unknown object:', value);
      return <span className="text-gray-400 italic">-</span>;
    }
    return <span>{String(value)}</span>;
  };

  const getGoogleMapsUrl = () => {
    if (property.latitude && property.longitude) {
      return `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2000!2d${property.longitude}!3d${property.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z${property.latitude}%2C${property.longitude}!5e0!3m2!1sen!2s!4v1`;
    }
    return 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d39206.002432144705!2d-95.4973981212445!3d29.709510002925988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640c16de81f3ca5%3A0xf43e0b60ae539ac9!2sGerald+D.+Hines+Waterwall+Park!5e0!3m2!1sen!2sin!4v1566305861440!5m2!1sen!2sin';
  };

  return (
    <>
      <Navbar navClass={''} topnavClass={''} tagline={false}/>
      <section className="relative md:py-24 pt-24 pb-16">
        <div className="container relative">
          <div className="grid md:grid-cols-12 grid-cols-1 gap-[30px]">
            <div className="lg:col-span-8 md:col-span-7">
              <div className="grid grid-cols-1 relative">
                <div className="tiny-one-item">
                  <TinySlider settings={settings}>
                    {property.images.map((image, index) => (
                      <div className="tiny-slide" key={image.id}>
                        <Image 
                          src={image.url} 
                          width={0} 
                          height={0} 
                          sizes='100vw' 
                          style={{width:'100%', height:'auto'}} 
                          className="rounded-md shadow-sm shadow-gray-200 dark:shadow-gray-700" 
                          alt={`${property.name} - Image ${index + 1}`}
                        />
                      </div>
                    ))}
                  </TinySlider>
                </div>
              </div>
              
              <h4 className="text-2xl font-medium mt-6 mb-3">{property.name}</h4>
              <span className="text-slate-400 flex items-center">
                <FiMapPin className="size-5 me-2"/> {property.street}, {property.city}, {property.country}
              </span>

              <ul className="py-6 flex items-center list-none">
                <li className="flex items-center lg:me-6 me-4">
                  <LiaCompressArrowsAltSolid className="lg:text-3xl text-2xl me-2 text-green-600"/>
                  <span className="lg:text-xl">{property.size}</span>
                </li>

                <li className="flex items-center lg:me-6 me-4">
                  <LuBedDouble className="lg:text-3xl text-2xl me-2 text-green-600"/>
                  <span className="lg:text-xl">{property.beds} Beds</span>
                </li>

                <li className="flex items-center">
                  <LuBath className="lg:text-3xl text-2xl me-2 text-green-600"/>
                  <span className="lg:text-xl">{property.baths} Baths</span>
                </li>
              </ul>

              <p className="text-slate-400">{property.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <h5 className="text-lg font-semibold mb-4 text-green-600">Basic Information</h5>
                  <ul className="space-y-2">
                    <li className="flex justify-between items-center">
                      <span className="font-medium">Category:</span>
                      <span className="text-right">{formatValue(property.category)}</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="font-medium">Status:</span>
                      <span className="text-right">{formatValue(property.status)}</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="font-medium">Ownership Type:</span>
                      <span className="text-right">{formatValue(property.ownershipType)}</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="font-medium">Size:</span>
                      <span className="text-right">{formatValue(property.size)}</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="font-medium">Beds:</span>
                      <span className="text-right">{formatValue(property.beds)}</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="font-medium">Layout:</span>
                      <span className="text-right">{formatValue(property.layout)}</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h5 className="text-lg font-semibold mb-4 text-green-600">Location</h5>
                  <ul className="space-y-2">
                    <li className="flex justify-between items-center">
                      <span className="font-medium">Street:</span>
                      <span className="text-right">{formatValue(property.street)}</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="font-medium">City:</span>
                      <span className="text-right">{formatValue(property.city)}</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="font-medium">Country:</span>
                      <span className="text-right">{formatValue(property.country)}</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <h5 className="text-lg font-semibold mb-4 text-green-600">Building Details</h5>
                  <ul className="space-y-2">
                    <li className="flex justify-between items-center">
                      <span className="font-medium">Building Stories:</span>
                      <span className="text-right">{formatValue(property.buildingStoriesNumber)}</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="font-medium">Building Condition:</span>
                      <span className="text-right">{formatValue(property.buildingCondition)}</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="font-medium">Apartment Condition:</span>
                      <span className="text-right">{formatValue(property.apartmentCondition)}</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="font-medium">Above Ground Floors:</span>
                      <span className="text-right">{formatValue(property.aboveGroundFloors)}</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="font-medium">Total Above Ground Floors:</span>
                      <span className="text-right">{formatValue(property.totalAboveGroundFloors)}</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="font-medium">Total Underground Floors:</span>
                      <span className="text-right">{formatValue(property.totalUndergroundFloors)}</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="font-medium">Reconstruction Year (Apartment):</span>
                      <span className="text-right">{formatValue(property.reconstructionYearApartment)}</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="font-medium">Reconstruction Year (Building):</span>
                      <span className="text-right">{formatValue(property.reconstructionYearBuilding)}</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h5 className="text-lg font-semibold mb-4 text-green-600">Areas</h5>
                  <ul className="space-y-2">
                    <li className="flex justify-between items-center">
                      <span className="font-medium">Floor Area:</span>
                      <span className="text-right">{formatValue(property.floorArea)}</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="font-medium">Built Up Area:</span>
                      <span className="text-right">{formatValue(property.builtUpArea)}</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="font-medium">Garden House Area:</span>
                      <span className="text-right">{formatValue(property.gardenHouseArea)}</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="font-medium">Terrace Area:</span>
                      <span className="text-right">{formatValue(property.terraceArea)}</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="font-medium">Total Land Area:</span>
                      <span className="text-right">{formatValue(property.totalLandArea)}</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="font-medium">Garden Area:</span>
                      <span className="text-right">{formatValue(property.gardenArea)}</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="font-medium">Garage Area:</span>
                      <span className="text-right">{formatValue(property.garageArea)}</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="font-medium">Balcony Area:</span>
                      <span className="text-right">{formatValue(property.balconyArea)}</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="font-medium">Pergola Area:</span>
                      <span className="text-right">{formatValue(property.pergolaArea)}</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="font-medium">Basement Area:</span>
                      <span className="text-right">{formatValue(property.basementArea)}</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="font-medium">Workshop Area:</span>
                      <span className="text-right">{formatValue(property.workshopArea)}</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="font-medium">Total Object Area:</span>
                      <span className="text-right">{formatValue(property.totalObjectArea)}</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="font-medium">Usable Area:</span>
                      <span className="text-right">{formatValue(property.usableArea)}</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="font-medium">Land Area:</span>
                      <span className="text-right">{formatValue(property.landArea)}</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <h5 className="text-lg font-semibold mb-4 text-green-600">Object Details</h5>
                  <ul className="space-y-2">
                    <li className="flex justify-between items-center">
                      <span className="font-medium">Object Type:</span>
                      <span className="text-right">{formatValue(property.objectType)}</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="font-medium">Object Location Type:</span>
                      <span className="text-right">{formatValue(property.objectLocationType)}</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="font-medium">House Equipment:</span>
                      <span className="text-right">{formatValue(property.houseEquipment)}</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="font-medium">Access Road:</span>
                      <span className="text-right">{formatValue(property.accessRoad)}</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="font-medium">Object Condition:</span>
                      <span className="text-right">{formatValue(property.objectCondition)}</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h5 className="text-lg font-semibold mb-4 text-green-600">Additional Information</h5>
                  <ul className="space-y-2">
                    <li className="flex justify-between items-center">
                      <span className="font-medium">Equipment Description:</span>
                      <span className="text-right">{formatValue(property.equipmentDescription)}</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="font-medium">Additional Sources:</span>
                      <span className="text-right">{formatValue(property.additionalSources)}</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="font-medium">Building Permit:</span>
                      <span className="text-right">{formatValue(property.buildingPermit)}</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="font-medium">Buildability:</span>
                      <span className="text-right">{formatValue(property.buildability)}</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="font-medium">Utilities on Land:</span>
                      <span className="text-right">{formatValue(property.utilitiesOnLand)}</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="font-medium">Utilities on Adjacent Road:</span>
                      <span className="text-right">{formatValue(property.utilitiesOnAdjacentRoad)}</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="font-medium">Payments:</span>
                      <span className="text-right">{formatValue(property.payments)}</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Virtual Tour Section */}
              {property.virtualTour && (
                <div className="mt-6 rounded-md bg-white dark:bg-slate-900 shadow-sm shadow-gray-200 dark:shadow-gray-700">
                  <div className="p-6">
                    <h5 className="text-xl font-medium mb-4">Virtual Tour</h5>
                    <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                      <div 
                        className="absolute inset-0"
                        dangerouslySetInnerHTML={{ 
                          __html: property.virtualTour.replace(
                            /width="\d+" height="\d+"/g, 
                            'style="width:100%;height:100%;position:absolute;top:0;left:0;"'
                          )
                        }} 
                      />
                    </div>
                  </div>
                </div>
              )}
          
              <div className="w-full leading-[0] border-0 mt-6">
                <iframe 
                  src={getGoogleMapsUrl()} 
                  style={{border:'0'}} 
                  title='property-location' 
                  className="w-full h-[500px]" 
                  allowFullScreen
                ></iframe>
              </div>
            </div>

            <div className="lg:col-span-4 md:col-span-5">
              <div className="sticky top-20">
                <div className="rounded-md bg-slate-50 dark:bg-slate-800 shadow-sm shadow-gray-200 dark:shadow-gray-700">
                  <div className="p-6">
                    <h5 className="text-2xl font-medium">Price:</h5>

                    <div className="flex justify-between items-center mt-4">
                      <span className="text-xl font-medium">$ {property.price.toLocaleString()}</span>
                      {property.discountedPrice && (
                        <span className="text-xl font-medium line-through text-red-500">$ {property.discountedPrice.toLocaleString()}</span>
                      )}
                      <span className="bg-green-600/10 text-green-600 text-sm px-2.5 py-0.75 rounded h-6">
                        {formatValue(property.category)}
                      </span>
                    </div>

                    <ul className="list-none mt-4">
                      <li className="flex justify-between items-center">
                        <span className="text-slate-400 text-sm">Price per sq ft</span>
                        <span className="font-medium text-sm">$ {(property.price / property.size).toFixed(2)}</span>
                      </li>

                      <li className="flex justify-between items-center mt-2">
                        <span className="text-slate-400 text-sm">Monthly Payment (estimate)</span>
                        <span className="font-medium text-sm">$ {(property.price / 360).toFixed(2)}/Monthly</span>
                      </li>

                      {property.reservationPrice && (
                        <li className="flex justify-between items-center mt-2">
                          <span className="text-slate-400 text-sm">Reservation Price</span>
                          <span className="font-medium text-sm">$ {property.reservationPrice.toLocaleString()}</span>
                        </li>
                      )}
                    </ul>
                  </div>

                  <div className="flex">
                    <div className="p-1 w-1/2">
                      <Link href="" className="btn bg-green-600 hover:bg-green-700 text-white rounded-md w-full">Book Now</Link>
                    </div>
                    <div className="p-1 w-1/2">
                      <Link href="" className="btn bg-green-600 hover:bg-green-700 text-white rounded-md w-full">Offer Now</Link>
                    </div>
                  </div>
                </div>

                {/* Video Section */}
                {property.videoUrl && (
                  <div className="mt-6 rounded-md bg-slate-50 dark:bg-slate-800 shadow-sm shadow-gray-200 dark:shadow-gray-700">
                    <div className="p-6">
                      <h5 className="text-xl font-medium mb-4">Video Tour</h5>
                      <div className="aspect-w-16 aspect-h-9">
                        <iframe
                          src={property.videoUrl}
                          title="Property Video Tour"
                          className="w-full h-full rounded-md"
                          allowFullScreen
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-12 text-center">
                  <h3 className="mb-6 text-xl leading-normal font-medium text-black dark:text-white">Have Question ? Get in touch!</h3>

                  <div className="mt-6">
                    <Link href="/contact" className="btn bg-transparent hover:bg-green-600 border border-green-600 text-green-600 hover:text-white rounded-md">
                      <FiPhone className="align-middle me-2"/> Contact us
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
      <Switcher/>
    </>
  )
} 