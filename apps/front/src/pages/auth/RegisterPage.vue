<template>
  <form class="form w-100" @submit.prevent="register()">

    <div class="text-center mb-11">
      <h1 class="text-dark fw-bolder mb-3">Inscrever-se</h1>
    </div>

    <div class="separator separator-content my-14">
      <span class="w-125px text-gray-500 fw-semibold fs-7">Entrar com Email</span>
    </div>

    <div class="fv-row mb-8">
      <input type="text" id="username" name="username" required autofocus v-model="user.username" placeholder="Nome de Usuário" class="form-control bg-transparent">
      <div class="fv-plugins-message-container invalid-feedback"></div>
    </div>

    <div class="fv-row mb-8">
      <input type="email" id="email" name="email" required autofocus v-model="user.email" placeholder="Email" class="form-control bg-transparent">
      <div class="fv-plugins-message-container invalid-feedback"></div>
    </div>

    <div class="fv-row mb-3">
      <input type="password" id="password" name="password" required v-model="user.password" placeholder="Senha" class="form-control bg-transparent">
      <div class="fv-plugins-message-container invalid-feedback"></div>
    </div>


    <div class="fv-row mb-8">
      <label class="form-check form-check-inline">
        <input type="checkbox" id="client_register_terms" name="client_register[terms]" required="required" placeholder="Termos" class="form-check-input" value="1">
        <span class="form-check-label fw-semibold text-gray-700 fs-base ms-1">Eu li e aceito os
              <RouterLink :to="{ name: 'terms', params: {} }" target="_blank" class="link-primary fw-semibold">Termos de Uso</RouterLink>
          </span>
      </label>

      <div class="fv-plugins-message-container invalid-feedback"></div>

    </div>

    <div class="d-grid mb-10">
      <button type="submit" class="btn btn-primary form_send">
        <span class="indicator-label">Inscrever-se</span>
      </button>
    </div>

    <div class="text-gray-500 text-center fw-semibold fs-6">Já possui uma conta?
      <RouterLink :to="{ name: 'login', params: {} }" class="link-primary fw-semibold">Entrar</RouterLink>

    </div>

  </form>
</template>

<script>

import { mapActions, mapState } from 'vuex'
export default {
  components: { },
  data() {
    return {
      user:{
        username: '',
        email: '',
        password: '',
      },
    }
  },
  computed:{

  },
  methods: {
    register(){
      if(!this.user.username || !this.user.email || !this.user.password){
        this.$functions.alerts.notification('error', "Preencha os campos!", 'Preencha todos os campos antes de continuar')
        return
      }


      this.$store.dispatch('createUser', this.user)
          .then( (response) => {

            this.$functions.alerts.modalAlert('success', "Registro Efetuado", 'Registro efetuado com sucesso, faça login para continuar!', 4000)

            this.$router.push({ name: 'login' })

          })
          .catch((error) => {

            //console.log(error)
            if (error.response) {
              this.$functions.alerts.notification('error', "Falha no Registro!", error.response.data.message, 5000)
            }else{
              this.$functions.alerts.notification('error', "Falha no Registro!", "Aconteceu uma falha ao tentar realizar o registro, tente novamente em outro momento!", 5000)
            }

          })
    }

  }

}
</script>