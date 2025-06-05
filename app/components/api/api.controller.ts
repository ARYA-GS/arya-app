export default class ApiController {
    async getOpenMeteo(latitude: number, longitude: number) {
        try {
            const response = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
            return response.data;
        } catch (error) {
            console.error("[ApiController] Erro ao buscar dados do Open Meteo:", error);
            throw error;
        }
    }
}