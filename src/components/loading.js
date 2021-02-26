import react from 'react'

function Loading() {
    return (
        <div className="text-center w-100 h-100">
           {/*<img src="https://loading.io/mod/spinner/spinner/sample.gif"/>*/}
            <div className="text-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
        
    );
}

export default Loading