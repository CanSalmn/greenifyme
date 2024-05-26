import ApiManager from "..";

export async function material() {

    try {
        const result = await ApiManager("/material", {
            method: "GET",
        });
        return result;
    } catch (error) {
        console.log(error)
        return false;
    }
}