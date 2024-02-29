import { Button } from "@/components/ui/button";
import { TCarsReview } from "@/schemas/reviews";

export const ReviewActionBtns = ({ review }: { review: TCarsReview }) => {
  return (
    <div className="flex gap-1 flex-wrap">
      <Button variant="secondary">View</Button>
      <Button variant="secondary">Approve</Button>
      <Button variant="secondary">Discard</Button>
    </div>
  );
};
