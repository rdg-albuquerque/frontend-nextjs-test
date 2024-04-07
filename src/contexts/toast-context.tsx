import { IToastMessage } from "@/types/toast-message";
import { PropsWithChildren, createContext, useContext, useState } from "react";

type ToastContextValue = {
    messages: Array<IToastMessage>
    toast: (toastProps: Omit<IToastMessage, 'id'>) => void
    removeToast: (id: string) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

export const ToastProvider = ({ children }: PropsWithChildren) => {
    const [messages, setMessages] = useState<Array<IToastMessage>>([])
    const autoCloseDefaultDuration = 4000

    const toast = (toastProps: Omit<IToastMessage, 'id'>) => {
        const id = Date.now().toString()
        setMessages((prevState) => {
            return [
                ...prevState,
                {
                    id,
                    ...toastProps
                }
            ]
        })
        setTimeout(() => {
            removeToast(id)
        }, toastProps.duration || autoCloseDefaultDuration)
    }

    const removeToast = (id: string) => {
        setMessages((prevState) => {
            const newState = prevState.filter((message) => message.id !== id)
            return newState
        })
    }

    return (
        <ToastContext.Provider value={{
            messages,
            toast,
            removeToast,
        }}>
            {children}
        </ToastContext.Provider>
    )
}

export const useToast = (): ToastContextValue => {
    const context =  useContext(ToastContext)
    if (!context) {
        throw new Error('useToast must be used inside ToastProvider')
    }
    return context
}