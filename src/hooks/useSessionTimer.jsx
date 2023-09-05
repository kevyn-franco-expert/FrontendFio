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
    let tiempoInicial = 5 * 60; // 5 minutos

    // Creamos una variable para el temporizador
    let temporizador;

    const SetCookie = (name, value) => {
      Cookies.set(name, value, {
        expires: 1,
      });
    };

    // Función para reiniciar el temporizador
    const reiniciarTemporizador = () => {
        clearInterval(temporizador);
        tiempoInicial = 5 * 60;
        iniciarTemporizador();
    }

    // Función para iniciar el temporizador
    const iniciarTemporizador = () => {
        temporizador = setInterval(() => {
            tiempoInicial--;
            if (tiempoInicial === 0) {
                clearInterval(temporizador);
                SetCookie('user-data', '')
                SetCookie('loggedIn', false);
                toast({
                    position:'bottom-right',
                    title: 'Se ha cerrado la sesión',
                    description: "Redireccionando a login...",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
                router.push('/login')
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
