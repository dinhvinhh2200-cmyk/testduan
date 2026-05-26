import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Đường dẫn mặc định http://localhost:5173/ sẽ tự động nhảy vào trang Login */}
          <Route path="/" element={<Navigate to="/Register" replace />} />

          {/* Đường dẫn http://localhost:5173/login sẽ hiển thị giao diện Login */}
          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register/>}></Route>

          {/* Sau này bạn làm thêm trang khác thì chỉ cần thêm dòng như thế này: */}
          {/* <Route path="/register" element={<Register />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
