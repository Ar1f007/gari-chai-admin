"use client";
import Select, { GroupBase, Props } from "react-select";

type SelectProps<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
> = Props<Option, IsMulti, Group>;

export function ReactSelect<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(props: SelectProps<Option, IsMulti, Group>) {
  return (
    <Select
      theme={(theme) => ({
        ...theme,
        colors: {
          ...theme.colors,
          primary: "hsl(var(--background))", // border color, non-selected menu items bg color,
          primary25: "hsl(var(--background))", // on hover -> bg color
          primary50: "hsl(var(--background))", // menu items background color when it is being clicked or on active state,
          neutral0: "hsl(var(--accent-foreground))", // selected item's text color
        },
      })}
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          paddingBlock: "2px",
          // Select Element bg color
          backgroundColor: state.isDisabled
            ? "hsl(var(--muted))"
            : "hsl(var(--background))",

          // Select Element border color when not focused
          borderColor: "hsl(var(--input))",
        }),
        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
        menuList: (base) => ({
          ...base,
          backgroundColor: "hsl(var(--accent))",
          color: "hsl(var(--muted-foreground))",
        }),
        singleValue: (base) => ({
          ...base,
          color: "hsl(var(--popover-foreground))", // menu list item's text color
        }),
        input(base, props) {
          return {
            ...base,
            color: "hsl(var(--popover-foreground))",
          };
        },
        multiValueRemove(base, props) {
          return {
            ...base,
            color: "hsl(var(--muted-foreground))",
          };
        },
      }}
      menuPortalTarget={document.body}
      {...props}
    />
  );
}
