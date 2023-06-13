<template>
  <div class="container">
    <div class="row d-flex flex-column">
      <div class="col-12 mb-3">
        <h1 class="text-center">TODO Items</h1>
        <AddTodo
          v-if="formVisible"
          @todoCreated="
            getTodoItems();
            showAddForm();
          "
        />
      </div>

      <div class="row w-75 m-auto align-center px-0 mb-1">
        <div class="col-12 px-0">
          <button class="btn btn-primary float-end" @click="showAddForm">
            Add Task
          </button>
        </div>
      </div>
      <div class="row w-75 m-auto align-center border rounded">
        <div class="row px-2 py-1">
          <div class="col-1 px-0"><p class="mb-0"></p></div>
          <div class="col-5">
            <p class="mb-0 fw-bold">Task</p>
            <hr class="m-0" />
          </div>
          <div class="col-3">
            <p class="mb-0 fw-bold">Due Date</p>
            <hr class="m-0" />
          </div>
          <div class="col-2">
            <p class="mb-0 fw-bold">Priority</p>
            <hr class="m-0" />
          </div>
          <div class="col-1 px-0"><p class="mb-0"></p></div>
        </div>
        <ToDoItem
          v-for="todo in todos"
          :todo="todo"
          @deleteTodo="getTodoItems"
          @toggle-complete="getTodoItems"
        />
      </div>
    </div>
  </div>
</template>

<script>
import router from "../router";
import axios from "axios";
import ToDoItem from "../components/TodoItem.vue";
import AddTodo from "../components/AddTodo.vue";

export default {
  name: "Home",
  components: {
    ToDoItem,
    AddTodo,
  },
  computed: {
    isLoggedIn: function () {
      return this.$store.state.loggedIn;
    },
  },
  data() {
    return {
      user: {},
      todos: [],
      formVisible: false,
    };
  },
  methods: {
    toggleLoggedIn: function (value) {
      this.$store.commit("toggleLoggedIn", value);
    },
    checkLogin() {
      try {
        this.getUserData();
        this.getTodoItems();
      } catch (error) {
        console.log(error);
        router.push("/login");
      }
    },
    getUserData: function () {
      let self = this;
      axios({
        method: "get",
        url: "/users",
        withCredentials: true,
      })
        .then((response) => {
          self.user = response.data;
          self.toggleLoggedIn(true);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getTodoItems: function () {
      let self = this;
      axios({
        method: "get",
        url: "/todos",
        data: {
          id: this.user.id,
        },
        withCredentials: true,
      })
        .then(function (response) {
          self.todos = response.data.todos;

          // Sort todos by dueDate then by priority (high to low)
          self.todos.sort((a, b) => {
            if (a.dueDate < b.dueDate) {
              return -1;
            } else if (a.dueDate > b.dueDate) {
              return 1;
            } else {
              if (a.priority < b.priority) {
                return 1;
              } else if (a.priority > b.priority) {
                return -1;
              } else {
                return 0;
              }
            }
          });

          console.log(self.todos);
          // Change priority from 1, 2, 3 to High, Medium, Low
          self.todos.forEach((todo) => {
            if (todo.priority === 1) {
              todo.priority = "Low";
            } else if (todo.priority === 2) {
              todo.priority = "Medium";
            } else if (todo.priority === 3) {
              todo.priority = "High";
            }
          });

          console.log(self.todos);
        })
        .catch((errors) => {
          console.log(errors);
        });
    },
    showAddForm: function () {
      this.formVisible = !this.formVisible;
    },
  },
  mounted() {
    this.checkLogin();
    this.getTodoItems();
  },
};
</script>

<style scoped></style>
