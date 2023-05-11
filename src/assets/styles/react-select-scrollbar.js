export const selectStyles = {
    menuList: (base) => ({
        ...base,

        "::-webkit-scrollbar": {
            width: "4px",
            height: "0px",
        },
        "::-webkit-scrollbar-track": {
            background: "#f1f1f1"
        },
        "::-webkit-scrollbar-thumb": {
            background: "#888"
        },
        "::-webkit-scrollbar-thumb:hover": {
            background: "#555"
        }
    })
}