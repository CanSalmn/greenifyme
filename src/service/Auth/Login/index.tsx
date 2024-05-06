import ApiManager from "../..";
export async function login(data) {

    try {
        const result = await ApiManager("/auth/login", {
            method: "POST",
            data: {
                email: data.mail,
                password: data.password
            },
        });

        return result;
    } catch (error) {
        console.log(error)
        return false;
    }
}