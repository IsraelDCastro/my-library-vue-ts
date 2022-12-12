import type { App } from 'vue';
import { HelloWorld, MyButton } from "@/components";

export default {
  install: (app: App) => {
    app.component('HelloWorld', HelloWorld);
    app.component('MyButton', MyButton);
  }
};

export { HelloWorld, MyButton };
