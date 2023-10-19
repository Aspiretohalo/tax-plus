// // vuex.d.ts

declare module "vuex" {
    export * from "vuex/types/index.d.ts";
    export * from "vuex/types/helpers.d.ts";
    export * from "vuex/types/logger.d.ts";
    export * from "vuex/types/vue.d.ts";
}

// declare module '@vue/runtime-core' {
//     // 声明自己的 store state
//     interface State {
//         students: Array,
//         teachers: Array,
//         courses: Array,
//         comments: Array,
//         evaluations: Array,
//         notices: Array,
//         videos: Array,
//     }

//     // 为 `this.$store` 提供类型声明
//     interface ComponentCustomProperties {
//         $store: Store<State>
//     }

// }