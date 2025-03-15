import React, { Fragment, useEffect, useState } from "react";
import { FieldArray, useFormik } from "formik";
import { FaEllipsisH } from "react-icons/fa";
import Modal from "@mui/material/Modal";
import Button from "./Button";
import Input from "./CustomInput";
import { IoMdClose } from "react-icons/io";
import Table from "./Table";
import { AiOutlineDown, AiOutlineSearch } from "react-icons/ai";
import OutlineButton from "./OutlineButton";
import {
  dateFormatter,
  formatRemoteAmountKobo,
  generateUUIDBasedOnStringLength,
  uuidGen,
} from "../utils/formatMethods";
import MiniTabMenu from "./MiniTabMenu";
import { RecipeValues } from "../utils/FormInitialValue";
import { RecipeSchema } from "../utils/ValidationSchema";
import { DINNING_MENU_CATEGORY_URL, RECIPE_URL } from "../_redux/urls";
import { SERVER } from "../config/axios";
import IngredientRecipe from "./IngredientRecipe";
import { shallowEqual, useSelector } from "react-redux";
import { DashboardItemSkeletonLoader } from "./DashboardItemSkeletonLoader";
import { Popover, RadioGroup, Transition } from "@headlessui/react";
import Spinner from "./Spinner";
import { HiDotsHorizontal } from "react-icons/hi";

const recipeColumns = ["Name", "Category", "Quantity", "Cost"];

const TABS = ["Recipe Items", "Procedure"];

const EDIT_OPTIONS = ["Edit", "Delete"];

const quantitySizes = [
  { label: "KG", value: "KG" },
  { label: "MG", value: "MG" },
  { label: "G", value: "G" },
  { label: "Others", value: "Others" },
];

const timeLengths = [
  { label: "Hrs", value: "Hrs" },
  { label: "Mins", value: "Mins" },
  { label: "Secs", value: "Secs" },
];

const InventoryRecipe = () => {
  const { user } = useSelector(
    (state: any) => ({
      user: state.user.user,
    }),
    shallowEqual
  );

  const [recipeItem, setRecipeItem] = useState(null);
  const [recipeModal, setRecipeModal] = useState(false);
  const [recipeError, setRecipeError] = useState("");
  const openRecipeModal = () => setRecipeModal(true);
  const closeRecipeModal = () => setRecipeModal(false);
  const [isLoading, setIsLoading] = useState(false);

  const [selectedTab, setSelectedTab] = useState(TABS[0]);

  const {
    handleChange,
    handleSubmit,
    values,
    setFieldValue,
    setValues,
    resetForm,
    errors,
    setErrors,
    touched,
    setTouched,
    validateForm,
  } = useFormik({
    initialValues: recipeItem ? recipeItem : RecipeValues,
    validationSchema: RecipeSchema,
    onSubmit: (values) => {
      setIsLoading(true);
      console.log("values= ", values);
      if (recipeItem) {
        updateInventoryRecipes(values);
      } else {
        addInventoryRecipes(values);
      }
    },
  });

  const triggerForm = async () => {
    await setTouched({
      recipeName: true,
      category: true,
      description: true,
      quantity: true,
      quantityUnit: true,
      ingredients: values.ingredients.map(() => ({
        item: true,
        netQuantity: true,
        netQuantityUnit: true,
        wasteQuantity: true,
        wasteQuantityUnit: true,
      })),
      prepTime: true,
      prepTimeUnit: true,
      cookingTime: true,
      cookingTimeUnit: true,
      cookingInstructions: true,
      aboutItem: true,
    });

    // Trigger validation
    const errors = await validateForm();
  };

  const [dinningMenuCategories, setDinningMenuCategories] = useState<any>([]);
  const getDinningMenuCategories = () => {
    SERVER.get(DINNING_MENU_CATEGORY_URL)
      .then(({ data }) => {
        if (
          data?.dinningMenuCategory?.categories &&
          data?.dinningMenuCategory?.categories?.length > 0
        ) {
          setDinningMenuCategories(data?.dinningMenuCategory?.categories);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEditItem = (option, item) => {
    console.log("optionsss= ", option, item);
    setRecipeItem(item);
    if (option === EDIT_OPTIONS[0]) {
      setRecipeModal(true);
      setValues(item);
    } else {
      setIsLoading(true);
      deleteInventoryRecipes(item);
    }
  };

  const [recipes, setRecipes] = useState<any>([]);
  const getInventoryRecipes = () => {
    SERVER.get(`${RECIPE_URL}/${user?._id}`)
      .then(({ data }) => {
        if (data?.recipes && data?.recipes?.length > 0) {
          setRecipes(data?.recipes);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addInventoryRecipes = (items) => {
    SERVER.post(`${RECIPE_URL}/${user?._id}`, { ...items })
      .then(({ data }) => {
        getInventoryRecipes();
        resetForm();
        setRecipeModal(false);
      })
      .catch((err) => {
        console.log(err);
        setRecipeError(err?.error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const deleteInventoryRecipes = (item) => {
    SERVER.delete(`${RECIPE_URL}/${user?._id}/${item?._id}`)
      .then(({ data }) => {
        getInventoryRecipes();
        setRecipeItem(null);
      })
      .catch((err) => {
        console.log(err);
        setRecipeError(err?.error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const updateInventoryRecipes = (items) => {
    SERVER.patch(`${RECIPE_URL}/${user?._id}/${recipeItem?._id}`, { ...items })
      .then(({ data }) => {
        getInventoryRecipes();
        resetForm();
        setRecipeModal(false);
      })
      .catch((err) => {
        console.log(err);
        setRecipeError(err?.error);
      })
      .finally(() => {
        setIsLoading(false);
        setValues(RecipeValues);
        setRecipeItem(null);
      });
  };

  const addIngredient = async (items) => {
    const newIngredients = [...values.ingredients, items];
    setFieldValue("ingredients", newIngredients);
  };

  const removeIngredient = (index: number) => {
    const newIngredients = values.ingredients.filter((_, i) => i !== index);
    setFieldValue("ingredients", newIngredients);
  };

  useEffect(() => {
    getInventoryRecipes();
    getDinningMenuCategories();
  }, []);

  const [q, setQ] = useState("");
  const searchFiltered =
    q === ""
      ? recipes
      : recipes.filter(
          (item: any) =>
            item?.category?.toString().toLowerCase().indexOf(q.toLowerCase()) >
              -1 ||
            item?.recipeName
              ?.toString()
              .toLowerCase()
              .indexOf(q.toLowerCase()) > -1 ||
            item?.quantity?.toString().toLowerCase().indexOf(q.toLowerCase()) >
              -1
        );

  return (
    <div className="">
      {/* Search & Actions */}
      <div className="flex flex-col lg:flex-row justify-start lg:justify-between items-stretch lg:items-center gap-y-3">
        {/* Search Bar */}
        <div className="relative w-[300px]">
          <AiOutlineSearch className="absolute left-4 top-3 text-gray-400 text-lg" />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-12 pr-4 py-2 rounded-full bg-[#EDECEC] text-black focus:outline-none"
            onChange={(e: any) => {
              if (e.target.value) {
                setQ(e.target.value);
              } else {
                setQ(e.target.value);
              }
            }}
          />
        </div>

        <div className="flex space-x-3">
          <button
            className="w-fit bg-black text-white px-6 py-2 rounded-lg flex items-center space-x-2 text-nowrap mx-auto"
            onClick={() => {
              setValues(RecipeValues);
              setRecipeItem(null);
              setRecipeError("");
              setErrors({});
              openRecipeModal();
            }}
          >
            <span className="text-center">Add recipe</span> <AiOutlineDown />
          </button>
        </div>
      </div>

      <div className="inline-block w-full py-5 align-middle overflow-x-auto">
        <div className="min-w-[600px] lg:min-w-full">
          {isLoading ? (
            <div className="my-4 grid grid-cols-2 gap-3">
              {[...Array(4)]?.map((_, i) => (
                <DashboardItemSkeletonLoader key={i} />
              ))}
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-300 h-auto min-h-60">
              <thead>
                <tr className="border-b">
                  {recipeColumns.map((col, index) => (
                    <th
                      key={index}
                      className="py-3 text-left text-[#7F7F7F] font-medium lg:pl-3"
                    >
                      {col}
                    </th>
                  ))}
                  <th className="py-3 text-left text-[#7F7F7F] font-medium lg:pl-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {searchFiltered?.map((transaction: any, i: number) => (
                  <tr key={generateUUIDBasedOnStringLength("ttru")}>
                    <td className="whitespace-nowrap py-2 pl-0 text-sm font_medium text-[#310E0E] lg:pl-3">
                      {transaction?.recipeName}
                    </td>
                    <td className="whitespace-nowrap py-2 pl-0 text-sm font_medium text-[#310E0E] lg:pl-3">
                      {transaction?.category}
                    </td>
                    <td className="whitespace-nowrap py-2 pl-0 text-sm font_medium text-[#310E0E] lg:pl-3 text-wrap">
                      {transaction?.quantity}
                    </td>
                    <td className="whitespace-nowrap py-2 pl-0 text-sm font_medium text-[#310E0E] lg:pl-3 text-wrap">
                      0
                    </td>
                    <td className="whitespace-nowrap py-2 pl-0 text-sm font_medium text-[#310E0E] lg:pl-3">
                      <div className="flex-1 flex justify-center">
                        <Popover className="relative">
                          <Popover.Button
                            className={`w-fit text-xs text-medium border border-solid px-3 py-2 text-center rounded-xl flex flex-row items-center justify-center gap-x-1 text-black bg-black/10 border-black`}
                            disabled={isLoading}
                          >
                            {isLoading ? (
                              <Spinner />
                            ) : (
                              <HiDotsHorizontal size={20} />
                            )}
                          </Popover.Button>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                          >
                            <Popover.Panel className="box-border absolute z-50 -right-6 bg-white mb-2 w-24 lg:w-32 shadow-2xl p-2 lg:p-4 rounded-2xl secondary_gray_color text-black">
                              <div className="w-full">
                                <RadioGroup>
                                  <div className="space-y-3">
                                    {EDIT_OPTIONS?.map((item: any, i) => (
                                      <RadioGroup.Option
                                        key={uuidGen()}
                                        value={item}
                                        className={
                                          "flex items-center cursor-pointer mb-2"
                                        }
                                        onClick={() => {
                                          handleEditItem(item, transaction);
                                        }}
                                      >
                                        {({ active, checked }) => (
                                          <>
                                            <div
                                              className={`w-2 lg:w-4 h-2 lg:h-4 rounded-full mr-2 lg:mr-3`}
                                            />

                                            <div className="text-sm">
                                              <RadioGroup.Label
                                                as="p"
                                                className={`text-xs lg:text-sm secondary_gray_color text-black capitalize`}
                                              >
                                                {item}
                                              </RadioGroup.Label>
                                            </div>
                                          </>
                                        )}
                                      </RadioGroup.Option>
                                    ))}
                                  </div>
                                </RadioGroup>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </Popover>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* <Table columns={recipeColumns} data={recipes} /> */}

      {/* RECIPE MODAL */}
      <Modal
        // open={true}
        open={recipeModal}
        onClose={closeRecipeModal}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <div className="absolute top-1/2 left-1/2 w-5/6 lg:w-1/3 -translate-y-1/2 -translate-x-1/2 bg-[#F8F8F8] rounded-3xl p-7 my-10 outline-none h-4/5 overflow-auto">
          <div className="flex">
            <p className="flex-1 text-xl font_bold black2">Recipe</p>
            <IoMdClose
              size={24}
              color="#8E8E8E"
              className="cursor-pointer"
              onClick={closeRecipeModal}
            />
          </div>

          <div className="bg-neutral-600/20 rounded-full mt-5 mb-8 w-fit mx-auto flex flex-row justify-center items-center">
            <MiniTabMenu
              ordersMenu={TABS}
              selectedOrder={selectedTab}
              setSelectedOrder={setSelectedTab}
            />
          </div>

          {TABS[0] === selectedTab && (
            <div>
              <Input
                type="text"
                placeholder="Recipe name"
                name="recipeName"
                onChange={handleChange}
                value={values.recipeName}
                error={
                  errors.recipeName && touched.recipeName && errors.recipeName
                }
              />

              <Input
                type="dropdown"
                placeholder="Category"
                name="category"
                onChange={handleChange}
                value={values.category}
                options={dinningMenuCategories}
                error={errors.category && touched.category && errors.category}
              />

              <Input
                type="text-area"
                placeholder="Description"
                name="description"
                onChange={handleChange}
                value={values.description}
                error={
                  errors.description &&
                  touched.description &&
                  errors.description
                }
              />

              <div className="w-full flex flex-row items-center justify-center gap-x-3">
                <Input
                  type="number"
                  container={"!grow"}
                  placeholder="Quantity"
                  name="quantity"
                  onChange={handleChange}
                  value={values.quantity}
                  error={errors.quantity && touched.quantity && errors.quantity}
                />

                <Input
                  type="dropdown"
                  newName="a quantity unit"
                  placeholder=""
                  name="quantityUnit"
                  onChange={handleChange}
                  value={values.quantityUnit}
                  options={quantitySizes}
                  error={
                    errors.quantityUnit &&
                    touched.quantityUnit &&
                    errors.quantityUnit
                  }
                />
              </div>

              <div className="border border-[#D3D3D3] my-4 " />
              <p className="flex-1 text-xl font_bold black2">Add Ingredients</p>

              {values.ingredients.length > 0 &&
                values.ingredients.map((_, index) => (
                  <IngredientRecipe
                    key={index}
                    ingredientsValues={_}
                    index={index}
                    quantitySizes={quantitySizes}
                    isLoading={isLoading}
                    addIngredient={addIngredient}
                    removeIngredient={removeIngredient}
                  />
                ))}

              <IngredientRecipe
                ingredientsValues={false}
                quantitySizes={quantitySizes}
                isLoading={isLoading}
                addIngredient={addIngredient}
                removeIngredient={removeIngredient}
              />

              {/* {errors && Object.values(errors).length > 0 && (
                <>
                  <p className="text-sm text-center text-red-600 my-2">
                    Please fill the form correctly
                  </p>
                  <p className="text-sm text-center text-red-600 my-2">
                    {Object.values(errors).join(", ")}
                  </p>
                  <p className="text-sm text-center text-red-600 my-2">
                    {values.ingredients.length < 1 &&
                      "Add at least one ingredient to continue"}
                  </p>
                </>
              )} */}

              {recipeError && (
                <>
                  <p className="text-sm text-center text-red-600 my-2">
                    {recipeError}
                  </p>
                </>
              )}

              <div className="">
                <Button
                  loading={isLoading}
                  title={recipeItem ? "Save sub-recipe" : "Add sub-recipe"}
                  extraClasses="w-full p-3 rounded-full px-8 py-2"
                  onClick={() => {
                    if (errors && Object.values(errors).length > 0) {
                      console.log("first= ", errors);
                      triggerForm();
                      setSelectedTab(TABS[1]);
                    }
                  }}
                />
              </div>
            </div>
          )}

          {TABS[1] === selectedTab && (
            <div>
              <div className="w-full flex flex-row items-center justify-center gap-x-3">
                <Input
                  type="number"
                  container={"!grow"}
                  placeholder="Prep Time"
                  name="prepTime"
                  onChange={handleChange}
                  value={values.prepTime}
                  error={errors.prepTime && touched.prepTime && errors.prepTime}
                />

                <Input
                  type="dropdown"
                  newName="a time unit"
                  placeholder=""
                  name="prepTimeUnit"
                  onChange={handleChange}
                  value={values.prepTimeUnit}
                  options={timeLengths}
                  error={
                    errors.prepTimeUnit &&
                    touched.prepTimeUnit &&
                    errors.prepTimeUnit
                  }
                />
              </div>

              <div className="w-full flex flex-row items-center justify-center gap-x-3">
                <Input
                  type="number"
                  container={"!grow"}
                  placeholder="Cooking Time"
                  name="cookingTime"
                  onChange={handleChange}
                  value={values.cookingTime}
                  error={
                    errors.cookingTime &&
                    touched.cookingTime &&
                    errors.cookingTime
                  }
                />

                <Input
                  type="dropdown"
                  newName="a time unit"
                  placeholder=""
                  name="cookingTimeUnit"
                  onChange={handleChange}
                  value={values.cookingTimeUnit}
                  options={timeLengths}
                  error={
                    errors.cookingTimeUnit &&
                    touched.cookingTimeUnit &&
                    errors.cookingTimeUnit
                  }
                />
              </div>

              <Input
                type="text-area"
                placeholder="Cooking instructions"
                name="cookingInstructions"
                onChange={handleChange}
                value={values.cookingInstructions}
                error={
                  errors.cookingInstructions &&
                  touched.cookingInstructions &&
                  errors.cookingInstructions
                }
              />

              <Input
                type="text-area"
                placeholder="About the item"
                name="aboutItem"
                onChange={handleChange}
                value={values.aboutItem}
                error={
                  errors.aboutItem && touched.aboutItem && errors.aboutItem
                }
              />

              {/* {errors && Object.values(errors).length > 0 && (
                <>
                  <p className="text-sm text-center text-red-600 my-2">
                    Please fill the form correctly
                  </p>
                  <p className="text-sm text-center text-red-600 my-2">
                    {Object.values(errors).join(", ")}
                  </p>
                  <p className="text-sm text-center text-red-600 my-2">
                    {values.ingredients.length < 1 &&
                      "Add at least one ingredient to continue"}
                  </p>
                </>
              )} */}

              {recipeError && (
                <>
                  <p className="text-sm text-center text-red-600 my-2">
                    {recipeError}
                  </p>
                </>
              )}

              <div className="">
                <Button
                  loading={isLoading}
                  title="Save Procedure"
                  extraClasses="w-full p-3 rounded-full px-8 py-2"
                  onClick={() => {
                    if (errors && Object.values(errors).length > 0) {
                      console.log("errsss");
                      triggerForm();
                      setSelectedTab(TABS[0]);
                    } else {
                      handleSubmit();
                    }
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default InventoryRecipe;
