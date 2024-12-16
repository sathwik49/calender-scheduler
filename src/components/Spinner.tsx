
export const Spinner = ({ color = "border-white" }: { color?: string }) => (
  <div
    className={`w-6 h-6 border-4 ${color} border-t-transparent rounded-full animate-spin`}
  ></div>
);
