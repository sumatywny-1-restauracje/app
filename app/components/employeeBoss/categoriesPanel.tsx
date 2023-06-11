import { useState, useContext } from "react";
import FormModal from "./FormModal";
import { api } from "~/utils/api";
import { UserContext } from "~/root";

const CategoriesPanel = ({ categories }: any) => {
  const user = useContext(UserContext);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [categoriesData, setCategoriesData] = useState(categories);

  const handleAdd = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const categoryName = formData.get("categoryName");
    const photoUrl = formData.get("photoUrl");

    const jwtToken = user?.jwtToken;
    const res = await api.post(
      `/menu`,
      {
        name: "string",
        photoUrl: "string",
        description: "string",
        price: 0.01,
        rating: 5,
        numberOfRatings: 0,
        ingredients: "string",
        category: {
          create: {
            categoryName: categoryName,
            photoUrl: photoUrl,
          },
        },
      },
      {
        headers: { Authorization: `Bearer ${jwtToken}` },
      }
    );

    if (res.status === 201) {
      const res2 = await api.delete(`/menu/${res.data?.menuItem?.itemId}`, {
        headers: { Authorization: `Bearer ${jwtToken}` },
      });

      const newCategory = {
        id: res.data?.menuItem?.category?.categoryId,
        name: res.data?.menuItem?.category?.categoryName,
        image: {
          src: res.data?.menuItem?.category?.photoUrl,
          alt: res.data?.menuItem?.category?.categoryName,
        },
      };
      setCategoriesData((categoriesData) => [...categoriesData, newCategory]);
    }

    e.target.reset();
    setShowAddModal(false);
  };

  const handleEdit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const categoryName = formData.get("categoryName");
    const photoUrl = formData.get("photoUrl");
    console.log(selectedCategory?.id);
    const jwtToken = user?.jwtToken;
    const res = await api.patch(
      `/category/${selectedCategory?.id}`,
      {
        categoryName: categoryName,
        photoUrl: photoUrl,
      },
      {
        headers: { Authorization: `Bearer ${jwtToken}` },
      }
    );
    if (res.status === 200) {
      const updatedCategory = {
        id: res.data?.category?.categoryId,
        name: res.data?.category?.categoryName,
        image: {
          src: res.data?.category?.photoUrl,
          alt: res.data?.category?.categoryName,
        },
      };
      setCategoriesData((categoriesData) =>
        categoriesData.map((category) =>
          category.id === updatedCategory.id ? updatedCategory : category
        )
      );
    }

    setShowEditModal(false);
  };

  const handleDelete = async (categoryId) => {
    const jwtToken = user?.jwtToken;
    const res = await api.delete(`/category/${categoryId}`, {
      headers: { Authorization: `Bearer ${jwtToken}` },
    });

    if (res.status === 200) {
      setCategoriesData((categoriesData) =>
        categoriesData.filter((category) => category?.id !== categoryId)
      );
    }
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-5">
      <h1 className="text-2xl font-bold">Categories</h1>
      <div className="flex w-full flex-col items-center justify-center gap-5">
        <div className="flex w-full justify-end">
          <button
            onClick={() => setShowAddModal(true)}
            className="w-max rounded-lg border border-gray-700 bg-rose-400 px-3 py-1 text-base text-white hover:bg-rose-500 hover:text-white"
          >
            Add
          </button>
        </div>
        <ul className="mx-auto flex w-full flex-col gap-2">
          {categoriesData?.map((category) => (
            <li
              key={category?.id}
              className="flex w-full items-center gap-3 rounded-lg border border-gray-700 bg-orange-100 p-1 pr-3"
            >
              <img
                src={category?.image?.src}
                alt={category?.image?.alt}
                className="aspect-square w-12 rounded-lg border-2 border-gray-700"
              />
              <span className="w-full break-all text-xs font-bold sm:text-xl">
                {category?.name?.charAt(0)?.toUpperCase() +
                  category?.name?.slice(1)}
              </span>
              <div className="flex w-max items-center justify-end gap-4">
                <button
                  onClick={() => {
                    setSelectedCategory(category);
                    setShowEditModal(true);
                  }}
                  className="w-max rounded-lg border border-rose-400 px-3 py-1 text-xs text-rose-400 hover:bg-rose-500 hover:text-white sm:text-base"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(category?.id)}
                  className="w-max rounded-lg border border-rose-400 px-3 py-1 text-xs text-rose-400 hover:bg-rose-500 hover:text-white sm:text-base"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <FormModal showModal={showAddModal} setShowModal={setShowAddModal}>
        <form
          className="max-h-[600px] overflow-y-auto p-4 sm:max-h-max"
          onSubmit={handleAdd}
        >
          <div className="grid w-full grid-cols-1 gap-4 px-4 sm:grid-cols-2">
            <div className="flex flex-col items-center justify-center">
              <label htmlFor="categoryName" className="text-gray-500">
                Category Name:
              </label>
              <input
                type="text"
                required
                name="categoryName"
                className="rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700"
              />{" "}
            </div>
            <div className="flex flex-col items-center justify-center">
              <label htmlFor="photoUrl" className="text-gray-500">
                Photo Url:{" "}
              </label>
              <input
                type="text"
                required
                name="photoUrl"
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
        <form
          className="max-h-[600px] overflow-y-auto p-4 sm:max-h-max"
          onSubmit={handleEdit}
        >
          <div className="grid w-full grid-cols-1 gap-4 px-4 sm:grid-cols-2">
            <div className="flex flex-col items-center justify-center">
              <label htmlFor="categoryName" className="text-gray-500">
                Category Name:
              </label>
              <input
                type="text"
                required
                name="categoryName"
                defaultValue={selectedCategory?.name}
                className="rounded-lg border border-gray-700 bg-orange-100 p-2 text-center text-gray-700"
              />{" "}
            </div>
            <div className="flex flex-col items-center justify-center">
              <label htmlFor="photoUrl" className="text-gray-500">
                Photo Url:{" "}
              </label>
              <input
                type="text"
                required
                name="photoUrl"
                defaultValue={selectedCategory?.image?.src}
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

export default CategoriesPanel;
