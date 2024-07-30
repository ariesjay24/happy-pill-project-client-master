import { Routes, Route } from "react-router-dom";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import routes from "./routes";

const App = () => {
  return (
    <>
      <Header />
      <main>
        <Routes>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={route.element}
              exact
            />
          ))}
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default App;
