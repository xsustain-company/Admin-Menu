import { createSlice } from "@reduxjs/toolkit";
import { getProducts, addNewProduct, updateProduct, deleteProducts, getOrders, addNewOrder, updateOrder, deleteOrder, getCustomers, addNewCustomer, updateCustomer, deleteCustomer, getSellers } from './thunk';
export const initialState :any= {
  products: [],
  orders: [],
  sellers: [],
  customers: [],
  error: {},
};

const EcommerceSlice = createSlice({
  name: 'EcommerceSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProducts.fulfilled, (state:any, action:any) => {
      state.products = action.payload;
    });

    builder.addCase(getProducts.rejected, (state:any, action:any) => {
      state.error = action.payload.error || null;
    });

    builder.addCase(addNewProduct.fulfilled, (state:any, action:any) => {
      state.products.push(action.payload);
    });

    builder.addCase(addNewProduct.rejected, (state:any, action:any) => {
      state.error = action.payload.error || null;
    });

    builder.addCase(updateProduct.fulfilled, (state:any, action:any) => {
      state.products = state.products.map((product:any) =>
        product.id === action.payload.id
          ? { ...product, ...action.payload }
          : product
      );;
    });

    builder.addCase(updateProduct.rejected, (state:any, action:any) => {
      state.error = action.payload.error || null;
    });

    builder.addCase(deleteProducts.fulfilled, (state:any, action:any) => {
      state.products = (state.products || []).filter((product:any) => product.id.toString() !== action.payload.product.toString());
    });

    builder.addCase(deleteProducts.rejected, (state:any, action:any) => {
      state.error = action.payload.error || null;
    });

    builder.addCase(getOrders.fulfilled, (state: any, action: any) => {
      state.orders = action.payload;
      state.isOrderCreated = false;
      state.isOrderSuccess = true;
    });

    builder.addCase(getOrders.rejected, (state: any, action: any) => {
      state.error = action.payload.error || null;
      state.isOrderCreated = false;
      state.isOrderSuccess = false;
    });

    builder.addCase(addNewOrder.fulfilled, (state: any, action: any) => {
      state.orders.push(action.payload);
      state.isOrderCreated = true;
    });

    builder.addCase(addNewOrder.rejected, (state: any, action: any) => {
      state.error = action.payload.error || null;
    });

    builder.addCase(updateOrder.fulfilled, (state: any, action: any) => {
      state.orders = state.orders.map((order: any) =>
        order.id === action.payload.id
          ? { ...order, ...action.payload }
          : order
      );
    });

    builder.addCase(updateOrder.rejected, (state: any, action: any) => {
      state.error = action.payload.error || null;
    });

    builder.addCase(deleteOrder.fulfilled, (state: any, action: any) => {
      state.orders = state.orders.filter(
        (order: any) => order.id.toString() !== action.payload.order.toString()
      );
    });

    builder.addCase(deleteOrder.rejected, (state: any, action: any) => {
      state.error = action.payload.error || null;
    });

    builder.addCase(getSellers.fulfilled, (state:any, action:any) => {
      state.sellers = action.payload;
    });

    builder.addCase(getSellers.rejected, (state:any, action:any) => {
      state.error = action.payload.error || null;
    });

    builder.addCase(getCustomers.fulfilled, (state:any, action:any) => {
      state.customers = action.payload;
      state.isCustomerCreated = false;
      state.isCustomerSuccess = true;
    });

    builder.addCase(getCustomers.rejected, (state:any, action:any) => {
      state.error = action.payload.error || null;
      state.isCustomerCreated = false;
      state.isCustomerSuccess = false;
    });

    builder.addCase(addNewCustomer.fulfilled, (state:any, action:any) => {
      state.customers.push(action.payload);
      state.isCustomerCreated = true;
    });
    builder.addCase(addNewCustomer.rejected, (state:any, action:any) => {
      state.error = action.payload.error || null;
    });

    builder.addCase(updateCustomer.fulfilled, (state:any, action:any) => {
      state.customers = state.customers.map((customer:any) =>
        customer.id === action.payload.id
          ? { ...customer, ...action.payload }
          : customer
      );
    });
    builder.addCase(updateCustomer.rejected, (state:any, action:any) => {
      state.error = action.payload.error || null;
    });

    builder.addCase(deleteCustomer.fulfilled, (state:any, action:any) => {
      state.customers = state.customers.filter(
        (customer:any) => customer.id.toString() !== action.payload.customer.toString()
      );
    });
    builder.addCase(deleteCustomer.rejected, (state:any, action:any) => {
      state.error = action.payload.error || null;
    });
  }
});

export default EcommerceSlice.reducer;