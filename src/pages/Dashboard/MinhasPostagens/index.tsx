import CardPostagem from "../../../components/CardPostagem";

export default function MinhasPostagens() {
  return (
    <>
      <h1 className="display-5 fw-bold mb-5">Minhas postagens</h1>
      <div className="row">
        {Array.from(Array(3).keys()).map((id) => (
          <div className="col-4 mb-4" key={id}>
            {/* <CardPostagem /> */}
          </div>
        ))}
      </div>
    </>
  );
}
