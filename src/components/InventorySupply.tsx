import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { FaEllipsisH } from "react-icons/fa";
import Modal from "@mui/material/Modal";
import Button from "./Button";
import Input from "./CustomInput";
import { IoMdClose } from "react-icons/io";
import Table from "./Table";
import { AiOutlineDown, AiOutlineSearch } from "react-icons/ai";
import { SupplyInputsSchema } from "../utils/ValidationSchema";
import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { SERVER } from "../config/axios";
import { SUPPLY_URL } from "../_redux/urls";
import { shallowEqual, useSelector } from "react-redux";
import { SupplierValues } from "../utils/FormInitialValue";
import { Link } from "react-router-dom";
import { CHEF_ROUTES } from "../routes/routes";

const categoryList = [
  { label: "Category 1", value: "Category 1" },
  { label: "Category 2", value: "Category 2" },
  { label: "Category 3", value: "Category 3" },
];

const supplierColumns = ["Supplier ID", "Name/type", "Email", "Phone number"];
// const suppliers = [
//   {
//     id: "2625533",
//     name: { name: "Coca Cola PLC", type: "Beverages" },
//     email: "coca@example.com",
//     phone: "08136445274",
//   },
// ];

const purchaseOrderColumns = [
  "Supplier",
  "Items",
  "Total Items",
  "Total Order",
  "Status",
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
  "All",
  "Pending",
  "Response",
  "Approved",
  "Delivered",
];

const InventorySupply = () => {
  const { user } = useSelector(
    (state: any) => ({
      user: state.user.user,
    }),
    shallowEqual
  );

  const [activeSupplyTab, setActiveSupplyTab] = useState("Supplier");

  const [purchaseOrdersSubTab, setPurchaseOrdersSubTab] = useState("All");

  const [purchaseOrdersModal, setPurchaseOrdersModal] = useState(false);
  const openPurchaseOrdersModal = () => setPurchaseOrdersModal(true);
  const closePurchaseOrdersModal = () => setPurchaseOrdersModal(false);

  const [orders, setOrders] = useState<any>([]);
  const [suppliers, setSuppliers] = useState<any>([]);
  const [rawSuppliers, setRawSuppliers] = useState([]);
  const [editSupplier, setEditSupplier] = useState(null);
  const [supplierModal, setSupplierModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
  } = useFormik({
    initialValues: editSupplier ? editSupplier : SupplierValues,
    validationSchema: SupplyInputsSchema,
    onSubmit: (values) => {
      setIsLoading(true);
      if (editSupplier) {
        updateInventorySuppliers(values);
      } else {
        addInventorySuppliers(values);
      }
    },
  });

  const openSupplierModal = () => setSupplierModal(true);
  const closeSupplierModal = () => {
    setSupplierModal(false);
    setEditSupplier(null);
    setValues(SupplierValues);
  };

  const handleEditSupplier = (item) => {
    let tempItem = rawSuppliers.filter(
      (elem) => "#" + elem?._id.substring(elem?._id?.length - 6) === item.id
    )[0];

    setEditSupplier(tempItem);
    setSupplierModal(true);
    setValues(tempItem);
  };

  const getInventorySuppliers = () => {
    SERVER.get(`${SUPPLY_URL}/${user?._id}`)
      .then(({ data }) => {
        if (data?.suppliers && data?.suppliers?.length > 0) {
          let tempData = data?.suppliers.map((item) => ({
            id: `#${item?._id?.substring(item?._id?.length - 6)}`,
            name: item?.name,
            email: item?.email,
            phone: item?.phoneNumber,
            description: `${item?.bankAccountNumber}, ${item?.bankAccountName}, ${item?.bankName}`,
          }));
          setSuppliers(tempData);
          setRawSuppliers(data?.suppliers);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getSupplierOrders = () => {
    SERVER.get(`${SUPPLY_URL}/order/${user?._id}`)
      .then(({ data }) => {
        if (data?.orders && data?.orders?.length > 0) {
          setOrders(data?.orders);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addInventorySuppliers = (items) => {
    SERVER.post(`${SUPPLY_URL}/${user?._id}`, { ...items })
      .then(({ data }) => {
        getInventorySuppliers();
        resetForm();
        setSupplierModal(false);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const deleteInventorySuppliers = (item) => {
    let tempItem = rawSuppliers.filter(
      (elem) => "#" + elem?._id.substring(elem?._id?.length - 6) === item.id
    )[0];

    SERVER.delete(`${SUPPLY_URL}/${user?._id}/${tempItem?._id}`)
      .then(({ data }) => {
        getInventorySuppliers();
        setEditSupplier(null);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const updateInventorySuppliers = (items) => {
    SERVER.patch(`${SUPPLY_URL}/${user?._id}/${editSupplier?._id}`, {
      ...items,
    })
      .then(({ data }) => {
        getInventorySuppliers();
        resetForm();
        setSupplierModal(false);
        setValues(SupplierValues);
        setEditSupplier(null);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getInventorySuppliers();
    getSupplierOrders();
  }, []);

  const SUPPLIER_EDIT_OPTIONS = [
    {
      label: "Edit details",
      runFunction: handleEditSupplier,
    },
    {
      label: "Delete supplier",
      runFunction: deleteInventorySuppliers,
    },
  ];

  return (
    <div className=" w-full min-w-[300px]">
      {/* Tabs */}
      <div className="flex justify-center lg:justify-start space-x-3">
        <button
          className={`px-5 py-2 rounded-full font-medium ${
            activeSupplyTab === "Supplier"
              ? "bg-primary text-white"
              : "bg-[#EDECEC] text-black"
          }`}
          onClick={() => setActiveSupplyTab("Supplier")}
        >
          Supplier
        </button>
        <button
          className={`px-5 py-2 rounded-full font-medium ${
            activeSupplyTab === "Purchase Order"
              ? "bg-primary text-white"
              : "bg-[#EDECEC] text-black"
          }`}
          onClick={() => setActiveSupplyTab("Purchase Order")}
        >
          Purchase order
        </button>
      </div>

      {/* Search & Actions */}
      <div className="flex flex-col lg:flex-row justify-start lg:justify-between items-center gap-3 mt-6">
        {/* Search Bar */}
        <div className="w-full overflow-x-auto flex flex-col lg:flex-row justify-start lg:justify-between items-center gap-2 pb-3 lg:pb-0">
          <div className="relative w-[300px]">
            <AiOutlineSearch className="absolute left-4 top-3 text-gray-400 text-lg" />
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-12 pr-4 py-2 rounded-full bg-[#EDECEC] text-black focus:outline-none"
            />
          </div>
          {activeSupplyTab === "Purchase Order" && (
            <div className="flex space-x-3">
              {purchaseOrdersSubOptions?.map((option) => (
                <button
                  className={`px-5 py-2 rounded-full font-medium text-nowrap text-sm ${
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
        {activeSupplyTab === "Supplier" && (
          <div className="flex space-x-3">
            <button className="border border-black text-black px-5 py-2 rounded-lg flex items-center space-x-2">
              <span>Add item</span>
              {/* <AiOutlineDown /> */}
            </button>
            <button
              className="bg-black text-white px-5 py-2 rounded-lg flex items-center space-x-2"
              onClick={openSupplierModal}
            >
              <span>Add a supplier</span>
              {/* <AiOutlineDown /> */}
            </button>
          </div>
        )}

        {activeSupplyTab === "Purchase Order" && (
          <div className="flex space-x-3">
            <Link to={CHEF_ROUTES.linkChefSupplyOrder}>
              <button className="bg-black text-white px-6 py-2 rounded-lg flex items-center space-x-2">
                <span className="text-nowrap">Create an order</span>
                {/* <AiOutlineDown /> */}
              </button>
            </Link>
          </div>
        )}
      </div>

      {activeSupplyTab === "Supplier" && (
        <Table
          columns={supplierColumns}
          data={suppliers}
          EDIT_OPTIONS={SUPPLIER_EDIT_OPTIONS}
        />
      )}
      {activeSupplyTab === "Purchase Order" && (
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
              {editSupplier ? "Edit" : "Add"} a Supplier
            </p>
            <IoMdClose
              size={24}
              color="#8E8E8E"
              className="cursor-pointer"
              onClick={closeSupplierModal}
            />
          </div>

          <div>
            <Input
              type="text"
              placeholder="Name"
              name="name"
              onChange={handleChange}
              value={values.name}
              error={errors.name && touched.name && errors.name}
            />

            <Input
              type="number"
              placeholder={`Phone Number`}
              name="phoneNumber"
              onChange={handleChange}
              value={values.phoneNumber}
              error={
                errors.phoneNumber && touched.phoneNumber && errors.phoneNumber
              }
            />

            <Input
              type="text"
              placeholder={`Email address`}
              name="email"
              onChange={handleChange}
              value={values.email}
              error={errors.email && touched.email && errors.email}
            />

            <div>
              <FormControl sx={{ m: 1, width: "100%" }}>
                <InputLabel id="demo-multiple-chip-label">Category</InputLabel>
                <Select
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  name="category"
                  value={values.category}
                  onChange={handleChange}
                  input={
                    <OutlinedInput
                      name="category"
                      id="select-multiple-chip"
                      label="Category"
                    />
                  }
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  // MenuProps={MenuProps}
                >
                  {categoryList
                    .map((item) => item.label)
                    .map((name) => (
                      <MenuItem
                        key={name}
                        value={name}
                        // style={getStyles(name, personName, theme)}
                      >
                        {name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>

              {(touched?.category ||
                (Array.isArray(touched.category) &&
                  touched.category.length > 0)) &&
                values?.category?.length < 1 && (
                  <p className="text-sm text-center text-red-600 my-2">
                    Please select a category
                  </p>
                )}
            </div>

            <Input
              type="text"
              placeholder="Supplier’s bank name"
              name="bankName"
              // extraClasses={'!mt-10 !lg:mt-0'}
              onChange={handleChange}
              value={values.bankName}
              error={errors.bankName && touched.bankName && errors.bankName}
            />

            <Input
              type="text"
              placeholder="Supplier’s bank account name"
              name="bankAccountName"
              // extraClasses={'!mt-10 !lg:mt-0'}
              onChange={handleChange}
              value={values.bankAccountName}
              error={
                errors.bankAccountName &&
                touched.bankAccountName &&
                errors.bankAccountName
              }
            />

            <Input
              type="number"
              placeholder="Supplier’s bank account number"
              name="bankAccountNumber"
              // extraClasses={'!mt-10 !lg:mt-0'}
              onChange={handleChange}
              value={values.bankAccountNumber}
              error={
                errors.bankAccountNumber &&
                touched.bankAccountNumber &&
                errors.bankAccountNumber
              }
            />

            {/* {error  && (
                  <p className="text-sm text-center text-red-600 my-2">
                    {error}
                  </p>
                )} */}

            <div className="mt-10">
              <Button
                loading={isLoading}
                title={editSupplier ? "Update Supplier" : "Add Supplier"}
                extraClasses="w-full p-3 rounded-full px-8 py-2"
                onClick={() => {
                  handleSubmit();
                }}
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default InventorySupply;
