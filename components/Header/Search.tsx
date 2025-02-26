import { Button } from "../ui/button";
import { Separator } from "@radix-ui/react-separator";
import { Search } from "lucide-react";
import MultiStepDialogContent from "../MultiStepDialog";

export default function SearchDialog() {
  return (
    <MultiStepDialogContent title="Filters" isRegistration={false}>
      <Button
        variant={"outline"}
        asChild
        className="cursor-pointer rounded-full py-6 pl-6 pr-2.5"
      >
        <div className="md:flex-0 flex-1 md:justify-center">
          <p>Anywhere</p>

          <Separator
            orientation="vertical"
            className="hidden h-6 w-[1px] bg-gray-200 md:block"
          />
          <p className="hidden md:block">Any week</p>

          <Separator
            orientation="vertical"
            className="hidden h-6 w-[1px] bg-gray-200 md:block"
          />
          <p className="hidden md:block">Add Guests</p>

          <div className="bg-red-bnb ml-auto flex h-10 w-10 items-center justify-center rounded-full ">
            <Search className="text-white" />
          </div>
        </div>
      </Button>
    </MultiStepDialogContent>
  );
}
