import { sliderService } from "@/services/slider";
import Image from "next/image";
import Button from "../UI/Form/Button";

export const SliderList = async () => {
  const res = await sliderService.getSliders();

  if (res.status !== "success") {
    return <p>Something went wrong</p>;
  }

  return (
    <div>
      <h2 className="text-title-md2 font-semibold text-black dark:text-white mb-5">
        Sliders
      </h2>

      <ul className="grid grid-cols-1 lg:grid-cols-4">
        {res.data.map((slider) => (
          <li
            key={slider._id}
            className="w-full flex flex-col gap-3 py-6 px-4 bg-form-input rounded-md"
          >
            <Image
              src={slider.imgUrl}
              alt="slider"
              width={300}
              height={300}
            />

            <div className="w-fit">
              <p className="[word-wrap: break-word] my-[5px] mr-4 flex h-[32px] cursor-pointer items-center justify-between rounded-[16px] bg-[#eceff1] px-[12px] py-0 text-[13px] font-normal normal-case leading-loose text-[#4f4f4f] shadow-none transition-[opacity] duration-300 ease-linear hover:!shadow-none dark:bg-neutral-600 dark:text-neutral-200">
                {slider.status === "active" ? "Active" : "Hidden"}
              </p>
            </div>

            <Button
              type="button"
              title="Edit"
              classes="py-2"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
