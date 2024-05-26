import ApiManager from "../..";

export async function register(data) {
    try {
        const result = await ApiManager("/auth/register", {
            method: "POST",
            data: {
                email: data.mail,
                password: data.password,
                username: data.name
            },
        });
        return result;
    } catch (error) {
        throw new Error()
    }
}