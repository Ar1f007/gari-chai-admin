import clsx from "clsx";
import { TSlider, sliderService } from "@/services/slider";
import Image from "next/image";
import EditDeleteSliderButton from "./EditDeleteSliderButton";

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

      <ul className="grid grid-cols-1 lg:grid-cols-4 gap-5">
        {res.data.map((slider) => (
          <li
            key={slider._id}
            className="w-full flex flex-col justify-between gap-3 py-6 px-4 bg-form-input rounded-md max-h-500"
          >
            <Image
              src={slider.imgUrl}
              alt="slider"
              width={300}
              height={100}
              className="h-auto max-h-[150px] w-full object-cover"
            />

            <div className="w-full space-y-2">
              <div className="flex justify-between">
                <p
                  className={clsx(
                    "w-fit [word-wrap: break-word] my-[5px] mr-4 flex h-[32px] cursor-pointer items-center justify-between rounded-[16px] px-[12px] py-0 text-[13px] font-normal leading-loose text-white",
                    {
                      "bg-success": slider.status === "active",
                      "bg-danger": slider.status !== "active",
                    }
                  )}
                >
                  {slider.status === "active" ? "Active" : "Hidden"}
                </p>

                <p className="uppercase w-fit [word-wrap: break-word] my-[5px] mr-4 flex h-[32px] cursor-pointer items-center justify-between rounded-[16px] bg-transparent border-1 border-[#eceff1] px-[12px] py-0 text-[13px] font-normal leading-loose text-[#eceff1]">
                  {slider.type}
                </p>
              </div>
              <EditDeleteSliderButton sliderItem={slider} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
