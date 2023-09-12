import { useParams } from "react-router-dom";
import { packsContext } from "../context/packs";
import { useContext, useState } from "react";
function Items() {
  let { index } = useParams();
  let context = useContext(packsContext);
  let [form, setForm] = useState(false);

  let [name, setName] = useState("");
  let [price, setPrice] = useState("");
  let [url, setUrl] = useState("");
  let [total,setTotal] = useState(0);

  function handleSubmit(e) {
    e.preventDefault();

    if (context.packs) {
      let Packs = context.packs;

      if (Packs[index].items.length < 8) {
        Packs[index].items.push({ name, price, url, select: false });
        context.setPacks(Packs);
        setName("");
        setPrice("");
        setForm(!form);
        setUrl("");

        console.log(context.packs);
      } else {
        console.log("length above to 8 can't add");
      }
    }
  }

  function handleSelect(i) {
    let Packs = context.packs;

    Packs[index].items[i].select = !Packs[index].items[i].select;
    setTotal(total + Number(Packs[index].items[i].price));
    context.setPacks(Packs);
    console.log(context.packs);
  }

  function handleSelected(i) {
    let Packs = context.packs;
    Packs[index].items[i].select = !Packs[index].items[i].select;
    if (total - Packs[index].items[i].price >= 0){
      setTotal(total - Number(Packs[index].items[i].price));
    }
    context.setPacks(Packs);
    console.log(context.packs);
  }

  return (
    <>
   
      <div className="d-flex flex-row-reverse justify-content-around mt-2 me-2">
        <h6>Total Price : {total}</h6>
        <button className="btn btn-primary" onClick={() => setForm(!form)}>
          Add Item Packs
        </button>
      </div>
      <div className="card card-body">
        {form ? (
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="mb-3">
              <label className="form-label">Name of Item</label>
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
                min={1}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Price of Item</label>
              <input
                type="number"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                className="form-control"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Add Items
            </button>
          </form>
        ) : (
          ""
        )}
      </div>

      {/* items */}

      <div className="d-flex flex-row justify-content-around flex-wrap">
        {context.packs.length !== 0
          ? context.packs[index].items.map((item, index) => (
              <div key={index} className="card" style={{ width: "18rem" }}>
                <img
                  src={item.url}
                  className="card-img-top"
                  height={"300px"}
                  width={"200px"}
                  alt={item.name}
                />
                <div className="card-body">
                  <h5 className="card-title">Name : {item.name}</h5>
                  <p className="card-text">Price : Rs{item.price}</p>
                  {item.select ? (
                    <button
                      className="btn btn-success"
                      onClick={() => handleSelected(index)}
                    >
                      Selected
                    </button>
                  ) : (
                    <button
                      className="btn btn-primary"
                      onClick={() => handleSelect(index)}
                    >
                      Select
                    </button>
                  )}
                </div>
              </div>
            ))
          : ""}
      </div>
    </>
  );
}

export default Items;
