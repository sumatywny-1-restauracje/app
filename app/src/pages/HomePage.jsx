import Teaser from "../features/homePageElements/Teaser";
import FoodCategories from "../features/homePageElements/FoodCategories";
import RegularMenu from "../features/homePageElements/RegularMenu";
import SpecialOffers from "../features/homePageElements/SpecialOffers";

const HomePage = () => {
  return (
    <div className="flex w-full flex-col items-center gap-16 pb-16 sm:gap-20 lg:gap-24">
      <Teaser />
      <div className="flex w-full max-w-screen-2xl flex-col items-center gap-16 sm:gap-20 lg:gap-24">
        <FoodCategories />
        <RegularMenu />
        <SpecialOffers />
      </div>
    </div>
  );
};

export default HomePage;
