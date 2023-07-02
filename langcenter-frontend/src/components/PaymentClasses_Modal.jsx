import { useEffect,useState  } from "react"
import { Modal,Form,Row,Col } from "react-bootstrap"
import axios from "../api/axios"
export default function PaymentClasses_Modal({showModal,handleClose,selectedItem,id}) {
    const [data,setData]=useState([]);
    //fetch payment details for classe
    useEffect (()=>{
        //fetch data
        const fetchData = async () => {
        const response = await axios.post(`/api/getPayment/${selectedItem}`,{etudiantId:id});
        setData(response?.data);
        }
        if (showModal )
        { 
        fetchData();
        }
    },[selectedItem])

  return (
    <Modal show={showModal} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
            <Modal.Title>Payment Classes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Row>
                    <Col>
                        <div>
                            <h5>Payment Details</h5>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">Date</th>
                                        <th scope="col">Amount</th>
                                        <th scope="col">Payment Method</th>
                                        <th scope="col">Aggred Amount</th>
                                        <th scope="col">Remaining</th>
                                        <th scope="col">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                        <tr>
                                            <td>{data?.payment_date}</td>
                                            <td>{data?.amount ? data?.amount : 0}</td>
                                            <td>Cash</td>
                                            <td>{data?.negotiated_price ? data?.negotiated_price : 0}</td>
                                            <td>{data?.negotiated_price && data?.amount ? data?.negotiated_price > data?.amount ? 0 :  +data?.amount - data?.negotiated_price : 0}</td>
                                            <td>{data?.status}</td>
                                        </tr>
                                </tbody>
                            </table>
                        </div>
                    </Col>
                </Row>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <button className="btn btn-secondary" onClick={handleClose}>Close</button>
        </Modal.Footer>
    </Modal>
  )
}
