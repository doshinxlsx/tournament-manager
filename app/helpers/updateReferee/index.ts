import axios from "axios"

export const updateReferee = async (id: number, referee: string) => {
    try {
        const response = await axios.put(`/api/referee?id=${id}`, { referee });

        console.log(response.data);

        return response.data;
    } catch (error) {
        console.error(error);
    }
}