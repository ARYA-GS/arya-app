import { URL_ARYA_LOCAL_API } from "../../../constants";
import axios from "axios";

export default class HubController {
    async getHubs() {
        try {
            const response = await axios.get(`${URL_ARYA_LOCAL_API}/hubs`);
            return response.data;
        } catch (error) {
            console.error("[HubController] Erro ao buscar hubs:", error);
            throw error;
        }
    }

    async getOpenMeteo(latitude: number, longitude: number) {
        try {
            const response = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
            console.log("[HubController] Dados do Open Meteo:", response.data);
            return response.data;
        } catch (error) {
            console.error("[HubController] Erro ao buscar dados do Open Meteo:", error);
            throw error;
        }
    }
}