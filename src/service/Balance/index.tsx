import ApiManager from "..";

export async function balance() {

    try {
        const result = await ApiManager("/balance", {
            method: "GET",
        });
        return result;
    } catch (error) {
        console.log(error)
        return false;
    }
}