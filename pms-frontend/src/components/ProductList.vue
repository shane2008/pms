<template>
  <div class="list row">
    <div>
      <div class="input-group mb-3">
        <input type="text" class="form-control col-3" placeholder="Product Name"
          v-model="name"
          v-on:keyup="filterProducts"
          v-on:change="filterProducts"/>
        <div class="input-group-append mr-2">
          <button class="btn btn-outline-secondary" type="button"
            @click="name=''">
            Clear
          </button>
        </div>
        <select class="form-control" v-model="departmentId" v-on:change="filterProducts">
          <option value="">All Departments</option>
          <option v-for="(dept, index) in departments" :value="dept.id" :key="index">
            {{dept.name}}
          </option>
        </select>
        <div class="input-group-append mr-2">
          <button class="btn btn-outline-secondary" type="button"
            @click="departmentId=''">
            Clear
          </button>
        </div>
        <input type="text" class="form-control col-3" placeholder="Promo Code"
          v-model="promoCode"
          v-on:keyup="filterProducts"
          v-on:change="filterProducts"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
            @click="promoCode=''">
            Clear
          </button>
        </div>
      </div>
    </div>

    <table class="table table-striped table-hover table-sm">
      <thead class="thead-dark">
        <tr>
          <th scope="col" class="first-cell">Product Name</th>
          <th scope="col">Price($)</th>
          <th scope="col">Promo Code</th>
          <th scope="col">Promo Price($)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in paginatedProducts"
          :key="index">
          <td class="first-cell">{{ product.name }}</td>
          <td>{{ product.price }}</td>
          <td>{{ product.promoCode }}</td>
          <td>{{ product.promoPrice }}</td>
        </tr>
      </tbody>
    </table>

    <div>
      <span>
        {{products.length}} products 
      </span>
      <span v-if = "pageCount > 1">
        (page {{pageNumber + 1}} of {{pageCount}})
      </span>
      <button v-if = "pageCount > 1" @click="prevPage" :disabled = "pageNumber === 0">
        Prev
      </button>
      <button v-if = "pageCount > 1" @click="nextPage" :disabled = "pageNumber >= pageCount - 1">
        Next
      </button>
    </div>
    
  </div>
</template>

<script>
  import DataService from "../services/DataService";
  export default {
    name: "ProductList",
    props: {
      pageSize: {
        type: Number,
        required: false,
        default: 10
      }
    },

    data() {
      return {
        paginatedProducts: [],
        products: [],
        departments: [],
        name: "",
        promoCode: "",
        departmentId: "",
        pageNumber: 0,
        pageCount: 0
      };
    },

    methods: {
      filterProducts() {
        DataService.filterProducts({
          name: this.name,
          promoCode: this.promoCode,
          departmentId: this.departmentId
        }).then(res => {
            this.products = res.data;
            this.updatePaginationInfo();
            this.paginateProducts();
          })
          .catch(e => {
            console.log(e);
          });
      },

      loadDepartments() {
        DataService.getAllDepartments()
          .then(res => {
            this.departments = res.data;
          }).catch(e => {
            console.log(e);
          });
      },

      paginateProducts() {
        const start = this.pageNumber * this.pageSize,
              end = start + this.pageSize;
        this.paginatedProducts = this.products.slice(start, end);
      },

      updatePaginationInfo() {
        const l = this.products.length,
              s = this.pageSize;
        this.pageCount = Math.ceil(l/s);
        this.pageNumber = 0;
      },

      nextPage() {
         this.pageNumber++;
      },

      prevPage() {
        this.pageNumber--;
      }

    },

    // this would trigger change event when name is changed programatically
    watch: {
      name: function() {
        this.filterProducts();
      },
      promoCode: function() {
        this.filterProducts();
      },
      departmentId: function() {
        this.filterProducts();
      },
      pageNumber: function() {
        this.paginateProducts();
      }
    },

    mounted() {
      this.filterProducts();
      this.loadDepartments();
    }
  };
</script>

<style>
  .list {
    text-align: left;
    font-size: 14px;
    max-width: 750px;
    margin: auto;
  }
  table {
    border: solid 1px;
  }
  td.first-cell {
    padding-left: 8px;
  }
</style>