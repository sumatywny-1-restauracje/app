const SpecialOffers = () => {
  return (
    <div className="flex w-4/6 flex-col items-center gap-6">
      <h2 className="w-full bg-clip-text text-3xl font-extrabold text-gray-700 max-md:text-center sm:text-4xl md:text-5xl">
        New <span className="text-rose-400">Special</span> Offers
      </h2>
      <div className="grid max-h-[27rem] grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="relative row-span-2 overflow-hidden rounded-xl">
          <span className="absolute left-3 top-3 w-max rounded-lg bg-gray-500 bg-opacity-70 p-2 text-base font-bold text-white md:text-3xl lg:text-4xl">
            50% Discount
          </span>
          <img
            src="https://images.pexels.com/photos/580612/pexels-photo-580612.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Hamburger Offer"
            className="h-full w-full object-fill "
          />
        </div>
        <div className="relative overflow-hidden rounded-xl">
          <span className="absolute right-3 top-3 w-max rounded-lg bg-gray-500 bg-opacity-70 p-2 text-base font-bold text-white md:text-3xl lg:text-4xl">
            25% Discount
          </span>
          <img
            src="https://images.pexels.com/photos/2586924/pexels-photo-2586924.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Ice Cream Offer"
            className="h-full w-full object-fill "
          />
        </div>
        <div className="relative overflow-hidden rounded-xl">
          <span className="absolute bottom-3 right-3 w-max rounded-lg bg-gray-500 bg-opacity-70 p-2 text-base font-bold text-white md:text-3xl lg:text-4xl">
            25% Discount
          </span>
          <img
            src="https://images.pexels.com/photos/1213710/pexels-photo-1213710.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Salad Offer"
            className="h-full w-full object-fill"
          />
        </div>
      </div>
    </div>
  );
};

export default SpecialOffers;
