// import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Keyboard, EffectFade, Pagination } from "swiper/modules";
import { motion } from "framer-motion"; // Importa motion de framer-motion
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import { Autocomplete, TextField, Chip } from "@mui/material";
import { heroSliderData } from "@/data/homeSliderData";
import { HomeSliderContent } from "@/components/common/HomeSliderContent";
import { useState } from "react";

const serviceOptions = [
  "Lavado exterior",
  "Lavado interior",
  "Lavado completo",
  "Pulido de carrocería",
  "Cambio de aceite",
];
const LavadosFormulario = () => {
  const [contactNumber, setContactNumber] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  // Función para formatear el número
  const formatPhoneNumber = (value: string): string => {
    const digits = value.replace(/\D/g, "");
    if (digits.startsWith("54") && digits.length > 2) {
      return `+54 ${digits.slice(2, 6)} ${digits.slice(6, 11)}`;
    }
    return `+${digits}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const input = e.target.value;
    setContactNumber(formatPhoneNumber(input));
  };
  return (
    <div className="relative w-full">
      {/* SLIDER BACKGROUND */}
      <Swiper
        direction="horizontal"
        effect="fade"
        speed={1000}
        slidesPerView={1}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        loop={true}
        // onSlideChange={handleSlideChange}
        modules={[Autoplay, Keyboard, EffectFade, Pagination]}
      >
        {heroSliderData.map((slider, i) => (
          <SwiperSlide key={i}>
            <HomeSliderContent slider={slider} />
          </SwiperSlide>
        ))}

        <div className="absolute z-10 bottom-0 left-0 right-0 w-full">
          <div className=" bg-gradient-to-t from-black via-transparent to-transparent bg-opacity-65 rounded-lg p-6 text-black max-w-xl mx-auto">
            <motion.form
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.8, delay: 0.8 }} // Añadir más delay para el último elemento
              variants={{
                visible: { opacity: 1, y: 0 },
                hidden: { opacity: 0, y: 50 },
              }}
            >
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="text"
                    name="nombre"
                    id="floating_nombre"
                    className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label className="peer-focus:font-medium absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Nombre
                  </label>
                </div>

                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="text"
                    name="apellido"
                    id="floating_apellido"
                    className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label className="peer-focus:font-medium absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Apellido
                  </label>
                </div>
              </div>

              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  name="numero_contacto"
                  id="floating_numero_contacto"
                  className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  value={contactNumber}
                  onChange={handlePhoneChange}
                  required
                />
                <label className="peer-focus:font-medium absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Número de contacto
                </label>
              </div>

              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  name="vehiculo"
                  id="floating_vehiculo"
                  className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label className="peer-focus:font-medium absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Vehículo: Marca y Modelo
                </label>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="date"
                    name="fecha"
                    id="floating_fecha"
                    className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label className="peer-focus:font-medium absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Fecha
                  </label>
                </div>

                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="time"
                    name="hora"
                    id="floating_hora"
                    className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label className="peer-focus:font-medium absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Hora
                  </label>
                </div>
              </div>

              <div className="relative z-0 w-full mb-5 group text-white">
                <Autocomplete
                  multiple
                  freeSolo
                  options={serviceOptions}
                  value={selectedServices}
                  onChange={(event, newValue) => setSelectedServices(newValue)}
                  renderTags={(value) =>
                    value.map((option, index) => (
                      <Chip
                        key={index}
                        variant="outlined"
                        label={option}
                        deleteIcon={
                          <span
                            style={{
                              color: "white", // Cambia el color de la X
                              fontSize: "1em", // Tamaño opcional
                            }}
                          >
                            ✕
                          </span>
                        }
                        sx={{
                          color: "white", // Cambia el color del texto en las opciones seleccionadas
                          backgroundColor: "transparent", // Cambia el fondo (si es necesario)
                          borderColor: "white", // Cambia el color del borde
                        }}
                      />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      label="Servicios"
                      placeholder="Selecciona o escribe un servicio"
                      InputProps={{
                        ...params.InputProps,
                        sx: {
                          "&::placeholder": {
                            color: "white", // Cambia el color del placeholder
                          },
                          color: "white", // Cambia el color del texto del input
                        },
                      }}
                      InputLabelProps={{
                        sx: {
                          color: "white", // Cambia el color del label
                          "&.Mui-focused": {
                            color: "white", // Cambia el color del label cuando está enfocado
                          },
                        },
                      }}
                    />
                  )}
                />
              </div>

              <button className="text-base font-semibold  text-white m-6 group relative w-max">
                <span> Enviar petición de lavado</span>
                <span className="absolute -bottom-1 left-0 w-0 transition-all h-0.5 bg-indigo-600 group-hover:w-full"></span>
              </button>
            </motion.form>
          </div>
        </div>
      </Swiper>
    </div>
  );
};

export default LavadosFormulario;
