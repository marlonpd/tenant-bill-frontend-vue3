<template>
  <div class="container max-w-4xl mx-auto text-center pb-10">
    <div class="row m-auto">
      <h3>Tenants</h3>
      <div class="tenants-container">
        <div class="row m-auto">
          <DataTable :value="allTenants">
            <Column field="id" header="ID"></Column>
            <Column field="name" header="NAME">
              <template #body="slotProps">
                <router-link
                  :to="{
                    name: 'meter.readings',
                    params: { tenantId: slotProps.data.id },
                  }"
                >
                  {{ slotProps.data.name }}
                </router-link>
              </template>
            </Column>
            <Column field="meterNumber" header="METER NUMBER"></Column>
            <Column header="ACTIONS">
              <template #body="slotProps">
                <a href="#" @click="editTenant(slotProps.data)">edit</a> |
                <a href="#" @click="deleteTenant(slotProps.data)">delete</a>
              </template>
            </Column>
          </DataTable>

          <!-- <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Meter Number</th>
                <th scope="col">Previous Readings</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(tenant, index) in allTenants"
                :name="tenant"
                :key="index"
              >
                <th scope="row">{{ index + 1 }}</th>
                <td>
                  <router-link to="/tenants">
                    {{ tenant.name }}
                  </router-link>
                </td>
                <td>{{ tenant.meterNumber }}</td>
              <td>
                  Previous Reading Date:
                  {{ tenant.meterReadings.previousReadingDate }}<br />
                  Previous Reading: {{ tenant.meterReadings.previousReading
                  }}<br />
                  Previous Consumed Kwh: {{ tenant.meterReadings.consumedKwh }}
                </td> 
                <td>
                <span class="actions"
                    ><font-awesome-icon
                      class="clickable"
                      :icon="['fa', 'trash']"
                      @click="deleteTenant(tenant.id)"/>
                    <font-awesome-icon :icon="['fa', 'pencil-alt']"
                  /></span> 
                </td>
              </tr>
            </tbody>
          </table> -->
        </div>
      </div>
      <div>
        <button
          @click="loadMore()"
          v-if="!isAllTenantsFetch && !isLoading"
          class="block w-full bg-blue-600 text-white rounded-sm py-3 text-sm tracking-wide"
        >
          Load More
        </button>
        <button
          v-if="!isAllTenantsFetch && isLoading"
          class="block w-full bg-blue-600 text-white rounded-sm py-3 text-sm tracking-wide"
        >
          <i class="pi pi-spin pi-spinner" style="fontSize: 2rem"></i>
        </button>
      </div>
    </div>
    <div class="fixed-bottom w-100" style="width:100%;">
      <div class="container">
        <transition name="fade">
          <CreateTenant v-if="!isEditTenant"></CreateTenant>
        </transition>
        <transition name="fade">
          <EditTenant v-if="isEditTenant" :id="selectedTenantId"></EditTenant>
        </transition>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { onMounted, defineComponent, ref, reactive } from 'vue';
  import { useTenant } from '../composable/useTenant';
  import CreateTenant from '../components/tenant/CreateTenant.vue';
  import EditTenant from '../components/tenant/EditTenant.vue';
  import { useConfirm } from 'primevue/useconfirm';

  export default defineComponent({
    name: 'TenantsPage',
    components: { CreateTenant, EditTenant },
    async setup() {
      const uTenant = useTenant();
      const selectedTenantId = ref<number>(0);
      const isEditTenant = ref<boolean>(false);
      const confirm = useConfirm();
      let pageIndex = 1;
      const isLoading = ref(false);

      const isAllTenantsFetch = uTenant.isAllTenantsFetch;
      onMounted(async () => {
        isLoading.value = true;
        await uTenant.fetchLimitedTenants(pageIndex++);
        isLoading.value = false;
      });

      const editTenant = async (tenant: Tenant) => {
        selectedTenantId.value = Number(tenant.id);
        isEditTenant.value = true;
      };

      const confirmDeleteTenant = async () => {
        await uTenant.deleteTenant(selectedTenantId.value);
      };

      const deleteTenant = async (tenant: Tenant) => {
        selectedTenantId.value = Number(tenant.id);
        confirm.require({
          message: 'Are you sure you want to delete?',
          header: 'Confirmation',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            confirmDeleteTenant();
          },
          reject: () => {
            console.log('rejected');
          },
        });
      };

      const loadMore = async () => {
        isLoading.value = true;
        await uTenant.fetchLimitedTenants(pageIndex++);
        isLoading.value = false;
      };

      return {
        allTenants: uTenant.allTenants,
        deleteTenant,
        selectedTenantId,
        editTenant,
        isEditTenant,
        loadMore,
        isAllTenantsFetch,
        isLoading,
      };
    },
  });
</script>

<style lang="scss" scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
