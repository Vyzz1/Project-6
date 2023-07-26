import "./Page404.css";
function Page404({ handleBackHome }) {
  return (
    <>
      <h1 className="title_no_data">Không có dữ liệu </h1>
      <p className="title_no_data">
        <b>No Data</b> Chưa có jobs nào
      </p>
      <section class="error-container">
        <span>
          <span>4</span>
        </span>
        <span>0</span>
        <span>
          <span>4</span>
        </span>
      </section>
      <div class="link-container">
        <button target="_blank" onClick={handleBackHome} class="more-link">
          Về trang chủ
        </button>
      </div>
    </>
  );
}
export default Page404;
