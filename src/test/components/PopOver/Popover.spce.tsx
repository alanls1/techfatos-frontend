// import React from "react";
// import { render, screen, fireEvent } from "@testing-library/react";
// import Popover from "@/components/PopOver/PopOver";

// // // // Simula o localStorage
// beforeEach(() => {
//   window.localStorage.clear();
//   window.localStorage.setItem("key", "qualquerValor");
// });

// test("mostra o popover se os termos não foram aceitos", () => {
//   (window.localStorage.getItem as jest.Mock).mockReturnValueOnce(null);
//   //render(<Popover />);
//   // const title = screen.getByText(/termos de uso/i);
//   // expect(title).toHaveBeenCalled;
// });

// // // test("esconde o popover se os termos foram aceitos", () => {
// // //   localStorage.getItem.mockReturnValueOnce("true");
// // //   render(<Popover />);
// // //   const title = screen.queryByText(/termos de uso/i);
// // //   expect(title).not.toBeInTheDocument();
// // // });

// // // test("aceitar os termos salva no localStorage e esconde o popover", () => {
// // //   localStorage.getItem.mockReturnValueOnce(null);
// // //   render(<Popover />);

// // //   const acceptButton = screen.getByRole("button", { name: /aceitar/i });
// // //   fireEvent.click(acceptButton);

// // //   expect(localStorage.setItem).toHaveBeenCalledWith(
// // //     "termsAcceptedTechFatos",
// // //     "true"
// // //   );
// // //   const title = screen.queryByText(/termos de uso/i);
// // //   expect(title).not.toBeInTheDocument();
// // // });

// // // test("recusar os termos mantém o popover e redireciona", () => {
// // //   localStorage.getItem.mockReturnValueOnce(null);
// // //   render(<Popover />);

// // //   const declineButton = screen.getByRole("button", { name: /recusar/i });
// // //   fireEvent.click(declineButton);

// // //   expect(localStorage.setItem).toHaveBeenCalledWith(
// // //     "termsAcceptedTechFatos",
// // //     "false"
// // //   );
// // //   expect(window.location.href).toBe("/termsandpolicies");
// // // });
