"use client";

import { THomeSettingApiSchema } from "@/services/home";

import Modal from "../Dialog/Dialog";
import AddItemForm from "./AddItemForm";
import { settingsSectionToAddOptions } from "@/util/constants";

type EditItemProps = {
  isOpen: boolean;
  item: THomeSettingApiSchema;
  handleClose: () => void;
  pageSlug: string;
};
const EditItemForm = ({
  isOpen,
  item,
  handleClose,
  pageSlug,
}: EditItemProps) => {
  function findLabel() {
    const option = settingsSectionToAddOptions.find(
      (option) => option.value === item.tags[0]
    );

    console.log("000", option);

    return option ? option.value : "";
  }

  const brand = {
    label: item.content.brand.name,
    value: item.content.brand.slug,
  };

  const car = {
    value: item.content,
    label: item.content.name,
    image: item.content.imageUrls?.[0],
  };

  const sectionToAdd = {
    value: item.sectionName,
    label: item.sectionName,
  };

  const sort = item.sort;

  function findTagValues() {
    return {
      value: item.tags[0],
      label: findLabel(),
    };
  }

  return (
    <>
      {isOpen && (
        <Modal
          title="Update setting"
          isOpen={isOpen}
          onClose={handleClose}
          disableBackdropClick
        >
          <AddItemForm
            brand={brand}
            car={car}
            sectionToAdd={sectionToAdd}
            sort={sort}
            tag={item.tags.length ? findTagValues() : undefined}
            closeModalHandler={handleClose}
            isEditing={true}
            pageSlug={pageSlug}
          />
        </Modal>
      )}
    </>
  );
};
export default EditItemForm;
