import Image from "next/image";
import Toxic from "@/../public/assets/images/Toxic.png";

const Marcas = () => {
  return (
    <div className="relative w-full">
      <h2 className="text-xl text-center font-bold mb-4">
        Marcas con las que trabajamos
      </h2>
      <div className=" h-24 mb-6 flex items-center justify-center">
        <Image src={Toxic} alt="Servicios" width="100" height="100" />
      </div>
    </div>
  );
};

export default Marcas;
