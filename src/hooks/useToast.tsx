import { toast } from 'react-toastify';

export enum ToastType {
    DEFAULT = 'default',
    SUCCESS = 'success',
    INFO = 'info',
    WARNING = 'warning',
    ERROR = 'error',
}

interface IShowToast {
    title: string;
    description?: string;
    type?: ToastType
}

export const useToast = () => {
    const showToast = ({title, description, type = ToastType.DEFAULT}: IShowToast) => {
        let message = title;
        if(typeof description !== "undefined") message = message + `:${description}`

        switch (type) {
            case ToastType.SUCCESS:
                toast.success(message);
                break;
            case ToastType.ERROR:
                toast.error(message);
                break;
            case ToastType.WARNING:
                toast.warn(message);
                break;
            case ToastType.INFO:
                toast.info(message);
                break;
            default:
                toast(message);;
        }
    };

    return { showToast };
};
