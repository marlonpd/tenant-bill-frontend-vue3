<template>
  <div class="container max-w-4xl mx-auto text-center pb-10">
    <h3>Meter Reading</h3>
    <h5>{{ currentTenant.name }}</h5>
    <div class="row m-auto">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Cover Period</th>
            <th scope="col">Readings</th>
            <th scope="col">Consumed Kwh</th>
            <th scope="col">Rate</th>
            <th scope="col">Bill</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(reading, index) in allMeterReadings.slice(0, 10)"
            :name="reading"
            :key="index"
          >
            <th scope="row">{{ index + 1 }}</th>
            <th scope="col">
              From: {{ reading.fromDate }}<br />
              To : {{ reading.toDate }}
            </th>
            <th scope="col">
              {{ reading.previousReadingKwh }}<br />
              {{ reading.presentReadingKwh }}
            </th>
            <th scope="col">{{ reading.consumedKwh }}</th>
            <th scope="col">{{ reading.rate }}</th>
            <th scope="col">{{ reading.bill }}</th>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="fixed-bottom w-100" style="width:100%;">
      <div class="container">
        <CreateMeterReading></CreateMeterReading>
      </div>
    </div>
    -
  </div>
</template>

<script lang="ts">
  import { onMounted, defineComponent, ref, reactive } from 'vue';
  import { useMeterReading } from '../composable/useMeterReading';
  import { useTenant } from '../composable/useTenant';
  import { useRoute } from 'vue-router';
  import { useConfirm } from 'primevue/useconfirm';
  import { routerPush } from '../router';
  import { useToast } from 'primevue/usetoast';
  import CreateMeterReading from '../components/meterReading/CreateMeterReading.vue';

  export default defineComponent({
    name: 'MeterReadingsPage',
    components: { CreateMeterReading },
    async setup() {
      const uMeterReading = useMeterReading();
      const route = useRoute();
      const uTenant = useTenant();
      const selectedTenantId = ref(0);
      const confirm = useConfirm();
      const toast = useToast();

      let currentTenant = reactive<Tenant>({
        id: undefined,
        name: '',
        meterNumber: '',
        meterInitialReading: 0,
      });

      onMounted(async () => {
        if (!route.params.tenantId) {
          toast.add({
            severity: 'error',
            summary: 'Error encountered',
            detail: 'Invalid tenant id',
            life: 3000,
          });

          await routerPush('tenants');
        }

        selectedTenantId.value = Number(route.params.tenantId);
        currentTenant = uTenant.getTenantById(Number(route.params.tenantId));
        await uMeterReading.fetchMeterReading(Number(route.params.tenantId));
      });

      const confirmDeleteMeterReading = async () => {
        await uMeterReading.deleteMeterReading(selectedTenantId.value);
      };

      const deleteMeterReading = async (tenant: Tenant) => {
        selectedTenantId.value = Number(tenant.id);

        confirm.require({
          message: 'Are you sure you want to delete?',
          header: 'Confirmation',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            confirmDeleteMeterReading();
          },
          reject: () => {
            console.log('rejected');
          },
        });
      };

      return {
        allMeterReadings: uMeterReading.allMeterReadings,
        deleteMeterReading,
        latestReading: uMeterReading.latestReading,
        currentTenant,
      };
    },
  });
</script>
