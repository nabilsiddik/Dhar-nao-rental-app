export type ChangeEventHandler = (
  e: React.ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >,
) => void;

interface FormInputProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  value?: string | number;
  defaultValue?: string | number;
  onChange?: ChangeEventHandler;
  isTextArea?: boolean;
  disabled?: boolean;
}

const FormInput = ({
  label,
  name,
  type = "text",
  disabled = false,
  placeholder,
  required,
  value,
  defaultValue, // Add this
  onChange,
  isTextArea,
}: FormInputProps) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-sm font-bold text-gray-900">
        {label} {required && "*"}
      </label>
      {isTextArea ? (
        <textarea
          name={name}
          defaultValue={defaultValue} // Pass it here
          value={value}
          rows={4}
          placeholder={placeholder}
          className="w-full bg-[#E5E7EB]/50 border border-transparent focus:border-primary px-4 py-3 rounded-xl outline-none transition-all resize-none text-gray-700"
          onChange={onChange}
        />
      ) : (
        <input
          type={type}
          name={name}
          disabled={disabled}
          defaultValue={defaultValue} // Pass it here
          value={value}
          placeholder={placeholder}
          className="w-full bg-[#E5E7EB]/50 border border-transparent focus:border-primary px-4 py-3 rounded-xl outline-none transition-all text-gray-700 font-medium"
          onChange={onChange}
        />
      )}
    </div>
  );
};

export default FormInput;
