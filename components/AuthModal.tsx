"use client"

import { useSupabaseClient, useSessionContext } from "@supabase/auth-helpers-react"
import { useRouter } from "next/navigation"
import { Auth } from "@supabase/auth-ui-react"

import Modal from "./Modal"
import { ThemeSupa } from "@supabase/auth-ui-shared"
import useAuthModal from "@/hooks/useAuthModal"
import { useEffect } from "react"

const AuthModal = () => {
    const supabaseClient = useSupabaseClient()
    const router = useRouter();
    const { session } = useSessionContext();
    const {onClose, isOpen} = useAuthModal();

    useEffect(()=>{
        if(session){
            router.refresh();;
            onClose();
        }
    }, [session, router, onClose]);

    const onChange = (open : boolean) => {
        if(!open) onClose();
    }

    return (
        <Modal title="Welcome back" isOpen={isOpen} onChange={onChange} description='Login to your account'>

            <Auth 
                theme="dark"
                magicLink
                providers={['github']}
                supabaseClient={supabaseClient} appearance={{
                theme: ThemeSupa,
                variables: {
                    default: {
                        colors: {
                            brand: '#404040',
                            brandAccent: '#22c55e'
                        }
                    }
                }
            }} />
        </Modal>
    );
}

export default AuthModal;