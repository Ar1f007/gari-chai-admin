import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type PageSizeProps = {
  defaultValue: string;
  onValueChange: (v: string) => void;
  options: number[];
};

export const SelectPageSize = ({
  defaultValue,
  onValueChange,
  options,
}: PageSizeProps) => {
  return (
    <Select
      onValueChange={onValueChange}
      defaultValue={defaultValue}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Page size" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((item) => (
            <SelectItem
              value={item + ""}
              key={item}
            >
              {item}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
