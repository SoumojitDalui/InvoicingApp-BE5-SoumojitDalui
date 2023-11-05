import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import InvoiceList from './components/InvoiceList/InvoiceList';
import InvoiceForm from "./components/InvoiceForm/InvoiceForm";
import InvoiceItems from "./components/InvoiceItems/InvoiceItems";
import ItemForm from "./components/ItemForm/ItemForm";
import Signin from './components/Signin/Signin';
import Signup from './components/Signup/Signup';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {localStorage.loggedIn ? <Route path="/" element={<Navigate to="/invoices" />} /> : <Route path="/" element={<Navigate to="/user/login" />} />}
          <Route path='/user/login' element={<Signin />} />
          <Route path='/user/signup' element={<Signup />} />
          <Route path='/invoices' element={<InvoiceList />} />
          <Route path='/newInvoice' element={<InvoiceForm />} />
          <Route path='/:id' element={<InvoiceItems />} />
          <Route path='/:id/newItem' element={<ItemForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
