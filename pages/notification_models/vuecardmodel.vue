<template>
  <v-card color="blue-grey darken-1"
        class="mt-4 col-6">
            <v-card-text
            elevation-0
            class="text-h6 text-center">
                Este modelo de notificaçao ainda se encontra em desenvolvimento!
            </v-card-text>

            <v-card-actions class="justify-center">
                <v-btn @click="$emit('UnChoosed')"
                color="amber darken-4"
                elevation="0">
                    CANCEL
                </v-btn>
            </v-card-actions>   
        </v-card>
</template>

<script>
export default {
    name:'VueNotificationCardModel'
}
</script>