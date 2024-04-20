import Loader from "@/components/SpinnerComponent/spinner";

const HomeLoading = () => {
  return (
    <>
      <div
        style={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Loader />
      </div>
    </>
  );
};

export default HomeLoading;
