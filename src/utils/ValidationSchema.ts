import * as Yup from "yup";

export const CustomerSignUpSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required."),
  lastName: Yup.string().required("Last name is required."),
  email: Yup.string().email().required("Email is required."),
  password: Yup.string()
    .required("Password is required.")
    .matches(/\w*[a-z]\w*/, "Password must have a small letter")
    .matches(/\w*[A-Z]\w*/, "Password must have a capital letter")
    .matches(/\d/, "Password must have a number")
    .matches(
      /[!+@#$%^&*()\-_"=+{}; :,<.>]/,
      "Password must have a special character"
    )
    .min(8, ({ min }) => `Password must be at least ${min} characters`),
  confirmPassword: Yup.string()
    .required("Confirm password is required.")
    .oneOf([Yup.ref("password")], "Passwords do not match"),
});

export const SignUpSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required."),
  lastName: Yup.string().required("Last name is required."),
  phoneNumber: Yup.string().required("Phone number is required."),
  email: Yup.string().email().required("Email is required."),
  address: Yup.string().required("Location is required."),
  password: Yup.string()
    .required("Password is required.")
    .matches(/\w*[a-z]\w*/, "Password must have a small letter")
    .matches(/\w*[A-Z]\w*/, "Password must have a capital letter")
    .matches(/\d/, "Password must have a number")
    .matches(
      /[!+@#$%^&*()\-_"=+{}; :,<.>]/,
      "Password must have a special character"
    )
    .min(8, ({ min }) => `Password must be at least ${min} characters`),
  confirmPassword: Yup.string()
    .required("Confirm password is required.")
    .oneOf([Yup.ref("password")], "Passwords do not match"),
});

export const CompanySignUpSchema = Yup.object().shape({
  companyName: Yup.string().required("Company Name is required."),
  email: Yup.string().email().required("Official Email is required."),
  numberOfEmployees: Yup.number().required("Number Of Eployees is required."),
  password: Yup.string()
    .required("Password is required.")
    .matches(/\w*[a-z]\w*/, "Password must have a small letter")
    .matches(/\w*[A-Z]\w*/, "Password must have a capital letter")
    .matches(/\d/, "Password must have a number")
    .matches(
      /[!+@#$%^&*()\-_"=+{}; :,<.>]/,
      "Password must have a special character"
    )
    .min(8, ({ min }) => `Password must be at least ${min} characters`),
  confirmPassword: Yup.string()
    .required("Confirm password is required.")
    .oneOf([Yup.ref("password")], "Passwords do not match"),
});

export const EventSignUpSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required."),
  lastName: Yup.string().required("Last name is required."),
  email: Yup.string().email().required("Email is required."),
  referralCode: Yup.string().required("Referral code is required."),
  password: Yup.string()
    .required("Password is required.")
    .matches(/\w*[a-z]\w*/, "Password must have a small letter")
    .matches(/\w*[A-Z]\w*/, "Password must have a capital letter")
    .matches(/\d/, "Password must have a number")
    .matches(
      /[!+@#$%^&*()\-_"=+{}; :,<.>]/,
      "Password must have a special character"
    )
    .min(8, ({ min }) => `Password must be at least ${min} characters`),
  confirmPassword: Yup.string()
    .required("Confirm password is required.")
    .oneOf([Yup.ref("password")], "Passwords do not match"),
});

export const LoginSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is required."),
  password: Yup.string().required("Password is required."),
});

export const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is required."),
});

export const EditProfileSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required."),
  lastName: Yup.string().required("Last name is required."),
  bio: Yup.string(),
  email: Yup.string().email().required("Email is required."),
  phoneNumber: Yup.string(),
  address: Yup.string(),
});

export const EditBusinessSchema = Yup.object().shape({
  businessName: Yup.string(),
});

export const ReviewSchema = Yup.object().shape({
  review: Yup.string().required("Review is required."),
});

export const NewMenuInputsSchema = Yup.object().shape({
  images: Yup.array(Yup.string()).required("Image is required."),
  foodName: Yup.string().required("Food name is required."),
  category: Yup.string(),
  price: Yup.string().required("Price is required."),
  portion: Yup.string().required("Portion is required."),
  minimumQuantity: Yup.string().required("Minimum quantity is required."),
  description: Yup.string().required("Description is required."),
  ingredients: Yup.string().required("Ingredients is required."),
  deliveryDays: Yup.array(Yup.string()).required("Delivery day is required."),
  closeDate: Yup.string().required("Closing date is required."),
  note: Yup.string(),
});

export const DineInNewMenuInputsSchema = Yup.object().shape({
  images: Yup.array(Yup.string()).required("Image is required."),
  foodName: Yup.string().required("Food name is required."),
  price: Yup.number().min(1).required("Price is required."),
  portion: Yup.string().required("Portion is required."),
  minimumQuantity: Yup.string().required("Minimum quantity is required."),
  description: Yup.string().required("Description is required."),
  ingredients: Yup.string().required("Ingredients is required."),
  subRecipe: Yup.array().optional(),
  modifiers: Yup.array().optional(),
  category: Yup.string().required("Category is required."),
  note: Yup.string(),
});

export const CashierInputsSchema = Yup.object().shape({
  employeeName: Yup.string().required("Employee name is required."),
  employeeID: Yup.string().required("Employee ID is required."),
  whatsappNumber: Yup.string().optional(),
  password: Yup.string().required("Password is required."),
});

export const DeliveryInputsSchema = Yup.object().shape({
  delivery_city: Yup.string().required("Delivery city is required."),
  delivery_areas: Yup.array(Yup.string())
    .min(1, "At least one delivery area is required")
    .required("Delivery areas are required."),
  delivery_time: Yup.array(Yup.string())
    .min(1, "At least one delivery time is required")
    .required("Delivery time is required."),
  delivery_fee: Yup.number().required("Delivery fee is required."),
});

export const ModifiersInputsSchema = Yup.object().shape({
  item: Yup.string().required("Item is required."),
  amount: Yup.number()
    .min(1, "Amount is required")
    .required("Amount is required."),
  quantity: Yup.number()
    .min(1, "Quantity is required")
    .required("Quantity is required."),
  required: Yup.boolean().optional(),
});

export const TerminalInputsSchema = Yup.object().shape({
  terminal: Yup.string().required("Terminal is required."),
  employeeName: Yup.string().required("Employee name is required."),
  password: Yup.string().required("Password is required."),
});

export const WaiterTableInputsSchema = Yup.object().shape({
  section: Yup.string().required("Section is required."),
  employeeAssigned: Yup.string().required("Employee name is required."),
  employeeID: Yup.string().required("Employee ID is required."),
  table: Yup.string().required("Table is required."),
  whatsappNumber: Yup.string().optional(),
  password: Yup.string().required("Password is required."),
});

export const SuperWaiterTableInputsSchema = Yup.object().shape({
  section: Yup.array(Yup.string()).required("Section is required."),
  subTables: Yup.array(Yup.string()).required("Table is required."),
  employeeAssigned: Yup.string().required("Employee name is required."),
  employeeID: Yup.string().required("Employee ID is required."),
  whatsappNumber: Yup.string().optional(),
  password: Yup.string().required("Password is required."),
});

export const SupplyInputsSchema = Yup.object().shape({
  name: Yup.string().required("Supplier name is required."),
  phoneNumber: Yup.number().required("Phone number is required."),
  email: Yup.string().email().required("Email is required."),
  category: Yup.array(Yup.string()).required("Category is required."),
  bankName: Yup.string().required("Bank name is required."),
  bankAccountName: Yup.string().required("Bank account name is required."),
  bankAccountNumber: Yup.number().required("Bank account number is required."),
});

export const SupplierOrderSchema = Yup.object().shape({
  supplier: Yup.string().required("Supplier is required"),
  deliveryDate: Yup.date().required("Delivery date is required"),
  note: Yup.string().nullable(),
  send: Yup.string().required("Send status is required"),
  items: Yup.array()
    .of(
      Yup.object().shape({
        item: Yup.string().required("Item is required"),
        quantity: Yup.number()
          .positive("Quantity must be greater than 0")
          .integer("Quantity must be a whole number")
          .required("Quantity is required"),
        total: Yup.number()
          .min(0, "Total must be at least 0")
          .required("Total is required"),
      })
    )
    .min(1, "At least one item is required"),
});

export const HalfInventoryItemSchema = Yup.object().shape({
  name: Yup.string().required("Item name is required."),
  description: Yup.string().required("Description is required."),
  category: Yup.string().required("Category is required."),
  unit: Yup.string().required("Unit of Measurement is required."),
  costPerUnit: Yup.number().required("Cost Per Unit is required."),
  reorderLevel: Yup.string().required("Reorder Level is required."),
});

export const InventoryStockSchema = Yup.object().shape({
  costPerUnit: Yup.number().required("Cost Per Unit is required."),
  quantity: Yup.number().required("Quantity is required"),
  reason: Yup.string().required("Reorder Level is required."),
  otherReason: Yup.string().optional(),
});

export const InventoryItemSchema = Yup.object().shape({
  name: Yup.string().required("Item name is required."),
  description: Yup.string().required("Description is required."),
  category: Yup.string().required("Category is required."),
  unit: Yup.string().required("Unit of Measurement is required."),
  costPerUnit: Yup.number().required("Cost Per Unit is required."),
  reorderLevel: Yup.number()
    .typeError("Reorder Level must be a number.")
    .required("Reorder Level is required."),
  autoReorder: Yup.boolean().default(false),
  autoReorderReminder: Yup.boolean().default(false),
  reorderQuantity: Yup.number()
    .typeError("Reorder Quantity must be a number.")
    .required("Reorder Quantity is required.")
    .test(
      "is-greater-or-equal",
      "Reorder Quantity must be greater than or equal to Reorder Level.",
      function (value) {
        const { reorderLevel } = this.parent;
        if (value === undefined || reorderLevel === undefined) return true;
        return Number(value) >= Number(reorderLevel);
      }
    ),
  // reorderQuantityUnit: Yup.string().required(
  //   "Reorder Quantity Unit is required."
  // ),
  supplier: Yup.string().required("Supplier is required."),
});

export const ManagerInputsSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required."),
  lastName: Yup.string().required("Last name is required."),
  email: Yup.string().email().required("Email is required."),
  password: Yup.string()
    .required("Password is required.")
    .matches(/\w*[a-z]\w*/, "Password must have a small letter")
    .matches(/\w*[A-Z]\w*/, "Password must have a capital letter")
    .matches(/\d/, "Password must have a number")
    .matches(
      /[!+@#$%^&*()\-_"=+{}; :,<.>]/,
      "Password must have a special character"
    )
    .min(8, ({ min }) => `Password must be at least ${min} characters`),
});

export const WaiterInputsSchema = Yup.object().shape({
  section: Yup.string().required("Section is required."),
  employeeAssigned: Yup.string().required("Employee name is required."),
  employeeID: Yup.string().required("Employee ID is required."),
  table: Yup.string().required("Table is required."),
  whatsappNumber: Yup.string().optional(),
  password: Yup.string().required("Password is required."),
});

export const TeamsCashierInputsSchema = Yup.object().shape({
  section: Yup.string().required("Section is required."),
  employeeAssigned: Yup.string().required("Employee assigned is required."),
  employeeID: Yup.string().required("Employee ID is required."),
  whatsappNumber: Yup.string().optional(),
  password: Yup.string().required("Password is required."),
});

export const TeamsTerminalInputsSchema = Yup.object().shape({
  name: Yup.string().required("Terminal name is required."),
  location: Yup.string().required("Terminal location is required."),
  cashierAssigned: Yup.string().required("Cashier assigned is required."),
  password: Yup.string().required("Password is required."),
});

export const NewCashierInputsSchema = Yup.object().shape({
  section: Yup.array(Yup.string()).required("Section is required."),
  subTables: Yup.array(Yup.string()).required("Table is required."),
  employeeAssigned: Yup.string().required("Employee name is required."),
  employeeID: Yup.string().required("Employee ID is required."),
  whatsappNumber: Yup.string().optional(),
  password: Yup.string().required("Password is required."),
});

export const NewTerminalInputsSchema = Yup.object().shape({
  section: Yup.array(Yup.string()).required("Section is required."),
  subTables: Yup.array(Yup.string()).required("Table is required."),
  employeeAssigned: Yup.string().required("Employee name is required."),
  employeeID: Yup.string().required("Employee ID is required."),
  whatsappNumber: Yup.string().optional(),
  password: Yup.string().required("Password is required."),
});

export const NewSubscriptionMenuInputsSchema = Yup.object().shape({
  images: Yup.array(Yup.string()).required("Image is required."),
  foodName: Yup.string().required("Food name is required."),
  category: Yup.string(),
  price: Yup.string().required("Price is required."),
  portion: Yup.string().required("Portion is required."),
  description: Yup.string().required("Description is required."),
  ingredients: Yup.string().required("Ingredients is required."),
  note: Yup.string(),
});

export const DeliveryDetailsSchema = Yup.object().shape({
  deliveryAddress: Yup.string().required("Delivery address is required."),
  city: Yup.string().required("City is required."),
  phoneNumber: Yup.string().required("Phone number is required."),
  deliveryTime: Yup.string().required("Delivery time is required."),
  note: Yup.string(),
  checkoutCode: Yup.string(),
});

export const RecipeSchema = Yup.object().shape({
  recipeName: Yup.string().required("Recipe name is required."),
  category: Yup.string().required("Category is required."),
  description: Yup.string().required("Description is required."),
  quantityUnit: Yup.string().required("Quantity unit is required."),
  quantity: Yup.number()
    .required("Quantity is required.")
    .min(0, "Quantity cannot be negative"),
  ingredients: Yup.array()
    .of(
      Yup.object().shape({
        item: Yup.string().required("Item is required"),
        netQuantity: Yup.number()
          .required("Net Quantity is required")
          .min(0, "Net Quantity cannot be negative"),
        netQuantityUnit: Yup.string().required("Net Quantity Unit is required"),
        wasteQuantity: Yup.number()
          .required("Waste Quantity is required")
          .min(0, "Waste Quantity cannot be negative"),
        wasteQuantityUnit: Yup.string().required(
          "Waste Quantity Unit is required"
        ),
        unitCost: Yup.number()
          .required("Unit Cost is required")
          .min(1, "Unit Cost cannot be less than 1"),
        grossQuantity: Yup.number()
          .required("Gross Quantity is required")
          .min(0, "Gross Quantity cannot be negative"),
        total: Yup.number()
          .required("Total is required")
          .min(0, "Total cannot be negative"),
      })
    )
    .min(1, "At least one ingredient is required"),
  prepTime: Yup.number().optional(),
  prepTimeUnit: Yup.string().optional(),
  cookingTime: Yup.number().optional(),
  cookingTimeUnit: Yup.string().optional(),
  timeToCompletion: Yup.number().optional(),
  cookingInstructions: Yup.string().optional(),
  aboutItem: Yup.string().optional(),
});

export const IngredientRecipeSchema = Yup.object().shape({
  item: Yup.string().required("Item is required"),
  netQuantity: Yup.number()
    .required("Net Quantity is required")
    .min(0, "Net Quantity cannot be negative"),
  netQuantityUnit: Yup.string().required("Net Quantity Unit is required"),
  wasteQuantity: Yup.number()
    .required("Waste Quantity is required")
    .min(0, "Waste Quantity cannot be negative"),
  wasteQuantityUnit: Yup.string().required("Waste Quantity Unit is required"),
  // unitCost: Yup.number()
  //   .required("Unit Cost is required")
  //   .min(0, "Unit Cost cannot be negative"),
  // grossQuantity: Yup.number()
  //   .required("Gross Quantity is required")
  //   .min(0, "Gross Quantity cannot be negative"),
  // total: Yup.number()
  //   .required("Total is required")
  //   .min(0, "Total cannot be negative"),
});

export const WithdrawAmountSchema = Yup.object().shape({
  amount: Yup.number().required("Amount is required."),
});

export const RestaurantCheckoutSchema = Yup.object().shape({
  name: Yup.string().optional(),
  email: Yup.string().email().optional(),
  phoneNumber: Yup.string().required("Phone Number is required."),
  notes: Yup.string().optional(),
});

export const QsrCheckoutSchema = Yup.object().shape({
  name: Yup.string().optional(),
  email: Yup.string().email().required(),
  phoneNumber: Yup.string().optional(),
});

export const StorefrontPickupSchema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  phoneNumber: Yup.string().required(),
  discountCode: Yup.string().optional(),
});

export const StorefrontDeliverySchema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  phoneNumber: Yup.string().required(),
  deliveryState: Yup.string().required(),
  deliveryArea: Yup.string().required(),
  deliveryTime: Yup.string().required(),
  deliveryAddress: Yup.string().required(),
  discountCode: Yup.string().optional(),
});

export const CashierLoginSchema = Yup.object().shape({
  employeeID: Yup.string().required("Employee ID is required."),
  password: Yup.string().required("Password is required."),
});

export const WaiterLoginSchema = Yup.object().shape({
  employeeID: Yup.string().required("Employee ID is required."),
  table: Yup.string().required("Table is required."),
  password: Yup.string().required("Password is required."),
});

export const SuperWaiterLoginSchema = Yup.object().shape({
  employeeID: Yup.string().required("Employee ID is required."),
  password: Yup.string().required("Password is required."),
});

export const CreateSubChefSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required."),
  lastName: Yup.string().required("Last name is required."),
  email: Yup.string().email().required("Email is required."),
  password: Yup.string()
    .required("Password is required.")
    .matches(/\w*[a-z]\w*/, "Password must have a small letter")
    .matches(/\w*[A-Z]\w*/, "Password must have a capital letter")
    .matches(/\d/, "Password must have a number")
    .matches(
      /[!+@#$%^&*()\-_"=+{}; :,<.>]/,
      "Password must have a special character"
    )
    .min(8, ({ min }) => `Password must be at least ${min} characters`),
});

export const CreateQsrSubAdminSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required."),
  lastName: Yup.string().required("Last name is required."),
  email: Yup.string().email().required("Email is required."),
  password: Yup.string()
    .required("Password is required.")
    .matches(/\w*[a-z]\w*/, "Password must have a small letter")
    .matches(/\w*[A-Z]\w*/, "Password must have a capital letter")
    .matches(/\d/, "Password must have a number")
    .matches(
      /[!+@#$%^&*()\-_"=+{}; :,<.>]/,
      "Password must have a special character"
    )
    .min(8, ({ min }) => `Password must be at least ${min} characters`),
});

export const SectionInputsSchema = Yup.object().shape({
  name: Yup.string().required("Name is required."),
});
