import Footer from "./footer/Footer";
import Navbar from "./navbar/Navbar";

const MainTemplate = ({ children }) => {
  return (
    <div className="flex h-full min-h-screen flex-col bg-orange-100">
      <Navbar />
      <div className="flex flex-auto justify-center bg-zinc-100">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default MainTemplate;
