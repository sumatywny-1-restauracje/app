import Footer from "../features/footer/Footer";
import Navbar from "../features/navbar/Navbar";

const MainTemplate = ({ children }) => {
  return (
    <div className="flex h-full min-h-screen flex-col bg-zinc-100">
      <Navbar />
      <div className="flex flex-auto flex-col items-center">{children}</div>
      <Footer />
    </div>
  );
};

export default MainTemplate;
