import { Spinner } from "react-bootstrap";

const HomeLoading = () => {
  return (
    <>
      <div style={{ height: "100%", border: "1px solid red" }}>
        <Spinner />
      </div>
    </>
  );
};

export default HomeLoading;
