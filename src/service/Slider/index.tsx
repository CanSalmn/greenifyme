import ApiManager from "..";

export async function slider() {

    try {
        const result = await ApiManager("/image", {
            method: "GET",
        });
        return result;
    } catch (error) {
        console.log(error)
        return false;
    }
}