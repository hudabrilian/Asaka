import { Footer } from "./Footer";
import Header from "./Header";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.min.css";

export const Layout = ({ children }: { children: any }) => {
  return (
    <div className="bg-stone-800 min-h-screen max-w-screen select-none">
      {/* <Header /> */}
      <main className="text-white my-10 px-7 md:px-32">{children}</main>
      <Footer />
      <ToastContainer />
    </div>
  );
};
