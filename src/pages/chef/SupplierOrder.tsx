import { useEffect, useState } from 'react'
import ChefDashboardLayout from '../../components/ChefDashboardLayout';
import { CHEF_ROUTES } from '../../routes/routes';
import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import PageTitle from '../../components/PageTitle';
import { IoSearchSharp } from 'react-icons/io5';
import { DashboardItemSkeletonLoader } from '../../components/DashboardItemSkeletonLoader';
import { generateUUIDBasedOnStringLength, toTitleCase } from '../../utils/formatMethods';
import { Checkbox } from '@headlessui/react';
import { Modal } from '@mui/material';
import { IoMdClose } from 'react-icons/io';
import Button from '../../components/Button';
import Input from '../../components/CustomInput';
import { FormikTouched, useFormik } from 'formik';
import { SupplierOrderValues } from '../../utils/FormInitialValue';
import { SupplierOrderSchema } from '../../utils/ValidationSchema';
import { SERVER } from '../../config/axios';
import { ITEM_URL, SUPPLY_URL } from '../../_redux/urls';
import { shallowEqual, useSelector } from 'react-redux';
import OutlineButton from '../../components/OutlineButton';
import { AiOutlineSearch } from 'react-icons/ai';
import { SupplierOrderType } from '../../utils/Interfaces';

const STOCK_ITEMS = [
    {
        sku: '52363534',
        item: 'Rice (Mama gold)',
        category: ['Bar', 'Kitchen'],
        unit: 'KG',
        unit_cost: '10000',
        total_cost: '10000',
        reorder_level: '20'
    },
    {
        sku: '52363535',
        item: 'Beans (Oloyin)',
        category: ['Kitchen'],
        unit: 'KG',
        unit_cost: '8000',
        total_cost: '8000',
        reorder_level: '15'
    },
    {
        sku: '52363536',
        item: 'Flour (Golden Penny)',
        category: ['Bakery', 'Kitchen'],
        unit: 'KG',
        unit_cost: '7500',
        total_cost: '7500',
        reorder_level: '25'
    },
    {
        sku: '52363537',
        item: 'Vegetable Oil (Kings)',
        category: ['Kitchen'],
        unit: 'Litre',
        unit_cost: '12000',
        total_cost: '12000',
        reorder_level: '30'
    },
    {
        sku: '52363538',
        item: 'Sugar (Dangote)',
        category: ['Bar', 'Kitchen'],
        unit: 'KG',
        unit_cost: '5000',
        total_cost: '5000',
        reorder_level: '10'
    },
    {
        sku: '52363539',
        item: 'Salt (Mr Chef)',
        category: ['Kitchen'],
        unit: 'KG',
        unit_cost: '3000',
        total_cost: '3000',
        reorder_level: '10'
    },
    {
        sku: '52363540',
        item: 'Spaghetti (Golden Penny)',
        category: ['Kitchen'],
        unit: 'Pack',
        unit_cost: '6000',
        total_cost: '6000',
        reorder_level: '25'
    },
    {
        sku: '52363541',
        item: 'Milk (Peak Powdered)',
        category: ['Bar', 'Kitchen'],
        unit: 'Tin',
        unit_cost: '15000',
        total_cost: '15000',
        reorder_level: '18'
    },
    {
        sku: '52363542',
        item: 'Soft Drinks (Coca-Cola)',
        category: ['Bar'],
        unit: 'Crate',
        unit_cost: '14000',
        total_cost: '14000',
        reorder_level: '10'
    },
    {
        sku: '52363543',
        item: 'Chicken (Frozen)',
        category: ['Kitchen'],
        unit: 'KG',
        unit_cost: '20000',
        total_cost: '20000',
        reorder_level: '10'
    }
];

const SEND_OPTIONS = [
    {label: "Email", value: "email"},
    {label: "Get a link", value: "link"}
]

const SupplierOrder = () => {
    const navigate = useNavigate();

    const {
        user,
    } = useSelector(
        (state: any) => ({
          user: state.user.user,
        }),
        shallowEqual
    );

    const [continueModal, setContinueModal] = useState(false)
    const openContinueModal = () => {
        setContinueModal(true)
    }
    const closeContinueModal = () => {
        setContinueModal(false)
    }

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
        validateForm
    } = useFormik({
        initialValues: SupplierOrderValues,
        validationSchema: SupplierOrderSchema,
        onSubmit: (values) => {
            setIsLoading(true)
            console.log("values= ", values);
            createSupplierOrder(values);
        },
    });

    const [rawSuppliers, setRawSuppliers] = useState([]);
    const [inventoryItems, setInventoryItems] = useState([]);

    const getInventorySuppliers = () => {
        SERVER.get(`${SUPPLY_URL}/${user?._id}`)
        .then(({ data }) => {
          if (
              data?.suppliers &&
              data?.suppliers?.length > 0
            ) {
              setRawSuppliers(data?.suppliers.map(item => ({
                id: item?._id,
                label: toTitleCase(item?.name),
                value: item?.name,
              })))
            }
        })
        .catch((err) => {
            console.log(err);
        });
    };

    const getInventoryItems = () => {
        setIsLoading(true);
        SERVER.get(`${ITEM_URL}/${user?._id}`)
        .then(({ data }) => {
            if (
              data?.items &&
              data?.items?.length > 0
            ) {
              let tempData = data?.items.map(item => ({
                id: `#${item?._id?.substring(item?._id?.length - 6)}`,
                name: item?.name,
                category: item?.category,
                unit: item?.unit,
                costPerUnit: item?.costPerUnit,
                total: item?.total || 0,
                reorderLevel: item?.reorderLevel
              }))
              setInventoryItems(data?.items);
            }
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => setIsLoading(false));
    };

    const createSupplierOrder = (items) => {
        SERVER.post(`${SUPPLY_URL}/order/${user?._id}`, {...items})
        .then(({ data }) => {
            resetForm();
            closeContinueModal();
            navigate(CHEF_ROUTES.chefInventory);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            setIsLoading(false);
        });
    }

    useEffect(() => {
        getInventorySuppliers();
        getInventoryItems();
    }, []);

    const [skuList, setSkuList] = useState([]);
    const [fullSkuList, setFullSkuList] = useState([]);

    const handleSkuCheck = (sku) => {
        if(skuList.includes(sku)){
            let tempList = skuList;
            const index = tempList.indexOf(sku);
            if (index > -1) {
                tempList.splice(index, 1);
            }
            setSkuList([...tempList]);
        }else{
            setSkuList([sku, ...skuList]);
        }
    }

    const triggerForm = async () => {
        await setTouched({
            supplier: true,
            deliveryDate: true,
            note: true,
            send: true,
            items: true,
        } as FormikTouched<SupplierOrderType>);
      
        // Trigger validation
        const errors = await validateForm();
        console.log('errs= ', errors);
    }

    const [q, setQ] = useState("");
    const searchFiltered =
    q === ""
      ? STOCK_ITEMS
      : STOCK_ITEMS.filter(
          (item: any) =>
            item?.category?.toString().toLowerCase().indexOf(q.toLowerCase()) > -1 ||
            item?.item?.toString().toLowerCase().indexOf(q.toLowerCase()) > -1 ||
            item?.sku?.toString().toLowerCase().indexOf(q.toLowerCase()) > -1 ||
            item?.unit?.toString().toLowerCase().indexOf(q.toLowerCase()) > -1 ||
            item?.unit_cost?.toString().toLowerCase().indexOf(q.toLowerCase()) > -1 ||
            item?.total_cost?.toString().toLowerCase().indexOf(q.toLowerCase()) > -1 ||
            item?.reorder_level?.toString().toLowerCase().indexOf(q.toLowerCase()) > -1
        );
        
    const totalPrice = fullSkuList?.reduce((a, c, i) => a = a + Number((c.total || 0)), 0);
    // console.log('skulist= ', totalPrice, Number.isNaN(totalPrice) ? 0 : totalPrice)
        
    return (
        <ChefDashboardLayout>
            <>
                <div className="w-full px-6 py-4">
                    <div className="flex flex-col md:flex-row w-full justify-between gap-y-2 md:gap-y-0">
                        <Link to={CHEF_ROUTES.linkChefInventory}>
                            <div className="flex flex-row items-center cursor-pointer">
                                <MdOutlineArrowBackIosNew size={20} className="mr-3" />
                                <PageTitle title="Back" />
                            </div>
                        </Link>
                    </div>

                    <div className="bg-white rounded-2xl w-full py-10 px-5 mt-3">
                        <div>
                            <p className='text-xl font-semibold pb-2'>Order details</p>
                        </div>

                        <div className='w-full flex flex-col lg:flex-row justify-start lg:justify-between items-stretch gap-y-5 gap-x-5'>
                            <div className='w-full lg:w-1/2'>
                                <Input
                                    type="dropdown"
                                    placeholder="Supplier"
                                    name="supplier"
                                    onChange={handleChange}
                                    value={values.supplier}
                                    options={rawSuppliers}
                                    error={errors.supplier && touched.supplier && errors.supplier}
                                />

                                <Input
                                    type="date"
                                    placeholder="Delivery date"
                                    name="deliveryDate"
                                    onChange={handleChange}
                                    value={values.deliveryDate}
                                    error={errors.deliveryDate && touched.deliveryDate && errors.deliveryDate}
                                />

                                <Input 
                                    type="dropdown"
                                    placeholder="Send via"
                                    name="send"
                                    onChange={handleChange}
                                    value={values.send}
                                    options={SEND_OPTIONS}
                                    error={errors.send && touched.send && errors.send}
                                />
                            </div>

                            <div className='w-full lg:w-1/2 flex'>
                                <Input
                                    type="text-area"
                                    placeholder="Add a note for your suppier"
                                    name="note"
                                    extraClasses='!grow'
                                    container='!flex !grow !min-h-36'
                                    onChange={handleChange}
                                    value={values.note}
                                    error={
                                    errors.note &&
                                    touched.note &&
                                    errors.note
                                    }
                                />
                            </div>
                        </div>

                        <div className='min-w-[300px] lg:min-w-full border border-neutral-200 rounded-xl p-5'>
                            <div className='w-full mb-5'>
                                <p className='text-xl font-semibold'>Add items and enter the quantity you want to order</p>

                                <OutlineButton
                                    title="Add item from items"
                                    extraClasses="mt-5"
                                    onClick={() => openContinueModal()}
                                />
                            </div>

                            <div className='w-full min-w-[700px] overflow-x-auto space-y-3 mt-5 py-10 border-y border-neutral-100'>
                                {fullSkuList?.map(item => (
                                    <div key={item._id} className='w-full grid grid-cols-4 gap-3'>
                                        <div>
                                            <p className='font-semibold'>{item?.name}</p>
                                        </div>

                                        <div>
                                            <p>Unit cost: {item?.costPerUnit}</p>
                                        </div>

                                        <div className='flex flex-row gap-x-2'>
                                            <p className='text-nowrap'>Enter quantity</p>

                                            <input 
                                                type="text" 
                                                className='h-8 w-24 rounded-md border border-neutral-200' 
                                                onChange={(e) => {
                                                    const target = e.target as HTMLInputElement;
                                                    console.log('first= ', target.value)
                                                    
                                                    setFullSkuList((prevFullSkuList) => 
                                                        prevFullSkuList.map(elem => 
                                                          elem._id === item._id 
                                                            ? { ...elem, quantity: Number(target.value), total: Number(target.value) ? Number(target.value) * Number(item?.costPerUnit) : 0 }
                                                            : elem
                                                        )
                                                    );
                                                }}
                                            />
                                        </div>

                                        <div>
                                            <p>Total cost: {item?.total || 0}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {typeof errors?.items === 'string' && (
                                <p className="text-sm text-center text-red-600 my-2">
                                    {errors?.items}
                                </p>
                            )}

                            <p className='text-end text-xl font-semibold my-5'>Total: N{Number.isNaN(totalPrice) ? 0 : totalPrice}</p>
                        </div>

                        <div className="flex flex-row justify-center lg:justify-end mt-10">
                            <Button
                                loading={isLoading}
                                title="Create Order"
                                extraClasses="w-1/2 p-3 rounded-full px-8 py-2 ml-auto"
                                onClick={() => {
                                    setFieldValue('items', [...fullSkuList]);
                                    
                                    const tempSupplier = rawSuppliers.filter(item => item.value === values?.supplier)[0];

                                    console.log('first temp= ', tempSupplier, rawSuppliers);
                                    
                                    setFieldValue('supplier', tempSupplier._id);

                                    triggerForm();
                                    console.log('valuesss= ', values);
                                    if(Object.values(errors).length < 1){
                                        handleSubmit();
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>

                <Modal
                    open={continueModal}
                    onClose={closeContinueModal}
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description"
                >
                    <div className="absolute top-1/2 left-1/2 w-5/6 lg:w-2/3 h-3/4 overflow-scroll -translate-y-1/2 -translate-x-1/2 bg-white rounded-3xl p-7 my-10 outline-none">
                        <div className="flex mb-3">
                            <p className="flex-1 text-xl text-center font_bold black2">
                                Add item from items
                            </p>

                            <IoMdClose
                            size={24}
                            color="#8E8E8E"
                            className="cursor-pointer"
                            onClick={closeContinueModal}
                            />
                        </div>

                        <div className="mt-3 w-full h-5/6 relative">
                            {/* Search & Actions */}
                            <div className="min-w-[300px] flex flex-row justify-between items-center gap-x-8 w-4/5 mx-auto">
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
                                        let tempSkuList = inventoryItems.filter(item => skuList.includes(item._id)).map(item => ({
                                            ...item,
                                            item: item?._id,
                                            quantity: 0,
                                            total: 0
                                        }))

                                        setFullSkuList(tempSkuList);
                                        setFieldValue('items', tempSkuList);
                                        closeContinueModal();
                                    }}
                                    >
                                        <span className="text-center">Add</span> 
                                        {/* <AiOutlineDown /> */}
                                    </button>
                                </div>
                            </div>

                            <div className="inline-block min-w-[700px] lg:min-w-full py-5 align-middle">
                                <div className="overflow-x-auto">
                                    {isLoading ? (
                                    <div className="my-4 grid grid-cols-2 gap-3">
                                        {[...Array(4)]?.map((_, i) => (
                                        <DashboardItemSkeletonLoader key={i} />
                                        ))}
                                    </div>
                                    ) : (
                                    <table className="min-w-full divide-y divide-gray-300 h-auto min-h-48">
                                        <thead>
                                            <tr>
                                                <th
                                                scope="col"
                                                className="py-3.5 pl-4 pr-3 text-left text-sm font_medium text-black font-normal sm:pl-0"
                                                >
                                                    SKU
                                                </th>
                                                <th
                                                scope="col"
                                                className="px-3 py-3.5 text-left text-sm font_medium text-black font-normal"
                                                >
                                                    Item
                                                </th>
                                                <th
                                                scope="col"
                                                className="px-3 py-3.5 text-left text-sm font_medium text-black font-normal"
                                                >
                                                    Category
                                                </th>
                                                <th
                                                scope="col"
                                                className="px-3 py-3.5 text-left text-sm font_medium text-black font-normal max-w-[400px]"
                                                >
                                                    Unit 
                                                </th>
                                                <th
                                                scope="col"
                                                className="px-3 py-3.5 text-left text-sm font_medium text-black font-normal"
                                                >
                                                    Unit cost
                                                </th>
                                                <th
                                                scope="col"
                                                className="px-3 py-3.5 text-left text-sm font_medium text-black font-normal"
                                                >
                                                    Total cost
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {inventoryItems?.map((item: any, i: number) => (
                                                <tr key={generateUUIDBasedOnStringLength("ttru")}>
                                                    <td className="whitespace-nowrap py-4 pl-0 text-sm font_medium text-[#310E0E] lg:pl-3">
                                                        <span className='flex items-center gap-x-2'>
                                                            <Checkbox
                                                                checked={skuList.includes(item?._id)}
                                                                onChange={() => handleSkuCheck(item?._id)}
                                                                className="group block size-4 rounded border bg-white data-[checked]:bg-blue-500"
                                                            >
                                                                <svg className="stroke-white opacity-0 group-data-[checked]:opacity-100" viewBox="0 0 14 14" fill="none">
                                                                    <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                                                </svg>
                                                            </Checkbox>
                                                            {`#${item?._id?.substring(item?._id?.length - 6)}`}
                                                        </span>
                                                    </td>
                                                    <td className="whitespace-nowrap py-4 pl-0 text-sm font_medium text-[#310E0E] lg:pl-3">
                                                        {item?.name}
                                                    </td>
                                                    <td className="whitespace-nowrap py-4 pl-0 text-sm font_medium text-[#310E0E] lg:pl-3 text-wrap">
                                                        {item?.category}
                                                    </td>
                                                    <td className="whitespace-nowrap py-4 pl-0 text-sm font_medium text-[#310E0E] lg:pl-3 max-w-[400px] text-wrap">
                                                        {item?.unit}
                                                    </td>
                                                    <td className="whitespace-nowrap py-4 pl-0 text-sm font_medium text-[#310E0E] lg:pl-3 max-w-[400px] text-wrap">
                                                        {item?.costPerUnit}
                                                    </td>
                                                    <td className="whitespace-nowrap py-4 pl-0 text-sm font_medium text-[#310E0E] lg:pl-3 max-w-[400px] text-wrap">
                                                        {item?.total || 0}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            </>
        </ChefDashboardLayout>
    )
}

export default SupplierOrder