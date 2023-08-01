import "./App.css";
import { useEffect, useState } from "react";

export default function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  const renderPrevBtn = () => {
    const shouldRenderPrevBtn = page !== 1 && products.length <= 9;
    return (
      shouldRenderPrevBtn && (
        <button onClick={setPage((prev) => prev--)}>Prev</button>
      )
    );
  };

  const renderNextBtn = () => {
    const shouldRenderNextBtn =
      products.length % (10 * (page - 1)) > 10 && products.length <= 10;
    return (
      shouldRenderNextBtn && (
        <button onClick={setPage((prev) => prev++)}>Next</button>
      )
    );
  };

  const renderPagesBtn = () =>
    [...Array(products.length / 10)].map((_, index) => {
      return <span>i</span>;
    });

  const fetchProducts = async () => {
    try {
      const res = await fetch("https://dummyjson.com/products");
      const data = await res.json();
      console.log(data);
      if (data && data.products) {
        setProducts(data.products);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  console.log(Array(products.length / 10), "i", [
    ...Array(products.length / 10)
  ]);
  return (
    <>
      {products.length > 0 && (
        <div className="products">
          {products.slice(page * 9 - 9, page * 9).map((product, index) => {
            return (
              <div key={product.id} className="product__single">
                {/* bam convention classname  */}
                <img src={product.thumbnail} alt={product.title} />
                <span>{product.title}</span>
              </div>
            );
          })}
        </div>
      )}
      {products.length > 0 && (
        <div className="pagination">
          <button>back</button>
          {[...Array(products.length / 10)].map((_, index) => {
            return <span>{index + 1}</span>;
          })}
          <button>Next</button>
        </div>
      )}
    </>
  );
}
