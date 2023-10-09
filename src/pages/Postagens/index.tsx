import CardPostagem from "../../components/CardPostagem";

export default function Postagens() {
  return (
    <main>
      <div className="container mt-5">
        <h1 className="display-5 fw-bold mb-5">Todas as postagens</h1>
        <div className="row">
          {Array.from(Array(10).keys()).map((id) => (
            <div className="col-4 mb-4">
              <CardPostagem />
            </div>
          ))}
        </div>

        <footer className="pt-3 my-4 text-body-secondary border-top">
          PI 2 • 2023
        </footer>
      </div>
    </main>
  );
}
