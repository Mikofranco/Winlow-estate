import React, { useEffect, useState } from "react";
import { FormikTouched, useFormik } from "formik";
import { FaEllipsisH } from "react-icons/fa";
import Modal from "@mui/material/Modal";
import Button from "./Button";
import Input from "./CustomInput";
import { IoMdClose } from "react-icons/io";
import Table from "./Table";
import {
  AiFillCloseCircle,
  AiOutlineDown,
  AiOutlineSearch,
} from "react-icons/ai";
import { InputAdornment, TextField } from "@mui/material";
import OutlineButton from "./OutlineButton";
import { SERVER } from "../config/axios";
import { ITEM_URL, SUPPLY_URL } from "../_redux/urls";
import { shallowEqual, useSelector } from "react-redux";
import { toTitleCase } from "../utils/formatMethods";
import {
  HalfInventoryItemValues,
  InventoryItemValues,
} from "../utils/FormInitialValue";
import { InventoryItemType } from "../utils/Interfaces";
import {
  HalfInventoryItemSchema,
  InventoryItemSchema,
} from "../utils/ValidationSchema";

const supplierColumns = [
  "SKU",
  "Item",
  "Category",
  "Unit",
  "Unit Cost",
  "Total Cost",
  "Reorder Level",
];

const suppliers = [
  {
    id: "52633534",
    item: "Rice (Mama Gold)",
    category: "Bar, Kitchen",
    unit: "kg",
    unitCost: "₦10000",
    totalCost: "₦10000",
    reorderLevel: 20,
    showDescription: true,
    description:
      "Rice is a starchy cereal grain that comes from the seeds of the semi-aquatic grass Oryza sativa",
  },
];

const purchaseOrderColumns = [
  "SKU",
  "Item",
  "Category",
  "Unit",
  "Unit Cost",
  "Total Cost",
  "Reorder Level",
];

const purchaseOrders = [
  {
    supplier: "Coca Cola",
    items: "Eva Table water (40 Pieces) , Cocacola 50...",
    totalItems: "5 items",
    totalOrder: "10000",
    status: "Delivered",
  },
];

const purchaseOrdersSubOptions = [
  "All Items",
  "In Stock",
  "Out of Stock",
  "Pending",
];

const InventoryInventory = () => {
  const { user } = useSelector(
    (state: any) => ({
      user: state.user.user,
    }),
    shallowEqual
  );

  const [activeSupplyTab, setActiveSupplyTab] = useState("Items");

  const [purchaseOrdersSubTab, setPurchaseOrdersSubTab] = useState("All");

  const [purchaseOrdersModal, setPurchaseOrdersModal] = useState(false);
  const openPurchaseOrdersModal = () => setPurchaseOrdersModal(true);
  const closePurchaseOrdersModal = () => setPurchaseOrdersModal(false);

  const [supplierModal, setSupplierModal] = useState(false);
  const openSupplierModal = () => setSupplierModal(true);
  const closeSupplierModal = () => setSupplierModal(false);
  const [isLoading, setIsLoading] = useState(false);

  const [catModal, setCatModal] = useState(false);
  const openCatModal = () => setCatModal(true);
  const closeCatModal = () => {
    setCatModal(false);
  };

  const [unitModal, setUnitModal] = useState(false);
  const openUnitModal = () => setUnitModal(true);
  const closeUnitModal = () => {
    setUnitModal(false);
  };

  const [allowReorder, setAllowReorder] = useState(false);
  const [unitList, setUnitList] = useState([]);
  const [catList, setCatList] = useState([]);

  const [inventoryItems, setInventoryItems] = useState([]);
  const [editInventoryItem, setEditInventoryItem] = useState(null);

  const {
    handleChange,
    handleSubmit,
    values,
    setFieldValue,
    setValues,
    resetForm,
    errors,
    touched,
    setTouched,
    validateForm,
  } = useFormik<InventoryItemType>({
    initialValues: allowReorder ? InventoryItemValues : HalfInventoryItemValues,
    validationSchema: allowReorder
      ? InventoryItemSchema
      : HalfInventoryItemSchema,
    onSubmit: (values) => {
      console.log("values= ", values);
      setIsLoading(true);
      if (editInventoryItem) {
        updateInventoryItems(values);
      } else {
        createInventoryItems(values);
      }
    },
  });

  const [rawSuppliers, setRawSuppliers] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);

  const [cat, setCat] = useState("");
  const [itemCategories, setItemCategories] = useState<any>([]);

  const removeCat = (cat) => {
    console.log("rm", cat);
    SERVER.delete(`${ITEM_URL}/category/${user?._id}/${cat?._id}`)
      .then(({ data }) => {
        console.log("handleSaveCategoryD", data);
        getItemCategories();
        setCat("");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoadingCategories(false));
  };

  const getItemCategories = () => {
    SERVER.get(`${ITEM_URL}/category/${user?._id}`)
      .then(({ data }) => {
        console.log("handleSaveCategoryD", data);
        if (data?.items && data?.items?.length > 0) {
          setItemCategories(data?.items);
          setCatList(
            data?.items.map((item) => ({
              label: toTitleCase(item?.name),
              value: item?.name,
            }))
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSaveCategory = () => {
    setIsLoadingCategories(true);
    SERVER.post(`${ITEM_URL}/category/${user?._id}`, {
      name: cat,
    })
      .then(({ data }) => {
        setCat("");
        getItemCategories();
      })
      .catch((err) => {
        console.log("handleSaveCategoryE", err);
      })
      .finally(() => setIsLoadingCategories(false));
  };

  const [unit, setUnit] = useState("");
  const [itemUnits, setItemUnits] = useState<any>([]);

  const removeUnit = (unit) => {
    console.log("rm", unit);
    SERVER.delete(`${ITEM_URL}/unit/${user?._id}/${unit?._id}`)
      .then(({ data }) => {
        console.log("handleSaveUnitD", data);
        getItemUnits();
        setUnit("");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoadingCategories(false));
  };

  const getItemUnits = () => {
    SERVER.get(`${ITEM_URL}/unit/${user?._id}`)
      .then(({ data }) => {
        console.log("handleSaveUnitD", data);
        if (data?.itemUnits && data?.itemUnits?.length > 0) {
          setItemUnits(data?.itemUnits);
          setUnitList(
            data?.itemUnits.map((item) => ({
              label: toTitleCase(item?.name),
              value: item?.name,
            }))
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSaveUnit = () => {
    setIsLoadingCategories(true);
    SERVER.post(`${ITEM_URL}/unit/${user?._id}`, {
      name: unit,
    })
      .then(({ data }) => {
        setUnit("");
        getItemUnits();
      })
      .catch((err) => {
        console.log("handleSaveUnitE", err);
      })
      .finally(() => setIsLoadingCategories(false));
  };

  const getInventorySuppliers = () => {
    SERVER.get(`${SUPPLY_URL}/${user?._id}`)
      .then(({ data }) => {
        if (data?.suppliers && data?.suppliers?.length > 0) {
          setRawSuppliers(
            data?.suppliers.map((item) => ({
              id: item?._id,
              label: toTitleCase(item?.name),
              value: item?.name,
            }))
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEditItem = (item) => {
    setEditInventoryItem(item);
    setSupplierModal(true);
    setValues(item);
  };

  const getInventoryItems = () => {
    setIsLoading(true);
    SERVER.get(`${ITEM_URL}/${user?._id}`)
      .then(({ data }) => {
        if (data?.items && data?.items?.length > 0) {
          let tempData = data?.items.map((item) => ({
            id: `#${item?._id?.substring(item?._id?.length - 6)}`,
            name: item?.name,
            category: item?.category,
            unit: item?.unit,
            costPerUnit: item?.costPerUnit,
            totalCost: item?.totalCost || 0,
            reorderLevel: item?.reorderLevel,
            description: `${item?.description}`,
          }));
          setInventoryItems(tempData);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  };

  const createInventoryItems = (items) => {
    let tempItems = { ...items };
    if (items.supplier) {
      const tempSupplier = rawSuppliers.filter(
        (item) => item.value === items?.supplier
      )[0];

      tempItems = { ...tempItems, supplier: tempSupplier.id };
    }
    SERVER.post(`${ITEM_URL}/${user?._id}`, { ...tempItems })
      .then(({ data }) => {
        getInventoryItems();
        resetForm();
        closeSupplierModal();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const deleteInventoryItems = (item) => {
    SERVER.delete(`${ITEM_URL}/${user?._id}/${editInventoryItem?._id}`)
      .then(({ data }) => {
        getInventoryItems();
        setEditInventoryItem(null);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const updateInventoryItems = (items) => {
    SERVER.patch(`${ITEM_URL}/${user?._id}/${editInventoryItem?._id}`, {
      ...items,
    })
      .then(({ data }) => {
        getInventoryItems();
        resetForm();
        closeSupplierModal();
        setValues(HalfInventoryItemValues);
        setEditInventoryItem(null);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getItemCategories();
    getItemUnits();
    getInventorySuppliers();
    getInventoryItems();
  }, []);

  const triggerForm = async () => {
    await setTouched({
      name: true,
      description: true,
      category: true,
      unit: true,
      costPerUnit: true,
      reorderLevel: true,
      autoReorder: true,
      autoReorderReminder: true,
      reorderQuantity: true,
      reorderQuantityUnit: true,
      supplier: true,
    } as FormikTouched<InventoryItemType>);

    // Trigger validation
    const errors = await validateForm();
    console.log("errs= ", errors);
  };

  return (
    <div className="">
      {/* Tabs */}
      <div className="flex space-x-3">
        <button
          className={`px-5 py-2 rounded-full font-medium ${
            activeSupplyTab === "Items"
              ? "bg-primary text-white"
              : "bg-[#EDECEC] text-black"
          }`}
          onClick={() => setActiveSupplyTab("Items")}
        >
          Items
        </button>
        <button
          className={`px-5 py-2 rounded-full font-medium ${
            activeSupplyTab === "Stocks"
              ? "bg-primary text-white"
              : "bg-[#EDECEC] text-black"
          }`}
          onClick={() => setActiveSupplyTab("Stocks")}
        >
          Stocks
        </button>
      </div>

      {/* Search & Actions */}
      <div className="flex justify-between items-center mt-6">
        {/* Search Bar */}
        <div className="flex gap-2">
          <div className="flex gap-3">
            <div className="relative w-[300px]">
              <AiOutlineSearch className="absolute left-4 top-3 text-gray-400 text-lg" />
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-12 pr-4 py-2 rounded-full bg-[#EDECEC] text-black focus:outline-none"
              />
            </div>
            {activeSupplyTab === "Items" && (
              <div className="flex space-x-3">
                <button
                  className="bg-white border border-[#B7B7B7] text-[#6D6D6D] font_medium px-5 py-2 rounded-lg flex items-center space-x-2"
                  onClick={openCatModal}
                >
                  <span>Add category</span>
                </button>
                <button
                  className="bg-white border border-[#B7B7B7] text-[#6D6D6D] font_medium px-5 py-2 rounded-lg flex items-center space-x-2"
                  onClick={openUnitModal}
                >
                  <span>Add unit of measurement</span>
                </button>
              </div>
            )}
          </div>
          {activeSupplyTab === "Stocks" && (
            <div className="flex space-x-3">
              {purchaseOrdersSubOptions?.map((option) => (
                <button
                  className={`px-5 py-2 rounded-full font-medium ${
                    purchaseOrdersSubTab === option
                      ? "bg-primary text-white"
                      : "bg-[#EDECEC] text-black"
                  }`}
                  onClick={() => setPurchaseOrdersSubTab("Supplier")}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        {activeSupplyTab === "Items" && (
          <div className="flex space-x-3">
            <button
              className="bg-black text-white px-5 py-2 rounded-lg flex items-center space-x-2"
              onClick={openSupplierModal}
            >
              <span>Add Item</span>
              {/* <AiOutlineDown /> */}
            </button>
          </div>
        )}
      </div>

      {activeSupplyTab === "Items" && (
        <Table columns={supplierColumns} data={inventoryItems} />
      )}
      {activeSupplyTab === "Stocks" && (
        <Table columns={purchaseOrderColumns} data={purchaseOrders} />
      )}

      {/* SUPPLIER MODAL */}
      <Modal
        // open={true}
        open={supplierModal}
        onClose={closeSupplierModal}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <div className="absolute top-1/2 left-1/2 w-5/6 lg:w-1/3 -translate-y-1/2 -translate-x-1/2 bg-white rounded-3xl p-7 my-10 outline-none">
          <div className="flex">
            <p className="flex-1 text-xl text-center font_bold black2">
              Add an Item
            </p>
            <IoMdClose
              size={24}
              color="#8E8E8E"
              className="cursor-pointer"
              onClick={closeSupplierModal}
            />
          </div>

          <div className="h-5/6 overflow-y-auto">
            <Input
              type="text"
              placeholder="Item Name"
              name="name"
              onChange={handleChange}
              value={values.name}
              error={errors.name && touched.name && errors.name}
            />

            <Input
              type="text"
              placeholder="Description"
              name="description"
              onChange={handleChange}
              value={values.description}
              error={
                errors.description && touched.description && errors.description
              }
            />

            <Input
              type="dropdown"
              placeholder="Category"
              name="category"
              onChange={handleChange}
              value={values.category}
              options={catList || []}
              error={errors.category && touched.category && errors.category}
            />

            <Input
              type="dropdown"
              placeholder="Unit of Measurement"
              name="unit"
              onChange={handleChange}
              value={values.unit}
              options={unitList || []}
              error={errors.unit && touched.unit && errors.unit}
            />

            <Input
              type="text"
              placeholder="Cost Per Unit"
              name="costPerUnit"
              // extraClasses={'!mt-10 !lg:mt-0'}
              onChange={handleChange}
              value={values.costPerUnit}
              error={
                errors.costPerUnit && touched.costPerUnit && errors.costPerUnit
              }
            />

            <Input
              type="text"
              placeholder="Reorder Level"
              name="reorderLevel"
              onChange={handleChange}
              value={values.reorderLevel}
              error={
                errors.reorderLevel &&
                touched.reorderLevel &&
                errors.reorderLevel
              }
            />

            {/* {error  && (
                  <p className="text-sm text-center text-red-600 my-2">
                    {error}
                  </p>
                )} */}

            <Input
              type="radio"
              placeholder="Automate Reorder"
              name="autoReorder"
              onChange={() => {
                console.log("first= ");
                setAllowReorder(!values.autoReorder);
                setFieldValue("autoReorder", !values.autoReorder);
              }}
              value={values.autoReorder}
              error={
                errors.autoReorder && touched.autoReorder && errors.autoReorder
              }
            />

            {allowReorder && (
              <>
                <Input
                  type="radio"
                  placeholder="Automate Reorder Reminder"
                  name="autoReorderReminder"
                  onChange={() => {
                    setFieldValue("autoReorder", !values.autoReorderReminder);
                  }}
                  value={values.autoReorderReminder}
                  error={
                    errors.autoReorderReminder &&
                    touched.autoReorderReminder &&
                    errors.autoReorderReminder
                  }
                />

                <Input
                  type="text"
                  placeholder="Reorder Quantity"
                  name="reorderQuantity"
                  onChange={handleChange}
                  value={values.reorderQuantity}
                  error={
                    errors.reorderQuantity &&
                    touched.reorderQuantity &&
                    errors.reorderQuantity
                  }
                />

                <Input
                  type="text"
                  placeholder="Reorder Quantity Unit"
                  name="reorderQuantityUnit"
                  onChange={handleChange}
                  value={values.reorderQuantityUnit}
                  error={
                    errors.reorderQuantityUnit &&
                    touched.reorderQuantityUnit &&
                    errors.reorderQuantityUnit
                  }
                />

                <Input
                  type="dropdown"
                  placeholder="Supplier"
                  name="supplier"
                  onChange={handleChange}
                  value={values.supplier}
                  options={rawSuppliers}
                  error={errors.supplier && touched.supplier && errors.supplier}
                />
              </>
            )}

            <div className="mt-10">
              <Button
                loading={isLoading}
                title="Add"
                extraClasses="w-full p-3 rounded-full px-8 py-2"
                onClick={() => {
                  triggerForm();
                  if (Object.values(errors).length < 1) {
                    handleSubmit();
                  }
                }}
              />
            </div>
          </div>
        </div>
      </Modal>

      {/* CATEGORY */}
      <Modal
        open={catModal}
        onClose={closeCatModal}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <div className="absolute top-1/2 left-1/2 w-5/6 lg:w-1/3 h-3/4 overflow-scroll -translate-y-1/2 -translate-x-1/2 bg-white rounded-3xl p-7 my-10 outline-none">
          <div className="flex">
            <p className="flex-1 text-xl text-center font_bold black2">
              Categories
            </p>

            <IoMdClose
              size={24}
              color="#8E8E8E"
              className="cursor-pointer"
              onClick={closeCatModal}
            />
          </div>

          <div className="mt-3 w-full h-5/6 relative">
            <div className="w-full max-h-96 h-fit py-3 overflow-y-auto">
              {itemCategories?.length > 0 && (
                <div
                  className="flex flex-row flex-wrap h-fit p-3 rounded my-3 gap-x-1"
                  style={{ maxHeight: "250px" }}
                >
                  {itemCategories?.map((cat: any, i: number) => (
                    <div
                      key={cat._id}
                      className="flex flex-row justify-between bg-gray-200 items-center w-fit h-fit py-2 px-1 my-1 gap-x-1 rounded-full"
                    >
                      <div className="flex flex-row justify-between items-center">
                        <div className="ml-3 flex flex-row justify-between items-center">
                          <p className="text-xs font-bold font_regular text-black">
                            {`${cat.name}`}
                          </p>
                        </div>
                      </div>
                      <div>
                        <AiFillCloseCircle
                          size={24}
                          color="#fff"
                          className="cursor-pointer hover:text-red-600"
                          onClick={() => {
                            setIsLoadingCategories(true);
                            removeCat(cat);
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-5 pt-5 absolute bottom-0 w-full flex flex-col items-stretch justify-end gap-y-10 border-t border-black/20">
              <div>
                <p className="ml-2 mb-2">Add a new category</p>

                <TextField
                  sx={{ m: 1 }}
                  variant="outlined"
                  className="w-full"
                  label="Category"
                  id="outlined-adornment-password"
                  onChange={(e: any) => {
                    setCat(e.target.value);
                    console.log(e.target.value);
                  }}
                  value={cat}
                />
              </div>

              <OutlineButton
                loading={isLoadingCategories}
                title="Add Item"
                extraClasses="w-full p-3 rounded-full px-8 py-2"
                onClick={() => handleSaveCategory()}
              />
            </div>
          </div>
        </div>
      </Modal>

      {/* UNIT */}
      <Modal
        open={unitModal}
        onClose={closeUnitModal}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <div className="absolute top-1/2 left-1/2 w-5/6 lg:w-1/3 h-3/4 overflow-scroll -translate-y-1/2 -translate-x-1/2 bg-white rounded-3xl p-7 my-10 outline-none">
          <div className="flex">
            <p className="flex-1 text-xl text-center font_bold black2">
              Unit of measurement
            </p>

            <IoMdClose
              size={24}
              color="#8E8E8E"
              className="cursor-pointer"
              onClick={closeUnitModal}
            />
          </div>

          <div className="mt-3 w-full h-5/6 relative">
            <div className="w-full max-h-96 h-fit py-3 overflow-y-auto">
              {itemCategories?.length > 0 && (
                <div
                  className="flex flex-row flex-wrap h-fit p-3 rounded my-3 gap-x-1"
                  style={{ maxHeight: "250px" }}
                >
                  {itemUnits?.map((cat: any, i: number) => (
                    <div
                      key={cat._id}
                      className="flex flex-row justify-between bg-gray-200 items-center w-fit h-fit py-2 px-1 my-1 gap-x-1 rounded-full"
                    >
                      <div className="flex flex-row justify-between items-center">
                        <div className="ml-3 flex flex-row justify-between items-center">
                          <p className="text-xs font-bold font_regular text-black">
                            {`${cat.name}`}
                          </p>
                        </div>
                      </div>
                      <div>
                        <AiFillCloseCircle
                          size={24}
                          color="#fff"
                          className="cursor-pointer hover:text-red-600"
                          onClick={() => {
                            setIsLoadingCategories(true);
                            removeUnit(cat);
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-5 pt-5 absolute bottom-0 w-full flex flex-col items-stretch justify-end gap-y-10 border-t border-black/20">
              <div>
                <p className="ml-2 mb-2">Add a new unit of measurement</p>

                <TextField
                  sx={{ m: 1 }}
                  variant="outlined"
                  className="w-full"
                  label="Unit"
                  id="outlined-adornment-password"
                  onChange={(e: any) => {
                    setUnit(e.target.value);
                    console.log(e.target.value);
                  }}
                  value={unit}
                />
              </div>

              <OutlineButton
                loading={isLoadingCategories}
                title="Add Item"
                extraClasses="w-full p-3 rounded-full px-8 py-2"
                onClick={() => handleSaveUnit()}
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default InventoryInventory;
