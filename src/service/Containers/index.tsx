import ApiManager from "..";

export async function containers() {

    try {
        const result = await ApiManager("/containers", {
            method: "GET",
        });
        return result;
    } catch (error) {
        throw new Error()
    }
}