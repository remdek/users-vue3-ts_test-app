import { createApp } from 'vue'
import App from './App.vue'

// createApp(App).mount('#app')
//
// App.config.globalProperties.$filters = {
//   formatDate(d: Date) {
//     console.log(d)
//     let month = String(d.getMonth() + 1);
//     let day = String(d.getDate());
//     const year = String(d.getFullYear());
//
//     if (month.length < 2) month = '0' + month;
//     if (day.length < 2) day = '0' + day;
//     return `${day}/${month}/${year}`;
//   }
// }

const app = createApp(App)

app.config.globalProperties.$filters = {
  formatDate(ds: string) {
    const d = new Date(ds)
    let month = String(d.getMonth() + 1);
    let day = String(d.getDate());
    const year = String(d.getFullYear());
    let hour = String(d.getHours());
    let min = String(d.getMinutes());

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    if (hour.length < 2) hour = '0' + hour;
    if (min.length < 2) min = '0' + min;
    return `${year}-${month}-${day} ${hour}:${min}`;
  }
}

app.mount("#app")