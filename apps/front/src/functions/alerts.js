import Swal from "sweetalert2";

export const alerts = {

    notification: (ico, title, message, timer = 2000) => {
        return Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: timer,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        }).fire({
            icon: ( (ico) ? ico: 'success' ),
            title: title,
            html: message,
        })
    },
    modalAlert(ico, title, message = '', timer = 3000, position){
        Swal.fire({
            title: ( (title) ? title: 'success' ),
            html: ( (message) ? message: 'success' ),
            icon: ( (ico) ? ico: 'success' ),
            position: ( (position) ? position: 'center' ),
            showConfirmButton: false,
            timerProgressBar: true,
            timer: timer,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
    },
    modalConfirm: (title, text, callbackConfirm = ()=>{}, callbackCancel = ()=>{} )=>{
        Swal.fire({
            title: title,
            html: text,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não'

        }).then((result) => {
            if (result.isConfirmed) {
                callbackConfirm()
            }else{
                callbackCancel()
            }
        })
    }



}