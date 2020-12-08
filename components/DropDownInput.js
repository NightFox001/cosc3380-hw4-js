

export const DropDownInput = ({ options, selected, onChange, title, loading, defaultOption }) => {
    return (
        <>
            <p>{title}</p>
            <select onChange={(e) => onChange(e.target.value)}>
                {loading && (
                    <option>Loading</option>
                )}
                {defaultOption && (
                    <option key={defaultOption.value} value={defaultOption.value}>{defaultOption.label}</option>
                )}
                {options.map(({ label, value }) => (
                    <option key={value} value={value} selected={selected === value}>
                        {label}
                    </option>
                ))}
            </select>
        </>
    )
}