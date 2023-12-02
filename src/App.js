import React, { useState } from 'react';
import InvoiceList from './components/InvoiceList';
import TableForm from './components/TableForm';

const App = () => {
  const [view, setView] = useState('home');
  const [allInvoicesList, setAllInvoicesList] = useState([]);
  const [filter, setFilter] = useState('all');

  const handleFormSubmit = (formData) => {
    const currentDate = new Date();
    const dueDate = new Date(formData.date);
    let status = '';

    if (dueDate > currentDate) {
      status = 'outstanding';
    } else if (dueDate < currentDate) {
      status = 'late';
    } else {
      status = 'paid';
    }

    const updatedFormData = { ...formData, status };
    
    setAllInvoicesList((prevInvoices) => [...prevInvoices, updatedFormData]);
    setView('home');
  };
  const handleBack = (page) => {
    setView(page);
  }

  return (
    <>
      {view === 'home' && (
        <div className='homepage'>
          <h1>Invoicing App : Homepage</h1>
          <button onClick={() => setView('viewInvoices')}>View All Invoices</button>
          <button onClick={() => setView('createInvoice')}>Create New Invoice</button>
        </div>
      )}

      {view === 'viewInvoices' && (
        <div className='filter-button'>
          <button onClick={() => setFilter('all')}>All</button>
          <button onClick={() => setFilter('paid')}>Paid</button>
          <button onClick={() => setFilter('outstanding')}>Outstanding</button>
          <button onClick={() => setFilter('late')}>Late</button>
          <InvoiceList invoices={allInvoicesList} filter={filter} onBackToHome={handleBack}/>
        </div>
      )}

      {view === 'createInvoice' && (
        <TableForm onFormSubmit={handleFormSubmit} />
      )}
    </>
  );
};

export default App;
