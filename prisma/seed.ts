import { PrismaClient } from '@prisma/client';
import users from '../src/fixtures/fake-data/users.json';

const prisma = new PrismaClient();

async function main() {
  const geoData = users.map((user) => user.address.geo);
  const createdGeos = await prisma.geo.createMany({ data: geoData });
  const geos = await prisma.geo.findMany();
  console.log(`Created ${createdGeos.count} geos`);

  const addressData = users.map(({ address: { geo, ...address } }) => ({
    ...address,
    geoId: geos.find((_geo) => _geo.lat === geo.lat && _geo.lng === geo.lng)!
      .id,
  }));
  const createdAddresses = await prisma.address.createMany({
    data: addressData,
  });
  const addresses = await prisma.address.findMany();
  console.log(`Created ${createdAddresses.count} addresses`);

  const companyData = users.map((user) => user.company);
  const createdCompanies = await prisma.company.createMany({
    data: companyData,
  });
  const companies = await prisma.company.findMany();
  console.log(`Created ${createdCompanies.count} companies`);

  const userData = users.map((user) => ({
    name: user.name,
    username: user.username,
    email: user.email,
    addressId: addresses.find(
      (address) =>
        address.street === user.address.street &&
        address.suite === user.address.suite &&
        address.city === user.address.city &&
        address.zipcode === user.address.zipcode,
    )!.id,
    phone: user.phone,
    website: user.website,
    companyId: companies.find((company) => company.name === user.company.name)!
      .id,
  }));
  const createdUsers = await prisma.user.createMany({
    data: userData,
  });
  console.log(`Created ${createdUsers.count} users`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
