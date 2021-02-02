<template>
  <div v-if="isCreateNewTenant" class="create-tenant-pnl">
    <h3>Create New Tenant</h3>
    <div class="row">
      <div class="col-md-12 mx-auto">
        <form @submit.prevent="onSubmit">
          <div class="form-group row">
            <div class="col-sm-4">
              <label for="inputFirstname">Tenant name</label>
              <input
                type="text"
                class="form-control"
                id="name"
                v-model="name"
                placeholder="Enter name"
              />
            </div>
            <div class="col-sm-4">
              <label for="inputLastname">Meter Number</label>
              <input
                type="text"
                class="form-control"
                id="meterNumber"
                v-model="meterNumber"
                placeholder="Enter meter number"
              />
            </div>
            <div class="col-sm-4">
              <label for="inputLastname">Meter Initial Reading</label>
              <input
                type="text"
                class="form-control"
                id="meterInitialReading"
                v-model="meterInitialReading"
                placeholder="Enter meter initial reading"
              />
            </div>
          </div>

          <div class="form-group row">
            <div class="col-sm-8"></div>
            <div class="col-sm-4 text-right">
              <button
                type="button"
                class="btn btn-secondary mr-2"
                @click="toggleCreateNewTenant()"
              >
                cancel
              </button>
              <button type="submit" class="btn btn-primary ">submit</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  <div v-else>
    <button
      type="button"
      class="btn btn-primary btn-add-new"
      @click="toggleCreateNewTenant()"
    >
      Add New
    </button>
  </div>
</template>

<script lang="ts">
  import { ADD_NEW_TENANT } from '@/store/actions.type';
  import { defineComponent, reactive, toRefs, ref } from 'vue';
  import { useStore } from 'vuex';
  import { useToast } from 'primevue/usetoast';

  export default defineComponent({
    name: 'CreateTenant',
    setup() {
      const toast = useToast();
      const state = reactive({
        name: '',
        meterNumber: '',
        meterInitialReading: '',
      });

      const isCreateNewTenant = ref(false);
      const store = useStore();

      const toggleCreateNewTenant = () => {
        isCreateNewTenant.value = !isCreateNewTenant.value;
      };

      const onSubmit = () => {
        if (
          state.name === '' ||
          state.meterNumber === '' ||
          state.meterInitialReading === ''
        ) {
          // this.flashMessage.show({
          //     status: 'error',
          //     title: 'Error!',
          //     message: 'Please fill all the field.'
          // });

          return;
        }

        store
          .dispatch(ADD_NEW_TENANT, {
            name: state.name,
            meterNumber: state.meterNumber,
            meterInitialReading: state.meterInitialReading,
          })
          .then((response) => {
            toggleCreateNewTenant();
            toast.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Successfully added!',
              life: 3000,
            });
            // this.flashMessage.show({
            //     status: 'success',
            //     title: 'Success!',
            // //    message: response.message
            // })
          });
      };

      return {
        ...toRefs(state),
        onSubmit,
        toggleCreateNewTenant,
        isCreateNewTenant,
      };
    },
    // },
    // computed: {

    // },
  });
</script>
