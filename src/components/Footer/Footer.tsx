import React from "react";

const Footer = () => {
  return (
    <footer className="pb-5 mt-10 w-full flex flex-col items-center bg-[#1F2937] text-white pt-4">
      <ul className="lg:w-5/6 flex flex-wrap justify-evenly mt-8 mb-8">
        <li className="cursor-pointer  mx-4">
          <a href="/computadores">Computadores</a>
        </li>
        <li className="cursor-pointer mx-4">
          <a href="/celulares">Celulares</a>
        </li>
        <li className="cursor-pointer mx-4">
          <a href="/jogos">Jogos</a>
        </li>
        <li className="cursor-pointer mx-4">Desenvolvimento de Software</li>
      </ul>
      <div
        style={{
          fontFamily: "fantasy",
          fontSize: "0.8rem",
          textAlign: "center",
        }}
      >
        <p>
          2024© Todos os direitos reservados a Tech
          <span className="text-red-400">Fatos</span>
        </p>
        <a href="/termsandpolicies">
          <span style={{ color: "rgb(196 191 191 / 80%)", fontSize: "12px" }}>
            Termos e condições
          </span>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
