// vuex.d.ts
import { Store } from 'vuex'

declare module "vuex" {
    export * from "vuex/types/index.d.ts";
    export * from "vuex/types/helpers.d.ts";
    export * from "vuex/types/logger.d.ts";
    export * from "vuex/types/vue.d.ts";
}


declare module '@vue/runtime-core' {
    // 声明自己的 store state
    interface State {
        count: number
    }

    // 为 `this.$store` 提供类型声明
    interface ComponentCustomProperties {
        $store: Store<State>
    }
}