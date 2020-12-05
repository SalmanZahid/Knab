import React from 'react';

const Quote = (props) => {

    function renderQuotation(props) {
        let innerContent = props.noResult ? renderNoResult() :
            props.quotes.length > 0 ? renderTable(props.quotes) : '';

        return innerContent;
    }

    function renderTable(quotes) {
        return (
            <div class="mt-4">            
                <p>Quotation for <b>{props.searchedText}</b></p>
                <table className='table table-hover table-bordered w-50 mt-2' aria-labelledby="tabelLabel">
                    <thead>
                    <tr>
                        <th>Symbol</th>
                        <th>Price</th>
                    </tr>
                    </thead>
                    <tbody>
                    {quotes.map(quote =>
                        <tr key={quote.symbol}>
                        <td>{quote.symbol}</td>
                        <td>{quote.price}</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        );
    }

    function renderNoResult() {
        return (
            <div class="mt-5">
                 <h1 class="text-danger">Oops!</h1>
                <div class="error-details">Sorry, <b>{props.searchedText}</b> is an invalid crypto code</div>
            </div>
        );
    }

    let contents = props.loading ? 
        <div class="d-flex justify-content-center mt-5">
            <div class="spinner-grow text-warning mt-5" style={{width: "12rem", height: "12rem"}} role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
      : renderQuotation(props);

    return (
      <div>
        {contents}
      </div>
    );
  
}

export default Quote;
