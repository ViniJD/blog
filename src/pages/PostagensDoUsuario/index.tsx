import CardPostagem from "../../CardPostagem";

export default function PostagensDoUsuarios() {
  return (
    <main>
      <div className="container mt-5">
        <h1 className="display-5 fw-bold mb-5">Postagens do Otávio</h1>
        <div className="row">
          {Array.from(Array(5).keys()).map((id) => (
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
