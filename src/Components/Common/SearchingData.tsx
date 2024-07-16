//search on input
export const handleSearchData = ({ data, item, setState }: any) => {
    setState(
        data.filter((search: any) =>
            Object.values(search).some(
                (field) =>
                    typeof field === 'string' &&
                    field.toLowerCase().includes(item?.toLowerCase()),
            )
        )
    )
}