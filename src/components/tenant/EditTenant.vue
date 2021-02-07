<template>
  <div class="edit-tenant-pnl">
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
</template>

<script lang="ts">
  import { UPDATE_TENANT } from '@/store/actions.type';
  import {
    defineComponent,
    computed,
    onMounted,
    reactive,
    toRefs,
    ref,
    watch,
  } from 'vue';
  import { useStore } from 'vuex';
  import { useToast } from 'primevue/usetoast';
  import { useTenant } from '../../composable/useTenant';

  export default defineComponent({
    name: 'EditTenant',
    props: {
      id: { type: Number, required: true },
    },
    setup(props) {
      const toast = useToast();
      const store = useStore();
      const uTenant = useTenant();
      const state = reactive({
        id: '',
        name: '',
        meterNumber: '',
        meterInitialReading: '',
      });
      const isCreateNewTenant = ref(false);

      const toggleCreateNewTenant = () => {
        isCreateNewTenant.value = !isCreateNewTenant.value;
      };

      const setFields = () => {
        const tenant = uTenant.getTenantById(Number(props.id));
        if (tenant) {
          state.id = tenant.id;
          state.name = tenant.name;
          state.meterNumber = tenant.meterNumber;
          state.meterInitialReading = tenant.meterInitialReading;
        }
      };

      onMounted(() => {
        setFields();
      });

      watch(props, () => {
        setFields();
      });

      const onSubmit = () => {
        if (
          state.name === '' ||
          state.meterNumber === '' ||
          state.meterInitialReading === ''
        ) {
          toast.add({
            severity: 'error',
            summary: 'Error!',
            detail: 'Please fill all the field.',
            life: 3000,
          });

          return;
        }

        store
          .dispatch(UPDATE_TENANT, {
            id: state.id,
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
          });
      };

      return {
        ...toRefs(state),
        onSubmit,
        toggleCreateNewTenant,
        isCreateNewTenant,
      };
    },
  });
</script>
