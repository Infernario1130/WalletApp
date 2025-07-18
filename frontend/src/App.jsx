import {BrowserRouter,Routes,Route,Navigate} from "react-router-dom";
import {Suspense,lazy} from "react";
const Landing = lazy(()=>import ("./pages/Landing"))
const SignUp = lazy(()=>import ("./pages/SignUp"));
const SignIn = lazy(()=>import ("./pages/SignIn"));
const Dashboard = lazy(()=>import ("./pages/Dashboard"));
const ChangePin = lazy(()=>import ("./pages/ChangePin"));
const Me = lazy(()=>import ("./pages/Me"));
const Transfer = lazy(()=>import ("./pages/Transfer"));
const Transactions = lazy(()=>import ("./pages/Transactions"));
const TopUp = lazy(()=>import ("./pages/TopUp"));
const NotFound = lazy(()=>import ("./pages/NotFound"))
const ContactUs = lazy(()=>import ("./pages/ContactUs"))

function App() {
  return(
    <>
    <BrowserRouter>
    <Suspense fallback={"Loading..."}>
    <Routes>
      <Route path="/" element={<Landing/>}/>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/signin" element={<SignIn/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/me" element={<Me/>}/>
      <Route path="/change-pin" element={<ChangePin/>}/>
      <Route path="/transfer" element={<Transfer/>}/>
      <Route path="/transactions" element={<Transactions/>}/>
      <Route path="/top-up" element={<TopUp/>}/>
      <Route path="/contact" elemeny={<ContactUs/>}/>
      <Route path="*" element={<NotFound/>}/>
    </Routes>
    </Suspense>
    </BrowserRouter>
    </>
  )
}

export default App

// add protected route