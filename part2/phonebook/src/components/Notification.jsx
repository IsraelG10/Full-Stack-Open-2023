const Notification = ({ message, error }) => {
    console.log(message);
    return (
        <div className={`${message !== '' ? 'success' : ''} ${error !== '' ? 'error' : ''}`}>
            {message || error}
        </div>
     );
}

export default Notification;
