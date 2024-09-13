"use client";
import SectionAdmin from "@/components/SectionAdmin/SectionAdmin";
import withAuth from "./withAuth";

const Home = () => {
  return (
    <>
      <main className="">
        <SectionAdmin />
      </main>
    </>
  );
};

export default withAuth(Home);
