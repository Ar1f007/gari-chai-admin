import TextInput from "../UI/Form/TextInput";

export const EngineInfo = () => {
  return (
    <div>
      <h6 className="font-semibold text-bodydark1 mb-3 uppercase">
        Engine Specific Info{" "}
        <small className="text-xs lowercase">(optional)</small>
      </h6>
      <div className="flex flex-col xl:flex-row gap-5">
        <TextInput
          name="engine.numOfCylinders"
          type="number"
          label="Number of Cylinder"
          placeholder="eg. 4"
          required={false}
        />

        <TextInput
          name="engine.horsePower"
          label="Horse Power"
          type="number"
          placeholder="eg. 200"
          required={false}
        />

        <TextInput
          name="engine.torque"
          label="Torque"
          type="number"
          placeholder="eg. 250"
          required={false}
        />
      </div>
    </div>
  );
};
