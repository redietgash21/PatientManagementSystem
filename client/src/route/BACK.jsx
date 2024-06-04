import { useNavigate } from "react-router-dom";

export const BACK = () => {
  let navigate = useNavigate();
  return (
    <>
      <button onClick={() => navigate(-1)}>Back</button>
    </>
  );
};
