export const sortByLAbel = (a, b) => {
    console.log(a.name)
    if (a.name < b.name) {
        return -1
    }
    if (a.name > b.name) {
        return 1
    }
    return 0
}