"use client";

type ErrorProps = {
  error: Error;
  reset: () => void;
};
const Error = ({ error, reset }: ErrorProps) => {
  return (
    <div>
      Error: {error.message}
      <br />
      <button onClick={() => reset()}>Reset</button>
    </div>
  );
};
export default Error;
