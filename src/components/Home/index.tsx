import Image from "../../images/Coins-bro.png";

export default function Home() {
  return (
    <>
      <div className="flex flex-col md:flex md:flex-row items-center justify-center mt-20">
        <p className="text-2xl text-[#567B54] font-medium">
          A <span className="text-[#6CBE68]">Liberdade Financeira</span> <br /> começa com um bom controle
        </p>
        <div>
          <img src={Image} className="w-72" />
        </div>
      </div>
    </>
  );
}
