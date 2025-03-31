// src/components/sections/LavadosFormulario.tsx
"use client";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Keyboard, EffectFade, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import { Autocomplete, TextField, Chip } from "@mui/material";
import { heroSliderData } from "@/data/homeSliderData";
import { HomeSliderContent } from "@/components/common/HomeSliderContent";
import { addAppointment, getOccupiedTimeSlots } from "@/firebase/appointments"; // Importar la función de Firebase

const serviceOptions = [
  "Lavado exterior",
  "Lavado interior",
  "Lavado completo",
  "Pulido de carrocería",
  "Cambio de aceite",
];

// Generar horarios disponibles (cada 30 minutos de 8:00 a 18:00)
const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 8; hour <= 18; hour++) {
    const hourStr = hour.toString().padStart(2, "0");
    slots.push(`${hourStr}:00`);
    if (hour < 18) {
      slots.push(`${hourStr}:30`);
    }
  }
  return slots;
};

const timeSlots = generateTimeSlots();

const LavadosFormulario = () => {
  const [contactNumber, setContactNumber] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [availableTimeSlots, setAvailableTimeSlots] =
    useState<string[]>(timeSlots);

  const [errorMessage, setErrorMessage] = useState("");

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

  // Función para actualizar horarios disponibles cuando se selecciona una fecha
  useEffect(() => {
    const fetchOccupiedTimeSlots = async () => {
      if (selectedDate) {
        try {
          const occupied = await getOccupiedTimeSlots(selectedDate);
          // Filtrar horarios disponibles
          const available = timeSlots.filter(
            (slot) => !occupied.includes(slot)
          );
          setAvailableTimeSlots(available);
        } catch (error) {
          console.error("Error fetching occupied time slots:", error);
        }
      } else {
        setAvailableTimeSlots(timeSlots);
      }
    };

    fetchOccupiedTimeSlots();
  }, [selectedDate]);

  // Función para validar la fecha (no permitir fechas pasadas)
  const isDateValid = (date: string): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDateObj = new Date(date);
    return selectedDateObj >= today;
  };

  // Función para manejar el cambio de fecha
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    setSelectedDate(date);
    setSelectedTime(""); // Resetear la hora al cambiar de fecha
  };

  // Obtener dirección IP del cliente para prevención de spam
  const getClientIp = async (): Promise<string> => {
    try {
      const response = await fetch("https://api.ipify.org?format=json");
      const data = await response.json();
      return data.ip;
    } catch (error) {
      console.error("Error getting client IP:", error);
      return "unknown";
    }
  };

  // Función para enviar los datos del formulario a Firebase
  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    if (isSubmitting) return; // Evitar múltiples envíos
    setErrorMessage("");

    // Validar que todos los campos estén completos
    const form = e.target as HTMLFormElement;
    const nombre = form.nombre.value;
    const apellido = form.apellido.value;
    const vehiculo = form.vehiculo.value;

    if (
      !nombre ||
      !apellido ||
      !contactNumber ||
      !vehiculo ||
      !selectedDate ||
      !selectedTime ||
      selectedServices.length === 0
    ) {
      setErrorMessage("Por favor complete todos los campos");
      return;
    }

    // Validar fecha
    if (!isDateValid(selectedDate)) {
      setErrorMessage(
        "La fecha seleccionada no es válida. Por favor seleccione una fecha futura."
      );
      return;
    }

    setIsSubmitting(true);

    try {
      // Obtener IP del cliente
      const ipAddress = await getClientIp();

      // Crear objeto de cita
      const appointmentData = {
        clientName: nombre,
        clientLastName: apellido,
        contactNumber,
        vehicle: vehiculo,
        appointmentDate: selectedDate,
        appointmentTime: selectedTime,
        services: selectedServices,
        status: "pending" as const,
      };

      // Enviar a Firebase
      await addAppointment(appointmentData, ipAddress);

      // Resetear formulario
      form.reset();
      setSelectedServices([]);
      setContactNumber("");
      setSelectedDate("");
      setSelectedTime("");
      setFormSubmitted(true);

      // Mostrar mensaje de éxito
      setTimeout(() => {
        alert(
          "¡Solicitud enviada con éxito! Nos pondremos en contacto contigo pronto para confirmar tu cita."
        );
        setFormSubmitted(false);
      }, 100);
    } catch (error: any) {
      console.error("Error al enviar la solicitud:", error);
      setErrorMessage(
        error.message ||
          "Hubo un error al enviar tu solicitud. Por favor intenta nuevamente."
      );
    } finally {
      setIsSubmitting(false);
    }
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
        modules={[Autoplay, Keyboard, EffectFade, Pagination]}
      >
        {heroSliderData.map((slider, i) => (
          <SwiperSlide key={i}>
            <HomeSliderContent slider={slider} />
          </SwiperSlide>
        ))}

        <div className="absolute z-10 bottom-0 left-0 right-0 w-full">
          <div className="bg-gradient-to-t from-black via-transparent to-transparent bg-opacity-65 rounded-lg p-6 text-black max-w-xl mx-auto">
            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
              >
                <strong className="font-bold">Error:</strong>
                <span className="block sm:inline"> {errorMessage}</span>
              </motion.div>
            )}

            {formSubmitted ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
              >
                <strong className="font-bold">¡Enviado con éxito!</strong>
                <span className="block sm:inline">
                  {" "}
                  Tu solicitud ha sido recibida. Nos pondremos en contacto
                  contigo pronto para confirmar tu cita.
                </span>
              </motion.div>
            ) : (
              <motion.form
                onSubmit={handleSubmit}
                initial="hidden"
                whileInView="visible"
                transition={{ duration: 0.8, delay: 0.8 }}
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
                    Número de contacto (WhatsApp)
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
                      min={new Date().toISOString().split("T")[0]} // No permitir fechas pasadas
                      value={selectedDate}
                      onChange={handleDateChange}
                      required
                    />
                    <label className="peer-focus:font-medium absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                      Fecha
                    </label>
                  </div>

                  <div className="relative z-0 w-full mb-5 group">
                    <select
                      name="hora"
                      id="floating_hora"
                      className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      required
                    >
                      <option value="" disabled>
                        Selecciona una hora
                      </option>
                      {availableTimeSlots.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                    <label className="peer-focus:font-medium absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                      Hora
                    </label>
                  </div>
                </div>

                <div className="relative z-0 w-full mb-5 group">
                  <Autocomplete
                    multiple
                    freeSolo
                    options={serviceOptions}
                    value={selectedServices}
                    onChange={(event, newValue) =>
                      setSelectedServices(newValue)
                    }
                    renderTags={(value) =>
                      value.map((option, index) => (
                        <Chip
                          key={index}
                          variant="outlined"
                          label={option}
                          deleteIcon={
                            <span
                              style={{
                                color: "white",
                                fontSize: "1em",
                              }}
                            >
                              ✕
                            </span>
                          }
                          sx={{
                            color: "white",
                            backgroundColor: "transparent",
                            borderColor: "white",
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
                              color: "white",
                            },
                            color: "white",
                          },
                        }}
                        sx={{
                          "& .MuiInputLabel-root": {
                            color: "white",
                          },
                          "& .MuiInputLabel-root.Mui-focused": {
                            color: "white",
                          },
                          "& .MuiInput-underline:before": {
                            borderBottomColor: "white",
                          },
                          "& .MuiInput-underline:hover:before": {
                            borderBottomColor: "white",
                          },
                          "& .MuiInput-underline.Mui-focused:before": {
                            borderBottomColor: "white",
                          },
                        }}
                      />
                    )}
                  />
                </div>

                {/* Notas para indicar que los horarios mostrados están disponibles */}
                {selectedDate && availableTimeSlots.length === 0 && (
                  <p className="text-sm text-white mb-4">
                    No hay horarios disponibles para la fecha seleccionada. Por
                    favor, seleccione otro día.
                  </p>
                )}

                {selectedDate && availableTimeSlots.length > 0 && (
                  <p className="text-sm text-white mb-4">
                    Los horarios mostrados están disponibles para reservar.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="text-base font-semibold text-white m-6 group relative w-max"
                >
                  <span>
                    {isSubmitting ? "Enviando..." : "Solicita tu lavado ahora"}
                  </span>
                  <span className="absolute -bottom-1 left-0 w-0 transition-all h-0.5 bg-indigo-600 group-hover:w-full"></span>
                </button>
              </motion.form>
            )}
          </div>
        </div>
      </Swiper>
    </div>
  );
};

export default LavadosFormulario;
