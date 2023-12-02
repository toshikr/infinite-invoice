import React from 'react';

const InvoiceDetails = ({ invoice, onCloseDetails }) => {
  return (
    <div className="invoice-details">
        <div className="invoice-container">
            <h2>Infinite Analytics</h2>
            <div className='client-details'>
                <p>Client Name: {invoice.fname}</p>
                <p>Email: {invoice.email}</p>
                <p>Address: {invoice.address}</p>
            </div>

            <table className='items-table'>
                <thead>
                <tr>
                    <th>Item Name</th>
                    <th>Item Price</th>
                    <th>Quantity</th>
                    <th>Total Price</th>
                </tr>
                </thead>
                <tbody>
                {invoice.items.map((item, index) => (
                    <tr key={index}>
                    <td>{item.itemName}</td>
                    <td>{item.itemPrice}</td>
                    <td>{item.quantity}</td>
                    <td>{item.totalPrice}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            <p className='total-amount'>Total Amount: {invoice.items.reduce((acc,item) => acc + parseInt(item.totalPrice), 0)}</p>
            <p style={{ padding:"10px"}}>Due date: {invoice.date}</p>
            <p>Notes: {invoice.notes}</p>

            <button onClick={onCloseDetails}>Close</button>
        </div>
    </div>
  );
};

export default InvoiceDetails;
