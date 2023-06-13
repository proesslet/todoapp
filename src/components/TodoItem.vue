<template>
  <div class="row border-bottom p-2">
    <div class="col-1 d-flex align-items-center justify-content-end">
      <input
        type="checkbox"
        class="ml-auto"
        v-model="checked"
        @click="toggleComplete"
      />
    </div>
    <div v-if="todo.complete" class="col-5 d-flex align-items-center">
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
      <span class="strike">{{ todo.priority }}</span>
    </div>
    <div v-else class="col-2">
      <span>{{ todo.priority }}</span>
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
    };
  },
  methods: {
    getDueDate: function () {
      if (this.todo.dueDate) {
        // Convert datetime to date, e.g. 2021-07-01T00:00:00.000Z to 2021-07-01
        // Then make it look like June 7, 2021. Make sure it does not go back a day
        let date = new Date(this.todo.dueDate);
        date.setDate(date.getDate() + 1);
        this.dueDate = date.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        });
      } else {
        this.dueDate = "No due date";
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
          self.$emit("toggle-complete", self.todo.id);
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
          this.$emit("delete-todo", this.todo.id);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getDueDate();
  },
};
</script>

<style scoped>
.strike {
  text-decoration: line-through;
}

input[type="checkbox"] {
  transform: scale(1.5);
}
</style>
