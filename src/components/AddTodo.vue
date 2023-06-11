<template>
  <div class="row border w-50 rounded m-auto">
    <h3 class="mb-0 p-2">Add Item</h3>
    <hr class="mb-1" />
    <div class="col-12 d-flex justify-content-evenly">
      <div>
        <label for="content">Content</label>
        <input
          type="text"
          v-model="content"
          class="form-control my-2"
          placeholder="Add Todo"
        />
      </div>
      <div>
        <label for="dueDate">Due Date</label>
        <input type="date" v-model="dueDate" class="form-control my-2" />
      </div>
      <div>
        <label for="priority">Priority</label>
        <select class="form-control my-2" v-model="priority">
          <option value="3">High</option>
          <option value="2">Medium</option>
          <option value="1">Low</option>
        </select>
      </div>
      <div class="d-flex">
        <submit class="btn btn-primary align-self-end mb-2" @click="addTodo"
          >Add</submit
        >
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AddTodo",
  data() {
    return {
      user: {},
      content: "",
      dueDate: "",
      priority: "",
    };
  },
  methods: {
    getUserInfo() {
      axios({
        method: "get",
        url: "/users",
        withCredentials: true,
      })
        .then((res) => {
          this.user = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addTodo() {
      console.log(this.user.id);
      axios({
        method: "post",
        url: "/todos/create",
        data: {
          userID: this.user.id,
          content: this.content,
          dueDate: this.dueDate,
          priority: this.priority,
        },
        withCredentials: true,
      })
        .then((res) => {
          console.log(res);
          this.$emit("todoCreated");
          this.content = "";
          this.date = "";
          this.priority = 3;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getUserInfo();
  },
};
</script>
