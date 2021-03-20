<template>
  <div>
    <div v-if="showHideForm" class="create-meter-reading-pnl">
      {{ latestPowerRate }}
      <h3>Add New Meter Reading</h3>
      <div class="row">
        <div class="col-md-12 mx-auto">
          <form @submit.prevent="onSubmit">
            <div class="form-group row">
              <div class="col-sm-8">
                <label for="previousReadingDate">Previous Reading Date</label>
                <Calendar
                  v-model="fromDate"
                  value="12-02-2020"
                  placeholder="Enter reading"
                  readonly
                />
              </div>
              <div class="col-sm-4">
                <label for="previousReading">Previous Reading</label>
                <input
                  type="text"
                  class="form-control"
                  id="previousReading"
                  v-model="previousReadingKwh"
                  placeholder="Enter reading"
                />
              </div>
            </div>
            <div class="form-group row">
              <div class="col-sm-8">
                <label for="currentReadingDate">Current Reading Date</label>
                <Calendar v-model="toDate" />
              </div>
              <div class="col-sm-4">
                <label for="currentReading">Current Reading</label>
                <input
                  type="text"
                  class="form-control"
                  id="currentReading"
                  v-model="presentReadingKwh"
                  placeholder="Enter reading"
                />
              </div>
            </div>

            <div class="form-group row">
              <div class="col-sm-8"></div>
              <div class="col-sm-4">
                <label for="ratePerKwh">Kwh Rate</label>
                <input
                  type="text"
                  class="form-control"
                  id="ratePerKwh"
                  v-model="latestPowerRate"
                  placeholder="Enter rate"
                />
              </div>
            </div>

            <div class="form-group row">
              <div class="col-sm-8"></div>
              <div class="col-sm-4">
                <label for="consumedKwh">Kwh Consumed</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="consumedK"
                  id="consumedKwh"
                />
              </div>
            </div>

            <div class="form-group row">
              <div class="col-sm-8"></div>
              <div class="col-sm-4">
                <label for="totalBill">Current Bill</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="currentBill"
                  id="totalBill"
                />
              </div>
            </div>
            <div class="form-group row">
              <div class="col-sm-8"></div>
              <div class="col-sm-4 text-right">
                <button
                  type="button"
                  class="btn btn-secondary mr-2"
                  @click="toggleShowHideForm()"
                >
                  Cancel
                </button>
                <button type="submit" class="btn btn-primary px-4">Save</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="clearfix"></div>
    </div>
    <div v-else>
      <button
        type="button"
        class="btn btn-primary btn-add-new"
        @click="toggleShowHideForm()"
      >
        Add New
      </button>
    </div>
  </div>
</template>

<script lang="ts">
  import {
    defineComponent,
    reactive,
    toRefs,
    ref,
    onMounted,
    computed,
  } from 'vue';
  import { usePowerRate } from '../../composable/usePowerRate';
  import { useMeterReading } from '../../composable/useMeterReading';
  import { useTenant } from '../../composable/useTenant';
  import { useToast } from 'primevue/usetoast';
  import { useRoute } from 'vue-router';

  export default defineComponent({
    name: 'CreateMeterReading',
    setup() {
      const uPowerRate = usePowerRate();
      const uTenant = useTenant();
      const uMeterReading = useMeterReading();
      const router = useRoute();
      const toast = useToast();
      const isAddNewPower = ref<boolean>(false);
      const latestPowerRate = ref<number>(0);
      const showHideForm = ref<boolean>(false);
      const currentReadingDate = ref<string>('');
      const currentReading = ref<number>(0);
      let currentTenant: Tenant = {
        id: undefined,
        name: '',
        meterNumber: '',
        meterInitialReading: 0,
      };

      const newReading = reactive<MeterReading>({
        tenantId: Number(router.params.tenantId),
        fromDate: '',
        presentReadingKwh: 0,
        toDate: '',
        previousReadingKwh: 0,
        consumedKwh: 0,
        rate: 0,
        bill: 0,
      });

      const consumedK = computed(
        () => newReading.presentReadingKwh - newReading.previousReadingKwh
      );

      const currentBill = computed(
        () => consumedK.value * latestPowerRate.value
      );

      onMounted(async () => {
        await uPowerRate.fetchPowerRates();
        latestPowerRate.value = uPowerRate.latestPowerRate.value.rate;
        const tenantId = Number(router.params.tenantId);
        currentTenant = uTenant.getTenantById(tenantId);
      });

      const toggleAddNewPowerRate = () => {
        isAddNewPower.value = !isAddNewPower.value;
      };

      function toggleShowHideForm() {
        showHideForm.value = !showHideForm.value;

        currentReadingDate.value = '';
        currentReading.value = 0;

        if (
          showHideForm.value &&
          uMeterReading.latestReading.value !== undefined
        ) {
          newReading.fromDate = uMeterReading.latestReading.value?.toDate;
          newReading.previousReadingKwh =
            uMeterReading.latestReading.value?.presentReadingKwh;
          // newReading.rate = uMeterReading.latestReading.value.rate;

          return;
        }

        // if (showHideForm.value && currentTenant !== null) {
        //   this.previousReadingDate = currentTenant.;
        //   this.previousReading = currentTenant.meterInitialReading;
        //   this.ratePerKwh = ;
        // }
      }

      const onSubmit = async () => {
        // if (rate.value <= 0) {
        //   toast.add({
        //     severity: 'error',
        //     summary: 'Error!',
        //     detail: 'Enter power rate.',
        //     life: 3000,
        //   });

        //   return;
        // }

        //console.log(currentTenant.id);
        newReading.consumedKwh = consumedK.value;
        newReading.bill = currentBill.value;
        newReading.rate = latestPowerRate.value;
        await uMeterReading
          .storeMeterReading(newReading)
          .then(() => {
            toggleShowHideForm();
            toast.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Successfully added!',
              life: 3000,
            });
          })
          .catch((e) => {
            console.log(e);
            toast.add({
              severity: 'error',
              summary: 'Error',
              detail: e.message,
              life: 3000,
            });
          });
      };

      return {
        isAddNewPower,
        toggleAddNewPowerRate,
        onSubmit,
        consumedK,
        latestPowerRate,
        toggleShowHideForm,
        showHideForm,
        currentBill,
        ...toRefs(newReading),
      };
    },
  });
</script>
