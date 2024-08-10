import BrandsManager from "../BrandsManager";
import CategoriesManager from "../CategoriesManager";
import CreateBrand from "../CreateBrand";

const Home = () => {
  return (
    <div>
      <CategoriesManager />
      <CreateBrand/>
      {/* <BrandsManager /> */}
    </div>
  );
};

export default Home;
