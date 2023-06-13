<template>
  <div class="row border-bottom p-2">
    <div class="col-1">
      <input
        type="checkbox"
        class="mx-2"
        v-model="checked"
        @click="toggleComplete"
      />
    </div>
    <div v-if="todo.complete" class="col-5">
      <span class="strike">{{ todo.content }}</span>
    </div>
    <div v-else class="col-5">
      <span>{{ todo.content }}</span>
    </div>
    <div v-if="todo.complete" class="col-3">
      <span class="strike">{{ dueDate }}</span>
    </div>
    <div v-else class="col-3">
      <span>{{ dueDate }}</span>
    </div>
    <div v-if="todo.complete" class="col-2">
      <span class="strike">{{ priority }}</span>
    </div>
    <div v-else class="col-2">
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
      let self = this;
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

<style scoped>
.strike {
  text-decoration: line-through;
}
</style>
