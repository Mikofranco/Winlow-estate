// @ts-nocheck
import React from "react";
import { useSelector, shallowEqual } from "react-redux";
import ChefDashboardLayout from "../../components/ChefDashboardLayout";
import PageTitle from "../../components/PageTitle";
import BannerCard from "../../components/BannerCard";
import { Link } from "react-router-dom";
import { CHEF_ROUTES } from "../../routes/routes";

const ChefMenu = () => {
  const { user } = useSelector(
    (state: any) => ({
      user: state.user.user,
    }),
    shallowEqual
  );

  return (
    <>
      <ChefDashboardLayout>
        <>
          <div className="w-full px-6 py-4">
            <div className="lg:flex flex-row w-full justify-between">
              <PageTitle title="Menu" />
            </div>

            <div className="bg-white rounded-2xl w-full p-6 mt-3">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-2 lg:gap-y-0 lg:gap-x-2 w-full h-fit">
                {!user?.isRestaurant ? (
                  <Link to={CHEF_ROUTES.linkChefMenuOnline}>
                    <div className="relative w-[351px] h-[224px] rounded-2xl bg-[#ECFFEB]">
                      <img
                        src="/Store-Vector.png"
                        alt=""
                        className="object-cover h-56 min-h-full w-full rounded-2xl"
                      />
                      <div className="absolute bottom-1 left-0 p-5 space-y-3">
                        <p className="text-start text-primary text-2xl font_bold">
                          Dropp Store
                        </p>
                        <button className="px-3 py-1 rounded-lg text-white font_medium bg-primary">
                          Learn more
                        </button>
                      </div>
                    </div>
                  </Link>
                ) : (
                  <Link to={CHEF_ROUTES.linkChefMenuDineIn}>
                    <div className="relative w-[351px] h-[224px] rounded-2xl bg-[#FDEEF0]">
                      <img
                        src="/Dinein-Vector.png"
                        alt=""
                        className="object-cover h-[220px] w-full rounded-2xl"
                      />
                      <div className="absolute bottom-5 left-0 p-5 space-y-3">
                        <p className="text-start text-[#E85666] text-2xl font_bold">
                          Dropp Dinein
                        </p>
                        <button className="px-3 py-1 rounded-lg font_medium bg-[#E85666] text-white">
                          Learn more
                        </button>
                      </div>
                    </div>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </>
      </ChefDashboardLayout>
    </>
  );
};

export default ChefMenu;
