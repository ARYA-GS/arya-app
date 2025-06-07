import { URL_ARYA_LOCAL_API } from "../../../constants";
import axios from "axios";

export default class DroneController {
    async getDrones() {
        try {
            const response = await axios.get(`${URL_ARYA_LOCAL_API}/drones`);
            return response.data;
        } catch (error: any) {
            console.error("[DroneController - getDrones] Erro ao buscar drones:", error);
            throw error;
        }
    }

    async cadastrarDrone(droneData: any) {
        try {
            const response = await axios.post(`${URL_ARYA_LOCAL_API}/drones`, droneData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
        } catch (error: any) {
            console.error("[DroneController - cadastrarDrone] Erro ao cadastrar drone:", error);
            throw error;
        }
    }
}
