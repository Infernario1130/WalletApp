import {BrowserRouter,Routes,Route} from "react-router-dom";
import {useNavigate,Suspense,lazy} from "react";

function App() {
  return(
    <>
    <BrowserRouter>
    <Suspense fallback={"Loading..."}>
    <Routes>
      <Route path="/signup"/>
      <Route path="/signin"/>
      <Route path="/me"/>
      <Route path="change-pin"/>
      <Route path="/refresh-token"/>
      <Route path="sign-out"/>
      <Route path="/transfer"/>
      <Route path="/transactions"/>
      <Route path="/top-up"/>
    </Routes>
    </Suspense>
    </BrowserRouter>
    </>
  )
}