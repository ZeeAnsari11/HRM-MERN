const config = {
    position: "bottom-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
}

export function toastMessage(type, Message, toast) {
    switch (type) {
        case "success":
            toast.success(Message, config);
            break;
        case "error":
            toast.error(Message, config);
            break;
        default:
            break;
    }
}