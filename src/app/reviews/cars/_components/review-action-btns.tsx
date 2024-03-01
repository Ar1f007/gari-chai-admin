"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Modal from "@/components/ui/modal";
import { Textarea } from "@/components/ui/textarea";
import { TCarsReview } from "@/schemas/reviews";
import { updateCarReview } from "@/services/reviews/car-reviews";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { toast } from "sonner";

export const ReviewActionBtns = ({
  review,
  isPending,
  startTransition,
}: {
  review: TCarsReview;
  isPending: boolean;
  startTransition: React.TransitionStartFunction;
}) => {
  const [showModal, setShowModal] = useState<"discard" | "details" | null>(
    null
  );
  const [discardReason, setDiscardReason] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  async function updateReview(review: TCarsReview) {
    try {
      const res = await updateCarReview(review);

      if (res.status === "success") {
        toast.success("Updated Successfully");
        router.refresh();
        return;
      }

      toast.error(res.message || "Something went wrong");
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  function onDiscardConfirm() {
    startTransition(() =>
      updateReview({ ...review, status: "discard", discardReason })
    );
  }

  function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setDiscardReason(e.target.value);

    if (e.target.value.length && error.length) {
      resetError();
    }
  }

  function resetDiscardInput() {
    setDiscardReason("");
  }

  function resetError() {
    setError("");
  }

  function handleCloseModal() {
    setShowModal(null);

    if (discardReason.length) {
      resetDiscardInput();
    }

    if (error.length) {
      resetError();
    }
  }

  function handleSubmit() {
    if (!discardReason.length) {
      setError("Please type discard reason before submitting");
      return;
    }

    handleCloseModal();
    onDiscardConfirm();
  }

  return (
    <div className="flex gap-1 flex-wrap">
      <Button
        variant="secondary"
        size="sm"
        disabled={isPending}
        onClick={() => setShowModal("details")}
      >
        View
      </Button>
      <Button
        variant="default"
        size="sm"
        onClick={() => updateReview({ ...review, status: "approved" })}
        disabled={isPending || review.status == "approved"}
      >
        Approve
      </Button>
      <Button
        variant="destructive"
        size="sm"
        onClick={() => setShowModal("discard")}
        disabled={isPending || review.status == "discard"}
      >
        Discard
      </Button>

      <Modal
        open={showModal == "discard"}
        variant="alert"
        title="Review Discard Reason"
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
      >
        <Label className="mb-2">Discard Reason</Label>
        <Textarea
          onChange={handleChange}
          value={discardReason}
          placeholder="Let user know why it is being discarded"
        />

        {!!error.length && <p className="text-sm text-destructive">{error}</p>}
      </Modal>

      <Modal
        open={showModal == "details"}
        variant="alert"
        title="Review Details"
        onClose={handleCloseModal}
        showOkButton={false}
        cancelButtonText="Close"
        enableOverlayClick
      >
        <div className="space-y-2 pl-5">
          <div className="flex gap-2 items-start">
            <strong>Title:</strong>
            <h3 className="first-letter:capitalize">{review.title}</h3>
          </div>
          <div className="flex gap-2 items-start">
            <strong>Review:</strong>
            <h3 className="first-letter:capitalize">{review.review}</h3>
          </div>

          <div className="flex gap-2 items-start">
            <strong>Ratings:</strong>
            <h3 className="first-letter:capitalize">{review.rating}</h3>
          </div>
        </div>
      </Modal>
    </div>
  );
};
