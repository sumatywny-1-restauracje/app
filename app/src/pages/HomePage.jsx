import Teaser from "../features/homePageElements/Teaser";
import FoodCategories from "../features/homePageElements/FoodCategories";
import RegularMenu from "../features/homePageElements/RegularMenu";
import SpecialOffers from "../features/homePageElements/SpecialOffers";

const HomePage = () => {
  return (
    <div className="flex w-full flex-col items-center gap-24 pb-16">
      <Teaser />
      <div className="flex w-full max-w-screen-2xl flex-col items-center gap-24">
        <FoodCategories />
        <RegularMenu />
        <SpecialOffers />
      </div>
    </div>
  );
};

export default HomePage;
