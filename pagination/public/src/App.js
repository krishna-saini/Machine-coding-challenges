import "./App.css";
import { useEffect, useState } from "react";

export default function App() {
  console.log("render app.kjs");
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  const renderPagesBtn = () =>
    [...Array(products.length / 10)].map((_, index) => {
      return <span>{index + 1}</span>;
    });

  const fetchProducts = async () => {
    try {
      const res = await fetch("https://dummyjson.com/products");
      const data = await res.json();

      if (data && data.products) {
        setProducts(data.products);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const selectedPageHandler = (selectedPage) => {
    if (selectedPage !== page) {
      setPage(selectedPage);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

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
      {products.length > 9 && (
        <div className="pagination">
          {page !== 1 && (
            <span onClick={() => selectedPageHandler(page - 1)}>Prev</span>
          )}
          {/* {renderPagesBtn()} */}
          {[...Array(Math.ceil(products.length / 9))].map((_, index) => {
            return (
              <span
                key={index}
                onClick={() => selectedPageHandler(index + 1)}
                className={page === index + 1 ? "selectedPage" : ""}
              >
                {index + 1}
              </span>
            );
          })}
          {page < products.length / 9 && (
            <span onClick={() => selectedPageHandler(page + 1)}>Next</span>
          )}
        </div>
      )}
    </>
  );
}
