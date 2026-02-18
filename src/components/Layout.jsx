import Header from "./Header";
import Footer from "./Footer";
import { SearchProvider } from "../context/SearchContext";

const Layout = ({ children }) => {
  return (
    <SearchProvider>
      <Header />
      <main className="pt-24 md:pt-28">{children}</main>
      <Footer />
    </SearchProvider>
  );
};
export default Layout;