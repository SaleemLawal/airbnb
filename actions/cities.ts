"use server";

export const getCities = async () => {
  const response = await fetch(
    "https://wft-geo-db.p.rapidapi.com/v1/geo/cities?countryIds=US&limit=10&sort=-population",
    {
      headers: {
        "x-rapidapi-key": "08ae3fd9f6msh45ec5b83ca4aa3cp1bfaafjsned0da28c243e",
        "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
      },
    },
  );

  return await response.json();
};
