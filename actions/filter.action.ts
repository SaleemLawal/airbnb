import { DateRange } from "react-day-picker";

interface filtersSelectedProps {
  location: string;
  dateRange: DateRange | undefined;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
}
export const filter = async (values: filtersSelectedProps) => {
  console.log(values);

  return { success: "Filters applied" };
};
