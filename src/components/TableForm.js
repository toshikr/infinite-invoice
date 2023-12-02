import React, { useState } from 'react';
import '../style.css';

const TableForm = ({ onFormSubmit }) => {
  const [items, setItems] = useState([{ itemName: '', itemPrice: '', quantity: '', totalPrice: '' }]);

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };

  const handleAddItem = () => {
    setItems([...items, { itemName: '', itemPrice: '', quantity: '', totalPrice: '' }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const payload = { ...Object.fromEntries(formData), items };
    onFormSubmit(payload);
    console.log(payload);
  };

  return (
    <div >
      <h1>Create New Invoice</h1>
      <form onSubmit={handleSubmit} className='input-form' >
        <label>Full name</label>
        <input type='text' name="fname" id="name" placeholder='Enter your full name' />

        <label>Client's address</label>
        <input type='text' name="address" id="address" placeholder='Enter your address' />

        <label>Invoice due date</label>
        <input type='date' name="date" id="invoice-due-date" placeholder='Enter the invoice due date' />

        <label>Email</label>
        <input type='email' name="email" id="email" placeholder='Enter your email' />

        <label>Notes</label>
        <input type='text' name="notes" id="notes" placeholder='Enter Additional notes here e.g. Bank details to transfer' />

        <div className='items-section'>
          <h2>Items</h2>
          {items.map((item, index) => (
            <div key={index} className="item-row">
              <label>Item Name</label>
              <input type='text' value={item.itemName} onChange={(e) => handleItemChange(index, 'itemName', e.target.value)} />

              <label>Item Price</label>
              <input type='number' value={item.itemPrice} onChange={(e) => handleItemChange(index, 'itemPrice', e.target.value)} />

              <label>Quantity</label>
              <input type='number' value={item.quantity} onChange={(e) => handleItemChange(index, 'quantity', e.target.value)} />

              <label>Total Price</label>
              <input type='number' value={item.totalPrice} onChange={(e) => handleItemChange(index, 'totalPrice', e.target.value)} />
            </div>
          ))}
          <button type="button" onClick={handleAddItem}>Add Item</button>
        </div>

        <div className='form-buttons'>
          <button type="submit">Submit</button>
          <button onClick={() => onFormSubmit('home')}>Cancel</button>
        </div>

      </form>
    </div>
  );
};

export default TableForm;
