<template>
  <div>
    <div v-if="isAddNewPower" class="create-power-rate-pnl">
      <h3>Add New Power Rate</h3>
      <form @submit.prevent="onSubmit">
        <div>
          <input
            type="text"
            id="rate"
            class="w-100"
            name="rate"
            v-model="rate"
            placeholder="Power rate"
          />
        </div>
        <div class="float-right">
          <button
            type="button"
            class="btn btn-secondary mr-2"
            @click="toggleAddNewPowerRate()"
          >
            cancel
          </button>
          <button type="submit" class="btn btn-primary ">submit</button>
        </div>
      </form>
    </div>
    <div v-else class="row">
      <button
        type="button"
        class="btn btn-primary btn-add-new"
        @click="toggleAddNewPowerRate()"
      >
        Add New
      </button>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, toRefs, ref } from 'vue';
  import { usePowerRate } from '../../composable/usePowerRate';
  import { useToast } from 'primevue/usetoast';

  export default defineComponent({
    name: 'CreatePowerRate',
    setup() {
      const uPowerRate = usePowerRate();
      const toast = useToast();
      const isAddNewPower = ref<boolean>(false);
      const rate = ref<number>(0);

      const toggleAddNewPowerRate = () => {
        isAddNewPower.value = !isAddNewPower.value;
      };

      const onSubmit = async () => {
        if (rate.value <= 0) {
          toast.add({
            severity: 'error',
            summary: 'Error!',
            detail: 'Enter power rate.',
            life: 3000,
          });

          return;
        }

        await uPowerRate.storePowerRate(Number(rate.value)).then(() => {
          toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Successfully added!',
            life: 3000,
          });
        });
      };

      return {
        isAddNewPower,
        toggleAddNewPowerRate,
        rate,
        onSubmit,
      };
    },
  });
</script>
