import { useState, useContext } from "react";
import FormModal from "./FormModal";
import { api } from "~/utils/api";
import { UserContext } from "~/root";

const MenuPanel = ({ products, categories }: any) => {
  const user = useContext(UserContext);
  const [currentCategory, setCurrentCategory] = useState("burgers");

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [productsData, setProductsData] = useState(products);

  const handleAdd = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const name = formData.get("name");
    const photoUrl = formData.get("photoUrl");
    const description = formData.get("description");
    const price = formData.get("price");
    const ingredients = formData.get("ingredients");
    const categoryId = formData.get("categoryId");

    const jwtToken = user?.jwtToken;
    const res = await api.post(
      "/menu",
      {
        name: name,
        photoUrl: photoUrl,
        description: description,
        price: Number(price),
        rating: 0,
        numberOfRatings: 0,
        ingredients: ingredients,
        category: {
          connect: {
            categoryId: categoryId,
          },
        },
      },
      {
        headers: { Authorization: `Bearer ${jwtToken}` },
      }
    );

    if (res.status === 201) {
      const newProduct = {
        id: res.data?.menuItem?.itemId,
        name: res.data?.menuItem?.name,
        description: res.data?.menuItem?.description,
        category: res.data?.menuItem?.category.categoryName,
        ingredients: res.data?.menuItem?.ingredients,
        price: res.data?.menuItem?.price,
        rating: res.data?.menuItem?.rating,
        numberOfRatings: res.data?.menuItem?.numberOfRatings,
        image: res.data?.menuItem?.photoUrl,
        added: res.data?.menuItem?.createdAt,
      };
      setProductsData((productsData) => [...productsData, newProduct]);
    }

    e.target.reset();
    setShowAddModal(false);
  };

  const handleEdit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const name = formData.get("name");
    const photoUrl = formData.get("photoUrl");
    const description = formData.get("description");
    const price = formData.get("price");
    const ingredients = formData.get("ingredients");
    const categoryId = formData.get("category");

    const jwtToken = user?.jwtToken;
    const res = await api.patch(
      `/menu/${selectedProduct?.id}`,
      {
        name: name,
        photoUrl: photoUrl,
        description: description,
        price: Number(price),
        rating: selectedProduct?.rating,
        numberOfRatings: selectedProduct?.numberOfRatings,
        ingredients: ingredients,
        category: {
          connect: {
            categoryId: categoryId,
          },
        },
      },
      {
        headers: { Authorization: `Bearer ${jwtToken}` },
      }
    );

    if (res.status === 200) {
      const updatedProduct = {
        id: res.data?.menuItem?.itemId,
        name: res.data?.menuItem?.name,
        description: res.data?.menuItem?.description,
        category: res.data?.menuItem?.category?.categoryName,
        ingredients: res.data?.menuItem?.ingredients,
        price: res.data?.menuItem?.price,
        rating: res.data?.menuItem?.rating,
        numberOfRatings: res.data?.menuItem?.numberOfRatings,
        image: res.data?.menuItem?.photoUrl,
        added: res.data?.menuItem?.createdAt,
      };
      setProductsData((productsData) =>
        productsData.map((product) =>
          product.id === updatedProduct.id ? updatedProduct : product
        )
      );
    }

    setShowEditModal(false);
  };

  const handleDelete = async (productId) => {
    const jwtToken = user?.jwtToken;
    const res = await api.delete(`/menu/${productId}`, {
      headers: { Authorization: `Bearer ${jwtToken}` },
    });

    if (res.status === 200) {
      setProductsData((productsData) =>
        productsData.filter((product) => product.id !== productId)
      );
    }
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-5">
      <h1 className="text-2xl font-bold">Menu</h1>
      <div className="flex w-full justify-end gap-4">
        <select
          className="w-max rounded-lg border border-rose-400 bg-inherit px-3 py-1 text-base text-rose-400 focus:border-rose-400 focus:ring-0"
          defaultValue={currentCategory}
          onChange={(e) => setCurrentCategory(e.target.value)}
        >
          {categories?.map((category) => (
            <option
              key={category?.id}
              value={category?.name?.toLowerCase()}
              className="bg-orange-100"
            >
              {category?.name?.charAt(0)?.toUpperCase() +
                category?.name?.slice(1)}
            </option>
          ))}
        </select>
        <button
          onClick={() => setShowAddModal(true)}
          className="w-max rounded-lg border border-gray-700 bg-rose-400 px-3 py-1 text-base text-white hover:bg-rose-500 hover:text-white"
        >
          Add
        </button>
      </div>
      <ul className="mx-auto flex w-full flex-col  gap-2">
        {productsData
          ?.filter((product) => product?.category === currentCategory)
          ?.map((product) => (
            <li
              key={product?.id}
              className="flex w-full items-center gap-3 rounded-lg border border-gray-700 bg-orange-100 p-1 pr-3"
            >
              <img
                src={product?.image}
                alt={product?.name}
                className="aspect-square w-12 rounded-lg border-2 border-gray-700"
              />
              <span className="w-full text-xl font-bold">
                {product?.name?.charAt(0)?.toUpperCase() +
                  product?.name?.slice(1)}
              </span>
              <div className="flex w-max items-center justify-end gap-4">
                <button
                  onClick={() => {
                    setSelectedProduct(product);
                    setShowEditModal(true);
                  }}
                  className="w-max rounded-lg border border-rose-400 px-3 py-1 text-base text-rose-400 hover:bg-rose-500 hover:text-white"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product?.id)}
                  className="w-max rounded-lg border border-rose-400 px-3 py-1 text-base text-rose-400 hover:bg-rose-500 hover:text-white"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
      </ul>
      <FormModal showModal={showAddModal} setShowModal={setShowAddModal}>
        <form className="p-4" onSubmit={handleAdd}>
          <div className="grid w-full grid-cols-1 gap-4 px-4 sm:grid-cols-2">
            <div className="flex flex-col items-center justify-center">
              <label htmlFor="name" className="text-gray-500">
                Name:
              </label>
              <input
                type="text"
                name="name"
                required
                className="rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700"
              />{" "}
            </div>
            <div className="flex flex-col items-center justify-center">
              <label htmlFor="photoUrl" className="text-gray-500">
                Photo Url:{" "}
              </label>
              <input
                type="text"
                name="photoUrl"
                required
                className="rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700"
              />{" "}
            </div>
            <div className="flex flex-col items-center justify-center">
              <label htmlFor="categoryId" className="text-gray-500">
                Category:
              </label>
              <select
                name="categoryId"
                required
                className="w-full rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700 focus:border-gray-700 focus:ring-0"
              >
                {categories?.map((category) => (
                  <option
                    key={category?.id}
                    value={category?.id}
                    className="bg-orange-100"
                  >
                    {category?.name?.charAt(0)?.toUpperCase() +
                      category?.name?.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col items-center justify-center">
              <label htmlFor="price" className="text-gray-500">
                Price:
              </label>
              <input
                type="number"
                min={0}
                step={0.01}
                name="price"
                required
                className="rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700"
              />
            </div>
            <div className="flex flex-col items-center justify-center">
              <label htmlFor="ingredients" className="text-gray-500">
                Ingredients:{" "}
              </label>
              <input
                type="text"
                name="ingredients"
                required
                className="rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700"
              />{" "}
            </div>
            <div className="flex flex-col items-center justify-center">
              <label htmlFor="description" className="text-gray-500">
                Description:{" "}
              </label>
              <input
                type="text"
                name="description"
                required
                className="rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700"
              />{" "}
            </div>
          </div>
          <div className="flex w-full justify-center">
            <button
              type="submit"
              className="mt-8 w-max rounded-lg bg-rose-400 px-10 py-1 text-base text-white hover:bg-rose-500"
            >
              Add
            </button>
          </div>
        </form>
      </FormModal>
      <FormModal showModal={showEditModal} setShowModal={setShowEditModal}>
        <form className="p-4" onSubmit={handleEdit}>
          <div className="grid w-full grid-cols-1 gap-4 px-4 sm:grid-cols-2">
            <div className="flex flex-col items-center justify-center">
              <label htmlFor="name" className="text-gray-500">
                Name:
              </label>
              <input
                type="text"
                name="name"
                required
                defaultValue={selectedProduct?.name}
                className="rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700"
              />{" "}
            </div>
            <div className="flex flex-col items-center justify-center">
              <label htmlFor="photoUrl" className="text-gray-500">
                Photo Url:{" "}
              </label>
              <input
                type="text"
                name="photoUrl"
                required
                defaultValue={selectedProduct?.image}
                className="rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700"
              />{" "}
            </div>
            <div className="flex flex-col items-center justify-center">
              <label htmlFor="category" className="text-gray-500">
                Category:
              </label>
              <select
                name="category"
                required
                className="w-full rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700 focus:border-gray-700 focus:ring-0"
              >
                {categories?.map((category) => (
                  <option
                    key={category?.id}
                    value={category?.id}
                    selected={category?.name === selectedProduct?.category}
                    className="bg-orange-100"
                  >
                    {category?.name?.charAt(0)?.toUpperCase() +
                      category?.name?.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col items-center justify-center">
              <label htmlFor="price" className="text-gray-500">
                Price:
              </label>
              <input
                type="number"
                min={0}
                step={0.01}
                name="price"
                required
                defaultValue={selectedProduct?.price}
                className="rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700"
              />
            </div>
            <div className="flex flex-col items-center justify-center">
              <label htmlFor="ingredients" className="text-gray-500">
                Ingredients:{" "}
              </label>
              <input
                type="text"
                name="ingredients"
                required
                defaultValue={selectedProduct?.ingredients}
                className="rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700"
              />{" "}
            </div>
            <div className="flex flex-col items-center justify-center">
              <label htmlFor="description" className="text-gray-500">
                Description:{" "}
              </label>
              <input
                type="text"
                name="description"
                required
                defaultValue={selectedProduct?.description}
                className="rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700"
              />{" "}
            </div>
          </div>
          <div className="flex w-full justify-center">
            <button
              type="submit"
              className="mt-8 w-max rounded-lg bg-rose-400 px-10 py-1 text-base text-white hover:bg-rose-500"
            >
              Update
            </button>
          </div>
        </form>
      </FormModal>
    </div>
  );
};

export default MenuPanel;
