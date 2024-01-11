
export const Indicator = (props: {
  label: string;
  value: string;
}) => {
  return (
    <div className="flex flex-col items-center justify-center border border-gray-300 p-2">
      <div className="text-xl font-bold text-center">{props.value}</div>
      <div className="text-xs text-gray-500 text-center">{props.label}</div>
    </div>
  );
};