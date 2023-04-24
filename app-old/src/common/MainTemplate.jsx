import Footer from "../features/footer/Footer";
import Navbar from "../features/navbar/Navbar";

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
