const ErrorLoading = () => {
    return (
        <div className="ui placeholder segment">
            <div className="ui icon header">
                <i className="warning icon" />
                Error loading products. Please try again.
            </div>
            <button className="ui primary button">Load products</button>
        </div>
    );
};

export default ErrorLoading;