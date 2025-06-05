import { URL_ARYA_LOCAL_API } from "../../../constants";

export default class DroneController{
    async getDrones() {
        try {
            const response = await fetch(`${URL_ARYA_LOCAL_API}/drones`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("[DroneController - getDrones] Erro ao buscar drones:", error);
            throw error;
        }
    }

    async cadastrarDrone(droneData: any) {
        try {
            const response = await fetch(`${URL_ARYA_LOCAL_API}/drones`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(droneData),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("[DroneController - cadastrarDrone] Erro ao cadastrar drone:", error);
            throw error;
        }
    }
}