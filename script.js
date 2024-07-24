const app = new Vue({
  el: '#app',
  vuetify: new Vuetify(),
  data: {
    task: '',
    todoList: [],
    selectedDate: '',
    menu: false,
    type: 'month',
    types: ['month', 'week', 'day', '4day'],
    mode: 'stack',
    modes: ['stack', 'column'],
    weekday: [0, 1, 2, 3, 4, 5, 6],
    weekdays: [
      { text: 'Sun - Sat', value: [0, 1, 2, 3, 4, 5, 6] },
      { text: 'Mon - Sun', value: [1, 2, 3, 4, 5, 6, 0] },
      { text: 'Mon - Fri', value: [1, 2, 3, 4, 5] },
      { text: 'Mon, Wed, Fri', value: [1, 3, 5] },
    ],
    value: '',
    events: [],
    todoEvents: [],
    colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
    names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
  },
  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.smAndDown;
    }
  },
  methods: {
    addTask() {
      if (this.task && this.selectedDate) {
        const newEvent = {
          name: this.task,
          start: this.selectedDate,
          end: this.selectedDate,
          color: 'indigo',
        };
        this.todoEvents.push(newEvent);
        this.todoList.unshift(this.task);
        this.saveToLocalStorage();
        this.task = '';
        this.selectedDate = '';
        console.log('現在のToDo一覧：', this.todoList);
      }
    },
    clearAll() {
      this.todoList = [];
      this.todoEvents = [];
      this.saveToLocalStorage();
      console.log('全てのToDoが消去されました');
    },
    clearDayTasks() {
      if (this.selectedDate) {
        this.todoEvents = this.todoEvents.filter(event => event.start !== this.selectedDate);
        this.saveToLocalStorage();
        console.log(`${this.selectedDate}のToDoが消去されました`);
      }
    },
    saveToLocalStorage() {
      localStorage.setItem('todoEvents', JSON.stringify(this.todoEvents));
    },
    loadFromLocalStorage() {
      const savedEvents = localStorage.getItem('todoEvents');
      if (savedEvents) {
        this.todoEvents = JSON.parse(savedEvents);
      }
    },
    getEventColor(event) {
      return event.color;
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
  },
  mounted() {
    this.loadFromLocalStorage();
  },
});

const vuetify = new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#181878',
        secondary: '#857980',
        accent: '#F29600',
        info: '#36ABB5',
        success: '#B4ACD0',
        warning: '#DCD9EC',
        error: '#E8E6F2',
        background: '#000000',
      },
    },
  },
});