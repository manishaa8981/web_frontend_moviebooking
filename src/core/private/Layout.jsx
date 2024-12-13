import { Outlet, useNavigate } from "react-router-dom";

function Layout() {
    const navigate=useNavigate();
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ background: "red" }}>This is top bar</div>
        <div style={{ display: "flex", flexGrow: 1, height: "100vh" }}>
          <div style={{ height: "100%", background: "yellow" }}>
            <div  style={{ display: "flex",flexDirection:'column'}}>
                    <button onClick={()=>navigate("/admin/customer")}>Customer</button>
                    <button onClick={()=>navigate("/admin/booking")}>Booking</button>
            </div>
          </div>
          <div style={{ flexGrow: 1 }}>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default Layout;
