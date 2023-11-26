import TextInput from "../UI/Form/TextInput";

export const SpeedAndPerformance = () => {
  return (
    <div>
      <div>
        <h6 className="font-semibold dark:text-bodydark1 mb-3 uppercase">
          Acceleration <small className="text-xs lowercase">(optional)</small>
        </h6>

        <div className="flex flex-col xl:flex-row gap-5">
          <TextInput
            name="acceleration.zeroTo60"
            label="0 to 60 kmpl (Time takes to reach)"
            type="number"
            placeholder="eg: 7 seconds"
            required={false}
          />

          <TextInput
            name="acceleration.topSpeed"
            label="Top Speed"
            type="number"
            placeholder="eg: 120"
            required={false}
          />
        </div>
      </div>
    </div>
  );
};
