import ProductContentHome from "../componenetsProduct/productHome";
import BrandCards from "./brandCards";
import CategoriesCards from "./categoriesCards";

const Home = () => {
  return (
    <div>
      <CategoriesCards />
      <BrandCards />
      <ProductContentHome />
    </div>
  );
};

export default Home;
