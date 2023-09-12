import { useState ,useContext} from "react";
import { useNavigate } from "react-router-dom";
import { packsContext } from "../context/packs";
function Packs() {

  let navigate = useNavigate();
  let context = useContext(packsContext);
  let [name, setName] = useState("");
  let [url, setUrl] = useState("");
  let [form, setForm] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    context.setPacks([...context.packs, { name, url, items: [] }]);

    console.log(context.packs);
    setForm(!form);
  }

  return (
    <>
      <div className="d-flex flex-row-reverse mt-2 me-2">
        <button className="btn btn-primary" onClick={() => setForm(!form)}>
          Create Item Pack
        </button>
      </div>
      <div className="card card-body">
        {form ? (
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="mb-3">
              <label className="form-label">Name of Items Pack</label>
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                required
                value={name}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Cover Image Url</label>
              <input
                type="text"
                onChange={(e) => setUrl(e.target.value)}
                value={url}
                className="form-control"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Add Item Pack
            </button>
          </form>
        ) : (
          ""
        )}
      </div>

      <div className="d-flex flex-row justify-content-around flex-wrap">
        {context.packs.map((item, index) => (
          <div key={index} class="card" style={{ width: "18rem" }}>
            <img src={item.url} className="card-img-top" alt={item.name} />
            <div className="card-body">
              <h5 className="card-title">{item.name}</h5>
              <p className="card-text"></p>
              <button className="btn btn-primary" onClick={() => navigate(`/items/${index}`)}>Go To Items</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Packs;
