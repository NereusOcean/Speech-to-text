import MakeRequest from "../MakeRequest";

export const post = async (file: any) => {
    return MakeRequest({
        url: "/upload",
        method: "POST",
        data: {
            file,
        },
    });
};
