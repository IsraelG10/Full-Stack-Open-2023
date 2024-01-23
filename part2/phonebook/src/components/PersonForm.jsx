
const PersonForm = ({ onSubmit, children }) => {
    return (
        <form onSubmit={onSubmit}>
           {children}
        </form>
     );
}

export default PersonForm;