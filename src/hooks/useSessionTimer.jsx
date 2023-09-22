import {
    useToast,
  } from "@chakra-ui/react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
const useSessionTimer = () => {
    const router = useRouter();
    const toast = useToast();
    const sessionTimer = () => {
    // Establecemos el tiempo inicial en segundos
    let tiempoInicial = 1 * 60; // 1 minuto

    // Creamos una variable para el temporizador
    let temporizador;

    // Función para reiniciar el temporizador
    const reiniciarTemporizador = () => {
        clearInterval(temporizador);
        tiempoInicial = 1 * 60;
        iniciarTemporizador();
    }

    // Función para iniciar el temporizador
    const iniciarTemporizador = () => {
        temporizador = setInterval(() => {
            tiempoInicial--;
            console.log(tiempoInicial)
            if (tiempoInicial === 0) {
                clearInterval(temporizador);
                Cookies.remove("loggedIn");
                Cookies.remove("origin");
                Cookies.remove("token");
                Cookies.remove("account");
                Cookies.remove("client");
                Cookies.remove("user-data");
                toast({
                    position:'bottom-right',
                    title: 'Se ha cerrado la sesión',
                    description: "Redireccionando a login...",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
                router.push('/login')
                // window.location.href = "/login"
            }
        }, 1000);
    }

    // Iniciar el temporizador cuando se carga la página
    iniciarTemporizador();

    // Detectar eventos de mousemove y keydown
    if (typeof document !== 'undefined') {
        document.addEventListener('mousemove', reiniciarTemporizador);
        document.addEventListener('keydown', reiniciarTemporizador);
    }
    }

    return {sessionTimer};
  }
export default useSessionTimer;
