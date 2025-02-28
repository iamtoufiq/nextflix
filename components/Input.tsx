interface InputProps {
  id: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  value: string;
  label: string;
  type?: string;
  required?: boolean
}

const Input: React.FC<InputProps> = ({ id, onChange, value, label, type ,required}) => {
  //TODO : do the reaminging things as spread it {...}
  return (
    <div className="relative">
      <input
        autoComplete={type === "password" ? "off" : undefined}
        id={id}
        type={type}
        className="block rounded-md px-3 lg:px-6 pt-6 pb-1 w-full text-md bg-neutral-700 appearance-none focus:outline-none focus:ring-0 peer"
        value={value}
        onChange={onChange}
        placeholder=""
        required={required}
      />
      <label
        htmlFor={id}
        className="absolute text-md text-zinc-400 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-3 lg:left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
