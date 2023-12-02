import React, { useState } from 'react';
import InvoiceDetails from './InvoiceDetails';

const InvoiceList = ({ invoices, filter, onBackToHome }) => {
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const filterInvoices = () => {
    const currentDate = new Date();

    switch (filter) {
      case 'paid':
        return invoices.filter((invoice) => invoice.status === 'paid');
      case 'outstanding':
        return invoices.filter(
          (invoice) =>
            invoice.status !== 'paid' &&
            new Date(invoice.dueDate) >= currentDate
        );
      case 'late':
        return invoices.filter(
          (invoice) =>
            invoice.status !== 'paid' &&
            new Date(invoice.dueDate) < currentDate
        );
      default:
        return invoices;
    }
  };

  const filteredInvoices = filterInvoices();

  const handleShowDetails = (invoice) => {
    const currentDate = new Date();
    if (new Date(invoice.date) < currentDate) {
      alert("Invoice is late!");
    }
    setSelectedInvoice(invoice);
  };

  const handleCloseDetails = () => {
    setSelectedInvoice(null);
  };

  return (
    <div className='invoice-list'>
      <h1>All Invoices</h1>
      <ul>
        {filteredInvoices.length > 0 ? (
          filteredInvoices.map((invoice, index) => (
            <li key={index}>
              <h3>{invoice.title}</h3>
              <p>{invoice.description}</p>
              <p>Due Date: {invoice.date}</p>
              <p>Status: {invoice.status}</p>
              
              <button onClick={() => handleShowDetails(invoice)}>Show Details</button>
            </li>
          ))
        ) : (
          <p>No invoices to display.</p>
        )}
      </ul>

      {selectedInvoice && (
        <InvoiceDetails invoice={selectedInvoice} onCloseDetails={handleCloseDetails} />
      )}

      <button onClick={() => onBackToHome('home')}>Go Back</button>
    </div>
  );
};

export default InvoiceList;
