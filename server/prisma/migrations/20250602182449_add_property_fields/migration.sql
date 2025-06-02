-- CreateEnum
CREATE TYPE "PropertyCategory" AS ENUM ('FLAT', 'COTTAGE', 'HOUSE', 'LAND', 'PROJECT', 'VILLA');

-- CreateEnum
CREATE TYPE "PropertyStatus" AS ENUM ('ACTIVE', 'SOLD');

-- CreateEnum
CREATE TYPE "OwnershipType" AS ENUM ('RENT', 'OWNERSHIP');

-- CreateTable
CREATE TABLE "properties" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "category" "PropertyCategory" NOT NULL,
    "status" "PropertyStatus" NOT NULL DEFAULT 'ACTIVE',
    "ownershipType" "OwnershipType" NOT NULL,
    "description" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "virtualTour" TEXT,
    "videoUrl" TEXT,
    "size" TEXT NOT NULL,
    "beds" TEXT NOT NULL,
    "baths" TEXT NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "discountedPrice" DECIMAL(10,2),
    "buildingStoriesNumber" TEXT,
    "buildingCondition" TEXT,
    "apartmentCondition" TEXT,
    "aboveGroundFloors" TEXT,
    "reconstructionYearApartment" TEXT,
    "reconstructionYearBuilding" TEXT,
    "totalAboveGroundFloors" TEXT,
    "totalUndergroundFloors" TEXT,
    "floorArea" TEXT,
    "builtUpArea" TEXT,
    "gardenHouseArea" TEXT,
    "terraceArea" TEXT,
    "totalLandArea" TEXT,
    "gardenArea" TEXT,
    "garageArea" TEXT,
    "balconyArea" TEXT,
    "pergolaArea" TEXT,
    "basementArea" TEXT,
    "workshopArea" TEXT,
    "totalObjectArea" TEXT,
    "usableArea" TEXT,
    "landArea" TEXT,
    "objectType" TEXT,
    "objectLocationType" TEXT,
    "houseEquipment" TEXT,
    "accessRoad" TEXT,
    "objectCondition" TEXT,
    "reservationPrice" TEXT,
    "equipmentDescription" TEXT,
    "additionalSources" TEXT,
    "buildingPermit" TEXT,
    "buildability" TEXT,
    "utilitiesOnLand" TEXT,
    "utilitiesOnAdjacentRoad" TEXT,
    "payments" TEXT,
    "brokerId" TEXT,
    "secondaryAgent" TEXT,
    "rating" DECIMAL(3,1) NOT NULL,
    "reviewCount" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "properties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "property_images" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "isMain" BOOLEAN NOT NULL DEFAULT false,
    "property_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "property_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "property_floorplans" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "property_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "property_floorplans_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "property_images" ADD CONSTRAINT "property_images_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "property_floorplans" ADD CONSTRAINT "property_floorplans_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;
