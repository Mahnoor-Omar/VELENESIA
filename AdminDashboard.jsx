import React, { useState, useContext } from "react";
import { ShopContext } from "../context/ShopContext"; 
import { toast } from "react-toastify";

const AdminDashboard = () => {
  // Use context for dynamic state and functions
  const { products, orders, addProduct, deleteProduct, updateOrderStatus, currency } = useContext(ShopContext);

  const [activeTab, setActiveTab] = useState("products");
  
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
    category: "", 
    subCategory: "",
    description: "",
    available_sizes: "S, M, L", 
  });

  
  const handleAddProductSubmit = (e) => {
    e.preventDefault();
    
    if (newProduct.name === "" || newProduct.price === "") {
        toast.error("Please fill required fields (Name and Price).");
        return;
    }

    addProduct(newProduct);

   
    setNewProduct({ 
        name: "", 
        price: "", 
        image: "", 
        category: "", 
        subCategory: "", 
        description: "",
        available_sizes: "S, M, L",
    });

    setActiveTab("products"); 
  };

  // DELETE PRODUCT
  const handleDeleteProduct = (id) => {
    deleteProduct(id); // Call context function
  };

  // UPDATE ORDER STATUS
  const handleUpdateOrderStatus = (id, newStatus) => {
    updateOrderStatus(id, newStatus); // Call context function
  };

  // Helper to reverse orders for display (newest first)
  const displayOrders = [...orders].reverse();

  return (
    <div className="flex h-screen bg-gray-100">
      {/* SIDEBAR */}
      <div className="w-64 bg-black text-white p-6">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <ul className="space-y-4">
          <li
            onClick={() => setActiveTab("products")}
            className={`cursor-pointer hover:text-pink-400 ${
              activeTab === "products" && "text-pink-400"
            }`}
          >
            Products ({products.length})
          </li>
          <li
            onClick={() => setActiveTab("addProduct")}
            className={`cursor-pointer hover:text-pink-400 ${
              activeTab === "addProduct" && "text-pink-400"
            }`}
          >
            Add Product
          </li>
          <li
            onClick={() => setActiveTab("orders")}
            className={`cursor-pointer hover:text-pink-400 ${
              activeTab === "orders" && "text-pink-400"
            }`}
          >
            Orders ({orders.length})
          </li>
        </ul>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-6 overflow-y-auto">
        
        {/* PRODUCTS LIST */}
        {activeTab === "products" && (
          <div>
            <h2 className="text-2xl mb-4 font-semibold">Product List</h2>
            <table className="w-full bg-white shadow-md rounded-lg">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-3">ID</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* Map dynamic products from context */}
                {products.map((p) => (
                  <tr key={p._id} className="border-b">
                    <td className="p-3 text-sm text-gray-500">{p._id}</td>
                    <td className="p-3">{p.name}</td>
                    <td className="p-3">{currency} {p.price.toFixed(2)}</td>
                    <td className="p-3">
                      <button
                        onClick={() => handleDeleteProduct(p._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ADD PRODUCT */}
        {activeTab === "addProduct" && (
          <div>
            <h2 className="text-2xl mb-4 font-semibold">Add New Product</h2>
            <form
              onSubmit={handleAddProductSubmit}
              className="bg-white p-6 rounded-lg shadow-md space-y-4"
            >
              <input
                type="text"
                placeholder="Product Name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                className="border p-2 w-full rounded"
                required
              />

              <input
                type="number"
                placeholder="Price"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                className="border p-2 w-full rounded"
                required
              />
              
              <input
                type="text"
                placeholder="Category (e.g., Women, Men)"
                value={newProduct.category}
                onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                className="border p-2 w-full rounded"
              />

              <input
                type="text"
                placeholder="Sub-Category (e.g., Dress, Top)"
                value={newProduct.subCategory}
                onChange={(e) => setNewProduct({ ...newProduct, subCategory: e.target.value })}
                className="border p-2 w-full rounded"
              />

              <input
                type="text"
                placeholder="Available Sizes (Comma separated: S, M, L)"
                value={newProduct.available_sizes}
                onChange={(e) => setNewProduct({ ...newProduct, available_sizes: e.target.value })}
                className="border p-2 w-full rounded"
              />

              <input
                type="text"
                placeholder="Image URL (Comma separated for multiple images)"
                value={newProduct.image}
                onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                className="border p-2 w-full rounded"
              />
              
              <textarea 
                placeholder="Product Description"
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                className="border p-2 w-full rounded h-24"
              ></textarea>

              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700"
              >
                Add Product
              </button>
            </form>
          </div>
        )}

        {/* ORDERS LIST */}
        {activeTab === "orders" && (
          <div>
            <h2 className="text-2xl mb-4 font-semibold">Orders ({displayOrders.length})</h2>
            <table className="w-full bg-white shadow-md rounded-lg">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-3">Order ID</th>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* Map dynamic orders from context */}
                {displayOrders.map((order) => (
                  <tr key={order.id} className="border-b">
                    <td className="p-3 text-sm">{order.id}</td>
                    <td className="p-3">{order.customer}</td>
                    <td className="p-3">{currency} {order.amount.toFixed(2)}</td>
                    <td className="p-3">{order.status}</td>
                    <td className="p-3 space-x-2">
                      <button
                        onClick={() => handleUpdateOrderStatus(order.id, "Shipped")}
                        className="bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600"
                      >
                        Shipped
                      </button>
                      <button
                        onClick={() => handleUpdateOrderStatus(order.id, "Delivered")}
                        className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700"
                      >
                        Delivered
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;