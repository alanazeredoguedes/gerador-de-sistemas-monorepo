<template>


  <div class="text-center mb-10">
    <h1 class="text-dark fw-bolder mb-3">Esqueceu a Senha ?</h1>
    <div class="text-gray-500 fw-semibold fs-6">Insira seu e-mail para redefinir sua senha.</div>
  </div>

  <div class="fv-plugins-message-container invalid-feedback" style="margin-bottom: 10px;">
  </div>

  <div class="fv-row mb-8">

    <input type="text" id="reset_password_email" name="reset_password[email]" required="required" placeholder="Email" class="form-control bg-transparent">
    <div class="fv-plugins-message-container invalid-feedback"></div>

  </div>

  <div class="d-flex flex-wrap justify-content-center pb-lg-0">
    <button type="submit" class="btn btn-primary me-4 form_sensd">
      <span class="indicator-label">Recuperar</span>
    </button>
    <RouterLink :to="{ name: 'login', params: {} }" class="btn btn-light">Cancelar</RouterLink>
  </div>


</template>