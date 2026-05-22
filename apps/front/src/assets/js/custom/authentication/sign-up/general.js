"use strict";
var KTSignupGeneral = function() {
    var e, t, a, r, s = function() { return 100 === r.getScore() };
    return {
        init: function() {
            e = document.querySelector("#kt_sign_up_form"), t = document.querySelector("#kt_sign_up_submit"), r = KTPasswordMeter.getInstance(e.querySelector('[data-kt-password-meter="true"]')), a = FormValidation.formValidation(e, { fields: { "first-name": { validators: { notEmpty: { message: "O primeiro nome é necessário!" } } }, "last-name": { validators: { notEmpty: { message: "O sobrenome é necessário!" } } }, email: { validators: { regexp: { regexp: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "O valor não é um endereço de e-mail válido" }, notEmpty: { message: "É necessário um endereço de e-mail" } } }, password: { validators: { notEmpty: { message: "A senha é necessária" }, callback: { message: "Por favor, digite uma senha válida", callback: function(e) { if (e.value.length > 0) return s() } } } }, "confirm-password": { validators: { notEmpty: { message: "A confirmação da senha é necessária" }, identical: { compare: function() { return e.querySelector('[name="password"]').value }, message: "A senha e sua confirmação não são iguais" } } }, toc: { validators: { notEmpty: { message: "Você deve aceitar os Termos e Condições" } } } }, plugins: { trigger: new FormValidation.plugins.Trigger({ event: { password: !1 } }), bootstrap: new FormValidation.plugins.Bootstrap5({ rowSelector: ".fv-row", eleInvalidClass: "", eleValidClass: "" }) } }), t.addEventListener("click", (function(s) {
                s.preventDefault(), a.revalidateField("password"), a.validate().then((function(a) {
                    "Valid" == a ? (t.setAttribute("data-kt-indicator", "on"), t.disabled = !0, setTimeout((function() {
                        t.removeAttribute("data-kt-indicator"), t.disabled = !1, Swal.fire({ text: "Você redefiniu sua senha com sucesso!", icon: "success", buttonsStyling: !1, confirmButtonText: "OK, entendi!", customClass: { confirmButton: "btn btn-primary" } }).then((function(t) {
                            if (t.isConfirmed) {
                                e.reset(), r.reset();
                                var a = e.getAttribute("data-kt-redirect-url");
                                a && (location.href = a)
                            }
                        }))
                    }), 1500)) : Swal.fire({ text: "Desculpe, parece que alguns erros foram detectados. Tente novamente.", icon: "error", buttonsStyling: !1, confirmButtonText: "OK, entendi!", customClass: { confirmButton: "btn btn-primary" } })
                }))
            })), e.querySelector('input[name="password"]').addEventListener("input", (function() { this.value.length > 0 && a.updateFieldStatus("password", "NotValidated") }))
        }
    }
}();
KTUtil.onDOMContentLoaded((function() { KTSignupGeneral.init() }));