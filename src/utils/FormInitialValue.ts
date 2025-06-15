export const CustomerSignUpValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const SignUpValues = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  location: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const CompanySignUpValues = {
  companyName: "",
  email: "",
  numberOfEmployees: "",
  password: "",
  confirmPassword: "",
};

export const EventSignUpValues = {
  firstName: "",
  lastName: "",
  referralCode: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const LoginValues = {
  email: "",
  password: "",
};

export const EditProfileValues = {
  fullName: "",
  bio: "",
  email: "",
  phoneNumber: "",
  address: "",
};

export const ReviewValues = {
  review: "",
};

export const BusinessValues = {
  businessName: "",
  businessAddress: "",
  businessLatitude: "",
  businessLongitude: "",
  businessDescription: "",
  businessSpecialisation: "",
};

export const PaymentValues = {
  bankName: "",
  accountName: "",
  accountNumber: "",
  bankCode: "",
};

export const NewMenuValues = {
  foodName: "",
  category: "",
  price: "",
  portion: "",
  minimumQuantity: "",
  description: "",
  ingredients: "",
  deliveryDays: "",
  closeDate: "",
  note: "",
  images: "",
};

export const DineInNewMenuValues = {
  foodName: "",
  price: "",
  category: "",
  portion: "",
  minimumQuantity: "",
  description: "",
  ingredients: "",
  subRecipe: [],
  modifiers: [],
  note: "",
  images: "",
};

export const cashierValues = {
  employeeName: "",
  employeeID: "",
  password: "",
  whatsappNumber: "",
};

export const deliveryValues = {
  delivery_city: "",
  delivery_areas: [],
  delivery_time: [],
  delivery_fee: "",
};

export const modifierValues = {
  item: "",
  amount: "",
  quantity: "",
  required: false,
};

export const terminalValues = {
  terminal: "",
  employeeName: "",
  password: "",
};

export const WaiterTableValues = {
  section: "",
  employeeAssigned: "",
  employeeID: "",
  table: "",
  password: "",
  whatsappNumber: "",
};

export const SuperWaiterTableValues = {
  section: [],
  employeeAssigned: "",
  employeeID: "",
  subTables: [],
  password: "",
  whatsappNumber: "",
};

export const ManagerValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  passwordText: "",
};

export const WaiterValues = {
  section: "",
  employeeAssigned: "",
  employeeID: "",
  table: "",
  password: "",
  whatsappNumber: "",
};

export const TeamsCashierValues = {
  section: "",
  employeeAssigned: "",
  employeeID: "",
  password: "",
  whatsappNumber: "",
};

export const TeamsTerminalValues = {
  name: "",
  location: "",
  cashierAssigned: "",
  password: "",
};

export const SupplierOrderValues = {
  supplier: "",
  deliveryDate: "",
  note: "",
  send: "",
  items: [],
};

export const RecipeValues = {
  recipeName: "",
  category: "",
  description: "",
  quantity: 0,
  quantityUnit: "",
  ingredients: [],
  prepTime: 0,
  prepTimeUnit: "",
  cookingTime: 0,
  cookingTimeUnit: "",
  timeToCompletion: 0,
  cookingInstructions: "",
  aboutItem: "",
};

export const IngredientRecipeValues = {
  item: "",
  netQuantity: "",
  netQuantityUnit: "",
  wasteQuantity: "",
  wasteQuantityUnit: "",
  unitCost: 0,
  grossQuantity: 0,
  total: 0,
};

export const SupplierValues = {
  name: "",
  phoneNumber: "",
  email: "",
  category: [],
  bankName: "",
  bankAccountName: "",
  bankAccountNumber: "",
};

export const HalfInventoryItemValues = {
  name: "",
  description: "",
  category: "",
  unit: "",
  costPerUnit: "",
  reorderLevel: "",
  autoReorder: false,
};

export const InventoryStockValues = {
  costPerUnit: "",
  quantity: "",
  reason: "",
  otherReason: "",
};

export const InventoryItemValues = {
  name: "",
  description: "",
  category: "",
  unit: "",
  costPerUnit: "",
  reorderLevel: "",
  autoReorder: false,
  autoReorderReminder: false,
  reorderQuantity: "",
  reorderQuantityUnit: "",
  supplier: "",
};

export const NewSubscriptionMenuValues = {
  foodName: "",
  category: "",
  price: "",
  portion: "",
  description: "",
  ingredients: "",
  note: "",
  images: "",
};

export const DeliveryDetailsValues = {
  city: "",
  deliveryAddress: "",
  deliveryAddressLatitude: "",
  deliveryAddressLongitude: "",
  phoneNumber: "",
  deliveryTime: "",
  note: "",
  checkoutCode: "",
};

export const RestaurantCheckoutValues = {
  name: "",
  email: "",
  phoneNumber: "",
  notes: "",
};

export const QsrCheckoutValues = {
  name: "",
  email: "",
  phoneNumber: "",
};

export const StorefrontDeliveryValues = {
  name: "",
  email: "",
  phoneNumber: "",
  deliveryState: "",
  deliveryArea: "",
  deliveryTime: "",
  deliveryAddress: "",
  discountCode: "",
};

export const StorefrontPickupValues = {
  name: "",
  email: "",
  phoneNumber: "",
  discountCode: "",
};

export const CashierLoginValues = {
  employeeID: "",
  password: "",
};

export const WaiterLoginValues = {
  employeeID: "",
  table: "",
  password: "",
};

export const SuperWaiterLoginValues = {
  employeeID: "",
  password: "",
};

export const SubChefValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

export const QsrSubAdminValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

export const SectionValues = {
  name: "",
};
