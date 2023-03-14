import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './Payment.css'
import LoadingIndicator from "../LoadingIndicator/LoadIndicator";
import { useHistory } from 'react-router-dom';

function Payment({ amount, bookingId, roomIds }: any) {
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const payment = {
            amount: Number(amount)
        }
        setIsLoading(true)
        try {
            const response = await axios.post(`http://localhost:8090/payment/create?bookingId=${bookingId}&roomIds=${roomIds}`, payment);
            setIsLoading(false)
            alert("Payment successful");
            history.replace("/home");
        } catch (error) {
            setIsLoading(false)
            alert("Some error occured while doing Payment");
        }
    }
    return (
        <>
            {isLoading && <LoadingIndicator />}
            <div className='payment-container'>
                <div className="container">
                    <div className="row">
                        <div className="">
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                </div>
                                <div className="panel-body">
                                    <form role="form" onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className="col-xs-12" style={{ width: '100%' }}>
                                                <div className="form-group">
                                                    <label>CARD NUMBER</label>
                                                    <div className="input-group" style={{ width: '100%' }}>
                                                        <input type="tel" className="form-control" placeholder="Valid Card Number" required />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-xs-7 col-md-7" style={{ paddingLeft: '0' }}>
                                                <div className="form-group">
                                                    <label><span className="hidden-xs">EXPIRY</span><span className="visible-xs-inline"></span> DATE</label>
                                                    <input type="tel" className="form-control" placeholder="MM / YY" required />
                                                </div>
                                            </div>
                                            <div className="col-xs-5 col-md-5" style={{ paddingRight: '0' }}>
                                                <div className="form-group">
                                                    <label>CVV NUMBER</label>
                                                    <input type="tel" className="form-control" placeholder="CVV" required />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-xs-12" style={{ width: '100%' }}>
                                                <div className="form-group">
                                                    <label>CARD OWNER</label>
                                                    <input type="text" className="form-control" placeholder="Card Owner Names" required />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-xs-12" style={{ width: '100%' }}>
                                                <div className="form-group">
                                                    <label>AMOUNT</label>
                                                    <input type="text" className="form-control" value={amount} disabled placeholder="Amount" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="panel-footer">
                                            <div className="row">
                                                <div className="col-xs-12" style={{ width: '100%' }}>
                                                    <button className="btn btn-lg btn-block" style={{ color: '#fff', backgroundColor: '#009dff' }}>PAY NOW</button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Payment