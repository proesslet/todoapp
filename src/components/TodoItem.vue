<template>
  <div class="row border-bottom p-2">
    <div id="todoCheck" class="col-1">
      <input
        type="checkbox"
        class="mx-2"
        v-model="checked"
        @click="toggleComplete"
      />
    </div>
    <div class="col-5 todoContent">
      <span>{{ todo.content }}</span>
    </div>
    <div class="col-3 todoContent">
      <span>{{ dueDate }}</span>
    </div>
    <div class="col-2 todoContent">
      <span>{{ priority }}</span>
    </div>
    <div class="col-1">
      <button class="btn btn-danger btn-sm float-right" @click="deleteTodo">
        Delete
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ToDoItem",
  props: {
    todo: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      checked: this.todo.complete,
      // convert date time to date
      dueDate: "",
      priority: "",
    };
  },
  methods: {
    getDueDate: function () {
      if (this.todo.dueDate) {
        let date = new Date(this.todo.dueDate);
        this.dueDate = date.toDateString().slice(4);
      }
    },
    getPriority: function () {
      if (this.todo.priority === 3) {
        this.priority = "High";
      } else if (this.todo.priority === 2) {
        this.priority = "Medium";
      } else {
        this.priority = "Low";
      }
    },
    toggleComplete: function () {
      // Put strike through text
      this.checked = !this.checked;
      axios({
        method: "put",
        url: "/todos/toggle/" + this.todo.id,
        data: {
          complete: this.checked,
        },
        withCredentials: true,
      })
        .then((res) => {
          console.log(res);
          // Put strike through text
          if (todoCheck.checked) {
            todoContent.style.textDecoration = "line-through";
          } else {
            todoContent.style.textDecoration = "none";
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteTodo: function () {
      axios({
        method: "delete",
        url: "/todos/delete/" + this.todo.id,
        withCredentials: true,
      })
        .then((res) => {
          console.log(res);
          this.$emit("delete-todo", this.todo.id);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getDueDate();
    this.getPriority();
  },
};
</script>

<style scoped></style>
