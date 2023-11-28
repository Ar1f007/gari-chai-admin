"use client";

import { THomeSettingApiSchema } from "@/services/home";

import Modal from "../Dialog/Dialog";
import AddItemForm from "./AddItemForm";
import { carCategoryOptions } from "@/util/constants";
import { TCarSchema } from "@/services";
import { SelectOption } from "@/types/others";

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
  const carContent = item.content as TCarSchema;

  function findLabel() {
    const option = carCategoryOptions.find(
      (option) => option.value === item.tags[0]
    );

    return option ? option.value : "";
  }

  const brand: SelectOption = {
    label: carContent.brand.name,
    value: carContent.brand.id as string,
  };

  const car = {
    value: carContent,
    label: carContent.name,
    image: carContent.posterImage.thumbnailUrl,
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
