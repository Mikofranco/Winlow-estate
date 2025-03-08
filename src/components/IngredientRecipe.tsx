import { Autocomplete, Chip, TextField } from '@mui/material'
import Input from "./CustomInput";
import React, { useEffect, useState } from 'react'
import nigeria_state_and_lgas from "../file/nigeria_state_and_lgas.json"
import { DELIVERY_TIME } from '../utils/Globals';
import Button from './Button';
import { SERVER } from '../config/axios';
import { MENU_DELIVERY_URL } from '../_redux/urls';
import { deliveryValues, IngredientRecipeValues } from '../utils/FormInitialValue';
import { useFormik } from 'formik';
import { DeliveryInputsSchema, IngredientRecipeSchema } from '../utils/ValidationSchema';
import OutlineButton from './OutlineButton';

const IngredientRecipe = ({ 
    ingredientsValues,
    quantitySizes,
    isLoading,
    addIngredient,
    removeIngredient,
    index=NaN,
 }) => {


    const {
        handleChange,
        handleSubmit,
        values,
        setValues,
        setFieldValue,
        resetForm,
        errors,
        touched,
        dirty,
    } = useFormik({
        initialValues: ingredientsValues ? ingredientsValues : IngredientRecipeValues,
        validationSchema: IngredientRecipeSchema,
        onSubmit: () => {
            console.log("addIngredient() values= ", values);
            addIngredient({...values, total: 0, grossQuantity: 0, unitCost: 0})
            resetForm();
        },
    });
    
    return (
        <div className="bg-white rounded-3xl p-4 shadow-2xl mt-4 mb-8">
            <div>
                <Input
                    type="text"
                    placeholder="Item"
                    name={`item`}
                    onChange={handleChange}
                    value={values.item}
                    error={errors.item && touched.item && errors.item}
                />

                <div className="w-full flex flex-row items-center justify-center gap-x-3">
                    <Input
                        type="number"
                        container={'!grow'}
                        placeholder="Net Quantity"
                        name={`netQuantity`}
                        onChange={handleChange}
                        value={values.netQuantity}
                        error={errors.netQuantity &&
                        touched.netQuantity && errors.netQuantity}
                    />

                    <Input
                        type="dropdown"
                        newName="a quantity unit"
                        extraClasses={'!w-16 !px-2'}
                        placeholder=""
                        name={`netQuantityUnit`}
                        onChange={handleChange}
                        options={quantitySizes}
                        value={values.netQuantityUnit}
                        error={errors.netQuantityUnit && touched.netQuantityUnit && errors.netQuantityUnit}
                    />
                </div>

                <div className="w-full flex flex-row items-center justify-center gap-x-3">
                    <Input
                        type="number"
                        container={'!grow'}
                        placeholder="Waste Quantity"
                        name={`wasteQuantity`}
                        onChange={handleChange}
                        value={values.wasteQuantity}
                        error={errors.wasteQuantity && touched.wasteQuantity && errors.wasteQuantity}
                    />

                    <Input
                        type="dropdown"
                        newName="a quantity unit"
                        extraClasses={'!w-16 !px-2'}
                        placeholder=""
                        name={`wasteQuantityUnit`}
                        onChange={handleChange}
                        options={quantitySizes}
                        value={values.wasteQuantityUnit}
                        error={errors.wasteQuantityUnit &&
                        touched.wasteQuantityUnit && errors.wasteQuantityUnit}
                    />
                </div>

                <div className="w-full py-10">
                    {ingredientsValues ? (
                        <OutlineButton
                            loading={isLoading}
                            title="Remove"
                            extraClasses="w-full p-3 rounded-full px-8 py-2"
                            onClick={() => removeIngredient(index)}
                        />
                    ) : (
                        <OutlineButton
                            loading={isLoading}
                            title="Save & add another"
                            extraClasses="w-full p-3 rounded-full px-8 py-2"
                            onClick={handleSubmit}
                        />
                    )}
                </div>
            </div>

        </div>
    )
}

export default IngredientRecipe