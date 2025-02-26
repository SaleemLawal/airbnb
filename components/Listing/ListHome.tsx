import React from "react";
import { Button } from "../ui/button";
import MultiStepDialogContent from "../MultiStepDialog";

export default function ListHome() {
  return (
    <MultiStepDialogContent title="Airbnb your home!" isRegistration={true}>
      <Button variant="ghost" className="rounded-full py-3 h-full">
        Airbnb your home
      </Button>
    </MultiStepDialogContent>
  );
}
