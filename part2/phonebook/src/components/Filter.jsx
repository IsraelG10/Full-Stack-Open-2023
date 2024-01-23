const Filter = ({ value, onChange}) => {
    return (
        <form>
            filter shown with <input value={value} type="search" onChange={onChange}/>
       </form>
     );
}

export default Filter;