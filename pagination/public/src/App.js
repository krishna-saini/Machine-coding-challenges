import "./App.css";
import { useEffect, useState } from "react";

export default function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const renderPagesBtn = () =>
    [...Array(products.length / 10)].map((_, index) => {
      return <span>{index + 1}</span>;
    });

  const fetchProducts = async () => {
    try {
      const res = await fetch(
        `https://dummyjson.com/products?limit=9&skip=${page * 9 - 9}`
      );
      const data = await res.json();

      if (data && data.products) {
        setProducts(data.products);
        setTotalPages(Math.ceil(data.total / 9));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const selectedPageHandler = (selectedPage, event) => {
    if (
      event?.keyCode === 13 ||
      event?.key === "Enter" ||
      event?.type === "click"
    ) {
      selectedPage !== page && setPage(selectedPage);
    }
  };

  useEffect(() => {
    // call this whenever page is changed
    fetchProducts();
  }, [page]);

  return (
    <>
      {products.length > 0 && (
        <div className="products">
          {products.map((product, index) => {
            return (
              <div tabIndex="0" key={product.id} className="product__single">
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
          {page !== 1 && (
            <span
              tabIndex="0"
              onKeyDown={(e) => selectedPageHandler(page - 1, e)}
              onClick={(e) => selectedPageHandler(page - 1, e)}
              aria-label={`Click me to go from  ${page} to ${page - 1}`}
            >
              Prev
            </span>
          )}
          {/* {renderPagesBtn()} */}
          {[...Array(totalPages)].map((_, index) => {
            return (
              <span
                tabIndex="0"
                role="button"
                key={index}
                onKeyDown={(e) => selectedPageHandler(index + 1, e)}
                onClick={(e) => selectedPageHandler(index + 1, e)}
                className={page === index + 1 ? "selectedPage" : ""}
                aria-label={`Click me to change the page number to ${page}`}
              >
                {index + 1}
              </span>
            );
          })}
          {page < totalPages && (
            <span
              tabIndex="0"
              onKeyDown={(e) => selectedPageHandler(page + 1, e)}
              onClick={(e) => selectedPageHandler(page + 1, e)}
              aria-label={`Click me to go from  ${page} to ${page + 1}`}
            >
              Next
            </span>
          )}
        </div>
      )}
    </>
  );
}
