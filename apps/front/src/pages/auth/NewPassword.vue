<template>
  <div class="text-center mb-10">
    <h1 class="text-dark fw-bolder mb-3">Configurar nova senha</h1>
  </div>

  <div class="fv-plugins-message-container invalid-feedback" style="margin-bottom: 10px;">

  </div>

  <div class="fv-row mb-8" >
    <input type="password" id="" name="new_password[password]" required="required" placeholder="Senha" class="form-control bg-transparent">
    <div class="fv-plugins-message-container invalid-feedback"></div>
  </div>

  <div class="fv-row mb-8">
    <input type="password" id="" name="new_password[passwordRepeat]" required="required" placeholder="Confirme a Senha" class="form-control bg-transparent">
    <div class="fv-plugins-message-container invalid-feedback"></div>
  </div>

  <div class="d-grid mb-10">
    <button type="button" class="btn btn-primary form_send">
      <span class="indicator-label">Enviar</span>
    </button>
  </div>

  <div class="text-gray-500 fw-semibold fs-6 text-center">Você já redefiniu a senha?
    <RouterLink :to="{ name: 'login', params: {} }" class="link-primary fw-bold">Entrar</RouterLink>

  </div>
</template>