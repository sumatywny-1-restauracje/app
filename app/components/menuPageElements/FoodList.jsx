import FoodElement from "../foodElement/FoodElement";

const FoodList = ({ productsToDisplay, setDisplayNumberOfProducts }) => {
  const products = productsToDisplay?.products;
  const totalNumberOfCategoryProducts =
    productsToDisplay?.totalNumberOfCategoryProducts;

  return (
    <div className="flex w-full max-w-screen-2xl flex-col gap-8">
      <div className="mx-auto flex w-4/6 flex-wrap content-center gap-12 sm:grid sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <FoodElement key={product?.id} product={product} />
        ))}
      </div>
      <div
        className={
          " flex w-full flex-col items-center gap-2 " +
          (products.length === totalNumberOfCategoryProducts && "hidden")
        }
      >
        <div className="w-1/3 border border-dashed border-rose-400" />
        <button
          className="w-max bg-transparent font-bold text-rose-400 hover:text-rose-500"
          onClick={() =>
            setDisplayNumberOfProducts(productsToDisplay.length + 9)
          }
        >
          <div className="flex flex-col">
            <span className="text-2xl font-bold">
              -&gt; Load More Products &lt;-
            </span>
            <span className="text-xs font-normal">
              (Displayed {products.length} Of Total{" "}
              {totalNumberOfCategoryProducts})
            </span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default FoodList;
