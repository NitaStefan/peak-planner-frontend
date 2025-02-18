import React from "react";
import Logo from "../navigation/navbar/Logo";
import AuthActions from "../navigation/navlinks/AuthActions";
import Routines from "./Routines";
import Goals from "./Goals";
import Events from "./Events";

const LandingPage = () => {
  return (
    <section className="mx-auto max-w-5xl px-[30px] pb-[5px] pt-[80px] max-sm:px-[10px] max-sm:pt-[20px]">
      <span className="flex flex-col items-center justify-center">
        <Logo />
        <p className="text-slate-500">
          - Reach Your Peak, One Step at a Time -
        </p>
      </span>

      <p className="mt-[40px] text-center text-lg">
        Plan your{" "}
        <span className="rounded-sm border-b-2 border-orange-act">
          Routines
        </span>
        , track your{" "}
        <span className="rounded-sm border-b-2 border-orange-act">Goals</span>,
        and manage{" "}
        <span className="rounded-sm border-b-2 border-orange-act">Events</span>{" "}
        <br />— all in one place.
      </p>

      <AuthActions />

      <div className="mx-auto mt-[60px] max-w-lg">
        <Routines />
        <Goals />
        <Events />
      </div>
    </section>
  );
};

export default LandingPage;
