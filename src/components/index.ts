import SvgIcon from './Icons/SvgIcon.vue';
import Category from './Category/index.vue'
import type { App, Component } from 'vue';
const components: { [name: string]: Component } = { SvgIcon,Category };
export default {
    install(app: App) {
        Object.keys(components).forEach((key: string) => {
            app.component(key, components[key]);
        })
    }
}