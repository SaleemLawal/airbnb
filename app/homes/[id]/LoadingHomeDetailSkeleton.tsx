import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
export default function LoadingHomeDetailSkeleton() {
  return (
    <div className="w-full px-4 sm:mx-auto md:w-[70%] lg:w-3/4 xl:w-3/6 pt-5 space-y-7">
      <div>
        <Skeleton className="w-1/3 h-6" />
        <Skeleton className="w-1/3 h-6 mt-2" />
      </div>
      <Skeleton className="w-full h-72 rounded-2xl" />

      <div className="lg:flex lg:gap-10 mt-7">
        <Card className="lg:order-1 lg:w-[50%] h-fit">
          <CardHeader>
            <CardTitle>
              <Skeleton className="w-1/3 h-6 mt-2" />
            </CardTitle>
          </CardHeader>

          <CardContent>
            <Skeleton className="w-full h-[325px] mt-2" />
          </CardContent>
          <CardFooter className="flex flex-col space-y-5">
            <Skeleton className="w-full h-12" />
            <div className="flex w-full justify-between">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-24" />
            </div>
          </CardFooter>
        </Card>
        <div className="lg:w-[50%] space-y-5">
          <div className="space-y-5">
            <div className="space-y-2">
              <Skeleton className="w-1/3 h-6" />
              <div className="flex space-x-3">
                <Skeleton className="w-1/3 h-6" />
                <Skeleton className="w-1/3 h-6" />
                <Skeleton className="w-1/3 h-6" />
              </div>
            </div>

            <Separator />
          </div>

          <div className="space-y-5">
            <div className="space-y-2">
              <Skeleton className="w-1/3 h-6" />
              <Skeleton className="w-2/3 h-6" />
            </div>

            <Separator />
          </div>

          <Skeleton className="w-full h-72 rounded-2xl mt-5" />
          <Separator />
          <Skeleton className="w-full h-[300px] rounded-2xl mt-5" />
        </div>
      </div>
    </div>
  );
}
