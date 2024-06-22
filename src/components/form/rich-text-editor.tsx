import { useEffect, useRef } from "react";
import { Control, useController } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FormControl, FormItem, FormLabel, FormMessage } from "../ui/form";
import "./rich-text.css";

interface RichTextEditorProps {
  control: Control<any>;
  name: string;
  rules?: any;
}

export const RichTextEditor = ({
  control,
  name,
  rules,
}: RichTextEditorProps) => {
  const { field, fieldState } = useController({ name, control, rules });
  const editorRef = useRef<ReactQuill | null>(null);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }],
      [{ size: ["small", false, "large", "huge"] }], // Custom dropdown
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      ["clean"],
    ],
  };

  const formats = [
    "font",
    "header",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "list",
    "bullet",
    "align",
    "link",
  ];

  const debouncedOnChange = (value: string) => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      field.onChange(value);
    }, 500);
  };

  useEffect(() => {
    if (editorRef.current) {
      debouncedOnChange(editorRef.current.getEditor().root.innerHTML);
    }
  }, []);

  return (
    <FormItem>
      <FormLabel>{name.charAt(0).toUpperCase() + name.slice(1)}</FormLabel>
      <FormControl>
        <ReactQuill
          ref={editorRef}
          value={field.value}
          onChange={(content) => debouncedOnChange(content)}
          theme="snow"
          modules={modules}
          formats={formats}
        />
      </FormControl>
      {fieldState.error && (
        <FormMessage>{fieldState.error.message}</FormMessage>
      )}
    </FormItem>
  );
};
